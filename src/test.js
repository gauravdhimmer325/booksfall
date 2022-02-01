import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {height, width} from './utility/Dimentions';
//import {getCategories} from '../../store/actions';

const DATA = [
  {
    id: '1',
    name: 'First Item',
    src: require('./assets/1.png'),
    sub_category: [
      {
        id: '17',
        name: 'Item 1',
        image: require('./assets/1.png'),
      },
      {
        id: '18',
        name: 'Item 2',
        image: require('./assets/1.png'),
      },
      {
        id: '19',
        name: 'Item 3',
        image: require('./assets/1.png'),
      },
    ],
  },
];

const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setlayoutHeight] = useState(0);

  // const {categories} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(getCategories());
    if (item.isExpanded) {
      setlayoutHeight(null);
    } else {
      setlayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity style={styles.CategoriesItem} onPress={onClickFunction}>
        <View style={styles.categoriesItemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Icons
            style={styles.downIcon}
            name={'chevron-down'}
            color={'#000000'}
            size={20}
          />
          <View style={styles.separator} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          height: layoutHeight,
          overflow: 'hidden',
          alignItems: 'center',
          backgroundColor: '#fff',
          margin: 5,
        }}>
        {item.sub_category.map((item, key) => (
          <TouchableOpacity key={item.id}>
            <View style={styles.itemContainer}>
              <View style={styles.subCateItem}>
                <Text style={styles.cateName} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const AllCategories = ({navigation}) => {
  //const {categories} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [multiSelect, setmultiSelect] = useState(false);
  const [listDataSource, setlistDataSource] = useState(DATA);

  // useEffect(() => {
  //    dispatch(getCategories());
  //  }, []);

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      //If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setlistDataSource(array);
  };

  return (
    <View>
      <ScrollView nestedScrollEnabled={true}>
        {listDataSource.map((item, key) => (
          <ExpandableComponent
            key={item.id}
            item={item}
            onClickFunction={() => {
              updateLayout(key);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  CategoriesItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    flexDirection: 'row',
  },
  categoriesItemContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  downIcon: {
    position: 'absolute',
    right: 0,
    margin: 10,
  },
  itemText: {
    fontSize: 14,
    padding: 10,
    fontWeight: '500',
  },
  subCateItem: {
    alignItems: 'center',
    margin: 8,
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    width: '100%',
    marginTop: 5,
  },
  cateName: {
    textAlign: 'center',
  },
  itemContainer: {
    width: width,
    height: height / 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginBottom: 5,
  },
});

export default AllCategories;
