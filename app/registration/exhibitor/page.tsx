"use client"
import { useState } from 'react'

export default function ExhibitorPage() {
  const [form, setForm] = useState({
    contactName: '',
    companyName: '',
    email: '',
    designation: '',
    country: '',
    mobileNumber: '',
    businessType: '',
    marketSector: '',
    countryCode: '+62' // Add country code state
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!form.contactName.trim()) newErrors.contactName = 'Contact Name is required'
    if (!form.companyName.trim()) newErrors.companyName = 'Company Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!form.country) newErrors.country = 'Country is required'
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required'
    if (!form.businessType) newErrors.businessType = 'Business Type is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', form)
      alert('Registration submitted successfully!')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#492f32] to-[#2a1a1c] pt-24">
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
              {/* Contact Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Contact Name*
                </label>
                <input
                  type="text"
                  placeholder="Your Contact Name"
                  value={form.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.contactName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                  required
                />
                {errors.contactName && (
                  <p className="text-red-400 text-sm mt-1">{errors.contactName}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Company Name*
                </label>
                <input
                  type="text"
                  placeholder="Your Company Name"
                  value={form.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-lg border ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent`}
                  required
                />
                {errors.companyName && (
                  <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Designation */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Designation (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Your Designation"
                  value={form.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent"
                />
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
                      <option value="+93">🇦🇫 +93 (Afghanistan)</option>
  <option value="+355">🇦🇱 +355 (Albania)</option>
  <option value="+213">🇩🇿 +213 (Algeria)</option>
  <option value="+376">🇦🇩 +376 (Andorra)</option>
  <option value="+244">🇦🇴 +244 (Angola)</option>
  <option value="+1-264">🇦🇮 +1-264 (Anguilla)</option>
  <option value="+1-268">🇦🇬 +1-268 (Antigua & Barbuda)</option>
  <option value="+54">🇦🇷 +54 (Argentina)</option>
  <option value="+374">🇦🇲 +374 (Armenia)</option>
  <option value="+297">🇦🇼 +297 (Aruba)</option>
  <option value="+247">🇦🇨 +247 (Ascension Island)</option>
  <option value="+994">🇦🇿 +994 (Azerbaijan)</option>
  <option value="+973">🇧🇭 +973 (Bahrain)</option>
  <option value="+880">🇧🇩 +880 (Bangladesh)</option>
  <option value="+1-242">🇧🇸 +1-242 (Bahamas)</option>
  <option value="+1-246">🇧🇧 +1-246 (Barbados)</option>
  <option value="+375">🇧🇾 +375 (Belarus)</option>
  <option value="+32">🇧🇪 +32 (Belgium)</option>
  <option value="+501">🇧🇿 +501 (Belize)</option>
  <option value="+229">🇧🇯 +229 (Benin)</option>
  <option value="+975">🇧🇹 +975 (Bhutan)</option>
  <option value="+591">🇧🇴 +591 (Bolivia)</option>
  <option value="+387">🇧🇦 +387 (Bosnia & Herzegovina)</option>
  <option value="+267">🇧🇼 +267 (Botswana)</option>
  <option value="+55">🇧🇷 +55 (Brazil)</option>
  <option value="+673">🇧🇳 +673 (Brunei)</option>
  <option value="+359">🇧🇬 +359 (Bulgaria)</option>
  <option value="+226">🇧🇫 +226 (Burkina Faso)</option>
  <option value="+257">🇧🇮 +257 (Burundi)</option>
  <option value="+855">🇰🇭 +855 (Cambodia)</option>
  <option value="+237">🇨🇲 +237 (Cameroon)</option>
  <option value="+1-345">🇰🇾 +1-345 (Cayman Islands)</option>
  <option value="+238">🇨🇻 +238 (Cape Verde)</option>
  <option value="+236">🇨🇫 +236 (Central African Republic)</option>
  <option value="+235">🇹🇩 +235 (Chad)</option>
  <option value="+56">🇨🇱 +56 (Chile)</option>
  <option value="+86">🇨🇳 +86 (China)</option>
  <option value="+57">🇨🇴 +57 (Colombia)</option>
  <option value="+269">🇰🇲 +269 (Comoros)</option>
  <option value="+242">🇨🇬 +242 (Congo)</option>
  <option value="+243">🇨🇩 +243 (Congo, DR)</option>
  <option value="+682">🇨🇰 +682 (Cook Islands)</option>
  <option value="+506">🇨🇷 +506 (Costa Rica)</option>
  <option value="+385">🇭🇷 +385 (Croatia)</option>
  <option value="+53">🇨🇺 +53 (Cuba)</option>
  <option value="+599">🇨🇼 +599 (Curaçao etc.)</option>
  <option value="+357">🇨🇾 +357 (Cyprus)</option>
  <option value="+420">🇨🇿 +420 (Czech Republic)</option>
  <option value="+45">🇩🇰 +45 (Denmark)</option>
  <option value="+253">🇩🇯 +253 (Djibouti)</option>
  <option value="+1-767">🇩🇲 +1-767 (Dominica)</option>
  <option value="+1-809">🇩🇴 +1-809 (Dominican Republic)</option>
  <option value="+593">🇪🇨 +593 (Ecuador)</option>
  <option value="+20">🇪🇬 +20 (Egypt)</option>
  <option value="+503">🇸🇻 +503 (El Salvador)</option>
  <option value="+240">🇬🇶 +240 (Equatorial Guinea)</option>
  <option value="+291">🇪🇷 +291 (Eritrea)</option>
  <option value="+372">🇪🇪 +372 (Estonia)</option>
  <option value="+251">🇪🇹 +251 (Ethiopia)</option>
  <option value="+298">🇫🇴 +298 (Faroe Islands)</option>
  <option value="+679">🇫🇯 +679 (Fiji)</option>
  <option value="+358">🇫🇮 +358 (Finland)</option>
  <option value="+33">🇫🇷 +33 (France)</option>
  <option value="+594">🇬🇫 +594 (French Guiana)</option>
  <option value="+689">🇵🇫 +689 (French Polynesia)</option>
  <option value="+241">🇬🇦 +241 (Gabon)</option>
  <option value="+220">🇬🇲 +220 (Gambia)</option>
  <option value="+995">🇬🇪 +995 (Georgia)</option>
  <option value="+49">🇩🇪 +49 (Germany)</option>
  <option value="+233">🇬🇭 +233 (Ghana)</option>
  <option value="+350">🇬🇮 +350 (Gibraltar)</option>
  <option value="+30">🇬🇷 +30 (Greece)</option>
  <option value="+299">🇬🇱 +299 (Greenland)</option>
  <option value="+1-473">🇬🇩 +1-473 (Grenada)</option>
  <option value="+590">🇬🇵 +590 (Guadeloupe)</option>
  <option value="+1-671">🇬🇺 +1-671 (Guam)</option>
  <option value="+502">🇬🇹 +502 (Guatemala)</option>
  <option value="+224">🇬🇳 +224 (Guinea)</option>
  <option value="+245">🇬🇼 +245 (Guinea-Bissau)</option>
  <option value="+592">🇬🇾 +592 (Guyana)</option>
  <option value="+509">🇭🇹 +509 (Haiti)</option>
  <option value="+504">🇭🇳 +504 (Honduras)</option>
  <option value="+852">🇭🇰 +852 (Hong Kong)</option>
  <option value="+36">🇭🇺 +36 (Hungary)</option>
  <option value="+354">🇮🇸 +354 (Iceland)</option>
  <option value="+91">🇮🇳 +91 (India)</option>
  <option value="+62">🇮🇩 +62 (Indonesia)</option>
  <option value="+964">🇮🇶 +964 (Iraq)</option>
  <option value="+98">🇮🇷 +98 (Iran)</option>
  <option value="+353">🇮🇪 +353 (Ireland)</option>
  <option value="+39">🇮🇹 +39 (Italy)</option>
  <option value="+225">🇨🇮 +225 (Ivory Coast)</option>
  <option value="+1-876">🇯🇲 +1-876 (Jamaica)</option>
  <option value="+81">🇯🇵 +81 (Japan)</option>
  <option value="+962">🇯🇴 +962 (Jordan)</option>
  <option value="+7">🇰🇿/🇷🇺 +7 (Kazakhstan, Russia)</option>
  <option value="+254">🇰🇪 +254 (Kenya)</option>
  <option value="+686">🇰🇮 +686 (Kiribati)</option>
  <option value="+383">🇽🇰 +383 (Kosovo)</option>
  <option value="+965">🇰🇼 +965 (Kuwait)</option>
  <option value="+996">🇰🇬 +996 (Kyrgyzstan)</option>
  <option value="+856">🇱🇦 +856 (Laos)</option>
  <option value="+371">🇱🇻 +371 (Latvia)</option>
  <option value="+961">🇱🇧 +961 (Lebanon)</option>
  <option value="+266">🇱🇸 +266 (Lesotho)</option>
  <option value="+231">🇱🇷 +231 (Liberia)</option>
  <option value="+218">🇱🇾 +218 (Libya)</option>
  <option value="+423">🇱🇮 +423 (Liechtenstein)</option>
  <option value="+370">🇱🇹 +370 (Lithuania)</option>
  <option value="+352">🇱🇺 +352 (Luxembourg)</option>
  <option value="+853">🇲🇴 +853 (Macau)</option>
  <option value="+389">🇲🇰 +389 (North Macedonia)</option>
  <option value="+261">🇲🇬 +261 (Madagascar)</option>
  <option value="+265">🇲🇼 +265 (Malawi)</option>
  <option value="+60">🇲🇾 +60 (Malaysia)</option>
  <option value="+960">🇲🇻 +960 (Maldives)</option>
  <option value="+223">🇲🇱 +223 (Mali)</option>
  <option value="+356">🇲🇹 +356 (Malta)</option>
  <option value="+692">🇲🇭 +692 (Marshall Islands)</option>
  <option value="+596">🇲🇶 +596 (Martinique)</option>
  <option value="+222">🇲🇷 +222 (Mauritania)</option>
  <option value="+230">🇲🇺 +230 (Mauritius)</option>
  <option value="+262">🇾🇹 +262 (Mayotte/Reunion)</option>
  <option value="+52">🇲🇽 +52 (Mexico)</option>
  <option value="+691">🇫🇲 +691 (Micronesia)</option>
  <option value="+223">🇲🇱 +223 (Mali)</option>
  <option value="+373">🇲🇩 +373 (Moldova)</option>
  <option value="+377">🇲🇨 +377 (Monaco)</option>
  <option value="+976">🇲🇳 +976 (Mongolia)</option>
  <option value="+382">🇲🇪 +382 (Montenegro)</option>
  <option value="+1-664">🇲🇸 +1-664 (Montserrat)</option>
  <option value="+212">🇲🇦 +212 (Morocco)</option>
  <option value="+258">🇲🇿 +258 (Mozambique)</option>
  <option value="+95">🇲🇲 +95 (Myanmar)</option>
  <option value="+264">🇳🇦 +264 (Namibia)</option>
  <option value="+674">🇳🇷 +674 (Nauru)</option>
  <option value="+977">🇳🇵 +977 (Nepal)</option>
  <option value="+31">🇳🇱 +31 (Netherlands)</option>
  <option value="+599">🇳🇱-ANT +599 (Curaçao etc.)</option>
  <option value="+687">🇳🇨 +687 (New Caledonia)</option>
  <option value="+64">🇳🇿 +64 (New Zealand)</option>
  <option value="+505">🇳🇮 +505 (Nicaragua)</option>
  <option value="+227">🇳🇪 +227 (Niger)</option>
  <option value="+234">🇳🇬 +234 (Nigeria)</option>
  <option value="+683">🇳🇺 +683 (Niue)</option>
  <option value="+672">🇳🇫 +672 (Norfolk Island)</option>
  <option value="+850">🇰🇵 +850 (North Korea)</option>
  <option value="+47">🇳🇴 +47 (Norway)</option>
  <option value="+968">🇴🇲 +968 (Oman)</option>
  <option value="+92">🇵🇰 +92 (Pakistan)</option>
  <option value="+680">🇵🇼 +680 (Palau)</option>
  <option value="+970">🇵🇸 +970 (Palestine)</option>
  <option value="+507">🇵🇦 +507 (Panama)</option>
  <option value="+675">🇵🇬 +675 (Papua New Guinea)</option>
  <option value="+595">🇵🇾 +595 (Paraguay)</option>
  <option value="+51">🇵🇪 +51 (Peru)</option>
  <option value="+63">🇵🇭 +63 (Philippines)</option>
  <option value="+48">🇵🇱 +48 (Poland)</option>
  <option value="+351">🇵🇹 +351 (Portugal)</option>
  <option value="+1-787">🇵🇷 +1-787 (Puerto Rico)</option>
  <option value="+974">🇶🇦 +974 (Qatar)</option>
  <option value="+262">🇷🇪 +262 (Réunion)</option>
  <option value="+40">🇷🇴 +40 (Romania)</option>
  <option value="+380">🇺🇦 +380 (Ukraine)</option>
  <option value="+381">🇷🇸 +381 (Serbia)</option>
  <option value="+248">🇸🇨 +248 (Seychelles)</option>
  <option value="+232">🇸🇱 +232 (Sierra Leone)</option>
  <option value="+65">🇸🇬 +65 (Singapore)</option>
  <option value="+1-721">🇸🇽 +1-721 (Sint Maarten)</option>
  <option value="+421">🇸🇰 +421 (Slovakia)</option>
  <option value="+386">🇸🇮 +386 (Slovenia)</option>
  <option value="+677">🇸🇧 +677 (Solomon Islands)</option>
  <option value="+252">🇸🇴 +252 (Somalia)</option>
  <option value="+27">🇿🇦 +27 (South Africa)</option>
  <option value="+82">🇰🇷 +82 (South Korea)</option>
  <option value="+211">🇸🇸 +211 (South Sudan)</option>
  <option value="+34">🇪🇸 +34 (Spain)</option>
  <option value="+94">🇱🇰 +94 (Sri Lanka)</option>
  <option value="+249">🇸🇩 +249 (Sudan)</option>
  <option value="+597">🇸🇷 +597 (Suriname)</option>
  <option value="+46">🇸🇪 +46 (Sweden)</option>
  <option value="+41">🇨🇭 +41 (Switzerland)</option>
  <option value="+963">🇸🇾 +963 (Syria)</option>
  <option value="+886">🇹🇼 +886 (Taiwan)</option>
  <option value="+992">🇹🇯 +992 (Tajikistan)</option>
  <option value="+255">🇹🇿 +255 (Tanzania)</option>
  <option value="+66">🇹🇭 +66 (Thailand)</option>
  <option value="+670">🇹🇱 +670 (Timor-Leste)</option>
  <option value="+228">🇹🇬 +228 (Togo)</option>
  <option value="+690">🇹🇰 +690 (Tokelau)</option>
  <option value="+676">🇹🇴 +676 (Tonga)</option>
  <option value="+1-868">🇹🇹 +1-868 (Trinidad & Tobago)</option>
  <option value="+216">🇹🇳 +216 (Tunisia)</option>
  <option value="+90">🇹🇷 +90 (Turkey)</option>
  <option value="+993">🇹🇲 +993 (Turkmenistan)</option>
  <option value="+1-649">🇹🇨 +1-649 (Turks & Caicos)</option>
  <option value="+688">🇹🇻 +688 (Tuvalu)</option>
  <option value="+256">🇺🇬 +256 (Uganda)</option>
  <option value="+380">🇺🇦 +380 (Ukraine)</option>
  <option value="+971">🇦🇪 +971 (United Arab Emirates)</option>
  <option value="+44">🇬🇧 +44 (United Kingdom)</option>
  <option value="+1-284">🇻🇬 +1-284 (British Virgin Islands)</option>
  <option value="+1-340">🇻🇮 +1-340 (U.S. Virgin Islands)</option>
  <option value="+598">🇺🇾 +598 (Uruguay)</option>
  <option value="+998">🇺🇿 +998 (Uzbekistan)</option>
  <option value="+678">🇻🇺 +678 (Vanuatu)</option>
  <option value="+379">🇻🇦 +379 (Vatican City)</option>
  <option value="+58">🇻🇪 +58 (Venezuela)</option>
  <option value="+84">🇻🇳 +84 (Vietnam)</option>
  <option value="+681">🇼🇫 +681 (Wallis & Futuna)</option>
  <option value="+967">🇾🇪 +967 (Yemen)</option>
  <option value="+260">🇿🇲 +260 (Zambia)</option>
  <option value="+263">🇿🇼 +263 (Zimbabwe)</option>
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
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="other">Other</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>
                )}
              </div>

              {/* Market Sector of Interest */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Market Sector of Interest
                </label>
                <select
                  value={form.marketSector}
                  onChange={(e) => handleInputChange('marketSector', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d49e00] focus:border-transparent appearance-none bg-white bg-no-repeat bg-right pr-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="">Select Your Market Sector of Interest</option>
                  <option value="food-beverages">Food & Beverages</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="pharmaceuticals">Pharmaceuticals</option>
                  <option value="textiles">Textiles</option>
                  <option value="tourism">Tourism</option>
                  <option value="finance">Finance</option>
                  <option value="logistics">Logistics</option>
                  <option value="technology">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

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
    </div>
  )
}
