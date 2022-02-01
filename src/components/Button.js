import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { height, width } from '../utility/Dimentions';

const Button = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    //marginTop: 10,
    width: width / 1.2,
    height: height / 12,
    backgroundColor: '#272727',
    //padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',

  },
});
