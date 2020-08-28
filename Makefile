publish:
	npm publish

build: build-svg-icon-sprite
	npm run build


build-svg-icon-sprite: optimize-svgs create-svg-sprite

optimize-svgs:
	npm run optimize-svgs

create-svg-sprite:
	npm run create-svg-sprite

.PHONY: build-svg-icon-sprite publish optimize-svgs create-svg-sprite
