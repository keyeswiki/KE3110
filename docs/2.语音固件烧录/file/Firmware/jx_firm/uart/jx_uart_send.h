#ifndef JX_UART_SEND_H_
#define JX_UART_SEND_H_

#ifdef __cplusplus
extern "C" {
#endif

// 串口发送消息最大长度
#define UART_SEND_MAX      32
#define UART_MSG_HEAD_LEN  2
#define UART_MSG_FOOT_LEN  2

// 串口发送消息号
#define U_MSG_zhengshu      1
#define U_MSG_xiaoshu      2
#define U_MSG_Wendu      3
#define U_MSG_Du      4
#define U_MSG_Yuliang      5
#define U_MSG_Shidu      6
#define U_MSG_Guang      7
#define U_MSG_Turang      8
#define U_MSG_Shuiwei      9
#define U_MSG_Shijian      10
#define U_MSG_Juli      11
#define U_MSG_Dian      12
#define U_MSG_Fen      13
#define U_MSG_Miao      14
#define U_MSG_Dianzheng      15
#define U_MSG_ml      16
#define U_MSG_mm      17
#define U_MSG_cm      18
#define U_MSG_mi      19
#define U_MSG_Km      20
#define U_MSG_ppb      21
#define U_MSG_ppm      22
#define U_MSG_iaq      23

// 串口消息参数类型
typedef union {
  double d_double;
  int d_int;
  unsigned char d_ucs[8];
  char d_char;
  unsigned char d_uchar;
  unsigned long d_long;
  short d_short;
  float d_float;
}uart_param_t;

// 十六位整数转32位整数
void _int16_to_int32(uart_param_t* param) {
  if (sizeof(int) >= 4)
    return;
  unsigned long value = param->d_long;
  unsigned long sign = (value >> 15) & 1;
  unsigned long v = value;
  if (sign)
    v = 0xFFFF0000 | value;
  uart_param_t p;
  p.d_long = v;
  param->d_ucs[0] = p.d_ucs[0];
  param->d_ucs[1] = p.d_ucs[1];
  param->d_ucs[2] = p.d_ucs[2];
  param->d_ucs[3] = p.d_ucs[3];
}

// 浮点数转双精度 
void _float_to_double(uart_param_t* param) {
  if (sizeof(int) >= 4)
    return;
  unsigned long value = param->d_long;
  unsigned long sign = value >> 31;
  unsigned long M = value & 0x007FFFFF;
  unsigned long e =  ((value >> 23 ) & 0xFF) - 127 + 1023;
  uart_param_t p0, p1;  
  p1.d_long = ((sign & 1) << 31) | ((e & 0x7FF) << 20) | (M >> 3);
  p0.d_long = (M & 0x7) << 29;
  param->d_ucs[0] = p0.d_ucs[0];
  param->d_ucs[1] = p0.d_ucs[1];
  param->d_ucs[2] = p0.d_ucs[2];
  param->d_ucs[3] = p0.d_ucs[3];
  param->d_ucs[4] = p1.d_ucs[0];
  param->d_ucs[5] = p1.d_ucs[1];
  param->d_ucs[6] = p1.d_ucs[2];
  param->d_ucs[7] = p1.d_ucs[3];
}

// action: zhengshu
void _uart_zhengshu(int zhengshu);

// action: xiaoshu
void _uart_xiaoshu(double xiaoshu);

// action: Wendu
void _uart_Wendu();

// action: Du
void _uart_Du();

// action: Yuliang
void _uart_Yuliang();

// action: Shidu
void _uart_Shidu();

// action: Guang
void _uart_Guang();

// action: Turang
void _uart_Turang();

// action: Shuiwei
void _uart_Shuiwei();

// action: Shijian
void _uart_Shijian();

// action: Juli
void _uart_Juli();

// action: Dian
void _uart_Dian();

// action: Fen
void _uart_Fen();

// action: Miao
void _uart_Miao();

// action: Dianzheng
void _uart_Dianzheng();

// action: ml
void _uart_ml();

// action: mm
void _uart_mm();

// action: cm
void _uart_cm();

// action: mi
void _uart_mi();

// action: Km
void _uart_Km();

// action: ppb
void _uart_ppb();

// action: ppm
void _uart_ppm();

// action: iaq
void _uart_iaq();

#ifdef __cplusplus
}
#endif

#endif /*JX_UART_SEND_H_*/

