import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector, useDispatch} from 'react-redux';
//import {height, width} from '../utility/Dimentions';
import {categoryList} from '../store/actions';
import {height, width} from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const countriesWithFlags = [
  {title: 'Egypt'},
  {title: 'Canada'},
  {title: 'Australia'},
  {title: 'Ireland'},
];

const App = () => {
  const {category} = useSelector(state => state.userReducer);
  console.log('category-----------------------------------35', category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryList());
  }, []);

  return (
    <View>
      <SelectDropdown
        data={category}
        // defaultValueByIndex={1}
        renderDropdownIcon={() => {
          return <Icons name="chevron-down" color={'#111'} size={18} />;
        }}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <Text style={{textAlign: 'center'}}>
              {selectedItem ? selectedItem.category : 'Select Here'}
            </Text>
          );
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View>
              <Text style={{textAlign: 'center'}}>{item.category}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  shadow: {},
});

{
  /*
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {height, width} from '../utility/Dimentions';
import {categoryList} from '../store/actions';

const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setlayoutHeight] = useState(0);

  const {category} = useSelector(state => state.userReducer);
  // console.log('category-----------------------------------35', category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryList());
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.CategoriesItem}>
        <View style={styles.categoriesItemContainer}>
          <Text style={styles.itemText}>++SElect HEERr++</Text>
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
          height: 50,
          backgroundColor: 'red',
        }}>
        <View>
          {category &&
            category.map((item, key) => (
              <TouchableOpacity key={item.id}>
                <View style={styles.itemContainer}>
                  <View style={styles.subCateItem}>
                    <Text style={styles.cateName} numberOfLines={2}>
                      {item.category}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
};

export default ExpandableComponent;

const styles = StyleSheet.create({
  CategoriesItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    flexDirection: 'row',
  },
  categoriesItemContainer: {
    // flex: 1,
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
    //margin: 8,
    backgroundColor: 'red',
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 5,
  },
});









import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {height, width} from '../utility/Dimentions';
import {categoryList} from '../store/actions';

const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setlayoutHeight] = useState(0);

  const {category} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryList());
    console.log('category-----------------------------------35', category);
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.CategoriesItem} onPress={onClickFunction}>
        <View style={styles.categoriesItemContainer}>
          <Text style={styles.itemText}>++SElect HEERr++</Text>
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
          height: 50,
          backgroundColor: 'red',
          // flexWrap: 'wrap',
          //  alignItems: 'flex-start',
          // height: layoutHeight,
          //  overflow: 'hidden',
          // alignItems: 'center',
          // backgroundColor: '#fff',
          // margin: 5,
        }}>
        <View>
          {category.map((item, key) => (
                <TouchableOpacity key={item.id}>
                  <View style={styles.itemContainer}>
                    <View style={styles.subCateItem}>
                      <Text style={styles.cateName} numberOfLines={2}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
        </View>
      </View>
    </View>
  );
};

export default ExpandableComponent;

const styles = StyleSheet.create({
  CategoriesItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    flexDirection: 'row',
  },
  categoriesItemContainer: {
    // flex: 1,
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
    //margin: 8,
    backgroundColor: 'red',
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 5,
  },
});
























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
import {height, width} from '../utility/Dimentions';
import {categoryList} from '../store/actions';

const DATA = [
  {
    id: '1',
    name: 'Select Here',
    sub_category: [
      {
        id: '17',
        name: 'Item 1',
      },
      {
        id: '18',
        name: 'Item 2',
      },
      {
        id: '19',
        name: 'Item 3',
      },
    ],
  },
];

const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setlayoutHeight] = useState(0);

  const {category} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.isExpanded) {
      setlayoutHeight(null);
    } else {
      setlayoutHeight(0);
    }
  }, [item.isExpanded]);

  useEffect(() => {
    dispatch(categoryList());
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.CategoriesItem} onPress={onClickFunction}>
        <View style={styles.categoriesItemContainer}>
          <Text style={styles.itemText}>SElect HEERr</Text>
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
  const {category} = useSelector(state => state.userReducer);
  //const dispatch = useDispatch();

  const [multiSelect, setmultiSelect] = useState(false);
  const [listDataSource, setlistDataSource] = useState(DATA);

  // useEffect(() => {
  //  dispatch(getCategories());
  // }, []);

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
      <View style={{width: width / 1.2}} nestedScrollEnabled={true}>
        {listDataSource.map((item, key) => (
          <ExpandableComponent
            key={item.id}
            item={item}
            onClickFunction={() => {
              updateLayout(key);
            }}
          />
        ))}
      </View>
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
    width: width / 1.2,
    height: height / 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginBottom: 5,
  },
});

export default AllCategories;

*/
}
