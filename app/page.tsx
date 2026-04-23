// import Image from "next/image";

// export default function Home() {



//   return (
//     <div className="text-red-500">
//       vercel-test hello word
//     </div>
//   );
// }


'use client'
import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function Home() {
  const [data, setData] : any= useState<any[]>([])

  async function loadData() {
    // 表名完全正确：test_table
    const { data: list, error } = await supabase.from('test_table').select()
    
    // 控制台打印详情
    console.log('查询结果', list)
    console.log('错误信息', error)

    if (error) {
      alert('查询报错：' + error.message)
    } else {
      setData(list)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <main>
      <h1>本地连接Supabase数据库成功！</h1>
      
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-3 text-left">id</th>
            <th className="border border-gray-300 px-4 py-3 text-left">title</th>
            <th className="border border-gray-300 px-4 py-3 text-left">time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v: any) => (
            <tr key={v.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-3">{v.id}</td>
              <td className="border border-gray-300 px-4 py-3">{v.title}</td>
              <td className="border border-gray-300 px-4 py-3">{dayjs(v.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
