import { Dispatch, SetStateAction } from 'react'
export interface UserModel {
  name: string
  email: string
  img: string
  id?: string
}

export interface RootContextTypes {
  isLightTheme: boolean
  setIsLightTheme: Dispatch<SetStateAction<boolean>>
}
