import React, { useState } from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  NativeModules,
  Button,
  Platform,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import Geolocation from '@react-native-community/geolocation';
import ListItems from '../app/ListItems';
import deviceInfoModule from 'react-native-device-info';

function HomeScreen() {
  const [local, setLocal] = useState<string>();

  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [dBm, setdBm] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [nivel, setNivel] = useState('');
  const [, setWatchID] = useState(0);
  console.log(nivel);
  console.log(local);
  const { RNWifi, getWifiList } = NativeModules;
  console.log(JSON.stringify(RNWifi));
  console.log(JSON.stringify(getWifiList));
  const GetRssid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Acesso à Localização',
        message: 'Este aplicativo precisa acessar sua localização.',
        buttonNeutral: 'Pergunte-me depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      WifiManager.getCurrentSignalStrength().then(
        (ssid) => {
          console.log('[SSID]' + ssid);
          setdBm(ssid);
        },
        () => {
          console.log('Cannot get current SSID!');
        }
      );
    }
    if (Platform.OS === 'ios') {
      setdBm(Math.random());
    } else {
      Alert.alert('Permissão de Localização negada');
    }
  };

  const callLocation = () => {
    if (Platform.OS === 'ios') {
      // Aqui será inserido os dados sobre a o NEHospotNetwork fazendo a bridge com objective-c na pasta ios
      setdBm(Math.random());
      getLocation();
      if (dBm < 0.3) {
        setNivel('inutilizável');
      }
      if (dBm >= 0.3 && dBm < 0.5) {
        setNivel('fraco');
      }

      if (dBm >= 0.5 && dBm < 0.7) {
        setNivel('Bom');
      }
      if (dBm >= 0.7 && dBm < 0.9) {
        setNivel('Muito Bom');
      }

      if (dBm >= 0.9) {
        setNivel('Excelente');
      }
      console.log(nivel);
      if (nivel) {
        setData([
          ...data,
          {
            latitude: currentLatitude,
            longitude: currentLongitude,
            localName: local,
            nivel: nivel,
          },
        ]);
      }
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Acesso à Localização',
            message: 'Este aplicativo precisa acessar sua localização.',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        if (Platform.OS === 'android') {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            GetRssid();
            getLocation();

            if (dBm < -80) {
              setNivel('inutilizável');
            }
            if (dBm >= -80 && dBm < -70) {
              setNivel('fraco');
            }

            if (dBm >= -70 && dBm < -67) {
              setNivel('Bom');
            }
            if (dBm >= -67 && dBm < -30) {
              setNivel('Muito Bom');
            }

            if (dBm >= -30) {
              setNivel('Excelente');
            }
            if (dBm) {
              if (nivel) {
                await setData([
                  ...data,
                  {
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    dbm: dBm,
                    localName: local,
                    nivel: nivel,
                  },
                ]);
              }
            }
          }
        } else {
          if (dBm < 0.3) {
            setNivel('inutilizável');
          }
          if (dBm >= 0.3 && dBm < 0.5) {
            setNivel('fraco');
          }

          if (dBm >= -0.5 && dBm < 0.7) {
            setNivel('Bom');
          }
          if (dBm >= 0.7 && dBm < 0.9) {
            setNivel('Muito Bom');
          }

          if (dBm >= 0.9) {
            setNivel('Excelente');
          }

          if (nivel) {
            await setData([
              ...data,
              {
                latitude: currentLatitude,
                longitude: currentLongitude,
                dbm: dBm,
                localName: local,
                nivel: nivel,
              },
            ]);
          }
        }
      };

      requestLocationPermission();
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          const currentLatitude = JSON.stringify(position.coords.latitude);
          const currentLongitude = JSON.stringify(position.coords.longitude);
          setCurrentLatitude(currentLatitude);
          setCurrentLongitude(currentLongitude);
          console.log(currentLatitude, currentLongitude);
        } else {
          const loc = NativeModules.SettingsManager.settings.AppleLocale();
          console.log('rodo' + loc);
        }
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const watchID = Geolocation.watchPosition((position) => {
      const currentLatitude = JSON.stringify(position.coords.latitude);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      setCurrentLatitude(currentLatitude);
      setCurrentLongitude(currentLongitude);
    });
    setWatchID(watchID);
  };
  console.log(data);
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Digite aqui o nome do local o qual será realizado o registro
        </Text>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 0.5,
            borderRadius: 8,
            flex: 1,
            maxHeight: 70,
            minWidth: 200,
            margin: 20,
          }}
          onChangeText={(e) => setLocal(e)}
          value={local}
        />
        <Button title="Obter Localização" onPress={callLocation} />
      </View>
      <ListItems List={data} />
    </ScrollView>
  );
}

export default HomeScreen;
