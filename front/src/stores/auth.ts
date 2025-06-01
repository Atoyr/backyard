import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase';
import type { ProfileRow } from '@/types/database';
import type { User } from '@supabase/supabase-js';


type State = {
  user: User | null
  profile: ProfileRow | null
  loading: boolean
  error?: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: null, 
    profile: null, 
    loading: false,
  }), 
  getters: {
    isAuthenticated: (state) => !!state.user,
  }, 
  actions: {
    async signInWithGoogle() {
      try {
        this.loading = true
        this.error = null
        
        const { error: signInError } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        })
        
        if (signInError) throw signInError
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'サインインに失敗しました'
      } finally {
        this.loading = false
      }
    }, 
    async signOut() {
      try {
        this.loading = true
        this.error = null
        
        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) throw signOutError
        
        this.user = null
        this.profile = null
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'サインアウトに失敗しました'
      } finally {
        this.loading = false
      }
    }, 
      // プロフィール取得
    async fetchProfile(userId: string)  {
      try {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (fetchError) throw fetchError
        this.profile = data
      } catch (err) {
        console.error('プロフィール取得エラー:', err)
      }
    }, 
    // プロフィール作成・更新
    async upsertProfile(userData: User)  {
      try {
        const profileData = {
          id: userData.id,
          email: userData.email!,
          full_name: userData.user_metadata?.full_name || '',
          avatar_url: userData.user_metadata?.avatar_url || '',
          updated_at: new Date().toISOString()
        }

        const { data, error: upsertError } = await supabase
          .from('profiles')
          .upsert(profileData)
          .select()
          .single()

        if (upsertError) throw upsertError
        this.profile = data
      } catch (err) {
        console.error('プロフィール更新エラー:', err)
      }
    }, 
    async setUser(userData: User | null) {
      this.user = userData
      if (userData) {
        await this.upsertProfile(userData)
        await this.fetchProfile(userData.id)
      } else {
        this.profile = null
      }
    }, 
    // 認証状態監視の初期化
    initializeAuth () {
      // 現在のセッションを取得
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          this.setUser(session.user)
        }
      })

      // 認証状態の変更を監視
      supabase.auth.onAuthStateChange((_event, session) => {
        this.setUser(session?.user || null)
      })
    }
  }
 
})
