.PHONY: coverage
lint:
	npx eslint
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
