import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Gap,
  Header,
  Input,
  InputPhoto,
  Loading,
} from '../../components';
import {colors, fonts, useForm} from '../../utils';
import {Picker} from '@react-native-picker/picker';
import {Fire} from '../../config';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {v4 as uuidv4} from 'uuid';
import {ILNullPhoto} from '../../assets';
import RNLocation from 'react-native-location';

const CreateUser = ({navigation}) => {
  const [genderCollection] = useState(['- Select Gender -', 'Male', 'Female']);
  const [statusCollection] = useState([
    '- Select Status -',
    'Single',
    'Married',
  ]);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [uriPhoto, setUriPhoto] = useState(ILNullPhoto);

  const [form, setForm] = useForm({
    fullname: '',
    gender: '',
    age: '',
    status: '',
    location: '',
  });

  const optionsImage = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 0.5,
    maxWidth: 200,
    maxHeight: 200,
  };

  const onUploadPhotoHandler = () => {
    launchCamera(optionsImage, (response) => {
      if (response.didCancel) {
        showMessage({
          message: 'cancel',
          type: 'danger',
        });
      } else {
        console.log(response);
        setHasPhoto(true);
        setPhoto(`data:${response.type};base64, ${response.base64}`);
        setUriPhoto({uri: response.uri});
      }
    });
  };

  const onSubmitHandler = () => {
    setLoading(true);
    let data = {
      fullname: form.fullname,
      status: form.status,
      age: form.age,
      gender: form.gender,
      location: form.location,
      photo: photo,
      uriPhoto: uriPhoto,
    };

    Fire.database()
      .ref(`reports/${uuidv4()}/`)
      .set(data, (error) => {
        if (error) {
          // The write failed...
          setLoading(false);
          showMessage({
            message: `Failed to create report!  `,
            description: `${error.message}`,
            type: 'danger',
          });
        } else {
          setLoading(false);
          // Data saved successfully!
          showMessage({
            message: `Report Created Successfully!  `,
            description: `View your report on history page`,
            type: 'success',
          });
          navigation.replace('MainApp');
        }
      });
  };

  RNLocation.configure({
    distanceFilter: 5.0,
  });

  RNLocation.requestPermission({
    ios: 'whenInUse',
    android: {
      detail: 'coarse',
    },
  }).then((granted) => {
    if (granted) {
      this.locationSubscription = RNLocation.subscribeToLocationUpdates(
        (locations) => {
          /* Example location returned
        {
          speed: -1,
          longitude: -0.1337,
          latitude: 51.50998,
          accuracy: 5,
          heading: -1,
          altitude: 0,
          altitudeAccuracy: -1
          floor: 0
          timestamp: 1446007304457.029,
          fromMockProvider: false
        }
        */

          setForm(
            `location`,
            `${locations[0].latitude} , ${locations[0].longitude}`,
          );
        },
      );
    }
  });

  return (
    <>
      <View style={styles.page}>
        <Header
          title="Add User"
          iconType="icon-only"
          onPress={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label="Full Name"
              value={form.fullname}
              onChangeText={(value) => setForm('fullname', value)}
            />
            <Gap height={24} />
            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.gender}
                onValueChange={(itemValue, itemIndex) =>
                  setForm('gender', itemValue)
                }>
                {genderCollection.map((genderCollection, index) => (
                  <Picker.Item
                    key={index}
                    label={genderCollection}
                    value={genderCollection}
                  />
                ))}
              </Picker>
            </View>
            <Gap height={24} />
            <Input
              label="Age"
              value={form.age}
              onChangeText={(value) => setForm('age', value)}
            />
            <Gap height={24} />
            <Text style={styles.label}>Status</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.status}
                onValueChange={(itemValue, itemIndex) =>
                  setForm('status', itemValue)
                }>
                {statusCollection.map((statusCollection, index) => (
                  <Picker.Item
                    key={index}
                    label={statusCollection}
                    value={statusCollection}
                  />
                ))}
              </Picker>
            </View>
            <Gap height={24} />
            <InputPhoto
              currentPhoto={uriPhoto}
              hasPhoto={hasPhoto}
              setHasPhoto={setHasPhoto}
              onPress={onUploadPhotoHandler}
            />
            <Gap height={24} />
            <Input
              label="Location (Latitude/Longitude) "
              value={form.location}
              onChangeText={(value) => setForm('location', value)}
            />
            <Gap height={40} />
            <Button title="Submit" onPress={onSubmitHandler} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  content: {padding: 40, paddingTop: 0},
  label: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginBottom: 6,
  },
  pickerWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});
