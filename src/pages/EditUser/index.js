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

const EditUser = ({navigation, route}) => {
  const [genderCollection] = useState(['- Select Gender -', 'Male', 'Female']);
  const [statusCollection] = useState([
    '- Select Status -',
    'Single',
    'Married',
  ]);

  const {uid, fullName, gender, age, status, location} = route.params;

  const [hasPhoto, setHasPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [uriPhoto, setUriPhoto] = useState(ILNullPhoto);

  const [form, setForm] = useForm({
    fullname: fullName,
    gender: gender,
    age: age,
    status: status,
    location: location,
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
      .ref(`reports/${uid}/`)
      .update(data, (error) => {
        if (error) {
          // The write failed...
          setLoading(false);
          showMessage({
            message: `Failed Update User Data!  `,
            description: `${error.message}`,
            type: 'danger',
          });
        } else {
          setLoading(false);
          // Data saved successfully!
          showMessage({
            message: `Update User Data Successfully!  `,
            description: `View Changes on User List`,
            type: 'success',
          });
          navigation.replace('MainApp');
        }
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header
          title="Edit User"
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

export default EditUser;

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
