import { List, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Course } from '../components/Course';
import Entitlement from '@chargebee/react-native-chargebee';
import EntitlementsRequest from '@chargebee/react-native-chargebee';
import Chargebee from '@chargebee/react-native-chargebee';

const CoursesScreen = ({ subscriptions }) => {
  const [entitlements, setEntitlements] = useState<Array<Entitlement>>([]);

  useEffect(() => {
    fetchEntitlements();
  });

  const data = new Array(8).fill({
    title: 'Course',
  });

  async function fetchEntitlements() {
    const request: EntitlementsRequest = {
      subscriptionId: subscriptions[0].id,
    };
    console.log('Fetching Entitlements for ', request);
    try {
      const entitlements: Array<Entitlement> =
        await Chargebee.retrieveEntitlements(request);
      setEntitlements(entitlements);
      console.log('Entitlements:', entitlements);
    } catch (e) {
      console.log('Error', e);
    }
  }

  const renderItem = (info) => <Course info={info} />;

  return (
    <>
      {entitlements && entitlements.length > 0 ? (
        <>
          <Text category="h4">Showing available courses</Text>
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={data}
            renderItem={renderItem}
          />
        </>
      ) : (
        <Text category="h4">No entitled courses.</Text>
      )}
    </>
  );
};

export default CoursesScreen;

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
