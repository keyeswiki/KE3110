#include "AiCam.h"

AiCam::AiCam() : AiCam(DEFAULT_ESP_RX, DEFAULT_ESP_TX) {}

AiCam::AiCam(uint8_t rxPin, uint8_t txPin)
  : _rxPin(rxPin),
    _txPin(txPin)
#if defined(AICAM_USE_SOFTWARE_SERIAL)
    , _espSerial(rxPin, txPin)
#endif
{
#if defined(AICAM_USE_HARDWARE_SERIAL)
  _espSerial = &Serial2;
#endif
}

void AiCam::begin(uint32_t baud) {
#if defined(AICAM_USE_HARDWARE_SERIAL)
  _espSerial->begin(baud, SERIAL_8N1, _rxPin, _txPin);
#else
  _espSerial.begin(baud);
#endif
  delay(500);
  sendToEsp(F("GET:MODE"));
  delay(50);
  sendToEsp(F("GET:OUTPUT"));
  delay(50);
}

void AiCam::sendToEsp(const String &cmd) {
  if (cmd.length() == 0) return;
#if defined(AICAM_USE_HARDWARE_SERIAL)
  _espSerial->print(cmd);
  _espSerial->print("\r\n");
#else
  _espSerial.print(cmd);
  _espSerial.print("\r\n");
#endif
}

void AiCam::setAiCamMode(String cmd) {
  cmd.trim();
  cmd.toLowerCase();
  if (cmd == "face") {
    sendToEsp(F("MODE:FACE"));
  } else if (cmd == "color") {
    sendToEsp(F("MODE:COLOR"));
  } else if (cmd == "qr") {
    sendToEsp(F("MODE:QR"));
  } else if (cmd == "card") {
    sendToEsp(F("MODE:CARD"));
  } else if (cmd == "line") {
    sendToEsp(F("MODE:LINE"));
  }
}

bool AiCam::parseEspResponse(const String &strData, String &mode, String &data) {
  int firstColon = strData.indexOf(':');
  int secondColon = strData.indexOf(':', firstColon + 1);
  if (firstColon == -1 || secondColon == -1) return false;
  mode = strData.substring(firstColon + 1, secondColon);
  data = strData.substring(secondColon + 1);
  return true;
}

void AiCam::updateEspData(const String &mode, const String &data) {
  if (mode.equalsIgnoreCase("FACE")) {
    int comma = data.indexOf(',');
    if (comma != -1) {
      _data.faceX = data.substring(0, comma).toInt();
      _data.faceY = data.substring(comma + 1).toInt();
      _data.faceValid = true;
    }
  } else if (mode.equalsIgnoreCase("COLOR")) {
    _data.color = data;
    _data.colorValid = true;
  } else if (mode.equalsIgnoreCase("QR")) {
    _data.qr = data;
    _data.qrValid = true;
  } else if (mode.equalsIgnoreCase("CARD")) {
    _data.card = data;
    _data.cardValid = true;
  } else if (mode.equalsIgnoreCase("LINE")) {
    int firstComma = data.indexOf(',');
    int secondComma = data.indexOf(',', firstComma + 1);
    if (firstComma != -1 && secondComma != -1) {
      _data.lineOffset = data.substring(0, firstComma).toInt();
      _data.lineAngle = data.substring(firstComma + 1, secondComma).toInt();
      _data.lineValid = data.substring(secondComma + 1).toInt();
    }
  }
}

void AiCam::readEspSerial() {
#if defined(AICAM_USE_HARDWARE_SERIAL)
  while (_espSerial->available()) {
    char c = (char)_espSerial->read();
#else
  while (_espSerial.available()) {
    char c = (char)_espSerial.read();
#endif
    if (c == '\r' || c == '\n') {
      if (_espLine.length() > 0) {
        String mode;
        String data;
        if (parseEspResponse(_espLine, mode, data)) {
          updateEspData(mode, data);
        }
        _espLine = "";
      }
    } else if (_espLine.length() < 128) {
      _espLine += c;
    } else {
      // 丢弃异常长的未换行帧，避免持续占用动态 String 内存。
      _espLine = "";
    }
  }
}

void AiCam::readUsbSerial() {
  while (Serial.available()) {
    char c = (char)Serial.read();
    if (c == '\r' || c == '\n') {
      if (_usbLine.length() > 0) {
        setAiCamMode(_usbLine);
        _usbLine = "";
      }
    } else if (_usbLine.length() < 128) {
      _usbLine += c;
    } else {
      _usbLine = "";
    }
  }
}

int AiCam::getFaceX() { return _data.faceX; }
int AiCam::getFaceY() { return _data.faceY; }
String AiCam::getColor() { return _data.color; }
String AiCam::getQrCode() { return _data.qr; }
String AiCam::getCard() { return _data.card; }
bool AiCam::isFaceValid() { return _data.faceValid; }
int AiCam::getLineOffset() { return _data.lineOffset; }
int AiCam::getLineAngle() { return _data.lineAngle; }
int AiCam::getLineValid() { return _data.lineValid; }
