from conf.settings.base import *
from conf.settings.project import *


DEBUG = False
ALLOWED_HOSTS = []

INSTALLED_APPS = DJANGO_APPS + EXTERNAL_APPS + PROJECT_APPS
