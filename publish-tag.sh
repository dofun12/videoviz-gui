#!/bin/bash
npm --no-git-tag-version version minor
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
git tag -a $PACKAGE_VERSION -m "Criando tag $PACKAGE_VERSION"
git push
NOVO_RELEASE=$(npm --no-git-tag-version version prerelease --preid snapshot)
git add package.json
git add package-lock.json
git commit -m 'Novo release $NOVO_RELEASE'
git push
