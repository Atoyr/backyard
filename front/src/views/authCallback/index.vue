<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <div class="mb-4">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">
        認証を処理中...
      </h2>
      <p class="text-gray-600">
        しばらくお待ちください
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()

onMounted(async () => {
  try {
    // URLのハッシュから認証情報を処理
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('認証エラー:', error)
      router.push('/login?error=auth_failed')
      return
    }

    if (data.session) {
      // 認証成功時はメインページへリダイレクト
      router.push('/')
    } else {
      // セッションが無い場合はログインページへ
      router.push('/login')
    }
  } catch (err) {
    console.error('予期しないエラー:', err)
    router.push('/login?error=unexpected')
  }
})
</script>
