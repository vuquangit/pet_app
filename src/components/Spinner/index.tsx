// React Native Loading Spinner Overlay
// https://github.com/ladjs/react-native-loading-spinner-overlay/blob/master/src/index.tsx

/* eslint @typescript-eslint/prefer-nullish-coalescing: 0 */
import * as React from 'react'
import {View, Text, Modal, ActivityIndicator} from 'react-native'
import classNames from 'classnames'

export interface SpinnerPropTypes {
  cancelable?: boolean
  color?: string
  animation?: 'none' | 'slide' | 'fade'
  overlayColor?: string
  size?: 'small' | 'large' | number // size props does not support value normal
  textContent?: string
  textStyle?: string
  visible?: boolean
  indicatorStyle?: string
  customIndicator?: React.ReactNode
  children?: React.ReactNode
  spinnerKey?: string
}

const Spinner = ({
  cancelable = false,
  color = 'white',
  animation = 'none',
  overlayColor = 'bg-spinner',
  size = 'large',
  textContent = '',
  textStyle,
  visible = false,
  indicatorStyle,
  customIndicator,
  children,
  spinnerKey,
}: SpinnerPropTypes) => {
  const [spinnerVisible, setSpinnerVisibility] = React.useState(visible)
  const close = () => {
    setSpinnerVisibility(false)
  }

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close()
    }
  }

  React.useEffect(() => {
    setSpinnerVisibility(visible)
  }, [visible])
  const _renderDefaultContent = () => {
    return (
      <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center">
        {customIndicator || (
          <ActivityIndicator
            color={color}
            size={size}
            className={classNames('flex-1', indicatorStyle)}
          />
        )}
        <View
          className={classNames(
            'flex-1 absolute top-0 left-0 right-0 items-center justify-center bottom-0',
            indicatorStyle,
          )}>
          <Text className={classNames('text-base font-bold h-[50px] top-[80px]', textStyle)}>
            {textContent}
          </Text>
        </View>
      </View>
    )
  }

  const _renderSpinner = () => {
    const spinner = (
      <View
        className={classNames(
          'bg-red-500 absolute top-0 left-0 right-0 bottom-0 flex-1',
          overlayColor,
        )}
        key={spinnerKey || `spinner_${Date.now()}`}>
        {children || _renderDefaultContent()}
      </View>
    )

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => {
          _handleOnRequestClose()
        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}>
        {spinner}
      </Modal>
    )
  }

  return _renderSpinner()
}

export default Spinner
