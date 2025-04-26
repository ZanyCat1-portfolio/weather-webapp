#!/bin/sh

# If WEATHER_PROXY_ENDPOINT is not set, default it
: "${WEATHER_PROXY_ENDPOINT:=http://localhost:8079/}"
export WEATHER_PROXY_ENDPOINT  # <-- Critical for envsubst!

envsubst < /www/config.template.js > /www/config.js
envsubst < /etc/lighttpd/lighttpd.template.conf > /etc/lighttpd/lighttpd.conf

# Start static server on 8080
echo "Starting static server on port 8080..." >&2
lighttpd -f /etc/lighttpd/lighttpd.conf -D &

# Start API proxy server on 8079
echo "Starting API proxy on port 8079..." >&2
ncat -k -l 0.0.0.0 8079 -c /scripts/api-proxy.sh

wait