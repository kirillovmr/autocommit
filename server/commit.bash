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
REPO_NAME="autocommit" # Repo which will be used for auto commits
COMMITS_PER_DAY=1 # number of auto commits per day

_date=`date +%Y-%m-%d`
_time=`date +%H:%M:%S`
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
if ! git clone https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git
then
  # Repo was not found on GitHub, creating
  echo 'Creating repo'
  curl -X POST https://api.github.com/user/repos -u ${GITHUB_USERNAME}:$GITHUB_TOKEN -d '{"name":"'${REPO_NAME}'"}'

  if ! git clone https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git
  then  
    echo 'Error clonning repo second time'
    exit
  fi
fi

cd ${REPO_NAME}

git config --local user.name ${GITHUB_USERNAME}
git config --local user.email ${GITHUB_EMAIL}

#
# Making commits
# # #
for i in {1..${COMMITS_PER_DAY}}
do
  > ${_filename}
  echo -e "Auto Commit ${_time} \n" >> ${_filename}
  git add .
  git commit -m "Auto Commit ${_date} ${_time}"
  git push -u origin master
  sleep 20
done