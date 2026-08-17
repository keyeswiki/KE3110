// 导入库文件
#include <Arduino.h>
#include "AiCam.h"
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // 需要 16 MHz Adafruit 固件
#endif

AiCam aiCam(A4, A5); // 定义引脚: TX接A4,RX接A5

const int LED_PIN = 10;  // 定义4颗WS2812灯珠引脚
const int LED_COUNT = 4; // 新像素数
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
   Serial.begin(115200); // 设置波特率为115200
   aiCam.begin(); // 启动视觉AI摄像头
   aiCam.setAiCamMode("color"); // 设置视觉AI摄像头识别模式为颜色识别

   #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
     clock_prescale_set(clock_div_1);
   #endif
   strip.begin();           // 初始化新像素条
   strip.show();            // 关闭所有像素
   strip.setBrightness(100); // 设置亮度（最大255）
   colorWipe(strip.Color(0, 0, 0), 50);
}

void loop() {
   aiCam.readEspSerial(); // 读取视觉AI摄像头串口数据
   if ((String(aiCam.getColor()) == "RED")) { // 视觉AI摄像头识别红色
      colorWipe(strip.Color(255, 0, 0), 50);  // 亮红色灯
   } else if ((String(aiCam.getColor()) == "GREEN")) { // 视觉AI摄像头识别绿色
      colorWipe(strip.Color(0, 255, 0), 50);  // 亮绿色灯
   } else if ((String(aiCam.getColor()) == "BLUE")) { // 视觉AI摄像头识别蓝色
      colorWipe(strip.Color(0, 0, 255), 50);  // 亮蓝色灯
   } else if ((String(aiCam.getColor()) == "YELLOW")) { // 视觉AI摄像头识别黄色
     colorWipe(strip.Color(255, 255, 0), 50); // 亮黄色灯
   } else { // 视觉AI摄像头未识别这4种颜色 
     colorWipe(strip.Color(0, 0, 0), 50); // 不亮
   }
   delay(80); // 防抖延时，避免反复快速识别
}

// 用一种颜色填充灯带
void colorWipe(uint32_t color, int wait) {
  for(int i=0; i<strip.numPixels(); i++) { 
    strip.setPixelColor(i, color); // 设置像素颜色
    strip.show();                  // 更新灯带
    delay(wait);                   // 暂停
  }
}
