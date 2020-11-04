import React, { Component } from "react";
import { connect } from "react-redux";
import { Prizes } from "@components/templates";

import { 
  readFromDatabase as readRewards,
  update,
  modalControl
} from "@redux/reward/action";

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { routeId } = this.props.navigation.state.params;
    this.props.readRewards({ routeId });
  }

  rewardPress = (reward) => {
    this.props.update(reward);
    this.props.modalControl();
  }

  modalControl = () => {
    this.props.modalControl();
  }

  render() {
    const { rewards, reward, readLoading, modalActive } = this.props.reward;
    
    const rewardsGroup = [];
    rewards.forEach(item => {
      const sameElement = rewardsGroup.filter(data => {return data.title === item.title});

      if(sameElement.length === 0){
        item["quantity"] = rewards.filter(data => data.title === item.title).length;
        rewardsGroup.push(item);

      }else if(sameElement[0].images.length === 0 && item.images.length > 0){
        // get image in a reward group
        const index = rewardsGroup.indexOf(sameElement[0]);

        sameElement[0].images.push(item.images[0]);

        rewardsGroup[index] = sameElement[0];
      }
    });

    return (
      <Prizes 
        data = {rewardsGroup}
        readLoading = {readLoading}
        showModal = {modalActive}
        reward = {reward}
        rewardPress = {this.rewardPress.bind(this)}
        modalControl = {this.modalControl}
      />
    );
  }
}

const mapStateToProps = (state) => {
    const reward = state.Reward;

    return {
        reward,
    };
};

export default connect(mapStateToProps, { readRewards, modalControl, update })(index);
