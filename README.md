Instructions for Docker:
To run this app in a Docker container, Docker must already be installed.
1. Navigate to directory containing the Dockerfile
2. Add a subdirectory api_keys/ with two files inside:
   * openweathermap.key
   * waqi.key
3. These files should each contain their own api key and nothing else
4. Build the Docker image and give it a name with the following command:
   * docker build -t <your_image_name> .
5. Run the Docker image with the following command:
   * docker run -d -p <host_api_port>:8079 -p <host_server_port>:8080 <your_image_name>

Sample commands: \
**docker build -t app_to_serve .** \
**docker run -d -p 8077:8079 -p 8078:8080 app-image**

The app is now accessible at 127.0.0.1:8078. If you need to use a different port for any reason, simply supply that port to the docker run command:

**docker run -d -p 8077:8079 -p 80:8080**

To host this app without Docker would require a web server be installed on the target machine. The Docker image created includes a lighttpd web server and ncat proxy.

