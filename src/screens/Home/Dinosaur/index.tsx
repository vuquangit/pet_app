import React, {useEffect, useRef, useState} from 'react'
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native'
import Canvas, {Image as CanvasImage} from 'react-native-canvas'

import {deviceStorage} from 'src/store/storage'
import storageKeys from 'src/constants/storage-keys'
import {useDimensions} from 'src/hooks/useDimensions'
import classNames from 'classnames'

const STATUS = {
  STOP: 'STOP',
  START: 'START',
  PAUSE: 'PAUSE',
  OVER: 'OVER',
}

const JUMP_DELTA = 5
const JUMP_MAX_HEIGHT = 53

type OptionsType = {
  obstacleImage: CanvasImage | null
  playerImage: CanvasImage[] | null
  groundImage: CanvasImage | null
  skyImage: CanvasImage | null
  fps: number
  skySpeed: number
  groundSpeed: number
  skyOffset: number
  groundOffset: number
}

const Dinosaur: React.FC = () => {
  const canvasEl = useRef<Canvas | null>()
  const {dimensions} = useDimensions()

  const [isShowStart, setIsShowStart] = useState(true)

  let imageLoadCount = 0
  let onImageLoaded = () => {
    ++imageLoadCount
    if (imageLoadCount === 7) {
      setTimeout(() => {
        console.log('obstacleImage:', options?.obstacleImage)
        draw()
      }, 0)
    }
  }

  const obstaclesGenerate = () => {
    let res = []
    for (let i = 0; i < 10; ++i) {
      let random = Math.floor(Math.random() * 100) % 60
      random = ((Math.random() * 10) % 2 === 0 ? 1 : -1) * random
      res.push({
        distance: random + obstaclesBase * 200,
      })
      ++obstaclesBase
    }
    return res
  }

  const [options, setOptions] = React.useState<OptionsType>({
    obstacleImage: null,
    playerImage: [],
    groundImage: null,
    skyImage: null,
    fps: 0,
    skySpeed: 0,
    groundSpeed: 0,
    skyOffset: 0,
    groundOffset: 0,
  })

  let status = STATUS.STOP
  let timer: any = null
  let score = 0
  let highScore = 0
  let jumpHeight = 0
  let jumpDelta = 0
  let obstaclesBase = 1
  let obstacles = obstaclesGenerate()
  let currentDistance = 0
  let playerStatus = 0

  const handleCanvas = (canvas: Canvas | null) => {
    if (!canvas) {
      return
    }

    // set canvas size
    canvas.width = dimensions.window.width
    canvas.height = dimensions.window.height

    // set canvas ref
    canvasEl.current = canvas
  }

  const draw = () => {
    if (
      !canvasEl.current ||
      !options.obstacleImage ||
      !options.skyImage ||
      !options.groundImage ||
      !options.playerImage
    ) {
      return
    }

    setIsShowStart(false)

    let level = Math.min(200, Math.floor(score / 100))
    let groundSpeed = (options.groundSpeed + level) / options.fps
    let skySpeed = options.skySpeed / options.fps
    let obstacleWidth = options.obstacleImage.width
    let playerWidth = options.playerImage[0].width || 0
    let playerHeight = options.playerImage[0].height || 0
    const PADDING_TOP = 40

    const ctx = canvasEl.current?.getContext('2d')
    const {width, height} = canvasEl.current

    ctx.clearRect(0, 0, width, height)
    ctx.save()

    // sky image
    options.skyOffset =
      options.skyOffset < width ? options.skyOffset + skySpeed : options.skyOffset - width
    ctx.translate(-options.skyOffset, 0)
    ctx.drawImage(options.skyImage, 0, PADDING_TOP + 0)
    ctx.drawImage(options.skyImage, options.skyImage.width, PADDING_TOP + 0)

    // ground image
    options.groundOffset =
      options.groundOffset < width
        ? options.groundOffset + groundSpeed
        : options.groundOffset - width
    ctx.translate(options.skyOffset - options.groundOffset, 0)
    ctx.drawImage(options.groundImage, 0, PADDING_TOP + 76)
    ctx.drawImage(options.groundImage, options.groundImage.width, PADDING_TOP + 76)

    // player image
    ctx.translate(options.groundOffset, 0)
    ctx.drawImage(options.playerImage[playerStatus], 80, PADDING_TOP + 64 - jumpHeight)

    // jump
    jumpHeight = jumpHeight + jumpDelta
    if (jumpHeight <= 1) {
      jumpHeight = 0
      jumpDelta = 0
    } else if (jumpHeight < JUMP_MAX_HEIGHT && jumpDelta > 0) {
      jumpDelta = jumpHeight * jumpHeight * 0.001033 - jumpHeight * 0.137 + 5
    } else if (jumpHeight < JUMP_MAX_HEIGHT && jumpDelta < 0) {
      // jumpDelta = (jumpHeight * jumpHeight) * 0.00023 - jumpHeight * 0.03 - 4;
    } else if (jumpHeight >= JUMP_MAX_HEIGHT) {
      jumpDelta = -JUMP_DELTA / 2.7
    }

    // high score
    let scoreText = (status === STATUS.OVER ? 'GAME OVER  ' : '') + Math.floor(score)
    ctx.font = 'Bold 18px Arial'
    ctx.textAlign = 'right'
    ctx.fillStyle = '#595959'
    ctx.fillText(scoreText, width - 30, 23)
    if (status === STATUS.START) {
      score += 0.5
      if (score > highScore) {
        highScore = score
        // window.localStorage.highScore = score
        deviceStorage.saveItem(storageKeys.dinosaur_high_score, highScore.toString())
      }
      currentDistance += groundSpeed
      if (score % 4 === 0) {
        playerStatus = (playerStatus + 1) % 3
      }
    }
    if (highScore) {
      ctx.textAlign = 'left'
      ctx.fillText('HIGH  ' + Math.floor(highScore), 30, 23)
    }

    // 障碍
    let pop = 0
    for (let i = 0; i < obstacles.length; ++i) {
      if (currentDistance >= obstacles[i].distance) {
        let offset = width - (currentDistance - obstacles[i].distance + groundSpeed)
        if (offset > 0) {
          ctx.drawImage(options.obstacleImage, offset, PADDING_TOP + 84)
        } else {
          ++pop
        }
      } else {
        break
      }
    }
    for (let i = 0; i < pop; ++i) {
      obstacles.shift()
    }
    if (obstacles.length < 5) {
      obstacles = obstacles.concat(obstaclesGenerate())
    }

    // 碰撞检测
    let firstOffset = width - (currentDistance - obstacles[0].distance + groundSpeed)
    if (
      90 - obstacleWidth < firstOffset &&
      firstOffset < 60 + playerWidth &&
      64 - jumpHeight + playerHeight > 84
    ) {
      stop()
    }

    ctx.restore()
  }

  const setTimer = () => {
    timer = setInterval(() => draw(), 1000 / options.fps)
  }

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const clear = () => {
    score = 0
    jumpHeight = 0
    currentDistance = 0
    obstacles = []
    obstaclesBase = 1
    playerStatus = 0
  }

  const start = () => {
    if (status === STATUS.START) {
      return
    }

    status = STATUS.START
    setTimer()
    jump()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pause = () => {
    if (status === STATUS.START) {
      status = STATUS.PAUSE
      clearTimer()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const goOn = () => {
    if (status === STATUS.PAUSE) {
      status = STATUS.START
      setTimer()
    }
  }

  const stop = () => {
    if (status === STATUS.OVER) {
      return
    }
    status = STATUS.OVER
    playerStatus = 3
    clearTimer()
    draw()
    clear()
  }

  const restart = () => {
    obstacles = obstaclesGenerate()
    start()
  }

  const jump = () => {
    if (jumpHeight > 2) {
      return
    }
    jumpDelta = JUMP_DELTA
    jumpHeight = JUMP_DELTA
  }

  const onPress = () => {
    switch (status) {
      case STATUS.STOP:
        start()
        break
      case STATUS.START:
        jump()
        break
      case STATUS.OVER:
        restart()
        break
    }
  }

  useEffect(() => {
    if (!canvasEl.current) {
      return
    }

    const skyImage = new CanvasImage(canvasEl.current)
    const groundImage = new CanvasImage(canvasEl.current)
    const playerImage = new CanvasImage(canvasEl.current)
    const playerLeftImage = new CanvasImage(canvasEl.current)
    const playerRightImage = new CanvasImage(canvasEl.current)
    const playerDieImage = new CanvasImage(canvasEl.current)
    const obstacleImage = new CanvasImage(canvasEl.current)

    // skyImage.src = require('../../../assets/images/dinosaur/cloud.png')
    skyImage.src =
      'https://raw.githubusercontent.com/SagarKhengat/react-native-offline-game/master/src/img/cloud.png'
    skyImage.addEventListener('load', onImageLoaded)

    // groundImage.src = require('../../../assets/images/dinosaur/ground.png')
    groundImage.src =
      'https://raw.githubusercontent.com/SagarKhengat/react-native-offline-game/master/src/img/ground.png'
    groundImage.addEventListener('load', onImageLoaded)

    // playerImage.src = require('../../../assets/images/dinosaur/dinosaur.png')
    playerImage.src =
      'https://raw.githubusercontent.com/SagarKhengat/react-native-offline-game/master/src/img/dinosaur.png'
    playerImage.addEventListener('load', onImageLoaded)

    // playerLeftImage.src = require('../../../assets/images/dinosaur/dinosaur_left.png')
    playerLeftImage.src =
      'https://raw.githubusercontent.com/SagarKhengat/react-native-offline-game/master/src/img/dinosaur_left.png'
    playerLeftImage.addEventListener('load', onImageLoaded)

    // playerRightImage.src = require('../../../assets/images/dinosaur/dinosaur_right.png')
    playerRightImage.src =
      'https://raw.githubusercontent.com/SagarKhengat/react-native-offline-game/master/src/img/dinosaur_right.png'
    playerRightImage.addEventListener('load', onImageLoaded)

    // playerDieImage.src = require('../../../assets/images/dinosaur/dinosaur_die.png')
    playerDieImage.src =
      'https://raw.githubusercontent.com/SagarKhengat/react-native-offline-game/master/src/img/dinosaur_die.png'
    playerDieImage.addEventListener('load', onImageLoaded)

    // obstacleImage.src = require('../../../assets/images/dinosaur/obstacle.png')
    obstacleImage.src =
      'https://raw.githubusercontent.com/SagarKhengat/react-native-offline-game/master/src/img/obstacle.png'
    obstacleImage.addEventListener('load', onImageLoaded)

    setOptions({
      fps: 60,
      skySpeed: 40,
      groundSpeed: 100,
      skyImage: skyImage,
      groundImage: groundImage,
      playerImage: [playerImage, playerLeftImage, playerRightImage, playerDieImage],
      obstacleImage: obstacleImage,
      skyOffset: 0,
      groundOffset: 0,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasEl])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      highScore = Number((await deviceStorage.getItem(storageKeys.dinosaur_high_score)).value || 0)
    })()
  }, [])

  return (
    <Pressable onPress={onPress}>
      <View className="relative">
        <Canvas ref={handleCanvas} />

        <View
          className={classNames('absolute top-0 left-0 w-full', {
            hidden: !isShowStart,
          })}>
          <View className="flex items-center justify-center w-full pt-4">
            <Image
              className="w-18 h-18"
              source={require('../../../assets/images/dinosaur/dinosaur.png')}
            />
            <Text className="text-3xl text-[#595959] font-bold text-center">Tap to start</Text>
          </View>
        </View>

        <View className="absolute top-[180px] left-0 p-3">
          <Text className="text-xl text-[#595959] font-bold">Top scores</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default Dinosaur
