import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { CameraProfile } from "@components/templates";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { uploadToStorage, update } from '../../../marslab-library-react-native/redux/user/action';
//import * as FileSystem from 'expo-file-system';

import styles from "./styles";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            type: Camera.Constants.Type.back,
            uri: null,
            progressVisible: false,
            triggerLoading: false,
            errorVisible: false,
            successVisible: false,
            error: null,
            message: null,
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.uploadImageError !==
            prevProps.uploadImageError &&
            this.props.uploadImageError
        ) {       
            this.setState({ 
                error: this.props.uploadImageError,
                errorVisible: true
            });
            setTimeout(() => {
                this.setState({ 
                    errorVisible: false,
                    progressVisible: false
                })
                Actions.popTo("EditProfile")
            },2000); 
        } 

        if (
            this.props.uploadImageResult.url !==
              prevProps.uploadImageResult.url &&
            this.props.uploadImageResult.url
        ) {
            this.setState({ 
                message: "Upload successful!",
                successVisible: true,        
            });

            let { user } = this.props.user;
            this.setState({ user });
            user["photoURL"] = this.props.uploadImageResult.url
            this.props.update(user);

            setTimeout(() => {
                this.setState({ 
                    progressVisible: false,
                    successVisible: false
                })
                Actions.pop();
                Actions.refresh("EditProfile");
            },2000); 
        }
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
            let photo = await this.camera.takePictureAsync();

            /* FileSystem.makeDirectoryAsync({
                from: photo.uri,
                to: `${FileSystem.documentDirectory}photos/Photo_test.jpg`
            });  */

            //let newPhoto = FileSystem.documentDirectory + 'photos/Photo_test.jpg';

           // console.log(photo.uri)
            this.setState({
                uri: photo.uri,
                progressVisible: true,
            });
            /* Actions.EditProfile({ 
                uri: photo.uri,
            }); */
        }
    }

    uploadImage(){
        this.setState({
            progressVisible: false,
            triggerLoading: true
        })
        let filename = this.state.uri.split('/').pop();


        const data = {
            id: this.props.user.user.id,
            file: this.state.uri,
            name: filename
        }
        this.props.uploadToStorage(data);    
    }

    pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ 
                uri: result.uri,
                progressVisible: true
            });
          }
    
          //console.log(result);
        } catch (e) {
          console.log(e);
        }
    };

    onRetakePress() {
        this.setState({
            progressVisible: false,
            uri: null
        })
    }

    handleRef = (ref) => {
        this.camera = ref
    }

    render() {
        const { hasPermission } = this.state;

        return (
            <CameraProfile
                hasPermission={hasPermission}
                cameraType={this.state.cameraType}
                cameraConfig={this.handleRef.bind(this)}
                onPress={this.takePicture.bind(this)}
                error={this.state.error}
                uri={this.state.uri}
                uploadProgress={this.props.uploadImageProgress}
                onRetakePress={this.onRetakePress.bind(this)}
                onUploadPress={this.uploadImage.bind(this)}
                errorHeader="Error"
                errorRedirectMessage="Please try again later."
                successHeader="Success"
                successMessage={this.state.message}
                uploadLoading={this.props.uploadImageLoading}
                loadingMessage="Image is uploading"
                successVisible={this.state.successVisible}
                errorVisible={this.state.errorVisible}
                message={this.state.message}
                triggerLoading={this.state.triggerLoading}
                selectImage={this.pickImage.bind(this)}
                progressVisible={this.state.progressVisible}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.User
    const uploadImageError = state.User.uploadError
    const uploadImageProgress = state.User.uploadProgress
    const uploadImageResult = state.User.uploadResult
    const uploadImageLoading = state.User.uploadLoading

    return {
      user,
      uploadImageError,
      uploadImageProgress,
      uploadImageResult,
      uploadImageLoading
    };
};

export default connect(mapStateToProps, { 
    uploadToStorage,
    update
})(index);
