import { StyleSheet } from "react-native";
import { height, width } from "../../utility/Dimentions";

const MainStyles = () => {
  return new StyleSheet.create({

    //------------ Views & Containers -----------------//
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
      marginTop: width * -0.09,
      padding: 5,
    },

    //------------  Scrolls --------------------//
    mainScroll: {
      flex: 1,
    },

    homeBookScroll: {
      height: width * 0.60,
      flexDirection: 'row',
      // marginHorizontal: 10,
    },

    //------------ Images ---------------------//
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


    //-----------  Texts & Labels -------------------//

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
      //marginTop: 3,
      fontSize: 14,
      color: '#111',
      fontWeight: 'bold'
    },
    //----------    Buttons & Touch-----------------//

    viewAllTextTouch: {
      position: 'absolute',
      right: width * 0.06,
    },

  });
}


export default MainStyles;