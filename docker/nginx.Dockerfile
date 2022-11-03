FROM nginx
COPY gui /usr/share/nginx/html/gui
COPY docker/nginx.conf /etc/nginx/nginx.conf
