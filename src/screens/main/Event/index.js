import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import { readFromDatabase } from "@redux/routeGroup/action";

import { RouteMapList } from "@components/templates";

import styles from "./styles";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.readFromDatabase();
    }


    onRouteMapPress() {
        Actions.AreaRouteMap();
    }

    render() {
        const { routeGroups, readLoading } = this.props

        return (
            <RouteMapList
                title="Route Map"
                subtitle="Ranking"
                data={routeGroups}
                subtitle2="In Progress : "
                subtitle3="Pending Event : "
                onRouteMapPress={this.onRouteMapPress.bind(this)}
            />
        );
    }
}

const mapStateToProps = state => {
    return {...state.RouteGroup};
};

export default connect(mapStateToProps, {readFromDatabase})(index);
