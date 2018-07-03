import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

/**
 *
 * @param {ScaledSize} dim the dimensions object
 * @param {*} limit the limit on the scaled dimension
 */
const msp = (dim, limit) => {
  return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};

/**
* Returns true if the screen is in portrait mode
*/
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
* Returns true of the screen is in landscape mode
*/
const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

/**
* Returns true if the device is a tablet
*/
const isTablet = () => {
  const dim = Dimensions.get('screen');
  return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
};

/**
* Returns true if the device is a phone
*/
const isPhone = () => { return !isTablet(); }

export default class App extends React.Component {

  constructor() {
    super();
 
    this.state = {
        orientation: isPortrait() ? 'portrait' : 'landscape',
        devicetype: isTablet() ? 'tablet' : 'phone'
    };
 
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
        this.setState({
            orientation: isPortrait() ? 'portrait' : 'landscape'
        });
    });
}

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
                Dimensions = {JSON.stringify(Dimensions.get('screen'))}{'\n'}
                isPortrait = {isPortrait() ? 'true\n' : 'false\n'}
                isLandscape = {isLandscape() ? 'true\n' : 'false\n'}
                isPhone = {isPhone() ? 'true\n' : 'false\n'}
                isTablet = {isTablet() ? 'true\n' : 'false\n'}
            </Text>
        </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
