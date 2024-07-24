import React, {useEffect, useRef} from 'react'
import {Image, TouchableOpacity} from 'react-native'
import Canvas from 'react-native-canvas'

import {deviceStorage} from 'src/store/storage'
import storageKeys from 'src/constants/storage-keys'
import { useDimensions } from 'src/hooks/useDimensions'

const STATUS = {
  STOP: 'STOP',
  START: 'START',
  PAUSE: 'PAUSE',
  OVER: 'OVER',
}

const JUMP_DELTA = 5
const JUMP_MAX_HEIGHT = 53

type DinosaurTypes = {
  options: any
}

const Dinosaur: React.FC<DinosaurTypes> = props => {
  const canvasEl = useRef()
  const { dimensions } = useDimensions()

  let imageLoadCount = 0
  let onImageLoaded = () => {
    ++imageLoadCount
    if (imageLoadCount === 3) {
      draw()
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

  // 资源文件
  let skyImage = new Image({
    onLoad: onImageLoaded,
    src: require('../../../assets/images/dinosaur/cloud.png'),
  })
  let groundImage = new Image({
    onLoad: onImageLoaded,
    src: require('../../../assets/images/dinosaur/ground.png'),
  })
  let playerImage = new Image({
    onLoad: onImageLoaded,
    src: require('../../../assets/images/dinosaur/dinosaur.png'),
  })
  let playerLeftImage = new Image({
    onLoad: onImageLoaded,
    src: require('../../../assets/images/dinosaur/dinosaur_left.png'),
  })
  let playerRightImage = new Image({
    onLoad: onImageLoaded,
    src: require('../../../assets/images/dinosaur/dinosaur_right.png'),
  })
  let playerDieImage = new Image({
    onLoad: onImageLoaded,
    src: require('../../../assets/images/dinosaur/dinosaur_die.png'),
  })
  let obstacleImage = new Image({
    onLoad: onImageLoaded,
    src: require('../../../assets/images/dinosaur/obstacle.png'),
  })

  let options = {
    fps: 60,
    skySpeed: 40,
    groundSpeed: 100,
    skyImage: skyImage,
    groundImage: groundImage,
    playerImage: [playerImage, playerLeftImage, playerRightImage, playerDieImage],
    obstacleImage: obstacleImage,
    skyOffset: 0,
    groundOffset: 0,
    ...props.options,
  }

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

  useEffect(() => {
    ;(async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      highScore = Number((await deviceStorage.getItem(storageKeys.dinosaur_high_score)).value || 0)
    })()
  }, [])

  const handleCanvas = (canvas: any) => {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'purple'
    ctx.fillRect(0, 0, 100, 100)

    canvasEl.current = canvas
  }

  const draw = () => {
    if (!canvasEl.current) {
      return
    }

    let level = Math.min(200, Math.floor(score / 100))
    let groundSpeed = (options.groundSpeed + level) / options.fps
    let skySpeed = options.skySpeed / options.fps
    let obstacleWidth = options.obstacleImage.width
    let playerWidth = options.playerImage[0].width
    let playerHeight = options.playerImage[0].height

    const ctx = canvasEl.current?.getContext('2d')
    const {width, height} = canvasEl.current

    ctx.clearRect(0, 0, width, height)
    ctx.save()

    // 云
    options.skyOffset =
      options.skyOffset < width ? options.skyOffset + skySpeed : options.skyOffset - width
    ctx.translate(-options.skyOffset, 0)
    ctx.drawImage(options.skyImage, 0, 0)
    ctx.drawImage(options.skyImage, options.skyImage.width, 0)

    // 地面
    options.groundOffset =
      options.groundOffset < width
        ? options.groundOffset + groundSpeed
        : options.groundOffset - width
    ctx.translate(options.skyOffset - options.groundOffset, 0)
    ctx.drawImage(options.groundImage, 0, 76)
    ctx.drawImage(options.groundImage, options.groundImage.width, 76)

    // 恐龙
    // 这里已经将坐标还原回左上角
    ctx.translate(options.groundOffset, 0)
    ctx.drawImage(options.playerImage[playerStatus], 80, 64 - jumpHeight)
    // 更新跳跃高度/速度
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

    // 分数
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
          ctx.drawImage(options.obstacleImage, offset, 84)
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

  const pause = () => {
    if (status === STATUS.START) {
      status = STATUS.PAUSE
      clearTimer()
    }
  }

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
    // if (dimensions.window.width >= 680) {
    //   // @ts-ignore
    //   canvasEl?.current?.width = 680
    // }

    // window.onkeypress = function (e) {
    //   if (e.key === ' ') {
    //     onSpacePress()
    //   }
    // }
    // canvasEl.current.parentNode.onclick = onSpacePress

    // window.onblur = this.pause
    // window.onfocus = this.goOn

    // return () => {
    //   window.onblur = null
    //   window.onfocus = null
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TouchableOpacity onPress={onPress}>
      <Canvas ref={handleCanvas} />
    </TouchableOpacity>
  )
}

export default Dinosaur
