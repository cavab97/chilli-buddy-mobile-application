import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { SubmitReceipt } from "@components/templates";
import {
    uploadToStorage,
    submitToBackend as submitTransaction
} from "@redux/transaction/action";
import {
    listenToRecord as listenToRoute,
    removeListenerToRecord as removeListenerFromRoute,
  } from "@redux/route/action";

import styles from "./styles";


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            messageSubmit: null,
            progressVisible: false,
            message: null,
            triggerNextPage: false,
            triggerLoading: false,
            submitLoading: null,
        };
    }

    componentDidMount() {
       const { route } = this.props.routeState;
        if(route.category == "CheckIn"){
            this.props.navigation.setParams({
                title: "Selfie Time",
           });}
    }

    componentDidUpdate(prevProps, prevState) {

        if (
            this.props.uploadTransactionError !==
            prevProps.uploadTransactionError &&
            this.props.uploadTransactionError
        ) {        
            this.setState({ 
                error: this.props.uploadTransactionError,
            });
            setTimeout(() => {
                this.setState({ progressVisible: false })
                Actions.popTo("Route",{ routeId: this.props.routeId });
            },3000); 
        } 

        if (
            this.props.uploadTransactionLoading !== 
            prevProps.uploadTransactionLoading && 
            this.props.uploadTransactionLoading
        ) {
            this.setState({
                triggerLoading: false,
            })
        }

        if (
            this.props.uploadTransactionResult.url !==
              prevProps.uploadTransactionResult.url &&
            this.props.uploadTransactionResult.url
        ) {
            this.setState({ 
                message: "Upload successful!",
                submitLoading: true 
            });
        }

        if (
            this.props.submitTransactionError.message !==
              prevProps.submitTransactionError.message &&
            this.props.submitTransactionError.message
        ) {
            this.setState({ 
                error: this.props.submitTransactionError.message,
                submitLoading: null,
            });
            setTimeout(() => {
                this.setState({ progressVisible: false })
                Actions.popTo("Route",{ routeId: this.props.routeId });
            },3000); 
        }

        if (
            this.props.submitTransactionResult.message !==
              prevProps.submitTransactionResult.message &&
            this.props.submitTransactionResult.message
        ) {
            this.setState({ 
                messageSubmit: this.props.submitTransactionResult.message,
                submitLoading: null,
            }); 
            setTimeout(() => {
                this.setState({ progressVisible: false })
                Actions.popTo("Route",{ routeId: this.props.routeId });
            },3000); 
        }

        if (
            this.props.transactions.uploadResult.url !==
              prevProps.transactions.uploadResult.url &&
            this.props.transactions.uploadResult.url &&
            !this.props.transactions.submitLoading
        ) {
            this.onPay();
        }
    }

    componentWillUnmount(){
    }

    uploadImage(){
        this.setState({
            progressVisible: true,
            triggerLoading: true
        })
        let filename = this.props.uri.split('/').pop();

        const data = {
            id: this.props.mission.id,
            file: this.props.uri,
            name: filename
        }
        this.props.uploadToStorage(data);
    }

    lookingForTicket({ routeId = null }) {
        const { userRouteTickets = [] } = this.props.routeTicketState;

        let routeTicketId = null;
        userRouteTickets.forEach((routeTicket) => {
            if (routeTicket.routeIds[0] === routeId) {
            routeTicketId = routeTicket.id;
            }
        });
        return routeTicketId;
    }

    onPay() {
        const { routeId } = this.props;
        const photoUrl = this.props.transactions.uploadResult.url;
        const routeTicketId = this.lookingForTicket({ routeId });
        const { route } = this.props.routeState;
        const shopId = this.props.mission.shop.id;
        const missionId = this.props.mission.id;

        if(route.category === "CheckIn"){
            var amount = 0;
        }
        else{
        var amount = this.props.value.replace("RM", "");
        amount = amount.replace(",", "")
        }

        const payment = {
          amount: parseFloat(amount),
          paymentId: null,
          paymentType: "cash",
          receiptId: null,
          receiptPhotoUrl: photoUrl,
          receiptUrl: null,
        };
        
        const data = { routeId, shopId, routeTicketId, missionId, payment };
        this.props.submitTransaction(data, "create");
    };

    onRetake() {
        //Actions.CameraReceipt(this.props);
        
        const { route } = this.props.routeState;
        if(route.category == "CheckIn"){
            Actions.replace("CameraCheckIn", this.props);}
        else{
            Actions.replace("CameraReceipt", this.props);
        }
    }

    render() {
        const { uploadTransactionLoading } = this.props;
        const { uploadProgress } = this.props.transactions;
        const { route } = this.props.routeState;
        return (
            <SubmitReceipt
                uri={this.props.uri}
                retakeTitle="Retake"
                doneTitle="Done"
                uploadImageProgress={uploadProgress}
                onRetakePress={this.onRetake.bind(this)}
                onDonePress={this.uploadImage.bind(this)}
                progressVisible={this.state.progressVisible}
                errorMessage={this.state.error}
                successfulMessage={this.state.message}
                errorHeader="Error"
                errorRedirectMessage="Please try again later."
                successHeader="Success"
                triggerLoading={this.state.triggerLoading}
                loadingMessage="Uploading your transaction"
                uploadLoadingMessage="Hang on. We are processing your transaction"
                messageSubmit={this.state.messageSubmit}
                submitLoading={this.state.submitLoading}
                uploadLoading={uploadTransactionLoading}
                categoryCheck = {route.category}
            />
        );
    }
}


const mapStateToProps = (state) => {
    const transactions = state.Transaction;
    const routeTicketState = state.RouteTicket;
    const submitTransactionLoading = state.Transaction.submitLoading;
    const submitTransactionError = state.Transaction.submitError;
    const submitTransactionResult = state.Transaction.submitResult;
    const uploadTransactionError = state.Transaction.uploadError;
    const uploadTransactionResult = state.Transaction.uploadResult;
    const uploadTransactionLoading = state.Transaction.uploadLoading;
    const routeState = state.Route;


    return {
      transactions,
      routeTicketState,
      submitTransactionError,
      submitTransactionResult,
      uploadTransactionError,
      uploadTransactionResult,
      uploadTransactionLoading,
      submitTransactionLoading,
      routeState
    };
  };

export default connect(mapStateToProps, { 
    uploadToStorage,
    submitTransaction,
    listenToRoute,
    removeListenerFromRoute
})(index);
