#!/bin/sh
npm install
ng build --prod --output-path gui --base-href /gui/
chmod -R 777 gui
