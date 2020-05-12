import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DeviceSelect from './DeviceSelect';
import Running from './Running';
import Gasolineras from './Gasolineras';

const navigator = createStackNavigator(
  {
    DeviceSelect: {
      screen: props => <DeviceSelect {...props} />,
    },
    Running: {
      screen: props => <Running {...props} />,
    },
    Gasolineras: {
      screen: props => <Gasolineras {...props} />
    }
  },
  {
    initialRouteName: 'DeviceSelect',
  },
);

export default createAppContainer(navigator);
