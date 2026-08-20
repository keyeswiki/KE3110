#ifndef AICAM_H
#define AICAM_H

#include <Arduino.h>

#if defined(ARDUINO_ARCH_ESP32) || defined(ESP32)
  #define AICAM_USE_HARDWARE_SERIAL 1
  #define AiCamSerial HardwareSerial*
  #define DEFAULT_ESP_RX 16
  #define DEFAULT_ESP_TX 17
#elif defined(ARDUINO_ARCH_AVR)
  #include <SoftwareSerial.h>
  #define AICAM_USE_SOFTWARE_SERIAL 1
  #define AiCamSerial SoftwareSerial
  #define DEFAULT_ESP_RX 2
  #define DEFAULT_ESP_TX 3
#else
  #error "AiCam supports ESP32 and AVR boards (Uno/Nano/Mega/Leonardo)."
#endif

#ifndef ESP_BAUD
  #define ESP_BAUD 9600
#endif

struct EspData {
  int faceX = 0;
  int faceY = 0;
  bool faceValid = false;
  String color;
  bool colorValid = false;
  String qr;
  bool qrValid = false;
  String card;
  bool cardValid = false;
};

class AiCam {
public:
  AiCam();
  AiCam(uint8_t rxPin, uint8_t txPin);

  void begin(uint32_t baud = ESP_BAUD);
  void sendToEsp(const String &cmd);
  void setAiCamMode(String cmd);
  void readEspSerial();
  void readUsbSerial();

  int getFaceX();
  int getFaceY();
  String getColor();
  String getQrCode();
  String getCard();
  bool isFaceValid();

private:
  uint8_t _rxPin;
  uint8_t _txPin;
  AiCamSerial _espSerial;
  EspData _data;
  String _espLine;
  String _usbLine;

  bool parseEspResponse(const String &strData, String &mode, String &data);
  void updateEspData(const String &mode, const String &data);
};

#endif
