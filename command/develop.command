#!/bin/bash

cd "$(dirname "$0")" && cd ..

npm run watch & node server
