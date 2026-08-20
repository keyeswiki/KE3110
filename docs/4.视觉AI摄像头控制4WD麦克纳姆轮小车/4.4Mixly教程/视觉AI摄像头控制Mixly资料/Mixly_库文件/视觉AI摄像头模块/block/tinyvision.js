'use strict';

(function () {
    var COLOUR = '#4285F4';

    function msg(key, fallback) {
        return (Blockly.Msg && Blockly.Msg[key]) || fallback;
    }

    function setStatementShape(block) {
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
    }

    Blockly.Blocks.tinyvision_init = {
        init: function () {
            this.appendDummyInput()
                .appendField(msg('TINYVISION_INIT', '初始化 TinyVision RX'))
                .appendField(new Blockly.FieldTextInput('2'), 'RX')
                .appendField(msg('TINYVISION_TX', 'TX'))
                .appendField(new Blockly.FieldTextInput('3'), 'TX')
                .appendField(msg('TINYVISION_BAUD', '波特率'))
                .appendField(new Blockly.FieldDropdown([
                    ['9600', '9600'], ['57600', '57600'], ['115200', '115200']
                ]), 'BAUD');
            setStatementShape(this);
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_INIT', '通过串口连接 TinyVision。'));
        }
    };

    Blockly.Blocks.tinyvision_set_mode = {
        init: function () {
            this.appendDummyInput()
                .appendField(msg('TINYVISION_SET_MODE', '设置 TinyVision 模式为'))
                .appendField(new Blockly.FieldDropdown([
                    [msg('TINYVISION_MODE_FACE', '人脸跟随'), 'face'],
                    [msg('TINYVISION_MODE_COLOR', '颜色识别'), 'color'],
                    [msg('TINYVISION_MODE_QR', '二维码识别'), 'qr'],
                    [msg('TINYVISION_MODE_CARD', '卡片识别'), 'card']
                ]), 'MODE');
            setStatementShape(this);
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_SET_MODE', '切换识别模式。'));
        }
    };

    Blockly.Blocks.tinyvision_read_serial = {
        init: function () {
            this.appendDummyInput().appendField(msg('TINYVISION_READ_SERIAL', '读取 TinyVision 串口数据'));
            setStatementShape(this);
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_READ_SERIAL', '在循环中读取并解析串口数据。'));
        }
    };

    Blockly.Blocks.tinyvision_get_face_coord = {
        init: function () {
            this.appendDummyInput()
                .appendField(msg('TINYVISION_GET_FACE_COORD', '获取人脸坐标'))
                .appendField(new Blockly.FieldDropdown([['X', 'X'], ['Y', 'Y']]), 'COORD');
            this.setOutput(true, 'Number');
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_FACE_COORD', '获取 X 或 Y 坐标。'));
        }
    };

    Blockly.Blocks.tinyvision_is_face_valid = {
        init: function () {
            this.appendDummyInput().appendField(msg('TINYVISION_IS_FACE_VALID', '是否检测到有效人脸'));
            this.setOutput(true);
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_FACE_VALID', '返回人脸有效状态。'));
        }
    };

    Blockly.Blocks.tinyvision_get_color = {
        init: function () {
            this.appendDummyInput().appendField(msg('TINYVISION_GET_COLOR', '获取颜色识别结果'));
            this.setOutput(true, 'String');
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_COLOR', '返回颜色字符串。'));
        }
    };

    Blockly.Blocks.tinyvision_is_color = {
        init: function () {
            this.appendDummyInput()
                .appendField(msg('TINYVISION_IS_COLOR', '识别到的颜色是'))
                .appendField(new Blockly.FieldDropdown([
                    [msg('TINYVISION_COLOR_RED', '红色'), 'RED'],
                    [msg('TINYVISION_COLOR_YELLOW', '黄色'), 'YELLOW'],
                    [msg('TINYVISION_COLOR_BLUE', '蓝色'), 'BLUE'],
                    [msg('TINYVISION_COLOR_GREEN', '绿色'), 'GREEN']
                ]), 'COLOR');
            this.setOutput(true);
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_COLOR', '比较颜色识别结果。'));
        }
    };

    Blockly.Blocks.tinyvision_get_qrcode = {
        init: function () {
            this.appendDummyInput().appendField(msg('TINYVISION_GET_QRCODE', '获取二维码识别结果'));
            this.setOutput(true, 'String');
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_QR', '返回二维码字符串。'));
        }
    };

    Blockly.Blocks.tinyvision_get_card = {
        init: function () {
            this.appendDummyInput().appendField(msg('TINYVISION_GET_CARD', '获取卡片识别结果'));
            this.setOutput(true, 'String');
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_CARD', '返回卡片字符串。'));
        }
    };

    Blockly.Blocks.tinyvision_is_card = {
        init: function () {
            this.appendDummyInput()
                .appendField(msg('TINYVISION_IS_CARD', '识别到的卡片是'))
                .appendField(new Blockly.FieldDropdown([
                    [msg('TINYVISION_CARD_STRAIGHT', '直行'), 'STRAIGHT'],
                    [msg('TINYVISION_CARD_UTURN', '掉头'), 'UTURN'],
                    [msg('TINYVISION_CARD_LEFT', '左转'), 'LEFT'],
                    [msg('TINYVISION_CARD_RIGHT', '右转'), 'RIGHT'],
                    [msg('TINYVISION_CARD_PARKING', '停车'), 'PARKING']
                ]), 'CARD');
            this.setOutput(true);
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_CARD', '比较卡片识别结果。'));
        }
    };
}());
