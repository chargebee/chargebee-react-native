import { Text } from '@ui-kitten/components';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

export const SuccessModal = ({ show, purchasedSubscription, onDismiss }) => {
  return (
    <Modal animationType="slide" visible={show}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Your purchase is successful!</Text>
          <Text>Purchased Product: {purchasedSubscription.plan_id}</Text>
          <Text>Subscription: {purchasedSubscription.subscription_id}</Text>
          <Text>User: {purchasedSubscription.customer_id}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => onDismiss()}
          >
            <Text style={styles.textStyle}>View Courses</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
