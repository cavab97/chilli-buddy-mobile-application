import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { RouteGroupList } from "@components/templates";
import { listenFromDatabase, removeListenerFromDatabase } from "@redux/routeGroup/action";
import { readFromDatabase as readRoutes } from "@redux/route/action";
import clone from "clone"

import styles from "./styles";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
 
    componentDidMount() {
        this.props.listenFromDatabase();
    }

    componentWillUnmount(){
        this.props.removeListenerFromDatabase();
    }

    onRouteMapPress = (routeGroup) => {
        const { id } = routeGroup

        Actions.Routes({routeGroupId : id});
    }

    onRankingPress() {
        Actions.EventRanking();
    }

    render() {
        const { readLoading } = this.props
        const { routeGroups } = clone(this.props)

        const validRouteGroups = []
        
        routeGroups.forEach((routeGroup)=>{
            const { ongoingRoutes, pendingRoutes, endRoutes, id } = routeGroup
            if(ongoingRoutes || pendingRoutes || endRoutes) {
                validRouteGroups.push(routeGroup)
            }
        })

        const backgroundImage = require("../../../assets/gogogain/RouteMap_FA_Blue_15_BackgroundEvent.png")

        return (
            <RouteGroupList
                title="Tournaments"
                subtitle="Leaderboard"
                data={validRouteGroups}
                subtitle2="Active : "
                subtitle3="To Be Unlocked : "
                onRouteMapPress={this.onRouteMapPress}
                onRankingPress={this.onRankingPress.bind(this)}
                readLoading = {readLoading}
                backgroundImage = {backgroundImage}
            />
        );
    }
}

const mapStateToProps = state => {
    const routes = state.Route.routes;

    return {...state.RouteGroup, routes};
};

export default connect(mapStateToProps, { listenFromDatabase, removeListenerFromDatabase, readRoutes })(index);
