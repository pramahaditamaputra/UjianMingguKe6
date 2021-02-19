import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, ListReport, Loading} from '../../components';
import {colors} from '../../utils';
import {Fire} from '../../config';
import {IconAddPhoto} from '../../assets';
import {fonts} from '../../utils';

const UserList = ({navigation}) => {
  const [reports, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Fire.database()
      .ref('/reports/')
      .once('value')
      .then((snapshot) => {
        let tutorials = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var data = childSnapshot.val();
          tutorials.push({
            key: key,
            uid: data.uid,
            gender: data.gender,
            status: data.status,
            location: data.location,
            fullname: data.fullname,
            photo: data.photo,
            age: data.age,
          });
        });
        console.log(tutorials);
        setReport(tutorials);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <View style={styles.page}>
        <Header title="User List" />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {reports && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <Text style={{fontFamily: fonts.primary[600], fontSize: 15}}>
                {`${reports.length} User`}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateUser')}>
                <IconAddPhoto style={styles.addPhoto} />
              </TouchableOpacity>
            </View>
          )}
          {reports &&
            reports.map((report) => (
              <ListReport
                key={report.key}
                fullname={report.fullname}
                gender={report.gender}
                age={report.age}
                status={report.status}
                currentPhoto={report.photo}
                location={report.location}
                onPress={() =>
                  navigation.navigate('EditUser', {
                    uid: report.key,
                    fullName: report.fullname,
                    gender: report.gender,
                    age: report.age,
                    status: report.status,
                    currentPhoto: report.currentPhoto,
                    location: report.location,
                  })
                }
              />
            ))}
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
  },
});
