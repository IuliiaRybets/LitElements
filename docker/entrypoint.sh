# template file to check for
TEMPLATE_FILE=/etc/nginx/nginx.template.conf
ENVIRONMENT_JSON_TEMPLATE=/tmp/env.template.json

ENVIRONMENT_JSON=/www/assets/env.json

# following vars will be replaced
REPLACE_ENV_VARS='$APPLICATION_BASE
                  $SO_API
                  $CLOUD_API
                  $GTM_TOKEN
                  $BANKVERBINDUNG_API
                  $ADRESSDATEN_API
                  $NATIONALITAETEN_API
                  $HAUSRAT_API'

# configure env.json
envsubst "$REPLACE_ENV_VARS" < $ENVIRONMENT_JSON_TEMPLATE > $ENVIRONMENT_JSON

# add resolvers
echo resolver $(awk 'BEGIN{ORS=" "} $1=="nameserver" {print $2}' /etc/resolv.conf) ";" > /etc/nginx/resolvers.conf

# substitute environment variables, if template configuration available
if [ -e $TEMPLATE_FILE ]
	then
		echo "found nginx configuration template. will use the template contents."
	  envsubst "$REPLACE_ENV_VARS" < $TEMPLATE_FILE > /etc/nginx/nginx.conf
		echo "** Generated nginx.conf ***********************************************"
		cat /etc/nginx/nginx.conf
		echo "***********************************************************************"

		# substitute base href in index.html with base href value
		# and substitute google tag manager token
		# this equals the webseal application hook path
		if [ -z "$GATE_BASE_HREF" ]
			then
				echo "INFO: skipping application gate base href substitution"
			else
				echo "INFO: performing application gate base href substitution on index.html"
				sed -i -e 's~<base href="[^"]*">~<base href="'$GATE_BASE_HREF'"\>~g' /www/index.html
				echo "INFO: replaced base ref: $(cat /www/index.html | grep '<base href')"

				echo "INFO: performing substitution of google tag manager token $GTM_TOKEN"
				sed -i -e "s~GTM-TOKEN~$GTM_TOKEN~g" /www/index.html
				echo "INFO: replaced google tag manager token: $(cat /www/index.html | grep 'gtm_auth')"
    fi
	else
		echo "FATAL: nginx template configuration ${TEMPLATE_FILE} not available"
		exit 1
fi


exec "$@"
