import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {axoisGet} from '../Helper/ServiceCall';
import {useNavigation} from '@react-navigation/native';

const ProductList = () => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);

  useEffect(async () => {
    const response = await axoisGet('products');
    setProductData(response);
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
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}}
          data={productData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <Item title={item} goToMapScreen={() => goToMapScreen()}></Item>
          )}></FlatList>
      ) : null}
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
});

export default ProductList;
