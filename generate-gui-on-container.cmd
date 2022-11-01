docker run ^
 --rm -it ^
  -v D:\IdeaProjects\videoviz\videoviz-gui\gui:/app/gui ^
   lemanoman/videoviz-gui:latest node_modules/.bin/ng build --prod --output-path gui --base-href /gui/


#".node_modules/bin/ng build --prod --output-path gui --base-href /gui/"
