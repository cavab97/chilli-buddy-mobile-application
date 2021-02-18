import React from 'react';
import {
    View,
    Image,
    Text
} from "../atoms";

const NotFoundFooter = ({
    message
}) => {

    const { messageText, container, imageContainer } = styles;

    return (
        <View style={container}>
          <Image
            source={require("../../assets/chilliBuddyCheckin/chilliSadFace.png")}
            style={imageContainer}
            resizeMode="contain"
          />
          <Text style={messageText}>
              {message}
          </Text>
        </View>
    );
} 

const styles = {
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 40
    },
    imageContainer: {
        width: 150, 
        height: 200
    },
    messageText: {
        fontFamily: "HorizontalRounded", 
        fontSize: 16,
        paddingTop: 5,
    }
}

export { NotFoundFooter };