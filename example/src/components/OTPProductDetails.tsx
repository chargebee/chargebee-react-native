import { Button, Card, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const OTPProductDetails = ({
  product,
  purchaseNonSubscriptionProduct,
  cancelPurchase,
}) => {
  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{product?.title}</Text>
      <Text category="s1">{product?.id}</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size="small"
        status="basic"
        onPressOut={cancelPurchase}
      >
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size="small"
        onPressOut={() => purchaseNonSubscriptionProduct(product)}
      >
        OTP PURCHASE
      </Button>
    </View>
  );

  return product ? (
    <Layout style={styles.topContainer} level="1">
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text>
          Price: {product?.price}
          Currency: {product?.currencyCode}
        </Text>
      </Card>
    </Layout>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
