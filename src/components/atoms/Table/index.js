import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Table as TableRN, Row} from 'react-native-table-component';

const Table = () => {
  const [tableHead] = useState([
    'Bulan',
    'Data Pemakaan Kapur(ton)',
    'Data Pemakaian Kawas(ton)',
  ]);
  const [widthArr] = useState([100, 120, 120]);
  const tableData = [['1 Jan 2020', '0.10', '0.10']];
  return (
    <View style={styles.table}>
      <ScrollView horizontal={true}>
        <View>
          <TableRN borderStyle={styles.borderThead}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.thead}
              textStyle={styles.theadText}
            />
          </TableRN>
          <ScrollView>
            <TableRN borderStyle={styles.borderThead}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[styles.row, index % 2 && {backgroundColor: '#CCCC'}]}
                  textStyle={styles.text}
                />
              ))}
            </TableRN>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
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
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
});
