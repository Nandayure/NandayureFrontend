import { FAQItem } from "@/types/faqs/faq.types";

export const faqs: FAQItem[] = [
  {
    id: "1",
    question: "¿Cómo solicito vacaciones?",
    answer: "Pasos para solicitar vacaciones:\n\nIngresa al portal: Portal del Empleado https://nandayure-frontend-deployment.vercel.app\nPrimer inicio de sesión: Usa la contraseña temporal enviada a tu correo\nRestablece contraseña: Haz clic en '¿Olvidó su contraseña?' si es necesario\nEnvía solicitud: En la sección 'Solicitudes' → 'Vacaciones'\n\nContacto de seguimiento:\nYerlin Arias (Recursos Humanos) - yarias@nandayure.go.cr | Ext. 2013",
    category: "tramites",
    updated_at: new Date("2024-03-01"),
  },
  {
    id: "2",
    question: "¿Cómo descargo mi boleta de pago?",
    answer: "Proceso de descarga:\n\nAccede al portal: Portal del Empleado https://nandayure-frontend-deployment.vercel.app\nInicia sesión con tus credenciales\nSelecciona 'Boletas de Pago' o 'Constancias Salariales'\nIngresa el motivo y descarga el PDF\n\nNota: Para correcciones, contacta a Tesorería: gbalotdano@nandayure.go.cr | Ext. 2004",
    category: "tramites",
    updated_at: new Date("2024-03-01"),
  },
  {
    id: "3",
    question: "¿Cómo recupero mi contraseña?",
    answer: "Solución:\nUsa la opción '¿Olvidó su contraseña?' en el portal\nSi persiste el problema, contacta al Departamento de TI:\nJavier Hernández: jhernandez@nandayure.go.cr | Ext. 2023\nSoporte: soporte@nandayure.go.cr",
    category: "soporte",
    updated_at: new Date("2024-03-01"),
  },
  {
    id: "4",
    question: "¿Cómo actualizo mis datos personales?",
    answer: "Actualización de perfil:\n\nIngresa al portal: Portal del Empleado https://nandayure-frontend-deployment.vercel.app\nInicia sesión y ve a 'Mi Perfil'\nEdita tus datos y guarda los cambios\n\nSoporte técnico: soporte@nandayure.go.cr | Ext. 2023",
    category: "soporte",
    updated_at: new Date("2024-03-01"),
  },
  {
    id: "5",
    question: "¿Cómo contacto a Recursos Humanos?",
    answer: "Contacto directo:\nYerlin Arias\nCorreo: yarias@nandayure.go.cr\nExtensión: 2013",
    category: "contactos",
    updated_at: new Date("2024-03-01"),
  },
  {
    id: "6",
    question: "¿Cuál es la historia de Nandayure?",
    answer: "Fundación: 6 de diciembre de 1910 por 20 familias lideradas por José Daniel Carmona Briceño\n\nPrimeros asentamientos: Agricultura y ganadería en la ribera del río Nandayure\n\nCultura: Fusión de tradiciones montañesas y costeras, con bailes de marimba y corridas de toros",
    category: "historia",
    updated_at: new Date("2024-03-01"),
  },
  {
    id: "7",
    question: "¿Quién es el alcalde actual?",
    answer: "Alcalde: Teddy Zuñiga Sánchez\nContacto: tzuniga@nandayure.go.cr\nLicenciado en Comercio y Negocios Internacionales (UNA)",
    category: "gobierno",
    updated_at: new Date("2024-03-01"),
  },
];

export const categories = {
  tramites: "Trámites Administrativos",
  soporte: "Soporte Técnico",
  contactos: "Contactos y Directorio",
  historia: "Historia y Cultura",
  gobierno: "Gobierno y Visión",
};