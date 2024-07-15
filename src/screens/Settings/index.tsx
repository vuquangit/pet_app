import React, {FC} from 'react'
import {TabView, SceneMap} from 'react-native-tab-view'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useWindowDimensions} from 'react-native'

import {Setting} from './Setting'
import {Setting1} from './Setting1'

const renderScene = SceneMap({
  first: Setting,
  second: Setting1,
})

export const SettingsScreen: FC = () => {
  const insets = useSafeAreaInsets()
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {key: 'first', title: 'Setting'},
    {key: 'second', title: 'Setting 1'},
  ])

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{paddingTop: insets.top}}
    />
  )
}
