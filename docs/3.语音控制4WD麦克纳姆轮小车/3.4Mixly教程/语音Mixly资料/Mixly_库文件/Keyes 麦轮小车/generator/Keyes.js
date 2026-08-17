'use strict';

goog.provide('Blockly.Arduino.Keyes');

goog.require('Blockly.Arduino');


///////////////////////////////Mecanum_robot/////////////////////////////////////////////////
/////////////////////////led///////////////////////
Blockly.Arduino.Mecanum_led = function (block) {
  var led = this.getFieldValue('ledstat');
  var state = this.getFieldValue('stat');

  Blockly.Arduino.definitions_['MecanumCar_v2'] = '#include <MecanumCar_v2.h>\n';
  Blockly.Arduino.definitions_[`mecanum`] = 'mecanumCar mecanumCar(3, 2);  //sda-->3,scl-->2\n';

  Blockly.Arduino.setups_[`motor130_s`] = 'mecanumCar.Init();\n';

  var code = 'mecanumCar.'+led+''+state+';\n';

  return code;

};

////////////////////////////////Mecanum_robot/////////////////////////
Blockly.Arduino.Mecanum_robot = function() {
  
  var state1 = this.getFieldValue('stat1');

  Blockly.Arduino.definitions_['MecanumCar_v2'] = '#include <MecanumCar_v2.h>\n';
  Blockly.Arduino.definitions_[`mecanum`] = 'mecanumCar mecanumCar(3, 2);  //sda-->3,scl-->2\n';

  Blockly.Arduino.setups_[`motor130_s`] = 'mecanumCar.Init();\n';

  var code = 'mecanumCar.'+state1+';\n';

  return code;

};


///////////////////////超声波//////////////////////
Blockly.Arduino.ks4wd_sr04 = function () {
    Blockly.Arduino.setups_['setup_output_T'] = 'pinMode(12, OUTPUT);';
    Blockly.Arduino.setups_['setup_output_E'] = 'pinMode(13, INPUT);';
    var funcName = 'checkdistance';
    var code = 'float' + ' ' + funcName + '() {\n'
  + '  digitalWrite(12, LOW);\n' + '  delayMicroseconds(2);\n'
  + '  digitalWrite(12, HIGH);\n' + '  delayMicroseconds(10);\n'
  + '  digitalWrite(12, LOW);\n'
  + '  float distance = pulseIn(13, HIGH) / 58.00;\n'
  + '  delay(10);\n' + '  return distance;\n'
  + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
};


  //RGB彩灯模块（含灯带，点阵，环形灯等）
  Blockly.Arduino.MAX_rgb_init=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '('+ value_ledcount +','+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    //Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return '';
};
Blockly.Arduino.MAX_rgb_brightness = function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var value_brightness = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);  
  var code = 'rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');';
    return code;
};

Blockly.Arduino.MAX_rgb=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value__led_ = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_rgb_MAX'+dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_MAX_'+dropdown_rgbpin+'(4,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_MAX_begin_'+dropdown_rgbpin] ='rgb_MAX_'+dropdown_rgbpin+'.begin();';
  //Blockly.Arduino.setups_['setup_rgb_MAX_setpin'+dropdown_rgbpin] ='rgb_MAX_'+dropdown_rgbpin+'.setPin('+dropdown_rgbpin+');';
  
  var code = 'rgb_MAX_'+dropdown_rgbpin+'.setPixelColor('+value__led_+'-1, '+value_rvalue+','+value_gvalue+','+value_bvalue+');\n';
  code+='rgb_MAX_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.MAX_rgb2=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var color = goog.color.hexToRgb(this.getFieldValue('RGB_LED_COLOR'));
    //Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
   if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '(4,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';

  }
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
  code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.MAX_rgb3=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
  var value_brightness = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
   if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '(25,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
     '(25,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
    Blockly.Arduino.setups_['setup_rgb_display_setBrightness' + dropdown_rgbpin]  = 'rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');';
  }
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
      code2 += 'if(WheelPos < 85) {return rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
      code2 += 'else if(WheelPos < 170) {WheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
    code2 += 'else {WheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
      code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  
  var funcName3 = 'rainbow';
  var code3  = 'void rainbow(uint8_t wait) { uint16_t i, j;\n';
      code3 += '      for(j=0; j<256; j++) {               \n';
      code3 += '        for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++) {\n';
      code3 += '         rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));}\n';                    
      code3 += '      rgb_display_'+dropdown_rgbpin+'.show();\n';
      code3 += '      delay(wait);}}\n';
  
  Blockly.Arduino.definitions_[funcName3] = code3;
  
  var code = 'rainbow('+ wait_time+');\n'
  return code;
};

Blockly.Arduino.MAX_rgb4=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
  var value_brightness = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
   if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '(25,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
      
    Blockly.Arduino.setups_['setup_rgb_display_setBrightness' + dropdown_rgbpin]  = 'rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');';
  }
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
      code2 += 'if(WheelPos < 85) {return rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
      code2 += 'else if(WheelPos < 170) {WheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
    code2 += 'else {WheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
      code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  
  var funcName3 = 'rainbow';
  var code3  = 'void rainbow(uint8_t wait) { uint16_t i, j;\n';
      code3 += '      for(j=0; j<256; j++) {               \n';
      code3 += '        for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++) {\n';
      code3 += '         rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));}\n';                    
      code3 += '      rgb_display_'+dropdown_rgbpin+'.show();\n';
      code3 += '      delay(wait);}}\n';
  
  Blockly.Arduino.definitions_[funcName3] = code3;
  
   var funcName4 = 'rainbowCycle';
   var code4  = 'void rainbowCycle(uint8_t wait) {uint16_t i, j;\n';
       code4 += '    for(j=0; j<256*5; j++) { // 5 cycles of all colors on wheel\n';
       code4 += '      for(i=0; i< rgb_display_'+dropdown_rgbpin+'.numPixels(); i++) {\n';
       code4 += '        rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel(((i * 256 / rgb_display_'+dropdown_rgbpin+'.numPixels()) + j) & 255));}\n';
       code4 += '     rgb_display_'+dropdown_rgbpin+'.show();\n';
       code4 += '     delay(wait);}}\n';
  
   Blockly.Arduino.definitions_[funcName4] = code4;

  var code = 'rainbowCycle('+ wait_time+');\n'
  return code;
};


Blockly.Arduino.MAX_display_Matrix_DisplayChar = function() {

    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'RGBArray', Blockly.Arduino.ORDER_ASSIGNMENT);
    var value_brightness = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    //Blockly.Arduino.definitions_['RGBArray'] = 'uint8_t  RGBArray[16][3];';
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
        Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +'(25,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
        Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
        Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
        Blockly.Arduino.setups_['setup_rgb_display_setBrightness' + dropdown_rgbpin]  = 'rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');';
    }
    var code='rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');\n';
    code+='for(int i=0; i<25; i++)\n';
    code+='{\n'
    code+='rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, '+dotMatrixArray+'[i][0],'+dotMatrixArray+'[i][1],'+dotMatrixArray+'[i][2]);\n';
    code+='}\n'
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    code+='delay(100);\n';
    return code;
  };
  
  Blockly.Arduino.MAX_display_Matrix_LedArray = function() {
    var varName = this.getFieldValue('VAR');
    var code = '{';
    for (var i = 1; i < 6; i++) {    
      for (var j = 1; j < 6; j++) {
      code +='\n          {';
        code += goog.color.hexToRgb(this.getFieldValue('RGB_' + i + j));
      code +='}';
       if (i==5&&j==5) {} else code +=',' 
      }  
     }
      code += '};'; 
    Blockly.Arduino.definitions_[varName] = "uint8_t  " + varName + "[25][3]=" + code;
    return [varName, Blockly.Arduino.ORDER_ATOMIC]; 
  }
  Blockly.Arduino.MAX_display_Matrix_DisplayLedBar = function() {
  
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'RGBArray', Blockly.Arduino.ORDER_ASSIGNMENT);
    var value_brightness = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    //Blockly.Arduino.definitions_['RGBArray'] = 'uint8_t  RGBArray[16][3];';
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
        Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '(5,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
        Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
        Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
        Blockly.Arduino.setups_['setup_rgb_display_setBrightness' + dropdown_rgbpin]  = 'rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');';
    }
    var code='rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');\n';
    code+='for(int i=0; i<5; i++)\n';
    code+='{\n'
    code+='rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, '+dotMatrixArray+'[i][0],'+dotMatrixArray+'[i][1],'+dotMatrixArray+'[i][2]);\n';
    code+='}\n'
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    code+='delay(100);\n';
    return code;
  };
  Blockly.Arduino.MAX_display_Matrix_LedBar = function() {
    var varName = this.getFieldValue('VAR');
    var code = '{';
      for (var j = 1; j < 6; j++) {
      code +='\n          {';
        code += goog.color.hexToRgb(this.getFieldValue('RGB_' + j));
      code +='}';
       if (j==5) {} else code +=',' 
      }  
      code += '};'; 
    Blockly.Arduino.definitions_[varName] = "uint8_t  " + varName + "[5][3]=" + code;
    return [varName, Blockly.Arduino.ORDER_ATOMIC]; 
  }
  
  Blockly.Arduino.MAX_display_Matrix_DisplayChar2 = function() {
  
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'RGBArray_dot', Blockly.Arduino.ORDER_ASSIGNMENT);
    var value_brightness = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    var color= goog.color.hexToRgb(this.getFieldValue('RGB_DOT_COLOR'));
    
   // Blockly.Arduino.definitions_['rgb_color'] = "uint8_t  rgb_color[3]={" + color+'}\n;';
  
  
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
        Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin  + '(25,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
        Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
        Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
        Blockly.Arduino.setups_['setup_rgb_display_setBrightness' + dropdown_rgbpin]  = 'rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');';
    }
    var code='rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');\n';
    code+='for(int i=0; i<25; i++)\n';
    code+='{\n'
    code+='rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, '+dotMatrixArray+'[i]*'+color[0]+','+dotMatrixArray+'[i]*'+color[1]+','+dotMatrixArray+'[i]*'+color[2]+');\n';
    code+='}\n'
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    code+='delay(100);\n';
    return code;
  };
  
  Blockly.Arduino.MAX_display_Matrix_LedArray2 = function() {
    var varName = this.getFieldValue('VAR');
    //var RGB_ = new Array();
    var code = '{';
    for (var i = 1; i < 6; i++) {    
      for (var j = 1; j < 6; j++) {
      code +='';
        code += (this.getFieldValue('DOT_' + i + j) == "TRUE") ? 1 : 0;
      code +='';
       if (i==5&&j==5) {} else code +=',' 
      }  
     }
      code += '};';
    
    //Blockly.Arduino.definitions_[this.id] = "byte LedArray_"+clearString(this.id)+"[]="+code;
    Blockly.Arduino.definitions_[varName] = "uint8_t  " + varName + "[25]=" + code;
    //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
    return [varName, Blockly.Arduino.ORDER_ATOMIC]; 
  }
  Blockly.Arduino.MAX_display_Matrix_DisplayBar2 = function() {
  
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'RGBArray_dot', Blockly.Arduino.ORDER_ASSIGNMENT);
    var value_brightness = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    var color= goog.color.hexToRgb(this.getFieldValue('RGB_DOT_COLOR'));
    
   // Blockly.Arduino.definitions_['rgb_color'] = "uint8_t  rgb_color[3]={" + color+'}\n;';
  
  
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
        Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '(5,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
        Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
        Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
        Blockly.Arduino.setups_['setup_rgb_display_setBrightness' + dropdown_rgbpin]  = 'rgb_display_'+dropdown_rgbpin+'.setBrightness('+value_brightness+');';
    }
    var code='';
    code+='for(int i=0; i<5; i++)\n';
    code+='{\n'
    code+='rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, '+dotMatrixArray+'[i]*'+color[0]+','+dotMatrixArray+'[i]*'+color[1]+','+dotMatrixArray+'[i]*'+color[2]+');\n';
    code+='}\n'
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    code+='delay(100);\n';
    return code;
  };
  
  Blockly.Arduino.MAX_display_Matrix_LedBar2 = function() {
    var varName = this.getFieldValue('VAR');
    //var RGB_ = new Array();
    var code = '{';
   
      for (var j = 1; j < 6; j++) {
      code +='';
        code += (this.getFieldValue('DOT_'  + j) == "TRUE") ? 1 : 0;
      code +='';
       if (j==5) {} else code +=',' 
      }  
      code += '};';
    
    //Blockly.Arduino.definitions_[this.id] = "byte LedArray_"+clearString(this.id)+"[]="+code;
    Blockly.Arduino.definitions_[varName] = "uint8_t  " + varName + "[5]=" + code;
    //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
    return [varName, Blockly.Arduino.ORDER_ATOMIC]; 
  }
  
  Blockly.Arduino.MAX_display_Matrix_CLEAR = function() {
  
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'RGBArray', Blockly.Arduino.ORDER_ASSIGNMENT);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
        Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '(25,'+ dropdown_rgbpin +', NEO_GRB + NEO_KHZ800);';
        Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
        Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    }
    var code='';
    code+='for(int i=0; i<25; i++)\n';
    code+='{\n'
    code+='rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, 0,0,0);\n';
    code+='}\n'
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    code+='delay(100);\n';
    return code;
  };


//////////////////////////循迹模块///////////////////////////
Blockly.Arduino.ks4wd_track = function() {
  var dropdown_type = this.getFieldValue('track');
  Blockly.Arduino.setups_['setup_output_trackleft'] = 'pinMode(A0, INPUT);';
  Blockly.Arduino.setups_['setup_output_trackcenter'] = 'pinMode(A1, INPUT);';
  Blockly.Arduino.setups_['setup_output_trackright'] = 'pinMode(A2, INPUT);';

  var code = '';
  if (dropdown_type == "track_left") code += 'digitalRead(A0)';
  if (dropdown_type == "track_center") code += 'digitalRead(A1)';
  if (dropdown_type == "track_right") code += 'digitalRead(A2)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};




///////////////////////////////舵机2/////////////////////////
  Blockly.Arduino.ks4wd_servo2 = function() {

  var value_degree = Blockly.Arduino.valueToCode(this, 'angle', Blockly.Arduino.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  //delay_time = delay_time.replace('(','').replace(')','');
  
  Blockly.Arduino.definitions_['1include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['2var_servo'] = 'Servo servo_9;';
  Blockly.Arduino.setups_['setup_servo'] = 'servo_9.attach(9);';
  
  var code = 'servo_9.write('+value_degree+');\n';
  return code;
};




///////////////////////红外接收///////////////////
Blockly.Arduino.ks4wd_ir_r = function () {
    var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['var_declare' + variable] = 'long ' + variable + ';';
    //var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
       Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['1include_IRremote'] = '#include <IRremote.h>\n';
    //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
    Blockly.Arduino.definitions_['2var_ir_recv_A0'] = 'IRrecv irrecv(A3);\ndecode_results results;\n';
    Blockly.Arduino.setups_['setup_ir_recv_A0'] = 'irrecv.enableIRIn();';
    var code = "if (irrecv.decode(&results)) {\n"
    code += '  ' + variable + '=results.value;\n';
    code += '  String type="UNKNOWN";\n';
    ////////////////////////////////////////////////////////////////
    code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
    code += '  if(results.decode_type>=1&&results.decode_type<=13){\n';
    code += '    type=typelist[results.decode_type];\n'
    code += '  }\n';
    code += '  Serial.print("IR TYPE:"+type+"  ");\n';
    code += branch;
    code += '  irrecv.resume();\n'
    code += '} else {\n';
    code += branch2;
    code += '}\n';
    return code;
};

/////////////////////////////////////蓝牙////////////////////////////////////
Blockly.Arduino.ks4wd_bluetooth = function () {
  var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAL'), Blockly.Variables.NAME_TYPE);
  var val = this.getFieldValue('VAL');
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  //var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  //var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);


  //Blockly.Arduino.definitions_['include_Soft'] = '#include <SoftwareSerial.h>\n';
  //Blockly.Arduino.definitions_['mySerial'] = 'SoftwareSerial mySerial(0, 1);\n';
  Blockly.Arduino.definitions_['1char'] = 'char '+val+';\n';

   var code = 'if (Serial.available())\n{\n  '+val+' = Serial.read();\n';
   code += branch;
   code += '}\n';
  return code;
};


Blockly.Arduino.serial_readstr_until = function () {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
  if (Blockly.Arduino.setups_['setup_serial_' + serial_select]) {
  } else {
      Blockly.Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + profile.default.serial + ');';
  }
  var code = serial_select + ".readStringUntil(" + content + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

///////////////////////////////Mecanum_robot/////////////////////////////////////////////////






