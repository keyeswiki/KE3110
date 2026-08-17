// 导入库文件
#include <Arduino.h>
#include "AiCam.h"
#include <MecanumCar_v2.h>

AiCam aiCam(A4, A5); // 定义引脚: TX接A4,RX接A5
mecanumCar mecanumCar(3, 2); // 定义引脚: SDA接D3,SCL接D2

unsigned long runTime = 0; // 记录电机运行截止时间
bool isRun = false;       // 电机运行标记

void setup() {
   Serial.begin(115200); // 设置波特率为115200
   aiCam.begin(); // 启动视觉AI摄像头
   mecanumCar.Init();  // 初始化电机与七彩灯驱动

   aiCam.setAiCamMode("face"); // 设置视觉AI摄像头识别模式为人脸识别
}

void loop() {
   aiCam.readEspSerial(); // 读取视觉AI摄像头串口数据
   unsigned long now = millis();
   if (aiCam.getFaceX() != 0 && aiCam.getFaceY() != 0) { // 检测到人脸，刷新运行计时
     runTime = now + 500; // 每次看到人脸，延长前进时长500ms
     isRun = true;
   } 
    
   if (isRun && now < runTime) { // 判断是否还在运行时间内
     mecanumCar.Advance(); // 小车前进
   } else {
     mecanumCar.Stop(); // 小车停止
     isRun = false;
   }
  delay(50); // 防抖延时，避免反复快速识别
}
