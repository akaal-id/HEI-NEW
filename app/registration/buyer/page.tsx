"use client"
import { useState } from 'react'
import Image from 'next/image'

export default function BuyerPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    fullName: '',
    mobileNumber: '',
    email: '',
    country: '',
    company: '',
    jobTitle: '',
    companyNumber: '',
    companyWebsite: ''
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!form.title) newErrors.title = 'Title is required'
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required'
    if (!form.country) newErrors.country = 'Country is required'
    if (!form.company.trim()) newErrors.company = 'Company is required'
    if (!form.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required'
    if (!form.companyNumber.trim()) newErrors.companyNumber = 'Company Number is required'
    if (!form.companyWebsite.trim()) newErrors.companyWebsite = 'Company Website is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      
      try {
        // Google Form submission
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc0ei8eFq8gqdKyyAv2ekdH04L5LIPbjKMj5ieCV73PD6uR1A/formResponse'
        
        // Create form data for Google Forms
        const formData = new FormData()
        formData.append('entry.1927939922', form.title) // Title
        formData.append('entry.1276872683', form.fullName) // Full Name
        formData.append('entry.1760945026', form.mobileNumber) // Mobile Number
        formData.append('entry.592452890', form.email) // Email
        formData.append('entry.264545349', form.country) // Country
        formData.append('entry.1988916635', form.company) // Company
        formData.append('entry.1906933795', form.jobTitle) // Job Title
        formData.append('entry.410007459', form.companyNumber) // Company Number
        formData.append('entry.585244629', form.companyWebsite) // Company Website

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
          company: '',
          jobTitle: '',
          companyNumber: '',
          companyWebsite: ''
        })
        
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error submitting your registration. Please try again.')
      } finally {
        setIsSubmitting(false)
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
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Buyer Registration Form</h2>
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Title */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Title (Mr, Mrs, Ms)*
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
                  <input
                    type="tel"
                    placeholder="Your Mobile Number"
                    value={form.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 3 */}
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

              {/* Row 4 */}
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
                  <input
                    type="tel"
                    placeholder="Your Company Phone Number"
                    value={form.companyNumber}
                    onChange={(e) => handleInputChange('companyNumber', e.target.value)}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.companyNumber ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                    required
                  />
                  {errors.companyNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.companyNumber}</p>
                  )}
                </div>
              </div>

              {/* Row 5 */}
              <div className="mb-6">
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
                    company: '',
                    jobTitle: '',
                    companyNumber: '',
                    companyWebsite: ''
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
