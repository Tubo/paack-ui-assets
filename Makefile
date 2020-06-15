publish:
	npm publish

build: build-svg-icon-sprite
	npx parcel build src/js/paackSvgIconSprite.js --out-dir ./js


build-svg-icon-sprite: optimize-svgs create-svg-sprite

optimize-svgs:
	npx svgo --config=./svgo.json --folder=./src/svg --output=./dist/optimizedSvg --multipass

create-svg-sprite:
	npx svg-sprite --symbol --symbol-inline --symbol-dest=dist/ --symbol-sprite=icon-sprite.svg dist/optimizedSvg/*.svg

.PHONY: build-svg-icon-sprite publish optimize-svgs create-svg-sprite
