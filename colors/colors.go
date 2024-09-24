package colors

import "fmt"

// All attributes off(color at startup)
const Reset string = "\x1b[0m"

// Bold on(enable foreground intensity)
const BoldOn string = "\x1b[1m"

// Underline on
const UnderlineOn string = "\x1b[4m"

// Blink on(enable background intensity)"
const BlinkOn string = "\x1b[5m"

// Bold off(disable foreground intensity)
const BoldOff string = "\x1b[21m"

// Underline off
const UnderlineOff string = "\x1b[24m"

// Blink off(disable background intensity)"
const BlinkOff string = "\x1b[25m"

const FgBlack string = "\x1b[30m"
const FgRed string = "\x1b[31m"
const FgGreen string = "\x1b[32m"
const FgYellow string = "\x1b[33m"
const FgBlue string = "\x1b[34m"
const FgMagenta string = "\x1b[35m"
const FgCyan string = "\x1b[36m"
const FgWhite string = "\x1b[37m"
const FgDefault string = "\x1b[39m"
const FgLightGray string = "\x1b[90m"
const FgLightRed string = "\x1b[91m"
const FgLightGreen string = "\x1b[92m"
const FgLightYellow string = "\x1b[93m"
const FgLightBlue string = "\x1b[94m"
const FgLightMagenta string = "\x1b[95m"
const FgLightCyan string = "\x1b[96m"
const FgLightWhite string = "\x1b[97m"

func Fg_Black(text string) string {
	return FgBlack + text + FgDefault
}
func Fg_Red(text string) string {
	return FgRed + text + FgDefault
}
func Fg_Green(text string) string {
	return FgGreen + text + FgDefault
}
func Fg_Yellow(text string) string {
	return FgYellow + text + FgDefault
}
func Fg_Blue(text string) string {
	return FgBlue + text + FgDefault
}
func Fg_Magenta(text string) string {
	return FgMagenta + text + FgDefault
}
func Fg_Cyan(text string) string {
	return FgCyan + text + FgDefault
}
func Fg_White(text string) string {
	return FgWhite + text + FgDefault
}
func Fg_LightGray(text string) string {
	return FgLightGray + text + FgDefault
}
func Fg_LightRed(text string) string {
	return FgLightRed + text + FgDefault
}
func Fg_LightGreen(text string) string {
	return FgLightGreen + text + FgDefault
}
func Fg_LightYellow(text string) string {
	return FgLightYellow + text + FgDefault
}
func Fg_LightBlue(text string) string {
	return FgLightBlue + text + FgDefault
}
func Fg_LightMagenta(text string) string {
	return FgLightMagenta + text + FgDefault
}
func Fg_LightCyan(text string) string {
	return FgLightCyan + text + FgDefault
}
func Fg_LightWhite(text string) string {
	return FgLightWhite + text + FgDefault
}

const BgBlack string = "\x1b[40m"
const BgRed string = "\x1b[41m"
const BgGreen string = "\x1b[42m"
const BgYellow string = "\x1b[43m"
const BgBlue string = "\x1b[44m"
const BgMagenta string = "\x1b[45m"
const BgCyan string = "\x1b[46m"
const BgWhite string = "\x1b[47m"
const BgDefault string = "\x1b[49m"
const BgLightGray string = "\x1b[100m"
const BgLightRed string = "\x1b[101m"
const BgLightGreen string = "\x1b[102m"
const BgLightYellow string = "\x1b[103m"
const BgLightBlue string = "\x1b[104m"
const BgLightMagenta string = "\x1b[105m"
const BgLightCyan string = "\x1b[106m"
const BgLightWhite string = "\x1b[107m"

func Bg_Black(text string) string {
	return BgBlack + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_Red(text string) string {
	return BgRed + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_Green(text string) string {
	return BgGreen + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_Yellow(text string) string {
	return BgYellow + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_Blue(text string) string {
	return BgBlue + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_Magenta(text string) string {
	return BgMagenta + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_Cyan(text string) string {
	return BgCyan + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_White(text string) string {
	return BgWhite + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_LightGray(text string) string {
	return BgLightGray + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_LightRed(text string) string {
	return BgLightRed + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_LightGreen(text string) string {
	return BgLightGreen + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_LightYellow(text string) string {
	return BgLightYellow + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_LightBlue(text string) string {
	return BgLightBlue + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_LightMagenta(text string) string {
	return BgLightMagenta + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_LightCyan(text string) string {
	return BgLightCyan + fmt.Sprintf(" %v ", text) + BgDefault
}
func Bg_LightWhite(text string) string {
	return BgLightWhite + fmt.Sprintf(" %v ", text) + BgDefault
}
