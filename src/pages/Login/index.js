import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import {Circle1, IcLogin, Logo} from '../../assets';
import {Button, Gap, TextInput} from '../../components';
import {signInAction} from '../../redux/action/auth';
import {useForm} from '../../utils';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(signInAction(form, navigation));
  };
  return (
    <View style={styles.page}>
      <View styles={styles.circle1}>
        <Circle1 />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={Logo} />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Username or Email"
              value={form.email}
              onChangeText={(value) => setForm('email', value)}
            />
            <Gap height={20} />
            <TextInput
              placeholder="Password"
              value={form.password}
              onChangeText={(value) => setForm('password', value)}
              secureTextEntry
            />
            <Gap height={40} />
            <Button text="LOGIN" onPress={onSubmit} icon={<IcLogin />} />
            <Gap height={20} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  circle1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: normalize(40),
    marginTop: normalize(56),
  },
  circle2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  input: {
    marginHorizontal: normalize(69),
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(12),
    color: '#A3A3A3',
  },
});
