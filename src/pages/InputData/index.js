import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcInputData} from '../../assets';
import {
  ButtonList,
  Gap,
  HeaderDetail,
  Select,
  Steps,
  StepsKimia,
  StepsPerbaikan,
} from '../../components';
import {getData, storeData} from '../../utils';

const InputData = ({navigation}) => {
  const [penugasan, setPenugasan] = useState('Area Tambang LMO');
  const [wmp, setWmp] = useState('1');
  const [stepper, setStepper] = useState('ATT');

  useEffect(() => {
    getData('tambang').then((res) => {
      setPenugasan(res.nama);
    });
  }, []);

  storeData('wmp', wmp);

  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={11} />
        <Select
          value={penugasan}
          type="Penugasan"
          onSelectChange={(value) => setPenugasan(value)}
          enabled={false}
        />
        <View style={styles.containerMenu}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menu}
            onPress={() => navigation.navigate('InputData')}>
            <IcInputData />
            <Text style={styles.menuText}>Input Data</Text>
          </TouchableOpacity>
          <View style={styles.wmp}>
            <Select
              value={wmp}
              type="WMP"
              onSelectChange={(value) => setWmp(value)}
            />
          </View>
        </View>
        {/* Content */}
        <View style={styles.contentMenu}>
          {stepper === 'ATT' ? (
            <ButtonList text="ATT" onPress={() => setStepper('ATT')} active />
          ) : (
            <ButtonList text="ATT" onPress={() => setStepper('ATT')} />
          )}
          {stepper === 'Bahan Kimia' ? (
            <ButtonList
              text="Bahan Kimia"
              onPress={() => setStepper('Bahan Kimia')}
              active
            />
          ) : (
            <ButtonList
              text="Bahan Kimia"
              onPress={() => setStepper('Bahan Kimia')}
            />
          )}
          {stepper === 'Perbaikan' ? (
            <ButtonList
              text="Perbaikan"
              onPress={() => setStepper('Perbaikan')}
              active
            />
          ) : (
            <ButtonList
              text="Perbaikan"
              onPress={() => setStepper('Perbaikan')}
            />
          )}
        </View>
        <View style={styles.containerSteps}>
          {stepper === 'ATT' && <Steps />}
          {stepper === 'Bahan Kimia' && <StepsKimia />}
          {stepper === 'Perbaikan' && <StepsPerbaikan />}
        </View>
      </ScrollView>
    </View>
  );
};

export default InputData;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerMenu: {
    flexDirection: 'row',
    paddingLeft: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  wmp: {
    flex: 1,
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#286090',
  },
  contentMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 56,
    marginTop: -10,
  },
  containerSteps: {
    flex: 1,
  },
});
