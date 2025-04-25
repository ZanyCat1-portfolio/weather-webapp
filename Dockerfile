FROM alpine:latest

# Install dependencies

## original directive
## RUN apk add --no-cache curl nmap-ncat bash
## adding nano for QOL dev feature
RUN apk add --no-cache curl nmap-ncat bash nano lighttpd

# Copy scripts
COPY scripts/api-proxy.sh /scripts/api-proxy.sh
COPY entrypoint.sh /entrypoint.sh

# Copy static files
COPY website_files/ /www/

# get api keys
COPY api_keys/ api_keys/

# Make executable
RUN chmod +x /scripts/api-proxy.sh /entrypoint.sh

# Expose port
EXPOSE 8077 8078

# Copy custom lighttpd config
COPY lighttpd.conf /etc/lighttpd/lighttpd.conf

# Start server
ENTRYPOINT ["/entrypoint.sh"]