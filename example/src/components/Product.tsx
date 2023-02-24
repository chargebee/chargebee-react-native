import { Card, List, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

export const Products = ({ products, selectProduct }) => {
  const renderItem = (product) => {
    return (
      <Card style={styles.item} status="primary" onPressOut={() => selectProduct(product.item)}>
        <Text> Product: {product.item} </Text>
      </Card>
    );
  };

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={products}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});
