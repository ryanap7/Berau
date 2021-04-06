import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {Gap, Select, TextInput} from '..';
import {showMessage, useForm} from '../../../utils';
import storage from '../../../utils/storage';

const StepsKimia = () => {
  // Initial State
  const [form, setForm] = useForm({
    wmp: '1',
    date_input: new Date(),
    periodical_input: 'Per Jam',
    time_input: new Date(),
    chemical: 'Kapur',
    purity: '',
    before: '',
    before_unit: 'L',
    current: '',
    current_unit: 'L',
  });

  const [isValid, setIsValid] = useState(false);
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

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || form.date_input;
    setForm('date_input', currentDate);
    setShow(false);
  };
  const onChangeTime = (selectedDate) => {
    const currentTime = selectedDate || form.time_input;
    setForm('time_input', new Date(currentTime));
    setShowTime(false);
  };

  const onNextStep1 = () => {
    if (form.purity.length > 0) {
      setIsValid(true);
      setErrors(false);
    } else {
      if (!isValid) {
        setErrors(true);
      } else {
        setErrors(false);
      }
      if (errors) {
        showMessage('Data belum lengkap, Silahkan cek kembali');
      }
    }
  };

  const onNextStep2 = () => {
    if (form.before.length > 0 && form.current.length > 0) {
      setErrors(false);
    } else {
      setErrors(true);
      if (errors) {
        showMessage('Data belum lengkap, Silahkan cek kembali');
      }
    }
    console.log('before', form.before.length);
    console.log('Error', errors);
  };

  const onSubmit = () => {};
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
          nextBtnTextStyle={styles.nextText}
          onNext={onNextStep1}
          errors={errors}>
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
                <Text style={styles.label}>Chemical</Text>
              </View>
              <View style={styles.containerInput}>
                <Select
                  value={form.chemical}
                  type="Chemical"
                  onSelectChange={(value) => setForm('chemical', value)}
                />
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>% Purity</Text>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Input"
                  value={form.purity}
                  onChangeText={(value) => setForm('purity', value)}
                />
              </View>
            </View>
            <Gap height={15} />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Data"
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.nextText}
          previousBtnStyle={styles.previousButton}
          previousBtnTextStyle={styles.previousText}
          onNext={onNextStep2}
          errors={errors}>
          <View style={styles.content}>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Stock Shift Sebelumnya</Text>
              </View>
              <View style={styles.containerInput}>
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.before}
                      onChangeText={(value) => setForm('before', value)}
                    />
                  </View>
                  <Gap width={20} />
                  <View style={styles.rightContainer}>
                    <Gap height={12} />
                    <Select
                      value={form.before_unit}
                      type="Before"
                      onSelectChange={(value) => setForm('before_unit', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Stock Berjalan</Text>
              </View>
              <View style={styles.containerInput}>
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.current}
                      onChangeText={(value) => setForm('current', value)}
                    />
                  </View>
                  <Gap width={20} />
                  <View style={styles.rightContainer}>
                    <Gap height={12} />
                    <Select
                      value={form.current_unit}
                      type="Current"
                      onSelectChange={(value) => setForm('current_unit', value)}
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
                <Text style={styles.labelSummary}>Chemical</Text>
                <Text style={styles.value}>{form.chemical}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>% Purity</Text>
                <Text style={styles.value}>{form.purity}</Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Stock Shift Sblm</Text>
                <Text style={styles.value}>
                  {form.before} {form.before_unit}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Stock Saat Ini</Text>
                <Text style={styles.value}>
                  {form.current} {form.current_unit}
                </Text>
              </View>
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default StepsKimia;

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
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    padding: normalize(8),
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    marginRight: normalize(-20),
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
