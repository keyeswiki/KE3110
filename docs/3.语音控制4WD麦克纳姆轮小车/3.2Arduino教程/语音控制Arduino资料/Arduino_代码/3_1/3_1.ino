// 导入相关库文件
#include <SoftwareSerial.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // 需要 16 MHz Adafruit 固件
#endif

/*******智能语音识别模块接口*****/
const int RX_PIN = A5; // 引脚 A5 为 RX
const int TX_PIN = A4; // 引脚 A4 为 TX
SoftwareSerial mySerial(RX_PIN, TX_PIN); // 定义软件串口引脚（RX, TX）

/*******4颗WS2812全彩灯珠接口与灯珠数量*****/
const int LED_PIN = 10;  // 4颗WS2812全彩灯珠引脚
const int LED_COUNT = 4; // 新像素数
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0，确保首次判断时不触发任何指令

void setup() {
  Serial.begin(9600);  // 硬件串口（与电脑通信）
  mySerial.begin(9600);  // 软件串口（与外设通信）
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
    clock_prescale_set(clock_div_1);
  #endif
  strip.begin();  // 初始化新像素条
  strip.show();  // 关闭所有像素
  strip.setBrightness(100); // 设置亮度（最大255）
  colorWipe(strip.Color(0, 0, 0), 50);
}

void loop() {
   if (mySerial.available()) { // 检查软串口是否有来自语音模块的数据可读
      Voice_Control = mySerial.read(); // 从软串口读取多个字节的数据
      Serial.println(Voice_Control); // 将接收到的数据通过硬件串口输出到串口监视器，便于调试   
   }
   switch(Voice_Control) { // 根据接收到的指令数值，执行相应操作进行判断
    case 13: colorWipe(strip.Color(255, 0, 0), 50); break;  // 接收到的数据为13，打开红灯   
    case 14: colorWipe(strip.Color(0, 0, 0), 50); break;   // 接收到的数据为14，关闭红灯
    case 15: colorWipe(strip.Color(0, 255, 0), 50); break; // 接收到的数据为15，打开绿灯
    case 16: colorWipe(strip.Color(0, 0, 0), 50); break;   // 接收到的数据为16，关闭绿灯
    case 17: colorWipe(strip.Color(0, 0, 255), 50); break; // 接收到的数据为17，打开蓝灯
    case 18: colorWipe(strip.Color(0, 0, 0), 50); break;   // 接收到的数据为18，关闭蓝灯
    case 36: theaterChaseRainbow(50); break; // 接收到的数据为36，打开彩灯，彩虹增强型追逐型
    case 37: colorWipe(strip.Color(0, 0, 0), 50); break;   // 接收到的数据为37，关闭彩灯
  }
  // 清除指令，避免重复执行
  Voice_Control = 0;
}

// 用一种颜色填充灯带
void colorWipe(uint32_t color, int wait) {
  for(int i=0; i<strip.numPixels(); i++) { 
    strip.setPixelColor(i, color); // 设置像素颜色
    strip.show();  // 更新灯带
    delay(wait);   // 暂停
  }
}

// 彩虹增强剧院帐篷。在帧之间传递延迟时间（毫秒）。
void theaterChaseRainbow(int wait) {
  int firstPixelHue = 0;     // 第一个像素以红色开始（色调0）
  for(int a=0; a<30; a++) {  // 重复30次...
    for(int b=0; b<3; b++) { // ‘b’从0到2...
      strip.clear();         // 将RAM中的所有像素设置为0（关闭）
      // “c”从“b”开始计数，以3为增量到条带的末尾…
      for(int c=b; c<strip.numPixels(); c += 3) {
        // 像素‘c’的色调被偏移一定的量，
        // 使色轮沿着条带的长度（strip. numpixels()步骤）完整旋转一次（范围65536）：
        int hue = firstPixelHue + c * 65536L / strip.numPixels();
        uint32_t color = strip.gamma32(strip.ColorHSV(hue)); // hue -> RGB
        strip.setPixelColor(c, color); // 设置像素c的值为color
      }
      strip.show(); // 用新内容更新条带
      delay(wait);  // 暂停一会儿
      firstPixelHue += 65536 / 90; // 一个周期的色轮超过90帧
    }
  }
}

