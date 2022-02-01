import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const RButton = props => {
  const select = value => {
    props.onSelecting(value);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => select(props.value)}>
        {props.selected === props.value && (
          <View style={styles.checkedButton} />
        )}
      </TouchableOpacity>
      <Text>{props.label}</Text>
    </View>
  );
};

const BuyRadio = () => {
  const [radio, setRadio] = useState('');
  const data = [
    {
      label: 'Buy',
      value: 'Buy',
    },
    {
      label: 'Bid Listings',
      value: 'BidLiostings',
    },
  ];

  const checkRadio = value => {
    setRadio(value);
    console.log('Selected Value ---------', value);
  };

  return (
    <View style={styles.container}>
      {data.map(q => {
        return (
          <RButton
            key={q.label}
            label={q.label}
            value={q.value}
            onSelecting={checkRadio}
            selected={radio}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  button: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#b48221',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  checkedButton: {
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
});

export default BuyRadio;
