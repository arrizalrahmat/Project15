import {Platform} from 'react-native';

export const chooseOS = () => {
  if (Platform.OS === 'ios') {
    return {
      backgroundColor: 'orange',
    };
  } else {
    return {
      backgroundColor: 'magenta',
    };
  }
};
