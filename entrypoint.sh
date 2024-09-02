#!/bin/sh

BOOTED="./BOOTED"
# Remove BOOTED file to run this again

if [ ! -e $BOOTED ] || [ "$1" == "FORCE" ]; then
  # python manage.py flush --no-input
  python manage.py migrate

  # admin themes
  # python manage.py loaddata admin_interface_theme_django.json
  # python manage.py loaddata admin_interface_theme_bootstrap.json
  # python manage.py loaddata admin_interface_theme_foundation.json
  # python manage.py loaddata admin_interface_theme_uswds.json

  yarn install --frozen-lockfile --non-interactive --no-progress --ignore-optional

  mkdir -p _logs
  mkdir -p _media

  echo "WARMUP COMPLETED SUCCESSFULLY"
  touch $BOOTED
fi

if [ "$1" != "FORCE" ]; then
  exec "$@"
fi
