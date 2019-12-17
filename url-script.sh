# !/bin/bash

environment_info=$(aws elasticbeanstalk describe-environments --environment-names $1)

url=$(echo $environment_info | /usr/local/bin/jq --raw-output '.Environments[0].CNAME')

echo $url