console.log('source: https://github.com/beenotung/collatz')

document.body.innerHTML = `
<canvas>
  Canvas is not supported
</canvas>
`
let paused = true
let canvas = document.querySelector('canvas') as HTMLCanvasElement
let context = canvas.getContext('2d')!
let fontSizeRatio = 3 / 100
let fontSize = parseInt(getComputedStyle(document.body).fontSize)

let rect = canvas.getClientRects().item(0)!
window.addEventListener('resize', resize)
resize()
window.addEventListener('click', () => {
  if (paused) {
    paused = false
    lastTime = Date.now()
    paint()
  } else {
    paused = true
  }
})

requestAnimationFrame(paint)

function resize() {
  rect = canvas.getClientRects().item(0)!
  canvas.width = rect.width
  canvas.height = rect.height
  if (rect.width > rect.height) {
    // desktop
    fontSize = parseInt(getComputedStyle(document.body).fontSize)
  } else {
    // mobile
    fontSize = rect.width * fontSizeRatio
  }
  context.font = `${fontSize}px Georgia`
}

function paint() {
  run()

  // clear the screen
  context.fillStyle = 'black'
  context.fillRect(0, 0, rect.width, rect.height)

  // scan the data set for normalization
  let maxX = nextN
  let maxY = 0
  for (let i = 0; i < nextN; i++) {
    if (seq[i] > maxY) {
      maxY = seq[i]
    }
  }

  // paint message
  let padding = fontSize * 0.5
  context.fillStyle = 'cyan'
  context.fillText(`[Click to pause/resume]`, padding, fontSize + padding)
  context.fillText(`maxX = ${maxX}, maxY = ${maxY}`, padding, (fontSize + padding) * 2)
  context.fillText(`FPS = ${FPS}, TPF = ${TPF}`, padding, (fontSize + padding) * 3)

  // paint the chart
  for (let i = 0; i < nextN; i++) {
    let x = i / maxX * rect.width
    let y = (1 - seq[i] / maxY) * rect.height
    context.fillRect(x, y, 1, 1)
  }

  // loop animation
  if (!paused) {
    requestAnimationFrame(paint)
  }
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
