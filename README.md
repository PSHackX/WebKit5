# WebKit5 - PS5 Host Environment ⚡

A modern, modular, and highly scalable multi-payload environment designed for PlayStation 5 userland research and compatibility testing up to firmware v13.60.

## 🚀 Architecture & Features
- **Strict Sequential Execution:** Advanced safety mechanism that prevents memory access violations by keeping post-exploit utilities locked until Stage 1 succeeds.
- **Stage 1 (Core Exploit):** Targets WebKit vulnerabilities to corrupt `ArrayBuffer` structures and achieve Userland Read/Write (R/W) memory primitives.
- **Independent Payload Modules:** Separate architecture for critical sub-routines:
  - `offsets.js`: Dynamic User-Agent scanning and version-to-memory routing.
  - `spoof.js`: Live RAM patching for firmware strings.
  - `app2usb.js`: Stack-pivot ROP chain builder utilizing native mount syscalls.
  - `binloader.js`: Port 9021 socket daemon to receive custom external payloads via network.

## 📂 Modular Structure
```text
WebKit5/
├── css/          # High-contrast glassmorphism neon interface
├── js/
│   ├── offsets.js    # Address mapping router
│   ├── jailbreak.js  # Stage 1 memory corruption
│   ├── spoof.js      # Ram string patcher
│   ├── app2usb.js    # Syscall ROP constructor
│   └── binloader.js  # Network listener daemon
└── index.html    # Core structural framework
```
