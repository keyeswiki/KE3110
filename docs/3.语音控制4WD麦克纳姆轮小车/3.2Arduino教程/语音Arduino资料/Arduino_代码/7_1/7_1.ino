// 导入相关库文件
#include <SoftwareSerial.h>
#include "MecanumCar_v2.h"
#include "Servo.h"
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // 需要 16 MHz Adafruit Trinket
#endif

/*******智能语音识别模块接口*****/
const int RX_PIN = A5; // 引脚 A5 为 RX
const int TX_PIN = A4; // 引脚 A4 为 TX
SoftwareSerial mySerial(RX_PIN, TX_PIN); // 定义软件串口引脚（RX, TX）

/*******七彩灯与4个电机接口*****/
mecanumCar mecanumCar(3, 2);  //sda-->D3,scl-->D2

/*******舵机接口*****/
const int SERVO_PIN = 9;  // 舵机信号引脚
Servo myservo;    // 定义一个舵机类实例

/*******4颗WS2812全彩灯珠接口与灯珠数量*****/
const int LED_PIN = 10;  // SK6812 RGB模块引脚
const int LED_COUNT = 4; // 新像素数
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

/*******超声波传感器接口*****/
const int EchoPin = 13;  // Echo 连接 D13
const int TrigPin = 12;  // Trig 连接 D12

/*******循迹传感器引脚定义**********/
const int SensorLeft = A0;   // 左传感器输入引脚
const int SensorMiddle = A1; // 中间传感器输入引脚
const int SensorRight = A2;  // 右侧传感器输入引脚

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0，确保首次判断时不触发任何指令

void setup() {
  Serial.begin(9600);  // 硬件串口（与电脑通信）
  mySerial.begin(9600);  // 软件串口（与外设通信）
  pinMode(EchoPin, INPUT);    // Echo引脚设置为输入模式
  pinMode(TrigPin, OUTPUT);   // Trig引脚设置为输出模式
  pinMode(SensorLeft, INPUT); // 设置左边循迹传感器的接口为输入模式
  pinMode(SensorMiddle, INPUT); // 设置中间循迹传感器的接口为输入模式
  pinMode(SensorRight, INPUT); // 设置右边循迹传感器的接口为输入模式
  myservo.attach(SERVO_PIN);  // 将D9上的舵机附加到舵机对象上
  myservo.write(90); // 设定舵机初始角度为90°
  delay(500);
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
    clock_prescale_set(clock_div_1);
  #endif
  strip.begin();  // 初始化新像素条
  strip.show();  // 关闭所有像素
  strip.setBrightness(100); // 设置亮度（最大255）
  colorWipe(strip.Color(0, 0, 0), 50);
  mecanumCar.Init(); //初始化七彩灯与电机驱动
}

void loop() {
    if (mySerial.available()) { // 检查软串口是否有来自语音模块的数据可读
    Voice_Control = mySerial.read(); // 从软串口读取多个字节的数据
    Serial.println(Voice_Control); // 将接收到的数据通过硬件串口输出到串口监视器，便于调试   
    }
    switch (Voice_Control) {
      /*********************小车行驶************************/
      case 33: mecanumCar.Stop();       break;  // 停止
      case 25: mecanumCar.Advance();    break;  // 前进
      case 26: mecanumCar.Back();       break;  // 后退
      case 27: mecanumCar.Turn_Left();  break;  // 左转
      case 28: mecanumCar.Turn_Right(); break;  // 右转
      case 69: mecanumCar.L_Move();     break;  // 左移
      case 70: mecanumCar.R_Move();     break;  // 右移
      case 71: mecanumCar.LU_Move();    break;  // 左上移
      case 72: mecanumCar.LD_Move();    break;  // 左下移
      case 73: mecanumCar.RU_Move();    break;  // 右上移
      case 74: mecanumCar.RD_Move();    break;  // 右下移
      case 75: mecanumCar.drift_left(); break;  // 左漂移
      case 76: mecanumCar.drift_right(); break; // 右漂移
      case 29: Line_Tracking();   break;  //循迹
      case 30: ult_following();   break;  //跟随
      case 31: ult_avoiding();    break;  //避障

      /*********************小车灯光*************************/
      case 1: mecanumCar.left_led(1);  mecanumCar.right_led(1); break; // 开启七彩灯
      case 2: mecanumCar.left_led(0);  mecanumCar.right_led(0); break; // 关闭七彩灯
      case 13: colorWipe(strip.Color(255, 0, 0), 50); break;  // 打开红灯   
      case 14: colorWipe(strip.Color(0, 0, 0), 50); break;   // 关闭红灯
      case 15: colorWipe(strip.Color(0, 255, 0), 50); break; // 打开绿灯
      case 16: colorWipe(strip.Color(0, 0, 0), 50); break;   // 关闭绿灯
      case 17: colorWipe(strip.Color(0, 0, 255), 50); break; // 打开蓝灯
      case 18: colorWipe(strip.Color(0, 0, 0), 50); break;   // 关闭蓝灯
      case 36: theaterChaseRainbow(50); break;  // 打开彩灯，彩虹增强型追逐型
      case 37: colorWipe(strip.Color(0, 0, 0), 50); break;   // 关闭彩灯
      default:  break; // 无有效指令不动作
    }
}

/*********************4颗 WS2812 全彩灯珠显示*******************************/
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

/*********************循迹模式*******************************/
void Line_Tracking(void) {  //循黑线
  while (1){
    uint8_t SL = digitalRead(SensorLeft);   //读取左边巡线传感器的值
    uint8_t SM = digitalRead(SensorMiddle); //读取中间巡线传感器的值
    uint8_t SR = digitalRead(SensorRight);  //读取右边巡线传感器的值
    if (SM == HIGH) {
      if (SL == LOW && SR == HIGH) {  // 右边是黑色，左边是白色，向右转
        mecanumCar.Turn_Right();
      } else if (SR == LOW && SL == HIGH) {  // 左边是黑色，右边是白色，左转
        mecanumCar.Turn_Left();
      } else {  // 两边都是白色的，向前走
        mecanumCar.Advance();
      }
    } else {
      if (SL == LOW && SR == HIGH) { // 右边是黑色，左边是白色，向右转
        mecanumCar.Turn_Right();
      } else if (SL == HIGH && SR == LOW) {  // 右边是白色，左边是黑色，左转
        mecanumCar.Turn_Left();
      } else { // 全白色,停止
        mecanumCar.Stop();
      }
    }
    // 实时检测是否收到停止指令 33
    if (mySerial.available()) {
      Voice_Control = mySerial.read();
      if (Voice_Control == 33) {
        mecanumCar.Stop();
        Serial.println("退出避障模式");
        Voice_Control = 0; // 清空指令标志
        return; // 跳出while，回到loop
      }
    }
  }
}

/*********************超声波跟随*******************************/
void ult_following(void){
  while (1){
    int distance = get_distance();  // 获取距离保存在distance变量
    //Serial.println(distance);
    if (distance <= 15){ // 后退的范围
      mecanumCar.Back();
    }else if (distance <= 25){  // 停止的范围
      mecanumCar.Stop();
    }else if (distance <= 45){ // 前进的范围
      mecanumCar.Advance();
    }else {  // 其它情况停止
      mecanumCar.Stop();
    }
    // 实时检测是否收到停止指令 33
    if (mySerial.available()) {
      Voice_Control = mySerial.read();
      if (Voice_Control == 33) {
        mecanumCar.Stop();
        Serial.println("退出避障模式");
        Voice_Control = 0; // 清空指令标志
        return; // 跳出while，回到loop
      }
    }
  } 
}

/*********************超声波避障*******************************/
void ult_avoiding(void){
  int distance_M, distance_L, distance_R;
  while (1){
    distance_M = get_distance();  // 获取距离保存在distance变量
    if (distance_M < 20) { // 当测到前方的距离小于20cm时
      mecanumCar.Stop();  // 小车停止
      delay(500); // 延时500ms
      myservo.write(180);  // 超声波云台左转
      delay(500); // 延时500ms
      distance_L = get_distance();  // 把超声波测到左边的距离赋给变量distance_L
      delay(100); // 稳定读取值
      myservo.write(0); // 超声波云台右转
      delay(500); // 延时500ms
      distance_R = get_distance(); // 把超声波测到右边的距离赋给变量distance_R
      delay(100); // 稳定读取值
      myservo.write(90);  // 回到90度位置
      delay(500);
      if (distance_L > distance_R) { // 左边的距离大于右边时
        mecanumCar.Turn_Left();  // 小车左转
        delay(500);  // 左转500ms
      } else {
        mecanumCar.Turn_Right(); // 小车右转
        delay(500);
      }
    }
    else { // 如果测到前方的距离>=20cm时，小车前进
      mecanumCar.Advance(); // 小车前进
    }
    // 实时检测是否收到停止指令 33
    if (mySerial.available()) {
      Voice_Control = mySerial.read();
      if (Voice_Control == 33) {
        mecanumCar.Stop();
        Serial.println("退出避障模式");
        Voice_Control = 0; // 清空指令标志
        return; // 跳出while，回到loop
      }
    }
  } 
}

/*********************超声波测距*******************************/
int get_distance(void) {    // 超声波测距
  int dis;
  digitalWrite(TrigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(TrigPin, HIGH); // 给TRIG至少10us的高电平以触发
  delayMicroseconds(10);
  digitalWrite(TrigPin, LOW);
  dis = pulseIn(EchoPin, HIGH) / 58.2; // 计算出距离
  delay(30);
  return dis;
}