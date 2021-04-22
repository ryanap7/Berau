import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Row, Table as TableRN} from 'react-native-table-component';

const Table = ({dataHeader, data, dataWidth}) => {
  const [tableHead, setTableHead] = useState([]);
  const [widthArr, setWidthArr] = useState([160, 180]);
  const tableData = data;

  useEffect(() => {
    setTableHead(dataHeader);
    setWidthArr(dataWidth);
  }, [dataHeader, dataWidth]);

  if (tableHead.length > 0) {
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
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: '#CCCC'},
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </TableRN>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return <View style={styles.table} />;
  }
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
