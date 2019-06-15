#!/usr/bin/env bash

echo "Building Type Finder chrome extension..."
echo "[1/4] Installing resources..."
yarn install

echo "[2/4] Building dist files"
yarn run webpack:prod

echo "[2/4] Bundeling files"
mkdir build/dist
cp -a dist/. build/dist/

mkdir build/assets
cp -a assets/. build/assets/

cp manifest.json build/manifest.json
cp index.html build/index.html


echo "[3/4] Compressing build"
zip -r build/type_finder_chrome_extension.zip build/

echo "[4/4] Cleaning up"
rm -r build/dist/
rm -r build/assets/
rm build/manifest.json
rm build/index.html

echo "Done."
