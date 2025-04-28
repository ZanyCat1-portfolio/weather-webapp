FROM alpine:latest

# Install dependencies

## original directive
## RUN apk add --no-cache curl nmap-ncat bash
RUN apk add --no-cache curl nmap-ncat bash lighttpd gettext

# Copy scripts
COPY scripts/api-proxy.sh /scripts/api-proxy.sh
COPY entrypoint.sh /entrypoint.sh

# Copy static files
COPY website_files/ /www/
COPY config.template.js /www/config.template.js

# get api keys
COPY api_keys/ api_keys/

# Make executable
RUN chmod +x /scripts/api-proxy.sh /entrypoint.sh

# Copy custom lighttpd config
COPY lighttpd.template.conf /etc/lighttpd/lighttpd.template.conf

# Start server
ENTRYPOINT ["/entrypoint.sh"]