#!/bin/sh

# python manage.py flush --no-input
python manage.py migrate
yarn install --frozen-lockfile --non-interactive --no-progress --ignore-optional

mkdir -p _logs
mkdir -p _media

exec "$@"
