import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#CCCCCC',
  },
  text: {
    fontSize: 15,
    marginBottom: 20,
  },
  RaiseBlindsContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  flipContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    marginTop: 8,
  },
  flipContents: {
    flex: 1,
  },
  flipText: {
    fontSize: 15,
  },
  slider: {
    width: 300,
    height: 40,
  },
  sliderNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderNumber: {
    fontSize: 15,
    color: '#AAAAAA',
    flex: 1,
    textAlign: 'center',
  },
  sliderNumberSelected: {
    fontSize: 15,
    color: '#44CCEE',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    flexDirection: 'row',
    padding: 10,
  },
  tableCellHeader: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'lightgray',
  },
  tableLeft: {
    flex: 1,
    textAlign: 'left',
  },
  tableCentre: {
    flex: 1,
    textAlign: 'center',
  },
  tableRight: {
    flex: 1,
    textAlign: 'right',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 30,
    paddingRight: 30,
  },
  navigationText: {
    fontSize: 15,
    color: '#44CCEE',
  },
});
