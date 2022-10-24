import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Dimensions,
  Button,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

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
        <View>
          <Image
            resizeMode="cover"
            source={{uri: photo?.uri, width, height: height / 2}}
          />
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View>
        <View>
          <Text>Edit Profile</Text>
          <Text>Mirror, Mirror On The Wall...</Text>
        </View>

        <Photo />
        <View>
          <Button
            onPress={handleChangePress}
            title={hasPhoto ? 'Add Photo' : 'Change Photo'}
          />
        </View>
        <View>
          <TextInput value={text} onChangeText={handleChangeText} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ProfilePage;
