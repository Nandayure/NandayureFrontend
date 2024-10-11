/* eslint-disable jsx-a11y/alt-text */
'use client';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Document,
  Page,
  PDFViewer,
} from '@react-pdf/renderer';
import { notFound } from 'next/navigation';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import logo from '@/assets/logoNanda.jpg';
import { useGetPaySlipTemplate } from '@/hooks';

// Componente para las líneas horizontales
interface HorizontalLineProps {
  width: string;
  spaceWidth: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({ width, spaceWidth }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View
      style={{
        ...styles.horizontalLine,
        width: width,
        borderBottomColor: '#4caf50',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLine,
        width: width,
        borderBottomColor: '#e4df5e',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLine,
        width: width,
        borderBottomColor: '#2196f3',
      }}
    />
  </View>
);

const HorizontalLineFooter: React.FC<HorizontalLineProps> = ({ width, spaceWidth }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
    <View
      style={{
        ...styles.horizontalLineFooter,
        width: width,
        borderBottomColor: '#4caf50',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLineFooter,
        width: width,
        borderBottomColor: '#e4df5e',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLineFooter,
        width: width,
        borderBottomColor: '#2196f3',
      }}
    />
  </View>
);


const PaySlipTemplate = ({ id }: { id: string }) => {
  const { PaySlipInfo, isLoading, isError } =
    useGetPaySlipTemplate({ id });

  if (isLoading) {
    return <SkeletonLoader className="w-full h-screen" />;
  }

  if (isError || !PaySlipInfo || PaySlipInfo.id !== id) {
    return notFound();
  }

  return (
    <div>
      <PDFViewer width="100%" height="600">
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Image style={styles.logo} src={logo.src} />
              <View style={styles.tituloContainer}>
                <Text style={styles.titulo}>Municipalidad de Nandayure</Text>
                <Text style={styles.subtitulo}>Boleta de Pago</Text>
              </View>
            </View>

            <HorizontalLine width="100%" spaceWidth="0%" />

            {/* Datos del funcionario */}
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Nombre del Funcionario:</Text>
              <Text style={styles.fieldValue}>{PaySlipInfo.funcionario}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Puesto:</Text>
              <Text style={styles.fieldValue}>{PaySlipInfo.puesto}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Categoría de Puesto:</Text>
              <Text style={styles.fieldValue}>{PaySlipInfo.categoriaPuesto}</Text>
            </View>

            {/* Tabla de salarios */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeaderSalario}>Salario base</Text>
                <Text style={styles.tableColHeaderSalario}>Anualidades</Text>
                <Text style={styles.tableColHeaderSalario}>Horas Extras</Text>
                <Text style={styles.tableColHeaderSalario}>Dedicación</Text>
                <Text style={styles.tableColHeaderSalario}>Prohibición</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColSalario}>{PaySlipInfo.salarioBase}</Text>
                <Text style={styles.tableColSalario}>{PaySlipInfo.anualidades}</Text>
                <Text style={styles.tableColSalario}>{PaySlipInfo.horasExtras}</Text>
                <Text style={styles.tableColSalario}>{PaySlipInfo.dedicacion}</Text>
                <Text style={styles.tableColSalario}>{PaySlipInfo.prohibicion}</Text>
              </View>
            </View>

            {/* Total devengado */}
            <View style={styles.devengadoSection}>
              <Text style={styles.tableColHeaderDevengado}>Total Devengado:</Text>
              <Text style={styles.tableColDevengado}>{PaySlipInfo.totalDevengado}</Text>
            </View>

            {/* Deducciones y observaciones */}
            <View style={styles.contentWrapper}>
              <View style={styles.deduccion}>
                <Text style={styles.deduccionText}>Deducciones:</Text>
                <Text style={styles.deduccionText}>Seguro (10,67%): {PaySlipInfo.deducciones?.seguro || 0}</Text>
                <Text style={styles.deduccionText}>Tributación: {PaySlipInfo.deducciones?.tributacion || 0}</Text>
                <Text style={styles.deduccionText}>Coopeservidores: {PaySlipInfo.deducciones?.coopeservidores || 0}</Text>
                <Text style={styles.deduccionText}>Coopealianza: {PaySlipInfo.deducciones?.coopealianza || 0}</Text>
                <Text style={styles.deduccionText}>Servicoop: {PaySlipInfo.deducciones?.servicoop || 0}</Text>
                <Text style={styles.deduccionText}>Coope-Ande: {PaySlipInfo.deducciones?.coopeAnde || 0}</Text>
                <Text style={styles.deduccionText}>ASEMUNA (5%): {PaySlipInfo.deducciones?.asemuna || 0}</Text>
                <Text style={styles.deduccionText}>Embargos: {PaySlipInfo.deducciones?.embargos || 0}</Text>
                <Text style={styles.deduccionText}>Pensión: {PaySlipInfo.deducciones?.pension || 0}</Text>
                <Text style={styles.deduccionText}>Funerales vida: {PaySlipInfo.deducciones?.funeralesVida || 0}</Text>
                <Text style={styles.deduccionText}>SITRAMUNA: {PaySlipInfo.deducciones?.sitramuna || 0}</Text>
                <Text style={styles.deduccionText}>ANEP: {PaySlipInfo.deducciones?.anep || 0}</Text>
                <Text style={styles.deduccionText}>INS: {PaySlipInfo.deducciones?.ins || 0}</Text>
                <Text style={styles.deduccionText}>Total de Deducciones: {PaySlipInfo.totalDeducciones || 0}</Text>
              </View>
              <View style={styles.observacion}>
                <Text style={styles.observaciontitulo}>Observaciones:</Text>
                <Text style={styles.deduccionText}>{PaySlipInfo.observaciones || 'Ninguna'}</Text>
              </View>
            </View>

            {/* Neto a Pagar */}
            <View style={styles.devengadoSection}>
              <Text style={styles.tableColHeaderDevengado}>Neto a Pagar:</Text>
              <Text style={styles.tableColDevengado}>{PaySlipInfo.netoAPagar}</Text>
            </View>

            <HorizontalLineFooter width="50%" spaceWidth="0%" />

            {/* Footer */}
            <View style={styles.footer}>
              <Text>Depto. Recursos Humanos</Text>
              <Text>Municipalidad de Nandayure</Text>
              <Text>Encargada: Licda. Yeilin Arias Rojas</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PaySlipTemplate;

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  tituloContainer: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    borderRightWidth: 1,
    width: '50%',
    borderRightColor: '#000',
    paddingRight: 3,
  },
  fieldValue: {
    fontSize: 12,
    paddingLeft: 3,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px 0',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
    marginBottom: 3,
  },
  tableColHeaderSalario: {
    width: '50%',
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    textAlign: 'center',
  },
  tableColSalario: {
    width: '50%',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    textAlign: 'center',
  },
  devengadoSection: {
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 5,
  },
  deduccion: {
    width: '73%',
    border: '1px solid #000',
    padding: 5,
  },
  deduccionText: {
    fontSize: 12, // Tamaño de letra reducido para deducciones
  },
  observacion: {
    width: '27%',
    padding: 5,
    border: '1px solid #000',
  },
  deducciontitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  observaciontitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  tableColHeader: {
    width: '50%', // ajusta el tamaño según lo necesario
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', // centrado del texto
  },
  tableCol: {
    width: '50%', // ajusta el tamaño según lo necesario
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', // centrado del texto
  }, 
  tableColDevengado: {
    width: '50%', 
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', 
  },
  tableColHeaderDevengado: {
    width: '50%', 
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', 
  },
  horizontalLine: {
    borderBottomWidth: 2,
    marginVertical: 0,
  },
  horizontalLineFooter: {
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: '#000',
    marginVertical: 5,
  },
});
