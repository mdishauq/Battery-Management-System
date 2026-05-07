#ifndef __OLED_H__
#define __OLED_H__

#include <stdint.h>

void OLED_Init(void);
void OLED_ShowMetrics(float vbat, float ibat, float power, float energy_wh, float charge_ah, float soc_percent, uint8_t fail_safe_active);

#endif /* __OLED_H__ */
