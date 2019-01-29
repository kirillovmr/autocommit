#!/bin/bash

# Creates and applies SSH keys to local machine. Returns public SSH key
# bash addkey.bash [username] [email] (optional: [owerwrite] )
# 
# Check README.md for setup guide
# Author @kirillovmr
# GitHub https://github.com/kirillovmr/autocommit

username="$1"
email="$2"
overwrite="$3"

if [ "${username}" == "" ] || [ "${email}" == "" ]; then
  echo "ERROR_ARGUMENTS: provide params username and email"
  exit
fi

sshPath=~/.ssh
keyPath=${sshPath}/id_rsa_${username}

# Check if key exists
if [ -f ${keyPath} ]; then

  # Parsing owerwrite 
  if [ "${overwrite}" == "" ]; then
    echo "Key for ${username} exists"
    exit
  else
    # Deleting current key to generate new
    echo "Regenerating key"
    rm ${keyPath}
    rm ${keyPath}.pub
  fi
fi

# Generating new key
ssh-keygen -t rsa -b 4096 -C ${email} -N "" -f ${keyPath}

# Adding SSH key to ssh-agent
eval "$(ssh-agent -s)"
ssh-add -k ${keyPath}

# Adding rules to config file
echo -e "\n" >> ${sshPath}/config
echo "Host ${username}.github.com" >> ${sshPath}/config
echo "HostName github.com" >> ${sshPath}/config
echo "PreferredAuthentications publickey" >> ${sshPath}/config
echo "IdentityFile ${keyPath}" >> ${sshPath}/config

# Output Public SSH key
echo "$(<${keyPath}.pub)"