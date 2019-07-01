#!/usr/bin/env bash

# copy js and css with caching
aws s3 cp dist/maydayworld s3://maydayworld.com/$1 --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --cache-control 'max-age=31557600' --recursive --exclude '*' --include '*.js' --include '*.css'

# copy the rest with no caching
aws s3 cp dist/maydayworld s3://maydayworld.com/$1 --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive --exclude '*.js' --exclude '*.css'
