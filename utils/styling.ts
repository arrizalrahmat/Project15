import {Platform} from 'react-native';

export const chooseOS = () => {
  if (Platform.OS === 'ios') {
    return {
      backgroundColor: 'blue',
    };
  } else {
    return {
      backgroundColor: 'yellow',
    };
  }
};
