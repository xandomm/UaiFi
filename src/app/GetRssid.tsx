import { Alert, PermissionsAndroid } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

export default async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission is required for WiFi connections',
      message:
        'This app needs location permission as this is required  ' +
        'to scan for wifi networks.',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    WifiManager.getCurrentSignalStrength().then(
      (ssid) => {
        console.log(ssid);
        return ssid;
      },
      () => {
        console.log('Cannot get current SSID!');
      }
    );
  } else {
    Alert.alert('Permissão de Localização negada');
  }
};
