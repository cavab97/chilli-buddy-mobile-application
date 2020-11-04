import React, { Component } from "react";

import {
  Icon,
  Text,
  TouchableOpacity,
  View
} from "@components/atoms";

import Eventpage from "../MyEvent";
import LuckyDrawPage from "../MyLuckyDraw";
import styles from "./styles";
import { Colors } from "@settings/styles/theme";

export class MyRanking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventChoosed: true,
    };
  }

  onEventButtonPress() {
    this.setState({ eventChoosed: true });
  }

  onLuckyButtonPress() {
    this.setState({ eventChoosed: false });
  }

  render() {
    const { dataSource, onPress, readLoadingReward } = this.props;

    const routeRewards = dataSource.filter(({ routeIds = [] }) => {
      return routeIds.length !== 0;
    });

    const eventRewards = dataSource.filter(({ eventIds = [] }) => {
      return eventIds.length !== 0;
    });

    return (
      <View style={styles.rankingContainer}>
        <View  >
          {this.state.eventChoosed ? (
            <Eventpage dataSource={routeRewards} onPress={onPress} readLoading={readLoadingReward}/>
          ) : (
            <LuckyDrawPage dataSource={eventRewards} onPress={onPress} readLoading={readLoadingReward}/>
          )}
        </View>
          <TouchableOpacity
            style={[
              styles.eventButtonStyle,
              styles.eventButtonPosition,
              {
                backgroundColor: this.state.eventChoosed
                  ? Colors.PRIMARY
                  : Colors.WHITE,
              },
            ]}
            onPress={() => this.onEventButtonPress()}
          >
            <Icon
              name="calendar-check-o"
              type="font-awesome"
              color={
                this.state.eventChoosed ? Colors.WHITE : Colors.GRAY_MEDIUM
              }
              size={18}
            />
            <Text
                style={[
                  styles.eventTextStyle,
                  {
                    color: this.state.eventChoosed
                      ? Colors.WHITE
                      : Colors.GRAY_MEDIUM,
                  },
                ]}
              >
                Route
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.eventButtonStyle,
                styles.luckyButtonPosition,
                {
                  backgroundColor: !this.state.eventChoosed
                    ? Colors.PRIMARY
                    : Colors.WHITE,
                },
              ]}
              onPress={() => this.onLuckyButtonPress()}
            >
              <Icon
                name="calendar-check-o"
                type="font-awesome"
                color={
                  !this.state.eventChoosed ? Colors.WHITE : Colors.GRAY_MEDIUM
                }
                size={18}
              />
              <Text
                style={[
                  styles.eventTextStyle,
                  {
                    color: !this.state.eventChoosed
                      ? Colors.WHITE
                      : Colors.GRAY_MEDIUM,
                  },
                ]}
              >
                Suprise Event
              </Text>
            </TouchableOpacity>
        </View>
    );
  }
}

export default MyRanking;
