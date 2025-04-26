Instructions for Docker:
To run this app in a Docker container, Docker must already be installed. 
1. Navigate to directory containing the Dockerfile
2. Build the Docker image and give it a name with the following command:
   * docker build -t <give_image_name_here> .
3. Run the Docker image with the following command:
   * docker run -d -p <host_api_port>:8079 -p <host_server_port>:8080 <image_name>

Sample commands: \
**docker build -t app_to_serve .** \
**docker run -d -p 8077:8079 -p 8078:8080 app-image**

The app is now accessible at 127.0.0.1:8078. If you need to use a different port for any reason, simply supply that port to the docker run command:

**docker run -d -p 8077:8079 -p 80:8080**

To host this app without Docker would require a web server be installed on the target machine. The Docker image created is for a lighttpd web server and an ncat proxy.

