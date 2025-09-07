import {
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import { Service } from "@/pages";

Font.register({
  family: "Montserrat",
  src: "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Montserrat",
    paddingTop: "32px",
    paddingBottom: "12px",
    flexDirection: "column",
    backgroundColor: "#000",
    color: "#fff",
    alignItems: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    width: "auto",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#eee",
    padding: 4,
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 4,
  },
});

type TemplateProps = {
  data: Service[];
};
function TableRow(props: React.PropsWithChildren) {
  return (
    <View
      style={{
        height: "80px",
        width: "80%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {props.children}
    </View>
  );
}
type CellProps = {
  text: string;
  width: string;
};
function TableCell(props: CellProps) {
  const { text, width } = props;

  return (
    <View
      style={{
        justifyContent: "center",
        border: "1px solid white",
        width: width,
      }}
    >
      <Text
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </View>
  );
}

function calculateBruttoPrice(p: string) {
  return (+p * 1.23).toString() + " " + " pln";
}

function PdfTemplate(props: TemplateProps) {
  const { data } = props;

  console.log("@@@", data);

  return (
    <Document pageLayout="singlePage" pageMode="fullScreen">
      <Page orientation="landscape" size="A4" style={styles.page}>
        <TableRow>
          <TableCell text="Lp" width="5%" />
          <TableCell text="Usluga" width="60%" />
          <TableCell text="Cena netto" width="17.5%" />
          <TableCell text="Cena brutto" width="17.5%" />
        </TableRow>
        <View>
          {data.map((r, i) => {
            return (
              <TableRow key={i}>
                <TableCell text={(i + 1).toString()} width="5%" />
                <TableCell text={r.serviceName} width="60%" />
                <TableCell text={r.price + " " + "pln"} width="17.5%" />
                <TableCell text={calculateBruttoPrice(r.price)} width="17.5%" />
              </TableRow>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

export { PdfTemplate };
