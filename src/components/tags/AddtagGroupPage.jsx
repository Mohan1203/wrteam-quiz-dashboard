'use client'
import { createTagGroup, getTagGroup, updateTagGroup, deleteTagGroup } from '@/api/apiRoutes'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import TagGroupTable from './TagsGroupTable'
import EditTagGroupModal from './EditTagGroupModal'

const AddtagGroupPage = () => {
  const [tagTypes, setTagTypes] = useState([])
  const [tagName, setTagGroupName] = useState('')
  const [tagDescription, setTagDescription] = useState('')
  const [tagImage, setTagImage] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedEditGroup, setSelectedEditGroup] = useState([])

  useEffect(() => {
    handleFetchTagType()
  }, [])

  const handleFetchTagType = async () => {
    try {
      const response = await getTagGroup()
      setTagTypes(response.data)
    } catch (error) {
      console.log('Error while fetching tag group')
    }
  }

  const handleEditTagGroup = data => {
    setSelectedEditGroup(data)
  }

  const deleteTagType = async data => {
    try {
      const userConfirmed = confirm('Do you want to delete tag type?')
      if (userConfirmed) {
        const response = await deleteTagGroup({ tagId: data?.id })

        toast.success(response.data.message)
        if (response.data) {
          handleFetchTagType()
        }
      } else {
        return
      }
    } catch (error) {
      console.log('message', error)
      // toast.error(error.response.data.message)
    }
  }

  const handleUpdateTagGroup = async updatedData => {
    const { id, tag_name, tag_description, tag_image, is_active } = updatedData
    try {
      // Use your API route or axios call to update the tag group
      const response = await updateTagGroup({
        tagId: id,
        tagName: tag_name,
        tagDescription: tag_description,
        tagImage: tag_image,
        tagActive: is_active
      })
      if (response) {
        handleFetchTagType()
        toast.success('Tag group updated successfully')
      }
    } catch (error) {
      console.error('Error updating tag group:', error)
      toast.error('Failed to update tag group')
    }
  }

  const handleCreateTagGroup = async () => {
    try {
      if (!tagName) {
        return toast.error('Tag group name is required')
      }
      const response = await createTagGroup({
        tag_name: tagName,
        tag_description: tagDescription,
        tag_image: tagImage
      })
      if (response) {
        setTagGroupName('')
        setTagDescription('')
        setTagImage('')
        toast.success('Tag group created successfully')
        handleFetchTagType()
      }
    } catch (error) {
      console.error('Error creating tag group:', error)
    }
  }

  return (
    <div className='flex gap-4 flex-col'>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <span>Tag Group Name</span>
            <input
              type='text'
              placeholder='Tag Group Name'
              className='w-full px-2 py-3 rounded-md outline-none text-base'
              value={tagName}
              onChange={e => setTagGroupName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Tag Group Description</span>
            <input
              type='text'
              placeholder='Tag Group Description'
              className='w-full px-2 py-3 rounded-md outline-none text-base'
              value={tagDescription}
              onChange={e => setTagDescription(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span>Tag Group Image</span>
            <input
              type='file'
              placeholder='Tag Group Image URL'
              className='w-full px-2 py-3 rounded-md outline-none text-base border'
              onChange={e => setTagImage(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className='px-4 py-3 rounded-md bg-[#7367F0] text-white' onClick={handleCreateTagGroup}>
            Create Tag Group
          </button>
        </div>
      </div>
      <TagGroupTable
        data={tagTypes}
        handleEditTagGroup={handleEditTagGroup}
        setOpen={setOpen}
        deleteTagType={deleteTagType}
      />
      <EditTagGroupModal
        open={open}
        setOpen={setOpen}
        selectedEditGroup={selectedEditGroup}
        handleUpdateTagGroup={handleUpdateTagGroup}
      />
    </div>
  )
}

export default AddtagGroupPage
