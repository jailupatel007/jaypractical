import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {axoisGet} from '../Helper/ServiceCall';
import {useNavigation} from '@react-navigation/native';

const ProductList = () => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    const response = await axoisGet('products');
    console.log('Products===', response);
    setProductData(response);
    var mainTotal = 0;
    for (var i = 0; i < response.length; i++) {
      mainTotal = response[0].price + mainTotal;
    }
    setTotal(mainTotal);
  }, []);

  const goToMapScreen = () => {
    navigation.navigate('GoogleMap');
  };

  const Item = ({title, goToMapScreen}) => {
    return (
      <TouchableOpacity style={styles.mainItem} onPress={goToMapScreen}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black', padding: 10}}>{title.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      {productData && productData.length > 0 ? (
        <FlatList
          style={{flex: 1, marginBottom: 50}}
          contentContainerStyle={{flex: 1}}
          data={productData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <Item title={item} goToMapScreen={() => goToMapScreen()}></Item>
          )}></FlatList>
      ) : null}
      <View style={styles.viewTotal}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Total: {total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainItem: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
  },
  viewTotal: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    padding: 20,
    backgroundColor: 'black',
    flex: 1,
  },
});

export default ProductList;
