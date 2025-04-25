#!/bin/bash

# Read full request (headers + query string)
read request_line
while read header && [ "$header" != $'\r' ]; do :; done

full_path=$(echo "$request_line" | cut -d ' ' -f2)

if [[ "$full_path" == *"openweathermap"* ]]; then
  # Extract query string for openweathermap
  query=$(echo "$request_line" | cut -d' ' -f2 | cut -d'?' -f2)
  query="${query%% HTTP*}"
  apikey=$(</api_keys/openweathermap.key)
  if [[ "$full_path" == *"/weather"* ]]; then
    url="https://api.openweathermap.org/data/2.5/weather?$query&appid=$apikey"
  else 
    url="https://api.openweathermap.org/data/2.5/forecast?$query&appid=$apikey"  
  fi

elif [[ "$full_path" == *"waqi"* ]]; then
  # Extract query string for waqi
  query=$(echo "$request_line" | cut -d' ' -f2 | cut -d':' -f2)
  query="${query%% HTTP*}"
  apikey=$(</api_keys/waqi.key)
  url="https://api.waqi.info/feed/geo:$query/?token=$apikey"
else
  printf "HTTP/1.1 400 Bad Request\r\n"
  printf "Content-Type: application/json\r\n"
  printf "Access-Control-Allow-Origin: *\r\n"
  printf "\r\n"
  printf '{"error":"Unsupported API"}\n'
  return
fi

echo "DEBUG: request_line is $request_line" >&2
echo "DEBUG: full_path is $full_path" >&2
echo "DEBUG: query is $query" >&2
echo "DEBUG: url is $url" >&2

# Fetch weather data
response=$(curl -s "$url")

# Output HTTP response with JSON and CORS
printf "HTTP/1.1 200 OK\r\n"
printf "Content-Type: application/json\r\n"
printf "Access-Control-Allow-Origin: *\r\n"
printf "\r\n"
printf "%s\n" "$response"