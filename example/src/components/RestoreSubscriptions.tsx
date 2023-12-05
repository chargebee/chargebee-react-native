import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text, Card, Button, Modal } from '@ui-kitten/components';
import Chargebee, { Customer } from '@chargebee/react-native-chargebee';

export const RestoreSubscriptions = ({ customerId }) => {
  const [visible, setVisible] = React.useState(false);
  const [restoreDisabled, setRestoreDisabled] = React.useState(false);
  const [restoreData, setRestoreData] = React.useState('');

  const restorePurchases = async () => {
    setRestoreDisabled(true);
    const customer: Customer = {
      id: customerId,
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@wayne.com',
    };
    console.log('Restoring purchases for ', customer);
    try {
      const restoredSubscriptions = await Chargebee.restorePurchases(
        true,
        customer
      );
      console.log('Restored purchases', restoredSubscriptions);
      setRestoreData(JSON.stringify(restoredSubscriptions));
      console.log(
        'Restored Subscription Id',
        restoredSubscriptions[0]?.subscriptionId
      );
      console.log('Restored Plan Id', restoredSubscriptions[0]?.planId);
      console.log(
        'Restored Store Status',
        restoredSubscriptions[0]?.storeStatus
      );
      setVisible(true);
    } catch (error) {
      console.log('Restore Purchases failed', error);
      console.log(
        '=========================',
        Platform.OS,
        '========================='
      );
      const errorModel = {
        code: error.code,
        message: error.message,
        userInfo: {
          message: error.userInfo?.message,
          apiErrorCode: error.userInfo?.apiErrorCode,
          httpStatusCode: error.userInfo?.httpStatusCode,
        },
      };
      console.error(errorModel);
      console.log('=========================');
      setRestoreData(JSON.stringify(errorModel));
      setVisible(true);
    }
  };
  function dismissModal() {
    setRestoreDisabled(false);
    setVisible(false);
  }
  return (
    <>
      <Button
        style={styles.restore}
        appearance="outline"
        disabled={restoreDisabled}
        onPress={() => restorePurchases()}
      >
        Restore Purchases
      </Button>
      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>
            Restored data:
            {restoreData}
          </Text>
          <Button onPress={() => dismissModal()}>DISMISS</Button>
        </Card>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  restore: {
    justifyContent: 'center',
  },
});
