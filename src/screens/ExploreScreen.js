import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { width } from '../utility/Dimentions';
import { Base_URL } from '../store/Base_URL';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const ComedyContent = ({ navigation, indexkey }) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const bookList = async () => {
    try {
      let formData = new FormData();
      formData.append('category_id', '5');
      const result = await fetch(
        Base_URL + `bookList?page=${page}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        },
      );
      const json = await result.json();

      setData([...data, ...json.data.data])
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    bookList();
  }, [page]);

  const renderItem = ({ item }) => {
    return (<TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookDetail', { paramKey: item })}>
      <View style={styles.bookContainer}>
        <Image style={styles.bookImage} source={{
          uri: item.image,
        }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bookName}>{item.book_name}</Text>
        <Text style={styles.text}>{item.author}</Text>
        <Text style={styles.text}>
          <Icons name='star' solid={item.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
          {item.rate_count} Reviews
        </Text>
        <Text style={styles.text}>{parseFloat(item.book_price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
    )
  }


  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      //onEndReached={loadMore}
      onMomentumScrollEnd={loadMore}
    />
  )
};

const FictionContent = ({ navigation, indexkey }) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const bookList = async () => {
    try {
      let formData = new FormData();
      formData.append('category_id', '1');
      const result = await fetch(
        Base_URL + `bookList?page=${page}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        },
      );
      const json = await result.json();

      setData([...data, ...json.data.data])
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    bookList();
  }, [page]);

  const renderItem = ({ item }) => {
    return (<TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookDetail', { paramKey: item })}>
      <View style={styles.bookContainer}>
        <Image style={styles.bookImage} source={{
          uri: item.image,
        }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bookName}>{item.book_name}</Text>
        <Text style={styles.text}>{item.author}</Text>
        <Text style={styles.text}>
          <Icons name='star' solid={item.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
          {item.rate_count} Reviews
        </Text>
        <Text style={styles.text}>{parseFloat(item.book_price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
    )
  }


  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      //onEndReached={loadMore}
      onMomentumScrollEnd={loadMore}
    />
  )
};

const HistoryContent = ({ navigation, indexkey }) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const bookList = async () => {
    try {
      let formData = new FormData();
      formData.append('category_id', '4');
      const result = await fetch(
        Base_URL + `bookList?page=${page}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        },
      );
      const json = await result.json();

      setData([...data, ...json.data.data])
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    bookList();
  }, [page]);

  const renderItem = ({ item }) => {
    return (<TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookDetail', { paramKey: item })}>
      <View style={styles.bookContainer}>
        <Image style={styles.bookImage} source={{
          uri: item.image,
        }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bookName}>{item.book_name}</Text>
        <Text style={styles.text}>{item.author}</Text>
        <Text style={styles.text}>
          <Icons name='star' solid={item.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
          {item.rate_count} Reviews
        </Text>
        <Text style={styles.text}>{parseFloat(item.book_price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
    )
  }


  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      //onEndReached={loadMore}
      onMomentumScrollEnd={loadMore}
    />
  )
};

const NonFictionContent = ({ navigation, indexkey }) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const bookList = async () => {
    try {
      let formData = new FormData();
      formData.append('category_id', '2');
      const result = await fetch(
        Base_URL + `bookList?page=${page}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        },
      );
      const json = await result.json();

      setData([...data, ...json.data.data])
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    bookList();
  }, [page]);

  const renderItem = ({ item }) => {
    return (<TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookDetail', { paramKey: item })}>
      <View style={styles.bookContainer}>
        <Image style={styles.bookImage} source={{
          uri: item.image,
        }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bookName}>{item.book_name}</Text>
        <Text style={styles.text}>{item.author}</Text>
        <Text style={styles.text}>
          <Icons name='star' solid={item.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
          {item.rate_count} Reviews
        </Text>
        <Text style={styles.text}>{parseFloat(item.book_price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
    )
  }


  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      //onEndReached={loadMore}
      onMomentumScrollEnd={loadMore}
    />
  )
};

const ReligiousContent = ({ navigation, indexkey }) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const bookList = async () => {
    try {
      let formData = new FormData();
      formData.append('category_id', '3');
      const result = await fetch(
        Base_URL + `bookList?page=${page}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        },
      );
      const json = await result.json();

      setData([...data, ...json.data.data])
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    bookList();
  }, [page]);

  const renderItem = ({ item }) => {
    return (<TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookDetail', { paramKey: item })}>
      <View style={styles.bookContainer}>
        <Image style={styles.bookImage} source={{
          uri: item.image,
        }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bookName}>{item.book_name}</Text>
        <Text style={styles.text}>{item.author}</Text>
        <Text style={styles.text}>
          <Icons name='star' solid={item.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
          <Icons name='star' solid={item.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
          {item.rate_count} Reviews
        </Text>
        <Text style={styles.text}>{parseFloat(item.book_price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
    )
  }


  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      //onEndReached={loadMore}
      onMomentumScrollEnd={loadMore}
    />
  )
};

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
      }}
    >
      <Tab.Screen
        onAnimatedValueUpdate
        name="Comedy"
        component={ComedyContent}
        options={{
          title: 'Comedy',
        }}

      />
      <Tab.Screen
        name="Fiction"
        component={FictionContent}
        options={{
          title: 'Fiction'
        }} />
      <Tab.Screen
        name="History"
        component={HistoryContent}
        options={{
          title: 'History'
        }}
      />
      <Tab.Screen
        name="Non-Fiction"
        component={NonFictionContent}
        options={{
          title: 'Non-Fiction'
        }} />
      <Tab.Screen
        name="Riligious"
        component={ReligiousContent}
        options={{
          title: 'Riligious'
        }} />
    </Tab.Navigator>
  );
}

const ExploreScreen = () => {
  return (
    <SafeAreaView
      style={styles.mainView}
    >
      <MyTabs />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  itemContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '95%',
    height: width * 0.40,
    marginTop: width * 0.12,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5
  },
  bookContainer: {
    height: width * 0.45,
    width: '35%',
    position: 'relative',
    top: width * -0.05,
    borderRadius: 10,
    overflow: 'hidden'
  },
  bookImage: {
    resizeMode: 'stretch',
    height: '100%',
    width: '100%'
  },
  textContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexGrow: 1,
    flexShrink: 1
  },
  bookName: {
    fontWeight: '600',
    fontSize: 18,
  },
  text: {
    color: '#666',
    marginTop: 3,
    fontSize: 14
  }
});

export default ExploreScreen;
