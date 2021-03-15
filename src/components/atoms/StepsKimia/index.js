import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {useDispatch} from 'react-redux';
import {Gap, Select, TextInput} from '..';
import {storeChemical} from '../../../redux/action';
import {getData, useForm} from '../../../utils';

const StepsKimia = () => {
  // Initial State
  const [form, setForm] = useForm({
    wmp: '1',
    date_input: new Date(),
    periodical_input: '',
    time_input: new Date(),
    chemical: 'Kapur',
    purity: '',
    before: '',
    before_unit: 'L',
    current: '',
    current_unit: 'L',
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    getData('wmp').then((res) => {
      setForm('wmp', res);
    });
    getData('token').then((res) => {
      setToken(res.value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setForm('time_input', new Date(currentTime));
    setShowTime(false);
  };

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(storeChemical(form, token));
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
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.purity}
                      onChangeText={(value) => setForm('purity', value)}
                    />
                  </View>
                </View>
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
          previousBtnTextStyle={styles.previousText}>
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
                  <Gap width={16} />
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
                <Text style={styles.label}>Stock Saat Ini</Text>
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
                  <Gap width={16} />
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
    width: 100,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  previousButton: {
    backgroundColor: '#286090',
    width: 100,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previousText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 45,
    justifyContent: 'center',
  },
  containerLabel: {
    flex: 2,
    justifyContent: 'center',
  },
  containerInput: {
    flex: 3,
  },
  calendar: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingLeft: 11,
    marginLeft: 14,
    marginRight: -18,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  datePicker: {
    width: 200,
    marginLeft: 10,
  },
  containerTimeInput: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: -18,
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
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 5,
    padding: 20,
    marginBottom: 13,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelSummary: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#020202',
  },
  value: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#020202',
  },
});
