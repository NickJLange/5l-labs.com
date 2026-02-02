.PHONY: help start build build-publish serve clean test lint

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m # No Color

# Default target
help:
	@echo ""
	@echo "${GREEN}5L Labs - Docusaurus Site Commands${NC}"
	@echo ""
	@echo "${YELLOW}Development:${NC}"
	@echo "  make start       Start development server (English only, fast)"
	@echo "  make start-i18n  Start dev server with all languages (slow)"
	@echo ""
	@echo "${YELLOW}Building:${NC}"
	@echo "  make build       Build for production (uses existing embeddings)"
	@echo "  make build-publish  Build and regenerate embeddings (for publish)"
	@echo "  make serve       Serve the built site locally"
	@echo ""
	@echo "${YELLOW}Maintenance:${NC}"
	@echo "  make clean       Clear Docusaurus cache and build artifacts"
	@echo "  make embeddings  Generate embeddings for all content"
	@echo ""
	@echo "${YELLOW}Language Branches:${NC}"
	@echo "  make fetch-all   Fetch all language branches (main, ja/master, es/master, fr/master)"
	@echo ""

# Development server (fast, English only)
start:
	@echo "${GREEN}Starting development server (English only)...${NC}"
	npm run start

# Development server with all languages
start-i18n:
	@echo "${YELLOW}Starting development server with all languages (slower)...${NC}"
	npm run start -- --locale en --locale ja --locale es --locale fr

# Build for production
build:
	@echo "${GREEN}Building for production...${NC}"
	npm run build

# Build for publish (regenerates embeddings)
build-publish:
	@echo "${YELLOW}Building for publish (generating embeddings)...${NC}"
	export PUBLISH_MODE=true && npm run build

# Serve the built site
serve:
	@echo "${GREEN}Serving built site at http://localhost:3000${NC}"
	npm run serve

# Clean build artifacts and cache
clean:
	@echo "${GREEN}Cleaning build artifacts and cache...${NC}"
	npm run clear
	rm -rf build
	rm -rf static/embeddings

# Generate embeddings manually
embeddings:
	@echo "${GREEN}Generating embeddings...${NC}"
	node scripts/generate_embeddings.py

# Fetch all language branches
fetch-all:
	@echo "${GREEN}Fetching all language branches...${NC}"
	git fetch origin main
	git fetch origin ja/master
	git fetch origin es/master
	git fetch origin fr/master
	@echo "${GREEN}Done. To checkout a branch: git checkout ja/master${NC}"

# Pull latest from all language branches and build
pull-build:
	@echo "${GREEN}Pulling latest from all branches and building...${NC}"
	git checkout main && git pull origin main && npm run build -- --locale en
	git checkout ja/master && git pull origin ja/master && npm run build -- --locale ja
	git checkout es/master && git pull origin es/master && npm run build -- --locale es
	git checkout fr/master && git pull origin fr/master && npm run build -- --locale fr
	git checkout main

# Test the site
test:
	@echo "${GREEN}Running tests...${NC}"
	@echo "No tests configured yet"
