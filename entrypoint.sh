#!/bin/sh

# python manage.py flush --no-input
python manage.py migrate
yarn install --frozen-lockfile --non-interactive --no-progress --ignore-optional

if [ ! -d "_logs" ]
then
    mkdir _logs
fi

if [ ! -d "_media" ]
then
    mkdir _media
fi

exec "$@"
