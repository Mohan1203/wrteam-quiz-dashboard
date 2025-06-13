import {
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const TagsTable = ({ data = [], handleEditClick, handleUpdateTags, handleDeleteTag }) => {
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Tags Type',
      accessorFn: row => row.tag_type?.name
    },
    {
      header: 'Is Active',
      accessorKey: 'is_active'
    }
  ]

  // Add Actions column only if the first row's type is 'staff'

  columns.push({
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => (
      <>
        <IconButton color='primary' onClick={() => handleEdit(row.original)}>
          <FaRegEdit />
        </IconButton>
        <IconButton color='error' onClick={() => handleDeleteTa(row.original)}>
          <MdDelete />
        </IconButton>
      </>
    )
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleEdit = data => {
    handleEditClick(data)
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align='center'>
                No data available
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TagsTable
