import * as React from 'react'
import {ColorValue, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faBackwardStep} from '@fortawesome/free-solid-svg-icons/faBackwardStep'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight'
import {faForwardStep} from '@fortawesome/free-solid-svg-icons/faForwardStep'

import {ButtonField, Dropdown, IComboboxItem} from 'src/components/Form'

export type Props = React.ComponentPropsWithRef<typeof View> &
  PaginationControlsProps &
  PaginationDropdownProps & {
    /**
     * Label text for select page dropdown to display.
     */
    selectPageDropdownLabel?: string
    /**
     * AccessibilityLabel for `selectPageDropdownLabel`.
     */
    selectPageDropdownAccessibilityLabel?: string
    /**
     * Label text to display which indicates current pagination.
     */
    label?: React.ReactNode
    /**
     * AccessibilityLabel for `label`.
     */
    accessibilityLabel?: string
    style?: StyleProp<ViewStyle>
    /**
     * @optional
     */
    // theme?: ThemeProp
  }

type PaginationDropdownProps = {
  label?: string
  placeholder?: string
  /**
   * The current number of rows per page.
   */
  numberOfItemsPerPage?: number
  /**
   * Options for a number of rows per page to choose from.
   */
  numberOfItemsPerPageList?: Array<number>
  /**
   * The function to set the number of rows per page.
   */
  onItemsPerPageChange: (numberOfItemsPerPage: number) => void
}

type PaginationControlsProps = {
  /**
   * The currently visible page (starting with 0).
   */
  page: number
  /**
   * The total number of pages.
   */
  numberOfPages: number
  /**
   * Function to execute on page change.
   */
  onPageChange: (page: number) => void
  /**
   * Whether to show fast forward and fast rewind buttons in pagination. False by default.
   */
  showFastPaginationControls?: boolean
  /**
   * Color of the pagination control ripple effect.
   */
  paginationControlRippleColor?: ColorValue
}

const PaginationControls = ({
  page,
  numberOfPages,
  showFastPaginationControls,
  onPageChange,
}: PaginationControlsProps) => {
  const isDisabledNext = numberOfPages === 0 || page === numberOfPages - 1

  return (
    <View className="flex flex-row gap-1">
      {showFastPaginationControls ? (
        <ButtonField
          disabled={page === 0}
          onPress={() => onPageChange(0)}
          title=""
          type="text"
          className="w-6">
          <FontAwesomeIcon
            icon={faBackwardStep}
            size={20}
            color={page === 0 ? '#BBBBBB' : '#27374D'}
          />
        </ButtonField>
      ) : null}

      <ButtonField
        disabled={page === 0}
        onPress={() => onPageChange(page - 1)}
        title=""
        type="text"
        className="w-6">
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={20}
          color={page === 0 ? '#BBBBBB' : '#27374D'}
        />
      </ButtonField>

      <ButtonField
        disabled={isDisabledNext}
        onPress={() => onPageChange(page + 1)}
        title=""
        type="text"
        className="w-6">
        <FontAwesomeIcon
          icon={faChevronRight}
          size={20}
          color={isDisabledNext ? '#BBBBBB' : '#27374D'}
        />
      </ButtonField>

      {showFastPaginationControls ? (
        <ButtonField
          disabled={isDisabledNext}
          onPress={() => onPageChange(numberOfPages - 1)}
          accessibilityLabel="page-last"
          title=""
          type="text"
          className="w-6">
          <FontAwesomeIcon
            icon={faForwardStep}
            size={20}
            color={isDisabledNext ? '#BBBBBB' : '#27374D'}
          />
        </ButtonField>
      ) : null}
    </View>
  )
}

const PaginationDropdown = ({
  label,
  placeholder,
  numberOfItemsPerPageList = [],
  numberOfItemsPerPage = 0,
  onItemsPerPageChange,
}: PaginationDropdownProps) => {
  const data: IComboboxItem[] = numberOfItemsPerPageList.map(item => {
    return {label: `${item}`, value: item}
  })

  const selected: IComboboxItem = {
    label: `${numberOfItemsPerPage || 0}`,
    value: numberOfItemsPerPage || 0,
  }

  return (
    <Dropdown
      label={label}
      placeholder={placeholder}
      selected={selected}
      data={data}
      onSelect={val => onItemsPerPageChange(Number(val.value))}
    />
  )
}

const DataTablePagination = ({
  label,
  accessibilityLabel,
  page,
  numberOfPages,
  onPageChange,
  style,
  showFastPaginationControls = false,
  numberOfItemsPerPageList,
  numberOfItemsPerPage,
  onItemsPerPageChange,
  selectPageDropdownLabel,
  ...rest
}: Props) => {
  return (
    <View {...rest} style={[styles.container, style]} accessibilityLabel="pagination-container">
      {numberOfItemsPerPageList && numberOfItemsPerPage && onItemsPerPageChange && (
        <View accessibilityLabel="Options Select" style={styles.optionsContainer}>
          <PaginationDropdown
            label={selectPageDropdownLabel}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </View>
      )}

      <Text
        style={[styles.label]}
        numberOfLines={3}
        accessibilityLabel={accessibilityLabel || 'label'}
        className="ml-1">
        {label}
      </Text>

      <View style={styles.iconsContainer}>
        <PaginationControls
          showFastPaginationControls={showFastPaginationControls}
          onPageChange={onPageChange}
          page={page}
          numberOfPages={numberOfPages}
        />
      </View>
    </View>
  )
}

DataTablePagination.displayName = 'DataTable.Pagination'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    flexWrap: 'wrap',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    fontSize: 12,
    marginRight: 16,
  },
  button: {
    textAlign: 'center',
    marginRight: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  contentStyle: {
    flexDirection: 'row-reverse',
  },
})

export default DataTablePagination

export {DataTablePagination}
