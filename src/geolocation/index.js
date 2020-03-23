import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: false});

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
    });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}

export async function getCoords(callback) {
  await requestPermissions();
  Geolocation.getCurrentPosition(data => {
    const {coords} = data;
    if (callback) {
      callback(coords);
    }
  });
}
