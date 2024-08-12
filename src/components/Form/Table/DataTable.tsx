// https://github.com/callstack/react-native-paper/blob/main/src/components/DataTable/DataTable.tsx

import * as React from 'react'
import {StyleSheet, StyleProp, View, ViewStyle} from 'react-native'

import DataTableHeader, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DataTableHeader as _DataTableHeader,
} from './DataTableHeader'
import DataTableCell from './DataTableCell'
import DataTablePagination from './DataTablePagination'
import DataTableTitle from './DataTableTitle'
import DataTableRow from './DataTableRow'

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `DataTable`.
   */
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const DataTable = ({children, style, ...rest}: Props) => (
  <View {...rest} style={[styles.container, style]}>
    {children}
  </View>
)

// @component ./DataTableHeader.tsx
DataTable.Header = DataTableHeader

// @component ./DataTableTitle.tsx
DataTable.Title = DataTableTitle

// @component ./DataTableRow.tsx
DataTable.Row = DataTableRow

// @component ./DataTableCell.tsx
DataTable.Cell = DataTableCell

// @component ./DataTablePagination.tsx
DataTable.Pagination = DataTablePagination

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})

export default DataTable
