## Minimal Django with Webpack and Bootstrap setup!
It should be pretty self explanatory, let me know if you need any help!

### Docker usage
1. Run `docker-compose build`
2. Run `docker-compose up -d`
3. [optional] Run `docker-compose exec web python manage.py createsuperuser`
4. Profit...

> Docker version not ready for production usage yet! Be careful.

### Basic usage (legacy, but still works)

**Front-end**
1. Run `yarn install`
2. Run `yarn serve`
3. Profit...

**Back-end**
1. Create virtualenv && activate
2. Run `pip install -r requirements.txt`
3. Rename `.env.example` > `.env` and update it
4. [optional] Make `manage.py` "runabble": `$ chmod +x manage.py`
5. Run `./manage.py migrate`
6. [optional] Run `./manager.py createsuperuser`
7. Run `./manage.py runserver`
8. Profit...

