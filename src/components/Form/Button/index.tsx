import React, {FC} from 'react'
import {Pressable, ButtonProps, Text} from 'react-native'
import classNames from 'classnames'

interface BaseButtonProps extends ButtonProps {
  title: string
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
}

export const ButtonField: FC<BaseButtonProps> = ({
  title,
  variant = 'default',
  className,
  ...props
}) => {
  const baseStyles = classNames(
    'w-full text-white bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
    {
      'bg-blue-600 hover:bg-blue-700': variant === 'primary',
      'bg-white': variant === 'secondary',
    },
    className,
  )

  const textStyles = classNames('text-base text-blue-600 font-semibold text-center', {
    'text-white': variant === 'primary',
    'text-green-600': variant === 'secondary',
  })

  return (
    <Pressable className={baseStyles} {...props}>
      <Text className={textStyles}>{title}</Text>
    </Pressable>
  )
}
