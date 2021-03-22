Dim objShell
Set objShell = WScript.CreateObject("WScript.Shell")
objShell.CurrentDirectory = "C:\node-virtual-gamepads-windows"
objShell.Run("""node"" main.js"), 0
Set objShell = Nothing
