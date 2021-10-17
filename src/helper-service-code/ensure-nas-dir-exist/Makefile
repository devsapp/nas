build:
	npm run build

package: build
	-rm -rf ../../../dist/helper-service-code/ensure-nas-dir-exist-*.zip
	-mkdir -p ../../../dist/helper-service-code
	zip -j ../../../dist/helper-service-code/ensure-nas-dir-exist.zip ./dist/*
	# zip -j ../../../dist/helper-service-code/ensure-nas-dir-exist-"$$(<../../../dist/helper-service-code/VERSION)".zip ./dist/*
