//导入相关库文件
#include <SoftwareSerial.h>

// 创建软串口对象：RX引脚为A5，TX引脚为A4，用于连接智能语音模块
// 定义引脚常量
const int RX_PIN = A5; // 引脚 A5 为 RX
const int TX_PIN = A4; // 引脚 A4 为 TX

SoftwareSerial mySerial(RX_PIN, TX_PIN); // 定义软件串口引脚（RX, TX）

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0，确保首次判断时不触发任何指令

void setup() {
  Serial.begin(9600);  // 硬件串口（与电脑通信）
  mySerial.begin(9600);  // 软件串口（与外设通信）
}

void loop() {
  if (mySerial.available()) {  // 检查软串口是否有来自语音模块的数据可读
    Voice_Control = mySerial.read();  // 从软串口读取多个字节的数据      
    Serial.println(Voice_Control);  // 将接收到的数据通过硬件串口输出到串口监视器，便于调试
  }
}
