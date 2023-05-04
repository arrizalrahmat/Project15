import {Platform} from 'react-native';

export const chooseOS = () => {
  if (Platform.OS === 'ios') {
    return {
      backgroundColor: 'green',
    };
  } else {
    return {
      backgroundColor: 'red',
    };
  }
};
