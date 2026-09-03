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
                .appendField('9600');
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
                    [msg('TINYVISION_MODE_CARD', '卡片识别'), 'card'],
                    [msg('TINYVISION_MODE_LINE', '线条识别'), 'line']
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
            this.setOutput(true, Boolean);
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
            this.setOutput(true, Boolean);
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

    Blockly.Blocks.tinyvision_is_qrcode_content = {
        init: function () {
            this.appendDummyInput()
                .appendField(msg('TINYVISION_IS_QRCODE_CONTENT', '识别到的二维码内容是'))
                .appendField(new Blockly.FieldDropdown([
                    [msg('TINYVISION_QRCODE_CONTENT_RED', '红色（red）'), 'red'],
                    [msg('TINYVISION_QRCODE_CONTENT_BLUE', '蓝色（blue）'), 'blue'],
                    [msg('TINYVISION_QRCODE_CONTENT_GREEN', '绿色（green）'), 'green'],
                    [msg('TINYVISION_QRCODE_CONTENT_YELLOW', '黄色（yellow）'), 'yellow'],
                    [msg('TINYVISION_QRCODE_CONTENT_BLACK', '黑色（black）'), 'black'],
                    [msg('TINYVISION_QRCODE_CONTENT_WHITE', '白色（white）'), 'white']
                ]), 'QRCODE_CONTENT');
            this.setOutput(true, Boolean);
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_QR_CONTENT', '比较最近一次二维码识别字符串。'));
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
            this.setOutput(true, Boolean);
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_CARD', '比较卡片识别结果。'));
        }
    };

    Blockly.Blocks.tinyvision_get_line_value = {
        init: function () {
            this.appendDummyInput()
                .appendField(msg('TINYVISION_GET_LINE_VALUE', '获取线条'))
                .appendField(new Blockly.FieldDropdown([
                    [msg('TINYVISION_LINE_OFFSET', '偏移'), 'Offset'],
                    [msg('TINYVISION_LINE_ANGLE', '角度'), 'Angle'],
                    [msg('TINYVISION_LINE_VALID', '有效状态'), 'Valid']
                ]), 'VALUE')
                .appendField(msg('TINYVISION_LINE_VALUE_SUFFIX', '值'));
            this.setOutput(true, 'Number');
            this.setColour(COLOUR);
            this.setTooltip(msg('TINYVISION_TOOLTIP_LINE', '返回最近一次巡线数据的偏移、角度或有效状态值。'));
        }
    };
}());
