# Container image that runs your code
FROM sebp/lighttpd

# Copies your code file from your action repository to the filesystem path `/` of the container
COPY out/. /var/www/localhost/htdocs/
