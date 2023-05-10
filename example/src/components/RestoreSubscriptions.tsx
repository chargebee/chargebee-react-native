import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Text, Card, Button, Modal } from '@ui-kitten/components';
import Chargebee from '@chargebee/react-native-chargebee';

export const RestoreSubscriptions = () => {
    const [visible, setVisible] = React.useState(false);
    const [restoreDisabled, setRestoreDisabled] = React.useState(false);
    const [restoreData, setRestoreData] = React.useState('');

    const restorePurchases = async () => {
        console.log("Restoring purchases")
        setRestoreDisabled(true)
        try {
            const restoredSubscriptions = await Chargebee.restorePurchases(true)
            console.log("Restored purchases", restoredSubscriptions)
            console.log("Restored Subscription Id", restoredSubscriptions[0].subscriptionId)
            console.log("Restored Plan Id", restoredSubscriptions[0].planId)
            console.log("Restored Store Status", restoredSubscriptions[0].storeStatus)
            setRestoreData(JSON.stringify(restoredSubscriptions))
            setVisible(true)
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
            setRestoreData(JSON.stringify(errorModel))
            setVisible(true)
        }
    }
    function dismissModal() {
        setRestoreDisabled(false)
        setVisible(false)
    }
    return (
        <>
            <Button style={styles.restore} appearance='outline' disabled={restoreDisabled} onPress={() => restorePurchases()}>Restore Purchases</Button>
            <Modal visible={visible}>
                <Card disabled={true}>
                    <Text>
                        Restored data:
                        {restoreData}
                    </Text>
                    <Button onPress={() => dismissModal()}>
                        DISMISS
                    </Button>
                </Card>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    restore: {
        justifyContent: 'center',
    }
});

