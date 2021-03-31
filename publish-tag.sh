#!/bin/bash
npm version patch
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
git tag -l "$PACKAGE_VERSION"
git push
NOVO_RELEASE=$(npm version prepatch)
git add package.json
git add package-lock.json
git commit -m 'Novo release $NOVO_RELEASE'
git push
