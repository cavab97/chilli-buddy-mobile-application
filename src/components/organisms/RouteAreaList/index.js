import React from "react";
import { Platform } from "react-native";

import {
  FlatList, 
  Text,
  TouchableOpacity, 
  View
} from "../../atoms";

import { 
  Card,
  CardLabel,
  CardSection, 
  IconButton, 
} from "../../molecules";

import ContentLoader, { Rect } from "react-content-loader/native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

import styles from "./styles";

const RouteAreaList = ({
  totalMissionTitle,
  periodTitle,
  data,
  statusTitle,
  onSingleRouteMapPress,
  style,
  readLoading,
}) => {

  if (readLoading)
    return (
      <View style={style.container}>
        <Card style={style.card}>
          <View style={style.rowZero}>
            <ContentLoader
              speed={1}
              width={"100%"}
              height={35}
              backgroundColor="#bfbfbf"
            >
              <Rect x="0" y="8" rx="5" ry="5" width="90%" height="28" />
            </ContentLoader>
          </View>
          <View style={style.rowOne}>
            <ContentLoader
              speed={1}
              width={"100%"}
              height={35}
              backgroundColor="#bfbfbf"
            >
              <Rect x="0" y="8" rx="5" ry="5" width="50%" height="28" />
            </ContentLoader>
          </View>
          <View style={style.line} />
          <View style={style.rowTwo}>
            <ContentLoader
              speed={1}
              width={"100%"}
              height={20}
              backgroundColor="#bfbfbf"
            >
              <Rect x="0" y="0" rx="5" ry="5" width="40%" height="16" />
            </ContentLoader>
          </View>
          <View style={style.rowThree}>
            <ContentLoader
              speed={1}
              width={"100%"}
              height={18}
              backgroundColor="#bfbfbf"
            >
              <Rect x="0" y="0" rx="5" ry="5" width="50%" height="16" />
            </ContentLoader>
          </View>
        </Card>
      </View>


      
    );
  else
    return data[0] === undefined ? (
      Platform.OS === "ios" ? (
        <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
          <CardSection style={[styles.emptySection, { elevation: 0 }]}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO ROUTE FOUND</Text>
          </CardSection>
        </Card>
      ) : (
        <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
          <CardSection style={[styles.emptySection, { elevation: 0 }]}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO ROUTE FOUND</Text>
          </CardSection>
        </Card>
      )
    ) : (
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onSingleRouteMapPress(item)}>
            <View style={style.container}>
              <Card
                style={[
                  style.card,
                  item.routeTicketId
                    ? {
                        borderWidth: 2,
                        borderColor: "#FF9100",
                        borderBottomColor: "#FF9100",
                        borderBottomWidth: 2,
                      }
                    : {},
                ]}
              >
                {/* <CardLabel
                  containerStyle={style.subContainerIcon}
                  iconStyle={style.icon}
                  iconName="circle"
                  iconColor={item.ended.at ? "#ff0000": (item.ongoing.at ? "#65FF03" : "#ff9900")}
                  iconSize={15}
                /> */}

                <View style={style.rowZero}>
                  <Text style={style.routeNumber}>{item.title}</Text>
                  <IconButton
                    iconName={
                      item.routeTicketId ? "md-arrow-forward" : "ios-lock"
                    }
                    //iconName="md-arrow-forward"
                    iconColor="#f18a22"
                    iconSize={28}
                  />
                </View>
                <View style={style.rowOne}>
                  <Text style={style.areaName}>{item.type}</Text>
                </View>
                <View style={style.line} />
                <View style={style.rowTwo}>
                    <CardLabel
                      containerStyle={style.subContainer}
                      label={totalMissionTitle}
                      labelValue={item.totalMissions}
                      textStyle={style.textColor}
                    />
                    {item.category === "CheckIn" && 
                      <IconButton
                      iconName = {"md-camera"}
                      iconColor = "#f18a22"
                      iconSize = {28}
                      />
                    }
                </View>
                <View style={style.rowThree}>
                  <CardLabel
                    containerStyle={style.subContainer}
                    label={statusTitle}
                    labelValue={item.ended.at ? "Ended": (item.ongoing.at ? "Active" : "To Be Unlocked")}
                    textStyle={style.textColor}
                  />
                </View>
                <View style={style.rowThree}>
                  <CardLabel
                    containerStyle={style.subContainer}
                    label={periodTitle}
                    labelValue={moment(item.startTime).format("DD MMM YYYY")}
                    labelValue2=" - "
                    labelValue3={moment(item.endTime).format("DD MMM YYYY")}
                    textStyle={style.textColor}
                  />
                </View>
              </Card>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };

export { RouteAreaList };
