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
  TextField,
  FormControlLabel,
  Switch
} from '@mui/material'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
}

const EditTagModal = ({ open, setOpen, selectedTag, tagTypes = [], handleUpdateTags }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [typeId, setTypeId] = useState('')
  const [isActive, setIsActive] = useState()

  useEffect(() => {
    if (selectedTag) {
      setName(selectedTag.name || '')
      setDescription(selectedTag.description || '')
      setTypeId(selectedTag.tag_type.id || '')
      setIsActive(selectedTag.is_active || false)
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    handleUpdateTags({
      id: selectedTag?.id,
      name: name,
      description: description,
      typeId: typeId,
      isActive: isActive
    })
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby='edit-tag-title' aria-describedby='edit-tag-description'>
      <Box sx={modalStyle}>
        <Typography id='edit-tag-title' variant='h6' component='h2' mb={2}>
          Edit Tag
        </Typography>

        <TextField label='Tag Name' fullWidth value={name} onChange={e => setName(e.target.value)} sx={{ mb: 2 }} />

        <TextField
          label='Tag Description'
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id='tag-type-select-label'>Tag Type</InputLabel>
          <Select
            labelId='tag-type-select-label'
            value={typeId}
            label='Tag Type'
            onChange={e => setTypeId(e.target.value)}
          >
            {tagTypes.map(type => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Switch checked={!!isActive} onChange={e => setIsActive(e.target.checked)} color='primary' />}
          label='Active Status' // Your label here
        />

        <Box display='flex' justifyContent='flex-end' gap={2}>
          <Button onClick={handleClose} color='secondary' variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary' variant='contained' disabled={!name || !typeId}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditTagModal
