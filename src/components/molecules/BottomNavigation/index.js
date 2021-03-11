import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  IcCompany,
  IcCompanyActive,
  IcHome,
  IcHomeActive,
  IcInfo,
  IcInfoActive,
  IcProfile,
  IcProfileActive,
} from '../../../assets';

const Icon = ({label, active}) => {
  switch (label) {
    case 'Home':
      return active ? <IcHomeActive /> : <IcHome />;
    case 'Company':
      return active ? <IcCompanyActive /> : <IcCompany />;
    case 'Info':
      return active ? <IcInfoActive /> : <IcInfo />;
    case 'Profile':
      return active ? <IcProfileActive /> : <IcProfile />;

    default:
      <IcHome />;
  }
  return <IcHome />;
};

const BottomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.menu}>
            <Icon label={label} active={isFocused} />
            {isFocused && <Text style={styles.text(isFocused)}>{label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingBottom: 13,
    paddingTop: 13,
    paddingHorizontal: 30,
    paddingLeft: 40,
  },
  text: (isFocused) => ({
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#286090',
    paddingTop: isFocused ? 5 : 0,
  }),
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
