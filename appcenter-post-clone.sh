#!/usr/bin/env bash
#type $ sh appcenter-post-clone.sh dev  to 

if [ “$APPCENTER_BRANCH” == “prod” ] || [ “$1” == “prod” ];
then
  echo “Switching to Firebase Production environment”
  yes | cp -rf firebase_environments/production/google-services.json google-services.json
  yes | cp -rf firebase_environments/production/GoogleService-Info.plist GoogleService-Info.plist 
elif [ “$1” == “dev” ]
then
  echo “Switching to Firebase Development environment”
  yes | cp -rf firebase_environments/development/google-services.json google-services.json
  yes | cp -rf firebase_environments/development/GoogleService-Info.plist GoogleService-Info.plist 
elif [ “$1” == “staging” ]
then
  echo “Switching to Firebase Staging environment”
  yes | cp -rf firebase_environments/staging/google-services.json google-services.json
  yes | cp -rf firebase_environments/staging/GoogleService-Info.plist GoogleService-Info.plist
elif [ “$1” == “prodhuawei” ]
then
  echo “Switching to Huawei Firebase Production environment”
  yes | cp -rf firebase_environments/production/google-services.json google-services.json
  yes | cp -rf firebase_environments/production/GoogleService-Info.plist GoogleService-Info.plist  
elif [ “$1” == “envs” ]
then
  echo “ID\tFIREBASE PROJECT”
  echo “prod\tgogogain-production”
  echo “dev\tgogogain-development”
  echo “staging\tgogogain-“staging
else
  echo “Run ‘appcenter-post-clone.sh envs’ to list available environments.”
fi

