'use client'
import { useEffect, useState } from 'react'

import { MenuItem, Select } from '@mui/material'

import { addTag, deleteTag, getTagGroup, getTags, udpateTag } from '@/api/apiRoutes'
import { toast } from 'react-toastify'
import TagsTable from './TagsTable'
import EditTagModal from './EditTagModal'

const AddTagPage = () => {
  const [tags, setTags] = useState([])
  const [tagsType, setTagTypes] = useState([])
  const [tagName, setTagName] = useState('')
  const [tagDescription, setTagDescription] = useState('')
  const [tagTypeId, setTagTypeId] = useState('')
  const [image, setImage] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    handleFetchTagType()
    handleFetchTags()
  }, [])

  const handleFetchTags = async () => {
    try {
      const response = await getTags()
      setTags(response.data)
    } catch (error) {
      console.log('error while fetching tags', error)
    }
  }

  const handleFetchTagType = async () => {
    try {
      const response = await getTagGroup()

      setTagTypes(response.data)
    } catch (error) {
      console.log('Error while fetching tag group')
    }
  }

  const handleAddTag = async () => {
    try {
      const response = await addTag({ name: tagName, description: tagDescription, typeId: tagTypeId, image: image })
      toast.success(response.message)
    } catch (error) {
      toast.error(error.response.message)
      console.log('error', error)
    }
  }

  const handleChangeTagType = e => {
    setTagTypeId(e.target.value)
  }

  const handleEditClick = tag => {
    setSelectedTag(tag)
    setEditModalOpen(true)
  }

  const handleUpdateTags = async ({ id, name, description, typeId, isActive }) => {
    try {
      const response = await udpateTag({
        tagId: id,
        name: name,
        description: description,
        typeId: typeId,
        isActive: isActive
      })
      toast.success('Tag updated successfully')
      handleFetchTags()
    } catch (error) {
      toast.error(error?.response?.message || 'Error updating tag')
      console.log('error updating tag', error)
    }
  }

  const handleDeleteTag = async data => {
    try {
      const response = await deleteTag({ tagId: data?.id })
      if (response) {
        toast.success(response?.data?.message)
        handleFetchTags()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className='flex gap-4 flex-col'>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <span>Tag Name</span>
            <input
              type='text'
              placeholder='Tag Group Name'
              className='w-full px-2 py-3 rounded-md outline-none text-base'
              value={tagName}
              onChange={e => setTagName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Tag Description</span>
            <input
              type='text'
              placeholder='Tag Group Name'
              className='w-full px-2 py-3 rounded-md outline-none text-base'
              value={tagDescription}
              onChange={e => setTagDescription(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Tag Type</span>
            <Select
              labelId='multiple-permissions-label'
              id='multiple-permissions'
              value={tagTypeId}
              onChange={handleChangeTagType}
              className='w-full rounded-md outline-none text-base'
              sx={{
                padding: '4px 8px',
                '& .MuiSelect-select': {
                  padding: '8px 10px'
                }
              }}
            >
              {tagsType.map(tagType => (
                <MenuItem key={tagType.id} value={tagType.id}>
                  {tagType.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <span>Tag Group Image</span>
            <input
              type='file'
              placeholder='Tag Group Image URL'
              className='w-full px-2 py-3 rounded-md outline-none text-base border'
              onChange={e => setImage(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className='px-4 py-3 rounded-md bg-[#7367F0] text-white' onClick={handleAddTag}>
            Create Tag Group
          </button>
        </div>
      </div>
      <TagsTable data={tags} handleEditClick={handleEditClick} handleDeleteTag={handleDeleteTag} />
      <EditTagModal
        open={editModalOpen}
        setOpen={setEditModalOpen}
        selectedTag={selectedTag}
        tagTypes={tagsType}
        handleUpdateTags={handleUpdateTags}
      />
    </div>
  )
}

export default AddTagPage
