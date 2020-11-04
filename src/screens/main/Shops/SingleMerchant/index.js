import React, { Component, useRef } from "react";
import { connect } from "react-redux";

import {
    View,
    Text,
} from "../../../../components/atoms";

import {
    listenToRecord as listenFromDatabase,
    readFromDatabase as readPromotion,
    removeListenerToRecord as removeListenerFromDatabase,
} from "@redux/shops/action";

import {
    readFromDatabase as readShopPost,
} from "@redux/shopPost/action";

import {
    //readFromDatabase as readPromotion,
    listenToRecord as listenPromotion
} from "@redux/promo/action";

import ContentLoader, { Rect } from 'react-content-loader/native'

import { SingleMerchant } from "@components/templates";

import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import styles from './styles';
import { Actions } from "react-native-router-flux";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenPost: false,
            viewHeight: 0,
        }
    }

    componentDidMount(){
        const shopId = this.props.shopId;
        this.props.readPromotion(shopId);
        this.props.listenFromDatabase({ shopId });
        this.props.readShopPost(shopId);
        //this.props.listenPromotion(shopId);
        
    }

    componentWillUnmount(){
        this.props.removeListenerFromDatabase();
    }

    renderOperatingHour() {
        const { 
            subIconDetail, 
            operatingContainer
        } = styles;

        const {
            shop,
        } = this.props.shopState;

        return shop.operatingHour.map((item, key) => {
            return (
                <View style={operatingContainer} key={key}>
                    <Ionicons
                        style={subIconDetail, {paddingRight: '5%', paddingLeft: '6%'}}
                        name="md-time"
                        size={20}
                        color='grey'
                    />
                    <Text style={{width: 40, fontFamily: "RobotoRegular"}}>
                        {item.day.toUpperCase()}
                    </Text>
                    {item.operate?
                    <Text style={{ marginLeft: 10, fontFamily: "RobotoRegular",}}>
                    {moment(item.open.toString(),"Hmm").format('LT') +
                            " to " +
                            moment(item.close.toString(),"Hmm").format('LT')}
                    </Text> 
                    :
                    <Text style={{ marginLeft: 10, fontFamily: "RobotoRegular",}}>
                        Closed
                    </Text>
                    }
                </View>
            );
        });
    }
 
    onPostTitleClick = () => {
        this.setState({isOpenPost: !this.state.isOpenPost});
    }

    onPromoteClick = (item) => {
        //const promoId = this.props.promotions[0].id;
        Actions.SingleMerchantPromo({ promoId: item });
    }

    onClickToSwip = (value) => {
        if(value === "next")
            this.swiperRef.snapToNext();

        if(value === "back")
            this.swiperRef.snapToPrev();
    }

    setSwiperRef = (value) => {
        this.swiperRef = value;
    }

    find_dimensions = (layout) => {
        const {x, y, width, height} = layout;
        this.setState({viewHeight: height});
      }

    render() {
        const {
            shop,
            readLoading
        } = this.props.shopState;

        const { 
            posts, 
            readPostLoading,
            promotions,
            readPromotionLoading
        } = this.props;
        const noImage = require("@assets/images/404NotFound800x533.jpg")
        const noPromoteImage = require("@assets/gogogain/pinpng.com-camera-drawing-png-1886718.png")

        let icon = []
        if(shop.logo.length === 0 )
            icon = require("@assets/logo.png")
        else 
            icon = {uri:(shop.logo[0])}

        if(readLoading || readPostLoading || readPromotionLoading){
            return (
                <ContentLoader 
                    speed={1}
                    width={"100%"}
                    height={"100%"}
                    backgroundColor= "#d9d9d9"
                >       
                    <Rect x="0" y="0" rx="0" ry="0" width="100%" height="250" /> 
                    <Rect x="20" y="280" rx="10" ry="10" width="250" height="35" /> 
                    <Rect x="20" y="330" rx="10" ry="10" width="250" height="175" /> 
                    <Rect x="20" y="520" rx="10" ry="10" width="250" height="30" /> 
                    <Rect x="20" y="570" rx="10" ry="10" width="250" height="30" /> 
                </ContentLoader>
            );
        }else {
            return (
                <SingleMerchant
                    dataSource={shop}
                    icon={icon}
                    noImage={noImage}
                    noPromoteImage={noPromoteImage}
                    isOpenPost={this.state.isOpenPost}
                    shopPosts={posts}
                    promotions={promotions}
                    renderOperatingHour={this.renderOperatingHour.bind(this)}
                    onPostTitleClick={this.onPostTitleClick}
                    onPromoteClick={this.onPromoteClick.bind(this)}
                    setSwiperRef={this.setSwiperRef.bind(this)}
                    onClickToSwip={this.onClickToSwip.bind(this)}
                    find_dimensions={this.find_dimensions}
                    viewHeight={this.state.viewHeight}
                />
            );
        }
    }
}

const mapStateToProps = state => {
    const shopState = state.Shops;
    const posts = state.ShopPost.posts;
    const readPostLoading = state.ShopPost.readLoading;
    const promotions = state.Shops.promo;
    //const promotions = state.Promotion.promo;
    const promotionState = state.Promotion;
    const readPromotionLoading = state.Promotion.readLoading;
    return { shopState, posts, readPostLoading, promotions, promotionState, readPromotionLoading };
};

export default connect(mapStateToProps, { listenFromDatabase, removeListenerFromDatabase, readShopPost, readPromotion, listenPromotion })(index);