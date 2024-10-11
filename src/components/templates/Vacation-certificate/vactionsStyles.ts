import { StyleSheet } from '@react-pdf/renderer';

const vacationsStyles = StyleSheet.create({
    page: {
      padding: 25,
      fontFamily: 'Times-Roman',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        width: '90%',
       
      },
      logo: {
        width: 50,
        height: 'auto',
        marginRight: 10,
      },
    container: {
      border: '2px solid #000',
      margin: 0, 
      padding: 0, 
      borderRadius: 2,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width:'100%'
    },
    sectionFullWidth: {
      flexDirection: 'row',
      marginBottom: 0,
      padding: 0,
      border: '1pt solid black',
      width: '100%',
      justifyContent: 'center',
    },
    section: {
      flexDirection: 'column',
      margin: 0,
      padding: 5, 
      border: '1pt solid black',
      width: '100%', 
      boxSizing: 'border-box',
      fontSize:10,
    },
    titleContainer: {
        flex: 1,
        textAlign: 'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 0,
      textTransform: 'uppercase',
      color: '#3fa59e', 
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 0,
      textTransform: 'uppercase',
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
      },
    label: {
      fontWeight: 'bold',
      marginBottom:10,
      fontSize:11,
      width: ''
    },
    value: {
      fontSize: 11,
    },

    valueRed: {
        fontSize: 11,
        color: 'red', 
      },
    sectionTitle: {
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: 10,
      fontSize:11,
    },
    signature: {
      marginTop: 0,
      textAlign: 'center',
      fontSize: 11,
      borderBottom: '1pt solid black',
      width: '60%',
      alignSelf: 'center',
    },
    autorizacionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      flexWrap: 'wrap',
    },
    autorizacion: {
      fontSize: 11,
      fontWeight: 'bold',
      width: '50%',
      boxSizing: 'border-box',
    },
    sectioninfo: {
        flexDirection: 'row',
        marginBottom: 0,
        padding: 0,
        fontSize: 11,
        width: '100%', 
      },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 0,
    },
    infoItem: {
      width: '50%', 
      border: '1pt solid black', 
      margin: 0, 
      padding: 5, 
      boxSizing: 'border-box',
    },
    infoLabel: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    infoValue: {
      fontSize: 11,
      textAlign: 'center',
    },
    alignmentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
      padding: 0,
      margin: 0,
      width: '100%',
    },
    alignmentSection: {
      flexDirection: 'column',
      width: '34%', 
      border: '1pt solid black',
      margin: 0, 
      padding: 0,
      boxSizing: 'border-box',
       alignItems: 'center'
      
    },

    derechoSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
      width: '100%',
    },
    derechoItem: {
      flexDirection: 'column',
      width: '34%', 
      border: '1pt solid black',
      margin: 0, 
      padding: 15, 
      boxSizing: 'border-box',
      fontSize:11,

    },
    partirContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
      width: '100%',
    },
    partirItem: {
      flexDirection: 'column',
      width: '34%',
      border: '1pt solid black',
      margin: 0,
      padding: 15, 
      boxSizing: 'border-box',
      
    },
    regresoItem: {
      flexDirection: 'column',
      width: '34%',
      border: '1pt solid black',
      margin: 0,
      padding: 15, 
      boxSizing: 'border-box',
      
    },
    controlItem: {
      flexDirection: 'column',
      width: '34%',
      border: '1pt solid black',
      margin: 0,
      padding: 15, 
      boxSizing: 'border-box',
      alignItems: 'center'
    },
    fieldRowIsolated: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
    },
    labelIsolated: {
      fontSize: 11,
      fontWeight: 'bold',
    },
    valueIsolated: {
      fontSize: 11,
    },
    signatureAuthorizationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 0,
      width: '100%',
    },
    signatureItem: {
      flexDirection: 'column',
      width: '50%',
      margin: 0,
      padding: 5, 
      boxSizing: 'border-box',
    },
    authorizationItem: {
      flexDirection: 'column',
      width: '50%',
      border: '1pt solid black',
      margin: 0,
      padding: 5, 
      boxSizing: 'border-box',
    },
    periodos: {
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 0,
        fontSize: 11,
      },
      fieldRowperiodo: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 5,
      },
      labelperiodo: {
        fontWeight: 'bold',
        fontSize: 12,
        width: '50%', 
        textAlign: 'left', 
        marginRight: -5,
      },
      valueperiodo: {
        fontSize: 12,
        width: '50%',
        textAlign: 'right', 
      },
      divider: {
        borderBottom: '1pt solid black',
        marginVertical: 5,
        width: '100%',
      },
});
export default vacationsStyles;
