import {useEffect, useState} from 'react'
import {Dimensions, ScaledSize} from 'react-native'

export type UseDimensions = {
  dimensions: {
    window: ScaledSize
    screen: ScaledSize
  }
}

export const useDimensions = (): UseDimensions => {
  const windowDimensions = Dimensions.get('window')
  const screenDimensions = Dimensions.get('screen')

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  })

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window, screen}) => {
      setDimensions({window, screen})
    })
    return () => subscription?.remove()
  })

  return {
    dimensions,
  }
}
