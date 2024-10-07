/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  View,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: `/Roboto-Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `/Roboto-Regularttf`,
      fontWeight: "normal",
    },
  ],
});

interface PDFGenerateProps {
  data: {
    nombre: string;
    email: string;
    telefono: string;
    tipoCompra: string;
    metodoPago: string;
    tipoPago: string;
    asientos: string;
    sitioVenta: string;
    pago: string;
    plazo: string;
    localidad?: string;
    zona?: string;
    tipo?: string;
  };
}

export default function PDFGenerate({ data }: PDFGenerateProps) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
      padding: 15,
    },
    image: {
      width: "50%",
      aspectRatio: 936 / 631,
      margin: "auto",
    },
    title: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: 24,
      textAlign: "center",
      marginTop: 5,
    },
    subtitle: {
      fontSize: 8,
      textAlign: "center",
      marginTop: 5,
    },
    info: {
      flexDirection: "column",
      margin: 10,
      padding: 10,
      fontSize: 12,
    },
    label: {
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
    data: {
      marginBottom: 10,
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
      border: 2,
    },
  });

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <Image style={styles.image} src="/assets/logoLeones_1.png" />
        <Text style={styles.title}>Comprobante</Text>
        <View style={styles.container}>
          <View style={styles.info}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.data}>{data.nombre}</Text>
            <Text style={styles.label}>Correo</Text>
            <Text style={styles.data}>{data.email}</Text>
            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.data}>{data.telefono}</Text>
            <Text style={styles.label}>Asientos</Text>
            <Text style={styles.data}>{data.asientos}</Text>
            <Text style={styles.data}>
              Localidad:{data.localidad === "T" ? "TRIBUNA" : "CANCHA"}
            </Text>
            <Text style={styles.data}>Tipo:{data.tipo}</Text>
            <Text style={styles.data}>Zona:{data.zona}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Tipo de compra</Text>
            <Text style={styles.data}>
              {data.tipoCompra.charAt(0).toUpperCase() +
                data.tipoCompra.slice(1)}
            </Text>
            <Text style={styles.label}>Método de pago</Text>
            <Text style={styles.data}>
              {data.metodoPago.charAt(0).toUpperCase() +
                data.metodoPago.slice(1)}
            </Text>
            <Text style={styles.label}>Sitio de venta</Text>
            <Text style={styles.data}>{data.sitioVenta}</Text>
            <Text style={styles.label}>Pago</Text>
            <Text style={styles.data}>
              {data.pago === "1"
                ? "Efectivo"
                : data.pago === "2"
                ? "Transferencia"
                : data.pago === "3"
                ? "Tarjeta de crédito"
                : data.pago === "4"
                ? "Convenio instituciones"
                : "No"}
            </Text>
            {data.plazo && <Text style={styles.label}>Plazo</Text>}
            {data.plazo && <Text style={styles.data}>{data.plazo}</Text>}
          </View>
        </View>
        <Text style={styles.subtitle}>
          Fecha: {new Date().toLocaleDateString()}
        </Text>
        <Text style={styles.subtitle}>
          Hora: {new Date().toLocaleTimeString()}
        </Text>
        <Text style={styles.title}>¡Gracias por su compra!</Text>
      </Page>
    </Document>
  );
}

//  <SelectItem key={1}>Efectivo</SelectItem>
// <SelectItem key={2}>Transferencia</SelectItem>
{
  /* <SelectItem key={3}>
Tarjeta de crédito
</SelectItem>
<SelectItem key={4}>
Convenio instituciones
</SelectItem> */
}
