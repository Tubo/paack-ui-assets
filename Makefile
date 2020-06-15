publish:
	npm publish


build-svg-icon-sprite:
	optimize-svg
	create-svg-sprite

optimize-svgs:
	./node_modules/.bin/svgo --config=./svgo.json --folder=./src/svg --output=./dist/optimizedSvg --multipass

create-svg-sprite:
	./node_modules/.bin/svg-sprite --symbol --symbol-inline --symbol-dest=dist/ --symbol-sprite=icon-sprite.svg dist/optimizedSvg/*.svg
