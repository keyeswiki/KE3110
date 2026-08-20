(() => {
    'use strict';
    goog.require('Blockly.Arduino');

    // ── 兼容 2.0 / 3.0 的 generator 访问方式 ──────────────────────────
    // 2.0：forBlock 不存在，直接挂在 Blockly.Arduino.xxx = function() {}
    // 3.0：forBlock['xxx'] = function(block, generator) {}
    // 兼容写法：同时注册两种方式
    function registerBlock(name, fn) {
        // 3.0 写法
        if (Blockly.Arduino.forBlock) {
            Blockly.Arduino.forBlock[name] = function (block, generator) {
                return fn.call(block, generator || Blockly.Arduino);
            };
        }
        // 2.0 写法（直接挂载）
        Blockly.Arduino[name] = function () {
            return fn.call(this, Blockly.Arduino);
        };
    }

    // ── 十六进制颜色转 R,G,B（替代 goog.color.hexToRgb，兼容 2.0/3.0）────
    function hexToRgb(hex) {
        // 支持 #RRGGBB 和 #RGB 两种格式
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        return [r, g, b];
    }

    // ── 兼容 2.0 / 3.0 的 valueToCode / statementToCode ──────────────
    function valueToCode(block, gen, name, order) {
        if (gen.valueToCode) return gen.valueToCode(block, name, order);
        return Blockly.Arduino.valueToCode(block, name, order);
    }
    function statementToCode(block, gen, name) {
        if (gen.statementToCode) return gen.statementToCode(block, name);
        return Blockly.Arduino.statementToCode(block, name);
    }
    function getVar(block, gen, fieldName) {
        if (gen.variableDB_) {
            return gen.variableDB_.getName(block.getFieldValue(fieldName), Blockly.Variables.NAME_TYPE);
        }
        return Blockly.Arduino.variableDB_.getName(block.getFieldValue(fieldName), Blockly.Variables.NAME_TYPE);
    }

    // ════════════════════════════════════════════════════════════
    //  LED
    // ════════════════════════════════════════════════════════════
    registerBlock('Mecanum_led', function (gen) {
        var led   = this.getFieldValue('ledstat');
        var state = this.getFieldValue('stat');
        gen.definitions_['include_MecanumCar_v2'] = '#include <MecanumCar_v2.h>';
        gen.definitions_['var_mecanum']            = 'mecanumCar mecanumCar(3, 2);  // sda-->3, scl-->2';
        gen.setups_['setup_mecanum_init']          = 'mecanumCar.Init();';
        return 'mecanumCar.' + led + state + ';\n';
    });

    // ════════════════════════════════════════════════════════════
    //  运动控制
    // ════════════════════════════════════════════════════════════
    registerBlock('Mecanum_robot', function (gen) {
        var state1 = this.getFieldValue('stat1');
        gen.definitions_['include_MecanumCar_v2'] = '#include <MecanumCar_v2.h>';
        gen.definitions_['var_mecanum']            = 'mecanumCar mecanumCar(3, 2);  // sda-->3, scl-->2';
        gen.setups_['setup_mecanum_init']          = 'mecanumCar.Init();';
        return 'mecanumCar.' + state1 + ';\n';
    });

    // ════════════════════════════════════════════════════════════
    //  超声波（引脚固定：Trig=12, Echo=13）
    // ════════════════════════════════════════════════════════════
    registerBlock('ks4wd_sr04', function (gen) {
        gen.setups_['setup_sr04_trig'] = 'pinMode(12, OUTPUT);';
        gen.setups_['setup_sr04_echo'] = 'pinMode(13, INPUT);';
        var funcName = 'checkdistance';
        var funcCode = 'float checkdistance() {\n'
            + '  digitalWrite(12, LOW);\n'
            + '  delayMicroseconds(2);\n'
            + '  digitalWrite(12, HIGH);\n'
            + '  delayMicroseconds(10);\n'
            + '  digitalWrite(12, LOW);\n'
            + '  float distance = pulseIn(13, HIGH) / 58.00;\n'
            + '  delay(10);\n'
            + '  return distance;\n'
            + '}\n';
        gen.definitions_[funcName] = funcCode;
        return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
    });

    // ════════════════════════════════════════════════════════════
    //  舵机（固定引脚 9）
    // ════════════════════════════════════════════════════════════
    registerBlock('ks4wd_servo2', function (gen) {
        var angle = valueToCode(this, gen, 'angle', Blockly.Arduino.ORDER_ATOMIC);
        gen.definitions_['include_Servo'] = '#include <Servo.h>';
        gen.definitions_['var_servo_9']   = 'Servo servo_9;';
        gen.setups_['setup_servo_9']      = 'servo_9.attach(9);';
        return 'servo_9.write(' + angle + ');\n';
    });

    // ════════════════════════════════════════════════════════════
    //  RGB 初始化
    // ════════════════════════════════════════════════════════════
    registerBlock('keyes_car_MAX_rgb_init', function (gen) {
        var pin   = valueToCode(this, gen, 'PIN',      Blockly.Arduino.ORDER_ATOMIC);
        var count = valueToCode(this, gen, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
        gen.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
        gen.definitions_['var_rgb_display' + pin]     = 'Adafruit_NeoPixel rgb_display_' + pin + '(' + count + ', ' + pin + ', NEO_GRB + NEO_KHZ800);';
        gen.setups_['setup_rgb_display_begin_' + pin] = 'rgb_display_' + pin + '.begin();';
        return '';
    });

    // ════════════════════════════════════════════════════════════
    //  RGB 亮度
    // ════════════════════════════════════════════════════════════
    registerBlock('keyes_car_MAX_rgb_brightness', function (gen) {
        var pin        = valueToCode(this, gen, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
        var brightness = valueToCode(this, gen, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
        return 'rgb_display_' + pin + '.setBrightness(' + brightness + ');\n';
    });

    // ════════════════════════════════════════════════════════════
    //  RGB 单点 RGB 值
    // ════════════════════════════════════════════════════════════
    registerBlock('keyes_car_MAX_rgb', function (gen) {
        var pin = valueToCode(this, gen, 'PIN',    Blockly.Arduino.ORDER_ATOMIC);
        var led = valueToCode(this, gen, '_LED_',  Blockly.Arduino.ORDER_ATOMIC);
        var r   = valueToCode(this, gen, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
        var g   = valueToCode(this, gen, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
        var b   = valueToCode(this, gen, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
        gen.definitions_['include_Adafruit_NeoPixel']   = '#include <Adafruit_NeoPixel.h>';
        gen.definitions_['var_rgb_display' + pin]       = 'Adafruit_NeoPixel rgb_display_' + pin + '(4, ' + pin + ', NEO_GRB + NEO_KHZ800);';
        gen.setups_['setup_rgb_display_begin_' + pin]   = 'rgb_display_' + pin + '.begin();';
        var code = 'rgb_display_' + pin + '.setPixelColor(' + led + ' - 1, ' + r + ', ' + g + ', ' + b + ');\n';
        code    += 'rgb_display_' + pin + '.show();\n';
        return code;
    });

    // ════════════════════════════════════════════════════════════
    //  RGB 选色块
    // ════════════════════════════════════════════════════════════
    registerBlock('keyes_car_MAX_rgb2', function (gen) {
        var pin   = valueToCode(this, gen, 'PIN',   Blockly.Arduino.ORDER_ATOMIC);
        var led   = valueToCode(this, gen, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
        var colorHex = this.getFieldValue('RGB_LED_COLOR') || '#ff0000';
        var rgb   = hexToRgb(colorHex);
        gen.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
        if (!gen.definitions_['var_rgb_display' + pin]) {
            gen.definitions_['var_rgb_display' + pin]     = 'Adafruit_NeoPixel rgb_display_' + pin + '(4, ' + pin + ', NEO_GRB + NEO_KHZ800);';
            gen.setups_['setup_rgb_display_begin_' + pin] = 'rgb_display_' + pin + '.begin();';
        }
        var code = 'rgb_display_' + pin + '.setPixelColor(' + led + ' - 1, ' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ');\n';
        code    += 'rgb_display_' + pin + '.show();\n';
        return code;
    });

    // ════════════════════════════════════════════════════════════
    //  RGB 七彩变换（rainbow）
    // ════════════════════════════════════════════════════════════
    registerBlock('keyes_car_MAX_rgb3', function (gen) {
        var pin        = valueToCode(this, gen, 'PIN',  Blockly.Arduino.ORDER_ATOMIC);
        var wait       = valueToCode(this, gen, 'WAIT', Blockly.Arduino.ORDER_ATOMIC);
        var brightness = valueToCode(this, gen, 'NUM',  Blockly.Arduino.ORDER_ATOMIC);
        gen.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
        if (!gen.definitions_['var_rgb_display' + pin]) {
            gen.definitions_['var_rgb_display' + pin]          = 'Adafruit_NeoPixel rgb_display_' + pin + '(25, ' + pin + ', NEO_GRB + NEO_KHZ800);';
            gen.setups_['setup_rgb_display_begin_' + pin]      = 'rgb_display_' + pin + '.begin();';
            gen.setups_['setup_rgb_brightness_' + pin]         = 'rgb_display_' + pin + '.setBrightness(' + brightness + ');';
        }
        gen.definitions_['func_Wheel'] =
            'uint32_t Wheel(byte WheelPos) {\n'
            + '  if (WheelPos < 85) { return rgb_display_' + pin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0); }\n'
            + '  else if (WheelPos < 170) { WheelPos -= 85; return rgb_display_' + pin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3); }\n'
            + '  else { WheelPos -= 170; return rgb_display_' + pin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3); }\n'
            + '}\n';
        gen.definitions_['func_rainbow'] =
            'void rainbow(uint8_t wait) {\n'
            + '  for (uint16_t j = 0; j < 256; j++) {\n'
            + '    for (uint16_t i = 0; i < rgb_display_' + pin + '.numPixels(); i++) {\n'
            + '      rgb_display_' + pin + '.setPixelColor(i, Wheel((i + j) & 255));\n'
            + '    }\n'
            + '    rgb_display_' + pin + '.show();\n'
            + '    delay(wait);\n'
            + '  }\n'
            + '}\n';
        return 'rainbow(' + wait + ');\n';
    });

    // ════════════════════════════════════════════════════════════
    //  RGB 七彩循环（rainbowCycle）
    // ════════════════════════════════════════════════════════════
    registerBlock('keyes_car_MAX_rgb4', function (gen) {
        var pin        = valueToCode(this, gen, 'PIN',  Blockly.Arduino.ORDER_ATOMIC);
        var wait       = valueToCode(this, gen, 'WAIT', Blockly.Arduino.ORDER_ATOMIC);
        var brightness = valueToCode(this, gen, 'NUM',  Blockly.Arduino.ORDER_ATOMIC);
        gen.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
        if (!gen.definitions_['var_rgb_display' + pin]) {
            gen.definitions_['var_rgb_display' + pin]     = 'Adafruit_NeoPixel rgb_display_' + pin + '(25, ' + pin + ', NEO_GRB + NEO_KHZ800);';
            gen.setups_['setup_rgb_display_begin_' + pin] = 'rgb_display_' + pin + '.begin();';
            gen.setups_['setup_rgb_brightness_' + pin]    = 'rgb_display_' + pin + '.setBrightness(' + brightness + ');';
        }
        gen.definitions_['func_Wheel'] =
            'uint32_t Wheel(byte WheelPos) {\n'
            + '  if (WheelPos < 85) { return rgb_display_' + pin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0); }\n'
            + '  else if (WheelPos < 170) { WheelPos -= 85; return rgb_display_' + pin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3); }\n'
            + '  else { WheelPos -= 170; return rgb_display_' + pin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3); }\n'
            + '}\n';
        gen.definitions_['func_rainbowCycle'] =
            'void rainbowCycle(uint8_t wait) {\n'
            + '  for (uint16_t j = 0; j < 256 * 5; j++) {\n'
            + '    for (uint16_t i = 0; i < rgb_display_' + pin + '.numPixels(); i++) {\n'
            + '      rgb_display_' + pin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + pin + '.numPixels()) + j) & 255));\n'
            + '    }\n'
            + '    rgb_display_' + pin + '.show();\n'
            + '    delay(wait);\n'
            + '  }\n'
            + '}\n';
        return 'rainbowCycle(' + wait + ');\n';
    });

    // ════════════════════════════════════════════════════════════
    //  循迹传感器（引脚固定：左 A0，中 A1，右 A2）
    // ════════════════════════════════════════════════════════════
    registerBlock('ks4wd_track', function (gen) {
        var type = this.getFieldValue('track');
        gen.setups_['setup_track_left']   = 'pinMode(A0, INPUT);';
        gen.setups_['setup_track_center'] = 'pinMode(A1, INPUT);';
        gen.setups_['setup_track_right']  = 'pinMode(A2, INPUT);';
        var pinMap = { track_left: 'A0', track_center: 'A1', track_right: 'A2' };
        return ['digitalRead(' + (pinMap[type] || 'A0') + ')', Blockly.Arduino.ORDER_ATOMIC];
    });

    // ════════════════════════════════════════════════════════════
    //  红外接收（引脚固定 A3）
    // ════════════════════════════════════════════════════════════
    registerBlock('ks4wd_ir_r', function (gen) {
        var variable = getVar(this, gen, 'VAR');
        var branch   = statementToCode(this, gen, 'DO');
        gen.definitions_['var_declare_' + variable]  = 'long ' + variable + ';';
        gen.definitions_['include_IRremote']         = '#include <IRremote.h>';
        gen.definitions_['var_ir_recv_A3']           = 'IRrecv irrecv(A3);\ndecode_results results;';
        gen.setups_['setup_ir_recv_A3']              = 'irrecv.enableIRIn();';
        var code = 'if (irrecv.decode(&results)) {\n';
        code    += '  ' + variable + ' = results.value;\n';
        code    += branch;
        code    += '  irrecv.resume();\n';
        code    += '}\n';
        return code;
    });

    // ════════════════════════════════════════════════════════════
    //  蓝牙接收（volatile char 全局变量，key 前缀 '0' 保证排在函数前）
    // ════════════════════════════════════════════════════════════
    registerBlock('ks4wd_bluetooth', function (gen) {
        var val    = this.getFieldValue('VAL');
        var branch = statementToCode(this, gen, 'DO');
        gen.definitions_['0var_bluetooth_' + val] = 'volatile char ' + val + ';';
        gen.setups_['setup_serial_bluetooth']     = 'Serial.begin(9600);';
        var code = 'if (Serial.available()) {\n';
        code    += '  ' + val + ' = Serial.read();\n';
        code    += branch;
        code    += '}\n';
        return code;
    });

    // ════════════════════════════════════════════════════════════
    //  蓝牙读取字符串直到
    // ════════════════════════════════════════════════════════════
    registerBlock('keyes_serial_readstr_until', function (gen) {
        var content = "'" + (this.getFieldValue('CONTENT') || '#') + "'";
        if (!gen.setups_['setup_serial_bluetooth']) {
            gen.setups_['setup_serial_bluetooth'] = 'Serial.begin(9600);';
        }
        return ['Serial.readStringUntil(' + content + ')', Blockly.Arduino.ORDER_ATOMIC];
    });

})();
