import sys
import os
from pathlib import Path
import shutil
from unittest.mock import MagicMock, patch

# Ensure we can import the script
sys.path.append('scripts')
import generate_embeddings

def verify_path_traversal():
    print("Verifying path traversal protection...")
    embeddings_dir = Path("embeddings").resolve()
    embeddings_dir.mkdir(exist_ok=True)

    # Case 1: Malicious URL with '..'
    malicious_url = "http://example.com/../../tmp/passwd"

    print(f"Test Case 1: Standard path traversal: {malicious_url}")

    try:
        # dummy embedding
        dummy_embedding = [0.1, 0.2, 0.3]

        # This should raise ValueError
        generate_embeddings.save_embedding(
            malicious_url,
            dummy_embedding,
            "test-model",
            "http://example.com",
            "embeddings"
        )

        print("❌ VULNERABILITY Case 1: save_embedding did not raise exception!")
        return False

    except ValueError as e:
        if "Security check failed" in str(e) or "Path is outside" in str(e):
             print(f"✅ Protection triggered (ValueError): {e}")
        else:
             print(f"❓ Unexpected ValueError: {e}")
             return False
    except Exception as e:
        print(f"❓ Unexpected Exception: {e}")
        return False

    # Case 2: Prefix matching attack
    malicious_url_2 = "http://example.com/../../embeddings-suffix/foo"
    print(f"\nTest Case 2: Prefix matching attack: {malicious_url_2}")

    Path("embeddings-suffix").mkdir(exist_ok=True)

    try:
        generate_embeddings.save_embedding(
            malicious_url_2,
            dummy_embedding,
            "test-model",
            "http://example.com",
            "embeddings"
        )
        print("❌ VULNERABILITY Case 2: Prefix match check failed!")
        return False
    except ValueError as e:
         if "Security check failed" in str(e):
             print(f"✅ Protection triggered (ValueError): {e}")
         else:
             print(f"❓ Unexpected ValueError: {e}")
             return False
    except Exception as e:
         print(f"❓ Unexpected Exception: {e}")
         return False
    finally:
        if Path("embeddings-suffix").exists():
            Path("embeddings-suffix").rmdir()

    return True

def verify_ssrf_protection():
    print("\nVerifying SSRF protection...")
    content_base = "http://localhost:3000"
    replacement_base = "https://5l-labs.com"

    # Case 1: Valid URL
    valid_url = "https://5l-labs.com/blog/post1"
    expected = "http://localhost:3000/blog/post1"
    result = generate_embeddings.resolve_fetch_url(valid_url, replacement_base, content_base)
    if result == expected:
        print(f"✅ Valid URL allowed: {result}")
    else:
        print(f"❌ Valid URL failed: expected {expected}, got {result}")
        return False

    # Case 2: Malicious URL (External)
    malicious_url = "http://evil.com/secret"
    result = generate_embeddings.resolve_fetch_url(malicious_url, replacement_base, content_base)
    if result is None:
        print(f"✅ External URL blocked: {malicious_url}")
    else:
        print(f"❌ External URL allowed: {result}")
        return False

    # Case 3: Prefix matching attack
    prefix_attack_url = "http://localhost:3000.evil.com/secret"
    result = generate_embeddings.resolve_fetch_url(prefix_attack_url, replacement_base, content_base)
    if result is None:
        print(f"✅ Prefix attack blocked: {prefix_attack_url}")
    else:
        print(f"❌ Prefix attack allowed: {result}")
        return False

    return True

def verify_response_size_limit():
    print("\nVerifying response size limit...")

    # 1. Content-Length check
    with patch('requests.get') as mock_get:
        mock_resp = MagicMock()
        mock_resp.headers = {'Content-Length': str(20 * 1024 * 1024)} # 20MB
        mock_resp.raise_for_status.return_value = None
        mock_get.return_value = mock_resp

        result = generate_embeddings.get_page_content("http://example.com/huge-header")
        if result is None:
            print("✅ Content-Length check passed (returned None for 20MB)")
        else:
            print("❌ Content-Length check failed (did not return None)")
            return False

    # 2. Stream size check
    with patch('requests.get') as mock_get:
        mock_resp = MagicMock()
        mock_resp.headers = {}
        mock_resp.raise_for_status.return_value = None
        # Generator yielding 1MB chunks
        def oversized_generator():
            chunk = "A" * (1024 * 1024) # 1MB
            for _ in range(15): # 15MB total
                yield chunk

        mock_resp.iter_content.return_value = oversized_generator()
        mock_get.return_value = mock_resp

        result = generate_embeddings.get_page_content("http://example.com/stream", max_size=10 * 1024 * 1024)
        if result is None:
            print("✅ Stream size check passed (returned None for >10MB stream)")
        else:
            # We can't check len(result) if result is None
            print(f"❌ Stream size check failed (returned content)")
            return False

    return True

if __name__ == "__main__":
    success = True
    if not verify_path_traversal():
        success = False
    if not verify_ssrf_protection():
        success = False
    if not verify_response_size_limit():
        success = False

    if not success:
        sys.exit(1)
