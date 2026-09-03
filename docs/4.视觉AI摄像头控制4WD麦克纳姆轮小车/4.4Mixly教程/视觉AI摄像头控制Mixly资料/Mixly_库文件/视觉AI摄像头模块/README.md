# TinyVision：Mixly 2.0 / 3.0 双兼容插件

**版本：2.1.2**

本插件由旧版 TinyVision 扩展转换而来，提供 TinyVision AI 摄像头的初始化、模式切换、串口解析和识别结果读取积木。插件采用 **Mixly 2.0 可直接导入的 XML 图形库结构**，同时包含 Mixly 3.0 第三方库所需的 `config.json`、语言目录和 Arduino 库目录。

## 新增功能

v2.1.0 基于新版 TinyVision 功能集扩展为 **12 个积木**；v2.1.1 将初始化积木的波特率固定为唯一的 **9600**；v2.1.2 修复判断积木不能吸附到“如果”条件槽的问题。除原有人脸、颜色、二维码和卡片识别外，新增二维码内容比较、线条识别模式以及线条偏移、角度和有效状态读取。

| 功能 | 使用方式 | 生成的 AiCam 调用 |
|---|---|---|
| 二维码内容比较 | 选择 `red`、`blue`、`green`、`yellow`、`black` 或 `white` | `String(aiCam.getQrCode()) == "内容"` |
| 线条识别模式 | 将模式设为“线条识别” | `aiCam.setAiCamMode("line")` |
| 线条数值读取 | 选择偏移、角度或有效状态 | `getLineOffset()`、`getLineAngle()`、`getLineValid()` |

AiCam 会解析 `前缀:LINE:偏移,角度,有效状态` 形式的三字段串口数据。开始读取数值前，必须在循环中反复使用“读取 TinyVision 串口数据”积木。

## 安装

在 Mixly 3.0 中，从图形库或第三方库管理界面导入本插件 ZIP；若程序要求选择入口文件，请选择根目录中的 `TinyVision.xml`。在 Mixly 2.0 中，使用自定义图形库导入功能选择 `TinyVision.xml`，并确保 ZIP 中的 `libraries/AiCam` 随插件一起安装。

Mixly 3.0 rc0 不输出 `includes_` 代码区。本插件已将 `#include <AiCam.h>` 写入实际输出的 `definitions_` 区；若代码视图中未出现 `#include <AiCam.h>` 和 `AiCam aiCam(...)`，请删除旧版插件目录、完全退出 Mixly 后重新导入。

## 支持范围

| 平台 | 串口方式 | 默认 RX/TX | 说明 |
|---|---|---:|---|
| ESP32 | `Serial2` 硬件串口 | 16 / 17 | 初始化积木固定使用 9600 波特率；可修改引脚 |
| Arduino Uno / Nano | `SoftwareSerial` | 2 / 3 | 初始化积木固定使用 9600 波特率 |
| Arduino Mega | `SoftwareSerial` | 2 / 3 | 固定 9600；接收引脚受 Mega 的 SoftwareSerial 能力限制 |
| Arduino Leonardo | `SoftwareSerial` | 2 / 3 | 固定 9600；请按板卡支持情况选择可接收引脚 |

ESP8266、RP2040 等平台未在附带 `AiCam` 库中启用。RX 与 TX 必须交叉连接，并确保电平和供电符合 TinyVision 硬件要求。

## 推荐积木顺序

程序开始处先放置“初始化 TinyVision”积木；设置需要的识别模式；在主循环中持续调用“读取 TinyVision 串口数据”；随后读取人脸坐标、颜色、二维码、卡片或巡线结果。人脸坐标应与“是否检测到有效人脸”积木配合使用。巡线功能建议先切换到线条识别模式，再读取偏移、角度或有效状态。

## 与旧版相比的兼容修复

转换版保留原来的十个积木类型名，因而旧工作区更容易恢复。v2.1.0 在此基础上增加两个新积木，同时保留 Mixly 2.0/3.0 双生成器注册、三语言资源、显式工具箱间距和 Mixly 3.0 rc0 安全默认值。初始化积木不再提供波特率下拉选择，并会固定把 9600 传给 AiCam 通信串口；所有人脸、颜色、二维码和卡片判断积木使用与 Mixly 内置逻辑积木相同的原生 `Boolean` 输出类型，可直接吸附到“如果”等条件槽；“是否检测到有效人脸”调用库中的 `isFaceValid()`，不以坐标是否为零作为判断条件。

## 注意事项

颜色和卡片比较按摄像头协议中的大写字符串进行，例如 `RED`、`STRAIGHT`。二维码内容比较按小写预置文本进行。插件已使用 ESP32 Arduino Core 2.0.7 编译由最终生成器直接生成的草图；实际烧录仍取决于所用 Mixly 发行版、板卡核心版本、接线和 TinyVision 固件协议。
