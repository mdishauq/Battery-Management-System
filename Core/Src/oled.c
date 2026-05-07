#include "oled.h"

#include <stdio.h>

#include "ssd1306.h"
#include "ssd1306_fonts.h"

void OLED_Init(void)
{
    ssd1306_Init();
    ssd1306_Fill(Black);
}

void OLED_ShowMetrics(float vbat, float ibat, float power, float energy_wh, float charge_ah, float soc_percent, uint8_t fail_safe_active)
{
    char line[32];
    float ibat_ma = ibat * 1000.0f;

    ssd1306_Fill(Black);

    ssd1306_SetCursor(0, 0);
    if (fail_safe_active)
    {
        ssd1306_WriteString("FAIL SAFE ACTIVE", Font_6x8, White);
    }
    else
    {
        ssd1306_WriteString("BMS STATUS", Font_6x8, White);
    }

    snprintf(line, sizeof(line), "I/V:%0.1fmA, %0.2fV", (double)ibat_ma, (double)vbat);
    ssd1306_SetCursor(0, 12);
    ssd1306_WriteString(line, Font_6x8, White);

    snprintf(line, sizeof(line), "P:%0.2fW", (double)power);
    ssd1306_SetCursor(0, 24);
    ssd1306_WriteString(line, Font_6x8, White);

    snprintf(line, sizeof(line), "E:%0.3fWh", (double)energy_wh);
    ssd1306_SetCursor(0, 36);
    ssd1306_WriteString(line, Font_6x8, White);

    snprintf(line, sizeof(line), "Q:%0.3fAh", (double)charge_ah);
    ssd1306_SetCursor(0, 48);
    ssd1306_WriteString(line, Font_6x8, White);

    snprintf(line, sizeof(line), "SoC:%0.0f%%", (double)soc_percent);
    ssd1306_SetCursor(0, 56);
    ssd1306_WriteString(line, Font_6x8, White);

    ssd1306_UpdateScreen();
}
