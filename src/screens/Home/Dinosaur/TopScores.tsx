import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { IDinosaur } from 'src/interfaces'

import { useLazyGetDinosaurListQuery } from 'src/services/dinosaur'

type Props = {
  isCreating: boolean
}

export type TopScoresRef = {
  refresh: () => Promise<void>
}

export const TopScores = forwardRef<TopScoresRef, Props>((props, ref) => {
  const { isCreating } = props

  const [getDinosaurList, { isLoading }] = useLazyGetDinosaurListQuery()

  const [data, setData] = useState<IDinosaur[]>([])
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    current: 1,
    total: 0,
  })

  // Pass the ref to the useImperativeHandle hook
  useImperativeHandle(
    ref,
    () => ({
      refresh: async () => {
        await fetchData()
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const fetchData = async () => {
    const dataRes = await getDinosaurList({
      page: pagination.page,
      limit: pagination.limit,
      top: 10,
    }).unwrap()

    const newData = dataRes.result?.data || []
    const meta = dataRes.result?.meta
    // setData(prevData => [...prevData, ...newData])
    setData(newData)
    setPagination(prev => ({
      ...prev,
      total: meta?.total || 0,
    }))

    !isFirstPageReceived && setIsFirstPageReceived(true)
  }

  // const fetchNextPage = () => {
  //   if (data.length > 100) {
  //     return
  //   }
  //   fetchData()
  // }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderItem = ({ item }: { item: IDinosaur }) => {
    return (
      <View key={item.id} className="flex flex-row justify-between w-full px-4 py-2">
        <Text className="text-lg text-[#595959]">{item.user.name}</Text>
        <Text className="text-xl text-[#595959]">{item.score}</Text>
      </View>
    )
  }

  const ListEndLoader = () => {
    if (isLoading) {
      // Show loader at the end of list when fetching next page data.
      return (
        <View className="flex justify-center w-full">
          <ActivityIndicator size={'large'} />
        </View>
      )
    }
  }

  if (!isFirstPageReceived && isLoading) {
    // Show loader when fetching first page data.
    return (
      <View className="flex items-center justify-center w-full">
        <ActivityIndicator size={'small'} />
      </View>
    )
  }

  return (
    <View className="w-full">
      <Text className="text-xl text-[#595959] text-center font-bold">Top 10</Text>
      {isCreating && (
        <View className="flex items-center justify-center w-full">
          <ActivityIndicator size={'small'} />
        </View>
      )}
      <FlatList
        className="w-full"
        data={data}
        renderItem={renderItem}
        // onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}
        ListFooterComponent={ListEndLoader} // Loader when loading next page.
      />
    </View>
  )
})

export default TopScores
