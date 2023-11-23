input.onButtonPressed(Button.A, function () {
    Init()
})
function Calibrate () {
    max = 0
    suma = 0
    for (let index = 0; index < 60; index++) {
        reading = pins.analogReadPin(AnalogPin.P0)
        max = Math.max(max, reading)
        suma += reading
        basic.pause(50)
    }
    THRESHOLD = suma / 60 + 40
    serial.writeValue("Threshold", THRESHOLD)
    basic.pause(2000)
}
function Winner () {
    servos.P1.setAngle(90)
    music.play(music.stringPlayable("G B A G C5 B A B ", 120), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . . . . .
        . # . # .
        . # # # .
        . . # . .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . # # # .
        . . # . .
        . . # . .
        `)
}
input.onButtonPressed(Button.AB, function () {
    Calibrate()
    Init()
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(10)
    Winner()
})
function Init () {
    counter = 0
    reading = 0
    last_reading = 0
    servos.P1.setAngle(0)
    basic.showNumber(counter)
}
let last_reading = 0
let counter = 0
let THRESHOLD = 0
let reading = 0
let suma = 0
let max = 0
Calibrate()
Init()
basic.forever(function () {
    basic.pause(50)
    reading = pins.analogReadPin(AnalogPin.P0)
    serial.writeValue("x", reading)
    if (reading > THRESHOLD) {
        counter += 1
        basic.showNumber(counter)
    }
    if (counter == 10) {
        Winner()
    }
    last_reading = reading
})
