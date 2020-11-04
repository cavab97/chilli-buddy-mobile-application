import React from "react";
import { Linking, Platform, Alert } from "react-native";

import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Overlay,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "../../../atoms";

import {
  Header,
  IconButton,
  ImageInfo,
} from "../../../molecules";

import RouteMap9 from "../RouteMap/RouteMap9";
import RouteMap15 from "../RouteMap/RouteMap15";

import { InfoBox } from "../../../organisms/InfoBox";

import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../../settings/styles/theme";
import moment from "moment";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

import styles from "./styles";

const SingleRoutes = ({
  currency,
  routeData,
  routeTicketData,
  missionData,
  mission,
  banner,
  map,
  isJoined,
  onUnlockPress,
  inviteButtonTitle,
  facebookButtonTitle,
  isVisible,
  isUnlockLoading = false,
  facebookSharePress = () => {},
  invitePress = () => {},
  missionPress = () => {},
  showModal,
  descriptionTitle,
  payTitle,
  pendingTransaction,
  onPay = () => {},
  onPayAmount = () => {},
  onCameraCheckIn = () => {},
  onRulesPress = () => {},
  onPrizesPress,
  onCompletedPress,
  readLoadingRouteTicket,
  readLoadingRoute,
  readLoadingMission,
  readLoadingReward,
  errorSubmit,
  errorHeader,
  errorModal,
}) => {
  const now = moment();
  const dayTable = [6, 0, 1, 2, 3, 4, 5];
  const day = dayTable[now.day()];

  const sortedMission = missionData

  sortedMission.sort((a,b)=>{
    return a.minSpend - b.minSpend
  })

  //status
  const onGoing = routeData.ongoing.boolean;
  const ended = routeData.ended.boolean;
  const joined = isJoined;
  const routeCompleted =
    routeTicketData.numberCompletedMissions >= routeData.totalMissions;
  const obtainedReward = routeTicketData.reward;

  const { height } = Dimensions.get("window");

  if (
    readLoadingRouteTicket ||
    readLoadingRoute ||
    readLoadingMission ||
    readLoadingReward
  ) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ContentLoader
            speed={1}
            width={"100%"}
            height={height}
            backgroundColor="#d9d9d9"
          >
            <Rect x="60%" y="0" rx="5" ry="5" width="40%" height="20" />
            <Rect x="0" y="40" rx="5" ry="5" width="100%" height="200" />
            <Rect x="0" y="250" rx="5" ry="5" width="50%" height="20" />
            <Rect x="0" y="275" rx="5" ry="5" width="50%" height="20" />
            <Rect x="0" y="320" rx="5" ry="5" width="100%" height={height} />
          </ContentLoader>
        </View>
      </ScrollView>
    );
  } else
    return (
      <ScrollView>
        {routeCompleted && (
          <InfoBox
            title="Congratulation"
            message="You have completed all missions. Winner Lists will be announced soon."
            titleStyle={styles.infoTitle}
            messageStyle={styles.infoSubtitle}
            containerStyle={styles.infoContainer}
          />
        )}

        {/* {obtainedReward.id && (
          <InfoBox
            title="Congratulation"
            message={`You had win rank ${obtainedReward.rank} in this route, with the reward ${obtainedReward.title}.`}
            titleStyle={styles.infoTitle}
            messageStyle={styles.infoSubtitle}
            containerStyle={styles.infoContainer}
          />
        )}

        {ended && (
          <InfoBox
            title="Thank you"
            message="This route had ended, feel free to check out reward list."
            titleStyle={styles.infoTitle}
            messageStyle={styles.infoSubtitle}
            containerStyle={styles.infoContainer}
          />
        )} */}

        {pendingTransaction.length > 0 && (
          <InfoBox
            title="Memo"
            message={`Some of the transactions in review proccess.`}
            titleStyle={styles.infoTitle}
            messageStyle={styles.infoSubtitle}
            containerStyle={styles.infoContainer}
          />
        )}

        <Overlay
          isVisible={errorModal}
          width="100%"
          height="100%"
          overlayStyle={styles.errorContainer}
        >
          <View style={styles.contentContainer}>
            <Icon name="ios-close-circle-outline" color="white" size={70} />
            <Text style={styles.subjectText}>{errorHeader}</Text>
            <Text style={styles.messageText}>{errorSubmit}</Text>
          </View>
        </Overlay>
        <View style={styles.container}>
          <Header
            title={
              ended
                ? "Status : "
                : onGoing
                ? "Remaining Time : "
                : "Seat Left : "
            }
            subtitle={
              ended
                ? "End"
                : onGoing
                ? (
                    routeData.endTime <= moment()
                    ? "End"
                    : (
                    moment(routeData.endTime).diff(moment({hours: 0}), 'days') <= 1 
                    ? routeData.endTime.from(moment(), true)
                    : moment(routeData.endTime).diff(moment({hours: 0}), 'days') + " days"
                    )
                  )
                : routeData.minimumUser - routeData.currentUser
            }
            subtitleDescription={!onGoing && " pax"}
            subContainer={styles.rowOne}
            titleStyle={styles.title}
            subtitleStyle={styles.titleValue}
          />
          <ImageInfo
            banner={banner}
            imageContainer={styles.imageContainer}
            imageStyle={styles.image}
            title={joined ? "Complete : " : "Total Mission : "}
            subtitle={
              joined
                ? routeTicketData.numberCompletedMissions +
                  "/" +
                  routeData.totalMissions
                : routeData.totalMissions
            }
            title2={joined ? "Participants : " : "Mission Period : "}
            subtitle2Part1={
              joined ? ">" : moment(routeData.startTime).format("DD MMM")
            }
            subtitle2Part2={joined ? routeData.currentUser : "- "}
            subtitle2Part3={
              joined ? " pax" : moment(routeData.endTime).format("DD MMM YYYY")
            }
            textStyle={styles.imageSubtitle}
            textStyle2={styles.imageSubtitle2}
          />
          <View style={styles.rowTwo}>
            <IconButton
              iconName="ios-gift"
              iconColor="#f18a22"
              iconSize={20}
              iconContainer={styles.iconSubtitleContainer}
              titleStyle={styles.iconSubtitle}
              title="Prizes"
              onPress={() => onPrizesPress()}
            />
            <IconButton
              iconName="md-trophy"
              iconColor="#f18a22"
              iconSize={20}
              iconContainer={styles.iconSubtitleContainer}
              titleStyle={styles.iconSubtitle}
              title="Completed"
              onPress={onCompletedPress}
            />
            <IconButton
              iconName="md-information-circle"
              iconColor="#f18a22"
              iconSize={20}
              iconContainer={styles.iconSubtitleContainer}
              titleStyle={styles.iconSubtitle}
              title="Rules"
              onPress={() => onRulesPress(routeData.rules, routeData.terms)}
            />
          </View>
          {onGoing && <View style={styles.line} />}

          {!joined && (
            <ImageBackground
              source={map}
              style={styles.map}
              imageStyle={{ ...styles.image, opacity: 0.5 }}
            >
              <IconButton
                onPress={!ended ? onUnlockPress : null}
                iconName="md-lock"
                iconColor={!ended ? "#f18a22" : "#8a8a8a"}
                iconSize={48}
                iconContainer={styles.unlockButton}
                titleStyle={styles.iconSubtitle}
                title={!ended ? "UNLOCK MAP" : null}
              />
              <ActivityIndicator
                size="large"
                color="#f18a22"
                animating={isUnlockLoading}
              />
              {isVisible && (
                <View>
                  <Button
                    titleStyle={styles.titleButton}
                    buttonStyle={styles.shareButton}
                    title={facebookButtonTitle}
                    onPress={facebookSharePress}
                  />
                  {routeData.type === "Luxury" && (
                    <Button
                      titleStyle={styles.titleButton}
                      buttonStyle={styles.inviteButton}
                      title={inviteButtonTitle}
                      onPress={invitePress}
                    />
                  )}
                </View>
              )}
            </ImageBackground>
          )}

          {joined && !onGoing && (
            <ImageBackground
              source={map}
              style={styles.map}
              imageStyle={{ ...styles.image, opacity: 0.5 }}
            >
              <View style={styles.pendingBackground}>
                <View style={styles.pendingView}>
                  <Text style={styles.pendingText}>
                    Waiting {routeData.minimumUser - routeData.currentUser} more
                    player to start.
                  </Text>
                </View>

                <View>
                  <Button
                    titleStyle={styles.titleButton}
                    buttonStyle={[
                      styles.shareButton,
                      { backgroundColor: Colors.GRAY_MEDIUM },
                    ]}
                    title={facebookButtonTitle}
                    //onPress={facebookSharePress}
                  />
                  <Button
                    titleStyle={styles.titleButton}
                    buttonStyle={[
                      styles.inviteButton,
                      { backgroundColor: Colors.GRAY_MEDIUM },
                    ]}
                    title={inviteButtonTitle}
                    //onPress={invitePress}
                  />
                </View>
              </View>
            </ImageBackground>
          )}

          {joined && onGoing && (
            <View>
              <Header
                title={routeData.title}
                subContainer={styles.rowText}
                titleStyle={styles.title}
                subtitleStyle={styles.title}
              />
              <Text style={styles.mapTitle}>Map:</Text>
              {/* <TouchableOpacity>
                <ImageInfo
                  banner={map}
                  imageContainer={styles.mapBanner}
                  imageStyle={styles.image}
                  onPress={true}
                />
              </TouchableOpacity> */}

              {routeData.station === 9 && <RouteMap9
                  data={sortedMission}
                  missionPress={missionPress}
                  finalizing={routeData.ended.by ? true : false}
                />
              }
              {routeData.station === 15 && <RouteMap15 
                  data={missionData}
                  missionPress={missionPress}
                  finalizing={routeData.ended.by ? true : false}
                />
              }

              { routeData.ended.by === null &&

              <View>
                <Text style={styles.mapTitle}>Shop:</Text>

                <Overlay
                  onBackdropPress={() => missionPress(null)}
                  isVisible={showModal}
                  width="auto"
                  height="80%"
                  overlayStyle={styles.modalContainer}
                >
                  <View style={styles.shopContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={styles.missionContainer}>
                        {/* <IconButton
                          iconName="ios-close"
                          iconColor="black"
                          iconSize={30}
                          iconContainer={styles.closeButton}
                          onPress={() => missionPress(null)}
                        /> */}
                        <View style={styles.missionTitleContainer}>
                          <View style={styles.overlayTitleContainer}>
                            <Text style={styles.missionTitle}>
                              {mission.shop.displayTitle}
                            </Text>
                          </View>
                          <ImageInfo
                            banner={
                              mission.shop.images[0]
                                ? mission.shop.images[0]
                                : mission.shop.logo[0]
                                ? mission.shop.logo[0]
                                : require("../../../../assets/banner.jpg")
                            }
                            imageContainer={styles.overlayImage}
                            imageStyle={styles.image}
                          />
                          { routeData.category !== "CheckIn" ?
                          <View style={styles.overlaySubtitleContainer}>
                            <Text style={styles.overlaySubtitle}>Minimum Pay :</Text>
                            <Text style={styles.overlayCurrencyTitle}>
                              {} {currency}
                              {mission.minSpend.toFixed(2)}
                            </Text>
                          </View> :
                          <View style={styles.overlaySelfieSubtitleContainer}>
                          <Text style={styles.overlaySubtitle}>Snap a selfie with an iconic landmark</Text>
                          </View> }
                          <View style={styles.overlayDescription}>
                            <IconButton
                              iconName="ios-alarm"
                              iconColor="#f18a22"
                              iconSize={20}
                            />
                            <Text style={styles.overlayTextRow}>
                              {mission.shop.operatingHour[day].day}{" "}
                              {mission.shop.operatingHour[day].open} -{" "}
                              {mission.shop.operatingHour[day].close}
                            </Text>
                          </View>
                          <View style={styles.overlayDescription}>
                            <IconButton
                              iconName="ios-call"
                              iconColor="#f18a22"
                              iconSize={20}
                            />
                            <Text 
                              style={styles.overlayTextRow}
                              onPress={() => {

                                Linking.openURL(`tel:${mission.shop.phoneNumber}`);
                              }} 
                            >
                              {mission.shop.phoneNumber}
                            </Text>
                          </View>
                          <View style={styles.overlayDescription}>
                            <IconButton
                              iconName="ios-pin"
                              iconColor={Colors.PRIMARY}
                              iconSize={20}
                            />
                            <Text 
                              style={styles.overlayTextRow} 
                              onPress={() => {
                                const latitude = mission.l.latitude;
                                const longitude = mission.l.longitude;
                                Linking.openURL(`http://www.google.com/maps/place/${latitude},${longitude}`);
                              }} 
                            >
                                {mission.shop.address.line1} {mission.shop.address.line2} {mission.shop.address.postcode} {mission.shop.address.state}
                            </Text>
                          </View>
                          {mission.shop.description !== null &&
                          <View>
                            <Text style={styles.overlayTitle}>
                              {descriptionTitle}
                            </Text>
                            <Text  style={styles.overlayDescriptionContent}>
                              {mission.shop.description}
                            </Text>
                          </View>}
                        </View>
                      </View>
                    </ScrollView>
                    <View style={styles.overlayButtonContainer}>
                      <IconButton
                        iconName="logo-facebook"
                        iconColor="#f18a22"
                        iconSize={30}
                        iconContainer={styles.iconButtonContainer}
                        onPress={() => {
                          if (!mission.shop.facebookUrl) {
                            return Alert.alert("Sorry, we don't have facebook page.");
                          }
                          if (Platform.OS === "android") {
                            Linking.openURL(
                              "fb://facewebmodal/f?href=" +
                                mission.shop.facebookUrl
                            );
                          }

                          if (Platform.OS === "ios") {
                            Linking.openURL(mission.shop.facebookUrl);
                          }
                        }}
                      />
                      <View style={styles.overlaySingleButtonContainer}>
                        {routeData.category !== "CheckIn" ?
                        <Button
                        titleStyle={styles.overlayButtonTitle}
                        buttonStyle={styles.payButton}
                        title={payTitle}
                        disabled={mission.completed || ended}
                        onPress={() => onPayAmount(mission)}
                      /> :
                      <IconButton
                        iconName="md-camera"
                        iconColor="white"
                        iconSize={25}
                        iconContainer={mission.completed || ended ? styles.disabledIconPayButton : styles.iconPayButton}
                        loading={mission.completed || ended}
                        onPress={() => {if(routeData.category==null || routeData.category=="Normal"){ onPayAmount(mission)} else {onCameraCheckIn(mission)}}}
                      />
                        }
                        
                      </View>
                      <IconButton
                        iconName="logo-instagram"
                        iconColor="#f18a22"
                        iconSize={30}
                        iconContainer={styles.iconButtonContainer}
                        onPress={() =>{
                          if (!mission.shop.instagramUrl) {
                            return Alert.alert("Sorry, we don't have instagram.");
                          }

                          Linking.openURL(
                            "instagram://user?username=" +
                              mission.shop.instagramUrl.replace(/ /g, '')
                          )
                        }
                        }
                      />
                    </View>
                  </View>
                </Overlay>
                <FlatList
                  data={missionData}
                  renderItem={({ item, index }) => (
                    <View>
                      <TouchableOpacity
                        style={ item.completed 
                                  ? styles.completedMissionRow
                                  : styles.missionRow
                              }
                        onPress={() => missionPress(item)}
                      >
                        <Text
                          style={
                            item.completed
                              ? styles.completedMissionCurrencyTitle
                              : styles.missionCurrencyTitle
                          }
                        >
                          {index + 1}
                        </Text>
                        <View style={styles.missionImageContainer}>
                          <ImageInfo
                            banner={
                              item.shop.logo[0]
                                ? item.shop.logo[0]
                                : require("../../../../assets/iconcopy.png")
                            }
                            imageContainer={styles.missionImage}
                            imageStyle={styles.missionImageFrame}
                          />
                        </View>
                        <View style={styles.missionTitleContainer}>
                          <Text style={item.completed 
                                        ? styles.completedMissionTitle
                                        : styles.missionTitle
                          }>
                            {item.shop.displayTitle}
                          </Text>
                        </View>
                        {
                          (item.completed) && /* && item.transactionStatus === "approved" ) ? */
                            <Image
                              source={require("../../../../assets/gogogain/Completed_Stamp.png")}
                              style={styles.completedStamp}
                            />
                          /* :
                          (item.transactionStatus === "pending") &&
                            <Image
                              source={require("../../../../assets/gogogain/Pending.png")}
                              style={styles.completedStamp}
                            /> */
                        }
                        {routeData.category !== "CheckIn" &&
                        <View>
                          <Text style={item.completed
                                        ? styles.completedMissionSubtitle
                                        : styles.missionSubtitle
                          }>
                            Minimum Pay
                          </Text>
                          <View style={styles.currencyContainer}>
                            <Text
                              style={
                                item.completed
                                  ? styles.completedMissionCurrencyTitle
                                  : styles.missionCurrencyTitle
                              }
                            >
                              {currency}
                            </Text>
                            <Text
                              style={
                                item.completed
                                  ? styles.completedMissionCurrencyTitle
                                  : styles.missionCurrencyTitle
                              }
                            >
                              {item.minSpend.toFixed(2)}
                            </Text>
                          </View>
                        </View>}
                      </TouchableOpacity>
                      <View style={styles.missionLine} />
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>  
              }
            </View>
          )}
        </View>
      </ScrollView>
    );
};

export { SingleRoutes };
