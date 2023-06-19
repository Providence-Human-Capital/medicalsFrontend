import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  logo: {
    position: "relative",
    top: 10,

    width: 100,
    height: 50,
  },
  address: {
    position: "absolute",
    top: 50,
    right: 40,
    fontSize: 12,
    textAlign: "right",
    paddingBottom: "2rem",
  },
  date: {
    position: "absolute",
    top: 70,
    right: 40,
    fontSize: 12,
    textAlign: "right",
  },
  title: {
    fontSize: 24,
    textAlign: "left",
    marginVertical: 20,
    fontFamily: "Oswald",
  },
  description: {
    fontSize: 14,
    textAlign: "justify",
    marginBottom: 20,
    fontFamily: "Times-Roman",
  },
  table: {
    marginVertical: 10,
    width: "100%",
  },
  tableHeader: {
    backgroundColor: "#eeeeee",
    fontSize: 12,
    marginBottom: 6,
    flexDirection: "row",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 6,
  },

  row1: {
    width: "25%",
  },
  row2: {
    width: "25%",
  },
  row3: {
    width: "25%",
  },
  row4: {
    width: "25%",
  },
  row5: {
    width: "27%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
  },
});
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});
const ReportDocument = ({ singleReport }) => (
  <Document>
    <Page style={styles.body}>
      <Image style={styles.logo} src="/assets/images/providence.png" />
      <Text style={styles.address}>
        PROVIDENCE HEALTH CENTRE
        <br />
        52 BAINES AVENUE
      </Text>
      {/* <Text style={styles.address}>52 BAINES AVENUE</Text> */}
      {/* <Text style={styles.address}>3RD FLOOR SUITE 32 </Text> */}
      <Text style={styles.date}>Date: August 16, 2023</Text>
      <Text style={styles.title}>Medicals Daily Report</Text>
      <Text style={styles.description}>
        This report contains the medicals done on Thursday, August 16, 2023.
        Below are the categories and patients who belong to each category:
      </Text>
      <View style={styles.table}>
        <View style={[styles.row, styles.bold, styles.header]}>
          <Text style={styles.row1}>DATE</Text>
          <Text style={styles.row2}>Pneumoconiosis</Text>
          <Text style={styles.row3}>City Of Harare</Text>
          <Text style={styles.row4}>Industries & Other</Text>
        </View>
      </View>
    </Page>
  </Document>
);
export default ReportDocument;
