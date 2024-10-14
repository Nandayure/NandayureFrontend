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
import useGetSalaryCertificateTemplate from '@/hooks/templates/salary-certificate/useSalaryCertificateTemplates';
import { notFound } from 'next/navigation';
import logo from '@/assets/logoNanda.jpg';
import SkeletonLoader from '@/components/ui/skeleton-loader';

interface HorizontalLineProps {
  width: string;
  spaceWidth: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({
  width,
  spaceWidth,
}) => (
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

const HorizontalLine2: React.FC<HorizontalLineProps> = ({
  width,
  spaceWidth,
}) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 190 }}>
    <View
      style={{
        ...styles.horizontalLine2,
        width: width,
        borderBottomColor: '#4caf50',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLine2,
        width: width,
        borderBottomColor: '#e4df5e',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLine2,
        width: width,
        borderBottomColor: '#2196f3',
      }}
    />
  </View>
);

const HorizontalLineFooter: React.FC<HorizontalLineProps> = ({
  width,
  spaceWidth,
}) => (
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

const SalaryCertificateTemplate = ({ id }: { id: string }) => {
  const { SalaryCertificateInfo, isLoading, isError } =
    useGetSalaryCertificateTemplate({ id });

  if (isLoading) {
    return <SkeletonLoader className="w-full h-screen" />;
  }

  if (isError || !SalaryCertificateInfo || SalaryCertificateInfo.id !== id) {
    return notFound();
  }

  return (
    <div>
      <PDFViewer width="100%" height="600">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Image style={styles.logo} src={logo.src} />
              <View style={styles.tituloContainer}>
                <Text style={[styles.titulo, styles.boldText]}>
                  Municipalidad de Nandayure
                </Text>
                <Text style={[styles.subtitulo, styles.boldText]}>
                  VICEALCALDÍA MUNICIPAL
                </Text>
              </View>
            </View>

            <HorizontalLine width="100%" spaceWidth="0%" />

            <View style={styles.section}>
              <Text style={[styles.subtitulo, styles.boldText]}>
                CONSTANCIA DE SALARIO
              </Text>
              <Text style={styles.body}>
                La suscrita Cinthya Vanessa Núñez Abarca, Vice Alcaldesa de la
                Municipalidad de Nandayure, hace constar que el señor(a):{' '}
                <Text style={styles.boldText}>
                  {SalaryCertificateInfo?.name}
                </Text>
                , Cédula de identidad número{' '}
                <Text style={styles.boldText}>
                  {SalaryCertificateInfo?.idCard}
                </Text>
                , labora en la{' '}
                <Text style={styles.boldText}>MUNICIPALIDAD DE NANDAYURE</Text>,
                ocupando el puesto de{' '}
                <Text style={styles.boldText}>
                  {SalaryCertificateInfo?.position}
                </Text>
                , la cual se encuentra nombrada en propiedad a partir del{' '}
                {SalaryCertificateInfo?.startDate}, por lo que ahora obtiene un
                salario mensual bruto desglosado de la siguiente manera:
              </Text>

              <View style={styles.containerCenter}>
                <View style={styles.breakdownContainer}>
                  {/* Sección con fondo amarillo */}
                  <View style={[styles.breakdownRow, styles.yellowBackground]}>
                    <Text>SALARIO BRUTO fijo:</Text>
                    <Text>¢{SalaryCertificateInfo?.grossSalary}</Text>
                  </View>
                  <View style={[styles.breakdownRow, styles.yellowBackground]}>
                    <Text>CCSS 9,67%:</Text>
                    <Text>¢{SalaryCertificateInfo?.deductions?.ccss}</Text>
                  </View>
                  <View style={[styles.breakdownRow, styles.yellowBackground]}>
                    <Text>BANCO POPULAR 1%:</Text>
                    <Text>
                      ¢{SalaryCertificateInfo?.deductions?.bancoPopular}
                    </Text>
                  </View>
                  <View style={styles.breakdownRow}>
                    <Text>TRIBUTACIÓN Código Trabajo:</Text>
                    <Text>¢{SalaryCertificateInfo?.deductions?.tax}</Text>
                  </View>
                  {/* Sección con fondo rojo */}
                  <View style={[styles.breakdownRow, styles.redBackground]}>
                    <Text>COOPEANDE Opcional:</Text>
                    <Text>¢{SalaryCertificateInfo?.deductions?.coopeAnde}</Text>
                  </View>
                  <View style={[styles.breakdownRow, styles.redBackground]}>
                    <Text>ASEMUNA 3%:</Text>
                    <Text>¢{SalaryCertificateInfo?.deductions?.asemuna}</Text>
                  </View>
                  <View style={[styles.breakdownRow, styles.redBackground]}>
                    <Text>FUNERALES:</Text>
                    <Text>
                      ¢{' '}
                      {SalaryCertificateInfo?.deductions?.lifeFuneralInsurance}
                    </Text>
                  </View>
                  <View style={[styles.breakdownRow, styles.redBackground]}>
                    <Text>SERVICOOP:</Text>
                    <Text>¢{SalaryCertificateInfo?.deductions?.servicoop}</Text>
                  </View>

                  {/* Espacio y salario neto */}
                  <View style={styles.emptySpace} />
                  <View style={[styles.breakdownRow, styles.lastRow]}>
                    <Text>SALARIO NETO:</Text>
                    <Text>¢{SalaryCertificateInfo?.netSalary}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.body}>
                Quedándole un salario mensual neto de ¢
                {SalaryCertificateInfo?.netSalary}
                (Novecientos cuarenta mil seiscientos cincuenta y seis colones
                92/100), el que se encuentra libre de embargos.
              </Text>

              <Text style={styles.body}>
                <Text style={styles.boldText}>ES CONFORME:</Text> Se extiende el
                presente, a solicitud del interesado, en la Ciudad de Carmona,
                el día {SalaryCertificateInfo?.issueDate}.
              </Text>

              <View style={styles.atentamente}>
                <Text>Atentamente</Text>
              </View>

              <View style={styles.signature}>
                <HorizontalLine2 width="12%" spaceWidth="0%" />
                <Text>
                  <Text style={styles.boldText}>Vicealcaldesa Municipal</Text>
                </Text>
                <Text style={styles.signatureName}>Cinthya Núñez Abarca</Text>
                <Text style={styles.personalID}>Cédula: 5-0322-0218</Text>
              </View>

              <Text style={styles.body}>📂CC:</Text>
            </View>

            <View style={styles.footer}>
              <View style={styles.footerLeft}>
                <Text>Telefax: 2657-7500 | Ext: 2013</Text>
                <Text>Correo: yarias@nandayure.go.cr</Text>
                <Text>Sitio web: www.nandayure.go.cr</Text>
              </View>

              <View style={styles.footerRightContainer}>
                {' '}
                {/* Nuevo contenedor */}
                <Text style={styles.footerRight}>
                  “Por un Nandayure de oportunidades para todos”
                </Text>
              </View>

              <HorizontalLineFooter width="50%" spaceWidth="0%" />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default SalaryCertificateTemplate;

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
  section: {
    margin: 10,
    padding: 10,
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
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'justify',
    color: '#333333',
  },
  boldText: {
    fontWeight: 'bold',
    marginVertical: 5,
    position: 'relative',
    top: -5,
    color: '#00000',
  },
  containerCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  breakdownContainer: {
    width: '60%',
    fontSize: 12,
    border: '1pt solid black',
    padding: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottom: '1pt solid black',
  },
  lastRow: {
    borderBottom: 'none',
  },
  emptySpace: {
    height: 6,
    borderBottom: 'none',
  },
  signature: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  atentamente: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  personalID: {
    fontSize: 12,
    color: '#333333',
  },

  horizontalLine: {
    borderBottomWidth: 2,
    marginVertical: 0,
  },
  horizontalLine2: {
    borderBottomWidth: 10,
    marginVertical: 1,
  },
  space: {
    width: '1%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 10,
    borderTop: '0.5pt solid',
    height: 80,
    flexDirection: 'column',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  footerRightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: -50,
  },
  footerRight: {
    textAlign: 'right',
    marginTop: 5,
  },

  horizontalLineFooter: {
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: '#000',
    marginVertical: 5,
  },

  redBackground: {
    backgroundColor: '#f28b82',
  },
  yellowBackground: {
    backgroundColor: '#fff475',
  },
});
