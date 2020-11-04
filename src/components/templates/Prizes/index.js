import React from "react";
import styles from "./styles";
import {
    View,
    Text,
    FlatList,
    Overlay,
    TouchableOpacity,
    Image
} from "../../atoms";
import { ImageInfo } from "../../molecules";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const Prizes = ({
    data,
    reward,
    rewardPress,
    modalControl,
    showModal,
    readLoading
})=> {
    const RewardList = ({data, index}) => {
        return(
            <View>
                <TouchableOpacity
                    onPress={() => rewardPress(data)}
                >
                    <View style={styles.row}>
                        <Text style={styles.rank}>{index + 1}</Text>
                        <View style={styles.imageContainer}>
                            <ImageInfo
                                banner={
                                    data.images[0]
                                    ? data.images[0]
                                    : require("../../../../assets/DefaultAvatar.jpg")
                                }
                                imageContainer={styles.image}
                                imageStyle={styles.imageFrame}
                            />
                        </View>
                        <Text style={styles.title}>{data.title}</Text> 
                        <Text style={styles.totalNumber}>{"x " + data.quantity}</Text> 
                    </View>
                    <View style={styles.line} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        readLoading ?
            <View style={styles.container}>
              <ContentLoader
                speed={1}
                width={"100%"}
                height={95}
                backgroundColor= "#d9d9d9"
              >
                <Rect x="5" y="30" rx="4" ry="4" width="20" height="20" />
                <Circle cx="19%" cy="45" r="30"/>
                <Rect x="30%" y="35" rx="4" ry="4" width="30%" height="16" />
              </ContentLoader>
              <View style={styles.line} />
            </View>
          :
            (<View style={styles.screenContainer}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <RewardList data={item} index={index} /> }
                    showsVerticalScrollIndicator={false}
                    style = {styles.container}
                />

                <Overlay
                    onBackdropPress={() => modalControl()}
                    isVisible={showModal}
                    width="auto"
                    height="50%"
                    overlayStyle={styles.modalContainer}
                >
                {   reward.images[0] ?
                    <Image
                        source={{uri: reward.images[0]}}
                        style={styles.imageBackgroundStyle}
                    />
                    :
                    <Image
                        source={require("../../../../assets/DefaultAvatar.jpg")}
                        style={styles.imageBackgroundStyle}
                    />
                }
                </Overlay>
            </View>)
    );
    


};

export { Prizes };