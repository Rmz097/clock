// Variable global para almacenar la instancia del bloqueo de activación
let wakeLock = null; 

/**
 * 💡 Solicita un Bloqueo de Activación de pantalla usando la API Wake Lock.
 * Esto evita que el dispositivo entre en modo de suspensión o que la pantalla se apague.
 */
async function requestWakeLock() {
    // Si ya tenemos un bloqueo activo, salimos para no solicitarlo de nuevo.
    if (wakeLock !== null) {
        return;
    }
    
    try {
        // Solicitamos un bloqueo de tipo 'screen' para mantener la pantalla encendida
        wakeLock = await navigator.wakeLock.request('screen');
        
        console.log("✅ Bloqueo de activación de pantalla obtenido. La pantalla permanecerá encendida para el dashboard.");

        // Manejar la liberación automática: Si el sistema libera el bloqueo (ej. usuario cambia de pestaña), 
        // reseteamos nuestra variable para poder solicitarlo de nuevo.
        wakeLock.addEventListener('release', () => {
            console.log("❌ Bloqueo de activación liberado automáticamente por el sistema.");
            wakeLock = null; 
        });
        
    } catch (err) {
        // Puede fallar si la API no es compatible, el usuario deniega el permiso o hay restricciones.
        console.error(`🛑 Error al solicitar el Bloqueo de Activación: ${err.message}`);
        wakeLock = null;
    }
}


// ===============================================
// 🔄 Manejar la visibilidad de la pestaña 
// ===============================================

/**
 * Esta función es clave. El bloqueo de activación se libera automáticamente 
 * si la pestaña deja de estar en primer plano. Al volver, debemos solicitarlo de nuevo.
 */
function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        // Si la pestaña está visible, intentamos activar el bloqueo.
        requestWakeLock();
    }
}

// Escuchamos el evento de cambio de visibilidad del documento
document.addEventListener('visibilitychange', handleVisibilityChange);


// ===============================================
// 🚀 Iniciar el proceso automáticamente
// ===============================================

// Llamamos a la función al cargar el script para intentar obtener el bloqueo inmediatamente.
requestWakeLock();


/* ----------------------------------------------------
   NOTA: Aquí es donde iría el resto de tu código JS 
   para actualizar el reloj, clima, calendario, etc.
   ---------------------------------------------------- */