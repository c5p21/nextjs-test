import { createBrowserClient  } from '@supabase/ssr'

// 从.env.local自动读取环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

// 导出supabase实例，全项目通用
export const supabase = createBrowserClient (supabaseUrl, supabaseKey)