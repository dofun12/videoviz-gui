#!/bin/sh
npm install
ng build --prod --output-path gui --base-href /gui/
chmod 777 gui
