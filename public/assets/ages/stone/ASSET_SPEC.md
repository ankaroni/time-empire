# Stone Age visual asset specification

The settlement scene uses raster artwork, not CSS-drawn buildings.

## Rules
- Transparent WebP preferred.
- Isometric/three-quarter game-art perspective, consistent camera and light.
- Stone Age only: wood, hide, reeds, bone, rope, rough stone and primitive stone tools.
- No metal tools, cranes, masonry, tiled roofs or later-era technology.
- Keep the ground contact/shadow footprint consistent between levels so upgrades do not jump.
- Levels must read as the same building becoming larger and more organized, not as a different historical era.
- Recommended source size: 1024x1024 with transparent background; export optimized WebP.

## Required files
Each folder contains five visual stages:
- hut/hut-lv1.webp ... hut-lv5.webp
- farm/farm-lv1.webp ... farm-lv5.webp
- lumber/lumber-lv1.webp ... lumber-lv5.webp
- gatherer/gatherer-lv1.webp ... gatherer-lv5.webp
- quarry/quarry-lv1.webp ... quarry-lv5.webp
- workshop/workshop-lv1.webp ... workshop-lv5.webp

Game levels 1-2 use visual stage 1, 3-4 stage 2, 5-6 stage 3, 7-8 stage 4 and 9+ stage 5.
