import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, PDFViewer, Image } from '@react-pdf/renderer';
import { vacationsProps } from '../../../types/templates/vacations'; 
import vacationsStyles from './vactionsStyles';
import { useVacationsData } from '@/hooks/templates/vacations/useVacationsData';



interface VacationCertificateProps {
  id: string;
}


const VacationCertificate: React.FC<VacationCertificateProps> = ({ id }) => {

  const { data, isLoading, error } = useVacationsData({ id });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No se encontraron datos para el certificado</div>;

  return (
    <div>
      {data ? (
        <PDFViewer width="100%" height="1000">
          <Document>
            <Page size="A4" style={vacationsStyles.page}>
              <View style={vacationsStyles.container}>
                {/* Encabezado */}
                <View style={vacationsStyles.header}>
                <Image style={{ ...vacationsStyles.logo}} src="/LogoMuni.png" />
                <View style={vacationsStyles.titleContainer}>
                  <Text style={vacationsStyles.title}>MUNICIPALIDAD DE NANDAYURE</Text>
                  <Text style={vacationsStyles.subtitle}>DIRECCIÓN DE RECURSOS HUMANOS</Text>
                </View>
                </View>
  
                {/* Solicitud de Vacaciones */}
                <View style={vacationsStyles.sectionFullWidth}>
                  <Text style={vacationsStyles.subtitle}> BOLETA SOLICITUD DE VACACIONES LEGALES</Text>
                </View>
  
                {/* Información del solicitante */}
                <View style={vacationsStyles.sectioninfo}>
                  <View style={vacationsStyles.infoContainer}>
                    <View style={vacationsStyles.infoItem}>
                      <Text style={vacationsStyles.infoLabel}>Nombre del solicitante:</Text>
                      <Text style={vacationsStyles.infoValue}>{data.nombreSolicitante}</Text>
                    </View>
                    <View style={vacationsStyles.infoItem}>
                      <Text style={vacationsStyles.infoLabel}>Número de Cédula:</Text>
                      <Text style={vacationsStyles.infoValue}>{data.cedula}</Text>
                    </View>
                  </View>
                </View>
  
                
                <View style={vacationsStyles.alignmentContainer}>
                  {/* Departamento */}
                  <View style={vacationsStyles.alignmentSection}>
                    <Text style={vacationsStyles.sectionTitle}>Departamento:</Text>
                    <Text style={vacationsStyles.value}>{data.departamento}</Text>
                  </View>
  
                  {/* Fecha de Ingreso */}
                  <View style={vacationsStyles.alignmentSection}>
                    <Text style={vacationsStyles.sectionTitle}>Fecha de Ingreso:</Text>
                    <Text style={vacationsStyles.value}>{data.fechaIngreso}</Text>
                  </View>
  
                  {/* Periodos Vencidos */}
                  <View style={vacationsStyles.alignmentSection}>
                    <Text style={vacationsStyles.periodos}>Periodos Vencidos</Text>
                    <View style={vacationsStyles.divider} />
                    <View style={vacationsStyles.fieldRowperiodo}>
                      <Text style={vacationsStyles.labelperiodo}>Año:</Text>
                      <Text style={vacationsStyles.valueperiodo}>{data.anios}</Text>
                    </View>
                    <View style={vacationsStyles.fieldRowperiodo}>
                      <Text style={vacationsStyles.labelperiodo}>Días:</Text>
                      <Text style={vacationsStyles.valueperiodo}>{data.dias}</Text>
                    </View>
                    <View style={vacationsStyles.fieldRowperiodo}>
                      <Text style={vacationsStyles.labelperiodo}>Total:</Text>
                      <Text style={vacationsStyles.valueperiodo}>{data.total}</Text>
                    </View>
                  </View>
                </View>
  
{/* Sección de Derecho a Disfrutar */}
<View style={vacationsStyles.derechoSection}>
    <View style={vacationsStyles.derechoItem}>
        <Text style={vacationsStyles.sectionTitle}>Derecho a Disfrutar</Text>
        <View style={vacationsStyles.fieldRow}>
            <Text style={vacationsStyles.label}>Días:</Text>
            <Text style={vacationsStyles.value}>{data.dias}</Text> 
        </View>
    </View>
    <View style={vacationsStyles.derechoItem}>
        <Text style={vacationsStyles.sectionTitle}>Solicitados</Text>
        <View style={vacationsStyles.fieldRow}>
            <Text style={vacationsStyles.label}>Días:</Text>
            <Text style={vacationsStyles.value}>{data.diasSolicitados}</Text>
        </View>
    </View>
    <View style={vacationsStyles.derechoItem}>
        <Text style={vacationsStyles.sectionTitle}>Saldo de vaciones</Text>
        <View style={vacationsStyles.fieldRow}>
            <Text style={vacationsStyles.label}>Días:</Text>
            <Text style={vacationsStyles.value}>{data.saldoVacaciones}</Text>
        </View>
    </View>
</View>


<View style={vacationsStyles.partirContainer}>
  {/* A partir del */}
  <View style={vacationsStyles.partirItem}>
    <Text style={vacationsStyles.sectionTitle}>A partir del</Text>
    <View style={vacationsStyles.fieldRow}>
      <Text style={vacationsStyles.value}>_______{data.fechaSalida}</Text>
    </View>
  </View>

  {/* Hasta y Regresando lab */}
  <View style={vacationsStyles.regresoItem}>
    <View style={vacationsStyles.fieldRow}>
      <Text style={vacationsStyles.sectionTitle}>Hasta el:_______</Text>
      <Text style={vacationsStyles.value}>{data.fechaHasta}</Text>
    </View>
    <View style={vacationsStyles.fieldRow}>
      <Text style={vacationsStyles.sectionTitle}>Regresando lab:_______</Text>
      <Text style={vacationsStyles.value}>{data.fechaRegreso}</Text>
    </View>
  </View>

  {/* Control */}
  <View style={vacationsStyles.controlItem}>
    <Text style={vacationsStyles.sectionTitle}>Control #:</Text>
    <Text style={vacationsStyles.valueRed}>{data.control}</Text>
  </View>
</View>
  
                {/* Observaciones */}
                <View style={vacationsStyles.section}>
                  <Text style={vacationsStyles.sectionTitle}>Observaciones</Text>
                  <Text>{data.observaciones || 'N/A'}</Text>
                </View>
  
  
<View style={vacationsStyles.signatureAuthorizationContainer}>
  {/* Firma del Solicitante */}
  <View style={vacationsStyles.signatureItem}>
    <Text style={vacationsStyles.sectionTitle}>Firma del Solicitante</Text>
    <Text style={vacationsStyles.signature}>____________________________</Text>
  </View>

  {/* Autorizaciones */}
  <View style={vacationsStyles.authorizationItem}>
    <Text style={vacationsStyles.sectionTitle}>Autorizaciones</Text>
    <View style={vacationsStyles.autorizacionRow}>
      <Text style={vacationsStyles.autorizacion}>2. Autorizado por Jefe Inmediato: _______________________</Text>
    </View>
    <View style={vacationsStyles.autorizacionRow}>
      <Text style={vacationsStyles.autorizacion}>3. Revisado por Encargado de Recursos Humanos: _______________________</Text>
    </View>
    <View style={vacationsStyles.autorizacionRow}>
      <Text style={vacationsStyles.autorizacion}>Denegada ( ) Aprobada ( )</Text>
    </View>
    <View style={vacationsStyles.autorizacionRow}>
      <Text style={vacationsStyles.autorizacion}>4. Aprobado por Alcalde Municipal:  _______________________</Text>
    </View>
    <View style={vacationsStyles.autorizacionRow}>
      <Text style={vacationsStyles.autorizacion}>Denegada ( ) Aprobada ( )</Text>
    </View>
  </View>
</View>


                {/* Disposiciones */}
                <View style={vacationsStyles.section}>
  <Text style={vacationsStyles.sectionTitle}>Disposiciones</Text>
  <Text>1.Todo aquel funcionario que requiera tramitar las vacaciones legales debe realizar la solicitud con mínimo
una semana de anticipación, ya que deben ser revisadas y posteriormente aprobadas. Por consiguiente las
solicitudes con menos de 3 días tramitadas serán analizadas para su aprobación según el grado de urgencia</Text>
  <Text>2.Antes de presentar la solicitud a recursos humanos, esta debe de venir autorizada por el jefe y gestor del
área. Las aprobaciones las debe de coordinar el encargado de recursos humano. Incluyendo la del alcalde</Text>
  <Text>3. Si falta alguna de las firmas, la solicitud no tendrá validez.</Text>
</View>

              </View>
            </Page>
          </Document>
        </PDFViewer>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default VacationCertificate;
