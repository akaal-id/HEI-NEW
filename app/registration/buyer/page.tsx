"use client"
import { useState } from 'react'
import Image from 'next/image'

export default function BuyerPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [form, setForm] = useState({
    // General Details
    title: '',
    fullName: '',
    mobileNumber: '',
    email: '',
    country: '',
    mobileCountryCode: '+62',
    
    // Business Details
    company: '',
    jobTitle: '',
    companyNumber: '',
    companyWebsite: '',
    companyCountryCode: '+62',
    industry: '',
    primaryActivity: '',
    numberOfEmployees: '',
    jobFunction: '',
    productsServicesInterested: '',
    mainObjectives: '',
    howDidYouHear: '',
    receivePromotionalMaterial: false
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Helper function to format numbers (remove non-numeric characters)
  const formatNumber = (value: string) => {
    return value.replace(/[^0-9]/g, '')
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    // General Details validation
    if (!form.title) newErrors.title = 'Title is required'
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!form.country) newErrors.country = 'Country is required'
    
    // Business Details validation
    if (!form.company.trim()) newErrors.company = 'Company is required'
    if (!form.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required'
    if (!form.companyNumber.trim()) newErrors.companyNumber = 'Company Number is required'
    if (!form.companyWebsite.trim()) newErrors.companyWebsite = 'Company Website is required'
    if (!form.industry) newErrors.industry = 'Industry is required'
    if (!form.primaryActivity) newErrors.primaryActivity = 'Primary Activity is required'
    if (!form.numberOfEmployees) newErrors.numberOfEmployees = 'Number of Employees is required'
    if (!form.jobFunction) newErrors.jobFunction = 'Job Function is required'
    if (!form.productsServicesInterested) newErrors.productsServicesInterested = 'Products/Services Interested is required'
    if (!form.mainObjectives) newErrors.mainObjectives = 'Main Objectives is required'
    if (!form.howDidYouHear) newErrors.howDidYouHear = 'How did you hear about us is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      
      try {
        // Google Form submission
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScz8GQ1bp8Cyxo3pS4kpKTsw6nW7gnqyasAD1zdAskfqNYcvw/formResponse'
        
        // Create form data for Google Forms
        const formData = new FormData()
        formData.append('entry.1906705983', form.title) // Title
        formData.append('entry.1490958344', form.fullName) // Full Name
        formData.append('entry.315748773', `${form.mobileCountryCode}${form.mobileNumber}`) // Mobile Number with country code
        formData.append('entry.1842819990', form.email) // Email
        formData.append('entry.1172544143', form.country) // Country
        formData.append('entry.853670532', form.company) // Company
        formData.append('entry.1673626472', form.jobTitle) // Job Title
        formData.append('entry.118501021', `${form.companyCountryCode}${form.companyNumber}`) // Company Number with country code
        formData.append('entry.1705591915', form.companyWebsite) // Company Website
        formData.append('entry.2134137310', form.industry) // Industry Your Company Is Involved In
        formData.append('entry.1448135967', form.primaryActivity) // Your Company's Primary Activity
        formData.append('entry.1431406925', form.numberOfEmployees) // Number of Employees
        formData.append('entry.527558493', form.jobFunction) // Job Function
        formData.append('entry.1718882839', form.productsServicesInterested) // Products/services interested
        formData.append('entry.1635406371', form.mainObjectives) // Main objectives
        formData.append('entry.2133677826', form.howDidYouHear) // How did you hear
        formData.append('entry.1089868030', form.receivePromotionalMaterial ? 'Yes' : 'No') // Promotional material checkbox

        // Submit to Google Forms using fetch
        const response = await fetch(googleFormUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors' // Required for Google Forms
        })

        // Since no-cors doesn't give us response details, we assume success
        setShowSuccessModal(true)
        
        // Reset form
        setForm({
          title: '',
          fullName: '',
          mobileNumber: '',
          email: '',
          country: '',
          mobileCountryCode: '+62',
          company: '',
          jobTitle: '',
          companyNumber: '',
          companyWebsite: '',
          companyCountryCode: '+62',
          industry: '',
          primaryActivity: '',
          numberOfEmployees: '',
          jobFunction: '',
          productsServicesInterested: '',
          mainObjectives: '',
          howDidYouHear: '',
          receivePromotionalMaterial: false
        })
        
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error submitting your registration. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    // Format numbers for mobile and company number fields
    if (field === 'mobileNumber' || field === 'companyNumber') {
      value = formatNumber(value as string)
    }
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B4513] to-[#654321] pt-12 md:pt-0">
      {/* Full Width Image */}
      <div className="relative w-full">
        <div className="aspect-[16/6] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/image-export-2.jpg"
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
            <span className="font-bold text-6xl text-[#d49e00]">AS A BUYER</span>{' '}
            <span className="font-normal text-white">HERE</span>
          </h1>
        </div>

        {/* Registration Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* General Details Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">General Details</h2>
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Mobile Number */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Mobile Number*
                  </label>
                  <div className="flex w-full">
                    <div className="flex-shrink-0 w-16 px-1 py-3 bg-white rounded-l-lg border border-r-0 border-gray-300">
                      <select
                        value={form.mobileCountryCode}
                        onChange={(e) => handleInputChange('mobileCountryCode', e.target.value)}
                        className="w-full text-xs font-medium text-gray-700 focus:outline-none focus:ring-0 border-0 p-0"
                      >
                        <option value="+62">+62 (Indonesia)</option>
                        <option value="+60">+60 (Malaysia)</option>
                        <option value="+65">+65 (Singapore)</option>
                        <option value="+66">+66 (Thailand)</option>
                        <option value="+63">+63 (Philippines)</option>
                        <option value="+84">+84 (Vietnam)</option>
                        <option value="+673">+673 (Brunei)</option>
                        <option value="+95">+95 (Myanmar)</option>
                        <option value="+856">+856 (Laos)</option>
                        <option value="+855">+855 (Cambodia)</option>
                        <option value="+91">+91 (India)</option>
                        <option value="+86">+86 (China)</option>
                        <option value="+81">+81 (Japan)</option>
                        <option value="+82">+82 (South Korea)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+49">+49 (Germany)</option>
                        <option value="+33">+33 (France)</option>
                        <option value="+39">+39 (Italy)</option>
                        <option value="+34">+34 (Spain)</option>
                        <option value="+31">+31 (Netherlands)</option>
                        <option value="+32">+32 (Belgium)</option>
                        <option value="+41">+41 (Switzerland)</option>
                        <option value="+46">+46 (Sweden)</option>
                        <option value="+47">+47 (Norway)</option>
                        <option value="+45">+45 (Denmark)</option>
                        <option value="+358">+358 (Finland)</option>
                        <option value="+354">+354 (Iceland)</option>
                        <option value="+48">+48 (Poland)</option>
                        <option value="+420">+420 (Czech Republic)</option>
                        <option value="+36">+36 (Hungary)</option>
                        <option value="+43">+43 (Austria)</option>
                        <option value="+351">+351 (Portugal)</option>
                        <option value="+30">+30 (Greece)</option>
                        <option value="+90">+90 (Turkey)</option>
                        <option value="+7">+7 (Russia)</option>
                        <option value="+380">+380 (Ukraine)</option>
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

              {/* Row 3 - Country and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  >
                    <option value="">Select Your Country</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Laos">Laos</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cabo Verde">Cabo Verde</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo (Democratic Republic)">Congo (Democratic Republic)</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Eswatini">Eswatini</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Greece">Greece</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Ivory Coast">Ivory Coast</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Kosovo">Kosovo</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Laos">Laos</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia</option>
                    <option value="Moldova">Moldova</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="North Korea">North Korea</option>
                    <option value="North Macedonia">North Macedonia</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Korea">South Korea</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syria</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Vatican City">Vatican City</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
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

              {/* Row 4 - Job Title and Company Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

                {/* Company Number */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Company Number*
                  </label>
                  <div className="flex w-full">
                    <div className="flex-shrink-0 w-16 px-1 py-3 bg-white rounded-l-lg border border-r-0 border-gray-300">
                      <select
                        value={form.companyCountryCode}
                        onChange={(e) => handleInputChange('companyCountryCode', e.target.value)}
                        className="w-full text-xs font-medium text-gray-700 focus:outline-none focus:ring-0 border-0 p-0"
                      >
                        <option value="+62">+62 (Indonesia)</option>
                        <option value="+60">+60 (Malaysia)</option>
                        <option value="+65">+65 (Singapore)</option>
                        <option value="+66">+66 (Thailand)</option>
                        <option value="+63">+63 (Philippines)</option>
                        <option value="+84">+84 (Vietnam)</option>
                        <option value="+673">+673 (Brunei)</option>
                        <option value="+95">+95 (Myanmar)</option>
                        <option value="+856">+856 (Laos)</option>
                        <option value="+855">+855 (Cambodia)</option>
                        <option value="+91">+91 (India)</option>
                        <option value="+86">+86 (China)</option>
                        <option value="+81">+81 (Japan)</option>
                        <option value="+82">+82 (South Korea)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+49">+49 (Germany)</option>
                        <option value="+33">+33 (France)</option>
                        <option value="+39">+39 (Italy)</option>
                        <option value="+34">+34 (Spain)</option>
                        <option value="+31">+31 (Netherlands)</option>
                        <option value="+32">+32 (Belgium)</option>
                        <option value="+41">+41 (Switzerland)</option>
                        <option value="+46">+46 (Sweden)</option>
                        <option value="+47">+47 (Norway)</option>
                        <option value="+45">+45 (Denmark)</option>
                        <option value="+358">+358 (Finland)</option>
                        <option value="+354">+354 (Iceland)</option>
                        <option value="+48">+48 (Poland)</option>
                        <option value="+420">+420 (Czech Republic)</option>
                        <option value="+36">+36 (Hungary)</option>
                        <option value="+43">+43 (Austria)</option>
                        <option value="+351">+351 (Portugal)</option>
                        <option value="+30">+30 (Greece)</option>
                        <option value="+90">+90 (Turkey)</option>
                        <option value="+7">+7 (Russia)</option>
                        <option value="+380">+380 (Ukraine)</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      placeholder="Your Company Phone Number"
                      value={form.companyNumber}
                      onChange={(e) => handleInputChange('companyNumber', e.target.value)}
                      className={`flex-1 px-4 py-3 bg-white rounded-r-lg border ${
                        errors.companyNumber ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                      required
                    />
                  </div>
                  {errors.companyNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.companyNumber}</p>
                  )}
                </div>
              </div>

              {/* Row 5 - Company Website */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                {/* Company Website */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Company Website*
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company Website (e.g., example.com)"
                    value={form.companyWebsite}
                    onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.companyWebsite ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  />
                  {errors.companyWebsite && (
                    <p className="text-red-400 text-sm mt-1">{errors.companyWebsite}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Details Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Business Details</h2>

              {/* Row 3 - Industry */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Industry Your Company Is Involved In*
                  </label>
                  <select
                    value={form.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.industry ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  >
                    <option value="">Select Your Industry</option>
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
                  {errors.industry && (
                    <p className="text-red-400 text-sm mt-1">{errors.industry}</p>
                  )}
                </div>
              </div>

              {/* Row 4 - Primary Activity */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Your Company's Primary Activity*
                  </label>
                  <select
                    value={form.primaryActivity}
                    onChange={(e) => handleInputChange('primaryActivity', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.primaryActivity ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  >
                    <option value="">Select Your Primary Activity</option>
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
                  {errors.primaryActivity && (
                    <p className="text-red-400 text-sm mt-1">{errors.primaryActivity}</p>
                  )}
                </div>
              </div>

              {/* Row 5 - Number of Employees and Job Function */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Number of Employees*
                  </label>
                  <select
                    value={form.numberOfEmployees}
                    onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.numberOfEmployees ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  >
                    <option value="">Select Number of Employees</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                  {errors.numberOfEmployees && (
                    <p className="text-red-400 text-sm mt-1">{errors.numberOfEmployees}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Job Function*
                  </label>
                  <select
                    value={form.jobFunction}
                    onChange={(e) => handleInputChange('jobFunction', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.jobFunction ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  >
                    <option value="">Select Your Job Function</option>
                    <option value="ceo">CEO/President</option>
                    <option value="cfo">CFO/Finance Director</option>
                    <option value="cmo">CMO/Marketing Director</option>
                    <option value="cto">CTO/Technology Director</option>
                    <option value="procurement">Procurement Manager</option>
                    <option value="sales">Sales Manager</option>
                    <option value="operations">Operations Manager</option>
                    <option value="business-development">Business Development</option>
                    <option value="purchasing">Purchasing Manager</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.jobFunction && (
                    <p className="text-red-400 text-sm mt-1">{errors.jobFunction}</p>
                  )}
                </div>
              </div>

              {/* Row 6 - Products/Services Interested */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Products/services interested at the 2nd Halal Export Indonesia*
                  </label>
                  <select
                    value={form.productsServicesInterested}
                    onChange={(e) => handleInputChange('productsServicesInterested', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.productsServicesInterested ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  >
                    <option value="">Select Your Interest</option>
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
                  {errors.productsServicesInterested && (
                    <p className="text-red-400 text-sm mt-1">{errors.productsServicesInterested}</p>
                  )}
                </div>
              </div>

              {/* Row 7 - Main Objectives */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Main objectives for visiting the 2nd Halal Export Indonesia*
                  </label>
                  <select
                    value={form.mainObjectives}
                    onChange={(e) => handleInputChange('mainObjectives', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.mainObjectives ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  >
                    <option value="">Select Your Objective</option>
                    <option value="networking">Networking</option>
                    <option value="business-development">Business Development</option>
                    <option value="market-research">Market Research</option>
                    <option value="product-sourcing">Product Sourcing</option>
                    <option value="partnership-opportunities">Partnership Opportunities</option>
                    <option value="investment-opportunities">Investment Opportunities</option>
                    <option value="technology-transfer">Technology Transfer</option>
                    <option value="export-import">Export/Import</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.mainObjectives && (
                    <p className="text-red-400 text-sm mt-1">{errors.mainObjectives}</p>
                  )}
                </div>
              </div>

              {/* Row 8 - How did you hear */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    How did you hear about the 2nd Halal Export Indonesia*
                  </label>
                  <select
                    value={form.howDidYouHear}
                    onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.howDidYouHear ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  >
                    <option value="">Select Your Answer</option>
                    <option value="social-media">Social Media</option>
                    <option value="website">Website</option>
                    <option value="email">Email</option>
                    <option value="referral">Referral</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="news">News</option>
                    <option value="trade-publication">Trade Publication</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.howDidYouHear && (
                    <p className="text-red-400 text-sm mt-1">{errors.howDidYouHear}</p>
                  )}
                </div>
              </div>

              {/* Row 9 - Promotional Material Checkbox */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="receivePromotionalMaterial"
                    checked={form.receivePromotionalMaterial}
                    onChange={(e) => handleInputChange('receivePromotionalMaterial', e.target.checked)}
                    className="w-4 h-4 text-[#d49e00] bg-white border-gray-300 rounded focus:ring-[#d49e00] focus:ring-2"
                  />
                  <label htmlFor="receivePromotionalMaterial" className="ml-2 text-white text-sm">
                    I would like to receive promotional material from Halal Export Indonesia
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#d49e00] text-white font-bold py-4 px-12 rounded-lg text-lg hover:bg-[#b88a00] transition-colors duration-300 shadow-lg w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'REGISTER AS BUYER'}
                </button>
              </div>
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
              Thank you for registering as a buyer! Our committee will review your application and contact you within 2-3 business days to discuss your requirements and connect you with relevant exhibitors.
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
                    mobileCountryCode: '+62',
                    company: '',
                    jobTitle: '',
                    companyNumber: '',
                    companyWebsite: '',
                    companyCountryCode: '+62',
                    industry: '',
                    primaryActivity: '',
                    numberOfEmployees: '',
                    jobFunction: '',
                    productsServicesInterested: '',
                    mainObjectives: '',
                    howDidYouHear: '',
                    receivePromotionalMaterial: false
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
