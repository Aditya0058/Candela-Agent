import subprocess
import os
import time
import webbrowser
import sys

def start_servers():
    print("Starting candela frontend and backend servers please wait ....")
    backend_process = subprocess.Popen(
        [sys.executable, "app.py"], 
        cwd="Backend"
    )
    frontend_process = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd="Frontend",
        shell=True 
    )
    print("Waiting for servers to boot up...")
    time.sleep(5) 

    print("Opening Candela in your browser cuz i am not lazyy")
    webbrowser.open("http://localhost:5173")

    print("\nFinally, Candela is running! Press Ctrl+C to stop.")

    try:
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\n Shutting down Candela...")
        backend_process.terminate()
        frontend_process.terminate()

if __name__ == "__main__":
    start_servers()