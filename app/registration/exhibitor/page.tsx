"use client"
import { useState } from 'react'
import GoogleFormHelper from '../../../components/GoogleFormHelper'
import Image from 'next/image'


export default function ExhibitorPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    fullName: '',
    mobileNumber: '',
    email: '',
    country: '',
    company: '',
    jobTitle: '',
    companyAddress: '',
    businessType: '',
    businessTypeOther: '',
    marketSector: '',
    marketSectorOther: '',
    countryCode: '+62'
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!form.title) newErrors.title = 'Title is required'
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!form.country) newErrors.country = 'Country is required'
    if (!form.company.trim()) newErrors.company = 'Company is required'
    if (!form.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required'
    if (!form.companyAddress.trim()) newErrors.companyAddress = 'Company Address is required'
    if (!form.businessType) newErrors.businessType = 'Business Type is required'
    if (form.businessType === 'other' && !form.businessTypeOther.trim()) {
      newErrors.businessTypeOther = 'Please specify Business Type'
    }
    if (!form.marketSector) newErrors.marketSector = 'Market Sector of Interest is required'
    if (form.marketSector === 'other' && !form.marketSectorOther.trim()) {
      newErrors.marketSectorOther = 'Please specify Market Sector of Interest'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Show loading state
      const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement
      const originalText = submitButton.textContent
      submitButton.textContent = 'Submitting...'
      submitButton.disabled = true
      
      try {
        // Create a hidden iframe for Google Form submission
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.name = 'hidden-iframe'
        document.body.appendChild(iframe)
        
        // Create a hidden form that will submit to Google Forms
        const hiddenForm = document.createElement('form')
        hiddenForm.method = 'POST'
        hiddenForm.action = 'https://docs.google.com/forms/d/e/1FAIpQLSdG4eicjOOgDHtMuF-VR0TpdsOOE2QaMwCO-BwyCDsifZc8kQ/formResponse'
        hiddenForm.target = 'hidden-iframe'
        
        // Add form fields with proper entry IDs
        const formFields = [
          { name: 'entry.758188846', value: form.title },
          { name: 'entry.930896042', value: form.fullName },
          { name: 'entry.553952233', value: `${form.countryCode}${form.mobileNumber}` },
          { name: 'entry.1598177166', value: form.email },
          { name: 'entry.1208590350', value: form.country },
          { name: 'entry.172760247', value: form.company },
          { name: 'entry.622187862', value: form.jobTitle },
          { name: 'entry.982931524', value: form.companyAddress },
          { name: 'entry.759839504', value: form.businessType === 'other' ? 'Other' : form.businessType },
          { name: 'entry.1322037478', value: form.businessType === 'other' ? form.businessTypeOther : '' },
          { name: 'entry.1473624981', value: form.marketSector === 'other' ? 'Other' : form.marketSector },
          { name: 'entry.668076561', value: form.marketSector === 'other' ? form.marketSectorOther : '' }
        ]
        
        // Create hidden input fields
        formFields.forEach(field => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = field.name
          input.value = field.value
          hiddenForm.appendChild(input)
        })
        
        // Submit the form
        document.body.appendChild(hiddenForm)
        hiddenForm.submit()
        
        // Wait a moment for submission to complete
        setTimeout(() => {
          // Clean up
          document.body.removeChild(hiddenForm)
          document.body.removeChild(iframe)
          
          // Show success modal
          setShowSuccessModal(true)
          
          // Reset form
          setForm({
            title: '',
            fullName: '',
            mobileNumber: '',
            email: '',
            country: '',
            company: '',
            jobTitle: '',
            companyAddress: '',
            businessType: '',
            businessTypeOther: '',
            marketSector: '',
            marketSectorOther: '',
            countryCode: '+62'
          })
          
          // Clear errors
          setErrors({})
          
          // Reset button
          submitButton.textContent = originalText
          submitButton.disabled = false
        }, 2000)
        
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error submitting your registration. Please try again.')
        
        // Reset button
        submitButton.textContent = originalText
        submitButton.disabled = false
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#492f32] to-[#2a1a1c]">
      {/* Full Width Image */}
      <div className="relative w-full">
        <div className="aspect-[1/1] md:aspect-[16/6] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/image-export-1.jpg"
            alt="Halal Expo Indonesia Exhibition"
            width={1920}
            height={720}
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white">
            <span className="font-normal text-white">REGISTER</span>{' '}
            <span className="font-bold text-6xl text-[#d49e00]">AS AN EXHIBITOR</span>{' '}
            <span className="font-normal text-white">HERE</span>
          </h1>
        </div>

        {/* Registration Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Title*
                </label>
                <select
                  value={form.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent appearance-none bg-white bg-no-repeat bg-right pr-10`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px'
                  }}
                  required
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                </select>
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Full Name*
                </label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={form.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                  required
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile Number */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Mobile Number*
                </label>
                <div className="flex">
                  <div className="flex-shrink-0 w-28 px-3 py-3 bg-white rounded-l-lg border border-r-0 border-gray-300">
                    <select
                      value={form.countryCode}
                      onChange={(e) => handleInputChange('countryCode', e.target.value)}
                      className="w-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-0 border-0 p-0"
                    >
                      <option value="+62">🇮🇩 +62 (Indonesia)</option>
                      <option value="+60">🇲🇾 +60 (Malaysia)</option>
                      <option value="+65">🇸🇬 +65 (Singapore)</option>
                      <option value="+66">🇹🇭 +66 (Thailand)</option>
                      <option value="+63">🇵🇭 +63 (Philippines)</option>
                      <option value="+84">🇻🇳 +84 (Vietnam)</option>
                      <option value="+673">🇧🇳 +673 (Brunei)</option>
                      <option value="+95">🇲🇲 +95 (Myanmar)</option>
                      <option value="+856">🇱🇦 +856 (Laos)</option>
                      <option value="+855">🇰🇭 +855 (Cambodia)</option>
                      <option value="+91">🇮🇳 +91 (India)</option>
                      <option value="+86">🇨🇳 +86 (China)</option>
                      <option value="+81">🇯🇵 +81 (Japan)</option>
                      <option value="+82">🇰🇷 +82 (South Korea)</option>
                      <option value="+1">🇺🇸 +1 (USA)</option>
                      <option value="+44">🇬🇧 +44 (UK)</option>
                      <option value="+49">🇩🇪 +49 (Germany)</option>
                      <option value="+33">🇫🇷 +33 (France)</option>
                      <option value="+39">🇮🇹 +39 (Italy)</option>
                      <option value="+34">🇪🇸 +34 (Spain)</option>
                      <option value="+31">🇳🇱 +31 (Netherlands)</option>
                      <option value="+32">🇧🇪 +32 (Belgium)</option>
                      <option value="+41">🇨🇭 +41 (Switzerland)</option>
                      <option value="+46">🇸🇪 +46 (Sweden)</option>
                      <option value="+47">🇳🇴 +47 (Norway)</option>
                      <option value="+45">🇩🇰 +45 (Denmark)</option>
                      <option value="+358">🇫🇮 +358 (Finland)</option>
                      <option value="+354">🇮🇸 +354 (Iceland)</option>
                      <option value="+48">🇵🇱 +48 (Poland)</option>
                      <option value="+420">🇨🇿 +420 (Czech Republic)</option>
                      <option value="+36">🇭🇺 +36 (Hungary)</option>
                      <option value="+43">🇦🇹 +43 (Austria)</option>
                      <option value="+351">🇵🇹 +351 (Portugal)</option>
                      <option value="+30">🇬🇷 +30 (Greece)</option>
                      <option value="+90">🇹🇷 +90 (Turkey)</option>
                      <option value="+7">🇷🇺 +7 (Russia)</option>
                      <option value="+380">🇺🇦 +380 (Ukraine)</option>
                      <option value="+48">🇵🇱 +48 (Poland)</option>
                      <option value="+420">🇨🇿 +420 (Czech Republic)</option>
                      <option value="+36">🇭🇺 +36 (Hungary)</option>
                      <option value="+43">🇦🇹 +43 (Austria)</option>
                      <option value="+351">🇵🇹 +351 (Portugal)</option>
                      <option value="+30">🇬🇷 +30 (Greece)</option>
                      <option value="+90">🇹🇷 +90 (Turkey)</option>
                      <option value="+7">🇷🇺 +7 (Russia)</option>
                      <option value="+380">🇺🇦 +380 (Ukraine)</option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    placeholder="Your Mobile Number"
                    value={form.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className={`flex-1 px-4 py-3 bg-white rounded-r-lg border ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Country*
                </label>
                <select
                  value={form.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent appearance-none bg-white bg-no-repeat bg-right pr-10`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px'
                  }}
                  required
                >
                  <option value="">Select Your Country</option>
                  <option value="indonesia">Indonesia</option>
                  <option value="malaysia">Malaysia</option>
                  <option value="singapore">Singapore</option>
                  <option value="thailand">Thailand</option>
                  <option value="philippines">Philippines</option>
                  <option value="vietnam">Vietnam</option>
                  <option value="brunei">Brunei</option>
                  <option value="myanmar">Myanmar</option>
                  <option value="laos">Laos</option>
                  <option value="cambodia">Cambodia</option>
                  <option value="afghanistan">Afghanistan</option>
                  <option value="albania">Albania</option>
                  <option value="algeria">Algeria</option>
                  <option value="andorra">Andorra</option>
                  <option value="angola">Angola</option>
                  <option value="antigua-and-barbuda">Antigua and Barbuda</option>
                  <option value="argentina">Argentina</option>
                  <option value="armenia">Armenia</option>
                  <option value="australia">Australia</option>
                  <option value="austria">Austria</option>
                  <option value="azerbaijan">Azerbaijan</option>
                  <option value="bahamas">Bahamas</option>
                  <option value="bahrain">Bahrain</option>
                  <option value="bangladesh">Bangladesh</option>
                  <option value="barbados">Barbados</option>
                  <option value="belarus">Belarus</option>
                  <option value="belgium">Belgium</option>
                  <option value="belize">Belize</option>
                  <option value="benin">Benin</option>
                  <option value="bhutan">Bhutan</option>
                  <option value="bolivia">Bolivia</option>
                  <option value="bosnia-and-herzegovina">Bosnia and Herzegovina</option>
                  <option value="botswana">Botswana</option>
                  <option value="brazil">Brazil</option>
                  <option value="bulgaria">Bulgaria</option>
                  <option value="burkina-faso">Burkina Faso</option>
                  <option value="burundi">Burundi</option>
                  <option value="cabo-verde">Cabo Verde</option>
                  <option value="cameroon">Cameroon</option>
                  <option value="canada">Canada</option>
                  <option value="central-african-republic">Central African Republic</option>
                  <option value="chad">Chad</option>
                  <option value="chile">Chile</option>
                  <option value="china">China</option>
                  <option value="colombia">Colombia</option>
                  <option value="comoros">Comoros</option>
                  <option value="congo">Congo</option>
                  <option value="congo-democratic-republic">Congo (Democratic Republic)</option>
                  <option value="costa-rica">Costa Rica</option>
                  <option value="croatia">Croatia</option>
                  <option value="cuba">Cuba</option>
                  <option value="cyprus">Cyprus</option>
                  <option value="czech-republic">Czech Republic</option>
                  <option value="denmark">Denmark</option>
                  <option value="djibouti">Djibouti</option>
                  <option value="dominica">Dominica</option>
                  <option value="dominican-republic">Dominican Republic</option>
                  <option value="ecuador">Ecuador</option>
                  <option value="egypt">Egypt</option>
                  <option value="el-salvador">El Salvador</option>
                  <option value="equatorial-guinea">Equatorial Guinea</option>
                  <option value="eritrea">Eritrea</option>
                  <option value="estonia">Estonia</option>
                  <option value="eswatini">Eswatini</option>
                  <option value="ethiopia">Ethiopia</option>
                  <option value="fiji">Fiji</option>
                  <option value="finland">Finland</option>
                  <option value="france">France</option>
                  <option value="gabon">Gabon</option>
                  <option value="gambia">Gambia</option>
                  <option value="georgia">Georgia</option>
                  <option value="germany">Germany</option>
                  <option value="ghana">Ghana</option>
                  <option value="greece">Greece</option>
                  <option value="grenada">Grenada</option>
                  <option value="guatemala">Guatemala</option>
                  <option value="guinea">Guinea</option>
                  <option value="guinea-bissau">Guinea-Bissau</option>
                  <option value="guyana">Guyana</option>
                  <option value="haiti">Haiti</option>
                  <option value="honduras">Honduras</option>
                  <option value="hungary">Hungary</option>
                  <option value="iceland">Iceland</option>
                  <option value="india">India</option>
                  <option value="iran">Iran</option>
                  <option value="iraq">Iraq</option>
                  <option value="ireland">Ireland</option>
                  <option value="israel">Israel</option>
                  <option value="italy">Italy</option>
                  <option value="ivory-coast">Ivory Coast</option>
                  <option value="jamaica">Jamaica</option>
                  <option value="japan">Japan</option>
                  <option value="jordan">Jordan</option>
                  <option value="kazakhstan">Kazakhstan</option>
                  <option value="kenya">Kenya</option>
                  <option value="kiribati">Kiribati</option>
                  <option value="kosovo">Kosovo</option>
                  <option value="kuwait">Kuwait</option>
                  <option value="kyrgyzstan">Kyrgyzstan</option>
                  <option value="lebanon">Lebanon</option>
                  <option value="lesotho">Lesotho</option>
                  <option value="liberia">Liberia</option>
                  <option value="libya">Libya</option>
                  <option value="liechtenstein">Liechtenstein</option>
                  <option value="lithuania">Lithuania</option>
                  <option value="luxembourg">Luxembourg</option>
                  <option value="madagascar">Madagascar</option>
                  <option value="malawi">Malawi</option>
                  <option value="maldives">Maldives</option>
                  <option value="mali">Mali</option>
                  <option value="malta">Malta</option>
                  <option value="marshall-islands">Marshall Islands</option>
                  <option value="mauritania">Mauritania</option>
                  <option value="mauritius">Mauritius</option>
                  <option value="mexico">Mexico</option>
                  <option value="micronesia">Micronesia</option>
                  <option value="moldova">Moldova</option>
                  <option value="monaco">Monaco</option>
                  <option value="mongolia">Mongolia</option>
                  <option value="montenegro">Montenegro</option>
                  <option value="morocco">Morocco</option>
                  <option value="mozambique">Mozambique</option>
                  <option value="namibia">Namibia</option>
                  <option value="nauru">Nauru</option>
                  <option value="nepal">Nepal</option>
                  <option value="netherlands">Netherlands</option>
                  <option value="new-zealand">New Zealand</option>
                  <option value="nicaragua">Nicaragua</option>
                  <option value="niger">Niger</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="north-korea">North Korea</option>
                  <option value="north-macedonia">North Macedonia</option>
                  <option value="norway">Norway</option>
                  <option value="oman">Oman</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="palau">Palau</option>
                  <option value="palestine">Palestine</option>
                  <option value="panama">Panama</option>
                  <option value="papua-new-guinea">Papua New Guinea</option>
                  <option value="paraguay">Paraguay</option>
                  <option value="peru">Peru</option>
                  <option value="poland">Poland</option>
                  <option value="portugal">Portugal</option>
                  <option value="qatar">Qatar</option>
                  <option value="romania">Romania</option>
                  <option value="russia">Russia</option>
                  <option value="rwanda">Rwanda</option>
                  <option value="saint-kitts-and-nevis">Saint Kitts and Nevis</option>
                  <option value="saint-lucia">Saint Lucia</option>
                  <option value="saint-vincent-and-the-grenadines">Saint Vincent and the Grenadines</option>
                  <option value="samoa">Samoa</option>
                  <option value="san-marino">San Marino</option>
                  <option value="sao-tome-and-principe">Sao Tome and Principe</option>
                  <option value="saudi-arabia">Saudi Arabia</option>
                  <option value="senegal">Senegal</option>
                  <option value="serbia">Serbia</option>
                  <option value="seychelles">Seychelles</option>
                  <option value="sierra-leone">Sierra Leone</option>
                  <option value="slovakia">Slovakia</option>
                  <option value="slovenia">Slovenia</option>
                  <option value="solomon-islands">Solomon Islands</option>
                  <option value="somalia">Somalia</option>
                  <option value="south-africa">South Africa</option>
                  <option value="south-korea">South Korea</option>
                  <option value="south-sudan">South Sudan</option>
                  <option value="spain">Spain</option>
                  <option value="sri-lanka">Sri Lanka</option>
                  <option value="sudan">Sudan</option>
                  <option value="suriname">Suriname</option>
                  <option value="sweden">Sweden</option>
                  <option value="switzerland">Switzerland</option>
                  <option value="syria">Syria</option>
                  <option value="taiwan">Taiwan</option>
                  <option value="tajikistan">Tajikistan</option>
                  <option value="tanzania">Tanzania</option>
                  <option value="timor-leste">Timor-Leste</option>
                  <option value="togo">Togo</option>
                  <option value="tonga">Tonga</option>
                  <option value="trinidad-and-tobago">Trinidad and Tobago</option>
                  <option value="tunisia">Tunisia</option>
                  <option value="turkey">Turkey</option>
                  <option value="turkmenistan">Turkmenistan</option>
                  <option value="tuvalu">Tuvalu</option>
                  <option value="uganda">Uganda</option>
                  <option value="ukraine">Ukraine</option>
                  <option value="united-arab-emirates">United Arab Emirates</option>
                  <option value="united-kingdom">United Kingdom</option>
                  <option value="united-states">United States</option>
                  <option value="uruguay">Uruguay</option>
                  <option value="uzbekistan">Uzbekistan</option>
                  <option value="vanuatu">Vanuatu</option>
                  <option value="vatican-city">Vatican City</option>
                  <option value="venezuela">Venezuela</option>
                  <option value="yemen">Yemen</option>
                  <option value="zambia">Zambia</option>
                  <option value="zimbabwe">Zimbabwe</option>
                </select>
                {errors.country && (
                  <p className="text-red-400 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Company*
                </label>
                <input
                  type="text"
                  placeholder="Your Company Name"
                  value={form.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.company ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                  required
                />
                {errors.company && (
                  <p className="text-red-400 text-sm mt-1">{errors.company}</p>
                )}
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Job Title*
                </label>
                <input
                  type="text"
                  placeholder="Your Job Title"
                  value={form.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                  required
                />
                {errors.jobTitle && (
                  <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>
                )}
              </div>

                             {/* Company Address */}
               <div>
                 <label className="block text-white text-sm font-medium mb-2">
                   Company Address*
                 </label>
                 <textarea
                   placeholder="Your Company Address"
                   value={form.companyAddress}
                   onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                   rows={1}
                   className={`w-full px-4 py-3 bg-white rounded-lg border ${
                     errors.companyAddress ? 'border-red-500' : 'border-gray-300'
                   } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent resize-none`}
                   required
                 />
                 {errors.companyAddress && (
                   <p className="text-red-400 text-sm mt-1">{errors.companyAddress}</p>
                 )}
               </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 gap-6">
              {/* Business Type */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Business Type*
                </label>
                <select
                  value={form.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.businessType ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent appearance-none bg-white bg-no-repeat bg-right pr-10`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px'
                  }}
                  required
                >
                  <option value="">Select Your Business Type</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="trading">Trading</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="export">Export</option>
                  <option value="import">Import</option>
                  <option value="logistics">Logistics</option>
                  <option value="consulting">Consulting</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="finance">Finance</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>
                )}
              </div>
            </div>

            {/* Row 6 - Business Type Other (conditional) */}
            {form.businessType === 'other' && (
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Business Type (Other)*
                  </label>
                  <input
                    type="text"
                    placeholder="Please specify your business type"
                    value={form.businessTypeOther}
                    onChange={(e) => handleInputChange('businessTypeOther', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.businessTypeOther ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  />
                  {errors.businessTypeOther && (
                    <p className="text-red-400 text-sm mt-1">{errors.businessTypeOther}</p>
                  )}
                </div>
              </div>
            )}

            {/* Row 7 */}
            <div className="grid grid-cols-1 gap-6">
              {/* Market Sector of Interest */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Market Sector of Interest*
                </label>
                <select
                  value={form.marketSector}
                  onChange={(e) => handleInputChange('marketSector', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.marketSector ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent appearance-none bg-white bg-no-repeat bg-right pr-10`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px'
                  }}
                  required
                >
                  <option value="">Select Your Market Sector of Interest</option>
                  <option value="food-beverages">Food & Beverages</option>
                  <option value="cosmetics">Cosmetics & Personal Care</option>
                  <option value="pharmaceuticals">Pharmaceuticals & Healthcare</option>
                  <option value="textiles">Textiles & Apparel</option>
                  <option value="tourism">Tourism & Hospitality</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="logistics">Logistics & Transportation</option>
                  <option value="technology">Technology & IT</option>
                  <option value="automotive">Automotive</option>
                  <option value="construction">Construction & Real Estate</option>
                  <option value="energy">Energy & Utilities</option>
                  <option value="education">Education & Training</option>
                  <option value="media">Media & Entertainment</option>
                  <option value="agriculture">Agriculture & Farming</option>
                  <option value="mining">Mining & Metals</option>
                  <option value="chemicals">Chemicals & Materials</option>
                  <option value="other">Other</option>
                </select>
                {errors.marketSector && (
                  <p className="text-red-400 text-sm mt-1">{errors.marketSector}</p>
                )}
              </div>
            </div>

            {/* Row 8 - Market Sector Other (conditional) */}
            {form.marketSector === 'other' && (
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Market Sector of Interest (Other)*
                  </label>
                  <input
                    type="text"
                    placeholder="Please specify your market sector"
                    value={form.marketSectorOther}
                    onChange={(e) => handleInputChange('marketSectorOther', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.marketSectorOther ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  />
                  {errors.marketSectorOther && (
                    <p className="text-red-400 text-sm mt-1">{errors.marketSectorOther}</p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                className="bg-[#d49e00] text-white font-bold py-4 px-12 rounded-lg text-lg hover:bg-[#b88a00] transition-colors duration-300 shadow-lg"
              >
                REGISTER AS EXHIBITOR
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h3>
            
            {/* Message */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              Thank you for registering as an exhibitor! Our committee will review your application and contact you within 2-3 business days to discuss next steps and confirm your participation.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 bg-[#d49e00] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#b88a00] transition-colors duration-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  // Reset form for another submission
                  setForm({
                    title: '',
                    fullName: '',
                    mobileNumber: '',
                    email: '',
                    country: '',
                    company: '',
                    jobTitle: '',
                    companyAddress: '',
                    businessType: '',
                    businessTypeOther: '',
                    marketSector: '',
                    marketSectorOther: '',
                    countryCode: '+62'
                  })
                  setErrors({})
                }}
                className="flex-1 border-2 border-[#d49e00] text-[#d49e00] font-semibold py-3 px-6 rounded-lg hover:bg-[#d49e00] hover:text-white transition-all duration-300"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
