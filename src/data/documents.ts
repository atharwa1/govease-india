export type DocumentCategory = 'Identity' | 'Transport' | 'Welfare' | 'Finance';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'file' | 'textarea';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface ServiceOption {
  id: string;
  label: string;
  labelHi: string;
  iconName: string;
  description: string;
  formFields?: FormField[];
}

export interface DocumentInfo {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  category: DocumentCategory;
  iconName: string;
  services: ServiceOption[];
  eligibility: string[];
  requiredDocs: string[];
  fees: string;
  processingTime: string;
  steps: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  formFields: FormField[];
}

const commonPersonalFields: FormField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As per official records', required: true },
  { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
  { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
  { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
  { name: 'address', label: 'Full Address', type: 'textarea', placeholder: 'House No., Street, City, State, PIN', required: true },
];

export const documentsData: DocumentInfo[] = [
  {
    id: 'aadhaar',
    title: 'Aadhaar Card',
    titleHi: 'आधार कार्ड',
    description: 'Unique 12-digit identity number issued to Indian residents by UIDAI.',
    category: 'Identity',
    iconName: 'Fingerprint',
    services: [
      { 
        id: 'new-enrolment', 
        label: 'New Enrolment', 
        labelHi: 'नया नामांकन', 
        iconName: 'UserPlus', 
        description: 'Apply for a fresh Aadhaar card at an enrolment centre',
        formFields: [
          ...commonPersonalFields,
          { name: 'fatherName', label: "Father's / Guardian's Name", type: 'text', placeholder: 'As per records', required: true },
          { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true }
        ]
      },
      { 
        id: 'update-correction', 
        label: 'Update / Correction', 
        labelHi: 'अपडेट / सुधार', 
        iconName: 'Edit', 
        description: 'Update name, address, DOB, mobile, or email in Aadhaar',
        formFields: [
          { name: 'aadhaarNumber', label: 'Current Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'fieldToUpdate', label: 'Field to Update', type: 'select', required: true, options: ['Name', 'Address', 'Email', 'Mobile Number', 'Date of Birth'] },
          { name: 'newValue', label: 'New Value', type: 'text', placeholder: 'Enter new value', required: true },
          { name: 'updateProof', label: 'Supporting Document', type: 'file', placeholder: 'Proof for this update', required: true },
          { name: 'reason', label: 'Reason for Update', type: 'textarea', placeholder: 'Why are you updating this?', required: false }
        ]
      },
      { 
        id: 'reprint', 
        label: 'Order Reprint', 
        labelHi: 'पुनर्मुद्रण', 
        iconName: 'Printer', 
        description: 'Order a PVC Aadhaar card reprint via UIDAI',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'otp', label: 'OTP (will be sent to mobile)', type: 'text', placeholder: '6-digit OTP', required: true },
          { name: 'deliveryAddress', label: 'Delivery Address (if different)', type: 'textarea', placeholder: 'Leave blank for registered address', required: false }
        ]
      },
      { 
        id: 'download', 
        label: 'Download e-Aadhaar', 
        labelHi: 'ई-आधार डाउनलोड', 
        iconName: 'Download', 
        description: 'Download a digital copy of your Aadhaar (e-Aadhaar PDF)',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'otp', label: 'OTP (will be sent to mobile)', type: 'text', placeholder: '6-digit OTP', required: true }
        ]
      },
      { 
        id: 'check-status', 
        label: 'Check Enrolment Status', 
        labelHi: 'स्थिति जाँचें', 
        iconName: 'Search', 
        description: 'Track the status of your Aadhaar enrolment or update',
        formFields: [
          { name: 'enrollmentId', label: 'Enrolment ID (14-digit EID)', type: 'text', placeholder: 'EID from your slip', required: true }
        ]
      },
      { 
        id: 'lock-biometrics', 
        label: 'Lock / Unlock Biometrics', 
        labelHi: 'बायोमेट्रिक लॉक', 
        iconName: 'Lock', 
        description: 'Lock or unlock your biometric authentication for security',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'otp', label: 'OTP (will be sent to mobile)', type: 'text', placeholder: '6-digit OTP', required: true },
          { name: 'action', label: 'Action', type: 'select', required: true, options: ['Lock Biometrics', 'Unlock Biometrics'] }
        ]
      },
      { 
        id: 'generate-vid', 
        label: 'Generate / Retrieve VID', 
        labelHi: 'VID जनरेट करें', 
        iconName: 'KeyRound', 
        description: 'Generate a 16-digit Virtual ID for privacy-safe authentication',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'otp', label: 'OTP (will be sent to mobile)', type: 'text', placeholder: '6-digit OTP', required: true },
          { name: 'consent', label: 'I consent to generate VID', type: 'text', placeholder: 'Type YES to confirm', required: true }
        ]
      },
      { 
        id: 'verify-aadhaar', 
        label: 'Verify Aadhaar', 
        labelHi: 'आधार सत्यापन', 
        iconName: 'ShieldCheck', 
        description: 'Verify your Aadhaar number validity online via UIDAI',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'name', label: 'Full Name', type: 'text', placeholder: 'As per Aadhaar records', required: true }
        ]
      },
      { 
        id: 'bank-linking', 
        label: 'Aadhaar-Bank Linking', 
        labelHi: 'बैंक लिंकिंग स्थिति', 
        iconName: 'Landmark', 
        description: 'Check if your Aadhaar is linked with your bank account',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Other'] },
          { name: 'accountNumber', label: 'Bank Account Number', type: 'text', placeholder: 'Your account number', required: true }
        ]
      },
      { 
        id: 'maadhaar', 
        label: 'mAadhaar Profile', 
        labelHi: 'mAadhaar प्रोफ़ाइल', 
        iconName: 'Smartphone', 
        description: 'Access your Aadhaar profile via the official mAadhaar app',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true }
        ]
      }
    ],
    eligibility: ['Any resident of India', 'No age restriction', 'No citizenship requirement — residency is sufficient'],
    requiredDocs: ['Proof of Identity (Passport, PAN, Voter ID)', 'Proof of Address (Utility bill, Bank statement)', 'Proof of Date of Birth (Birth certificate, Marksheet)'],
    fees: '₹0 (Free for new enrolment); ₹50 for updates',
    processingTime: '15 – 90 days',
    steps: [
      { title: 'Locate Enrolment Centre', desc: 'Find the nearest Aadhaar Enrolment Centre using the locator.' },
      { title: 'Fill Application Form', desc: 'Fill the Aadhaar enrolment/update form with your personal details.' },
      { title: 'Submit Biometrics', desc: 'Your fingerprints, iris scan, and photograph will be captured.' },
      { title: 'Get Acknowledgement Slip', desc: 'You will receive a 14-digit Enrolment ID (EID) on the slip.' },
      { title: 'Download e-Aadhaar', desc: 'Once processed, download your e-Aadhaar from the UIDAI portal.' }
    ],
    faqs: [
      { question: 'Is Aadhaar mandatory?', answer: 'Aadhaar is not mandatory by law but is required for availing most government subsidies and services.' },
      { question: 'Can NRIs get Aadhaar?', answer: 'NRIs with an Indian passport can apply for Aadhaar upon arrival in India.' },
      { question: 'How to update address in Aadhaar?', answer: 'You can update your address online through the UIDAI Self Service portal or by visiting an enrolment centre.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'fatherName', label: "Father's / Guardian's Name", type: 'text', placeholder: 'As per records', required: true },
      { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true },
      { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true }
    ]
  },
  {
    id: 'pan',
    title: 'PAN Card',
    titleHi: 'पैन कार्ड',
    description: 'Permanent Account Number for tax identification and financial transactions.',
    category: 'Finance',
    iconName: 'CreditCard',
    services: [
      { 
        id: 'new-pan', 
        label: 'Apply for New PAN', 
        labelHi: 'नया पैन आवेदन', 
        iconName: 'FilePlus', 
        description: 'Apply for a new PAN card using Form 49A (Indian) or 49AA (Foreign)',
        formFields: [
          ...commonPersonalFields,
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
          { name: 'citizenshipType', label: 'Citizenship Type', type: 'select', required: true, options: ['Indian', 'Foreign National'] },
          { name: 'incomeSource', label: 'Source of Income', type: 'select', required: true, options: ['Salary', 'Business', 'Capital Gains', 'Other'] },
          { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true },
          { name: 'photo', label: 'Upload Photograph', type: 'file', required: true }
        ]
      },
      { 
        id: 'correction-reprint', 
        label: 'Correction / Reprint', 
        labelHi: 'सुधार / पुनर्मुद्रण', 
        iconName: 'Edit', 
        description: 'Correct details or request a reprint of your existing PAN card',
        formFields: [
          { name: 'panNumber', label: 'Current PAN Number', type: 'text', placeholder: '10-character PAN', required: true },
          { name: 'correctionType', label: 'Type of Correction', type: 'select', required: true, options: ['Name', 'Address', 'Email', 'Mobile', 'Other Details'] },
          { name: 'newValue', label: 'New Value', type: 'text', placeholder: 'Enter corrected value', required: true },
          { name: 'supportingDoc', label: 'Supporting Document', type: 'file', required: true },
          { name: 'reason', label: 'Reason for Correction', type: 'textarea', placeholder: 'Explain the change', required: false }
        ]
      },
      { 
        id: 'link-aadhaar', 
        label: 'Link PAN with Aadhaar', 
        labelHi: 'आधार से लिंक', 
        iconName: 'Link', 
        description: 'Link your PAN with Aadhaar as mandated by the Income Tax Department',
        formFields: [
          { name: 'panNumber', label: 'PAN Number', type: 'text', placeholder: '10-character PAN', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true }
        ]
      },
      { 
        id: 'instant-epan', 
        label: 'Instant e-PAN', 
        labelHi: 'तत्काल ई-पैन', 
        iconName: 'Zap', 
        description: 'Get an instant e-PAN using your Aadhaar number and OTP',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As per Aadhaar', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'otp', label: 'OTP (sent to mobile)', type: 'text', placeholder: '6-digit OTP', required: true }
        ]
      },
      { 
        id: 'check-status', 
        label: 'Check Application Status', 
        labelHi: 'आवेदन स्थिति', 
        iconName: 'Search', 
        description: 'Track the status of your PAN application using acknowledgment number',
        formFields: [
          { name: 'acknowledgmentNumber', label: 'Acknowledgment Number', type: 'text', placeholder: '15-digit acknowledgment no.', required: true }
        ]
      },
      { 
        id: 'verify-pan', 
        label: 'Verify PAN Details', 
        labelHi: 'पैन सत्यापन', 
        iconName: 'ShieldCheck', 
        description: 'Verify PAN details and active status on Income Tax portal',
        formFields: [
          { name: 'panNumber', label: 'PAN Number', type: 'text', placeholder: '10-character PAN', required: true },
          { name: 'fullName', label: 'Full Name (as per PAN)', type: 'text', placeholder: 'Your name', required: true }
        ]
      },
      { 
        id: 'know-pan', 
        label: 'Know Your PAN', 
        labelHi: 'अपना पैन जानें', 
        iconName: 'Eye', 
        description: 'Retrieve your PAN number using name, DOB, and mobile OTP',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As per tax records', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'otp', label: 'OTP (sent to mobile)', type: 'text', placeholder: '6-digit OTP', required: true }
        ]
      },
      { 
        id: 'surrender-pan', 
        label: 'Surrender Duplicate PAN', 
        labelHi: 'डुप्लीकेट पैन सरेंडर', 
        iconName: 'FileX', 
        description: 'Surrender extra PAN cards — holding more than one PAN is illegal',
        formFields: [
          { name: 'panToKeep', label: 'PAN to Keep (Primary)', type: 'text', placeholder: '10-character PAN', required: true },
          { name: 'panToSurrender', label: 'PAN to Surrender', type: 'text', placeholder: '10-character PAN', required: true },
          { name: 'reason', label: 'Reason for Surrender', type: 'textarea', placeholder: 'Explain duplicate PAN situation', required: true },
          { name: 'declaration', label: 'I declare this is duplicate', type: 'text', placeholder: 'Type YES to confirm', required: true }
        ]
      }
    ],
    eligibility: ['Any Indian citizen', 'Individuals, companies, firms, and trusts', 'Foreign nationals with taxable income in India'],
    requiredDocs: ['Proof of Identity (Aadhaar, Passport, Voter ID)', 'Proof of Address (Utility bill, Bank statement)', 'Proof of Date of Birth (Birth certificate)', '2 recent passport-size photographs'],
    fees: '₹107 (Indian address); ₹1,017 (foreign address)',
    processingTime: '15 – 20 working days',
    steps: [
      { title: 'Choose Application Type', desc: 'Select Form 49A (Indian citizens) or Form 49AA (foreign citizens).' },
      { title: 'Fill the Online Form', desc: 'Enter your personal, contact, and source-of-income details.' },
      { title: 'Upload Documents', desc: 'Upload scanned copies of your ID, address, and DOB proof.' },
      { title: 'Pay Fee & Submit', desc: 'Pay the application fee online via net banking, card, or UPI.' },
      { title: 'Receive PAN', desc: 'PAN card will be dispatched to your address after processing.' }
    ],
    faqs: [
      { question: 'Can I apply for PAN without Aadhaar?', answer: 'No. As per recent rules, Aadhaar is mandatory for PAN application and must be linked.' },
      { question: 'How to link PAN with Aadhaar?', answer: 'You can link them via the Income Tax e-filing portal or by sending an SMS.' },
      { question: 'What if I have duplicate PAN?', answer: 'Having more than one PAN is illegal. Surrender the extra PAN by filing a PAN change request.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
      { name: 'incomeSource', label: 'Source of Income', type: 'select', required: true, options: ['Salary', 'Business', 'Capital Gains', 'Other'] },
      { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true },
      { name: 'photo', label: 'Upload Photograph', type: 'file', required: true }
    ]
  },
  {
    id: 'dl',
    title: 'Driving License',
    titleHi: 'ड्राइविंग लाइसेंस',
    description: 'Official document permitting individuals to operate motorized vehicles on public roads.',
    category: 'Transport',
    iconName: 'Car',
    services: [
      { 
        id: 'learner-license', 
        label: 'Apply Learner License', 
        labelHi: 'लर्नर लाइसेंस', 
        iconName: 'GraduationCap', 
        description: 'Apply for a new Learner License (LL) at your RTO',
        formFields: [
          ...commonPersonalFields,
          { name: 'category', label: 'Vehicle Category', type: 'select', required: true, options: ['Two-Wheeler', 'Light Motor Vehicle (LMV)', 'Heavy Motor Vehicle (HMV)', 'Transport'] },
          { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true },
          { name: 'drivingTestSlot', label: 'Preferred Test Date', type: 'date', required: false }
        ]
      },
      { 
        id: 'new-dl', 
        label: 'New Driving License', 
        labelHi: 'नया DL', 
        iconName: 'FilePlus', 
        description: 'Apply for a permanent Driving License after passing the test',
        formFields: [
          ...commonPersonalFields,
          { name: 'llNumber', label: 'Learner License Number', type: 'text', placeholder: 'Your LL number', required: true },
          { name: 'llExpiryDate', label: 'LL Expiry Date', type: 'date', required: true },
          { name: 'vehicleClass', label: 'Vehicle Class', type: 'select', required: true, options: ['Two-Wheeler', 'Light Motor Vehicle (LMV)', 'Heavy Motor Vehicle (HMV)', 'Transport'] },
          { name: 'medicalCert', label: 'Upload Medical Certificate', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true },
          { name: 'testPassed', label: 'Driving Test Passed (Date)', type: 'date', required: true }
        ]
      },
      { 
        id: 'renewal', 
        label: 'Renewal', 
        labelHi: 'नवीनीकरण', 
        iconName: 'RefreshCw', 
        description: 'Renew your expired or expiring Driving License',
        formFields: [
          { name: 'dlNumber', label: 'Current Driving License Number', type: 'text', placeholder: 'Your DL number', required: true },
          { name: 'dlExpiryDate', label: 'Current DL Expiry Date', type: 'date', required: true },
          { name: 'newValidityPeriod', label: 'New Validity Period', type: 'select', required: true, options: ['3 Years', '5 Years', '10 Years'] },
          { name: 'medicalCert', label: 'Medical Certificate (if 15+ years old vehicle)', type: 'file', required: false }
        ]
      },
      { 
        id: 'duplicate', 
        label: 'Duplicate License', 
        labelHi: 'डुप्लीकेट DL', 
        iconName: 'Copy', 
        description: 'Apply for a duplicate DL if original is lost or damaged',
        formFields: [
          { name: 'dlNumber', label: 'Original Driving License Number', type: 'text', placeholder: 'Your DL number', required: true },
          { name: 'lossReason', label: 'Reason (Lost / Damaged / Stolen)', type: 'select', required: true, options: ['Lost', 'Damaged', 'Stolen', 'Other'] },
          { name: 'fir', label: 'FIR Number (if stolen)', type: 'text', placeholder: 'FIR from police', required: false },
          { name: 'deliveryAddress', label: 'Updated Delivery Address (if changed)', type: 'textarea', placeholder: 'Leave blank if same', required: false }
        ]
      },
      { 
        id: 'international', 
        label: 'International Driving Permit', 
        labelHi: 'अंतरराष्ट्रीय परमिट', 
        iconName: 'Globe', 
        description: 'Apply for an IDP for driving abroad',
        formFields: [
          { name: 'dlNumber', label: 'Driving License Number', type: 'text', placeholder: 'Your DL number', required: true },
          { name: 'destination', label: 'Destination Country/Countries', type: 'text', placeholder: 'Where do you plan to drive?', required: true },
          { name: 'travelDates', label: 'Travel Dates', type: 'text', placeholder: 'From - To dates', required: true },
          { name: 'photo', label: 'Upload Photograph', type: 'file', required: true },
          { name: 'dlCopy', label: 'Copy of Driving License', type: 'file', required: true }
        ]
      },
      { 
        id: 'address-change', 
        label: 'Change of Address', 
        labelHi: 'पता परिवर्तन', 
        iconName: 'MapPin', 
        description: 'Update your address on the Driving License',
        formFields: [
          { name: 'dlNumber', label: 'Driving License Number', type: 'text', placeholder: 'Your DL number', required: true },
          { name: 'newAddress', label: 'New Address', type: 'textarea', placeholder: 'House No., Street, City, State, PIN', required: true },
          { name: 'addressProof', label: 'Upload New Address Proof', type: 'file', required: true }
        ]
      },
      { 
        id: 'add-endorsement', 
        label: 'Add Vehicle Class (AEDL)', 
        labelHi: 'वाहन श्रेणी जोड़ें', 
        iconName: 'ListPlus', 
        description: 'Add a new vehicle class endorsement to your existing DL',
        formFields: [
          { name: 'dlNumber', label: 'Driving License Number', type: 'text', placeholder: 'Your DL number', required: true },
          { name: 'newCategory', label: 'Vehicle Category to Add', type: 'select', required: true, options: ['Two-Wheeler', 'Light Motor Vehicle (LMV)', 'Heavy Motor Vehicle (HMV)', 'Transport', 'Taxi'] },
          { name: 'medicalCert', label: 'Medical Certificate', type: 'file', required: true },
          { name: 'testPassProof', label: 'Driving Test Pass Certificate', type: 'file', required: true }
        ]
      },
      { 
        id: 'dl-extract', 
        label: 'Extract of DL', 
        labelHi: 'DL उद्धरण', 
        iconName: 'FileOutput', 
        description: 'Obtain a certified extract/printout of your Driving License',
        formFields: [
          { name: 'dlNumber', label: 'Driving License Number', type: 'text', placeholder: 'Your DL number', required: true },
          { name: 'purpose', label: 'Purpose of Extract', type: 'select', required: true, options: ['Loan Application', 'Insurance', 'Court Case', 'Other'] },
          { name: 'quantity', label: 'Number of Copies', type: 'select', required: true, options: ['1', '2', '3', '5'] }
        ]
      },
      { 
        id: 'surrender-dl', 
        label: 'Surrender DL', 
        labelHi: 'DL सरेंडर', 
        iconName: 'FileX', 
        description: 'Surrender your Driving License upon cancellation or disqualification',
        formFields: [
          { name: 'dlNumber', label: 'Driving License Number', type: 'text', placeholder: 'Your DL number', required: true },
          { name: 'surrenderReason', label: 'Reason for Surrender', type: 'select', required: true, options: ['Disqualification', 'Cancellation', 'Retirement', 'Medical Reasons', 'Other'] },
          { name: 'legalNotice', label: 'Court Order / Legal Notice (if applicable)', type: 'file', required: false },
          { name: 'remarks', label: 'Additional Remarks', type: 'textarea', placeholder: 'Provide any additional information', required: false }
        ]
      }
    ],
    eligibility: ['Minimum age: 16 (geared motorcycle), 18 (car/commercial)', 'Must hold a valid Learner License', 'Must pass the driving test at RTO'],
    requiredDocs: ['Learner License', 'Proof of Age (Birth certificate, SSC marksheet)', 'Proof of Address (Aadhaar, Passport)', '6 passport-size photographs', 'Medical certificate (Form 1A)'],
    fees: '₹200 – ₹1,000 (varies by state and vehicle class)',
    processingTime: '7 – 30 days after test',
    steps: [
      { title: 'Get Learner License', desc: 'Apply for and obtain a Learner License (LL) first.' },
      { title: 'Practice Driving', desc: 'Wait minimum 30 days after LL issuance and practice driving.' },
      { title: 'Book DL Test Slot', desc: 'Book a test slot at your nearest RTO through the Parivahan portal.' },
      { title: 'Pass Driving Test', desc: 'Appear for the driving test at the RTO on the scheduled date.' },
      { title: 'Receive Smart Card DL', desc: 'Upon passing, your DL smart card will be dispatched to your address.' }
    ],
    faqs: [
      { question: 'Can I apply for DL online?', answer: 'Yes, you can fill the application form online on Parivahan (parivahan.gov.in), but the driving test must be taken in person at the RTO.' },
      { question: 'What is the validity of a DL?', answer: 'A Driving License is valid for 20 years from the date of issue or until the holder turns 50, whichever is earlier.' },
      { question: 'How to renew an expired DL?', answer: 'You can apply for renewal up to 1 year before or after expiry through the Parivahan portal or by visiting the RTO.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'llNumber', label: 'Learner License Number', type: 'text', placeholder: 'Your LL number', required: true },
      { name: 'vehicleClass', label: 'Vehicle Class', type: 'select', required: true, options: ['Two-Wheeler', 'Light Motor Vehicle (LMV)', 'Heavy Motor Vehicle (HMV)', 'Transport'] },
      { name: 'medicalCert', label: 'Upload Medical Certificate', type: 'file', required: true },
      { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true }
    ]
  },
  {
    id: 'voter',
    title: 'Voter ID',
    titleHi: 'मतदाता पहचान पत्र',
    description: 'Identity document (EPIC) issued by the Election Commission of India for voting.',
    category: 'Identity',
    iconName: 'BadgeCheck',
    services: [
      { 
        id: 'new-registration', 
        label: 'New Registration (Form 6)', 
        labelHi: 'नया पंजीकरण', 
        iconName: 'UserPlus', 
        description: 'Register as a new voter in the electoral roll',
        formFields: [
          ...commonPersonalFields,
          { name: 'constituency', label: 'Constituency / Assembly', type: 'text', placeholder: 'Your area constituency', required: true },
          { name: 'pollingStation', label: 'Polling Station Area', type: 'text', placeholder: 'Your polling station', required: true },
          { name: 'photo', label: 'Upload Photograph', type: 'file', required: true },
          { name: 'ageProof', label: 'Upload Age Proof', type: 'file', required: true }
        ]
      },
      { 
        id: 'correction', 
        label: 'Correction (Form 8)', 
        labelHi: 'सुधार', 
        iconName: 'Edit', 
        description: 'Correct your name, DOB, photo, or address on Voter ID',
        formFields: [
          { name: 'epicNumber', label: 'EPIC / Voter ID Number', type: 'text', placeholder: 'Your voter ID', required: true },
          { name: 'fieldToCorrect', label: 'Field to Correct', type: 'select', required: true, options: ['Name', 'Date of Birth', 'Address', 'Photo', 'Gender'] },
          { name: 'newValue', label: 'Corrected Value', type: 'text', placeholder: 'Enter correct value', required: true },
          { name: 'proof', label: 'Proof Document', type: 'file', required: true }
        ]
      },
      { 
        id: 'transfer', 
        label: 'Transfer / Shift (Form 8)', 
        labelHi: 'स्थानांतरण', 
        iconName: 'ArrowRightLeft', 
        description: 'Transfer your voter registration when moving address',
        formFields: [
          { name: 'epicNumber', label: 'EPIC / Voter ID Number', type: 'text', placeholder: 'Your voter ID', required: true },
          { name: 'oldConstituency', label: 'Old Constituency', type: 'text', placeholder: 'Previous constituency', required: true },
          { name: 'newAddress', label: 'New Address', type: 'textarea', placeholder: 'Full new address', required: true },
          { name: 'newConstituency', label: 'New Constituency', type: 'text', placeholder: 'New constituency area', required: true },
          { name: 'addressProof', label: 'New Address Proof', type: 'file', required: true }
        ]
      },
      { 
        id: 'download-epic', 
        label: 'Download e-EPIC', 
        labelHi: 'ई-EPIC डाउनलोड', 
        iconName: 'Download', 
        description: 'Download a digital copy of your Voter ID card',
        formFields: [
          { name: 'epicNumber', label: 'EPIC / Voter ID Number', type: 'text', placeholder: 'Your voter ID', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true }
        ]
      },
      { 
        id: 'deletion', 
        label: 'Deletion (Form 7)', 
        labelHi: 'विलोपन', 
        iconName: 'Trash2', 
        description: 'Request deletion of a name from the electoral roll',
        formFields: [
          { name: 'epicNumber', label: 'EPIC / Voter ID Number', type: 'text', placeholder: 'Your voter ID', required: true },
          { name: 'deletionReason', label: 'Reason for Deletion', type: 'select', required: true, options: ['Moved to Another Country', 'Deceased', 'Incorrect Entry', 'Other'] },
          { name: 'supportingDoc', label: 'Supporting Document', type: 'file', required: true }
        ]
      },
      { 
        id: 'electoral-search', 
        label: 'Electoral Roll Search', 
        labelHi: 'मतदाता सूची खोजें', 
        iconName: 'Search', 
        description: 'Search your name in the electoral roll online via voters.eci.gov.in',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
          { name: 'constituency', label: 'Constituency', type: 'text', placeholder: 'Your constituency', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: false }
        ]
      },
      { 
        id: 'blo-details', 
        label: 'BLO / ERO Details', 
        labelHi: 'BLO / ERO विवरण', 
        iconName: 'MapPin', 
        description: 'Find your Booth Level Officer and Electoral Registration Officer',
        formFields: [
          { name: 'constituency', label: 'Constituency', type: 'text', placeholder: 'Your constituency', required: true },
          { name: 'state', label: 'State', type: 'text', placeholder: 'Your state', required: true }
        ]
      },
      { 
        id: 'overseas-voter', 
        label: 'Overseas Registration (6A)', 
        labelHi: 'विदेशी मतदाता पंजीकरण', 
        iconName: 'Globe', 
        description: 'Register as an overseas Indian voter using Form 6A',
        formFields: [
          ...commonPersonalFields,
          { name: 'countryOfResidence', label: 'Country of Residence', type: 'text', placeholder: 'Where do you live?', required: true },
          { name: 'indianConstituency', label: 'Indian Constituency (Last residence)', type: 'text', placeholder: 'Where you last lived in India', required: true },
          { name: 'passport', label: 'Passport Number', type: 'text', required: true },
          { name: 'passportCopy', label: 'Passport Copy', type: 'file', required: true }
        ]
      }
    ],
    eligibility: ['Indian citizen', 'Minimum age: 18 years on qualifying date (Jan 1)', 'Resident of the constituency'],
    requiredDocs: ['Proof of Age (Birth certificate, Marksheet)', 'Proof of Address (Aadhaar, Utility bill)', 'Recent passport-size photograph'],
    fees: 'Free',
    processingTime: '15 – 30 days',
    steps: [
      { title: 'Fill Form 6 Online', desc: 'Fill the voter registration Form 6 on the NVSP portal.' },
      { title: 'Upload Documents', desc: 'Upload your photo, age proof, and address proof.' },
      { title: 'Submit Application', desc: 'Review and submit your application online.' },
      { title: 'BLO Verification', desc: 'A Booth Level Officer will visit your address for verification.' },
      { title: 'Receive Voter ID', desc: 'After verification, your EPIC card will be issued.' }
    ],
    faqs: [
      { question: 'Can I vote without a Voter ID?', answer: 'Yes, you can use other approved IDs like Aadhaar, Passport, or DL at the polling booth, but Voter ID is the primary document.' },
      { question: 'How to update details on Voter ID?', answer: 'Use Form 8 on the NVSP portal for corrections in name, address, photo, or other details.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'constituency', label: 'Constituency / Assembly', type: 'text', placeholder: 'Your area constituency', required: true },
      { name: 'photo', label: 'Upload Photograph', type: 'file', required: true },
      { name: 'ageProof', label: 'Upload Age Proof', type: 'file', required: true }
    ]
  },
  {
    id: 'passport',
    title: 'Passport',
    titleHi: 'पासपोर्ट',
    description: 'Travel document for international travel issued by the Government of India.',
    category: 'Identity',
    iconName: 'Plane',
    services: [
      { 
        id: 'fresh-passport', 
        label: 'Fresh Passport', 
        labelHi: 'नया पासपोर्ट', 
        iconName: 'FilePlus', 
        description: 'Apply for a brand new Indian passport',
        formFields: [
          ...commonPersonalFields,
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
          { name: 'maritalStatus', label: 'Marital Status', type: 'select', required: true, options: ['Single', 'Married', 'Divorced', 'Widowed'] },
          { name: 'passportType', label: 'Passport Type', type: 'select', required: true, options: ['Normal', 'Tatkal'] },
          { name: 'bookletPages', label: 'Booklet Pages', type: 'select', required: true, options: ['36 Pages', '60 Pages'] },
          { name: 'dobProof', label: 'Upload DOB Proof', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true },
          { name: 'photo', label: 'Upload Photograph', type: 'file', required: true }
        ]
      },
      { 
        id: 'renewal', 
        label: 'Passport Renewal', 
        labelHi: 'पासपोर्ट नवीनीकरण', 
        iconName: 'RefreshCw', 
        description: 'Renew your expired or expiring passport',
        formFields: [
          { name: 'passportNumber', label: 'Current Passport Number', type: 'text', placeholder: '8-character passport', required: true },
          { name: 'passportExpiryDate', label: 'Expiry Date', type: 'date', required: true },
          { name: 'renewalType', label: 'Renewal Type', type: 'select', required: true, options: ['Normal (50 pages)', 'Tatkal', 'Extended (60 pages)'] },
          { name: 'detailsChanged', label: 'Have your details changed?', type: 'select', required: true, options: ['No', 'Yes - Name', 'Yes - Address', 'Yes - Other'] },
          { name: 'oldPassport', label: 'Old Passport Copy', type: 'file', required: true }
        ]
      },
      { 
        id: 'reissue', 
        label: 'Re-issue Passport', 
        labelHi: 'पासपोर्ट पुनः जारी', 
        iconName: 'RotateCw', 
        description: 'Re-issue for exhausted pages, lost/damaged, or name/address change',
        formFields: [
          { name: 'passportNumber', label: 'Current Passport Number', type: 'text', placeholder: '8-character passport', required: false },
          { name: 'reissueReason', label: 'Reason for Re-issue', type: 'select', required: true, options: ['Pages Exhausted', 'Lost', 'Damaged', 'Name Change', 'Address Change', 'Other'] },
          { name: 'detailedReason', label: 'Provide Details', type: 'textarea', placeholder: 'Explain the reason', required: true },
          { name: 'supportingDoc', label: 'Supporting Document', type: 'file', required: true },
          { name: 'photo', label: 'Updated Photograph', type: 'file', required: true }
        ]
      },
      { 
        id: 'tatkal', 
        label: 'Tatkal Passport', 
        labelHi: 'तत्काल पासपोर्ट', 
        iconName: 'Zap', 
        description: 'Expedited passport processing (1-3 working days)',
        formFields: [
          ...commonPersonalFields,
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'urgencyReason', label: 'Reason for Urgency', type: 'select', required: true, options: ['Business Trip', 'Medical Emergency', 'Family Emergency', 'Immigration', 'Other'] },
          { name: 'reasonDetails', label: 'Details of Urgency', type: 'textarea', placeholder: 'Explain why you need it urgently', required: true },
          { name: 'travelDate', label: 'Travel Date', type: 'date', required: true },
          { name: 'dobProof', label: 'DOB Proof', type: 'file', required: true },
          { name: 'addressProof', label: 'Address Proof', type: 'file', required: true }
        ]
      },
      { 
        id: 'pcc', 
        label: 'Police Clearance (PCC)', 
        labelHi: 'पुलिस क्लियरेंस', 
        iconName: 'ShieldCheck', 
        description: 'Obtain a Police Clearance Certificate for emigration',
        formFields: [
          ...commonPersonalFields,
          { name: 'passportNumber', label: 'Passport Number', type: 'text', placeholder: '8-character passport', required: true },
          { name: 'countryOfResidence', label: 'Countries of Residence (last 5 years)', type: 'textarea', placeholder: 'List all countries', required: true },
          { name: 'purpose', label: 'Purpose of PCC', type: 'select', required: true, options: ['Immigration', 'Employment', 'Education', 'Other'] },
          { name: 'policeStationJurisdiction', label: 'Police Station Jurisdiction', type: 'text', placeholder: 'Your local police station', required: true }
        ]
      },
      { 
        id: 'surrender', 
        label: 'Surrender Certificate', 
        labelHi: 'समर्पण प्रमाणपत्र', 
        iconName: 'FileX', 
        description: 'Surrender your Indian passport upon acquiring foreign citizenship',
        formFields: [
          { name: 'passportNumber', label: 'Passport Number', type: 'text', placeholder: '8-character passport', required: true },
          { name: 'newCitizenship', label: 'New Citizenship Country', type: 'text', placeholder: 'Country of new citizenship', required: true },
          { name: 'certificateOfNaturalization', label: 'Certificate of Naturalization', type: 'file', required: true },
          { name: 'surrenderReason', label: 'Reason for Surrender', type: 'textarea', placeholder: 'Explain your reason', required: true }
        ]
      },
      { 
        id: 'track-status', 
        label: 'Track Application', 
        labelHi: 'आवेदन ट्रैक', 
        iconName: 'Search', 
        description: 'Track passport application status using ARN',
        formFields: [
          { name: 'arn', label: 'Application Reference Number (ARN)', type: 'text', placeholder: '9-digit ARN', required: true }
        ]
      },
      { 
        id: 'slot-availability', 
        label: 'Check Slot Availability', 
        labelHi: 'स्लॉट उपलब्धता', 
        iconName: 'CalendarDays', 
        description: 'Check PSK/POPSK appointment slot availability online',
        formFields: [
          { name: 'state', label: 'Select State', type: 'text', placeholder: 'Your state', required: true },
          { name: 'city', label: 'Select City', type: 'text', placeholder: 'Your city', required: true },
          { name: 'pskCenter', label: 'Passport Seva Kendra', type: 'text', placeholder: 'PSK name', required: true }
        ]
      }
    ],
    eligibility: ['Indian citizen by birth / descent / registration / naturalization', 'No pending criminal proceedings (for normal passport)', 'Minors need parental consent'],
    requiredDocs: ['Proof of Address (Aadhaar, Utility bill)', 'Proof of Date of Birth (Birth certificate, Marksheet)', 'Aadhaar Card (mandatory)', 'Old Passport (for renewal)'],
    fees: '₹1,500 (36 pages); ₹2,000 (60 pages); Tatkal: +₹2,000 extra',
    processingTime: 'Normal: 30 – 45 days; Tatkal: 1 – 3 days',
    steps: [
      { title: 'Register on Passport Seva', desc: 'Create an account on the Passport Seva portal.' },
      { title: 'Fill Application Form', desc: 'Fill the online application form with personal and family details.' },
      { title: 'Pay Fees Online', desc: 'Pay the applicable fee through online payment modes.' },
      { title: 'Book Appointment', desc: 'Schedule an appointment at the nearest Passport Seva Kendra (PSK).' },
      { title: 'Visit PSK & Police Verification', desc: 'Visit the PSK for document verification and biometrics. Police verification follows.' }
    ],
    faqs: [
      { question: 'What is a Tatkal passport?', answer: 'Tatkal is an expedited service for urgent passport needs. It costs an additional ₹2,000 and is usually processed within 1-3 working days.' },
      { question: 'Can I track my passport application?', answer: 'Yes, use your Application Reference Number (ARN) on the Passport Seva portal to track status.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
      { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
      { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
      { name: 'passportType', label: 'Passport Type', type: 'select', required: true, options: ['Normal', 'Tatkal'] },
      { name: 'bookletPages', label: 'Booklet Pages', type: 'select', required: true, options: ['36 Pages', '60 Pages'] },
      { name: 'dobProof', label: 'Upload DOB Proof', type: 'file', required: true }
    ]
  },
  {
    id: 'ration',
    title: 'Ration Card',
    titleHi: 'राशन कार्ड',
    description: 'Document for subsidized food grains and fuel under PDS.',
    category: 'Welfare',
    iconName: 'ShoppingCart',
    services: [
      { 
        id: 'new-card', 
        label: 'New Ration Card', 
        labelHi: 'नया राशन कार्ड', 
        iconName: 'FilePlus', 
        description: 'Apply for a new ration card for your household',
        formFields: [
          ...commonPersonalFields,
          { name: 'familyMembers', label: 'Number of Family Members', type: 'select', required: true, options: ['1', '2', '3', '4', '5', '6', '7', '8+'] },
          { name: 'income', label: 'Annual Family Income (₹)', type: 'text', placeholder: 'e.g., 120000', required: true },
          { name: 'category', label: 'Category', type: 'select', required: true, options: ['APL (Above Poverty Line)', 'BPL (Below Poverty Line)', 'AAY (Antyodaya Anna Yojana)'] },
          { name: 'incomeCert', label: 'Upload Income Certificate', type: 'file', required: true }
        ]
      },
      { 
        id: 'add-remove-member', 
        label: 'Add / Remove Member', 
        labelHi: 'सदस्य जोड़ें/हटाएँ', 
        iconName: 'Users', 
        description: 'Add or remove family members from existing ration card',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', placeholder: 'Your RC number', required: true },
          { name: 'action', label: 'Action', type: 'select', required: true, options: ['Add Member', 'Remove Member'] },
          { name: 'memberName', label: "Member's Name", type: 'text', placeholder: 'Full name', required: true },
          { name: 'memberDOB', label: "Member's Date of Birth", type: 'date', required: true },
          { name: 'relationshipToHead', label: 'Relationship to Head', type: 'select', required: true, options: ['Spouse', 'Child', 'Parent', 'Sibling', 'Other'] },
          { name: 'supportingDoc', label: 'Supporting Document', type: 'file', required: true }
        ]
      },
      { 
        id: 'correction', 
        label: 'Correction / Update', 
        labelHi: 'सुधार / अपडेट', 
        iconName: 'Edit', 
        description: 'Correct name, address, or other details on ration card',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', placeholder: 'Your RC number', required: true },
          { name: 'fieldToCorrect', label: 'Field to Correct', type: 'select', required: true, options: ['Name', 'Address', 'Family Income', 'Member Name', 'Contact Details'] },
          { name: 'newValue', label: 'Corrected Value', type: 'text', placeholder: 'Enter correction', required: true },
          { name: 'proof', label: 'Proof Document', type: 'file', required: true }
        ]
      },
      { 
        id: 'duplicate', 
        label: 'Duplicate Card', 
        labelHi: 'डुप्लीकेट कार्ड', 
        iconName: 'Copy', 
        description: 'Apply for a duplicate if your card is lost or damaged',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', placeholder: 'Your RC number', required: true },
          { name: 'lossReason', label: 'Reason (Lost / Damaged)', type: 'select', required: true, options: ['Lost', 'Damaged', 'Stolen'] },
          { name: 'policeReport', label: 'Police Report (if stolen)', type: 'file', required: false }
        ]
      },
      { 
        id: 'surrender', 
        label: 'Surrender Card', 
        labelHi: 'कार्ड सरेंडर', 
        iconName: 'FileX', 
        description: 'Surrender your ration card if no longer eligible',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', placeholder: 'Your RC number', required: true },
          { name: 'surrenderReason', label: 'Reason for Surrender', type: 'select', required: true, options: ['Migrated', 'Income Increased', 'Death of Head', 'Other'] },
          { name: 'reasonDetails', label: 'Details', type: 'textarea', placeholder: 'Explain reason', required: false }
        ]
      },
      { 
        id: 'onorc', 
        label: 'ONORC Portability', 
        labelHi: 'ONORC पोर्टेबिलिटी', 
        iconName: 'Globe', 
        description: 'Use One Nation One Ration Card for inter-state portability',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', placeholder: 'Your RC number', required: true },
          { name: 'newState', label: 'New State of Residence', type: 'text', placeholder: 'Where are you migrating?', required: true },
          { name: 'newAddress', label: 'New Address', type: 'textarea', placeholder: 'Full address in new state', required: true }
        ]
      },
      { 
        id: 'category-change', 
        label: 'Category Change', 
        labelHi: 'श्रेणी परिवर्तन', 
        iconName: 'ArrowUpDown', 
        description: 'Apply to change ration card category (APL/BPL/AAY)',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', placeholder: 'Your RC number', required: true },
          { name: 'currentCategory', label: 'Current Category', type: 'select', required: true, options: ['APL', 'BPL', 'AAY'] },
          { name: 'newCategory', label: 'Requested Category', type: 'select', required: true, options: ['APL', 'BPL', 'AAY'] },
          { name: 'updatedIncome', label: 'Updated Annual Income (₹)', type: 'text', placeholder: 'New income', required: true },
          { name: 'incomeCert', label: 'New Income Certificate', type: 'file', required: true }
        ]
      },
      { 
        id: 'download-ecard', 
        label: 'Download e-Ration Card', 
        labelHi: 'ई-राशन कार्ड डाउनलोड', 
        iconName: 'Download', 
        description: 'Download the digital copy of your ration card online',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', placeholder: 'Your RC number', required: true },
          { name: 'headPhone', label: 'Phone Number (linked to RC)', type: 'tel', placeholder: '10-digit mobile', required: true }
        ]
      }
    ],
    eligibility: ['Any Indian household', 'Family must not already hold a ration card', 'Applicable for APL, BPL, and AAY categories'],
    requiredDocs: ['Proof of Identity of head of family (Aadhaar, Voter ID)', 'Proof of Address (Utility bill)', 'Income Certificate', 'Family member Aadhaar cards', 'Passport-size photos of all members'],
    fees: '₹5 – ₹45 (varies by state)',
    processingTime: '15 – 30 days',
    steps: [
      { title: 'Apply Online/Offline', desc: 'Apply via your state Food & Civil Supplies portal or at the Tehsil office.' },
      { title: 'Submit Family Details', desc: 'Provide details of all family members with their Aadhaar numbers.' },
      { title: 'Upload Documents', desc: 'Upload income certificate, address proof, and member photos.' },
      { title: 'Field Verification', desc: 'An official may visit your address for verification.' },
      { title: 'Receive Ration Card', desc: 'After approval, the ration card is issued (physical or e-Ration Card).' }
    ],
    faqs: [
      { question: 'What is the difference between APL and BPL?', answer: 'APL (Above Poverty Line) and BPL (Below Poverty Line) categories determine the subsidy level. BPL families get more subsidized grains.' },
      { question: 'Can I use my ration card in another state?', answer: 'Yes, under the One Nation One Ration Card (ONORC) scheme, you can use your ration card across India.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'familyMembers', label: 'Number of Family Members', type: 'select', required: true, options: ['1', '2', '3', '4', '5', '6', '7', '8+'] },
      { name: 'income', label: 'Annual Family Income (₹)', type: 'text', placeholder: 'e.g., 120000', required: true },
      { name: 'incomeCert', label: 'Upload Income Certificate', type: 'file', required: true }
    ]
  },
  {
    id: 'birth',
    title: 'Birth Certificate',
    titleHi: 'जन्म प्रमाण पत्र',
    description: 'Official record of birth issued by local municipal authorities.',
    category: 'Identity',
    iconName: 'Baby',
    services: [
      { 
        id: 'new-registration', 
        label: 'New Registration', 
        labelHi: 'नया पंजीकरण', 
        iconName: 'FilePlus', 
        description: 'Register a birth within 21 days (free of charge)',
        formFields: [
          { name: 'childName', label: "Child's Name", type: 'text', placeholder: 'Full name of child', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
          { name: 'hospitalName', label: 'Hospital / Place of Birth', type: 'text', placeholder: 'Hospital name or home address', required: true },
          { name: 'address', label: 'Permanent Address', type: 'textarea', placeholder: 'Full address', required: true },
          { name: 'hospitalSlip', label: 'Upload Hospital Discharge Slip', type: 'file', required: true }
        ]
      },
      { 
        id: 'delayed-registration', 
        label: 'Delayed Registration', 
        labelHi: 'विलंबित पंजीकरण', 
        iconName: 'Clock', 
        description: 'Register a birth after 21 days with affidavit and magistrate order',
        formFields: [
          { name: 'childName', label: "Child's Name", type: 'text', placeholder: 'Full name of child', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
          { name: 'affidavit', label: 'Upload Affidavit', type: 'file', required: true },
          { name: 'magistrateOrder', label: 'Upload Magistrate Order', type: 'file', required: true },
          { name: 'witnesses', label: 'Two Witness Details', type: 'textarea', placeholder: 'Names and contact of two witnesses', required: true }
        ]
      },
      { 
        id: 'correction', 
        label: 'Correction', 
        labelHi: 'सुधार', 
        iconName: 'Edit', 
        description: 'Correct errors in name, DOB, or parent details',
        formFields: [
          { name: 'certNumber', label: 'Birth Certificate Number', type: 'text', placeholder: 'Certificate number', required: true },
          { name: 'fieldToCorrect', label: 'Field to Correct', type: 'select', required: true, options: ['Child Name', 'DOB', "Father's Name", "Mother's Name", 'Address'] },
          { name: 'correctValue', label: 'Correct Value', type: 'text', placeholder: 'Corrected value', required: true },
          { name: 'proof', label: 'Proof Document', type: 'file', required: true }
        ]
      },
      { 
        id: 'duplicate', 
        label: 'Duplicate Certificate', 
        labelHi: 'डुप्लीकेट प्रमाणपत्र', 
        iconName: 'Copy', 
        description: 'Obtain a duplicate if the original is lost or damaged',
        formFields: [
          { name: 'certNumber', label: 'Original Birth Certificate Number', type: 'text', placeholder: 'Certificate number', required: true },
          { name: 'lossReason', label: 'Reason (Lost / Damaged)', type: 'select', required: true, options: ['Lost', 'Damaged', 'Stolen'] }
        ]
      },
      { 
        id: 'name-inclusion', 
        label: 'Name Inclusion', 
        labelHi: 'नाम शामिल करें', 
        iconName: 'UserPlus', 
        description: "Add the child's name if it was not included at the time of registration",
        formFields: [
          { name: 'certNumber', label: 'Birth Certificate Number', type: 'text', placeholder: 'Certificate number', required: true },
          { name: 'childName', label: "Child's Name (to be added)", type: 'text', placeholder: 'Full name', required: true },
          { name: 'nameChangeReason', label: 'Reason', type: 'textarea', placeholder: 'Why was name not included earlier?', required: true },
          { name: 'affidavit', label: 'Upload Affidavit', type: 'file', required: true }
        ]
      },
      { 
        id: 'non-availability', 
        label: 'Non-Availability Certificate', 
        labelHi: 'अनुपलब्धता प्रमाणपत्र', 
        iconName: 'FileQuestion', 
        description: 'Get a certificate stating birth was not registered in records',
        formFields: [
          { name: 'childName', label: "Child's Name", type: 'text', placeholder: 'Full name of child', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
          { name: 'reason', label: 'Reason for Non-Availability Certificate', type: 'textarea', placeholder: 'Why is this needed?', required: true }
        ]
      },
      { 
        id: 'search-record', 
        label: 'Search Birth Record', 
        labelHi: 'जन्म रिकॉर्ड खोजें', 
        iconName: 'Search', 
        description: 'Search for a birth record in the CRS database online',
        formFields: [
          { name: 'childName', label: "Child's Name", type: 'text', placeholder: 'Full name', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: false },
          { name: 'fatherName', label: "Father's Name", type: 'text', placeholder: 'Optional', required: false },
          { name: 'motherName', label: "Mother's Name", type: 'text', placeholder: 'Optional', required: false }
        ]
      }
    ],
    eligibility: ['Any child born in India', 'Registration within 21 days is free', 'Late registration requires additional affidavit'],
    requiredDocs: ['Hospital discharge slip / Birth report', 'Parents Aadhaar cards', 'Marriage certificate of parents', 'Proof of Address'],
    fees: '₹0 (within 21 days); ₹10 – ₹100 (late registration, varies by state)',
    processingTime: '7 – 15 days',
    steps: [
      { title: 'Report Birth', desc: 'Report the birth at the hospital or municipal corporation within 21 days.' },
      { title: 'Fill Registration Form', desc: 'Fill the birth registration form online or at the registrar office.' },
      { title: 'Submit Documents', desc: 'Submit the hospital discharge slip and parent identity documents.' },
      { title: 'Collect Certificate', desc: 'Collect the birth certificate from the registrar after processing.' }
    ],
    faqs: [
      { question: 'What if birth was not registered?', answer: 'Late registration (after 21 days) requires an affidavit, a magistrate order (after 1 year), and additional documents.' },
      { question: 'Can I get a birth certificate online?', answer: 'Many states now offer online birth certificate registration and download through their e-district portals.' }
    ],
    formFields: [
      { name: 'childName', label: "Child's Name", type: 'text', placeholder: 'Full name of child', required: true },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
      { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
      { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
      { name: 'hospitalName', label: 'Hospital / Place of Birth', type: 'text', placeholder: 'Hospital name or home address', required: true },
      { name: 'address', label: 'Permanent Address', type: 'textarea', placeholder: 'Full address', required: true },
      { name: 'hospitalSlip', label: 'Upload Hospital Discharge Slip', type: 'file', required: true }
    ]
  },
  {
    id: 'income',
    title: 'Income Certificate',
    titleHi: 'आय प्रमाण पत्र',
    description: 'Certificate of annual income issued by the revenue department.',
    category: 'Finance',
    iconName: 'IndianRupee',
    services: [
      { 
        id: 'new-application', 
        label: 'New Application', 
        labelHi: 'नया आवेदन', 
        iconName: 'FilePlus', 
        description: 'Apply for a new income certificate from the revenue department',
        formFields: [
          ...commonPersonalFields,
          { name: 'occupation', label: 'Occupation', type: 'select', required: true, options: ['Salaried', 'Self-Employed', 'Business', 'Agriculture', 'Student', 'Unemployed'] },
          { name: 'annualIncome', label: 'Annual Income (₹)', type: 'text', placeholder: 'e.g., 250000', required: true },
          { name: 'salarySlip', label: 'Upload Salary Slip / Declaration', type: 'file', required: true }
        ]
      },
      { 
        id: 'renewal', 
        label: 'Renewal', 
        labelHi: 'नवीनीकरण', 
        iconName: 'RefreshCw', 
        description: 'Renew your expired income certificate (typically valid for 1 year)',
        formFields: [
          { name: 'previousCertNumber', label: 'Previous Certificate Number', type: 'text', placeholder: 'Old certificate number', required: true },
          { name: 'expiryDate', label: 'Expiry Date', type: 'date', required: true },
          { name: 'annualIncome', label: 'Updated Annual Income (₹)', type: 'text', placeholder: 'Current income', required: true },
          { name: 'recentSalarySlip', label: 'Recent Salary Slip / Declaration', type: 'file', required: true }
        ]
      },
      { 
        id: 'correction', 
        label: 'Correction', 
        labelHi: 'सुधार', 
        iconName: 'Edit', 
        description: 'Correct errors in your existing income certificate',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', placeholder: 'Cert number to correct', required: true },
          { name: 'errorField', label: 'Error in', type: 'select', required: true, options: ['Name', 'Income Amount', 'Occupation', 'Address', 'Other'] },
          { name: 'correction', label: 'Correction', type: 'text', placeholder: 'Provide correct value', required: true },
          { name: 'proof', label: 'Supporting Document', type: 'file', required: true }
        ]
      },
      { 
        id: 'verify', 
        label: 'Verify Certificate', 
        labelHi: 'प्रमाणपत्र सत्यापन', 
        iconName: 'ShieldCheck', 
        description: 'Verify the authenticity of an income certificate online',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', placeholder: 'Certificate to verify', required: true },
          { name: 'holderName', label: 'Certificate Holder Name', type: 'text', placeholder: 'Full name', required: true }
        ]
      },
      { 
        id: 'download-cert', 
        label: 'Download Certificate', 
        labelHi: 'प्रमाणपत्र डाउनलोड', 
        iconName: 'Download', 
        description: 'Download digitally signed income certificate from e-district portal',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', placeholder: 'Certificate number', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true }
        ]
      }
    ],
    eligibility: ['Any Indian resident', 'Required for scholarships, fee waivers, subsidies', 'Issued by Tehsildar / SDM office'],
    requiredDocs: ['Proof of Identity (Aadhaar)', 'Salary slip or employer certificate', 'Self-declaration of income', 'Ration Card (if available)', 'Proof of Address'],
    fees: '₹10 – ₹50 (varies by state)',
    processingTime: '7 – 15 days',
    steps: [
      { title: 'Apply Online', desc: 'Apply through your state e-district portal with login credentials.' },
      { title: 'Fill Income Details', desc: 'Declare your income from all sources with supporting documents.' },
      { title: 'Upload Documents', desc: 'Upload salary slips, bank statements, or self-declaration affidavit.' },
      { title: 'Pay Fees', desc: 'Pay the nominal processing fee online.' },
      { title: 'Download Certificate', desc: 'Once verified, download the digitally signed certificate.' }
    ],
    faqs: [
      { question: 'How long is an income certificate valid?', answer: 'Typically valid for 1 year (varies by state). You need to reapply annually.' },
      { question: 'Can self-employed people get it?', answer: 'Yes, self-employed individuals can get it via self-declaration affidavit.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'occupation', label: 'Occupation', type: 'select', required: true, options: ['Salaried', 'Self-Employed', 'Business', 'Agriculture', 'Student', 'Unemployed'] },
      { name: 'annualIncome', label: 'Annual Income (₹)', type: 'text', placeholder: 'e.g., 250000', required: true },
      { name: 'salarySlip', label: 'Upload Salary Slip / Declaration', type: 'file', required: true }
    ]
  },
  {
    id: 'caste',
    title: 'Caste Certificate',
    titleHi: 'जाति प्रमाण पत्र',
    description: 'Certificate verifying caste for reservation and welfare benefits.',
    category: 'Welfare',
    iconName: 'ScrollText',
    services: [
      { 
        id: 'new-application', 
        label: 'New Application', 
        labelHi: 'नया आवेदन', 
        iconName: 'FilePlus', 
        description: 'Apply for a new caste certificate from SDM/Tehsildar office',
        formFields: [
          ...commonPersonalFields,
          { name: 'caste', label: 'Caste', type: 'text', placeholder: 'Your caste', required: true },
          { name: 'subCaste', label: 'Sub-Caste', type: 'text', placeholder: 'If applicable', required: false },
          { name: 'category', label: 'Category', type: 'select', required: true, options: ['SC', 'ST', 'OBC', 'EWS'] },
          { name: 'familyCert', label: "Upload Family Member's Caste Certificate", type: 'file', required: true },
          { name: 'affidavit', label: 'Upload Self-Declaration Affidavit', type: 'file', required: true }
        ]
      },
      { 
        id: 'renewal', 
        label: 'Renewal', 
        labelHi: 'नवीनीकरण', 
        iconName: 'RefreshCw', 
        description: 'Renew or reissue your caste certificate if required',
        formFields: [
          { name: 'certNumber', label: 'Current Certificate Number', type: 'text', placeholder: 'Cert number', required: true },
          { name: 'issuedDate', label: 'Issue Date', type: 'date', required: true },
          { name: 'renewalReason', label: 'Reason for Renewal', type: 'select', required: true, options: ['Expired', 'For New Admission', 'For Job Application', 'Other'] },
          { name: 'oldCertCopy', label: 'Copy of Old Certificate', type: 'file', required: true }
        ]
      },
      { 
        id: 'correction', 
        label: 'Correction', 
        labelHi: 'सुधार', 
        iconName: 'Edit', 
        description: 'Correct errors in your existing caste certificate',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', placeholder: 'Cert number to correct', required: true },
          { name: 'errorField', label: 'Field with Error', type: 'select', required: true, options: ['Name', 'Caste', 'Category', 'Address', 'Father Name', 'Other'] },
          { name: 'correctValue', label: 'Correct Value', type: 'text', placeholder: 'Provide correct value', required: true },
          { name: 'proof', label: 'Proof Document', type: 'file', required: true }
        ]
      },
      { 
        id: 'verify', 
        label: 'Verify Certificate', 
        labelHi: 'प्रमाणपत्र सत्यापन', 
        iconName: 'ShieldCheck', 
        description: 'Verify the authenticity of a caste certificate online',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', placeholder: 'Cert to verify', required: true },
          { name: 'holderName', label: 'Certificate Holder Name', type: 'text', placeholder: 'Full name', required: true }
        ]
      },
      { 
        id: 'validity-extension', 
        label: 'Validity Extension', 
        labelHi: 'वैधता विस्तार', 
        iconName: 'CalendarClock', 
        description: 'Extend validity of an expired caste certificate via e-district',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', placeholder: 'Expired cert number', required: true },
          { name: 'expiryDate', label: 'Expiry Date', type: 'date', required: true },
          { name: 'extensionPeriod', label: 'Extension Period', type: 'select', required: true, options: ['1 Year', '2 Years', '5 Years'] },
          { name: 'reason', label: 'Reason for Extension', type: 'textarea', placeholder: 'Why do you need extension?', required: false }
        ]
      }
    ],
    eligibility: ['Members of SC, ST, or OBC communities', 'Required for educational and employment reservations', 'Issued by SDM / Tehsildar office'],
    requiredDocs: ['Proof of Identity (Aadhaar, Voter ID)', 'Proof of Address', "Father's / Family member's caste certificate", 'School leaving certificate', 'Self-declaration affidavit'],
    fees: '₹10 – ₹50 (varies by state)',
    processingTime: '15 – 30 days',
    steps: [
      { title: 'Apply Online', desc: 'Apply through your state e-district portal.' },
      { title: 'Fill Caste Details', desc: 'Provide your caste details with family references.' },
      { title: 'Upload Documents', desc: "Upload family member's caste certificate and identity proof." },
      { title: 'Field Verification', desc: 'A revenue official may conduct field verification.' },
      { title: 'Download Certificate', desc: 'After approval, download the digitally signed certificate.' }
    ],
    faqs: [
      { question: 'Is a caste certificate valid across states?', answer: 'Generally, a caste certificate is valid in the state where it was issued. For central government services, the home-state certificate is accepted.' },
      { question: 'How long is it valid?', answer: 'Caste certificates are generally valid permanently, but some institutions may ask for recent ones.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'caste', label: 'Caste', type: 'text', placeholder: 'Your caste', required: true },
      { name: 'subCaste', label: 'Sub-Caste', type: 'text', placeholder: 'If applicable', required: false },
      { name: 'category', label: 'Category', type: 'select', required: true, options: ['SC', 'ST', 'OBC', 'EWS'] },
      { name: 'familyCert', label: "Upload Family Member's Caste Certificate", type: 'file', required: true }
    ]
  },
  {
    id: 'rc',
    title: 'Vehicle Registration (RC)',
    titleHi: 'वाहन पंजीकरण (RC)',
    description: 'Official document proving vehicle registration with the RTO.',
    category: 'Transport',
    iconName: 'FileText',
    services: [
      { 
        id: 'new-registration', 
        label: 'New Registration', 
        labelHi: 'नया पंजीकरण', 
        iconName: 'FilePlus', 
        description: 'Register a newly purchased vehicle at the RTO',
        formFields: [
          ...commonPersonalFields,
          { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: ['Two-Wheeler', 'Car', 'Commercial Vehicle', 'Three-Wheeler', 'Tractor', 'Bus'] },
          { name: 'vehicleMake', label: 'Vehicle Make & Model', type: 'text', placeholder: 'e.g., Maruti Swift', required: true },
          { name: 'vehicleYear', label: 'Manufacturing Year', type: 'text', placeholder: 'e.g., 2024', required: true },
          { name: 'chassisNo', label: 'Chassis Number', type: 'text', placeholder: 'From vehicle invoice', required: true },
          { name: 'engineNo', label: 'Engine Number', type: 'text', required: true },
          { name: 'invoice', label: 'Upload Sale Invoice', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true },
          { name: 'puc', label: 'Upload Pollution Certificate (PUC)', type: 'file', required: true }
        ]
      },
      { 
        id: 'transfer-ownership', 
        label: 'Transfer Ownership', 
        labelHi: 'स्वामित्व हस्तांतरण', 
        iconName: 'ArrowRightLeft', 
        description: 'Transfer vehicle ownership to a new buyer (Form 29/30)',
        formFields: [
          { name: 'registrationNumber', label: 'Vehicle Registration Number', type: 'text', placeholder: 'Current RC number', required: true },
          { name: 'oldOwnerName', label: "Old Owner's Name", type: 'text', required: true },
          { name: 'newOwnerName', label: "New Owner's Name", type: 'text', required: true },
          { name: 'newOwnerAddress', label: "New Owner's Address", type: 'textarea', required: true },
          { name: 'transferReason', label: 'Transfer Reason', type: 'select', required: true, options: ['Sale', 'Inheritance', 'Gift', 'Lease', 'Other'] },
          { name: 'noc', label: 'Upload NOC from Old Owner', type: 'file', required: true },
          { name: 'agreement', label: 'Upload Sale Agreement', type: 'file', required: true },
          { name: 'odometerReading', label: 'Odometer Reading', type: 'text', placeholder: 'Current KM', required: false }
        ]
      },
      { 
        id: 'address-change', 
        label: 'Change of Address', 
        labelHi: 'पता परिवर्तन', 
        iconName: 'MapPin', 
        description: 'Update your address on the RC book',
        formFields: [
          { name: 'registrationNumber', label: 'Vehicle Registration Number', type: 'text', placeholder: 'RC number', required: true },
          { name: 'newAddress', label: 'New Address', type: 'textarea', placeholder: 'Full new address', required: true },
          { name: 'newState', label: 'New State', type: 'text', placeholder: 'State', required: true },
          { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true }
        ]
      },
      { 
        id: 'hypothecation', 
        label: 'Hypothecation', 
        labelHi: 'हाइपोथिकेशन', 
        iconName: 'Building', 
        description: 'Add, continue, or terminate hypothecation (loan) on RC',
        formFields: [
          { name: 'registrationNumber', label: 'Vehicle Registration Number', type: 'text', placeholder: 'RC number', required: true },
          { name: 'action', label: 'Action', type: 'select', required: true, options: ['Add Hypothecation', 'Continue Hypothecation', 'Terminate Hypothecation'] },
          { name: 'bankName', label: 'Bank Name', type: 'text', placeholder: 'Finance bank name', required: true },
          { name: 'loanDetails', label: 'Loan Details', type: 'textarea', placeholder: 'Loan agreement details', required: false }
        ]
      },
      { 
        id: 'duplicate-rc', 
        label: 'Duplicate RC', 
        labelHi: 'डुप्लीकेट RC', 
        iconName: 'Copy', 
        description: 'Apply for a duplicate RC if lost or damaged',
        formFields: [
          { name: 'registrationNumber', label: 'Vehicle Registration Number', type: 'text', placeholder: 'RC number', required: true },
          { name: 'lossReason', label: 'Reason (Lost / Damaged)', type: 'select', required: true, options: ['Lost', 'Damaged', 'Stolen'] },
          { name: 'policeReport', label: 'Police Report (if stolen)', type: 'file', required: false }
        ]
      },
      { 
        id: 'noc', 
        label: 'Issue NOC', 
        labelHi: 'NOC जारी', 
        iconName: 'FileCheck', 
        description: 'Get a No Objection Certificate for inter-state transfer',
        formFields: [
          { name: 'registrationNumber', label: 'Vehicle Registration Number', type: 'text', placeholder: 'RC number', required: true },
          { name: 'newState', label: 'New State (for transfer)', type: 'text', placeholder: 'Destination state', required: true },
          { name: 'reason', label: 'Reason for NOC', type: 'select', required: true, options: ['Owner Relocation', 'Sale to Another State', 'Export', 'Other'] }
        ]
      },
      { 
        id: 'renewal', 
        label: 'RC Renewal', 
        labelHi: 'RC नवीनीकरण', 
        iconName: 'RefreshCw', 
        description: 'Renew vehicle registration after 15-year validity',
        formFields: [
          { name: 'registrationNumber', label: 'Vehicle Registration Number', type: 'text', placeholder: 'RC number', required: true },
          { name: 'currentValidityEnd', label: 'Current Validity End Date', type: 'date', required: true },
          { name: 'renewalFor', label: 'Renew For', type: 'select', required: true, options: ['5 Years', '10 Years', '15 Years'] },
          { name: 'fitnessCert', label: 'Fitness Certificate (for 15+ year vehicles)', type: 'file', required: false }
        ]
      },
      { 
        id: 'fitness-cert', 
        label: 'Fitness Certificate', 
        labelHi: 'फिटनेस प्रमाणपत्र', 
        iconName: 'HeartPulse', 
        description: 'Apply for fitness certificate for commercial or 15yr+ vehicles',
        formFields: [
          { name: 'registrationNumber', label: 'Vehicle Registration Number', type: 'text', placeholder: 'RC number', required: true },
          { name: 'vehicleAge', label: 'Vehicle Age (Years)', type: 'text', placeholder: 'How old is vehicle?', required: true },
          { name: 'certificationCentre', label: 'Authorized Certification Centre', type: 'text', placeholder: 'Where tested?', required: true },
          { name: 'testReport', label: 'Upload Test Report', type: 'file', required: true }
        ]
      },
      { 
        id: 'rc-extract', 
        label: 'RC Extract', 
        labelHi: 'RC उद्धरण', 
        iconName: 'FileOutput', 
        description: 'Get a certified extract of your RC details from Vahan portal',
        formFields: [
          { name: 'registrationNumber', label: 'Vehicle Registration Number', type: 'text', placeholder: 'RC number', required: true },
          { name: 'purpose', label: 'Purpose of Extract', type: 'select', required: true, options: ['Loan', 'Insurance', 'Legal', 'Other'] },
          { name: 'quantity', label: 'Number of Certified Copies', type: 'select', required: true, options: ['1', '2', '3', '5'] }
        ]
      },
      { 
        id: 'fancy-number', 
        label: 'Fancy Number Booking', 
        labelHi: 'फैंसी नंबर बुकिंग', 
        iconName: 'Hash', 
        description: 'Book a choice/fancy registration number for your vehicle',
        formFields: [
          { name: 'registrationNumber', label: 'Current Registration Number', type: 'text', placeholder: 'Current RC number', required: true },
          { name: 'desiredNumber', label: 'Desired Fancy Number', type: 'text', placeholder: 'e.g., DL-01-AB-1111', required: true },
          { name: 'numberType', label: 'Number Type', type: 'select', required: true, options: ['Personalised', 'Vanity', 'Premium'] },
          { name: 'additionalFee', label: 'I agree to pay the fancy number premium', type: 'text', placeholder: 'Type YES', required: true }
        ]
      }
    ],
    eligibility: ['Owner of a motor vehicle', 'Vehicle must be registered within 7 days of purchase', 'Valid for 15 years (can be renewed)'],
    requiredDocs: ['Sale invoice of the vehicle', 'Insurance certificate', 'PUC certificate', 'Proof of Address', 'ID Proof (Aadhaar, PAN)', 'Form 20 (signed by dealer)'],
    fees: '₹200 – ₹5,000+ (varies by vehicle type and state)',
    processingTime: '7 – 15 days',
    steps: [
      { title: 'Get Insurance & PUC', desc: 'Obtain vehicle insurance and Pollution Under Control certificate.' },
      { title: 'Apply at RTO', desc: 'Submit Form 20 at the RTO with all required documents.' },
      { title: 'Pay Road Tax & Fees', desc: 'Pay the applicable road tax and registration fees.' },
      { title: 'Vehicle Inspection', desc: 'The RTO may inspect the vehicle physically.' },
      { title: 'Receive RC', desc: 'The RC smart card will be dispatched to your address.' }
    ],
    faqs: [
      { question: 'What is the validity of RC?', answer: 'RC is valid for 15 years from the date of registration for non-transport vehicles. It can be renewed for another 5 years.' },
      { question: 'How to transfer RC to a new owner?', answer: 'Both buyer and seller must apply for transfer at the RTO with Form 29 and Form 30, along with NOC if from another state.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: ['Two-Wheeler', 'Car', 'Commercial Vehicle', 'Three-Wheeler'] },
      { name: 'vehicleMake', label: 'Vehicle Make & Model', type: 'text', placeholder: 'e.g., Maruti Swift', required: true },
      { name: 'chassisNo', label: 'Chassis Number', type: 'text', placeholder: 'From vehicle invoice', required: true },
      { name: 'invoice', label: 'Upload Sale Invoice', type: 'file', required: true },
      { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true }
    ]
  },
  {
    id: 'upi',
    title: 'UPI / Digital Payments',
    titleHi: 'UPI / डिजिटल भुगतान',
    description: 'Unified Payments Interface for instant, government-linked digital transactions.',
    category: 'Finance',
    iconName: 'Smartphone',
    services: [
      { 
        id: 'register-link', 
        label: 'Register & Link Bank', 
        labelHi: 'पंजीकरण और बैंक लिंक', 
        iconName: 'Link', 
        description: 'Register on a UPI app and link your bank account',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As per bank account', required: true },
          { name: 'phone', label: 'Mobile Number (linked to bank)', type: 'tel', placeholder: '10-digit mobile number', required: true },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
          { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] },
          { name: 'accountType', label: 'Account Type', type: 'select', required: true, options: ['Savings', 'Current'] },
          { name: 'debitCardLastFour', label: 'Last 4 digits of Debit Card', type: 'text', placeholder: 'XXXX', required: true }
        ]
      },
      { 
        id: 'create-vpa', 
        label: 'Create / Change VPA', 
        labelHi: 'VPA बनाएँ / बदलें', 
        iconName: 'AtSign', 
        description: 'Create or customize your UPI ID (Virtual Payment Address)',
        formFields: [
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'currentVPA', label: 'Current VPA (if changing)', type: 'text', placeholder: 'user@upiapp', required: false },
          { name: 'newVPA', label: 'Desired VPA', type: 'text', placeholder: 'yourname@upiapp', required: true },
          { name: 'upiApp', label: 'UPI App', type: 'select', required: true, options: ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'WhatsApp Pay', 'Bank App'] }
        ]
      },
      { 
        id: 'check-limit', 
        label: 'Check Transaction Limit', 
        labelHi: 'लेन-देन सीमा', 
        iconName: 'BarChart3', 
        description: 'Check your per-transaction and daily UPI limits',
        formFields: [
          { name: 'vpa', label: 'Your UPI ID (VPA)', type: 'text', placeholder: 'user@upiapp', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true }
        ]
      },
      { 
        id: 'raise-complaint', 
        label: 'Raise Complaint', 
        labelHi: 'शिकायत दर्ज', 
        iconName: 'AlertCircle', 
        description: 'Raise a dispute for failed or incorrect UPI transactions',
        formFields: [
          { name: 'vpa', label: 'Your UPI ID', type: 'text', placeholder: 'user@upiapp', required: true },
          { name: 'transactionId', label: 'Transaction ID / Reference', type: 'text', placeholder: '18-digit reference', required: true },
          { name: 'transactionDate', label: 'Transaction Date', type: 'date', required: true },
          { name: 'amount', label: 'Amount (₹)', type: 'text', placeholder: 'Transaction amount', required: true },
          { name: 'recipientVPA', label: "Recipient's VPA", type: 'text', placeholder: 'recipient@upiapp', required: true },
          { name: 'issueType', label: 'Issue Type', type: 'select', required: true, options: ['Amount Debited - Not Credited', 'Wrong Amount Sent', 'Transaction Failed - Amount Debited', 'Duplicate Debit', 'Unauthorized Transaction', 'Other'] },
          { name: 'complaintDetails', label: 'Complaint Details', type: 'textarea', placeholder: 'Describe the issue', required: true }
        ]
      },
      { 
        id: 'autopay', 
        label: 'Auto-Pay / Mandate Setup', 
        labelHi: 'ऑटो-पे सेटअप', 
        iconName: 'CalendarClock', 
        description: 'Set up recurring UPI payments for bills and subscriptions',
        formFields: [
          { name: 'vpa', label: 'Your UPI ID', type: 'text', placeholder: 'user@upiapp', required: true },
          { name: 'payeeVPA', label: "Biller's UPI ID", type: 'text', placeholder: 'biller@upiapp', required: true },
          { name: 'amount', label: 'Amount (₹)', type: 'text', placeholder: 'Monthly amount', required: true },
          { name: 'frequency', label: 'Frequency', type: 'select', required: true, options: ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'] },
          { name: 'startDate', label: 'Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'End Date', type: 'date', required: true },
          { name: 'purpose', label: 'Purpose', type: 'text', placeholder: 'e.g., Electricity Bill', required: true }
        ]
      },
      { 
        id: 'upi-lite', 
        label: 'Enable UPI Lite', 
        labelHi: 'UPI Lite सक्रिय करें', 
        iconName: 'Wallet', 
        description: 'Enable PIN-less small payments up to ₹1,000 via UPI Lite',
        formFields: [
          { name: 'vpa', label: 'Your UPI ID', type: 'text', placeholder: 'user@upiapp', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'agreeTerms', label: 'I agree to UPI Lite terms & conditions', type: 'text', placeholder: 'Type YES', required: true }
        ]
      },
      { 
        id: 'check-balance', 
        label: 'Check Balance', 
        labelHi: 'बैलेंस जाँचें', 
        iconName: 'Eye', 
        description: 'Check your bank account balance via UPI without visiting bank',
        formFields: [
          { name: 'vpa', label: 'Your UPI ID', type: 'text', placeholder: 'user@upiapp', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true }
        ]
      },
      { 
        id: 'deregister', 
        label: 'Deregister UPI', 
        labelHi: 'UPI डीरजिस्टर', 
        iconName: 'UserX', 
        description: 'Deregister your UPI ID from a specific app or device',
        formFields: [
          { name: 'vpa', label: 'Your UPI ID', type: 'text', placeholder: 'user@upiapp', required: true },
          { name: 'upiApp', label: 'UPI App', type: 'select', required: true, options: ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'WhatsApp Pay', 'Bank App', 'All Apps'] },
          { name: 'deregisterReason', label: 'Reason for Deregistration', type: 'select', required: true, options: ['Changing Device', 'Changing App', 'Security Concern', 'Account Closure', 'Other'] },
          { name: 'confirmation', label: 'I want to deregister this UPI ID', type: 'text', placeholder: 'Type YES', required: true }
        ]
      }
    ],
    eligibility: ['Any Indian bank account holder', 'Must have a mobile number linked to bank', 'Supported on Android and iOS devices'],
    requiredDocs: ['Bank account linked to mobile number', 'Debit card (for initial setup)', 'Aadhaar (for Aadhaar-based authentication)'],
    fees: 'Free (no transaction charges for users)',
    processingTime: 'Instant setup',
    steps: [
      { title: 'Download UPI App', desc: 'Download BHIM, Google Pay, PhonePe, or your bank UPI app.' },
      { title: 'Register with Mobile', desc: 'Register using the mobile number linked to your bank account.' },
      { title: 'Link Bank Account', desc: 'Select your bank and link your account to the UPI app.' },
      { title: 'Set UPI PIN', desc: 'Use your debit card details to set a 4 or 6-digit UPI PIN.' },
      { title: 'Start Transacting', desc: 'Send/receive money, pay bills, and make government fee payments.' }
    ],
    faqs: [
      { question: 'Is UPI safe?', answer: 'Yes, UPI is highly secure with two-factor authentication (device binding + UPI PIN). Never share your UPI PIN with anyone.' },
      { question: 'What is the UPI transaction limit?', answer: 'The standard limit is ₹1,00,000 per transaction. Some banks may have lower limits.' }
    ],
    formFields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As per bank account', required: true },
      { name: 'phone', label: 'Mobile Number (linked to bank)', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
      { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] },
      { name: 'accountType', label: 'Account Type', type: 'select', required: true, options: ['Savings', 'Current'] }
    ]
  }
];
