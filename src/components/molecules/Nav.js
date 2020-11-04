import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    View
} from '../atoms';

class Nav extends PureComponent {
    constructor() {
        super();

        this._handleTabChange = this._handleTabChange.bind(this);
    }

    _handleTabChange(tabIndex) {
        this.props.onTabChange(tabIndex);
    }

    _containerStyle() {
        return {
            flexDirection: this.props.position && this.props.position === 'Bottom' ? 'column' : 'row',
            borderTopWidth: 0,
            backgroundColor: this.props.position && this.props.position === 'Bottom' ? "#dce3ea" : this.props.backgroundColor,
            borderTopColor: this.props.borderTopColor,
            height: this.props.height,
        }
    }

    render() {
        return (
            <View style={[this._containerStyle(), this.props.style]}>
                {React.Children.map(this.props.children, (child, tabIndex) => (
                    React.cloneElement(child, {
                        tabIndex,
                        selected: this.props.selected,
                        activeColor: this.props.activeColor,
                        unActiveColor: this.props.unActiveColor,
                        onTabPress: this._handleTabChange,
                        iconSize: this.props.iconSize,
                        onlyIcon: this.props.onlyIcon,
                        pressOpacity: this.props.pressOpacity,
                        fontSize: this.props.fontSize,
                    })
                ))}
            </View>
        );
    }
}

Nav.defaultProps = {
    onTabChange: () => { },
    activeColor: 'black',
    unActiveColor: 'gray',
    backgroundColor: 'white',
    height: 42,
    iconSize: 22,
    onlyIcon: false,
    pressOpacity: 0.7,
    fontSize: 11,
};

Nav.propTypes = {
    selected: PropTypes.number,
    onTabChange: PropTypes.func,
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
    iconSize: PropTypes.number,
    onlyIcon: PropTypes.bool,
    pressOpacity: PropTypes.number,
    fontStyle: PropTypes.object,
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
};

export default Nav;