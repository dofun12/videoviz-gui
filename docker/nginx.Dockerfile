FROM nginx
COPY gui /usr/share/nginx/html/gui
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN chmod -R 777 /usr/share/nginx/html/gui
