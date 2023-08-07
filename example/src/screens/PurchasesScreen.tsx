import Chargebee, {
  ProductIdentifiersRequest,
} from '@chargebee/react-native-chargebee';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Products } from '../components/Product';

const PurchasesScreen = ({ navigation, customerId }) => {
  const [products, setProducts] = useState<Array<string>>([]);

  // selectProduct being used to buy subscriptions
  const selectProduct = (productId) => {
    navigation.navigate('ProductDetail', {
      productId: productId,
      customerId: customerId,
    });
  };

  // selectOTPProduct being used to buy one time product
  const selectOTPProduct = (productId) => {
      navigation.navigate('OTPProductDetail', {
        productId: productId,
        customerId: customerId,
      });
    };

  useEffect(() => {
    fetchProductIdentifiers();
  }, []);

  async function fetchProductIdentifiers() {
    const queryParams: ProductIdentifiersRequest = {
      limit: '10',
      offset: '1',
    };
    try {
      console.log('Fetching products');
      const products = await Chargebee.retrieveProductIdentifiers(queryParams);
      setProducts(products);
      console.log('Fetched products', products);
    } catch (error) {
      console.log('Error when fetching product identifiers', error);
      console.log(
        '=========================',
        Platform.OS,
        '========================='
      );
      const errorModel = {
        code: error.code, // ChargebeeErrorCode
        message: error.message, // Message
        userInfo: {
          message: error.userInfo?.message, // Message
          apiErrorCode: error.userInfo?.apiErrorCode, // API Error Code
          httpStatusCode: error.userInfo?.httpStatusCode, // HTTP Status Code
        },
      };
      console.error(errorModel);
      console.log('=========================');
    }
  }

  return (
    <>
      <Text category="h4">Showing available products</Text>
      <Products products={products} selectProduct={selectProduct} />
    </>
  );
};

export default PurchasesScreen;
