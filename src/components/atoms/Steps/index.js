import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {Gap, Select} from '../../../components';
import {showMessage, useForm} from '../../../utils';
import storage from '../../../utils/storage';

const Steps = () => {
  // Initial State
  const [form, setForm] = useForm({
    type: 'aat',
    wmp: '1',
    date_input: new Date(),
    periodical_input: 'Per Jam',
    time_input: new Date(),
    sampling_point: 'Sebelum titik Pengapuran',
    weather_condition: 'Cerah',
    PH: '',
    TSS: '',
    TSS_unit: 'mg/L',
    Fe: '-',
    Fe_unit: 'mg/L',
    Mn: '-',
    Mn_unit: 'mg/L',
    Debit: '',
    Debit_unit: 'm3/detik',
  });
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    storage
      .load({
        key: 'wmp',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((ret) => {
        setForm('wmp', ret);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.date_input;
    setForm('date_input', currentDate);
    setShow(false);
  };
  const onChangeTime = (event, selectedDate) => {
    const currentTime = selectedDate || form.time_input;
    setForm('time_input', currentTime);
    setShowTime(false);
  };

  const onNextStep = () => {
    if (
      form.PH.length > 0 &&
      form.TSS.length > 0 &&
      form.Fe.length > 0 &&
      form.Mn.length > 0 &&
      form.Debit.length > 0
    ) {
      setErrors(false);
    } else {
      setErrors(true);
      if (errors) {
        showMessage('Data belum lengkap, Silahkan cek kembali');
      }
    }
  };

  const onSubmit = () => {
    const day = new Date(form.time_input).getDate();
    const month = new Date(form.time_input).getMonth();
    const year = new Date(form.time_input).getFullYear();
    const hour = new Date(form.time_input).getHours();
    const minute = new Date(form.time_input).getMinutes();
    const second = new Date(form.time_input).getSeconds();
    const id = 'att' + day + month + year + hour + minute + second;

    storage.save({
      key: 'dataLocal',
      id: id,
      data: form,
    });
    showMessage('Data Berhasil disimpan ke LocalStorage', 'success');
  };

  return (
    <View style={styles.page}>
      <ProgressSteps
        completedProgressBarColor="#286090"
        activeStepIconColor="#286090"
        activeStepIconBorderColor="#286090"
        completedStepIconColor="#286090"
        activeLabelColor="#000000"
        activeStepNumColor="#FFFFFF"
        labelFontFamily="Poppins-Regular"
        labelFontSize={12}>
        <ProgressStep
          label="Description"
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.nextText}>
          <View style={styles.content}>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Gap height={10} />
                <Text style={styles.label}>Date Input</Text>
              </View>
              <TouchableOpacity
                style={styles.calendar}
                onPress={() => setShow(true)}>
                <Text>{Moment(form.date_input).format('DD-MM-YYYY')}</Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={form.date_input}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Gap height={20} />
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Periodical Input</Text>
              </View>
              <View style={styles.containerInput}>
                <Select
                  value={form.periodical_input}
                  type="Periodical"
                  onSelectChange={(value) => {
                    setForm('periodical_input', value);
                  }}
                />
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Gap height={10} />
                <Text style={styles.label}>Time Input</Text>
              </View>
              <TouchableOpacity
                style={styles.calendar}
                onPress={() => setShowTime(true)}>
                <Text>{Moment(form.time_input).format('H:mm')}</Text>
                {showTime && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={form.time_input}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Gap height={20} />
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Sampling Point</Text>
              </View>
              <View style={styles.containerInput}>
                <Select
                  value={form.sampling_point}
                  type="Sampling"
                  onSelectChange={(value) => setForm('sampling_point', value)}
                />
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Weather Condition</Text>
              </View>
              <View style={styles.containerInput}>
                <Select
                  value={form.weather_condition}
                  type="Weather"
                  onSelectChange={(value) =>
                    setForm('weather_condition', value)
                  }
                />
              </View>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Data"
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.nextText}
          previousBtnStyle={styles.previousButton}
          previousBtnTextStyle={styles.previousText}
          onNext={onNextStep}
          errors={errors}>
          <View style={styles.content}>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>pH</Text>
              </View>
              <View style={styles.containerInput}>
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.PH}
                      onChangeText={(value) => setForm('PH', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Gap height={10} />
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>TSS</Text>
              </View>
              <View style={styles.containerInput}>
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.TSS}
                      onChangeText={(value) => setForm('TSS', value)}
                    />
                  </View>
                  <Gap width={20} />
                  <View style={styles.rightContainer}>
                    <Gap height={12} />
                    <Select
                      value={form.TSS_unit}
                      type="TSS"
                      onSelectChange={(value) => setForm('TSS_unit', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Fe</Text>
              </View>
              <View style={styles.containerInput}>
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.Fe}
                      onChangeText={(value) => setForm('Fe', value)}
                    />
                  </View>
                  <Gap width={20} />
                  <View style={styles.rightContainer}>
                    <Gap height={12} />
                    <Select
                      value={form.Fe_unit}
                      type="Fe"
                      onSelectChange={(value) => setForm('Fe_unit', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Mn</Text>
              </View>
              <View style={styles.containerInput}>
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.Mn}
                      onChangeText={(value) => setForm('Mn', value)}
                    />
                  </View>
                  <Gap width={20} />
                  <View style={styles.rightContainer}>
                    <Gap height={12} />
                    <Select
                      value={form.Mn_unit}
                      type="Mn"
                      onSelectChange={(value) => setForm('Mn_unit', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Debit</Text>
              </View>
              <View style={styles.containerInput}>
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.Debit}
                      onChangeText={(value) => setForm('Debit', value)}
                    />
                  </View>
                  <Gap width={20} />
                  <View style={styles.rightContainer}>
                    <Gap height={12} />
                    <Select
                      value={form.Debit_unit}
                      type="Debit"
                      onSelectChange={(value) => setForm('Debit_unit', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Confirmation"
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.nextText}
          previousBtnStyle={styles.previousButton}
          previousBtnTextStyle={styles.previousText}
          onSubmit={onSubmit}>
          <View style={styles.contentSummary}>
            <View style={styles.card}>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>WMP</Text>
                <Text style={styles.value}>{form.wmp}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Date Input</Text>
                <Text style={styles.value}>
                  {Moment(form.date_input).format('DD-MM-YYYY')}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Periodical Input</Text>
                <Text style={styles.value}>{form.periodical_input}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Time Input</Text>
                <Text style={styles.value}>
                  {Moment(form.time_input).format('H:mm')}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Sampling Point</Text>
                <Text style={styles.value}>{form.sampling_point}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Weather Cond</Text>
                <Text style={styles.value}>{form.weather_condition}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>pH</Text>
                <Text style={styles.value}>{form.PH}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>TSS</Text>
                <Text style={styles.value}>
                  {form.TSS} {form.TSS_unit}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Fe</Text>
                <Text style={styles.value}>
                  {form.Fe === '-' ? '-' : form.Fe + ' ' + form.Fe_unit}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Mn</Text>
                <Text style={styles.value}>
                  {form.Mn === '-' ? '-' : form.Mn + ' ' + form.Mn_unit}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Debit</Text>
                <Text style={styles.value}>
                  {form.Debit} {form.Debit_unit}
                </Text>
              </View>
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default Steps;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  contentSummary: {
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#286090',
    width: normalize(100),
    height: normalize(45),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
  previousButton: {
    backgroundColor: '#286090',
    width: normalize(100),
    height: normalize(45),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  previousText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: normalize(45),
    justifyContent: 'center',
  },
  containerLabel: {
    flex: 2,
    justifyContent: 'center',
  },
  containerInput: {
    flex: 3,
    marginLeft: normalize(20),
  },
  calendar: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    paddingVertical: normalize(12),
    paddingLeft: normalize(11),
    marginLeft: normalize(14),
    marginRight: normalize(-18),
    height: normalize(40),
    marginBottom: normalize(-8),
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
  },
  datePicker: {
    width: normalize(200),
    marginLeft: normalize(10),
  },
  containerTimeInput: {
    flexDirection: 'row',
    marginLeft: normalize(12),
    marginRight: normalize(-18),
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    padding: normalize(8),
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    height: normalize(40),
  },
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 5,
    padding: normalize(20),
    marginBottom: normalize(13),
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelSummary: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(14),
    color: '#020202',
  },
  value: {
    fontFamily: 'Poppins-Light',
    fontSize: normalize(14),
    color: '#020202',
  },
});
