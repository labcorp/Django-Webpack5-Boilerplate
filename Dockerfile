FROM nikolaik/python-nodejs:python3.10-nodejs18-alpine

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DOCKERED 1

RUN apk update \
    && apk add \
    postgresql-dev \
    python3-dev \
    musl-dev \
    yarn

# install dependencies
RUN pip install --upgrade pip

# copy project
COPY . .

RUN pip install -r requirements-dev.txt
RUN yarn install --frozen-lockfile --non-interactive --no-progress --ignore-optional

# run entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
