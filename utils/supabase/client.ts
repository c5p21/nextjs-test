import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ 环境变量缺失！')
    return null
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}

export const supabase = createClient()!