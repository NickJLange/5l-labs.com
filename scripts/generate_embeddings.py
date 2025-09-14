#!/usr/bin/env python3

import xml.etree.ElementTree as ET
import os
import requests
import toml
import logging
from datetime import datetime
import orjson
from pathlib import Path
from typing_extensions import Doc
import numpy as np
import argparse
import logging
import time
import re
from tqdm import tqdm
import sys
from ollama import embed, chat, generate
import ollama


logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

DEFAULT_EMBEDDING_MODEL_NAME = "nomic-embed-text:v1.5"


def run_embed(input_text: str, model: str = DEFAULT_EMBEDDING_MODEL_NAME):
    ollama_response = ollama.embed(model, input_text)
    if not ollama_response:
        logger.error("Failed to get a response from Ollama.")
    return ollama_response.embeddings[0]


# /embeddings
# /x.html -> /embeddings/x.html.embedding.json


def batch_embeddings_process(data: dict, provider: str, embedding_model: str, embedding_dim: int):
    global batch_size
    start_time = time.time()
    #    print(data[0])
    embeddings = list()
    #    logger.info(f"Running embed against model {embedding_model} again queue {len(data)}")
    for i, item in enumerate(tqdm(data, desc=f"Embedding {len(data)} items using {embedding_model}")):
        #        if i > (2*batch_size-1):
        #            break
        embedding = run_embed(item["sentence"], embedding_model)
        item["embedding"] = embedding
        embeddings.append(item)
    logger.info(f"{len(embeddings[0]['embedding'])} embedding info")
    end_time = time.time()
    elapsed_time = end_time - start_time
    logger.debug(f"oolama embed call executed in {elapsed_time:.6f} seconds")

    return embeddings


def get_embedding(text, api_base, api_key, model):
    """
    Gets an embedding for the given text using an OpenAI-compatible API.
    """
    headers = {
        "Content-Type": "application/json",
    }
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    data = {"model": model, "input": text}

    try:
        response = requests.post(f"{api_base}/embeddings", headers=headers, json=data)
        response.raise_for_status()
        embedding_data = response.json()
        return embedding_data["data"][0]["embedding"]
    except requests.exceptions.RequestException as e:
        logger.error(f"Error getting embedding: {e}")
        return None


def get_page_content(url):
    """
    Fetches the text content of a web page.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        # In a real scenario, you'd want to parse the HTML and extract the main content.
        # For this example, we'll just use a placeholder.
        return response.text  # or use BeautifulSoup to extract text
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching page content from {url}: {e}")
        return None


def main():
    # Configuration from config.toml
    config = toml.load("scripts/config.toml")
    settings = config.get("settings", {})

    model = settings.get("model", "nomic-embed-text:v1.5")
    api_base = settings.get("embedding_api_url", "http://localhost:11434/v1")
    embedding_content_base_url = settings.get("embedding_content_base_url", "http://localhost:3000")
    replacement_base_url = settings.get("replacement_base_url", "https://5l-labs.com")

    api_key = os.environ.get("OPENAI_API_KEY", "ollama")  # Default for Ollama
    output_file = os.environ.get("OUTPUT_FILE", "embeddings.json")
    sitemap_path = "sitemap.xml"
    sitemap = embedding_content_base_url + "/sitemap.xml"
    sitemap_data = get_page_content(sitemap)

    try:
        tree = ET.parse(sitemap_data)
        root = tree.getroot()
    except FileNotFoundError:
        logger.error(f"Error: {sitemap_path} not found.")
        return
    except ET.ParseError:
        logger.error(f"Error: Could not parse {sitemap_path}.")
        return

    ### Fixme: Ensuring picked up by webserver

    urls = [elem.text for elem in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]

    output_data = {
        "version": "1.0",
        "metadata": {"generated": datetime.now(datetime.timezone.utc).isoformat()},
        "content": [],
    }

    for url in urls:
        # Replace the base URL for fetching content
        fetch_url = url.replace(replacement_base_url, embedding_content_base_url)
        logger.info(f"Processing {fetch_url}...")
        content = get_page_content(fetch_url)
        if not content:
            continue

        embedding = get_embedding(content, api_base, api_key, model)
        if not embedding:
            continue

        output_data["content"].append(
            {"uri": url, "embeddings": [{"model": model, "dimensions": len(embedding), "vector": embedding}]}
        )

    with open(output_file, "w") as f:
        json.dump(output_data, f, indent=2)

    logger.info(f"Embeddings saved to {output_file}")


if __name__ == "__main__":
    main()
