import React from "react";

import { ImageBackground } from "../../../atoms";
import styles from "./styles";

const Splash = ({
    source
}) => {
    return (
        <ImageBackground
            source={source}
            style={styles.container}
        />
    );
};

export { Splash };
