// 导入相关库文件
#include <SoftwareSerial.h>
#include <Servo.h>

/*******智能语音识别模块接口*****/
const int RX_PIN = A5; // 引脚 A5 为 RX
const int TX_PIN = A4; // 引脚 A4 为 TX
SoftwareSerial mySerial(RX_PIN, TX_PIN); // 定义软件串口引脚（RX, TX）

/*******舵机接口与角度变量*****/
const int SERVO_PIN = 9;  // 舵机信号引脚
Servo myservo;    // 定义一个舵机类实例
int angle = 0;    // 定义舵机角度变量

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0，确保首次判断时不触发任何指令

void setup() {
  Serial.begin(9600);  // 硬件串口（与电脑通信）
  mySerial.begin(9600); // 软件串口（与外设通信）
  myservo.attach(SERVO_PIN); // 舵机引脚连接到D9
  myservo.write(0); // 转动到0°
  delay(200);  // 等待一会，以免转得太快
}

void loop() {
  if (mySerial.available()) {  // 检查软串口是否有来自语音模块的数据可读
     Voice_Control = mySerial.read();  // 从软串口读取多个字节的数据      
     Serial.println(Voice_Control);  // 将接收到的数据通过硬件串口输出到串口监视器，便于调试
    }
  if (Voice_Control == 45) {  // 根据接收到的指令值45，执行相应操作
     for (angle = 0; angle < 180; angle++) {  // 舵机角度从0逐渐增加到180°
        myservo.write(angle); // 转动到angle角度
        delay(15);  // 等待一会，以免转得太快
    }
  } else if (Voice_Control == 46) {  // 根据接收到的指令值46，执行相应操作
      for (angle = 180; angle > 0; angle--) { // 舵机角度从180逐渐减少到0°
        myservo.write(angle); //转动到angle角度
        delay(15);
      }
  }
  // 清除指令，避免重复执行
  Voice_Control = 0;
}
