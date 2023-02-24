import Chargebee from '@chargebee/react-native-chargebee';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Products } from '../components/Product';

const PurchasesScreen = () => {
  const [products, setProducts] = useState<Array<string>>();

  useEffect(() => {
    const queryParams = new Map<string, string>();
    queryParams.set('limit', '1');
    Chargebee.retrieveProductIdentifiers(queryParams)
      .then((products) => {
        console.log('+++1', products);
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Text category="h4">Showing available products</Text>
      <Products products={products} />
    </>
  );
};

export default PurchasesScreen;
