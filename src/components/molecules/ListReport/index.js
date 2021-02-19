import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';
import {fonts} from '../../../utils/fonts/index';
import {Button} from '../../atoms';

const ListReport = ({
  fullname,
  gender,
  age,
  status,
  currentPhoto,
  location,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperChat}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -15,
            right: -15,
            backgroundColor: colors.primary,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 100,
          }}
          onPress={onPress}>
          <Text style={{color: colors.white}}>Edit</Text>
        </TouchableOpacity>
        <Image
          style={styles.avatar}
          source={{
            uri: currentPhoto,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.desc}>{`${gender} / ${age} `}</Text>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <Text style={styles.desc}>{status} </Text>
        </View>
      </View>
    </View>
  );
};

export default ListReport;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  avatar: {width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12},
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    marginTop: 2,
  },
  wrapperChat: {flex: 1, flexDirection: 'row'},
});
