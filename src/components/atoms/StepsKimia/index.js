import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {
  ChemicalData,
  ChemicalDescription,
  ChemicalSummary,
} from '../../molecules';

const StepsKimia = () => {
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
            <ChemicalDescription />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Data"
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.nextText}
          previousBtnStyle={styles.previousButton}
          previousBtnTextStyle={styles.previousText}>
          <View style={styles.content}>
            <ChemicalData />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Confirmation"
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.nextText}
          previousBtnStyle={styles.previousButton}
          previousBtnTextStyle={styles.previousText}>
          <View style={styles.contentSummary}>
            <ChemicalSummary />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default StepsKimia;

const styles = StyleSheet.create({
  container: {
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
});
