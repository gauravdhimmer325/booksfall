import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image
} from 'react-native';
import { width } from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Base_URL } from '../store/Base_URL';

const SearchScreen = ({ navigation }) => {
  const [book, setBook] = useState([])
  const getCategory = async () => {
    try {
      const result = await fetch(
        Base_URL + 'categoryList',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
        },
      );
      const json = await result.json();
      setData(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bookList = async () => {
    try {
      var second_option_filter
      if (!state.min_price || !state.max_price) {
        second_option_filter = 2
      }
      else {
        second_option_filter = 1
      }
      let formData = new FormData();
      formData.append('category_id', state.selectedId ? state.selectedId : 0);
      formData.append('first_option_filter', state.atoz);
      formData.append('second_option_filter', second_option_filter);
      formData.append('min_price', state.min_price);
      formData.append('max_price', state.max_price);
      formData.append('search_text', state.search);
      const result = await fetch(
        Base_URL + 'bookList',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        },
      );
      const json = await result.json();
      setBook(json.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    bookList();
  }, []);


  const [state, setState] = useState({
    search: '',
    atoz: '',
    selectedId: '',
    min_price: '',
    max_price: ''
  });
  const { search, atoz, selectedId, range, min_price, max_price } = state;
  const updateState = data => setState(() => ({ ...state, ...data }));

  const [modalVisible, setModalVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [selectedCate, setSelectedCate] = useState()

  const resetState = () => {
    setState({
      ...state, selectedId: '', atoz: '', min_price: '', max_price: ''
    })
    setSelectedCate('')
    bookList()
  }
  return (
    <View >
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.centerIcon}>
                <Icons name='sort-alpha-up-alt' size={25} color={'#fff'} />
              </View>
              <View style={styles.modalTopRow}>
                <TouchableOpacity onPress={() => resetState()}>
                  <Text>Reset</Text>
                </TouchableOpacity>
                <Text style={styles.filterText}>Filter</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icons name='times-circle' color={'#790e8b'} solid size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.radioView}>
                <TouchableOpacity
                  onPress={() => setState({ ...state, atoz: 1 })}
                  style={styles.atozRadio}>
                  {atoz == 1 ?
                    <Icons name='stop-circle' size={17} color={'#790e8b'} /> :
                    <Icons name='circle' size={17} color={'#790e8b'} />
                  }
                  <Text style={{ paddingLeft: 10 }}>A to Z</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setState({ ...state, atoz: 2 })}
                  style={styles.ztoaRadio}>
                  {atoz == 2 ?
                    <Icons name='stop-circle' size={17} color={'#790e8b'} /> :
                    <Icons name='circle' size={17} color={'#790e8b'} />
                  }
                  <Text style={{ paddingLeft: 10 }}>Z to A</Text>
                </TouchableOpacity>
              </View>

              <View
                style={styles.dropView}>
                <TouchableOpacity
                  onPress={() => setOpen(!open)}
                  style={styles.dropTouch} >
                  <Text style={styles.sltCtg}>
                    {!selectedCate ? 'Select Category' : selectedCate}
                  </Text>
                  <Icons style={{ paddingRight: 10 }} name='chevron-down' />
                </TouchableOpacity>
                {open == true ?
                  data.map((item, key) => {
                    const backgroundColor = item.id === state.selectedId ? "#fae8fc" : "#eac0f1";
                    return (
                      <TouchableOpacity key={item.id} onPress={() =>
                        setOpen(!open) &
                        setState({ ...state, selectedId: item.id }) &
                        setSelectedCate(item.category)
                      }
                        style={{
                          backgroundColor: backgroundColor,
                          padding: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: '#999'
                        }}>
                        <Text>{item.category}</Text>
                      </TouchableOpacity>)
                  })
                  : null}
              </View>

              <View
                style={{ marginTop: width * 0.05 }}>
                <Text style={styles.prizeText}>Prize Range</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Min Prise</Text>
                  <TextInput
                    placeholder={state.min_price ? state.min_price : '0'}
                    placeholderTextColor={'#111'}
                    onChangeText={min_price => updateState({ min_price })}
                    style={styles.maxInput} />
                  <Text>Max Prise</Text>
                  <TextInput
                    placeholder={state.max_price ? state.max_price : '0'}
                    placeholderTextColor={'#111'}
                    onChangeText={max_price => updateState({ max_price })}
                    style={styles.maxInput} />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => bookList() & setModalVisible(!modalVisible)}
                style={styles.buttonTouch}>
                <Text
                  style={styles.buttonText}>
                  Apply Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.inputView}>
        <Icons name={"search"} size={17} color={'#790e8b'} />
        <TextInput
          placeholder={'Search here'}
          style={styles.inputText}
          onChangeText={search => updateState({ search })}
          onSubmitEditing={() => bookList()}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}
          style={styles.filterTouch}>
          <Text style={{
            color: '#790e8b'
          }}>Filter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.mainView}>
          {book && book.map((item, key) => {
            return (
              <View key={item.id} style={styles.box}>
                <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { paramKey: item })} >
                  <Image
                    style={styles.squareImage}
                    source={{
                      uri: item.image
                    }}
                  />
                  <View
                    style={styles.priseView}>
                    <Text style={styles.priseTag}>
                      $  {parseFloat(item.price).toFixed(2)}
                    </Text>
                    <Text style={styles.priseTag}>
                      <Icons
                        name={'star'}
                        size={15}
                        color={'gold'}
                      />
                      {parseFloat(item.rates).toFixed(2)}
                    </Text>
                  </View>
                  <Text numberOfLines={2} style={styles.bookName}>{item.book_name}</Text>
                </TouchableOpacity>
              </View>
            )
          })
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: width * 0.13,
    paddingLeft: 10,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  inputText: {
    width: '90%',
    height: width * 0.13,
    paddingLeft: 20,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    borderRadius: 30,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '97%',
    height: '70%',
    marginTop: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: width * 0.07,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  buttonTouch: {
    width: '90%',
    height: width * 0.13,
    backgroundColor: '#9c27b0',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.05,
    marginBottom: width * 0.05
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  centerIcon: {
    backgroundColor: '#790e8b',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    marginTop: -20
  },
  modalTopRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: -10
  },
  radioView: {
    flexDirection: 'row',
    width: '50%',
    marginTop: width * 0.05,
    marginLeft: width * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  atozRadio: {
    borderRightWidth: 2,
    paddingRight: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ztoaRadio: {
    paddingRight: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center'
  },

  prizeText: {
    alignSelf: 'center',
    color: '#111',
    fontWeight: 'bold',
    paddingTop: 2,
    fontSize: 15,
    marginBottom: 10
  },
  filterTouch: {
    marginLeft: width * -0.10,
    borderLeftWidth: 2,
    borderLeftColor: '#790e8b',
    paddingLeft: width * 0.02
  },
  dropView: {
    width: '90%',
    marginTop: width * 0.05,
    alignSelf: 'center'
  },
  dropTouch: {
    justifyContent: 'space-between',
    width: '100%',
    height: width * 0.10,
    borderBottomWidth: 1.2,
    borderBottomColor: '#999',
    flexDirection: 'row'
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginTop: 10
  },
  box: {
    alignSelf: 'center',
    flexBasis: '47%',
    backgroundColor: 'red',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 5,
    margin: 5,
    height: width * 0.70,
    shadowColor: '#111111',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  squareImage: {
    height: '83%',
    width: '100%',
    borderRadius: 10,
  },
  priseView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -25,
    padding: 5,
  },
  priseTag: {
    color: '#ffffff',
    fontSize: 14
  },
  bookName: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#111'
  },
  maxInput: {
    backgroundColor: '#f8eafa',
    width: width * 0.15,
    height: width * 0.07,
    borderRadius: 10,
    padding: 5
  }
});

export default SearchScreen;
