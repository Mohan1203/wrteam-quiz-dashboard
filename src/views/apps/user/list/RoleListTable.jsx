import React from 'react'

import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'

import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const RoleTable = ({ data = [], onEdit, handleDeleteRole, setOpen, handleEditRole }) => {
  

  const columns = [
    {
      header: 'Role Title',
      accessorKey: 'role_title'
    },
    {
      header: 'Permissions',
      accessorKey: 'permissions_count'
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: ({ getValue }) => new Date(getValue()).toLocaleString()
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <>
          <IconButton color='primary' onClick={() => handleEditRole(row.original)}>
            <FaRegEdit />
          </IconButton>
          <IconButton color='error' onClick={() => handleDeleteRole(row.original.id)}>
            <MdDelete />
          </IconButton>
        </>
      )
    }
  ]

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

export default RoleTable
