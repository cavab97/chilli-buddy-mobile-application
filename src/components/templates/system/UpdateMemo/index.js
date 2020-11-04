import React from "react";

import { ImageBackground } from "../../../atoms";
import { Memo } from "../../../organisms/Memo";
import styles from "./styles";

const UpdateMemo = ({messages, options , imageBackgroundSource}) => {
    return (
        <ImageBackground source={imageBackgroundSource} style={styles.container}>
            <Memo title="Update Notice" messages={messages} options={options} /> 
        </ImageBackground>
    );
};

export { UpdateMemo };
