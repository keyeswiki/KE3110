(() => {
    'use strict';
    goog.require('Blockly.Blocks');
    goog.require('path');

    // 媒体路径
    const _mediaDirPath = (typeof path !== 'undefined' && typeof document !== 'undefined' && document.currentScript)
        ? path.join(document.currentScript.src, '../../media/keyesAll/')
        : '../../media/keyesAll/';

    const CAR_HUE = 20;

    // ════════════════════════════════════════════════════════════
    //  LED
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['Mecanum_led'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField('LED')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'led.png', 43, 32));
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    [Blockly.Msg.ks4wd_L || '左', 'left_led'],
                    [Blockly.Msg.ks4wd_R || '右', 'right_led']
                ]), 'ledstat');
            this.appendDummyInput()
                .appendField(Blockly.Msg.Desk_on_off || '电平为')
                .appendField(new Blockly.FieldDropdown([
                    [Blockly.Msg.MIXLY_HIGH || '高', '(1)'],
                    [Blockly.Msg.MIXLY_LOW  || '低', '(0)']
                ]), 'stat');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setInputsInline(true);
        }
    };

    // ════════════════════════════════════════════════════════════
    //  运动控制
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['Mecanum_robot'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'Mecanumcar.png', 60, 60))
                .appendField(Blockly.Msg.Mecanumcar || '麦轮小车');
            this.appendDummyInput()
                .appendField(Blockly.Msg.Car_state || '小车状态为')
                .appendField(new Blockly.FieldDropdown([
                    ['前进',        'Advance()'],
                    ['后退',        'Back()'],
                    ['左转',        'Turn_Left()'],
                    ['右转',        'Turn_Right()'],
                    ['左平移',      'L_Move()'],
                    ['右平移',      'R_Move()'],
                    ['左前斜移',    'LU_Move()'],
                    ['左后斜移',    'LD_Move()'],
                    ['右前斜移',    'RU_Move()'],
                    ['右后斜移',    'RD_Move()'],
                    ['左漂移',      'drift_left()'],
                    ['右漂移',      'drift_right()'],
                    ['停止',        'Stop()']
                ]), 'stat1');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setInputsInline(true);
        }
    };

    // ════════════════════════════════════════════════════════════
    //  超声波
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['ks4wd_sr04'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.ks4wd_sr01 || '超声波')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_sr04.png', 50, 40));
            this.setInputsInline(true);
            this.setOutput(true, Number);
            this.setTooltip(Blockly.Msg.ks4wd_sr01 || '超声波测距');
        }
    };

    // ════════════════════════════════════════════════════════════
    //  舵机
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['ks4wd_servo2'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_ks4wd_SERVO || '舵机')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_servo.png', 70, 60));
            this.appendValueInput('angle')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('0~180');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setInputsInline(true);
        }
    };

    // ════════════════════════════════════════════════════════════
    //  RGB 彩灯 — 初始化
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['keyes_car_MAX_rgb_init'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_RGB || 'RGB 彩灯')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_rgb.png', 39, 32));
            this.appendValueInput('PIN')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_PIN || '引脚');
            this.appendValueInput('LEDCOUNT')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_RGB_COUNT || '灯数');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('');
        }
    };

    // ════════════════════════════════════════════════════════════
    //  RGB 彩灯 — 亮度
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['keyes_car_MAX_rgb_brightness'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_RGB || 'RGB 彩灯')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_rgb.png', 39, 32));
            this.appendValueInput('PIN')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_PIN || '引脚');
            this.appendValueInput('NUM')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_brightness || '亮度');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('');
        }
    };

    // ════════════════════════════════════════════════════════════
    //  RGB 彩灯 — 单点 RGB 值
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['keyes_car_MAX_rgb'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_RGB || 'RGB 彩灯')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_rgb.png', 39, 32));
            this.appendValueInput('PIN')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_PIN || '引脚');
            this.appendValueInput('_LED_')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_RGB_NUM || '灯号');
            this.appendValueInput('RVALUE')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_RGB_R || 'R');
            this.appendValueInput('GVALUE')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_RGB_G || 'G');
            this.appendValueInput('BVALUE')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_RGB_B || 'B');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('');
        }
    };

    // ════════════════════════════════════════════════════════════
    //  RGB 彩灯 — 选色块
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['keyes_car_MAX_rgb2'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_RGB || 'RGB 彩灯')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_rgb.png', 39, 32));
            this.appendValueInput('PIN')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_PIN || '引脚');
            this.appendValueInput('_LED_')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_RGB_NUM || '灯号');
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldColour('#ff0000'), 'RGB_LED_COLOR');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
        }
    };

    // ════════════════════════════════════════════════════════════
    //  RGB 彩灯 — 七彩变换
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['keyes_car_MAX_rgb3'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_RGB || 'RGB 彩灯')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_rgb.png', 39, 32));
            this.appendValueInput('PIN')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_PIN || '引脚');
            this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField(Blockly.Msg.MIXLY_init_brightness || '初始亮度');
            this.appendValueInput('WAIT')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_TIME_FOR_CHANGE_COLOUR || '七彩变换切换时间');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
        }
    };

    // ════════════════════════════════════════════════════════════
    //  RGB 彩灯 — 七彩循环
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['keyes_car_MAX_rgb4'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_RGB || 'RGB 彩灯')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_rgb.png', 39, 32));
            this.appendValueInput('PIN')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_PIN || '引脚');
            this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField(Blockly.Msg.MIXLY_init_brightness || '初始亮度');
            this.appendValueInput('WAIT')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(Blockly.Msg.MIXLY_TIME_FOR_LOOP_COLOUR || '七彩循环切换时间');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
        }
    };

    // ════════════════════════════════════════════════════════════
    //  循迹传感器
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['ks4wd_track'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    [Blockly.Msg.ks4wd_L_track || '左循迹传感器', 'track_left'],
                    [Blockly.Msg.ks4wd_C_track || '中循迹传感器', 'track_center'],
                    [Blockly.Msg.ks4wd_R_track || '右循迹传感器', 'track_right']
                ]), 'track');
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_xunji.png', 60, 60));
            this.setOutput(true, Number);
            this.setInputsInline(true);
            this.setTooltip('');
        }
    };

    // ════════════════════════════════════════════════════════════
    //  红外接收
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['ks4wd_ir_r'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('ir_rec'), 'VAR')
                .appendField(Blockly.Msg.ks4wd_ir_R || '红外接收模块')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_irr.png', 70, 32));
            this.appendStatementInput('DO')
                .appendField(Blockly.Msg.ks4wd_ir_RD || '红外接收数据');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setInputsInline(true);
            this.setTooltip(Blockly.Msg.ks4wd_ir_R || '红外接收');
        },
        getVars: function () {
            return [this.getFieldValue('VAR')];
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setFieldValue(newName, 'VAR');
            }
        }
    };

    // ════════════════════════════════════════════════════════════
    //  蓝牙接收
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['ks4wd_bluetooth'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('bluetooth_val'), 'VAL')
                .appendField(Blockly.Msg.ks4wd_Bluetooth || '蓝牙模块')
                .appendField(new Blockly.FieldImage(_mediaDirPath + 'ke_bluetooth.png', 70, 32));
            this.appendStatementInput('DO')
                .appendField(Blockly.Msg.ks4wd_Bluetooth_rec || '蓝牙接收数据');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setInputsInline(true);
            this.setTooltip('bluetooth');
        },
        getVars: function () {
            return [this.getFieldValue('VAL')];
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAL'))) {
                this.setFieldValue(newName, 'VAL');
            }
        }
    };

    // ════════════════════════════════════════════════════════════
    //  蓝牙读取字符串直到
    // ════════════════════════════════════════════════════════════
    Blockly.Blocks['keyes_serial_readstr_until'] = {
        init: function () {
            this.setColour(CAR_HUE);
            this.appendDummyInput()
                .appendField(Blockly.Msg.MIXLY_SERIAL_READSTR_UNTIL || '蓝牙读取字符串直到')
                .appendField(new Blockly.FieldTextInput('#'), 'CONTENT');
            this.setInputsInline(true);
            this.setOutput(true, String);
            this.setTooltip('');
        }
    };
})();
