import { useState, useEffect } from 'react'
import {
  Box,
  Modal,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip
} from '@mui/material'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column'
}

const EditRoleModal = ({ open, setOpen, permissions = [], selectedRole = null, onSave }) => {
  const [roleName, setRoleName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState([])

  useEffect(() => {
    if (selectedRole) {
      setRoleName(selectedRole.role_title || '')
      setSelectedPermissions(selectedRole.permissions?.map(p => p.id) || [])
    }
  }, [selectedRole, open])

  const handleClose = () => {
    setOpen(false)
    setRoleName('')
    setSelectedPermissions([])
  }

  const handleSave = () => {
    if (onSave && selectedRole) {
      onSave({
        id: selectedRole.id,
        role_title: roleName,
        permission_ids: selectedPermissions
      })
      handleClose()
    }
  }

  const handlePermissionsChange = event => {
    setSelectedPermissions(event.target.value)
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby='edit-role-title' aria-describedby='edit-role-description'>
      <Box sx={modalStyle}>
        <Typography id='edit-role-title' variant='h6' component='h2' mb={2}>
          Edit Role
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id='role-permissions-label'>Role Permissions</InputLabel>
          <Select
            labelId='role-permissions-label'
            multiple
            value={selectedPermissions}
            onChange={handlePermissionsChange}
            input={<OutlinedInput label='Role Permissions' />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => {
                  const perm = permissions.find(p => p.id === value)
                  return <Chip key={value} label={perm ? perm.title : value} />
                })}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  overflowY: 'auto'
                }
              }
            }}
          >
            {permissions.map(permission => (
              <MenuItem key={permission.id} value={permission.id}>
                {permission.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel shrink htmlFor='role-name-input'>
            Role Name
          </InputLabel>
          <input
            id='role-name-input'
            type='text'
            placeholder='Role Name'
            className='w-full px-2 py-3 rounded-md outline-none text-base'
            value={roleName}
            onChange={e => setRoleName(e.target.value)}
            style={{ marginTop: 8 }}
          />
        </FormControl>
        <Box display='flex' justifyContent='flex-end' gap={2}>
          <Button onClick={handleClose} color='secondary' variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color='primary'
            variant='contained'
            disabled={!roleName || selectedPermissions.length === 0}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditRoleModal
