"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SectionContact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState('')

  const submit = (e:any) => {
    e.preventDefault()
    setStatus('Sent (demo)')
  }

  return (
    <motion.section 
      initial={{ filter: "blur(10px)", opacity:0, y:20 }} 
      whileInView={{ filter: "blur(0px)", opacity:1, y:0 }} 
      viewport={{ once:true }} 
      transition={{ duration:0.8, ease: "easeIn" }} 
      className="py-16 bg-primaryWhite"
    >
      <div className="mx-auto bg-gradient-to-r from-[#d93732] to-[#492f32] py-16 px-6 md:px-0">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
        <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="p-3 border rounded" />
          <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="p-3 border rounded" />
          <textarea required placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="p-3 border rounded md:col-span-2" />
          <button className="btn-yellow px-6 py-3 rounded-md text-white md:col-span-2 hover:shadow-2xl hover:text-red-600 transition-all duration-300">Send</button>
          {status && <p className="md:col-span-2">{status}</p>}
        </form>
        </div>
      </div>

    </motion.section>
  )
}
