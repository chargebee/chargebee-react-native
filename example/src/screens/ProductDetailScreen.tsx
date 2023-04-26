import Chargebee, {
  Product,
  Purchase,
  Customer,
} from '@chargebee/react-native-chargebee';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { ProductDetails } from '../components/ProductDetails';
import { SuccessModal } from '../components/SuccessModal';

const ProductDetail = ({ navigation, route }) => {
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product>();
  const [productPurchased, setProductPurchased] = useState<Purchase>();
  const [showSuccess, setShowSuccess] = useState<Boolean>(false);
  const customerId = route.params.customerId;

  const purchaseProduct = async (product: Product) => {
    const productId = product.id;
    const customer: Customer = {
      id: customerId,
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@wayne.com',
    };
    console.log('Purchasing ', productId, customer);
    try {
      const purchase = await Chargebee.purchaseProduct(productId, customer);
      setProductPurchased(purchase);
      console.log(purchase);
      setShowSuccess(true);
    } catch (error) {
      console.log('Error when purchasing product identifiers', error);
      console.log(
        '=========================',
        Platform.OS,
        '========================='
      );
      const errorModel = {
        code: error.code, // RNErrorCode
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
  };

  const cancelPurchase = () => {
    navigation.goBack();
  };

  const navigateToCourses = () => {
    setShowSuccess(false);
    navigation.navigate('Courses', { successfulPurchase: productPurchased });
  };

  useEffect(() => {
    fetchProductDetails(route.params.productId);
  }, [route.params.productId]);

  async function fetchProductDetails(productId: string) {
    try {
      console.log("Fetching product details")
      const productsDetail: Array<Product> = await Chargebee.retrieveProducts([
        productId,
      ]);
      console.log("Fetched product details:", productsDetail)
      setSelectedProductDetail(productsDetail[0]);
    } catch (error) {
      console.error('Product Details fetch failed', error);
      console.log(
        '=========================',
        Platform.OS,
        '========================='
      );
      const errorModel = {
        code: error.code, // RNErrorCode
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
      <ProductDetails
        product={selectedProductDetail}
        purchaseProduct={purchaseProduct}
        cancelPurchase={cancelPurchase}
      />
      {showSuccess && (
        <SuccessModal
          show={showSuccess}
          onDismiss={navigateToCourses}
          purchasedSubscription={productPurchased}
        />
      )}
    </>
  );
};

export default ProductDetail;
