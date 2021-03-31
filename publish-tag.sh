#!/bin/bash
npm --no-git-tag-version version patch
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
TAG_NAME="v$PACKAGE_VERSION"
git tag -a $TAG_NAME -m "Criando tag $TAG_NAME"
git push origin $TAG_NAME
NOVO_RELEASE=$(npm --no-git-tag-version version prepatch --preid snapshot)
git add package.json
git add package-lock.json
git commit -m 'Novo release $NOVO_RELEASE'
git push
