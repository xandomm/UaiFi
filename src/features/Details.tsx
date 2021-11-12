import React from 'react';
import { View, Text, Button } from 'react-native';


import { useNavigation } from '@react-navigation/native';

function Details() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details screen</Text>

    </View>
  );
}
export default Details;
