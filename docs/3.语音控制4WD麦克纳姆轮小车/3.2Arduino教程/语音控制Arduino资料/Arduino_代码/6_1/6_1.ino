// 导入相关库文件
#include <SoftwareSerial.h>
#include "MecanumCar_v2.h"
#include "Servo.h"
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

/*******七彩灯与4个电机接口*****/
mecanumCar mecanumCar(3, 2);  // sda-->D3,scl-->D2

/*******舵机接口*****/
const int SERVO_PIN = 9;  // 舵机信号引脚
Servo myservo;    // 定义一个舵机类实例

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0，确保首次判断时不触发任何指令

void setup() {
  Serial.begin(9600);  // 硬件串口（与电脑通信）
  mySerial.begin(9600);  // 软件串口（与外设通信）
  myservo.attach(SERVO_PIN);  // 将D9上的舵机附加到舵机对象上
  myservo.write(90); // 转动到90度
  delay(300);  // 延时0.3秒
  mecanumCar.Init(); // 初始化七彩灯与电机驱动
  mecanumCar.Stop(); // 小车停止
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
    clock_prescale_set(clock_div_1);
  #endif
  strip.begin();  // 初始化新像素条
  strip.show();  // 关闭所有像素
  strip.setBrightness(100); // 设置亮度（最大255）
  colorWipe(strip.Color(0, 0, 0), 50);
}

void loop() {
  if (mySerial.available()) {  // 检查软串口是否有来自语音模块的数据可读
     Voice_Control = mySerial.read();  // 从软串口读取多个字节的数据      
     Serial.println(Voice_Control);  // 将接收到的数据通过硬件串口输出到串口监视器，便于调试
  }
  if (Voice_Control == 25) {  // 根据接收到的指令值25，执行相应操作
    mecanumCar.Advance(); // 小车前进
    colorWipe(strip.Color(255, 0, 0), 50); // 打开红灯
  } else if (Voice_Control == 26) {  // 根据接收到的指令值26，执行相应操作
    mecanumCar.Back(); // 小车后退
    colorWipe(strip.Color(0, 255, 0), 50); // 打开绿灯
  } else if (Voice_Control == 27) {  // 根据接收到的指令值27，执行相应操作
    mecanumCar.Turn_Left(); // 小车左转
    colorWipe(strip.Color(0, 0, 255), 50); // 打开蓝灯
  } else if (Voice_Control == 28) {  // 根据接收到的指令值28，执行相应操作
    mecanumCar.Turn_Right(); // 小车右转
    colorWipe(strip.Color(0, 0, 255), 50); // 打开黄灯
  } else if (Voice_Control == 33) {  // 根据接收到的指令值33，执行相应操作
    mecanumCar.Stop(); // 停止
    colorWipe(strip.Color(0, 0, 0), 50);  // 关闭灯
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
