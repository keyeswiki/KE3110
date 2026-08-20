// 导入库文件
#include <Arduino.h>
#include "AiCam.h"
#include <MecanumCar_v2.h>

AiCam aiCam(A4, A5); // 定义引脚: TX接A4,RX接A5
mecanumCar mecanumCar(3, 2); // 定义引脚: SDA接D3,SCL接D2

void setup() {
   Serial.begin(115200); // 设置波特率为115200
   aiCam.begin(); // 启动视觉AI摄像头
   mecanumCar.Init();  // 初始化电机与七彩灯驱动

   aiCam.setAiCamMode("face"); // 设置视觉AI摄像头为为人脸识别模式
}

void loop() {
   aiCam.readEspSerial(); // 持续读取摄像头串口数据，刷新识别缓存
   if (aiCam.getFaceX() != 0 && aiCam.getFaceY() != 0)  { // 视觉AI摄像头识别人脸
      mecanumCar.left_led(1);  // 开启左边七彩灯闪烁
      mecanumCar.right_led(1); // 开启右边七彩灯闪烁
   } else {
      mecanumCar.left_led(0);  // 关闭左边七彩灯闪烁   
      mecanumCar.right_led(0); // 关闭右边七彩灯闪烁
   }
   delay(50);  // 新增延时，50毫秒刷新一次状态
}
