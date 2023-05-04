/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {chooseOS} from './utils/styling';
import _ from 'lodash';

function App(): JSX.Element {
  const [data, setData] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [toggle, setToggle] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number>();

  const filteredData = useMemo(() => {
    if (text) {
      return data.filter(el => el.name.first.includes(text));
    }
    return [];
  }, [text, data]);

  const handleTextInput = (str: string) => {
    setText(str);
  };

  const feature1 = () => {
    console.log('blablablablablalblablabla');
  };

  const feature2 = () => {
    console.log('blablablablablalblablabla');
  };

  const handleToggle = (index: number) => setSelectedCard(index);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[styles.cardContainer, index === selectedCard ? chooseOS() : {}]}
        onPress={() => handleToggle(index)}
        key={index}
        onLongPress={() => console.log('hai hai everyone')}>
        <View style={styles.cardLeftContainer}>
          <Text>
            {item.name.first} {item.name.last}
          </Text>
          <Text>{item.email}</Text>
          <Text>{item.login.username}</Text>
        </View>
        <View style={styles.cardRightContainer}>
          <Image
            source={{
              uri: item.picture.large,
            }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = _.debounce(() => {
    console.log('search:', text);
  }, 500);

  const handleOnEnd = () => {
    fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(payload => {
        setData([...data, ...payload.results]);
      });
  };

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(payload => {
        setData(payload.results);
      });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [text]);

  return (
    <SafeAreaView>
      <View style={styles.whiteContainer}>
        <Text style={styles.title}>Data Order</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.whiteContainer}>
        <TextInput
          style={styles.inputStyle}
          value={text}
          onChangeText={handleTextInput}
          placeholder="Input text here..."
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData.length ? filteredData : data}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={handleOnEnd}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((el, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.cardContainer,
                i === selectedCard ? chooseOS() : {},
              ]}
              onPress={() => handleToggle(i)}
              onLongPress={() => console.log('hai hai everyone')}>
              <View style={styles.cardLeftContainer}>
                <Text>{el.name}</Text>
                <Text>{el.school}</Text>
                <Text>{el.phoneNumber}</Text>
              </View>
              <View style={styles.cardRightContainer}>
                <Image
                  source={require('./assets/person.jpeg')}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}

      {/* <View style={styles.separator} />
      <View style={styles.whiteContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.rowItemLabel}>SpesNo</Text>
          <Text style={styles.rowItemValue}>3456645745645</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.rowItemLabel}>Contract No</Text>
          <Text style={styles.rowItemValue}>6456234</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.rowItemLabel}>Contract Time</Text>
          <Text style={styles.rowItemValue}>
            {dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.rowItemLabel}>Installment Contract</Text>
          <Text style={styles.rowItemValue}>
            {numberPrettier(3500000, 'Rp')}
          </Text>
        </View>

        <View style={[styles.rowContainer, styles.bottomSpace19]}>
          <Text style={styles.rowItemLabel}>Tenor</Text>
          <Text style={styles.rowItemValue}>{numberPrettier(60, '')}</Text>
        </View>

        <View style={[styles.rowContainer, styles.redBackground]}>
          <Text style={styles.bigText}>DP</Text>
          <Text style={styles.bigText}>{numberPrettier(35000000, 'Rp')}</Text>
        </View>

        <View
          style={[
            styles.rowContainer,
            styles.greenBackground,
            styles.bottomSpace19,
          ]}>
          <Text style={styles.bigText}>Total</Text>
          <Text style={styles.bigText}>{numberPrettier(350000000, 'Rp')}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.whiteContainer}>
        <Text style={styles.title}>Additional</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.whiteContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.rowItemLabel}>Tahun Kendaraan</Text>
          <Text style={styles.rowItemValue}>2020</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.rowItemLabel}>Biaya Asuransi</Text>
          <Text style={styles.rowItemValue}>
            {numberPrettier(15000000, 'Rp')}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.rowItemLabel}>Customer Name</Text>
          <Text style={styles.rowItemValue}>Arrizal Rahmat Kurniawan</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.rowItemLabel}>Customer Phone</Text>
          <Text style={styles.rowItemValue}>081234567890</Text>
        </View>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
  },
  whiteContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  separator: {
    height: 5,
    backgroundColor: '#E5E5E5',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  rowItemLabel: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 12,
  },
  rowItemValue: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
  },
  bigText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
  },
  redBackground: {
    backgroundColor: 'rgba(255, 0, 8, 0.1)',
    padding: 10,
  },
  greenBackground: {
    backgroundColor: 'rgba(92, 209, 130, 0.2)',
    padding: 10,
  },
  bottomSpace19: {
    marginBottom: 25,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'black',
    height: 25,
    fontSize: 14,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 8,
    borderRadius: 8,
  },
  cardLeftContainer: {},
  cardRightContainer: {},
  image: {
    height: 80,
    width: 60,
    resizeMode: 'contain',
  },
  getBackground: condition => ({
    backgroundColor: condition === 'danger' ? 'blue' : 'yellow',
  }),
});

export default App;
