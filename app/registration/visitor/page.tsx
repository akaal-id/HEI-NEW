"use client"
import { useState } from 'react'

export default function VisitorPage(){
  const [form, setForm] = useState({ 
    fullName:'', 
    company:'', 
    position:'', 
    email:'', 
    phone:'', 
    country:'', 
    city:'', 
    agree:false,
    countryCode: '+62' // Add country code state
  })
  
  const submit = (e:any)=>{ e.preventDefault(); alert('Submitted (demo)') }
  
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold">Visitor Registration</h1>
        <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4">
          <input required placeholder="Full Name" value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} className="p-3 border rounded" />
          <input required placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} className="p-3 border rounded" />
          <input required placeholder="Position" value={form.position} onChange={e=>setForm({...form,position:e.target.value})} className="p-3 border rounded" />
          <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="p-3 border rounded" />
          
          {/* Phone Number with Country Code */}
          <div className="flex">
            <div className="flex-shrink-0 w-28 px-3 py-3 bg-white rounded-l-lg border border-r-0 border-gray-300">
              <select
                value={form.countryCode}
                onChange={(e) => setForm({...form, countryCode: e.target.value})}
                className="w-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-0 border-0 p-0"
              >
                <option value="+62">🇮🇩 +62</option>
                <option value="+60">🇲🇾 +60</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+66">🇹🇭 +66</option>
                <option value="+63">🇵🇭 +63</option>
                <option value="+84">🇻🇳 +84</option>
                <option value="+673">🇧🇳 +673</option>
                <option value="+95">🇲🇲 +95</option>
                <option value="+856">🇱🇦 +856</option>
                <option value="+855">🇰🇭 +855</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+90">🇹🇷 +90</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+31">🇳🇱 +31</option>
                <option value="+46">🇸🇪 +46</option>
                <option value="+47">🇳🇴 +47</option>
                <option value="+45">🇩🇰 +45</option>
                <option value="+358">🇫🇮 +358</option>
                <option value="+41">🇨🇭 +41</option>
                <option value="+43">🇦🇹 +43</option>
                <option value="+48">🇵🇱 +48</option>
                <option value="+420">🇨🇿 +420</option>
                <option value="+36">🇭🇺 +36</option>
                <option value="+40">🇷🇴 +40</option>
                <option value="+380">🇺🇦 +380</option>
                <option value="+7">🇷🇺 +7</option>
                <option value="+82">🇰🇷 +82</option>
                <option value="+852">🇭🇰 +852</option>
                <option value="+886">🇹🇼 +886</option>
              </select>
            </div>
            <input 
              required 
              placeholder="Phone" 
              value={form.phone} 
              onChange={e=>setForm({...form,phone:e.target.value})} 
              className="flex-1 p-3 border rounded-r-lg" 
            />
          </div>
          
          <input required placeholder="Country" value={form.country} onChange={e=>setForm({...form,country:e.target.value})} className="p-3 border rounded" />
          <input required placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} className="p-3 border rounded" />
          <label className="flex items-center gap-2"><input type="checkbox" required checked={form.agree} onChange={e=>setForm({...form,agree:e.target.checked})} /> I agree to Terms & Conditions</label>
          <button className="btn-gradient-primer px-6 py-3 rounded-2xl text-white">Submit</button>
        </form>
      </div>
    </div>
  )
}
