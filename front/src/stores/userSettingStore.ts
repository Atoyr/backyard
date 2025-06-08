import { defineStore } from 'pinia'
import type { UserSetting } from '@/types/userSetting'


type State = {
  setting: UserSetting | null
}

export const useUserSettingStore = defineStore('userSettings', {
  state: (): State => ({
    setting: null
  })
})
