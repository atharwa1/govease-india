export type DocumentCategory = 'Identity' | 'Transport' | 'Welfare' | 'Finance';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'file' | 'textarea';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface DocumentInfo {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  category: DocumentCategory;
  iconName: string;
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
