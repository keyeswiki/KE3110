// 导入相关库文件
#include <SoftwareSerial.h>
#include "MecanumCar_v2.h"

/*******智能语音识别模块接口*****/
const int RX_PIN = A5; // 引脚 A5 为 RX
const int TX_PIN = A4; // 引脚 A4 为 TX
SoftwareSerial mySerial(RX_PIN, TX_PIN); // 定义软件串口引脚（RX, TX）

/*******七彩灯与4个电机接口*****/
mecanumCar mecanumCar(3, 2); // SDA-->D3，SCL-->D2

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0，确保首次判断时不触发任何指令

void setup() {
  Serial.begin(9600);  // 硬件串口（与电脑通信）
  mySerial.begin(9600);  // 软件串口（与外设通信）
  mecanumCar.Init();  // 初始化电机与七彩灯驱动
}

void loop() {
  if (mySerial.available()) {  // 检查软串口是否有来自语音模块的数据可读
     Voice_Control = mySerial.read();  // 从软串口读取多个字节的数据      
     Serial.println(Voice_Control);  // 将接收到的数据通过硬件串口输出到串口监视器，便于调试
  }
  if (Voice_Control == 1) {  // 根据接收到的指令值1，执行相应操作
     mecanumCar.left_led(1);  // 开启左边七彩灯闪烁
     mecanumCar.right_led(1); // 开启右边七彩灯闪烁
  } else if (Voice_Control == 2) {  // 根据接收到的指令值2，执行相应操作
    mecanumCar.left_led(0);  // 关闭左边七彩灯闪烁   
    mecanumCar.right_led(0); // 关闭右边七彩灯闪烁
  }
  // 清除指令，避免重复执行
  Voice_Control = 0;
}
