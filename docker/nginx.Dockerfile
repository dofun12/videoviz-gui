FROM nginx
RUN mkdir -p /html
COPY docker/nginx.conf /etc/nginx/nginx.conf
USER root

RUN chmod -R 777 /html
RUN chown -R www-data:www-data /html
COPY gui /html/gui

