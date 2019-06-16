#!/usr/bin/env bash

echo "Building Type Finder chrome extension..."
echo "[1/4] Installing resources..."
yarn install

echo "[2/4] Building dist files"
yarn run webpack:prod

echo "[3/4] Bundeling files"
mkdir build
mkdir build/dist
cp -a dist/. build/dist/

mkdir build/assets
cp -a assets/. build/assets/

cp manifest.json build/manifest.json
cp index.html build/index.html

echo "[4/4] Creating zip"
cd build/; zip -r type_finder_chrome_build.zip *; cd ..

echo "Done."
