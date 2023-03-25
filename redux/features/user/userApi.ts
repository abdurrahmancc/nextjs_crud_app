import { UserModel } from '@/types'

/* ================= get all users ================ */
export const getUsers = async () => {
  try {
    const getItem: any = localStorage.getItem('crud-users')
    const getAllUsers = JSON.parse(getItem)
    return getAllUsers?.data
  } catch (error: any) {
    console.log(error?.message)
  }
}

/* ================= delete user ================ */
export const deleteUser = async (id: string) => {
  try {
    const getItem: any = localStorage.getItem('crud-users')
    if (getItem) {
      const getUsers = JSON.parse(getItem)
      const deleteUser =
        getUsers && getUsers?.data.filter((user: any) => user?.id !== id)
      localStorage.setItem('crud-users', JSON.stringify({ data: deleteUser }))
      return deleteUser
    }
  } catch (error: any) {
    console.log(error?.message)
  }
}

/* ================= add user ================ */
export const addUser = async (info: UserModel) => {
  try {
    if (info) {
      const getUser: any = localStorage.getItem('crud-users')
      const parsUsers = JSON.parse(getUser)
      if (parsUsers) {
        localStorage.setItem(
          'crud-users',
          JSON.stringify({ data: [...parsUsers.data, info] })
        )
        return info
      } else {
        localStorage.setItem('crud-users', JSON.stringify({ data: [info] }))
        return info
      }
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

/* ================= update user ================ */
export const updateUser = async (info: UserModel) => {
  try {
    const getUsers: any = localStorage.getItem('crud-users')
    const parsUsers = JSON.parse(getUsers)

    const userInfo =
      parsUsers &&
      parsUsers.data.filter((user: UserModel) => user?.id !== info.id)

    if (info) {
      const items = localStorage.setItem(
        'crud-users',
        JSON.stringify({ data: [...userInfo, info] })
      )
      return items
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
