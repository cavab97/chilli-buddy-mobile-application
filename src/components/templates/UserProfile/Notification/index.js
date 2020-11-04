import React, { Component } from "react";

import {
  FlatList,
  Icon,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList
} from "../../../atoms";

import {
  Card,
  CardSection,
} from "../../../molecules";

import styles from "./styles";
import { Colors } from "../../../../settings/styles/theme";
import ContentLoader, { Rect } from 'react-content-loader/native';

import clone from "clone";

const DATA = [];

const NotificationListItem = ({ item, onPress = () => {} }) => {
  const { title, body, timeCount } = item;

  return (
    <Card style={styles.cardContainer}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <CardSection
          style={[styles.cardSectionStyle, styles.titleCardSectionStyle]}
        >
          <Text style={styles.titleFont}>{title}</Text>
          <Text style={styles.timeCountStyle} numberOfLines={1}>{timeCount}</Text>
        </CardSection>
        <CardSection
          style={[styles.cardSectionStyle, styles.buttonCardSectionStyle]}
        >
          <Text style={styles.descriptionStyle}>{body}</Text>
          <View style={styles.iconStyle}>
            <Icon name="check-circle" type="feather" color={Colors.PRIMARY} />
          </View>
        </CardSection>
      </TouchableOpacity>
    </Card>
  );
};



export class Notification extends Component {
  constructor(props) {
    super(props);
  }

  onClaimPress() {}

  //   cardReward = (timeCount, description) => {
  //     return (
  //       <Card style={styles.cardContainer}>
  //         <CardSection
  //           style={[styles.cardSectionStyle, styles.titleCardSectionStyle]}
  //         >
  //           <Text style={styles.titleFont}>Congratulation!</Text>
  //           <Text style={styles.timeCountStyle}>{timeCount}</Text>
  //         </CardSection>
  //         <CardSection
  //           style={[styles.cardSectionStyle, styles.descripCardSectionStyle]}
  //         >
  //           <Text style={styles.descriptionStyle}>{description}</Text>
  //         </CardSection>
  //         <CardSection
  //           style={[styles.cardSectionStyle, styles.buttonCardSectionStyle]}
  //         >
  //           <Button
  //             onPress={() => this.onClaimPress()}
  //             containerStyle={styles.buttonStyle}
  //           >
  //             CLAIM
  //           </Button>
  //         </CardSection>
  //       </Card>
  //     );
  //   };

  //   cardClaimed = (timeCount, description) => {
  //     return (
  //       <Card style={styles.cardContainer}>
  //         <CardSection
  //           style={[styles.cardSectionStyle, styles.titleCardSectionStyle]}
  //         >
  //           <Text style={styles.titleFont}>Reward Claimed!</Text>
  //           <Text style={styles.timeCountStyle}>{timeCount}</Text>
  //         </CardSection>
  //         <CardSection
  //           style={[styles.cardSectionStyle, styles.buttonCardSectionStyle]}
  //         >
  //           <Text style={styles.descriptionStyle}>{description}</Text>
  //           <View style={styles.iconStyle}>
  //             <Icon name="check-circle" type="feather" color={Colors.PRIMARY} />
  //           </View>
  //         </CardSection>
  //       </Card>
  //     );
  //   };

  getItemCount = (data) => {
    return 1;
  }
  
  getItem = (data, index) => {
    return {
      key: "notificationLoading" + index,
    }
  }

  render() {
    const { readLoading, onPress = ()=>{} } = this.props;
    let { dataSource } = clone(this.props);

    dataSource = dataSource.map((data) => {
      const timeCount = data.created.at.fromNow();
      return { ...data, timeCount };
    });

    if(readLoading){
      return(
        <VirtualizedList
          data={DATA}
          renderItem={(data) => {
            return (
              <Card style={styles.cardContainer}>
                <ContentLoader
                  speed={1}
                  width={"100%"}
                  height={80}
                  backgroundColor= "#d9d9d9"
                >
                  <Rect x="10" y="10" rx="4" ry="4" width="70%" height="30"/>
                  <Rect x="80%" y="30" rx="4" ry="4" width="17%" height="12"/>
                  <Rect x="10" y="50" rx="4" ry="4" width="50%" height="12"/>
                  <Rect x="85%" y="50" rx="4" ry="4" width="25" height="25"/>
                </ContentLoader>
              </Card>
            );
          }}
          initialNumToRender={1}
          keyExtractor={item => item.key}
          getItemCount={() => {return 1}}
          getItem={this.getItem.bind(this)}
        />
      );

    }
    else return (
      <View style={styles.scrollBox}>
      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <NotificationListItem item={item} onPress={onPress} />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponentStyle={{flex:1, paddingBottom: 30, justifyContent: 'flex-end'}}
        ListFooterComponent={<View/>}
      />
      </View>
    );
  }
}

export default Notification;
