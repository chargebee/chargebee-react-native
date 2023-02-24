import Chargebee, { Product } from '@chargebee/react-native-chargebee';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';

const ProductDetail = ({navigation, route}) => {

    const [selectedProductDetail, setSelectedProductDetail] = useState<Product>()

  useEffect(() => {
    Chargebee.retrieveProducts([route.params.productId])
      .then((productsDetail) => {
        setSelectedProductDetail(productsDetail[0])
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <> 
      <Text category="h4">Product ID: {selectedProductDetail?.id}</Text>
      <Text category="h4">Product ID: {selectedProductDetail?.title}</Text>
      <Text category="h4">Product ID: {selectedProductDetail?.price}</Text>
      <Text category="h4">Product ID: {selectedProductDetail?.currencyCode}</Text>
    </>
  );
};

export default ProductDetail;
