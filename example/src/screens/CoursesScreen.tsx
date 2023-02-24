import { List, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Course } from '../components/Course';

const CoursesScreen = () => {
  const data = new Array(8).fill({
    title: 'Course',
  });

  const renderItem = (info) => <Course info={info} />;

  return (
    <>
      <Text category="h4">Showing available courses</Text>
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={renderItem}
      />
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
