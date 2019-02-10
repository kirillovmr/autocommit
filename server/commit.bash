#!/bin/bash

# Every-day GitHub autocommits to keep your activity!
# 
# Check README.md for setup guide
# Author @kirillovmr
# GitHub https://github.com/kirillovmr/autocommit

#
# Settings
# # #
GITHUB_USERNAME="$1"
GITHUB_EMAIL="$2"
GITHUB_TOKEN="$3"
COMMITS_NUM=$4
REPO_NAME="_autocommit" # Repo which will be used for auto commits

_filename="auto.md"
_users_folder="users"

# Deleting user folder
rm -rf "${_users_folder}/${GITHUB_USERNAME}"

# Wait to ensure that folder deleted
sleep 4

# Creating user folder if it does not exists
mkdir -p "${_users_folder}/${GITHUB_USERNAME}"
cd "${_users_folder}/${GITHUB_USERNAME}"

#
# Clonning and setting up repo
# # #
if ! GIT_TERMINAL_PROMPT=0 git clone https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git
then
  # Repo was not found on GitHub, creating
  echo 'Creating repo'
  curl -X POST https://api.github.com/user/repos -u ${GITHUB_USERNAME}:$GITHUB_TOKEN -d '{"name":"'${REPO_NAME}'", "private":"true"}'
  sleep 3

  if ! GIT_TERMINAL_PROMPT=0 git clone https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git
  then  
    exit 2
  fi
fi

cd ${REPO_NAME}

git config user.name ${GITHUB_USERNAME}
git config user.email ${GITHUB_EMAIL}

#
# Making commits
# # #
for (( c=1; c<=$COMMITS_NUM; c++ ))
do
  _date=`date +%Y-%m-%d`
  _time=`date +%H:%M:%S`
  > ${_filename}
  echo -e "Auto Commit ${_time} \n" >> ${_filename}
  git add .
  git commit -m "Auto Commit ${_date} ${_time}"
  git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git
  if ! git push -u origin master
  then
    exit 1
  fi

  if [ ! $c -eq $COMMITS_NUM ]
  then
    echo "Waiting for next commit"
    sleep 15
  fi
done