import React from "react";

import { ImageBackground, Image } from "../../../atoms";
import styles from "./styles";
const restaurant = require("../../../../assets/images/RestaurantAndMarks_Icon.png");
const dot = require("../../../../assets/images/Dot_Icon.png");
const chilliBuddyIcon = require("../../../../assets/images/ChilliBuddy_Icon.png");
const SplashNew = require("../../../../assets/images/splashNew.png");

const Splash = ({ source }) => {
  return (
    // <ImageBackground style={styles.container}>
    //   <Image source={chilliBuddyIcon} style={styles.chilliIcon} />

    //   <Image source={restaurant} style={styles.restaurant} />
    //   <Image source={dot} style={styles.dot} />
    // </ImageBackground>
    <ImageBackground source={SplashNew} style={styles.container}></ImageBackground>
  );
};

export { Splash };
