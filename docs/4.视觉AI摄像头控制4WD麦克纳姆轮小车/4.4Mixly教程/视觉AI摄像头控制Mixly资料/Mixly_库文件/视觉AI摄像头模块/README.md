# TinyVision：Mixly 2.0 / 3.0 双兼容插件

本插件由旧版 TinyVision 扩展转换而来，提供 TinyVision AI 摄像头的初始化、模式切换、串口解析和识别结果读取积木。插件采用 **Mixly 2.0 可直接导入的 XML 图形库结构**，同时包含 Mixly 3.0 第三方库所需的 `config.json`、语言目录和 Arduino 库目录。

## 安装

在 Mixly 3.0 中，从图形库或第三方库管理界面导入本插件 ZIP；若程序要求选择入口文件，请选择根目录中的 `TinyVision.xml`。在 Mixly 2.0 中，使用自定义图形库导入功能选择 `TinyVision.xml`，并确保 ZIP 中的 `libraries/AiCam` 随插件一起安装。

## 支持范围

| 平台 | 串口方式 | 默认 RX/TX | 说明 |
|---|---|---:|---|
| ESP32 | `Serial2` 硬件串口 | 16 / 17 | 可在初始化积木中修改引脚 |
| Arduino Uno / Nano | `SoftwareSerial` | 2 / 3 | 建议摄像头波特率使用 9600 |
| Arduino Mega | `SoftwareSerial` | 2 / 3 | 接收引脚受 Mega 的 SoftwareSerial 能力限制 |
| Arduino Leonardo | `SoftwareSerial` | 2 / 3 | 请按板卡支持情况选择可接收引脚 |

ESP8266、RP2040 等平台未在附带 `AiCam` 库中启用。RX 与 TX 必须交叉连接，并确保电平和供电符合 TinyVision 硬件要求。

## 推荐积木顺序

程序开始处先放置“初始化 TinyVision”积木；需要时使用“设置 TinyVision 模式”；在主循环中持续调用“读取 TinyVision 串口数据”；随后读取人脸坐标、颜色、二维码或卡片结果。人脸坐标应与“是否检测到有效人脸”积木配合使用。

## 与旧版相比的修复

转换版保留了原来的十个积木类型名，因而旧工作区更容易恢复。同时修复了旧库只识别 `ARDUINO_AVR_UNO`、声明板卡范围与实际编译条件不一致的问题；新增 Mixly 2.0/3.0 双生成器注册；初始化积木中的波特率现在会真正传给 AiCam 通信串口；“是否检测到有效人脸”改为调用库中已有的 `isFaceValid()`，不再把坐标 `0` 误判为无效。

## 注意事项

颜色和卡片比较按摄像头协议中的大写字符串进行，例如 `RED`、`STRAIGHT`。二维码内容直接作为 Arduino `String` 返回。插件已做结构、语法和代码生成静态检查，但实际烧录仍取决于您使用的 Mixly 发行版、板卡核心版本、接线和 TinyVision 固件协议。
