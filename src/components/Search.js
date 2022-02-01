import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {height, width} from '../utility/Dimentions';
import {useSelector, useDispatch} from 'react-redux';
import {getbookList} from '../store/actions';
//import filter from 'lodash.filter';

const Search = () => {
  const {book} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbookList());
    //  console.log('21--------------------------------------', book);
  }, []);

  const Item = ({item}) => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {book &&
        book.data.map((item, key) => {
          return (
            <TouchableOpacity key={item.id}>
              <View
                style={{
                  height: height / 4,
                  backgroundColor: '#cccccc',
                  marginVertical: 3,
                  marginHorizontal: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View>
                  <Image
                    style={{
                      height: height / 4.5,
                      width: width / 3,
                      marginHorizontal: 5,
                    }}
                    source={{uri: item.image}}
                  />
                </View>
                <View style={{}}>
                  <Text>{item.book_name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );

  const renderItem = ({item}) => <Item book_name={item.book_name} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
      <FlatList
        data={book}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Search;

{
  /*

import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;

*/
}
