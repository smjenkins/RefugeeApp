"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const { width: screenWidth, height: screenHeight } = react_native_1.Dimensions.get('window');
exports.getSpringConfig = (config) => {
    const { friction, tension, speed, bounciness, stiffness, damping, mass } = config;
    if (stiffness || damping || mass) {
        if (bounciness || speed || tension || friction) {
            console.error(`
        [react-native-modalize] You can define one of bounciness/speed, tension/friction,
        or stiffness/damping/mass, but not more than one
      `);
        }
        return {
            stiffness,
            damping,
            mass,
        };
    }
    else if (bounciness || speed) {
        if (tension || friction || stiffness || damping || mass) {
            console.error(`
        [react-native-modalize] You can define one of bounciness/speed, tension/friction,
        or stiffness/damping/mass, but not more than one
      `);
        }
        return {
            bounciness,
            speed,
        };
    }
    return {
        tension,
        friction,
    };
};
exports.isIos = react_native_1.Platform.OS === 'ios';
exports.isIphoneX = exports.isIos &&
    (screenHeight === 812 || screenWidth === 812 || screenHeight === 896 || screenWidth === 896);
exports.hasAbsoluteStyle = (Component) => {
    if (!React.isValidElement(Component)) {
        return false;
    }
    // @ts-ignore
    const element = typeof Component === 'object' ? Component : Component();
    const style = Component && react_native_1.StyleSheet.flatten(element.props.style);
    return style && style.position === 'absolute';
};
