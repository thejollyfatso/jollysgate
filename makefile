.PHONY: install dev build test lint format

install:
	cd client && npm install

dev:
	cd client && npm run dev

build:
	cd client && npm run build

test:
	cd client && npm test

lint:
	cd client && npm run lint

format:
	cd client && npm run format
