import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {
  PerbaikanData,
  PerbaikanDescription,
  PerbaikanSummary,
} from '../../molecules';

const StepsPerbaikan = () => {
  return (
    <View style={styles.container}>
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
            <PerbaikanDescription />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Data"
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.nextText}
          previousBtnStyle={styles.previousButton}
          previousBtnTextStyle={styles.previousText}>
          <View style={styles.content}>
            <PerbaikanData />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Confirmation"
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.nextText}
          previousBtnStyle={styles.previousButton}
          previousBtnTextStyle={styles.previousText}>
          <PerbaikanSummary />
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default StepsPerbaikan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  card: {
    width: '75%',
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
    marginHorizontal: 45,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  label: {
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
