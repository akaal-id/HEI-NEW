"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { trackContact } from '../lib/facebook-pixel'

export default function SectionContact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState('')

  const submit = (e:any) => {
    e.preventDefault()
    
    // Track contact form submission
    trackContact({
      content_category: 'Contact Form',
      content_name: 'Main Contact Form',
      value: 1,
      currency: 'USD'
    })
    
    setStatus('Sent (demo)')
  }

  return (
    <motion.section 
      initial={{ filter: "blur(10px)", opacity:0, y:20 }} 
      whileInView={{ filter: "blur(0px)", opacity:1, y:0 }} 
      viewport={{ once:true }} 
      transition={{ duration:0.8, ease: "easeIn" }} 
      className="py-20 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-2xl p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Contact <span className="text-white">Us</span>
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Get in touch with us for any questions or inquiries about the Halal Export Indonesia exhibition
            </p>
          </motion.div>
          
          <form onSubmit={submit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input 
                required 
                placeholder="Name" 
                value={form.name} 
                onChange={e=>setForm({...form,name:e.target.value})} 
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d93732] focus:border-transparent transition-all duration-300" 
              />
              <input 
                required 
                placeholder="Email" 
                value={form.email} 
                onChange={e=>setForm({...form,email:e.target.value})} 
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d93732] focus:border-transparent transition-all duration-300" 
              />
            </div>
            <textarea 
              required 
              placeholder="Message" 
              value={form.message} 
              onChange={e=>setForm({...form,message:e.target.value})} 
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d93732] focus:border-transparent transition-all duration-300 mb-6 h-32" 
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-[#d93732] font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Send Message
            </motion.button>
            {status && <p className="text-center text-white mt-4">{status}</p>}
          </form>
        </div>
      </div>
    </motion.section>
  )
}
