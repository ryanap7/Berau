import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Row, Table} from 'react-native-table-component';
import {
  Company,
  IcBack,
  IcBackHome,
  IcKPI,
  IcLaporan,
  IcPenugasan,
  IcPersonalData,
} from '../../assets';
import {Gap, HeaderCompany} from '../../components';

const HomeCompany = ({navigation}) => {
  const [tableHead] = useState([
    'Bulan',
    'Total Kapur(ton)',
    'Total Kawas(ton)',
    'Total Chemical',
  ]);
  const [widthArr] = useState([80, 80, 80, 80]);
  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View style={styles.button}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <IcBack />
          </TouchableOpacity>
          <Gap width={20} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MainApp')}>
            <IcBackHome />
          </TouchableOpacity>
        </View>
        <HeaderCompany
          onPress={() => navigation.navigate('ProfileCompany')}
          title="PT BERAU COAL"
          address="Jl. Pemuda, No. 40, Tanjungredeb, Tj. Redeb, Berau, Kabupaten Berau, Kalimantan Timur 77311"
          phone="(0554) 23400"
          profile={Company}
        />
      </View>
      <View style={styles.containerMenu}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menu}
          onPress={() => navigation.navigate('PersonalData')}>
          <IcPersonalData />
          <Text style={styles.menuText}>Personal Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menu}
          onPress={() => navigation.navigate('Penugasan')}>
          <IcPenugasan />
          <Text style={styles.menuText}>Penugasan</Text>
        </TouchableOpacity>
        <View style={styles.menu}>
          <IcLaporan />
          <Text style={styles.menuText}>Pelaporan</Text>
        </View>
        <View style={styles.menu}>
          <IcKPI />
          <Text style={styles.menuText}>KPI</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Rekapitulasi Data Tahun Berjalan</Text>
        <Text style={styles.location}>Lokasi : LMO</Text>
        <View style={styles.table}>
          {/* Table */}
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={styles.borderThead}>
                <Row
                  data={tableHead}
                  widthArr={widthArr}
                  style={styles.thead}
                  textStyle={styles.theadText}
                />
              </Table>
              <ScrollView>
                <Table borderStyle={styles.borderThead}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[
                        styles.row,
                        index % 2 && {backgroundColor: '#CCCC'},
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text style={styles.text}>Performance Summary</Text>
        <View style={styles.footer}>
          <View style={styles.footerCard}>
            <Text style={styles.footerText}>Golden Rules</Text>
            <Text style={styles.footerCount}>0</Text>
          </View>
          <View style={styles.footerCard}>
            <Text style={styles.footerText}>Major</Text>
            <Text style={styles.footerText}>Injury</Text>
            <Text style={styles.footerCount}>0</Text>
          </View>
          <View style={styles.footerCard}>
            <Text style={styles.footerText}>Fatality Incident</Text>
            <Text style={styles.footerCount}>0</Text>
          </View>
          <View style={styles.footerCard}>
            <Text style={styles.footerText}>Fatal Enviro Incident</Text>
            <Text style={styles.footerCount}>0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeCompany;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#286090',
  },
  button: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  containerMenu: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    padding: 20,
    marginHorizontal: 11,
    marginTop: 11,
    justifyContent: 'space-between',
    paddingHorizontal: 45,
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
  content: {
    height: 330,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    padding: 20,
    marginHorizontal: 11,
    marginTop: 11,
  },
  table: {
    flex: 1,
    marginTop: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thead: {
    height: 50,
    backgroundColor: '#4472C4',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
  borderThead: {
    borderWidth: 1,
    borderColor: '#FFF',
  },
  row: {height: 40, backgroundColor: '#E7E6E1'},
  theadText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  containerFooter: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    padding: 20,
    marginHorizontal: 11,
    marginTop: 11,
    marginBottom: 20,
    paddingHorizontal: 45,
  },
  footer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerCard: {
    backgroundColor: '#FF3A3A',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 5,
    width: 70,
    height: 60,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  footerCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
