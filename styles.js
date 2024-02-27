
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    home: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 10,
        backgroundColor: '#CCCCCC'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sliderBox:{
        padding: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    switchContainer: {
        flexDirection: 'row',
	marginLeft: 15,
	marginRight: 15,
	marginBottom: 20,
	marginTop: 8,
    },  
    switchContents: {
        flex: 1,
    },
    switchText: {
	fontSize: 15,
    },
    text: {
      fontSize: 15,
      marginBottom: 20,
    },
    stepContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    stepText: {
      fontSize: 16,
      color: '#333',
      flex: 1,
      textAlign: 'center'
    },
    slider: {
      width: 300,
      height: 40
    },
    sliderNumber: {
      fontSize: 15,
	color: "#AAAAAA",
      flex: 1,
      textAlign: 'center'
    },
    sliderNumberSelected: {
      fontSize: 15,
	color: "#44CCEE",
      flex: 1,
      textAlign: 'center'
    },
    tableLeft: {
        flex: 1, textAlign: 'left'
    },
    tableCentre: {
        flex: 1, textAlign: 'center'
    },
    tableRight: {
        flex: 1, textAlign: 'right'
    },
    navigationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
	marginTop: 10,
	paddingTop: 6,
	paddingBottom: 6,
	paddingLeft: 30,
	paddingRight: 30
    },
    navigationText: {
        fontSize:15,
	color: "#44CCEE"
    }
  });
