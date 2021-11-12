import React, { useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Button, Platform, TextInput, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DETAILS } from '../routes/RoutesName';
import Geolocation from '@react-native-community/geolocation';

function HomeScreen() {
  const navigation = useNavigation();
  const GoToDetails = () => {
    navigation.navigate(DETAILS);
  };
  const [local, setLocal] = useState<string>();

  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [watchID, setWatchID] = useState(0);
  console.log(local);
  const callLocation = () => {
    if (Platform.OS === 'ios') {
      getLocation();
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert('Permissão de Localização negada');
        }
      };
      requestLocationPermission();
    }
  };;

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
        console.log(currentLatitude, currentLongitude);
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
  };;

  const clearLocation = () => {
    Geolocation.clearWatch(watchID);
  };;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Digite aqui o nome do local o qual será realizado o registro</Text>
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
      <Button title="Pegar coordenadas" onPress={GoToDetails} />
    </View>
  );
}

export default HomeScreen;
