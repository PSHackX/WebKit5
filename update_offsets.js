#!/usr/bin/env python3
import os
import json

def update_ps5_offsets():
    print("\n--- WebKit5 Offset Updater ---")
    fw_version = input("Enter target firmware (e.g., 13.50): ").strip()
    
    try:
        libkernel = input("Enter libkernel base address (hex, e.g., 0x1100000): ").strip()
        webkit = input("Enter webkit base address (hex, e.g., 0x2750000): ").strip()
        pivot = input("Enter stack pivot gadget (hex): ").strip()
        syscall = input("Enter syscall entry gadget (hex): ").strip()
        
        # Formatear las entradas como BigInt de JS (añadiendo la 'n' al final)
        new_entry = f"""    "{fw_version}": {{
        libkernel_base: {libkernel}n,
        webkit_base:    {webkit}n,
        gadget_pivot:   {pivot}n,
        syscall_entry:  {syscall}n
    }},"""
        
        print("\n🚀 Generated JS Object Entry:")
        print(new_entry)
        print("\nCopy this block into your 'js/offsets.js' inside the FIRMWARE_DATABASE object.")
        
    except ValueError:
        print("❌ Error: Please ensure you enter valid hex values (starting with 0x).")

if __name__ == "__main__":
    update_ps5_offsets()
