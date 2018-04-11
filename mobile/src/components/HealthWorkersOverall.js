import React from 'react';
import { View, Text, PixelRatio } from 'react-native';
import HealthWorkersList from '../container/HealthWorkersList';

import styles from '../styles/listsStyles';
import getContainerStyle from '../utils/styleUtils';
import commonStyles from '../styles/commonStyles';

const { lightThemeText } = commonStyles;

const HealthWorkersOverall = () => (
  <View style={getContainerStyle()}>
    <Text style={[styles.title, lightThemeText]}>
      {PixelRatio.get() < 2 ? 'CHW List' : 'Community Health Workers'}
    </Text>
    <HealthWorkersList selected={false} />
  </View>
);

export default HealthWorkersOverall;