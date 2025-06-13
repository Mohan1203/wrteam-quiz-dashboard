'use client'

import { useEffect, useState } from 'react'
import { Box, Modal, Typography, Button, TextField, Switch, FormControlLabel } from '@mui/material'

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

const EditTagGroupModal = ({ open, setOpen, selectedEditGroup, handleUpdateTagGroup }) => {
  const [tagName, setTagName] = useState('')
  const [tagDescription, setTagDescription] = useState('')
  const [tagImage, setTagImage] = useState('')
  const [isActive, setIsActive] = useState()

  useEffect(() => {
    if (selectedEditGroup) {
      setTagName(selectedEditGroup.name || '')
      setTagDescription(selectedEditGroup.description || '')
      setTagImage(selectedEditGroup.tag_image || '')
      setIsActive(selectedEditGroup.is_active || false)
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    handleUpdateTagGroup({
      id: selectedEditGroup.id,
      tag_name: tagName,
      tag_description: tagDescription,
      tag_image: tagImage,
      is_active: isActive
    })
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby='edit-tag-group-title'>
      <Box sx={modalStyle}>
        <Typography id='edit-tag-group-title' variant='h6' mb={3}>
          Edit Tag Group
        </Typography>

        <TextField
          label='Tag Group Name'
          fullWidth
          variant='outlined'
          sx={{ mb: 2 }}
          value={tagName}
          onChange={e => setTagName(e.target.value)}
        />

        <TextField
          label='Description'
          fullWidth
          variant='outlined'
          sx={{ mb: 2 }}
          value={tagDescription}
          onChange={e => setTagDescription(e.target.value)}
        />

        <FormControlLabel
          control={<Switch checked={!!isActive} onChange={e => setIsActive(e.target.checked)} color='primary' />}
          label='Active Status' // Your label here
        />

        {/* <TextField
          label='Image URL'
          fullWidth
          variant='outlined'
          sx={{ mb: 3 }}
          value={tagImage}
          onChange={e => setTagImage(e.target.value)}
        /> */}

        <Box display='flex' justifyContent='flex-end' gap={2}>
          <Button onClick={handleClose} variant='outlined' color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleSave} variant='contained' color='primary' disabled={!tagName}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditTagGroupModal
