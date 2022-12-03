import {Dimensions, StyleSheet} from 'react-native';

export const HEIGHT = Dimensions.get('window').height / 3;

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#000000',
    flex: 1,
  },
  contentview: {
    backgroundColor: 'white',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: HEIGHT,
    maxHeight: HEIGHT * 3,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  dragger: {
    backgroundColor: 'lightgrey',
    padding: 3,
    margin: 5,
    width: 50,
    borderRadius: 3,
    alignSelf: 'center',
  },
  draggerview: {
    padding: 5,
  },
});

export default styles;
