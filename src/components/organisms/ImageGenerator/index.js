import React from "react";
import styles from "./styles";
import { Image } from "../../atoms";

const ImageGenerator = ({ rowData }) => {
  // console.log("rowData: ", shopPosts.created.at.seconds);

  const data = [];

  for (let i = 0; i < rowData.length; i++) {
    data.push(<Image key={i} source={{ uri: rowData[i] }} style={styles.chatBoxInnerImage} />);
  }

  return data;
};
export { ImageGenerator };
