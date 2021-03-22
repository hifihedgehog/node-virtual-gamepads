**Windows Branch**
------------
This is a fork of a fork, so many thanks to egemenertugrul for porting jehervy's web application to the Windows platform. This version enables **Xinput gamepad** input on **Windows** machines via [node-ViGEmClient](https://www.npmjs.com/package/vigemclient). I have since taken the liberty to add support for up to 10 virtual gamepads, up from 4, by integrating [the necessary bits from upstream in jehervy's main branch of the project](https://github.com/jehervy/node-virtual-gamepads/commit/619a0b0d80230b4200c6fc162d6c3292670b1fbb). Earlier vestiges of the virtual keyboard and touchpad components of the project have been removed but based on demand, they can be readded at a later date. For those interested in contributing, Robot.js package would be a suitable candidate for adding in virtual touchpad and keyboard support.

**Prequisite:**

Download and install [ViGEmBus](https://github.com/ViGEm/ViGEmBus/releases) (tested through 1.17.333).
Download and install Node.js 14. The "Automatically install the necessary tools" option must also be checked to include the Visual Studio Build Tools (required).

**Major changes:**

  * Downgraded `forever-monitor` to 1.0.0 from 2.0.0, see [this](https://github.com/foreversd/forever/issues/1056).
  * Dependencies:
    * Added: `vigemclient: 1.1.2`
    * Removed: `ioctl`, `ref`, `ref-struct` and `ref-array`
  * Added `virtual_gamepad_hub_vigem.js` and `virtual_gamepad_vigem.js`.
  * Edited `server.js`.
  * Added support for up to 10 controllers, up from 4, as implemented in the main branch of this project.

**TODO:** Implement keyboard and touchpad input based on popular demand.

# node-virtual-gamepads

This Node.js application turns your smartphone into a gamepad controller simply by reaching a local address.
You can virtually plug in **up to 10** virtual gamepad controllers.

Demo
----
Demo video of 1 player in game [here](https://www.youtube.com/watch?v=OWgWugNsF7w)

Demo video of 3 players in EmulationStation [here](https://www.youtube.com/watch?v=HQROnYLRyOw)

Installation
------------
**NOTE**: This application is tested with Node.js 14.

    git clone https://github.com/hifihedgehog/node-virtual-gamepads
    cd node-virtual-gamepads
    npm install

You can now configure the server to your needs. Just open `config.json`
with the editor of you choice and adjust the values.

  * `port`: sets the port the web-server is listening on.
  * `useGamepadByDefault`: if set to `false`, the `/` will redirect to
    a landing page where you can access a gamepad link to then plug in
    the gamepad. If set to `true`, `/` redirects directly to the 
    gamepad page and instantly plugs in the gamepad. The landing page
    can still be accessed via `/index.html`.
  * `analog`: if set to `true` the the above mentioned redirection will
    append `?analog` to the address. This flag will cause the gamepad's
    d-pad to act like an analog stick instead of d-pad.
  * `logLevel`: set it to `"debug"` to get a lot more logging output,
    to `"warning"` to only get critical output, or even to `"error"` if
    you want to only get errors logged (not recommended).

To start the server run
    
    node main.js

Usage
-----
Once the nodejs application is launched, you just have to plug in your virtual gamepad controller
by connecting your device on the same local network by reaching the address *http://node_server_address*

In Windows, your device/computer name would be what you type into the browser for "node_server_address." You can modify your device/computer name by going to the Settings app and clicking on "Advanced system settings" and from the pop-up, switching to the tab "Computer Name" and selecting "Change." Replace the name in the computer name field to whatever you want. Then press OK twice to apply and reboot as required.

Also included is a Visual Basic startup script so the server will start in an invisible window (in the background) at login. You would adjust the path in the file from "C:\node-virtual-gamepads" to the path where you are running the application on your machine. Then for it to run automatically at startup for all users, you would copy this file to the folder C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp\.

Features
--------
### Plug up to 10 virtual gamepads
The application will automatically plug in a new controller when the web application is launched and unplug it at disconnection.
10 slots are available so 10 virtual gamepads can be created. You can see your current slot on the indicator directly on the vitual gamepad.

![Virtual gamepad](https://github.com/miroof/node-virtual-gamepads/blob/resources/screenshots/standalone.png?raw=true)

### Use it as standalone application (Chrome)
With the [add to homescreen](https://developer.chrome.com/multidevice/android/installtohomescreen) Chrome feature,
you can easily use virtual gamepads application without launching the browser each time you want to play.

With only three clicks, this virtual gamepad web application becomes a standalone application.

![Standalone installation step 1](https://github.com/miroof/node-virtual-gamepads/blob/resources/screenshots/standalone_step1.png?raw=true)
![Standalone installation step 2](https://github.com/miroof/node-virtual-gamepads/blob/resources/screenshots/standalone_step2.png?raw=true)

Then a shortcut is added onto your homescreen and the application will be launched outside the browser.

![Virtual gamepad directly from the homescreen](https://github.com/miroof/node-virtual-gamepads/blob/resources/screenshots/standalone_step3.png?raw=true)
![Launched outside the browser](https://github.com/miroof/node-virtual-gamepads/blob/resources/screenshots/standalone_step4.png?raw=true)

You would follow a similar procedure in Safari on iOS to likewise pin this to your homescreen.

### Enjoy haptic feedback
Because it it difficult to spot the right place in a touch screen without looking at it,
the touch zone of each button was increased. LT button was moved at the center of the screen
to let as much space as possible for the joystick and avoid touch mistakes.

![Step 1](https://github.com/miroof/node-virtual-gamepads/blob/resources/schemas/touch_zones.png?raw=true)

To know if a button has been pressed successfully, the web application provides haptic feedback
which can be easily deactivated by turning off the vibrations of the phone.

### An index page lets you choose when to start the gamepad
![Index page](https://github.com/miroof/node-virtual-gamepads/blob/resources/screenshots/index.png?raw=true)
