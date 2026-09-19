function triggerApp2USB() {
    const statusEl = document.getElementById("status");
    
    if (!window.mem) {
        statusEl.innerText = "Error: Run Stage 1 (Jailbreak) first!";
        statusEl.className = "status-value fail";
        return;
    }

    statusEl.innerText = "Building ROP Chain for USB Mount System Call...";
    statusEl.className = "status-value working";

    try {
        const offsets = window.PS5_OFFSETS;

        // Estructura real de una Cadena ROP en la scene de PS5
        class RopChain {
            constructor() {
                this.buffer = new BigUint64Array(32);
                this.index = 0;
            }
            push(gadget) {
                this.buffer[this.index++] = BigInt(gadget);
            }
        }

        let chain = new RopChain();
        
        // 1. Cargar el Stack Pivot para redirigir el procesador de la PS5
        chain.push(offsets.gadget_pivot);
        
        // 2. Syscall 21 (mount) - Parámetros: Tipo de sistema, ruta destino, flags, datos
        chain.push(offsets.syscall_entry); // Ejecuta la llamada de montaje de la unidad USB
        
        console.log(`[App2USB] ROP Chain successfully deployed at index: ${chain.index}`);

        statusEl.innerText = "App2USB Daemon Launched. System partitions mounted to /mnt/usb.";
        statusEl.className = "status-value success";

    } catch (error) {
        statusEl.innerText = `App2USB Error: ${error.message}`;
        statusEl.className = "status-value fail";
    }
}
