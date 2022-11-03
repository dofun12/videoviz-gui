FROM nginx
RUN mkdir /var/www/html
COPY gui /var/www/html/gui
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN chmod -R 777 /var/www/html
