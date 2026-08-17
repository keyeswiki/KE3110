// 导入库文件
#include <Arduino.h>
#include "AiCam.h"
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // 需要 16 MHz Adafruit 固件
#endif

const int LED_PIN = 10;  // 定义4颗WS2812灯珠的引脚
const int LED_COUNT = 4; // 新像素数
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

AiCam aiCam(A4, A5); // 定义引脚: TX接A4, RX接A5

void setup() {
   Serial.begin(115200); // 设置波特率
   aiCam.begin(); // 启动视觉AI摄像头
   
   aiCam.setAiCamMode("qr"); // 设置视觉AI摄像头为二维码识别
  
   #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
      clock_prescale_set(clock_div_1);
   #endif
   strip.begin();           // 初始化新像素条
   strip.show();            // 关闭所有像素
   strip.setBrightness(100); // 设置亮度（最大255）
   colorWipe(strip.Color(0, 0, 0), 50); // 熄灭4颗WS2812灯珠
}

void loop() {
   aiCam.readEspSerial(); // 持续读取摄像头串口数据，刷新识别缓存
   // 根据不同二维码执行对应逻辑
   if ((String(aiCam.getQrCode()) == "red")) { // 视觉AI摄像头识别"red"二维码
      colorWipe(strip.Color(255, 0, 0), 50); // 亮红色灯
   } else if ((String(aiCam.getQrCode()) == "green")) { // 视觉AI摄像头识别"green"二维码
      colorWipe(strip.Color(0, 255, 0), 50);  // 亮绿色灯
   } else if ((String(aiCam.getQrCode()) == "blue")) { // 视觉AI摄像头识别"blue"二维码
      colorWipe(strip.Color(0, 0, 255), 50);  // 亮蓝色灯
   } else if ((String(aiCam.getQrCode()) == "yellow")) { // 视觉AI摄像头识别"yellow"二维码
      colorWipe(strip.Color(255, 255, 0), 50); // 亮黄色灯
   } else if ((String(aiCam.getQrCode()) == "white")) { // 视觉AI摄像头识别"white"二维码
      colorWipe(strip.Color(255, 255, 255), 50); // 亮白色灯
   } else if ((String(aiCam.getQrCode()) == "black")) { // 视觉AI摄像头识别"black"二维码
      colorWipe(strip.Color(0, 0, 0), 50); // 熄灭
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
