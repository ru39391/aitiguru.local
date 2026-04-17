#!/bin/sh
set -e

sed -i "s|BACKEND_URL|${VITE_BACKEND_URL}|g" /etc/nginx/conf.d/default.conf.template

cp /etc/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
