import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';

class DeviceCard extends Component {
  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <Card containerStyle={card}>
          <View>
            <Text>{this.props.device.name}</Text>
          </View>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}

const card = StyleSheet.create({
  padding: 20,
  borderRadius: 20,
  borderWidth: 0,
});

export default DeviceCard;
