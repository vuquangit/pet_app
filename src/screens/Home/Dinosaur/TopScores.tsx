import * as React from 'react'
import DataTable from 'src/components/Form/Table/DataTable'

const TopScores = () => {
  const [page, setPage] = React.useState<number>(0)
  const [numberOfItemsPerPageList] = React.useState([5, 10, 20, 50])
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0])

  const [items] = React.useState(
    Array(100)
      .fill(undefined)
      .map((_, index) => ({
        key: index,
        name: `Item ${index + 1}`,
        calories: 356 + index,
        fat: 16 + index * 2,
      })),
  )

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, items.length)

  React.useEffect(() => {
    setPage(0)
  }, [itemsPerPage])

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map(item => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
          <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  )
}

export default TopScores
