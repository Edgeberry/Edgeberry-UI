#!/bin/bash

#   deploy.sh
#   Deploy the Edge Gateway UI to a device on your
#   local network using sshpass.

DEFAULT_USER=spuq
DEFAULT_PASSWD=32bjfewAQZpd80x
DEFAULT_HOST=192.168.1.105

clear;

# Check whether sshpass is installed
if [[ -z $(which sshpass) ]]; then
    echo "install sshpass to continue. (sudo apt install sshpass)"
    exit 1;
fi

# Remote access credentials
echo 'Remote access'
read -p "Host: " HOST
if [[ -z "$HOST" ]]; then
    HOST=$DEFAULT_HOST
fi

read -p "User: " USER
if [[ -z "$USER" ]]; then
    USER=$DEFAULT_USER
fi

stty -echo
read -p "Password: " PASSWORD
if [[ -z "$PASSWORD" ]]; then
    PASSWORD=$DEFAULT_PASSWD
fi
stty -echo

# Create a directory on the device for copying the project to
echo "Creating a directory for copying the project to"
sshpass -p ${PASSWORD} ssh ${USER}@${HOST} "mkdir ~/temp_ui"


# Copy project to the device
sshpass -p ${PASSWORD} scp -r ./build/* ${USER}@${HOST}:temp_ui/

# Install the application on remote device
sshpass -p ${PASSWORD} ssh -o StrictHostKeyChecking=no ${USER}@${HOST} << EOF

sudo su

cp -r ./temp_ui/* /opt/Edge_Gateway/build/public
rm -rf ./temp_ui

EOF

exit 0;