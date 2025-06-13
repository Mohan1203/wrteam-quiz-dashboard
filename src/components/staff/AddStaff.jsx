'use client'

import { useState, useEffect } from 'react'

import { MenuItem, Select } from '@mui/material'

import { toast } from 'react-toastify'

import { createMember, deleteStaff, editStaffRole, editStaffStatus, getRoles, getStaffs } from '@/api/apiRoutes'
import StaffRoleTable from '@/views/apps/user/list/StaffRoleTable'
import EditStaffRole from './EditStaffRoleModal'

const AddStaff = () => {
  const [open, setOpen] = useState(false)
  const [staff, setStaff] = useState([])
  const [roleType, setRoleType] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [selectedRoles, setSelectedRoles] = useState([])
  const [memberRole, setMemberRole] = useState('')
  const [selectedEditRole, setSelectedEditRole] = useState('')
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    handleFetchRoles()
    handleFetchMembers()
  }, [])

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'staff', label: 'Staff' }
  ]

  const handleCreateMember = async () => {
    if (!name || !email || !password || !roleType) {
      toast.error('Please fill in all required fields.')
      return
    }

    if (roleType === 'staff' && !memberRole) {
      toast.error('Please select a role for staff.')
      return
    }

    try {
      const response = await createMember({
        name,
        email,
        password,
        phone,
        role: roleType,
        profile_picture: profilePicture,
        member_role: memberRole
      })
      toast.success('Member created successfully!')
    } catch (error) {
      console.error('Error creating member:', error)
      toast.error(error?.response?.data?.message || 'Failed to create member')
    }
  }

  const handleFetchMembers = async () => {
    try {
      const response = await getStaffs()

      setStaff(response?.data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }

  const handleFetchRoles = async () => {
    try {
      const response = await getRoles()

      const fetchedRoles = response?.data?.map(role => ({
        value: role.id,
        label: role.role_title
      }))

      setSelectedRoles(fetchedRoles)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const handleChangeRole = event => {
    setRoleType(event.target.value)
  }

  const handleChangeMemberRole = event => {
    setMemberRole(event.target.value)
  }

  const updateStaffStatus = async staff => {
    try {
      const response = await editStaffStatus({ id: staff.id, status: !staff.is_active })

      if (response?.data) {
        toast.success(`Staff status updated to ${!staff.is_active ? 'Active' : 'Inactive'}`)
        handleFetchMembers() // Refresh the staff list after updating status
      }
    } catch (error) {
      console.error('Error updating staff status:', error)
      toast.error(error?.response?.data?.message || 'Failed to update staff status')
    }
  }

  const updateStaffRole = async () => {
    try {
      const response = await editStaffRole({ id: selectedMember.id, roleId: selectedEditRole })

      if (response?.data) {
        toast.success('Staff role updated successfully!')
        handleFetchMembers()
      }
    } catch (error) {
      console.error('Error updating staff role:', error)
      toast.error(error?.response?.data?.message || 'Failed to update staff role')
    }
  }

  const handleDeleteStaff = async id => {
    try {
      const response = await deleteStaff({ id })

      if (response?.data) {
        toast.success('Staff deleted successfully!')
        handleFetchMembers() // Refresh the staff list after deletion
      }
    } catch (error) {
      console.error('Error deleting staff:', error)
      toast.error(error?.response?.data?.message || 'Failed to delete staff')
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <span>Username</span>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full px-2 py-3 rounded-md outline-none text-base '
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Email</span>
            <input
              type='email'
              placeholder='Enter email'
              className='w-full px-2 py-3 rounded-md outline-none text-base '
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Password</span>
            <input
              type='password'
              placeholder='Enter password'
              className='w-full px-2 py-3 rounded-md outline-none text-base'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Phone</span>
            <input
              type='email'
              placeholder='Enter phone number'
              className='w-full px-2 py-3 rounded-md outline-none text-base '
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Role</span>
            <Select
              labelId='multiple-permissions-label'
              id='multiple-permissions'
              value={roleType}
              onChange={handleChangeRole}
              className='w-full rounded-md outline-none text-base'
              sx={{
                padding: '4px 8px',
                '& .MuiSelect-select': {
                  padding: '8px 10px'
                }
              }}
            >
              {roles.map(role => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          {roleType === 'staff' && (
            <div className='flex flex-col gap-2'>
              <span>Role Permissions</span>
              <Select
                labelId='multiple-permissions-label'
                id='multiple-permissions'
                value={memberRole}
                onChange={handleChangeMemberRole}
                className='w-full rounded-md outline-none text-base'
                sx={{
                  padding: '4px 8px',
                  '& .MuiSelect-select': {
                    padding: '8px 10px'
                  }
                }}
              >
                {selectedRoles?.map(role => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          <div className='flex flex-col gap-2'>
            <span>Profile Picture</span>
            <input
              type='file'
              accept='image/*'
              className='w-full px-2 py-3 rounded-md outline-none text-base border'
              onChange={e => setProfilePicture(e.target.files[0])}
              placeholder='Upload profile picture'
            />
          </div>
        </div>

        <div>
          <button className='px-4 py-3 rounded-md bg-[#7367F0] text-white' onClick={handleCreateMember}>
            Create Member
          </button>
        </div>
        <StaffRoleTable
          data={staff}
          updateStaffStatus={updateStaffStatus}
          setOpen={setOpen}
          setSelectedMember={setSelectedMember}
          handleDeleteStaff={handleDeleteStaff}
        />
        <EditStaffRole
          open={open}
          setOpen={setOpen}
          roles={selectedRoles}
          updateStaffRole={updateStaffRole}
          selectedEditRole={selectedEditRole}
          setSelectedEditRole={setSelectedEditRole}
        />
      </div>
    </>
  )
}

export default AddStaff
