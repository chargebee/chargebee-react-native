import Chargebee from '@chargebee/react-native-chargebee';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Products } from '../components/Product';

const PurchasesScreen = ({navigation}) => {
  const [products, setProducts] = useState<Array<string>>();

  const selectProduct = (productId) => {
    navigation.navigate('ProductDetail', { productId: productId }, productId);
  }

  useEffect(() => {
    const queryParams = new Map<string, string>();
    queryParams.set('limit', '1');
    Chargebee.retrieveProductIdentifiers(queryParams)
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Text category="h4">Showing available products</Text>
      <Products products={products} selectProduct={selectProduct} />
    </>
  );
};

export default PurchasesScreen;
