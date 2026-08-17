'use strict';

goog.provide('Blockly.Blocks.keyesAll');
Blockly.Blocks.keyesAll.HUE = 120;

goog.provide('Blockly.Blocks.keyes_4wd');
Blockly.Blocks.keyes_4wd.HUE = 100;

goog.require('Blockly.Blocks');

//////////////////////////////Mecanum_robot////////////////////////////////

//////////////////LED////////////////

Blockly.Blocks.Mecanum_led = {
init: function() {
  this.setColour(Blockly.Blocks.keyes_4wd.HUE);
  this.appendDummyInput("")
      .appendField("LED")
      .appendField(new Blockly.FieldImage("../../media/keyesAll/led.png", 43, 32));
  this.appendDummyInput("")
      .appendField(new Blockly.FieldDropdown([['left', 'left_led'], ['right','right_led']]), "ledstat");
  this.appendDummyInput("")
      .appendField(Blockly.Desk_on_off)
      .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_HIGH,'(1)'], [Blockly.MIXLY_LOW,'(0)']]), "stat");
  this.setPreviousStatement(true);
  this.setNextStatement(true);
  this.setInputsInline(true);
  }
};

///////////////////////////Mecanum_robot////////////////
Blockly.Blocks.Mecanum_robot = {
    init: function() {
      this.setColour(Blockly.Blocks.keyes_4wd.HUE);
      this.appendDummyInput("")
          .appendField(new Blockly.FieldImage("../../media/keyesAll/Mecanumcar.png", 60, 60))
          .appendField(Blockly.Mecanumcar);
          this.appendDummyInput("")
          .appendField(Blockly.Car_state)
          .appendField(new Blockly.FieldDropdown([
            ['Advance', 'Advance()'],
            ['Back', 'Back()'],
            ['Turn_Left', 'Turn_Left()'],
            ['Turn_Right', 'Turn_Right()'],
            ['L_Move', 'L_Move()'],
            ['R_Move', 'R_Move()'],
            ['LU_Move', 'LU_Move()'],
            ['LD_Move', 'LD_Move()'],
            ['RU_Move', 'RU_Move()'],
            ['RD_Move', 'RD_Move()'],
            ['drift_left', 'drift_left()'],
            ['drift_right', 'drift_right()'],
            ['Stop', 'Stop()'],]),
            "stat1");
          
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
    }
  };



///////////////超声波/////////////////////////
Blockly.Blocks.ks4wd_sr04 = {
  init: function () {
    this.setColour(Blockly.Blocks.keyes_4wd.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.ks4wd_sr01)
    .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_sr04.png", 50, 40));
    
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
  }
};

///////////////////////////舵机///////////////////////////////////
Blockly.Blocks.ks4wd_servo2 = {
  init: function() {
    this.setColour(Blockly.Blocks.keyes_4wd.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ks4wd_SERVO)
    .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_servo.png", 70, 60));
    this.appendValueInput("angle", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("0~180");
    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};



//RGB彩灯显示模块  初始化
Blockly.Blocks.MAX_rgb_init = {
    init: function () {
        this.setColour(Blockly.Blocks.keyes_4wd.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
            .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_rgb.png", 39, 32));
        this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("LEDCOUNT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_COUNT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};
//RGB亮度调节
Blockly.Blocks.MAX_rgb_brightness = {
    init: function () {
        this.setColour(Blockly.Blocks.keyes_4wd.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
            .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_rgb.png", 39, 32));
        this.appendValueInput("PIN", Number)
           .setCheck(Number)
           .setAlign(Blockly.ALIGN_RIGHT)
           .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("NUM")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_brightness);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};
//RGB彩灯单独像素点设置
Blockly.Blocks.MAX_rgb = {
    init: function () {
        this.setColour(Blockly.Blocks.keyes_4wd.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
            .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_rgb.png", 39, 32));
        this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};
//RGB彩灯  选色块  设置颜色
Blockly.Blocks.MAX_rgb2 = {
    init: function () {
        this.setColour(Blockly.Blocks.keyes_4wd.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
            .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_rgb.png", 39, 32));
        this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
//RGB彩灯  七彩变换切换
Blockly.Blocks.MAX_rgb3 = {
    init: function () {
        this.setColour(Blockly.Blocks.keyes_4wd.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
            .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_rgb.png", 39, 32));
        this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("NUM")
            .setCheck(Number)
            .appendField(Blockly.MIXLY_init_brightness);
        this.appendValueInput("WAIT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_TIME_FOR_CHANGE_COLOUR); 
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
//RGB彩灯 七彩循环切换
Blockly.Blocks.MAX_rgb4 = {
    init: function () {
        this.setColour(Blockly.Blocks.keyes_4wd.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
            .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_rgb.png", 39, 32));
        this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("NUM")
            .setCheck(Number)
            .appendField(Blockly.MIXLY_init_brightness);
        this.appendValueInput("WAIT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_TIME_FOR_LOOP_COLOUR); 
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};




///////////循迹传感器////////////////////
Blockly.Blocks.ks4wd_track = {
  init: function() {
    this.setColour(Blockly.Blocks.keyes_4wd.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.ks4wd_L_track, "track_left"],[Blockly.ks4wd_C_track, "track_center"],[Blockly.ks4wd_R_track, "track_right"]]), 'track');
    this.appendDummyInput("")
    //.appendField("track")
    .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_xunji.png", 60, 60));
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

////////////////红外接收////////////////////////////
//红外接收模块
Blockly.Blocks.ks4wd_ir_r = {
    init: function () {
        this.setColour(Blockly.Blocks.keyes_4wd.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('ir_rec'), 'VAR')
            .appendField(Blockly.ks4wd_ir_R)
            .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_irr.png", 70, 32));
        this.appendStatementInput('DO')
            .appendField(Blockly.ks4wd_ir_RD);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

//////////////////////蓝牙////////////////////////////
Blockly.Blocks.ks4wd_bluetooth = {
    init: function () {
        this.setColour(Blockly.Blocks.keyes_4wd.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('bluetooth_val'), 'VAL')
            .appendField(Blockly.ks4wd_Bluetooth)
            .appendField(new Blockly.FieldImage("../../media/keyesAll/ke_bluetooth.png", 70, 32))
        this.appendStatementInput('DO')
            .appendField(Blockly.ks4wd_Bluetooth_rec);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip("bluetooth");
    },
    getVars: function () {
        return [this.getFieldValue('VAL')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAL'))) {
            this.setTitleValue(newName, 'VAL');
        }
    }
};

Blockly.Blocks['serial_readstr_until'] = {
    init: function() {
      this.setColour(Blockly.Blocks.keyes_4wd.HUE);
      this.appendValueInput("CONTENT", Number)
      .appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
      .appendField(Blockly.MIXLY_SERIAL_READSTR_UNTIL)
      .setCheck(Number);
      this.setInputsInline(true);
      this.setOutput(true, String);
      this.setTooltip(Blockly.MIXLY_TOOLTIP_SERIAL_READSTRUNITL.replace('%1',Blockly.Arduino.valueToCode(this, 'CONTENT',Blockly.Arduino.ORDER_ATOMIC)));
    }
  };

