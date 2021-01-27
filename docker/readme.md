# Template files

## nginx.template.conf

Template for the containers' NGINX. The contents of this file are replaced via `envsubst` when running `entrypoint.sh`

## env.template.json

Template for the frontends' environment file. This file is used when links need to be called without using the NGINX as a proxy (e.g. when using form posts).
The template contents will be replaced via `envsubst` when running `entrypoint.sh`
