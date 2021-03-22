// Generated by CoffeeScript 1.10.0

/*
Created by MIROOF on 04/03/2015
Virtual gamepad hub class
 */

(function() {
    var config, gamepad, log, num_gamepads, virtual_gamepad_hub;

    gamepad = require('./virtual_gamepad_vigem');

    log = require('../lib/log');

    config = require('../config');

    num_gamepads = config.ledBitFieldSequence.length;

    virtual_gamepad_hub = (function() {
      function virtual_gamepad_hub() {
        var i, j, ref;
        this.gamepads = [];
        for (i = j = 0, ref = num_gamepads - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          this.gamepads[i] = void 0;
        }
      }
  
      virtual_gamepad_hub.prototype.connectGamepad = function(callback) {
        var freeSlot, padId;
        padId = 0;
        freeSlot = false;
        while (!freeSlot && padId < num_gamepads) {
          if (!this.gamepads[padId]) {
            freeSlot = true;
          } else {
            padId++;
          }
        }
        if (!freeSlot) {
          log('warning', "Couldn't add new gamepad: no slot left.");
          return callback(-1);
        } else {
          log('info', 'Creating and connecting to gamepad number ' + padId);
          this.gamepads[padId] = new gamepad();
          return this.gamepads[padId].connect(function() {
            return callback(padId);
          }, function(err) {
            this.gamepads[padId] = void 0;
            log('error', "Couldn't connect to gamepad:\n" + JSON.stringify(err));
            return callback(-1);
          });
        }
      };
  
      virtual_gamepad_hub.prototype.disconnectGamepad = function(padId, callback) {
        if (this.gamepads[padId]) {
          return this.gamepads[padId].disconnect((function(_this) {
            return function() {
              _this.gamepads[padId] = void 0;
              return callback();
            };
          })(this));
        }
      };
  
      virtual_gamepad_hub.prototype.sendEvent = function(padId, event) {
        if (this.gamepads[padId]) {
          return this.gamepads[padId].sendEvent(event);
        }
      };
  
      return virtual_gamepad_hub;
  
    })();
  
    module.exports = virtual_gamepad_hub;
  
  }).call(this);
  