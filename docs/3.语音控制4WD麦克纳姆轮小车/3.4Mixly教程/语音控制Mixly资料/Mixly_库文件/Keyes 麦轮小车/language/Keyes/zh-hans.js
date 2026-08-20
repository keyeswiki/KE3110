// 麦轮小车 — 简体中文语言包（Mixly 3.0 格式）
(() => {
    goog.require('Blockly.Lang');
    const { ZhHans } = Blockly.Lang;
    if (!Blockly.Msg) Blockly.Msg = {};

    // Mixly 3.0 方式：写入 ZhHans
    ZhHans.Mecanumcar                   = '麦轮小车';
    ZhHans.Car_state                    = '小车状态为';
    ZhHans.Desk_on_off                  = '电平为';
    ZhHans.ks4wd_L                      = '左';
    ZhHans.ks4wd_R                      = '右';
    ZhHans.ks4wd_sr01                   = '超声波';
    ZhHans.ks4wd_L_track                = '左循迹传感器';
    ZhHans.ks4wd_C_track                = '中循迹传感器';
    ZhHans.ks4wd_R_track                = '右循迹传感器';
    ZhHans.ks4wd_ir_R                   = '红外接收模块';
    ZhHans.ks4wd_ir_RD                  = '红外接收数据';
    ZhHans.ks4wd_Bluetooth              = '蓝牙模块';
    ZhHans.ks4wd_Bluetooth_rec          = '蓝牙接收数据';
    ZhHans.MIXLY_SERIAL_READSTR_UNTIL   = '蓝牙读取字符串直到';
    ZhHans.MIXLY_ks4wd_SERVO            = '舵机';
    ZhHans.MIXLY_RGB                    = 'RGB 彩灯';
    ZhHans.MIXLY_PIN                    = '引脚';
    ZhHans.MIXLY_RGB_COUNT              = '灯数';
    ZhHans.MIXLY_RGB_NUM                = '灯号';
    ZhHans.MIXLY_RGB_R                  = 'R';
    ZhHans.MIXLY_RGB_G                  = 'G';
    ZhHans.MIXLY_RGB_B                  = 'B';
    ZhHans.MIXLY_brightness             = '亮度';
    ZhHans.MIXLY_init_brightness        = '初始亮度';
    ZhHans.MIXLY_TIME_FOR_CHANGE_COLOUR = '七彩变换切换时间';
    ZhHans.MIXLY_TIME_FOR_LOOP_COLOUR   = '七彩循环切换时间';
    ZhHans.MIXLY_HIGH                   = '高';
    ZhHans.MIXLY_LOW                    = '低';

    // 同步到 Blockly.Msg（block 文件用 Blockly.Msg.xxx 访问）
    Blockly.Msg.Mecanumcar                   = ZhHans.Mecanumcar;
    Blockly.Msg.Car_state                    = ZhHans.Car_state;
    Blockly.Msg.Desk_on_off                  = ZhHans.Desk_on_off;
    Blockly.Msg.ks4wd_L                      = ZhHans.ks4wd_L;
    Blockly.Msg.ks4wd_R                      = ZhHans.ks4wd_R;
    Blockly.Msg.ks4wd_sr01                   = ZhHans.ks4wd_sr01;
    Blockly.Msg.ks4wd_L_track                = ZhHans.ks4wd_L_track;
    Blockly.Msg.ks4wd_C_track                = ZhHans.ks4wd_C_track;
    Blockly.Msg.ks4wd_R_track                = ZhHans.ks4wd_R_track;
    Blockly.Msg.ks4wd_ir_R                   = ZhHans.ks4wd_ir_R;
    Blockly.Msg.ks4wd_ir_RD                  = ZhHans.ks4wd_ir_RD;
    Blockly.Msg.ks4wd_Bluetooth              = ZhHans.ks4wd_Bluetooth;
    Blockly.Msg.ks4wd_Bluetooth_rec          = ZhHans.ks4wd_Bluetooth_rec;
    Blockly.Msg.MIXLY_SERIAL_READSTR_UNTIL   = ZhHans.MIXLY_SERIAL_READSTR_UNTIL;
    Blockly.Msg.MIXLY_ks4wd_SERVO            = ZhHans.MIXLY_ks4wd_SERVO;
    Blockly.Msg.MIXLY_RGB                    = ZhHans.MIXLY_RGB;
    Blockly.Msg.MIXLY_PIN                    = ZhHans.MIXLY_PIN;
    Blockly.Msg.MIXLY_RGB_COUNT              = ZhHans.MIXLY_RGB_COUNT;
    Blockly.Msg.MIXLY_RGB_NUM                = ZhHans.MIXLY_RGB_NUM;
    Blockly.Msg.MIXLY_RGB_R                  = ZhHans.MIXLY_RGB_R;
    Blockly.Msg.MIXLY_RGB_G                  = ZhHans.MIXLY_RGB_G;
    Blockly.Msg.MIXLY_RGB_B                  = ZhHans.MIXLY_RGB_B;
    Blockly.Msg.MIXLY_brightness             = ZhHans.MIXLY_brightness;
    Blockly.Msg.MIXLY_init_brightness        = ZhHans.MIXLY_init_brightness;
    Blockly.Msg.MIXLY_TIME_FOR_CHANGE_COLOUR = ZhHans.MIXLY_TIME_FOR_CHANGE_COLOUR;
    Blockly.Msg.MIXLY_TIME_FOR_LOOP_COLOUR   = ZhHans.MIXLY_TIME_FOR_LOOP_COLOUR;
    Blockly.Msg.MIXLY_HIGH                   = ZhHans.MIXLY_HIGH;
    Blockly.Msg.MIXLY_LOW                    = ZhHans.MIXLY_LOW;
})();
