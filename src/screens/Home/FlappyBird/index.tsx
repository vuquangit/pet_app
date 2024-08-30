import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  ImageBackground,
} from 'react-native'
import Bird from './Bird'
import Obstacles from './Obstacles'
import { ButtonField } from 'src/components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons/faRotateRight'
import backgroundImg from '@/assets/images/flappy-bird/background.png'

export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState<number>(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft] = useState<number>(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState<number>(
    screenWidth + screenWidth / 2 + 30,
  )
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState<number>(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const gravity = 3
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 200
  let gameTimerId: any
  let obstaclesTimerId: any
  let obstaclesTimerIdTwo: any

  //start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
    //if i dont have birdBottom as a dependecy, it wont stop
  }, [birdBottom])
  console.log(birdBottom)

  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  }

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score + 1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(-Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerIdTwo)
      }
    } else {
      setScore(score => score + 1)
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(-Math.random() * 100)
    }
  }, [obstaclesLeftTwo])

  //check for collisions
  useEffect(() => {
    console.log(obstaclesLeft)
    console.log(screenWidth / 2)
    console.log(obstaclesLeft > screenWidth / 2)
    if (
      ((birdBottom < obstaclesNegHeight + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeight + obstacleHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstaclesNegHeightTwo + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesTimerId)
    clearInterval(obstaclesTimerIdTwo)
    setIsGameOver(true)
  }

  const playAgain = () => {
    setBirdBottom(screenHeight / 2)
    setIsGameOver(false)
    setObstaclesLeft(screenWidth)
    setObstaclesLeftTwo(screenWidth + screenWidth / 2 + 30)
    console.log('playAgain')

    //
    setTimeout(() => {
      jump()
    }, 0)
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={jump}>
        <View style={styles.container}>
          <ImageBackground source={backgroundImg} resizeMode="cover" className="flex-1">
            <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
            <Obstacles
              color={'green'}
              obstacleWidth={obstacleWidth}
              obstacleHeight={obstacleHeight}
              randomBottom={obstaclesNegHeight}
              gap={gap}
              obstaclesLeft={obstaclesLeft}
            />
            <Obstacles
              color={'yellow'}
              obstacleWidth={obstacleWidth}
              obstacleHeight={obstacleHeight}
              randomBottom={obstaclesNegHeightTwo}
              gap={gap}
              obstaclesLeft={obstaclesLeftTwo}
            />
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={isGameOver} transparent animationType="none">
        <TouchableWithoutFeedback onPress={() => playAgain()}>
          <View className="flex items-center justify-center flex-1 bg-overlay">
            <TouchableWithoutFeedback>
              <View className="p-4 bg-orange-300 border border-solid shadow-xl">
                <Text className="text-[30px] text-orange-600 text-center">Score: {score}</Text>
                <ButtonField
                  title=""
                  type="text"
                  onPress={playAgain}
                  className="flex flex-row items-center gap-2 mt-4 border-none outline-none">
                  <FontAwesomeIcon icon={faRotateRight} size={15} color="#aaaaaa" />
                  <Text>Tap to play again!</Text>
                </ButtonField>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
