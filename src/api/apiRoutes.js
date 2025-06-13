'use client'
import customApi from './axiosMiddleware'
import * as apiEndpoints from './apiEndpoints'

export const loginAdmin = async ({ identifier, password }) => {
  const requestBody = {
    method: 'email',
    identifier: identifier,
    password: password
  }

  const response = await customApi.post(`${apiEndpoints.AUTH_TYPE}/${apiEndpoints.LOGIN_API}`, requestBody, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  return response.data
}

// export const getUsers = async () => {
//   const response = await customApi.get(`${apiEndpoints.USERS_API}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     }
//   })

//   return response.data
// }

export const createRole = async ({ role_title, permission_ids }) => {
  const requestBody = {
    role_title: role_title,
    permission_ids: permission_ids
  }

  const response = await customApi.post(`${apiEndpoints.AUTH_TYPE}/${apiEndpoints.ROLES}`, requestBody, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  return response.data
}

export const getRole = async ({ id }) => {
  const response = await customApi.get(`${apiEndpoints.AUTH_TYPE}${apiEndpoints.ROLES}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  return response.data
}

export const getRoles = async () => {
  const response = await customApi.get(`${apiEndpoints.AUTH_TYPE}${apiEndpoints.ROLES}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  return response.data
}

export const updateRole = async ({ id, role_title, permission_ids }) => {
  const requestBody = {
    role_title: role_title,
    permission_ids: permission_ids
  }

  const response = await customApi.put(`${apiEndpoints.AUTH_TYPE}${apiEndpoints.ROLES}/${id}`, requestBody, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  return response.data
}

export const getPermissions = async () => {
  const response = await customApi.get(`${apiEndpoints.AUTH_TYPE}/${apiEndpoints.PERMISSIONS}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  return response.data
}

export const deleteRole = async ({ id }) => {
  const response = await customApi.delete(`${apiEndpoints.AUTH_TYPE}${apiEndpoints.ROLES}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  return response.data
}

export const createMember = async ({ name, email, password, phone, role, profile_picture, member_role }) => {
  const formData = new FormData()

  formData.append('full_name', name)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('role', role)

  if (phone) {
    formData.append('phone', phone)
  }

  if (profile_picture !== null) {
    formData.append('image', profile_picture)
  }

  if (member_role) {
    formData.append('staff_role_id', member_role)
  }

  const response = await customApi.post(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.STAFF}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data'
    }
  })

  return response.data
}

export const getStaffs = async () => {
  const response = await customApi.get(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.STAFF}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  return response.data
}

export const editStaffStatus = async ({ id, status }) => {
  const params = {
    id: id
  }

  const requestBody = {
    is_active: status
  }

  const response = await customApi.patch(
    `${apiEndpoints.ADMIN_TYPE}${apiEndpoints.STAFF}/${id}${apiEndpoints.STATUS}`,
    requestBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  )

  return response.data
}

export const editStaffRole = async ({ id, roleId }) => {
  const requestBody = {
    staff_role_id: roleId
  }

  const response = await customApi.patch(
    `${apiEndpoints.ADMIN_TYPE}${apiEndpoints.STAFF}/${id}${apiEndpoints.ROLE}`,
    requestBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  )

  return response.data
}

export const deleteStaff = async ({ id }) => {
  const response = await customApi.delete(
    `${apiEndpoints.ADMIN_TYPE}${apiEndpoints.STAFF}/${id}${apiEndpoints.PERMANENT}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  )

  return response.data
}

export const getTagGroup = async () => {
  const response = await customApi.get(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.TAG_TYPES}`)
  return response.data
}

export const createTagGroup = async ({ tag_name, tag_description, tag_image }) => {
  const formData = new FormData()
  formData.append('name', tag_name)
  formData.append('is_active', true)
  if (tag_description) {
    formData.append('description', tag_description)
  }
  if (tag_image) {
    formData.append('image', tag_image)
  }
  const response = await customApi.post(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.TAG_TYPES}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data'
    }
  })
  return response.data
}

export const updateTagGroup = async ({ tagId, tagName, tagDescription, tagActive, tagImage }) => {
  const formData = new FormData()
  formData.append('name', tagName)
  formData.append('description', tagDescription)
  formData.append('is_active', tagActive)
  formData.append('image', tagImage)
  const response = await customApi.put(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.TAG_TYPES}/${tagId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data'
    }
  })

  return response.data
}

export const deleteTagGroup = async ({ tagId }) => {
  const response = await customApi.delete(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.TAG_TYPES}/${tagId}`)
  return response.data
}

export const getTags = async () => {
  const response = await customApi.get(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.TAGS}`)
  return response.data
}

export const addTag = async ({ name, description, typeId, image }) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('description', description)
  formData.append('tag_type_id', typeId)
  formData.append('is_active', true)
  if (image) {
    formData.append('image', image)
  }

  const response = await customApi.post(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.TAGS}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data'
    }
  })
  return response.data
}

export const udpateTag = async ({ tagId, name, description, typeId, isActive }) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('description', description)
  formData.append('tag_type_id', typeId)
  formData.append('is_active', isActive)
  const response = await customApi.put(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.TAGS}/${tagId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data'
    }
  })
  return response.data
}

export const deleteTag = async ({ tagId }) => {
  const response = await customApi.delete(`${apiEndpoints.ADMIN_TYPE}${apiEndpoints.TAGS}/${tagId}`)
  return response.data
}
