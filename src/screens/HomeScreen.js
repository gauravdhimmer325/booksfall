import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { width } from '../utility/Dimentions';;
import axios from 'axios';
import { Base_URL } from '../store/Base_URL';


const HomeScreen = ({ navigation }) => {
console.log("HomeScreen")
  const [json, setJson] = useState()

  postHomePage = async () => {
    await axios({
      method: 'POST',
      url: Base_URL + 'homepage',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setJson(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    postHomePage();
  }, []);

  return (
    <ScrollView ScrollView ScrollView ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainScroll}>
      <Image
        style={styles.homeTopImg}
        source={require('../assets/images/BookHeader.png')} />
      <View style={styles.homeTitleView}>
        <Text style={styles.homeTitleText}>Home</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {json && json.banner ? json.banner.map((item, key) => {
          return (
            <View key={item.id}>
              <Image
                style={styles.homeBannerImg}
                source={{ uri: item.image}}
              />
            </View>
          );
        })
          : null}
      </ScrollView>

      <View style={styles.homeTitleView}>
        <Text style={styles.homeTitleText}>Our Top Books</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TopBookList')} style={styles.viewAllTextTouch}>
          <Text style={styles.viewAllText}>{"View All"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.homeBookScroll}>
        {json && json.best_book
          ? json.best_book.map((item, key) => {
            return (
              <View
                key={item.id}
                style={styles.homeBookView}>
                <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { paramKey: item })}>
                  <Image
                    style={styles.homeBookImg}
                    source={{
                      uri: item.image
                    }}
                  />
                  <View
                    style={styles.homePriceView}>
                    <Text style={styles.homePriceTag}>
                      $ {parseFloat(item.price).toFixed(2)}
                    </Text>
                    <Text style={styles.homePriceTag}>
                      <Icons
                        name={'star'}
                        size={15}
                        color={'gold'}
                      />
                      {parseFloat(item.rates).toFixed(2)}
                    </Text>
                  </View>
                  <Text numberOfLines={2} style={styles.homeBookName}>{item.book_name}</Text>

                </TouchableOpacity>
              </View>);
          })
          : null}
      </ScrollView>

      <View style={{ ...styles.homeTitleView }}>
        <Text style={styles.homeTitleText}>Best Seller</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllSeller')} style={styles.viewAllTextTouch}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.homeBookScroll}>

        {json && json.best_seller
          ? json.best_seller.map((item, key) => {
            return (
              <View key={item.user_id} style={styles.homeBookView}>
                <TouchableOpacity onPress={() => navigation.navigate('AuthorAllBook', { paramKey: item })}>
                  <Image
                    style={styles.homeBookImg}
                    source={{
                      uri: item.profile,
                    }}
                  />
                  <Text style={styles.homeBookName}>{item.name}</Text>
                </TouchableOpacity>
              </View>

            );
          })
          : null}
      </ScrollView>

      <View style={{ height: width * 0.20 }}></View>

    </ScrollView >
  );
};



const styles = StyleSheet.create({
  homeTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: width * 0.12,
    width: '100%',
    marginLeft: width * 0.02,
    padding: width * 0.03,
  },
  homeBookView: {
    marginHorizontal: 10,
    flexGrow: 1,
    flexShrink: 1,
    width: width / 2.8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 5,
    margin: 5,
    height: width * 0.55,
    shadowColor: '#111111',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  homePriceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * -0.07,
    padding: 5,
  },
  mainScroll: {
    flex: 1,
  },
  homeBookScroll: {
    height: width * 0.60,
    flexDirection: 'row',
  },
  homeTopImg: {
    height: width * 0.60,
    width: '100%',
    resizeMode: 'stretch',
  },
  homeBannerImg: {
    height: width * 0.40,
    width: width * 0.90,
    borderRadius: 10,
    marginHorizontal: width * 0.05,
    resizeMode: 'stretch',
  },
  homeBookImg: {
    height: width * 0.44,
    width: width / 3,
    borderRadius: 10,
  },
  homeTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111'
  },
  viewAllText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  homePriceTag: {
    color: '#ffffff',
    fontSize: 14
  },
  homeBookName: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#111',
    fontWeight: '600'
  },
  viewAllTextTouch: {
    position: 'absolute',
    right: width * 0.06,
  },
  bookName: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: '#111'
  }
});

export default HomeScreen;
