docker run ^
 --rm -it ^
  -v D:\IdeaProjects\videoviz\videoviz-gui\src:/app/src ^
  -v D:\IdeaProjects\videoviz\videoviz-gui\gui:/app/gui ^
   lemanoman/node-14:latest node_modules/.bin/ng build --prod --output-path gui --base-href /gui/"


#".node_modules/bin/ng build --prod --output-path gui --base-href /gui/"
