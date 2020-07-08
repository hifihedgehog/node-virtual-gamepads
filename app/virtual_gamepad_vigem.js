// Generated by CoffeeScript 1.10.0

/*
Created by MIROOF on 04/03/2015
Virtual gamepad class
 */

(function () {
    const button_maps = {'0x130': 'B', '0x131': 'A', '0x133': 'Y', '0x134': 'X', '0x136': 'LEFT_SHOULDER', '0x137': 'RIGHT_SHOULDER', '0x13a': 'BACK', '0x13b': 'START'}

    var ViGEmClient, client, controller;

    ViGEmClient = require('vigemclient');

    virtual_gamepad = (function () {
        function virtual_gamepad() {}

        virtual_gamepad.prototype.connect = function (callback, error, retry) {
            if (retry == null) {
                retry = 0;
            }

            client = new ViGEmClient();

            if (client.connect() == null) {
                controller = client.createX360Controller();

                let err = controller.connect();

                if (err) {
                    log('error', "Error on connecting to controller:\n" + JSON.stringify(err.message));
                    return error(err);
                }

                return callback();
            }
        };

        virtual_gamepad.prototype.disconnect = function (callback) {
            if (controller) {
                controller.disconnect();
                controller = void 0;
                return callback();
            }
        };

        virtual_gamepad.prototype.sendEvent = function (event, error) {
            if (controller) {
                if (event.type === 0x03) { // Analog Stick
                    var ev_val = ((event.value / 125) - 1);
                    if (event.code === 0x00) { // X Axis
                        controller.axis.leftX.setValue(ev_val);
                    } else if (event.code == 0x01) { // Y Axis
                        controller.axis.leftY.setValue(ev_val * -1);
                    }
                } else if (event.type === 0x01) { // Button
                    if(button_maps[""+event.code]){
                        controller.button[button_maps[event.code]].setValue(event.value);
                    }
                }
                controller.update();
            }
        };

        return virtual_gamepad;

    })();

    module.exports = virtual_gamepad;

}).call(this);