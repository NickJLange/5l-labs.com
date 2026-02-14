from playwright.sync_api import sync_playwright

def verify_homepage(page):
    print("Navigating to homepage...")
    page.goto("http://localhost:3000")

    print("Waiting for content...")
    # Wait for the specific element to be visible
    heading = page.get_by_role("heading", name="Major Research Areas")
    heading.wait_for()

    print("Locating section...")
    # I want to capture the row containing both the "Major Research Areas" and "Latest Update"
    # to compare the cards.
    row = page.locator(".row").filter(has=heading).first

    # Take screenshot of the row
    print("Taking screenshot...")
    row.screenshot(path="verification.png")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify_homepage(page)
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="error.png")
    finally:
        browser.close()
