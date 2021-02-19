import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';

const Header = ({title, onPress, iconType, iconName}) => {
  if (iconType === 'icon-only') {
    return (
      <View style={styles.container}>
        <Button type={iconType} icon={iconName} onPress={onPress} />
        <Text style={styles.text}>{title}</Text>
        <Gap width={24} />
      </View>
    );
  }
  return (
    <View style={styles.container1}>
      <Text style={styles.text}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  container1: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingLeft: 55,
    paddingVertical: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
});
