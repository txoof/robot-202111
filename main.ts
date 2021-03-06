function set_ironman () {
    strip.clear()
    for (let index = 0; index <= 7; index++) {
        strip.setPixelColor(index, neopixel.hsl(234, 13, 100 - index * (100 / 7)))
    }
    strip.show()
}
function get_pitch () {
    if (now >= last_time_pitch + 25) {
        pitch = input.rotation(Rotation.Pitch) + 90
        if (Math.abs(last_pitch - pitch) > 1) {
            pitch = pitch
            last_pitch = pitch
        } else {
            pitch = last_pitch
            last_time_pitch = input.runningTime()
        }
    }
    if (pitch > 110) {
        pitch = 110
    }
    if (pitch < 70) {
        pitch = 70
    }
    return pitch
}
input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P8, 70)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P8, 100)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P8, 90)
})
function get_roll () {
    if (now >= last_time_roll + 50) {
        roll = input.rotation(Rotation.Roll) + 90
        if (Math.abs(last_roll - roll) > 2) {
            roll = roll
            last_roll = roll
        } else {
            roll = last_roll
            last_time_roll = input.runningTime()
        }
    }
    return roll
}
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P12, 60)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P12, 100)
    basic.pause(300)
    pins.servoWritePin(AnalogPin.P12, 120)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P12, 60)
})
function rotate_lights (delay: number) {
    if (now >= last_time_light + delay) {
        strip.rotate(1)
        strip.show()
        last_time_light = input.runningTime()
    }
}
let strip: neopixel.Strip = null
let last_time_light = 0
let now = 0
let last_time_roll = 0
let last_roll = 0
let roll = 0
let last_time_pitch = 0
let last_pitch = 0
let pitch = 0
pins.servoWritePin(AnalogPin.P8, 90)
pitch = 90
last_pitch = pitch
last_time_pitch = input.runningTime()
roll = 90
last_roll = roll
last_time_roll = input.runningTime()
let uptime = input.runningTime()
now = input.runningTime()
last_time_light = input.runningTime()
strip = neopixel.create(DigitalPin.P2, 8, NeoPixelMode.RGB)
set_ironman()
basic.forever(function () {
    now = input.runningTime()
    pins.servoWritePin(AnalogPin.P0, get_pitch())
    pins.servoWritePin(AnalogPin.P1, get_roll())
    rotate_lights(100)
})
