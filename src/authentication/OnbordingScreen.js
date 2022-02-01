import React,{useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { width } from '../utility/Dimentions'
import Onboarding from 'react-native-onboarding-swiper';
import { useSelector } from 'react-redux';
const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? '#fff' : '#cc8fd6';
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
}

const Skip = ({ ...props }) => (
  <TouchableOpacity
    style={styles.buttonTouch}
    {...props}
  >
    <Text style={styles.buttonText}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity
    style={styles.buttonTouch}
    {...props}
  >
    <Text style={styles.buttonText}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={styles.buttonTouch}
    {...props}
  >
    <Text style={styles.buttonText}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  const selecttoken=useSelector(state=>state.userReducer.Token);

  useEffect(()=>{
  if(selecttoken!=null)
    navigation.navigate('Home')
  },[])
  return (
    <Onboarding
      containerStyles={{ marginTop: width * -0.25 }}
      bottomBarColor={'#ab47bc'}
      titleStyles={{
        marginTop: width * -0.15,
        color: '#790e8b'
      }}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("LoginScreen")}
      onDone={() => navigation.navigate("LoginScreen")}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image style={styles.onbordingImg} source={require('../assets/images/Onbording1.png')} />,
          title: 'Books to change our world',
          subtitle: 'A world of books for young, old and children.',
        },
        {
          backgroundColor: '#fff',
          image: <Image style={styles.onbordingImg} source={require('../assets/images/Onbording2.png')} />,
          title: 'Enrich your life',
          subtitle: "We Lose Ourselves in Books, We Find Ourselves There, Too.",
        },
        {
          backgroundColor: '#fff',
          image: <Image style={styles.onbordingImg} source={require('../assets/images/Onbording3.png')} />,

          title: 'As the Page Turns',
          subtitle: 'A New Way To Connect With The World',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTouch: {
    marginHorizontal: 10
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
  onbordingImg: {
    height: '70%',
    width: '100%'
  }
});
