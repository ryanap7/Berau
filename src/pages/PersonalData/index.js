import React, {useState} from 'react';
import {View} from 'react-native';
import {Gap, HeaderDetail, Select} from '../../components';

const PersonalData = ({navigation}) => {
  const [jabatan, setJabatan] = useState('Operator');
  return (
    <View>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={11} />
      <Select
        label="Jabatan"
        value={jabatan}
        type="Jabatan"
        onSelectChange={(value) => setJabatan(value)}
      />
    </View>
  );
};

export default PersonalData;
