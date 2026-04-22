export type DocumentCategory = 'Identity' | 'Transport' | 'Welfare' | 'Finance';

export interface DocumentInfo {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  category: DocumentCategory;
  iconName: string;
  applyUrl?: string;
  statusUrl?: string;
}

export const documentsData: DocumentInfo[] = [
  {
    id: 'aadhaar',
    title: 'Aadhaar Card',
    titleHi: 'आधार कार्ड',
    description: 'Unique identity number issued to Indian residents.',
    category: 'Identity',
    iconName: 'Fingerprint'
  },
  {
    id: 'pan',
    title: 'PAN Card',
    titleHi: 'पैन कार्ड',
    description: 'Permanent Account Number for tax and financial transactions.',
    category: 'Finance',
    iconName: 'CreditCard'
  },
  {
    id: 'dl',
    title: 'Driving License',
    titleHi: 'ड्राइविंग लाइसेंस',
    description: 'Official document permitting individuals to operate motorized vehicles.',
    category: 'Transport',
    iconName: 'Car'
  },
  {
    id: 'voter',
    title: 'Voter ID',
    titleHi: 'मतदाता पहचान पत्र',
    description: 'Identity document issued by the Election Commission of India.',
    category: 'Identity',
    iconName: 'BadgeCheck'
  },
  {
    id: 'passport',
    title: 'Passport',
    titleHi: 'पासपोर्ट',
    description: 'Travel document issued for international travel.',
    category: 'Identity',
    iconName: 'Plane'
  },
  {
    id: 'ration',
    title: 'Ration Card',
    titleHi: 'राशन कार्ड',
    description: 'Document for subsidized food grains and fuel.',
    category: 'Welfare',
    iconName: 'ShoppingCart'
  },
  {
    id: 'birth',
    title: 'Birth Certificate',
    titleHi: 'जन्म प्रमाण पत्र',
    description: 'Official record of a person\'s birth.',
    category: 'Identity',
    iconName: 'Baby'
  },
  {
    id: 'income',
    title: 'Income Certificate',
    titleHi: 'आय प्रमाण पत्र',
    description: 'Certificate of annual income issued by the revenue department.',
    category: 'Finance',
    iconName: 'IndianRupee'
  },
  {
    id: 'caste',
    title: 'Caste Certificate',
    titleHi: 'जाति प्रमाण पत्र',
    description: 'Certificate verifying caste for reservation and welfare benefits.',
    category: 'Welfare',
    iconName: 'ScrollText'
  },
  {
    id: 'rc',
    title: 'Vehicle Registration (RC)',
    titleHi: 'वाहन पंजीकरण (RC)',
    description: 'Official document proving vehicle registration.',
    category: 'Transport',
    iconName: 'FileText'
  },
  {
    id: 'upi',
    title: 'UPI / Digital Payments',
    titleHi: 'UPI / डिजिटल भुगतान',
    description: 'Unified Payments Interface for government-linked digital transactions.',
    category: 'Finance',
    iconName: 'Smartphone'
  }
];
