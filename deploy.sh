#!/bin/bash

#   deploy.sh
#   Deploy the Edge Gateway UI to a device on your
#   local network using sshpass.

DEFAULT_USER=spuq
DEFAULT_HOST=192.168.1.105

clear;

# Check whether sshpass is installed
if [[ -z $(which sshpass) ]]; then
    echo "install sshpass to continue. (sudo apt install sshpass)"
    exit 1;
fi

# Remote access credentials
echo -e '\e[0;33m-------------------------------------- \e[m'
echo -e '\e[0;33m For accessing the remote device, the  \e[m'
echo -e '\e[0;33m login credentials are required.       \e[m'
echo -e '\e[0;33m-------------------------------------- \e[m'

read -p "Host ($DEFAULT_HOST): " HOST
if [[ -z "$HOST" ]]; then
    HOST=$DEFAULT_HOST
fi

read -p "User ($DEFAULT_USER): " USER
if [[ -z "$USER" ]]; then
    USER=$DEFAULT_USER
fi


stty -echo
read -p "Password: " PASSWORD
stty -echo
echo ""
echo ""

# Create a directory on the device for copying the project to
echo -e '\e[0;32mCreating temporary directory for the project... \e[m'
sshpass -p ${PASSWORD} ssh ${USER}@${HOST} "mkdir ~/temp_ui"


# Copy project to the device
echo -e '\e[0;32mCopying project to device... \e[m'
sshpass -p ${PASSWORD} scp -r ./build/* ${USER}@${HOST}:temp_ui/

# Install the application on remote device
sshpass -p ${PASSWORD} ssh -o StrictHostKeyChecking=no ${USER}@${HOST} << EOF

sudo su

echo -e '\e[0;32mInstalling project in public folder... \e[m'
cp -r ./temp_ui/* /opt/Edge_Gateway/build/public
echo -e '\e[0;32mCleaning up... \e[m'
rm -rf ./temp_ui

EOF

echo -e '\e[0;32mDone \e[m'
exit 0;