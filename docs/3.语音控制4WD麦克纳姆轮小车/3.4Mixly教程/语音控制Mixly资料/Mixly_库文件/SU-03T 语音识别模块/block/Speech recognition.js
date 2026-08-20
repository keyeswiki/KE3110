/*
 * @Author: your name
 * @Date: 2021-10-07 16:21:26
 * @LastEditTime: 2023-08-20 19:18:54
 * @LastEditors: 周林军 1799198652@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \ABC\block\Speech recognition.js
 */
'use strict';
goog.provide('Blockly.Blocks.Speech recognition');
goog.require('Blockly.Blocks');
var YU_YIN=[["开灯","1"],["关灯", "2"],["调亮一点", "3"],["调暗一点", "4"],["开风扇", "5"],
["关风扇", "6"],["风大一点", "7"],["风小一点", "8"],["浇水", "9"],["停止浇水", "10"],
["播放音乐", "11"],["关闭音乐", "12"],["打开红灯", "13"],["关闭红灯", "14"],["打开绿灯", "15"],
["关闭绿灯", "16"],["打开蓝灯", "17"],["关闭蓝灯", "18"],["打开点阵", "19"],["关闭点阵", "20"],
["有人靠近", "21"],["人远离", "22"],["下雨", "23"],["停雨", "24"],["前进", "25"],
["后退", "26"],["左转", "27"],["右转", "28"],["循迹", "29"],["跟随", "30"],
["避障", "31"],["寻光", "32"],["停止", "33"],["开始喂食", "34"],["停止喂食", "35"],
["打开彩灯", "36"],["关闭彩灯", "37"],["打开蜂鸣器", "38"],["关闭蜂鸣器", "39"],["增大音量", "40"],["减小音量", "41"]
,["最大音量", "42"],["中等音量", "43"],["最小音量", "44"],["舵机角度增大", "45"],["舵机角度减少", "46"]
,["当前温度是多少", "47"],["当前湿度是多少", "48"],["当前雨水量是多少", "49"],["当前光照强度是多少", "50"],["当前土壤湿度是多少", "51"]
,["当前水位是多少", "52"],["几点了", "53"],["现在距离是多少", "54"],["开机", "55"],["关机", "56"],["打开窗户", "57"],["关闭窗户", "58"],
["打开门", "59"],["关闭门", "60"],["升旗", "61"],["降旗", "62"],["拉开窗帘", "63"],["关闭窗帘", "64"],["当前总挥发性有机物浓度是多少", "65"],
["当前二氧化碳浓度是多少", "66"],["当前空气质量指数是多少", "67"],["有人靠近请发出警报", "68"],["左移", "69"],["右移", "70"],["左上移", "71"],["左下移", "72"],["右上移", "673"],
["右下移", "74"],["左漂移", "75"],["右漂移", "76"]
];
var YU_BO=[["当前温度为", "1"],["度", "2"],["当前雨水量为百分之", "3"],["当前湿度为百分之", "4"],["当前光照强度为", "5"],
["当前土壤湿度为百分之", "6"],["当前水位为", "7"],["现在是北京时间", "8"],["当前距离为", "9"],["点", "10"],
["分", "11"],["秒", "12"],["点整", "13"],["毫升", "14"],["毫米", "15"],["厘米", "16"],
["米", "17"],["千米", "18"],["当前总挥发性有机物浓度为十亿分之", "19"],["当前二氧化碳浓度为百万分之", "20"],["当前空气质量指数为", "21"]
];

Blockly.Blocks.yuyininit = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput("")
      .appendField("初始化语音识别模块")
	this.appendDummyInput("")
	    .appendField(new Blockly.FieldDropdown([["软串口", "1"],["硬串口", "2"]]), "mode");
	this.appendDummyInput("")
      .appendField("RX为")
    this.appendValueInput("PIN1", Number)
        .setCheck(Number);
    this.appendDummyInput("")
      .appendField("TX为")
    this.appendValueInput("PIN2", Number)
      .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

//特定10进制指令词
Blockly.Blocks.yuyinshibie = {
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
	    .appendField(new Blockly.FieldDropdown(YU_YIN), "PIN");
	this.appendDummyInput("")
		.appendField("指令")
    this.setOutput(true, Number);
	this.setInputsInline(true);
    this.setTooltip('特定指令词，需刷指定的固件，指令已转为10进制');
   // this.setPreviousStatement(true);
    //this.setNextStatement(true);
  }
};


//识别到16进制指令词
Blockly.Blocks.yuyinshibie1 = {
  init: function() {
    this.setColour(120);
	this.appendValueInput("VALUE")
	    .setCheck(Number)
	    .appendField("识别到")
	this.setOutput(true, Boolean);
	//this.setInputsInline(true);
    this.setTooltip('识别到特定的指令词，也可根据需要设置16进制指令，例如：0x40');
  }
};






Blockly.Blocks.yuyinqinchu = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput("")
	    .appendField("清除识别结果")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.yuyinshuaxin = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput("")
	    .appendField("刷新识别结果")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.boxiaoshu = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput("")
	    .appendField("播报小数")
    this.appendValueInput("XIAOSHU")
      .setCheck(null)
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.bozhenshu = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput("")
	    .appendField("播报整数")
    this.appendValueInput("ZHENSHU")
      .setCheck(null)
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.yuyinbobao = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput("")
	    .appendField("播报")
	    .appendField(new Blockly.FieldDropdown(YU_BO), "PIN3");
    this.setInputsInline(true);
   // this.setTooltip('');
   // this.setOutput(true, Boolean);
    // this.setTooltip('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
