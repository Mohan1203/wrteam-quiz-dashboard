'use client'
import { useEffect, useState } from 'react'

import { Select, MenuItem } from '@mui/material'

import { createRole, deleteRole, getPermissions, getRole, getRoles, updateRole } from '@/api/apiRoutes'
import RoleTable from '@/views/apps/user/list/RoleListTable'
import EditRoleModal from './EditRoleModals'
import { toast } from 'react-toastify'

const AddRolePage = () => {
  const [open, setOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [roleName, setRoleName] = useState('')
  const [roles, setRoles] = useState([])

  useEffect(() => {
    handleFetchPermissions()
    handleFetchRole()
  }, [])

  const handleFetchRole = async () => {
    try {
      const response = await getRoles()
      setRoles(response?.data)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const handleCreateRole = async () => {
    try {
      const response = await createRole({ role_title: roleName, permission_ids: selectedPermissions })
      await handleFetchRole()
      setRoleName('')
      setSelectedPermissions([])
      toast.success('Role created successfully')
    } catch (error) {
      console.error('Error creating permission:', error)
    }
  }

  const handleFetchPermissions = async () => {
    try {
      const response = await getPermissions()
      setPermissions(response?.data)
    } catch (error) {
      console.error('Error fetching permissions:', error)
    }
  }

  const handlePermissionsChange = event => {
    setSelectedPermissions(event.target.value)
  }

  const handleDeleteRole = async roleId => {
    try {
      const response = await deleteRole({ id: roleId })
      await handleFetchRole()
      toast.success('Role deleted successfully')
    } catch (error) {
      console.error('Error deleting role:', error)
    }
  }

  const handleEditRole = async role => {
    // Fetch role details if needed, or just use the role object
    const response = await getRole({ id: role.id })
    setSelectedRole(response?.data)
    setOpen(true)
  }

  const handleUpdateRole = async updatedRole => {
    try {
      const response = await updateRole({
        id: updatedRole.id,
        role_title: updatedRole.role_title,
        permission_ids: updatedRole.permission_ids
      })
      setOpen(false)
      await handleFetchRole()
      toast.success('Role updated successfully')
    } catch (error) {
      console.log('Error updating role:', error)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <span>Role Name</span>
            <input
              type='text'
              placeholder='Role Name'
              className='w-full px-2 py-3 rounded-md outline-none text-base'
              value={roleName}
              onChange={e => setRoleName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Role Permissions</span>
            <Select
              labelId='multiple-permissions-label'
              id='multiple-permissions'
              multiple
              value={selectedPermissions}
              onChange={handlePermissionsChange}
              className='w-full rounded-md outline-none text-base'
              renderValue={selected =>
                permissions
                  .filter(p => selected.includes(p.id))
                  .map(p => p.title)
                  .join(', ')
              }
              sx={{
                padding: '4px 8px',
                '& .MuiSelect-select': {
                  padding: '8px 10px'
                }
              }}
            >
              {permissions.map(permission => (
                <MenuItem key={permission.id} value={permission.id}>
                  {permission.title}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <button className='px-4 py-3 rounded-md bg-[#7367F0] text-white' onClick={handleCreateRole}>
            Create Role
          </button>
        </div>
        <RoleTable data={roles} handleDeleteRole={handleDeleteRole} setOpen={setOpen} handleEditRole={handleEditRole} />
        <EditRoleModal
          open={open}
          setOpen={setOpen}
          permissions={permissions}
          selectedRole={selectedRole}
          onSave={handleUpdateRole}
        />
      </div>
    </>
  )
}

export default AddRolePage
