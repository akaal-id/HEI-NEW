"use client"
import { useState } from 'react'

export default function ContactPage(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const submit = (e:any)=>{ e.preventDefault(); alert('Sent (demo)') }
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold">Contact</h1>
        <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4">
          <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="p-3 border rounded" />
          <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="p-3 border rounded" />
          <textarea required placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="p-3 border rounded" />
          <button className="btn-gradient-primer px-6 py-3 rounded-2xl text-white">Send</button>
        </form>
      </div>
    </div>
  )
}
