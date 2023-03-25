import { UserModel } from './../../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addUser, deleteUser, getUsers, updateUser } from './userApi'

type InitialState = {
  isLoading: boolean
  users: UserModel[] | []
  isExist: boolean
  isError: boolean
  error: string
}

const initialState: InitialState = {
  isLoading: false,
  users: [],
  isExist: false,
  isError: false,
  error: ''
}

export const fetchUser = createAsyncThunk('user/fetchUsers', async () => {
  const users = await getUsers()
  return users
})

export const removeUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string) => {
    const users = await deleteUser(id)
    return users
  }
)

export const addToUser = createAsyncThunk(
  'user/addUser',
  async (info: UserModel) => {
    const users = await addUser(info)
    return users
  }
)

export const updateToUser = createAsyncThunk(
  'user/updateUser',
  async (info: UserModel) => {
    const users = await updateUser(info)
    return users
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        ;(state.isLoading = true), (state.isError = false)
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        ;(state.isLoading = false),
          (state.isError = false),
          (state.users = action.payload)
      })
      .addCase(fetchUser.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.isError = false),
          (state.users = []),
          (state.error = action.error?.message || 'something is error')
      })
      .addCase(removeUser.pending, state => {
        ;(state.isLoading = true), (state.isError = false)
      })
      .addCase(removeUser.fulfilled, (state, action: PayloadAction<any>) => {
        ;(state.isLoading = false),
          (state.isError = false),
          (state.users = action.payload)
      })
      .addCase(removeUser.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.isError = false),
          (state.users = []),
          (state.error = action.error?.message || 'something is error')
      })
      .addCase(addToUser.pending, state => {
        ;(state.isLoading = true),
          (state.isError = false),
          (state.isExist = false)
      })
      .addCase(addToUser.fulfilled, (state, action: PayloadAction<any>) => {
        ;(state.isLoading = false), (state.isError = false)
        if (action.payload) {
          state.users = [action.payload]
        }
      })
      .addCase(addToUser.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.isError = false),
          (state.error = action.error?.message || 'something is error')
      })
      .addCase(updateToUser.pending, state => {
        ;(state.isLoading = true),
          (state.isError = false),
          (state.isExist = false)
      })
      .addCase(updateToUser.fulfilled, (state, action: PayloadAction<any>) => {
        ;(state.isLoading = false),
          (state.isError = false),
          (state.users = [...state.users])
      })
      .addCase(updateToUser.rejected, (state, action) => {
        ;(state.isLoading = false),
          (state.isError = false),
          (state.error = action.error?.message || 'something is error')
      })
  }
})

export default userSlice.reducer
