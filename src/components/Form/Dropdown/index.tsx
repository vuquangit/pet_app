import React, {FC, ReactElement, useRef, useState} from 'react'
import {FlatList, Text, TouchableOpacity, Modal, View} from 'react-native'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'

export interface IComboboxItem {
  label: string
  value: string | number
}

interface Props {
  label?: string
  placeholder?: string
  selected?: IComboboxItem
  data: Array<IComboboxItem>
  onSelect: (item: IComboboxItem) => void
}

export const Dropdown: FC<Props> = ({
  label,
  data,
  placeholder,
  selected: selectedProp,
  onSelect,
}) => {
  const DropdownButton = useRef<TouchableOpacity | null>()
  const [visible, setVisible] = useState<boolean>(false)
  const [selected, setSelected] = useState<IComboboxItem | undefined>(selectedProp)
  const [dropdownTop, setDropdownTop] = useState<number>(0)
  const [dropdownLeft, setDropdownLeft] = useState<number>(0)
  const [minWidth, setMinWidth] = useState<number>(0)

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown()
  }

  const openDropdown = (): void => {
    if (!DropdownButton.current) {
      return
    }

    DropdownButton.current.measure(
      (_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
        setDropdownTop(pageY + height)
        setDropdownLeft(pageX)
        setMinWidth(width)
      },
    )
    setVisible(true)
  }

  const onItemPress = (item: any): void => {
    setSelected(item)
    onSelect(item)
    setVisible(false)
  }

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      className="px-3 py-2 border-b border-gray-300"
      onPress={() => onItemPress(item)}>
      <Text className="text-sm">{item.label}</Text>
    </TouchableOpacity>
  )

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          className="w-full h-full bg-transparent"
          onPress={() => setVisible(false)}>
          <View
            style={[{top: dropdownTop, left: dropdownLeft, minWidth: minWidth}]}
            className="absolute bg-white shadow-xl max-h-[180px] overflow-y-auto">
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  return (
    <View className="flex-row items-center gap-1">
      <Text className="text-sm">{label}</Text>
      <TouchableOpacity
        // @ts-ignore
        ref={DropdownButton}
        className="relative flex-row items-center w-auto px-2 py-1 bg-white border border-gray-300 rounded-md"
        onPress={toggleDropdown}>
        {renderDropdown()}
        <Text className="mr-2 text-sm">{(selected && selected.label) || placeholder}</Text>
        <FontAwesomeIcon icon={faAngleDown} size={15} color="#aaaaaa" />
      </TouchableOpacity>
    </View>
  )
}
