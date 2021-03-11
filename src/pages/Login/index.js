import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Circle1, Circle2, IcLogin, Logo} from '../../assets';
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
          <Image source={Logo} style={styles.logo} />
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
          <Gap height={20} />
          <Button text="LOGIN" onPress={onSubmit} icon={<IcLogin />} />
          <Gap height={20} />
        </View>
      </ScrollView>
      <View style={styles.version}>
        <Text style={styles.text}>Supported by SBU SERCO</Text>
      </View>
      <View style={styles.circle2}>
        <Circle2 />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  circle1: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  circle2: {
    flex: 1,
    alignItems: 'flex-end',
  },
  container: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginHorizontal: 40,
    marginTop: 30,
  },
  version: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#A3A3A3',
    position: 'absolute',
    top: 40,
  },
});
