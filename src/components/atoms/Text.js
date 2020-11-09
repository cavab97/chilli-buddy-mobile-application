import React from "react";
import * as ReactNative from "react-native";

const Text = (props) => {
  return (
    <ReactNative.Text
      allowFontScaling={false}
      {...props}
      style={[{ fontFamily: "RobotoRegular" }, props.style]}
    >
      {props.children}
    </ReactNative.Text>
  );
};

export { Text };
