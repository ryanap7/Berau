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
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {useDispatch} from 'react-redux';
import {Gap, Select} from '../../../components';
import {storeAtt} from '../../../redux/action/assignment';
import {getData, useForm} from '../../../utils';

const Steps = () => {
  // Initial State
  const [form, setForm] = useForm({
    wmp: '1',
    date_input: new Date(),
    periodical_input: '',
    time_input: new Date(),
    sampling_point: '',
    weather_condition: 'Cerah',
    PH: '',
    TSS: '',
    TSS_unit: 'mg/L',
    Fe: '',
    Fe_unit: 'mg/L',
    Mn: '',
    Mn_unit: 'mg/L',
    Debit: '',
    Debit_unit: 'm3/detik',
    ChemDose: '',
    ChemDose_unit: 'mg/L',
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    // getData('wmp').then((res) => {
    //   setForm('wmp', res);
    // });
    getData('token').then((res) => {
      setToken(res.value);
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
    setForm('time_input', new Date(currentTime));
    setShowTime(false);
  };

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(storeAtt(form, token));
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
            {/* <ATTDescription /> */}
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
            <Gap height={10} />
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
          previousBtnTextStyle={styles.previousText}>
          <View style={styles.content}>
            {/* <ATTData /> */}
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>PH</Text>
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
                  <Gap width={16} />
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
                  <Gap width={16} />
                  <View style={styles.rightContainer}>
                    <Gap height={12} />
                    <Select
                      value={form.Fe}
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
                  <Gap width={16} />
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
                  <Gap width={16} />
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
            <View style={styles.container}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>Chem. Dose</Text>
              </View>
              <View style={styles.containerInput}>
                <View style={styles.containerTimeInput}>
                  <View style={styles.leftContainer}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="Input"
                      value={form.ChemDose}
                      onChangeText={(value) => setForm('ChemDose', value)}
                    />
                  </View>
                  <Gap width={16} />
                  <View style={styles.rightContainer}>
                    <Gap height={12} />
                    <Select
                      value={form.ChemDose_unit}
                      type="Dose"
                      onSelectChange={(value) =>
                        setForm('ChemDose_unit', value)
                      }
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
            {/* <ATTSummary /> */}
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
                  {form.Fe} {form.Fe_unit}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Mn</Text>
                <Text style={styles.value}>
                  {form.Mn} {form.Mn_unit}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Debit</Text>
                <Text style={styles.value}>
                  {form.Debit} {form.Debit_unit}
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.labelSummary}>Chem. Dose</Text>
                <Text style={styles.value}>
                  {form.ChemDose} {form.ChemDose_unit}
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
    width: '90%',
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
