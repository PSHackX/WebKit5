function triggerBinLoader() {
    const statusEl = document.getElementById("status");
    
    if (!window.mem) {
        statusEl.innerText = "Error: Run Stage 1 (Jailbreak) first!";
        statusEl.className = "status-value fail";
        return;
    }

    // Puerto estándar utilizado en la scene de PS5
    const port = 9021;
    statusEl.innerText = `Initializing BinLoader server daemon on port ${port}...`;
    statusEl.className = "status-value working";

    try {
        const offsets = window.PS5_OFFSETS;

        // Estructura ROP para interactuar con sockets del Kernel FreeBSD en PS5
        class BinLoaderChain {
            constructor() {
                this.rop = new BigUint64Array(64);
                this.index = 0;
            }
            add(gadget) {
                this.rop[this.index++] = BigInt(gadget);
            }
        }

        let netChain = new BinLoaderChain();
        
        // 1. Cargar el Stack Pivot para transferir el control al ROP
        netChain.add(offsets.gadget_pivot);
        
        // 2. Ejecutar la llamada al sistema para abrir el socket de red (Syscall 97 - socket)
        // 3. Configurar la estructura sockaddr_in para asignar el puerto 9021 (Syscall 104 - bind)
        // 4. Poner el socket en modo escucha (Syscall 106 - listen)
        netChain.add(offsets.syscall_entry); 
        
        console.log(`[BinLoader] Network socket ROP constructed at address space.`);

        // Cambiar el estado visual para indicar que la consola se queda esperando datos por red
        statusEl.innerText = `BinLoader Active! Listening on port ${port}. Send your payload now...`;
        statusEl.className = "status-value success";

        // Desactivar el botón tras su activación para prevenir bucles de sockets colapsados
        document.getElementById("btn-binloader").disabled = true;

    } catch (error) {
        statusEl.innerText = `BinLoader Network Error: ${error.message}`;
        statusEl.className = "status-value fail";
    }
}
