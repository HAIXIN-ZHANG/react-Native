import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Dimensions,
  Button,
  TextInput,
  Pressable,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors, sizes, fonts} from '../data/theme';

const {width, height} = Dimensions.get('window');

function ProfilePage({navigation}) {
  const [photo, setPhoto] = useState({});
  const [text, setText] = useState('Enter Your name');

  async function handleChangePress() {
    const result = await launchImageLibrary();
    if (typeof result.assets[0] === 'object') {
      setPhoto(result.assets[0]);
    }
  }

  function handleChangeText(text) {
    setText(text);
  }
  const hasPhoto = !!photo?.uri;
  function Photo(props) {
    if (hasPhoto) {
      return (
        <View
          style={{
            margin: sizes.padding,
            width: width - 44,
            height: height / 2,
            borderStyle: 'dotted',
            borderWidth: 3,
            borderColor: colors.purpleColorLighter,
          }}>
          <Image
            resizeMode="cover"
            source={{
              uri: photo?.uri,
              width: width - 51,
              height: height / 2 - 8,
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            margin: sizes.padding,
            width: width - 44,
            height: height / 2,
            borderStyle: 'dotted',
            borderWidth: 3,
            borderColor: colors.purpleColorLighter,
          }}></View>
      );
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View>
        <View>
          <Text
            style={{
              ...fonts.body1,
              padding: sizes.padding,
              fontWeight: '700',
              color: colors.purpleColorLighter,
            }}>
            Edit Profile
          </Text>
          <Text
            style={{
              ...fonts.body3,
              paddingLeft: 22,
              color: colors.purpleColorLighter,
            }}>
            Mirror, Mirror On The Wall...
          </Text>
        </View>

        <Photo />
        <Pressable
          onPress={handleChangePress}
          style={{
            width: 100,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.purpleColorLighter,
            borderRadius: 8,
            position: 'absolute',
            top: height / 1.8,
            left: width / 2.7,
          }}>
          <Text
            style={{
              color: '#ffffff',
              ...fonts.body4,
              fontWeight: '600',
            }}>
            {!hasPhoto ? 'Add photo' : 'Change Photo'}
          </Text>
        </Pressable>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.purpleColorLighter,
            borderRadius: 5,
            marginLeft: 22,
            marginRight: 22,
            height: 40,
          }}>
          <TextInput value={text} onChangeText={handleChangeText} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ProfilePage;
