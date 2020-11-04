import React from "react";
import {
    View,
    RefreshControl,
    ImageBackground,
} from "../../../atoms";

import { RouteAreaList } from "../../../organisms/RouteAreaList";

import styles from "./styles";

const AreaRouteGroupList = ({
    totalMissionTitle,
    periodTitle,
    data,
    statusTitle,
    onSingleRouteMapPress,
    readLoading,
    backgroundPicture
}) => {
    return (
        <ImageBackground 
            source={backgroundPicture} 
            style={{flex: 1}}
        >
            <View style={{backgroundColor:'rgba(255,255,255,0.8)', flex: 1}}>
                <RouteAreaList
                    data={data}
                    style={styles}
                    totalMissionTitle={totalMissionTitle}
                    periodTitle={periodTitle}
                    statusTitle={statusTitle}
                    onSingleRouteMapPress={onSingleRouteMapPress}
                    readLoading={readLoading}
                /> 
            </View>
        </ImageBackground>
    );
}

export { AreaRouteGroupList };