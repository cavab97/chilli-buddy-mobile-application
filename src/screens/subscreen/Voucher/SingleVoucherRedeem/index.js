import React, { Component } from "react";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import { Dimensions } from 'react-native';
import { SingleVoucherRedeem, SingleVoucherErrorModal } from "@components/templates";

import { BarCodeScanner, Permissions } from "expo-barcode-scanner";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: false,
      errorStatus: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    this.setState({ hasPermission: status === "granted" });
  }

  componentDidUpdate() {
    // this.calculateDistance(this.props.shopState.shop.l);
    //console.log("componentDidUpdate");
    //console.log(this.state.location);
  }

  componentWillUnmount() {}

  handleBarCodeScanned = ({ type, data }) => {
    if (data != "1") {
      this.setState({ scanned: true });
      this.setState({ errorStatus: true });
      this.setState({ errorMessage: "You Scanned invalid QR" });
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    } else {
      this.setState({ scanned: true });
      this.setState({ errorStatus: false });
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      //Actions.RedeemedVoucherScreen();
    }
  };

  handleSetScanned(scan) {
    console.log('scanned')
    this.setState({ scanned: false });
  }
  errorSubmit() {
    this.setState({
      errorStatus: false,
    });
  }

  onBarCodeRead({ type, data } ) {
   /*  if ((type === this.state.scannedItem.type && data === this.state.scannedItem.data) || data === null) {
      return;
    } */

    const voucherId = this.props.voucherIds

    if (data) {
      // Do samething for QRCode
      console.log(data)
      Actions.RedeemedVoucherScreen({ data, voucherIds: voucherId });
    } else {
      alert(
        'No QR Code Detected'
      );
    }
  }

  render() {
    const { scanned, hasPermission, errorStatus, errorMessage } = this.state;

    /* if (errorStatus) {
      return (
        <SingleVoucherErrorModal
          errorStatus={errorStatus}
          errorHeader="Invalid QR"
          errorMessage={errorMessage}
          errorSubmit={this.errorSubmit.bind(this)}
        />
      );
    } else { */
      return (
        <SingleVoucherRedeem
          scanned={scanned}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          handleBarCodeScanned={this.handleBarCodeScanned.bind(this)}
          hasPermission={hasPermission}
          handleSetScanned={this.handleSetScanned.bind(this)}
        />
      );
    //}
  }
}

export default index;
