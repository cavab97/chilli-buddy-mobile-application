/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from "expo-constants";
import { Platform } from "react-native";

// const localhost =
//  Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
  dev: {
    //    apiUrl: localhost,
    //    amplitudeApiKey: null,
    FIREBASE_API_KEY: "AIzaSyDKmyewOf5zdgVYrgg0u44SMFEcyrmvKmA",
    FIREBASE_AUTH_DOMAIN: "gogogain-dev.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://gogogain-dev.firebaseio.com/",
    FIREBASE_PROJECT_ID: "gogogain-dev",
    FIREBASE_STORAGE_BUCKET: "gs://gogogain-dev.appspot.com/",
    FIREBASE_MESSAGING_SENDER_ID: "473612187597",

    FIREBASE_CLOUD_FUNCTION: "https://us-central1-gogogain-dev.cloudfunctions.net",

    ANDROID_CLIENT_ID: "473612187597-g7ig9g40bn8ml3nb0oop5pe9mo63nigm.apps.googleusercontent.com",

    IOS_CLIENT_ID: "473612187597-lj81ptfgp4mdqdrqa7bcae1c95ru36tf.apps.googleusercontent.com",

    FACEBOOK_APP_ID: "440875199903483",
  },
  staging: {
    //    apiUrl: "[your.staging.api.here]",
    //    amplitudeApiKey: "[Enter your key here]",
    FIREBASE_API_KEY: "AIzaSyCANZCZHh4q42J8NM2kWWBp0be6OdlPhRI",
    FIREBASE_AUTH_DOMAIN: "gogogain-stanging.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://gogogain-stanging.firebaseio.com/",
    FIREBASE_PROJECT_ID: "gogogain-stanging",
    FIREBASE_STORAGE_BUCKET: "gs://gogogain-stanging.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "1042206429903",

    FIREBASE_CLOUD_FUNCTION: "https://us-central1-gogogain-stanging.cloudfunctions.net",

    ANDROID_CLIENT_ID: "1042206429903-gtq16v98klmv7o12prb73ve0b7prnaf8.apps.googleusercontent.com",
    IOS_CLIENT_ID: "1042206429903-2g1g6sc5tr42vqvqi1nes0la2ae9f04j.apps.googleusercontent.com",

    FACEBOOK_APP_ID: "440875199903483",
    // Add other keys you want here
  },
  prod: {
    //    apiUrl: "[your.production.api.here]",
    //    amplitudeApiKey: "[Enter your key here]",
    FIREBASE_API_KEY: "AIzaSyAo-D7vn70nwtBfFJTQWaJdkJEVR-9b-iY",
    FIREBASE_AUTH_DOMAIN: "gogogain-gogogain.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://gogogain-gogogain.firebaseio.com/",
    FIREBASE_PROJECT_ID: "gogogain-gogogain",
    FIREBASE_STORAGE_BUCKET: "gs://gogogain-gogogain.appspot.com/",
    FIREBASE_MESSAGING_SENDER_ID: "431448808009",

    FIREBASE_CLOUD_FUNCTION: "https://us-central1-gogogain-gogogain.cloudfunctions.net",

    ANDROID_CLIENT_ID: "431448808009-ht81nmtfnkqmq28h28kvmgj0vr98ggpv.apps.googleusercontent.com",
    IOS_CLIENT_ID: "431448808009-8bqpj6drcnesq7timfdpp1ub3a2duquu.apps.googleusercontent.com",

    FACEBOOK_APP_ID: "440875199903483",
    // Add other keys you want here
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.

  if (__DEV__ || env === "dev") {
    console.log("running in xevelopment mode");
    // return ENV.dev;
    // return ENV.staging;
    return ENV.prod;
  } else if (env === "staging") {
    console.log("running in staging mode");
    return ENV.staging;
  } else if (env === "prod") {
    console.log("running in prod mode");
    return ENV.prod;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;
