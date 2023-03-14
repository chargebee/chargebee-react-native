import Chargebee, {
  ProductIdentifiersRequest,
} from '@chargebee/react-native-chargebee';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Products } from '../components/Product';

const PurchasesScreen = ({ navigation, customerId }) => {
  const [products, setProducts] = useState<Array<string>>([]);

  const selectProduct = (productId) => {
    navigation.navigate('ProductDetail', {
      productId: productId,
      customerId: customerId,
    });
  };

  useEffect(() => {
    const queryParams: ProductIdentifiersRequest = {
      limit: '2',
      offset: '1',
    };
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
