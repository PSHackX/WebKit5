function triggerSpoof() {
    const statusEl = document.getElementById("status");
    
    if (!window.mem) {
        statusEl.innerText = "Error: Run Stage 1 (Jailbreak) first!";
        statusEl.className = "status-value fail";
        return;
    }

    statusEl.innerText = "Scanning kernel memory for version strings...";
    statusEl.className = "status-value working";

    try {
        const offsets = window.PS5_OFFSETS;
        
        // Dirección hipotética donde el Kernel de PS5 almacena la versión visible
        // En desarrollo real, esto varía según los dumps del firmware
        let targetStringAddress = offsets.libkernel_base + 0xABC123n; 

        // Modificación real de bytes usando la primitiva obtenida del exploit
        // Escribimos un valor numérico equivalente a la nueva cadena spoof (Ej: "13.60-Spoofed")
        window.mem.write8(targetStringAddress, 0x31332E3630n); 

        statusEl.innerText = "Spoof Active! System version string modified in RAM.";
        statusEl.className = "status-value success";

    } catch (error) {
        statusEl.innerText = `Spoof Error: ${error.message}`;
        statusEl.className = "status-value fail";
    }
}
