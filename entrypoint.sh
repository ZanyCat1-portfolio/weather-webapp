#!/bin/sh
envsubst < /www/config.template.js > /www/config.js
envsubst < /etc/lighttpd/lighttpd.template.conf > /etc/lighttpd/lighttpd.conf

# Start static server on SERVER_PORT
echo "Starting static server on port ${SERVER_PORT}..." >&2
lighttpd -f /etc/lighttpd/lighttpd.conf -D &

# Start API proxy server on API_PORT
echo "Starting API proxy on port ${API_PORT}..." >&2
ncat -k -l 0.0.0.0 $API_PORT -c /scripts/api-proxy.sh

wait