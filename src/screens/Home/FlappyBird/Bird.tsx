import React from 'react'
import { Image, View } from 'react-native'

type BirdProps = {
  birdBottom: number
  birdLeft: number
}

const Bird: React.FC<BirdProps> = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50
  const birdHeight = 60

  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'blue',
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
      }}>
      <Image
        className="h-[30px] w-[40px]"
        source={require('../../../assets/images/flappy-bird/bird.png')}
      />
    </View>
  )
}

export default Bird
