document.title = 'collatz'
document.body.innerHTML = `
<style>
body {
  margin: 0;
  overflow: hidden;
}
canvas {
  width: 100%;
  height: 100vh;
  background-color: aquamarine;
}
</style>
<canvas>
`
let canvas = document.querySelector('canvas') as HTMLCanvasElement
let context = canvas.getContext('2d')!

let rect = canvas.getClientRects().item(0)!
window.addEventListener('resize', resize)
resize()

requestAnimationFrame(paint)

function resize() {
  rect = canvas.getClientRects().item(0)!
  canvas.width = rect.width
  canvas.height = rect.height
}

function paint() {
  run()

  context.fillStyle = 'black'
  context.fillRect(0, 0, rect.width, rect.height)
  context.fillStyle = 'cyan'
  let maxX = nextN
  let maxY = 0
  for (let i = 0; i < nextN; i++) {
    if (seq[i] > maxY) {
      maxY = seq[i]
    }
  }
  let msg = `maxX = ${maxX}, maxY = ${maxY}, FPS = ${FPS}, TPF = ${TPF}`
  context.fillText(msg, 0, 10)
  for (let i = 0; i < nextN; i++) {
    let x = i / maxX * rect.width
    let y = (1 - seq[i] / maxY) * rect.height
    context.fillRect(x, y, 1, 1)
  }

  requestAnimationFrame(paint)
}

let seq: number[] = []
seq[0] = 0
seq[1] = 0
let nextN = 2

function calcStep(n: number): number {
  if (n in seq) {
    return seq[n]
  }
  let next = n % 2 == 0 ? n / 2 : n * 3 + 1
  let step = 1 + calcStep(next)
  seq[n] = step
  return step
}

let lastTime = Date.now()

let FPS = 3
let frameInterval = 1000 / FPS
let TPF = 1

function run() {
  let currentTime = Date.now()
  let diff = currentTime - lastTime
  if (diff > frameInterval) {
    TPF *= 0.9
  } else {
    TPF *= 1.1
  }
  TPF = Math.ceil(TPF)
  lastTime = currentTime
  for (let i = 0; i < TPF; i++) {
    calcStep(nextN)
    nextN++
  }
}
