import React from 'react';
import { ScrollView, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

type ListItems = {
  latitude: number;
  longitude: number;
  dbm: number;
  localName: string;
  nivel: string;
};

interface Props {
  List: ListItems[];
}
export default ({ List }: Props) => {
  return (
    <ScrollView horizontal={true}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        {List.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          >
            <View>
              <Text>{item.localName}</Text>
            </View>
            <View>
              <Text>dbm: {item.dbm}</Text>
            </View>
            <View>
              <Text>
                localização: {item.latitude}, {item.longitude}
              </Text>
            </View>
            <View>
              <Text>{item.nivel}</Text>
            </View>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
};
