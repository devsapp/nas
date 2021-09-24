build:
	npm run build
	git log -n 1 --pretty="format:%h" > ./dist/VERSION

package: build
	-rm -rf ../../../dist/helper-service-code/ensure-nas-dir-exist-*.zip
	-mkdir -p ../../../dist/helper-service-code
	zip -j ../../../dist/helper-service-code/ensure-nas-dir-exist-"$$(<./dist/VERSION)".zip ./dist/*
	cp -f ./dist/VERSION ../../../dist/helper-service-code/VERSION
