import subprocess
import sys
import os

# Configure stdout for Windows console compatibility
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

def launch_tunnel():
    print("""
    ===============================================================
    [Mobile HTTPS Tunnel] The Stone & Cloud Oracle
    ===============================================================
    This creates an instant secure HTTPS URL so you can open the app
    on your smartphone with native camera and audio permissions.
    ===============================================================
    """)
    
    port = 8000  # Default to port 8000 where FastAPI serves both API and UI
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
        
    cmd = f"npx -y localtunnel --port {port}"
    print(f"Connecting tunnel to port {port} via: {cmd}\n")
    
    try:
        proc = subprocess.Popen(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace"
        )
        
        for line in proc.stdout:
            print(line, end="")
            if "your url is:" in line.lower():
                url = line.split("is:")[-1].strip()
                print(f"\n>>> Mobile HTTPS URL: {url}")
                print("Open this URL on your smartphone browser!\n")
                try:
                    import qrcode
                    qr = qrcode.QRCode()
                    qr.add_data(url)
                    qr.print_ascii(invert=True)
                except Exception:
                    pass
                break
                
        proc.wait()
    except KeyboardInterrupt:
        print("\nTunnel closed.")

if __name__ == "__main__":
    launch_tunnel()
