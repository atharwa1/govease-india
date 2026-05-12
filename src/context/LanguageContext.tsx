import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'HI';

interface Translations {
  [key: string]: { EN: string; HI: string };
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Navbar
  'nav.home': { EN: 'Home', HI: 'होम' },
  'nav.documents': { EN: 'Documents', HI: 'दस्तावेज़' },
  'nav.help': { EN: 'Help & FAQ', HI: 'सहायता' },
  'nav.feedback': { EN: 'Feedback', HI: 'प्रतिक्रिया' },

  // Home page - Hero
  'home.badge': { EN: 'One Portal, All Services', HI: 'एक पोर्टल, सभी सेवाएँ' },
  'home.title': { EN: 'Government Services,', HI: 'सरकारी सेवाएँ,' },
  'home.titleHighlight': { EN: 'Simplified', HI: 'सरल' },
  'home.subtitle': { EN: 'Apply, track, and download essential Indian government documents in one unified portal. No jargon, no unnecessary redirects.', HI: 'एक ही पोर्टल पर ज़रूरी सरकारी दस्तावेज़ आवेदन करें, ट्रैक करें और डाउनलोड करें। कोई जटिलता नहीं, कोई अनावश्यक रीडायरेक्ट नहीं।' },
  'home.searchPlaceholder': { EN: 'E.g., Apply for PAN Card, Check DL Status...', HI: 'उदा., पैन कार्ड के लिए आवेदन, DL स्थिति जाँचें...' },

  // Home page - Stats
  'home.services': { EN: 'Services', HI: 'सेवाएँ' },
  'home.freeToUse': { EN: 'Free to Use', HI: 'निःशुल्क' },
  'home.ads': { EN: 'Ads', HI: 'विज्ञापन' },

  // Home page - Quick Actions
  'home.whatToDo': { EN: 'What do you want to do?', HI: 'आप क्या करना चाहते हैं?' },
  'home.applyNew': { EN: 'Apply for New', HI: 'नया आवेदन करें' },
  'home.applyNewDesc': { EN: 'Get a new document issued', HI: 'नया दस्तावेज़ प्राप्त करें' },
  'home.checkStatus': { EN: 'Check Status', HI: 'स्थिति जाँचें' },
  'home.checkStatusDesc': { EN: 'Track your application', HI: 'अपना आवेदन ट्रैक करें' },
  'home.download': { EN: 'Download', HI: 'डाउनलोड' },
  'home.downloadDesc': { EN: 'Get digital copy', HI: 'डिजिटल कॉपी प्राप्त करें' },

  // Home page - Popular
  'home.mostRequested': { EN: 'Most Requested Services', HI: 'सबसे ज़्यादा अनुरोधित सेवाएँ' },
  'home.viewAll': { EN: 'View All Services →', HI: 'सभी सेवाएँ देखें →' },

  // Documents Directory
  'docs.title': { EN: 'All Government Services', HI: 'सभी सरकारी सेवाएँ' },
  'docs.subtitle': { EN: 'Browse and find the document service you need.', HI: 'अपनी ज़रूरत की दस्तावेज़ सेवा खोजें।' },
  'docs.searchPlaceholder': { EN: 'Search for documents...', HI: 'दस्तावेज़ खोजें...' },
  'docs.noResults': { EN: 'No documents found.', HI: 'कोई दस्तावेज़ नहीं मिला।' },
  'docs.noResultsHint': { EN: 'Try adjusting your search or category filter.', HI: 'खोज या श्रेणी फ़िल्टर बदलकर देखें।' },

  // Document Card
  'card.applyGuide': { EN: 'Apply / Guide', HI: 'आवेदन / गाइड' },
  'card.status': { EN: 'Status', HI: 'स्थिति' },

  // Status Tracker
  'status.title': { EN: 'Track Application Status', HI: 'आवेदन स्थिति ट्रैक करें' },
  'status.subtitle': { EN: 'Enter your application details to check the current status.', HI: 'वर्तमान स्थिति जाँचने के लिए अपना आवेदन विवरण दर्ज करें।' },
  'status.selectDoc': { EN: 'Select Document Type', HI: 'दस्तावेज़ प्रकार चुनें' },
  'status.selectPlaceholder': { EN: '-- Select a Document --', HI: '-- दस्तावेज़ चुनें --' },
  'status.appNumber': { EN: 'Application / Reference Number', HI: 'आवेदन / संदर्भ संख्या' },
  'status.appNumberPlaceholder': { EN: 'e.g., APP123456789', HI: 'उदा., APP123456789' },
  'status.trackBtn': { EN: 'Track Status', HI: 'स्थिति ट्रैक करें' },
  'status.checking': { EN: 'Checking...', HI: 'जाँच रहा है...' },
  'status.approved': { EN: 'Application Approved', HI: 'आवेदन स्वीकृत' },
  'status.approvedDesc': { EN: 'has been approved. The document will be dispatched shortly.', HI: 'स्वीकृत हो गया है। दस्तावेज़ जल्द भेजा जाएगा।' },
  'status.notFound': { EN: 'Application Pending/Not Found', HI: 'आवेदन लंबित/नहीं मिला' },
  'status.notFoundDesc': { EN: "We couldn't find an approved application with this number. Please check the number or try again later.", HI: 'इस नंबर से कोई स्वीकृत आवेदन नहीं मिला। कृपया नंबर जाँचें या बाद में पुनः प्रयास करें।' },

  // Footer
  'footer.description': { EN: 'Your one-stop portal for accessing, understanding, and managing essential Indian government documents without the confusion.', HI: 'ज़रूरी सरकारी दस्तावेज़ों को बिना किसी भ्रम के समझने और प्रबंधित करने का आपका एक-स्टॉप पोर्टल।' },
  'footer.quickLinks': { EN: 'Quick Links', HI: 'त्वरित लिंक' },
  'footer.allServices': { EN: 'All Services', HI: 'सभी सेवाएँ' },
  'footer.trackStatus': { EN: 'Track Status', HI: 'स्थिति ट्रैक करें' },
  'footer.legal': { EN: 'Legal', HI: 'कानूनी' },
  'footer.privacy': { EN: 'Privacy Policy', HI: 'गोपनीयता नीति' },
  'footer.terms': { EN: 'Terms of Service', HI: 'सेवा की शर्तें' },
  'footer.disclaimer': { EN: 'Disclaimer', HI: 'अस्वीकरण' },
  'footer.copyright': { EN: 'GoEase India. For demonstration purposes only. Not an official government website.', HI: 'GoEase India. केवल प्रदर्शन उद्देश्य के लिए। यह एक आधिकारिक सरकारी वेबसाइट नहीं है।' },

  // Help & FAQ
  'help.title': { EN: 'Help & Frequently Asked Questions', HI: 'सहायता और अक्सर पूछे जाने वाले प्रश्न' },
  'help.subtitle': { EN: 'Find answers to common questions about using GoEase India.', HI: 'GoEase India के उपयोग से जुड़े सामान्य प्रश्नों के उत्तर पाएँ।' },
  'help.stillNeedHelp': { EN: 'Still need help?', HI: 'अभी भी सहायता चाहिए?' },
  'help.reachOut': { EN: 'Reach out to us through any of these channels.', HI: 'इनमें से किसी भी माध्यम से हमसे संपर्क करें।' },
  'help.liveChat': { EN: 'Live Chat', HI: 'लाइव चैट' },
  'help.available': { EN: 'Available 9 AM – 6 PM', HI: 'उपलब्ध सुबह 9 – शाम 6 बजे' },
  'help.email': { EN: 'Email', HI: 'ईमेल' },
  'help.helpline': { EN: 'Helpline', HI: 'हेल्पलाइन' },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('goease-lang') as Language | null;
    if (saved === 'EN' || saved === 'HI') return saved;
    return 'EN';
  });

  useEffect(() => {
    localStorage.setItem('goease-lang', language);
    document.documentElement.setAttribute('lang', language === 'HI' ? 'hi' : 'en');
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'HI' : 'EN');
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
