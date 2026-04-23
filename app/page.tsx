
'use client'
import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function Home() {

  // 表格数据
  const [tableData, setTableData] : any= useState<any[]>([])
  // 输入框
  const [input, setInput] : any= useState<any>('')
  // 修改id
  const [editingId, setEditingId] = useState<string | null>(null)


  // 查询
  async function loadData() {
    try {
      let res = await supabase.from('test_table').select().order('created_at', { ascending: true })
      console.log('查询结果', res)
      if(!res.success){
        alert('查询报错：')
        return
      }
      setTableData(res.data)

    } catch (error) {
      alert('查询报错：' )
    }

  }

  // 添加
  async function handleAdd() {
    try {
      let res = await supabase.from('test_table').insert({ title: input })
      console.log('添加结果', res)
      if(!res.success){
        alert('添加报错：')
        return
      }
      setInput('')
      loadData()
    } catch (error) {
      alert('添加报错：' )
    }
  }

  // 进入修改模式
  function startEdit(id: string, title: string) {
    setEditingId(id)
    setInput(title)
  }

  // 删除
  async function handleDelete(id: string) {

    console.log('删除id', id)

    try {
      let res = await supabase.from('test_table').delete().eq('id', id)
      console.log('删除结果', res)
      if(!res.success){
        alert('删除报错：')
        return
      }
      loadData()
    } catch (error) {
      alert('删除报错：' )
    }
  }

  // 提交修改
  async function handleUpdate() {
    if (!editingId) {
      return
    }
    try {
      let res = await supabase.from('test_table').update({ title: input }).eq('id', editingId)
      console.log('修改结果', res)
      if(!res.success){
        alert('修改报错：')
        return
      }
      setInput('')
      setEditingId(null)
      loadData()
    } catch (error) {
      alert('修改报错：')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <main>
      <input className="border border-gray-300 rounded-md px-4 py-2" placeholder="请输入备注" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={editingId ? handleUpdate : handleAdd}>
        {editingId ? '修改' : '添加'}
      </button>


      
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-3 text-left">id</th>
            <th className="border border-gray-300 px-4 py-3 text-left">备注</th>
            <th className="border border-gray-300 px-4 py-3 text-left">时间</th>
            <th className="border border-gray-300 px-4 py-3 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((v: any) => (
            <tr key={v.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-3">{v.id}</td>
              <td className="border border-gray-300 px-4 py-3">{v.title}</td>
              <td className="border border-gray-300 px-4 py-3">{dayjs(v.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td className="border border-gray-300 px-4 py-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => startEdit(v.id, v.title)}>修改</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(v.id)}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
