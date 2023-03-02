import Chargebee, {
  Product,
  Purchase,
} from '@chargebee/react-native-chargebee';
import React, { useEffect, useState } from 'react';
import { ProductDetails } from '../components/ProductDetails';
import { SuccessModal } from '../components/SuccessModal';

const ProductDetail = ({ navigation, route }) => {
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product>();
  const [productPurchased, setProductPurchased] = useState<Purchase>();
  const [showSuccess, setShowSuccess] = useState<Boolean>(false);
  const customerId = route.params.customerId;

  const purchaseProduct = async (product: Product) => {
    const productId = product.id;
    console.log('Purchasing ', productId, customerId);
    const purchase = await Chargebee.purchaseProduct(productId, customerId);
    setProductPurchased(purchase);
    console.log(purchase);
    setShowSuccess(true);
  };

  const cancelPurchase = () => {
    navigation.goBack();
  };

  const navigateToCourses = () => {
    setShowSuccess(false);
    navigation.navigate('Courses', { successfulPurchase: productPurchased });
  };

  useEffect(() => {
    Chargebee.retrieveProducts([route.params.productId])
      .then((productsDetail) => {
        setSelectedProductDetail(productsDetail[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [route.params.productId]);

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
