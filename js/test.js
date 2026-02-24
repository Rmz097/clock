/* ===================================================== */
/* ANTI BURN-IN CORPORATIVO OLED 24/7 – TABLET           */
/* ===================================================== */

function initCorporateProtection() {

    const container = document.querySelector(".calendar-container");
    if (!container) return;

    let shiftIndex = 0;
    let opacityLevel = 0.92;
    let redToggle = false;
    let minimalMode = false;
    let nightMode = false;
    let lastInteraction = Date.now();

    const shifts = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: -1, y: -1 }
    ];

    /* ===================== */
    /* 1️⃣ PIXEL SHIFT LENTO */
    /* ===================== */
    function applyShift() {
        shiftIndex = (shiftIndex + 1) % shifts.length;
        const pos = shifts[shiftIndex];
        container.style.transform =
            `translate(${pos.x}px, ${pos.y}px)`;
    }

    /* ===================== */
    /* 2️⃣ VARIACIÓN OPACIDAD */
    /* ===================== */
    function varyOpacity() {
        opacityLevel = opacityLevel === 0.92 ? 0.88 : 0.92;
        container.style.opacity = opacityLevel;
    }

    /* ===================== */
    /* 3️⃣ VARIACIÓN ROJO     */
    /* ===================== */
    function varyRedTone() {
        redToggle = !redToggle;
        document.documentElement.style.setProperty(
            "--primary-red",
            redToggle ? "#c92a2a" : "#b82222"
        );
    }

    /* ===================== */
    /* 4️⃣ MODO INACTIVIDAD  */
    /* ===================== */
    function checkInactivity() {
        const now = Date.now();
        const minutesInactive = (now - lastInteraction) / 60000;

        if (minutesInactive > 30 && !minimalMode) {
            activateMinimalMode();
        }

        if (minutesInactive <= 30 && minimalMode) {
            deactivateMinimalMode();
        }
    }

    function activateMinimalMode() {
        minimalMode = true;
        container.style.opacity = 0.75;

        document.querySelectorAll(".santoral-text").forEach(el => {
            el.style.display = "none";
        });
    }

    function deactivateMinimalMode() {
        minimalMode = false;
        container.style.opacity = 0.92;

        document.querySelectorAll(".santoral-text").forEach(el => {
            el.style.display = "";
        });
    }

    /* ===================== */
    /* 5️⃣ MODO NOCTURNO     */
    /* ===================== */
    function checkNightMode() {
        const hour = new Date().getHours();

        if (hour >= 0 && hour < 6 && !nightMode) {
            nightMode = true;
            container.style.opacity = 0.65;
        }

        if (hour >= 6 && nightMode) {
            nightMode = false;
            container.style.opacity = 0.92;
        }
    }

    /* ===================== */
    /* 6️⃣ REFRESCO VISUAL   */
    /* ===================== */
    function visualRefresh() {
        container.style.transition = "opacity 1s ease";
        container.style.opacity = 0.3;

        setTimeout(() => {
            container.style.opacity = nightMode ? 0.65 : 0.92;
        }, 1000);
    }

    /* ===================== */
    /* INTERACCIÓN USUARIO   */
    /* ===================== */
    function registerInteraction() {
        lastInteraction = Date.now();
    }

    window.addEventListener("touchstart", registerInteraction);
    window.addEventListener("click", registerInteraction);

    /* ===================== */
    /* INTERVALOS            */
    /* ===================== */

    setInterval(applyShift, 240000);       // 4 min
    setInterval(varyOpacity, 600000);      // 10 min
    setInterval(varyRedTone, 900000);      // 15 min
    setInterval(checkInactivity, 60000);   // 1 min
    setInterval(checkNightMode, 300000);   // 5 min
    setInterval(visualRefresh, 21600000);  // 6 horas
}

/* ACTIVAR SOLO EN AMOLED PRO */
document.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("theme-amoled-pro")) {
        initCorporateProtection();
    }
});
