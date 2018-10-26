#!/usr/bin/env bash

sudo apt-get update && sudo apt-get upgrade

apt-get install -y git zip unzip curl htop tmux postgresql postgresql-contrib

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential
sudo npm i ntypescript nodemon pm2 -g

sudo mv /etc/postgresql/9.5/main/pg_hba.conf /etc/postgresql/9.5/main/pg_hba.conf.bak
touch /etc/postgresql/9.5/main/pg_hba.conf
sudo echo "host all all 0.0.0.0/0 trust" >> /etc/postgresql/9.5/main/pg_hba.conf
sudo echo "local all all trust" >> /etc/postgresql/9.5/main/pg_hba.conf
sudo echo "listen_addresses = '*'" >> /etc/postgresql/9.5/main/postgresql.conf
sudo service postgresql restart

psql -U postgres -c "CREATE DATABASE api_dev;"
psql -U postgres -c "CREATE DATABASE api_test;"

cd /vagrant
npm install
