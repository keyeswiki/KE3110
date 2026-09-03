'use strict';

(function () {
    var Arduino = Blockly.Arduino;

    function register(type, generator) {
        Arduino[type] = generator;
        if (Arduino.forBlock) {
            Arduino.forBlock[type] = function (block, activeGenerator) {
                return generator.call(activeGenerator || Arduino, block);
            };
        }
    }

    function safePin(value, fallback) {
        var text = String(value === undefined ? fallback : value).trim();
        return /^(?:[0-9]{1,3}|A[0-9]{1,2})$/.test(text) ? text : String(fallback);
    }

    function safeChoice(value, choices, fallback) {
        var text = String(value === undefined ? fallback : value);
        return choices.indexOf(text) !== -1 ? text : fallback;
    }

    register('tinyvision_init', function (block) {
        var rx = safePin(block.getFieldValue('RX'), '2');
        var tx = safePin(block.getFieldValue('TX'), '3');
        var baud = '9600';

        // Mixly 3.0 rc0 会忽略 includes_；头文件必须进入 definitions_ 才会实际输出。
        Arduino.definitions_.tinyvision_library = '#include <AiCam.h>';
        Arduino.definitions_.tinyvision_instance = 'AiCam aiCam(' + rx + ', ' + tx + ');';
        Arduino.setups_.tinyvision_usb_serial = 'Serial.begin(' + baud + ');\n';
        Arduino.setups_.tinyvision_begin = 'aiCam.begin(' + baud + ');\n';
        return '';
    });

    register('tinyvision_set_mode', function (block) {
        var mode = safeChoice(block.getFieldValue('MODE'), ['face', 'color', 'qr', 'card', 'line'], 'face');
        return 'aiCam.setAiCamMode("' + mode + '");\n';
    });

    register('tinyvision_read_serial', function () {
        return 'aiCam.readEspSerial();\n';
    });

    register('tinyvision_get_face_coord', function (block) {
        var coord = safeChoice(block.getFieldValue('COORD'), ['X', 'Y'], 'X');
        return ['aiCam.getFace' + coord + '()', Arduino.ORDER_ATOMIC];
    });

    register('tinyvision_is_face_valid', function () {
        return ['aiCam.isFaceValid()', Arduino.ORDER_ATOMIC];
    });

    register('tinyvision_get_color', function () {
        return ['aiCam.getColor()', Arduino.ORDER_ATOMIC];
    });

    register('tinyvision_is_color', function (block) {
        var colour = safeChoice(block.getFieldValue('COLOR'), ['RED', 'YELLOW', 'BLUE', 'GREEN'], 'RED');
        return ['(String(aiCam.getColor()) == "' + colour + '")', Arduino.ORDER_ATOMIC];
    });

    register('tinyvision_get_qrcode', function () {
        return ['aiCam.getQrCode()', Arduino.ORDER_ATOMIC];
    });

    register('tinyvision_is_qrcode_content', function (block) {
        var content = safeChoice(block.getFieldValue('QRCODE_CONTENT'), ['red', 'blue', 'green', 'yellow', 'black', 'white'], 'red');
        return ['(String(aiCam.getQrCode()) == "' + content + '")', Arduino.ORDER_ATOMIC];
    });

    register('tinyvision_get_card', function () {
        return ['aiCam.getCard()', Arduino.ORDER_ATOMIC];
    });

    register('tinyvision_is_card', function (block) {
        var card = safeChoice(block.getFieldValue('CARD'), ['STRAIGHT', 'UTURN', 'LEFT', 'RIGHT', 'PARKING'], 'STRAIGHT');
        return ['(String(aiCam.getCard()) == "' + card + '")', Arduino.ORDER_ATOMIC];
    });

    register('tinyvision_get_line_value', function (block) {
        var value = safeChoice(block.getFieldValue('VALUE'), ['Offset', 'Angle', 'Valid'], 'Offset');
        return ['aiCam.getLine' + value + '()', Arduino.ORDER_ATOMIC];
    });
}());
