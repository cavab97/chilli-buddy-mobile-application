import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import { readFromDatabase as readAdvertisements } from "@redux/advertisement/action";
import { Advertisement } from "@components/templates";

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.readAdvertisements();
  }

  render() {
    const { advertisements, AdvertisementId, readLoading } = this.props;
    let dataSource = null;

    console.log(dataSource);

    dataSource = advertisements.filter((data) => {
      if (data.id == AdvertisementId) {
        return data;
      }
    });

    const noImage = require("@assets/images/404NotFound800x533.jpeg");

    return (
      <Advertisement
        dataSource={dataSource}
        noImage={noImage}
        title1="Start Date: "
        title2="End Date: "
        title3="Term and Conditions"
        readLoading={readLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { advertisements } = state.Advertisement;

  return {
    advertisements,
  };
};

export default connect(mapStateToProps, {
  readAdvertisements,
})(index);
