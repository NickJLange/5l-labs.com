#!/bin/bash
source .env

curl $PUSH_URL

render logs -o text --tail -r $RENDER_SERVICE
open https://preview-5l-labs-com.onrender.com/
