TEST_FOLDER ?= ./test/
TEST_FILES ?= *.test.js
REPORTER = spec
TIMEOUT = 20000
PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

unit-test:
	@mocha $(TEST_FOLDER) -t $(TIMEOUT) -R spec --recursive -name $(TEST_FILES) --grep '^(?!Integration::).*'

test: unit-test

install:
	env -i PATH="$(PATH)" npm install

clean:
	rm -rf ./dist

build: clean install
	env -i PATH="$(PATH)" npm run build
	mkdir -p ./dist/bin && cp -rf ./bin/ ./dist/bin
	git log -n 1 --pretty="format:%h" > ./dist/VERSION

package: build
	cd dist && zip -r ../../../../dist/helper-service-code/nas-server-"$$(<./VERSION)".zip  * .[^.]* -x "*.zip"
	cp -f ./dist/VERSION ../../../dist/helper-service-code/VERSION
