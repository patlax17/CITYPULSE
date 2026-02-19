#!/usr/bin/env python3
"""
City Pulse Asset Vault Builder
Converts all product images to WebP, applies SEO naming, and packages into a ZIP.
"""

import os
import shutil
import zipfile
from pathlib import Path
from PIL import Image

BASE = Path("/Users/patricksokoya/Desktop/CITY PULSE")
ORIGINAL_DIR = BASE / "PRODUCT PICTURES"
AI_DIR = BASE / "public/images/products"
OUTPUT_DIR = BASE / "shopify_ready_assets"
ZIP_DEST = Path("/Users/patricksokoya/Desktop/CITY_PULSE_ASSET_VAULT_VOL1.zip")

# SEO naming map — original filename → SEO slug
ORIGINAL_MAP = {
    "CITY PULSE JACKET 1 FRONT.jpeg": "city-pulse-varsity-jacket-industrial-noir-black-grey-front-01",
    "CITY PULSE JACKET 1 BACK.jpeg":  "city-pulse-varsity-jacket-industrial-noir-black-grey-back-01",
    "CITY PULSE JACKET 2 FRONT.jpeg": "city-pulse-varsity-jacket-industrial-noir-navy-green-front-02",
    "CITY PULSE JACKET 2 BACK.jpeg":  "city-pulse-varsity-jacket-industrial-noir-navy-green-back-02",
    "CITY PULSE TEE 1 FRONT.JPG":     "city-pulse-newark-skyline-tee-industrial-noir-sand-front-01",
    "CITY PULSE TEE 1 BACK.JPG":      "city-pulse-newark-skyline-tee-industrial-noir-sand-back-01",
    "CITY PULSE TEE 2 FRONT.JPG":     "city-pulse-graphic-tee-industrial-noir-black-front-02",
    "CITY PULSE TEE 2 BACK.JPG":      "city-pulse-graphic-tee-industrial-noir-black-back-02",
}

# AI editorial shots
AI_MAP = {
    "jacket-1.png": "city-pulse-varsity-jacket-editorial-industrial-noir-concrete-01",
    "jacket-2.png": "city-pulse-varsity-jacket-editorial-industrial-noir-rust-02",
    "tee-1.png":    "city-pulse-newark-skyline-tee-editorial-industrial-noir-brick-01",
    "tee-2.png":    "city-pulse-graphic-tee-editorial-industrial-noir-concrete-02",
}

WEBP_QUALITY = 90  # High quality, still optimised for web

def convert_to_webp(src: Path, dest_dir: Path, slug: str) -> Path:
    dest = dest_dir / f"{slug}.webp"
    with Image.open(src) as img:
        # Convert RGBA → RGB if needed (WebP supports RGBA but Shopify prefers RGB)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
    size_kb = dest.stat().st_size // 1024
    print(f"  ✓  {dest.name}  ({size_kb} KB)")
    return dest

def main():
    # Clean and create output dir
    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)
    OUTPUT_DIR.mkdir(parents=True)

    product_dir = OUTPUT_DIR / "01_product_photos"
    editorial_dir = OUTPUT_DIR / "02_editorial_ai_shots"
    product_dir.mkdir()
    editorial_dir.mkdir()

    print("\n── Original Product Photos ──")
    for fname, slug in ORIGINAL_MAP.items():
        src = ORIGINAL_DIR / fname
        if src.exists():
            convert_to_webp(src, product_dir, slug)
        else:
            print(f"  ⚠  Not found: {fname}")

    print("\n── AI Editorial Shots ──")
    for fname, slug in AI_MAP.items():
        src = AI_DIR / fname
        if src.exists():
            convert_to_webp(src, editorial_dir, slug)
        else:
            print(f"  ⚠  Not found: {fname}")

    # Write a README inside the vault
    readme = OUTPUT_DIR / "README.txt"
    readme.write_text(
        "CITY PULSE ASSET VAULT — VOL. 1\n"
        "================================\n\n"
        "Prepared by: City Pulse Creative\n"
        "Format: WebP (quality 90) — optimised for Shopify fast loading\n"
        "Naming: SEO-structured for Shopify bulk upload compatibility\n\n"
        "FOLDERS\n"
        "-------\n"
        "01_product_photos/   — Original product photography (front & back)\n"
        "02_editorial_ai_shots/ — Industrial Noir editorial assets (AI-generated)\n\n"
        "SHOPIFY BULK UPLOAD\n"
        "-------------------\n"
        "Use PicManager or Smart Bulk Image Upload app.\n"
        "Upload this ZIP — filenames are pre-matched to product SKUs.\n\n"
        "© 2026 City Pulse Global. All rights reserved.\n"
    )

    # ZIP it up
    print(f"\n── Packaging ZIP → {ZIP_DEST} ──")
    with zipfile.ZipFile(ZIP_DEST, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in OUTPUT_DIR.rglob("*"):
            zf.write(f, f.relative_to(OUTPUT_DIR.parent))
    zip_mb = ZIP_DEST.stat().st_size / (1024 * 1024)
    print(f"  ✓  CITY_PULSE_ASSET_VAULT_VOL1.zip  ({zip_mb:.1f} MB)")
    print("\n✅  Asset Vault complete. ZIP placed on Desktop.\n")

if __name__ == "__main__":
    main()
