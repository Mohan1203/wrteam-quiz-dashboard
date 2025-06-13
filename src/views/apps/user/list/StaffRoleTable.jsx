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
import { set } from 'react-hook-form'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const StaffRoleTable = ({
  data = [],
  onEdit,
  onDelete,
  updateStaffStatus,
  setOpen,
  setSelectedMember,
  handleDeleteStaff
}) => {
  const handleModalOpen = staff => {
    setSelectedMember(staff)
    setOpen(true)
  }

  const columns = [
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Role',
      accessorKey: 'role'
    },
    {
      header: 'Is Active',
      accessorKey: 'is_active',
      cell: ({ row }) => (
        <Switch checked={!!row.original.is_active} onChange={e => updateStaffStatus(row.original)} color='primary' />
      )
    },
    {
      header: 'Role Title',
      accessorFn: row => row.staff_profile?.role?.role_title || 'Admin'
    }
  ]

  // Add Actions column only if the first row's type is 'staff'

  columns.push({
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) =>
      row?.original?.role == 'staff' ? (
        <>
          <IconButton color='primary' onClick={() => handleModalOpen(row?.original)}>
            <FaRegEdit />
          </IconButton>
          <IconButton color='error' onClick={() => handleDeleteStaff(row.original.id)}>
            <MdDelete />
          </IconButton>
        </>
      ) : null
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

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

export default StaffRoleTable
