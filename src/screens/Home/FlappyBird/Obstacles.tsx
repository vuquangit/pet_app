import React from 'react'
import { ColorValue, Image, View } from 'react-native'

type ObstaclesProps = {
  color: ColorValue | undefined
  obstacleWidth: number
  obstacleHeight: number
  randomBottom: number
  gap: number
  obstaclesLeft: number
}

const Obstacles: React.FC<ObstaclesProps> = ({
  color,
  obstacleWidth,
  obstacleHeight,
  randomBottom,
  gap,
  obstaclesLeft,
}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstacleWidth,
          height: 500,
          left: obstaclesLeft,
          bottom: randomBottom + obstacleHeight + gap,
        }}>
        <Image
          className="object-contain w-full h-full"
          source={require('../../../assets/images/flappy-bird/pipe-green-inverted.png')}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: randomBottom,
        }}>
        <Image
          className="object-contain w-full h-full"
          source={require('../../../assets/images/flappy-bird/pipe-green.png')}
        />
      </View>
    </>
  )
}

export default Obstacles
