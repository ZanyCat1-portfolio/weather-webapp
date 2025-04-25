#!/bin/sh

# Start static server on 8078
echo "Starting static server on port 8078..." >&2
lighttpd -f /etc/lighttpd/lighttpd.conf -D &

# Start API proxy server on 8077
echo "Starting API proxy on port 8077..." >&2
ncat -k -l 0.0.0.0 8077 -c /scripts/api-proxy.sh