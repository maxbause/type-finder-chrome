#!/usr/bin/env bash

echo "Building Type Finder chrome extension..."
echo "[1/3] Installing resources..."
yarn install

echo "[2/3] Building dist files"
yarn run webpack:prod

echo "[2/3] Bundeling files"
mkdir build
mkdir build/dist
cp -a dist/. build/dist/

mkdir build/assets
cp -a assets/. build/assets/

cp manifest.json build/manifest.json
cp index.html build/index.html

echo "Done."
