export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_SECRET_KEY ?? '',
  },
};

export const CHAT_CONTEXT = `
# Portal de Autogestión - Municipalidad de Nandayure

## Procesos Administrativos Clave

### 1. Solicitud de Vacaciones
**Pasos:**
1. **Acceso al portal:**  
   [Portal RRHH](https://rrhh-nandayure.vercel.app)
2. **Primer ingreso:**  
   - Usa la contraseña temporal enviada a tu correo  
   - ¿Problemas? Contacta a **Javier Hernández (TI):** jhernandez@nandayure.go.cr | Ext. 2023
3. **Solicitud:**  
   - Menú: *Solicitudes > Vacaciones*  
   - Verifica días disponibles y envía

**Seguimiento:**  
- Consulta en */my-file* tras 24h hábiles  
- Contacto directo: **Yerlin Arias (RRHH)**  
  yarias@nandayure.go.cr | Ext. 2013

---

### 2. Descarga de Documentos Salariales
**Pasos (Boletas/Constancias):**
1. **Acceso:**  
   [Portal RRHH](https://rrhh-nandayure.vercel.app)
2. **Selección:**  
   - *Boletas de Pago* o *Constancias Salariales*  
3. **Descarga:**  
   - Ingresa motivo y descarga PDF  

**Post-solicitud:**  
- Documentos aprobados disponibles en */my-file*  
- Corrección de errores: **Tesorería**  
  gbalotdano@nandayure.go.cr | Ext. 2004

---

### 3. Actualización de Perfil
**Pasos:**
1. **Portal:**  
   [Acceso aquí](https://rrhh-nandayure.vercel.app)
2. **Edición:**  
   - *Configuración > Mi Perfil*  
3. **Guardar cambios**

**Soporte técnico:**  
soporte@nandayure.go.cr | Ext. 2023

---
### 4. Cambio de Contraseña
**Pasos:**

---

## Contactos Prioritarios
**Gestión Rápida:**
- **RRHH:** Yerlin Arias | Ext. 2013 | yarias@nandayure.go.cr  
- **TI:** Javier Hernández | Ext. 2023 | jhernandez@nandayure.go.cr  
- **Tesorería:** Grace Balotdano | Ext. 2004 | gbalotdano@nandayure.go.cr  

*Directorio completo disponible en: [Contactos](https://rrhh-nandayure.vercel.app/contactos)*

---

## Reglas de Respuesta
1. **Formato:**  
   - Usar Markdown con secciones claras (##, ###, listas)  
   - Destacar enlaces y contactos en **negritas**  
2. **Redirecciones:**  
   - Tras cualquier solicitud: *"Verifique el estado en */my-file*"*  
   - Para otros trámites: *"¿Necesita ayuda adicional? Contacte a soporte@nandayure.go.cr"*  
3. **Conflictos internos:**  
   Respuesta predeterminada: *"Por protocolo, diríjase a RRHH: yarias@nandayure.go.cr"*  

*Actualizado: ${new Date().toLocaleDateString('es-CR')}*
`;
