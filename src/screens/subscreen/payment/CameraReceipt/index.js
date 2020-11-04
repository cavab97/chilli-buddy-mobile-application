import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { PaymentCameraReceipt } from "@components/templates";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import {
    listenToRecord as listenToRoute,
    removeListenerToRecord as removeListenerFromRoute,
  } from "@redux/route/action";

import styles from "./styles";
import { Dimensions } from 'react-native';


const { height, width } = Dimensions.get('window');
const screenRatio = height / width;

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            cameraType: Camera.Constants.Type.back,
            uri: null,
            ratio: null,
            takePictureLoading: false,
            isRatioSet: false,
            imagePadding: null,
        };
    
        // const { route } = this.props.routeState;
        // if(route.category == "CheckIn"){
        //     this.props.navigation.setParams({
        //     title: "Check In",
        // });
        // }
        // else{
        //     this.props.navigation.setParams({
        //     title: "Camera Your Receipt",
        // });
        // }
    }

    componentWillMount(){

    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
        
               
    }

    componentWillUnmount(){

    }

    handleCameraType = () => { 
        const { cameraType } = this.state
    
        this.setState({cameraType:
            cameraType === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        })
    }

    takePicture = async () => {
        if (this.camera) {
            //const options = { base64: true };
            this.setState({takePictureLoading: true});
            let photo = await this.camera.takePictureAsync({ quality: 1, skipProcessing: true });
            /* FileSystem.makeDirectoryAsync({
                from: photo.uri,
                to: `${FileSystem.documentDirectory}photos/Photo_test.jpg`
            });  */

            //let newPhoto = FileSystem.documentDirectory + 'photos/Photo_test.jpg';

            //console.log(photo)
            //this.setState({uri: photo.base64});
            this.setState({takePictureLoading: false});
            const {route} = this.props.routeState;
            Actions.replace("SubmitReceipt",{ 
                uri: photo.uri,
                mission: this.props.mission,
                value: route.category === "CheckIn" ? 0 : this.props.value,
                routeId: this.props.routeId
            });
        }
    }

    handleRef = (ref) => {
        this.camera = ref
    }

    prepareRatio = async () => {

    let desiredRatio = '4:3';  
    if (Platform.OS === 'android') {
      const ratios = await this.camera.getSupportedRatiosAsync();
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        const distance = screenRatio - realRatio; 
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }

      desiredRatio = minDistance;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      
      this.setState({ imagePadding: remainder / 2})
      this.setState({ isRatioSet: true });
      this.setState({ ratio: desiredRatio });
    }
  };

  //Load camera before getting the right ratio
    setCameraReady = async() => {
    if (this.state.isRatioSet === false) {
      await this.prepareRatio();
    }
  };

    render() {
        const { hasPermission } = this.state;

        return (
            <PaymentCameraReceipt
                hasPermission={hasPermission}
                cameraType={this.state.cameraType}
                ratio={this.state.ratio}
                setCameraReady={this.setCameraReady.bind(this)}
                cameraConfig={this.handleRef.bind(this)}
                onPress={this.takePicture.bind(this)}
                changeCamera={this.handleCameraType.bind(this)}
                takePictureLoading={this.state.takePictureLoading}
                imagePadding={this.state.imagePadding}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const routeState = state.Route;
   
    return {
      routeState,
    };
  };
  
export default connect(mapStateToProps, {
    listenToRoute,
    removeListenerFromRoute,
  })(index);
//export default connect(null, { })(index);
