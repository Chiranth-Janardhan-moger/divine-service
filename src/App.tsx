import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  CheckCircle,
  Cloud,
  Home as HomeIcon,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Star,
  X,
  Map,
  Heart,
  Sparkles,
  Flame,
  User,
  BookOpen,
  Handshake
} from 'lucide-react';
import { SERVICES, Service } from './data';
import heroPhoto from '@/assets/photo.png';

type Language = 'en' | 'te' | 'kn' | 'hi';

interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  phone: string;
  email: string;
  gotra: string;
  nakshatra: string;
  date: string;
  time: string;
  notes: string;
  status: 'Pending Confirmation' | 'Confirmed';
}

const TRANSLATIONS = {
  en: {
    brand: 'Divine Service',
    home: 'Home',
    services: 'Services',
    about: 'About',
    location: 'Contact',
    bookNow: 'Book Now',
    exploreServices: 'Explore Services',
    shrirasthu: 'Shrirasthu',
    shubhamasthu: 'Shubhamasthu',
    avignamasthu: 'Avignamasthu',
    tagline: 'Dedicated to Dharma & Devotion',
    name: 'Bramhashree Bhogapurapu Venkataramana Sharma',
    babuGaru: '(Babu Panthulu Garu)',
    heroDesc: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    offeringsTitle: 'Sacred Offerings',
    offeringsDesc: 'Traditional Vedic rituals performed with strict adherence to sacred scriptures to bring harmony, protection, and success into your life.',
    connectTitle: 'Connect with Divinity',
    connectDesc: 'Reach out to schedule a consultation or ritual. We are here to guide you on your spiritual journey.',
    footerDesc: 'Preserving the sanctity of Vedic traditions and providing spiritual guidance for a harmonious life through ancient wisdom.',
    rights: 'All Rights Reserved.',
    allRituals: 'All Sacred Rituals',
    bookARitual: 'Book a Ritual',
    formName: 'Your Name (Yajamana)',
    formPhone: 'Contact Number',
    formEmail: 'Email Address',
    formGotra: 'Gotra (Ancestral Lineage)',
    formNakshatra: 'Nakshatra & Rashi (Star & Zodiac)',
    formDate: 'Auspicious Date Preferred',
    formTime: 'Preferred Time Slot',
    formNotes: 'Special Prayers / Specific Requirements',
    formSubmit: 'Submit Booking Request',
    formSubmitting: 'Submitting to Babu Garu...',
    bookingSuccess: 'Auspicious Booking Initiated!',
    bookingSuccessDesc: 'Your booking request has been securely stored locally. Babu Panthulu Garu will review the Muhurtham (auspicious time) and contact you at the provided number to discuss the Pooja Samagri (items required).',
    myBookings: 'My Scheduled Rituals',
    noBookings: 'No rituals scheduled yet. Book your first pooja above!',
    contactInquiry: 'Send an Inquiry',
    inquiryDesc: 'Have questions about specific homams, temple locations, or custom family ceremonies? Send a direct message.',
    inquirySuccess: 'Inquiry Sent Successfully',
    inquirySuccessDesc: 'Your spiritual query has been recorded. Babu Garu or his assistant will get in touch with you shortly.',
    viewDetails: 'View Details',
    duration: 'Duration',
    benefits: 'Key Benefits',
    items: 'Required Items (Samagri)',
    close: 'Close',
    purnimaCalendar: 'Auspicious Calendar 2026',
    calendarDesc: 'Key celestial alignments and festival days ideal for performing sacred homams and poojas.',
    tithiLabel: 'Lunar Tithi',
    significanceLabel: 'Spiritual Significance',
    shareAlert: 'Shareable link copied to clipboard!',
    astrologyLabel: 'Vedic Consultation',
    navagraha: 'Navagraha Pooja',
    navagrahaDesc: '• Navagraha mandapam\n• Rudrabhishekam\n• Homam',
    satya: 'Satyanarayana Pooja',
    satyaDesc: '• Navagraha Mandapa Pooja\n• Lakshminarayana Pooja\n• Vratha Katha',
    'gruha-pravesham': 'Gruha pravesham',
    'gruha-praveshamDesc': '• Vaasthu Pooja\n• Lakshmi Pooja\n• Satyanarayana Vratam\n• Vaasthu homam',
    marriage: 'Marriage (All Hindu communities)',
    marriageDesc: '• Pelli raata\n• Kanya daanam\n• Homam'
  },
  te: {
    brand: 'దివ్య సేవ',
    home: 'హోమ్',
    services: 'సేవలు',
    about: 'గురించి',
    location: 'సంಪ್ರదించండి',
    bookNow: 'బుకింగ్ చేయండి',
    exploreServices: 'సేవలను అన్వేషించండి',
    shrirasthu: 'శ్రీరస్తు',
    shubhamasthu: 'శుభమస్తు',
    avignamasthu: 'అవిఘ్నమస్తు',
    tagline: 'ధర్మం & భక్తికి అంకితం చేయబడింది',
    name: 'బ్రహ్మశ్రీ భోగాపురపు వెంకటరమణ శర్మ',
    babuGaru: '(బాబు పంతులు గారు)',
    heroDesc: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    offeringsTitle: 'పవిత్ర పూజా సేవలు',
    offeringsDesc: 'మీ జీవితంలో సామరస్యం, రక్షణ మరియు విజయాన్ని తీసుకురావడానికి పవిత్ర గ్రంథాల ప్రకారం ఖచ్చితమైన వైదిక నిబంధనలతో నిర్వహించబడే సంప్రదాయ క్రతువులు.',
    connectTitle: 'దైవత్వంతో అనుసంధానం',
    connectDesc: 'సంప్రదింపులు లేదా పూజా కార్యక్రమాలను షెడ్యూల్ చేయడానికి మమ్మల్ని సంప్రదించండి. మీ ఆధ్యాత్మిక ప్రయాణంలో మీకు మార్గనిర్దేశం చేయడానికి మేము ఇక్కడ ఉన్నాము.',
    footerDesc: 'వైదిక సంప్రదాయాల పవిత్రతను కాపాడుతూ, పురాతన జ్ఞానం ద్వారా సామరస్యపూర్వకమైన జీవితం కోసం ఆధ్యాత్మిక మార్గదర్శకత్వాన్ని అందించడం.',
    rights: 'సర్వ హక్కులు ప్రత్యేకించబడినవి.',
    allRituals: 'అన్ని పవిత్ర క్రతువులు',
    bookARitual: 'పూజ బుక్ చేయండి',
    formName: 'మీ పేరు (యజమాని)',
    formPhone: 'సంప్రదించవలసిన నంబర్',
    formEmail: 'ఈమెయిల్ అడ్రస్',
    formGotra: 'గోత్రం',
    formNakshatra: 'నక్షత్రం & రాశి',
    formDate: 'కావలసిన శుభ తేదీ',
    formTime: 'అనుకూల సమయం',
    formNotes: 'ప్రత్యేక ప్రార్థనలు / ఇతర వివరాలు',
    formSubmit: 'బుకింగ్ అభ్యర్థన సమర్పించండి',
    formSubmitting: 'సమర్పిస్తున్నాము...',
    bookingSuccess: 'శుభప్రదమైన బుకింగ్ ప్రారంభించబడింది!',
    bookingSuccessDesc: 'మీ బుకింగ్ అభ్యర్థన స్థానికంగా సురక్షితంగా సేవ్ చేయబడింది. బాబు పంతులు గారు ముహూర్తాన్ని పరిశీలించి, పూజా సామాగ్రి గురించి చర్చించడానికి మీ నంబర్‌లో మిమ్మల్ని సంప్రదిస్తారు.',
    myBookings: 'నా షెడ్యూల్ చేసిన పూజలు',
    noBookings: 'ఇంకా ఎలాంటి పూజలు షెడ్యూల్ చేయలేదు. పైన మీ మొదటి పూజను బుక్ చేయండి!',
    contactInquiry: 'ప్రశ్న అడగండి',
    inquiryDesc: 'నిర్దిష్ట హోమాలు, ఆలయ ముహూర్తాలు లేదా కుటుంబ శుభకార్యాల గురించి సందేహాలు ఉన్నాయా? నేరుగా అడగండి.',
    inquirySuccess: 'సందేశం విజయవంతంగా పంపబడింది',
    inquirySuccessDesc: 'మీ ఆధ్యాత్మిక ప్రశ్న రికార్డ్ చేయబడింది. బాబు గారు లేదా వారి సహాయకులు త్వరలోనే మిమ్మల్ని సంప్రదిస్తారు.',
    viewDetails: 'వివరాలు చూడండి',
    duration: 'సమయం',
    benefits: 'ముఖ్య ప్రయోజనాలు',
    items: 'కావలసిన పూజా సామాగ్రి',
    close: 'మూసివేయి',
    purnimaCalendar: 'శుభ దినాల క్యాలెండర్ 2026',
    calendarDesc: 'పవిత్ర హోమాలు మరియు పూజలు చేయడానికి అత్యంత అనుకూలమైన గ్రహాల అమరిక మరియు పండుగ రోజులు.',
    tithiLabel: 'తిథి',
    significanceLabel: 'ఆధ్యాత్మిక ప్రాముఖ్యత',
    shareAlert: 'లింక్ కాపీ చేయబడింది!',
    astrologyLabel: 'వైదిక జ్యోతిష్య సలహా',
    navagraha: 'నవగ్రహ పూజ',
    navagrahaDesc: '• నవగ్రహ మండపం\n• రుద్రాభిషేకం\n• హోమం',
    satya: 'సత్యనారాయణ పూజ',
    satyaDesc: '• నవగ్రహ మండప పూజ\n• లక్ష్మీనారాయణ పూజ\n• వ్రత కథ',
    'gruha-pravesham': 'గృహప్రవేశం',
    'gruha-praveshamDesc': '• వాస్తు పూజ\n• లక్ష్మీ పూజ\n• సత్యనారాయణ వ్రతం\n• వాస్తు హోమం',
    marriage: 'వివాహం (అన్ని హిందూ వర్గాలు)',
    marriageDesc: '• పెళ్లి రాట\n• కన్యాదానం\n• హోమం'
  },
  kn: {
    brand: 'ದಿವ್ಯ ಸೇವೆ',
    home: 'ಹೋಮ್',
    services: 'ಸೇವೆಗಳು',
    about: 'ಬಗ್ಗೆ',
    location: 'ಸಂಪರ್ಕಿಸಿ',
    bookNow: 'ಬುಕಿಂಗ್ ಮಾಡಿ',
    exploreServices: 'ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    shrirasthu: 'ಶ್ರೀರಸ್ತು',
    shubhamasthu: 'ಶುಭಮಸ್ತು',
    avignamasthu: 'ಅವಿಘ್ನಮಸ್ತು',
    tagline: 'ಧರ್ಮ ಮತ್ತು ಭಕ್ತಿಗೆ ಸಮರ್ಪಿಸಲಾಗಿದೆ',
    name: 'ಬ್ರಹ್ಮಶ್ರೀ ಭೋಗ್ಪುರಪು ವೆಂಕಟರಮಣ ಶರ್ಮ',
    babuGaru: '(ಬಾಬು ಪಂತುಲು ಗಾರು)',
    heroDesc: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    offeringsTitle: 'ಪವಿತ್ರ ಸೇವೆಗಳು',
    offeringsDesc: 'ನಿಮ್ಮ ಜೀವನದಲ್ಲಿ ಸಾಮರಸ್ಯ, ರಕ್ಷಣೆ ಮತ್ತು ಯಶಸ್ಸನ್ನು ತರಲು ಪವಿತ್ರ ಗ್ರಂಥಗಳ ಪ್ರಕಾರ ಕಟ್ಟುನಿಟ್ಟಾದ ವೈದಿಕ ನಿಯಮಗಳೊಂದಿಗೆ ನಡೆಸಲಾಗುವ ಸಾಂಪ್ರದಾಯಿಕ ಆಚರಣೆಗಳು.',
    connectTitle: 'ದೈವಿಕತೆಯೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
    connectDesc: 'ಸಮಾಲೋಚನೆ ಅಥವಾ ಪೂಜಾ ಆಚರಣೆಯನ್ನು ನಿಗದಿಪಡಿಸಲು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ. ನಿಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಯಾಣದಲ್ಲಿ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ.',
    footerDesc: 'ವೈದಿಕ ಸಂಪ್ರದಾಯಗಳ ಪವಿತ್ರತೆಯನ್ನು ರಕ್ಷಿಸುತ್ತಾ, ಪ್ರಾಚೀನ ಜ್ಞಾನದ ಮೂಲಕ ಸಾಮರಸ್ಯದ ಜೀವನಕ್ಕಾಗಿ ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗದರ್ಶನವನ್ನು ನೀಡುವುದು.',
    rights: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    allRituals: 'ಎಲ್ಲಾ ಪವಿತ್ರ ಆಚರಣೆಗಳು',
    bookARitual: 'ಪೂಜೆಯನ್ನು ಬುಕ್ ಮಾಡಿ',
    formName: 'ನಿಮ್ಮ ಹೆಸರು (ಯಜಮಾನ)',
    formPhone: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ',
    formEmail: 'ಇಮೇಲ್ ವಿಳಾಸ',
    formGotra: 'ಗೋತ್ರ',
    formNakshatra: 'ನಕ್ಷತ್ರ ಮತ್ತು ರಾಶಿ',
    formDate: 'ಬಯಸಿದ ಶುಭ ದಿನಾಂಕ',
    formTime: 'ಅನುಕೂಲಕರ ಸಮಯ',
    formNotes: 'ವಿಶೇಷ ಪ್ರಾರ್ಥನೆಗಳು / ಅವಶ್ಯಕತೆಗಳು',
    formSubmit: 'ಬುಕಿಂಗ್ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿ',
    formSubmitting: 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...',
    bookingSuccess: 'ಶುಭಪ್ರದ ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ!',
    bookingSuccessDesc: 'ನಿಮ್ಮ ಬುಕಿಂಗ್ ವಿನಂತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ. ಬಾಬು ಪಂತುಲು ಅವರು ಮುಹೂರ್ತವನ್ನು ಪರಿಶೀಲಿಸಿ, ಪೂಜಾ ಸಾಮಗ್ರಿಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡುತ್ತಾರೆ.',
    myBookings: 'ನನ್ನ ನಿಗದಿತ ಪೂಜೆಗಳು',
    noBookings: 'ಇನ್ನೂ ಯಾವುದೇ ಪೂಜೆಗಳನ್ನು ನಿಗದಿಪಡಿಸಿಲ್ಲ. ನಿಮ್ಮ ಮೊದಲ ಪೂಜೆಯನ್ನು ಮೇಲೆ ಬುಕ್ ಮಾಡಿ!',
    contactInquiry: 'ವಿಚಾರಣೆ ನಡೆಸಿ',
    inquiryDesc: 'ಹೋಮಗಳು, ದೇವಾಲಯಗಳ ಮುಹೂರ್ತ ಅಥವಾ ಕೌಟುಂಬಿಕ ಶುಭ ಸಮಾರಂಭಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನೇರವಾಗಿ ಕೇಳಿ.',
    inquirySuccess: 'ವಿಚಾರಣೆ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ',
    inquirySuccessDesc: 'ನಿಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಶ್ನೆಯನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ. ಬಾಬು ಅವರು ಅಥವಾ ಅವರ ಸಹಾಯಕರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಿದ್ದಾರೆ.',
    viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    duration: 'ಅವಧಿ',
    benefits: 'ಮುಖ್ಯ ಪ್ರಯೋಜನಗಳು',
    items: 'ಅಗತ್ಯವಿರುವ ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು',
    close: 'ಮುಚ್ಚಿ',
    purnimaCalendar: 'ಶುಭ ದಿನಗಳ ಕ್ಯಾಲೆಂಡರ್ 2026',
    calendarDesc: 'ಪವಿತ್ರ ಹೋಮಗಳು ಮತ್ತು ಪೂಜೆಗಳನ್ನು ಮಾಡಲು ಅತ್ಯಂತ ಸೂಕ್ತವಾದ ನಕ್ಷತ್ರ ಮತ್ತು ಹಬ್ಬದ ದಿನಗಳು.',
    tithiLabel: 'ತಿಥಿ',
    significanceLabel: 'ಆಧ್ಯಾತ್ಮಿಕ ಮಹತ್ವ',
    shareAlert: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
    astrologyLabel: 'ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ ಸಲಹೆ',
    navagraha: 'ನವಗ್ರಹ ಪೂಜೆ',
    navagrahaDesc: '• ನವಗ್ರಹ ಮಂಟಪ\n• ರುದ್ರಾಭಿಷೇಕ\n• ಹೋಮ',
    satya: 'ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ',
    satyaDesc: '• ನವಗ್ರಹ ಮಂಟಪ ಪೂಜೆ\n• ಲಕ್ಷ್ಮೀನಾರಾಯಣ ಪೂಜೆ\n• ವ್ರತ ಕಥೆ',
    'gruha-pravesham': 'ಗೃಹಪ್ರವೇಶ',
    'gruha-praveshamDesc': '• ವಾಸ್ತು ಪೂಜೆ\n• ಲಕ್ಷ್ಮಿ ಪೂಜೆ\n• ಸತ್ಯನಾರಾಯಣ ವ್ರತ\n• ವಾಸ್ತು ಹೋಮ',
    marriage: 'ವಿವಾಹ (ಎಲ್ಲಾ ಹಿಂದೂ ಸಮುದಾಯಗಳು)',
    marriageDesc: '• ಪೆಳ್ಳಿ ರಾಟ\n• ಕನ್ಯಾದಾನ\n• ಹೋಮ'
  },
  hi: {
    brand: 'दिव्य सेवा',
    home: 'मुख्य पृष्ठ',
    services: 'सेवाएं',
    about: 'परिचय',
    location: 'संपर्क करें',
    bookNow: 'बुकिंग करें',
    exploreServices: 'सेवाओं का अन्वेषण करें',
    shrirasthu: 'श्रीरस्तु',
    shubhamasthu: 'शुभमस्तु',
    avignamasthu: 'अविघ्नमस्तु',
    tagline: 'धर्म और भक्ति के प्रति समर्पित',
    name: 'ब्रह्मश्री भोगपुरपु वेंकटरमण शर्मा',
    babuGaru: '(बाबू पंतुलु गारू)',
    heroDesc: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    offeringsTitle: 'पवित्र अनुष्ठान',
    offeringsDesc: 'जीवन में सामंजस्य, सुरक्षा और सफलता लाने के लिए पवित्र शास्त्रों के अनुसार पूर्ण निष्ठा से किए जाने वाले पारंपरिक वैदिक अनुष्ठान।',
    connectTitle: 'दिव्यता से जुड़ें',
    connectDesc: 'परामर्श या अनुष्ठान निर्धारित करने के लिए संपर्क करें। हम आपकी आध्यात्मिक यात्रा में मार्गदर्शन करने के लिए सदैव तत्पर हैं।',
    footerDesc: 'वैदिक परंपराओं की पवित्रता को अक्षुण्ण रखते हुए प्राचीन ज्ञान के माध्यम से शांतिपूर्ण जीवन के लिए आध्यात्मिक मार्गदर्शन प्रदान करना।',
    rights: 'सर्वाधिकार सुरक्षित।',
    allRituals: 'सभी पवित्र अनुष्ठान',
    bookARitual: 'अनुष्ठान बुक करें',
    formName: 'आपका नाम (यजमान)',
    formPhone: 'संपर्क नंबर',
    formEmail: 'ईमेल पता',
    formGotra: 'गोत्र',
    formNakshatra: 'नक्षत्र और राशि',
    formDate: 'इच्छित शुभ तिथि',
    formTime: 'अनुकूल समय',
    formNotes: 'विशेष प्रार्थना / विशिष्ट आवश्यकताएं',
    formSubmit: 'बुकिंग का अनुरोध भेजें',
    formSubmitting: 'अनुरोध भेजा जा रहा है...',
    bookingSuccess: 'शुभ बुकिंग की प्रक्रिया प्रारंभ!',
    bookingSuccessDesc: 'आपका बुकिंग अनुरोध स्थानीय रूप से सुरक्षित सहेज लिया गया है। बाबू पंतुलु गारू शुभ मुहूर्त का विश्लेषण करेंगे और पूजा सामग्री (आवश्यक वस्तुओं) पर चर्चा करने के लिए संपर्क करेंगे।',
    myBookings: 'मेरे निर्धारित अनुष्ठान',
    noBookings: 'अभी कोई अनुष्ठान निर्धारित नहीं है। अपनी पहली पूजा ऊपर बुक करें!',
    contactInquiry: 'पूछताछ करें',
    inquiryDesc: 'विशिष्ट हवन, मंदिर मुहूर्त या पारिवारिक संस्कारों के बारे में कोई प्रश्न है? सीधा संदेश भेजें।',
    inquirySuccess: 'पूछताछ सफलतापूर्वक भेजी गई',
    inquirySuccessDesc: 'आपकी आध्यात्मिक जिज्ञासा दर्ज कर ली गई है। बाबू गारू या उनके सहयोगी शीघ्र ही आपसे संपर्क करेंगे।',
    viewDetails: 'विवरण देखें',
    duration: 'अवधि',
    benefits: 'मुख्य लाभ',
    items: 'आवश्यक पूजा सामग्री',
    close: 'बंद करें',
    purnimaCalendar: 'शुभ तिथि कैलेंडर 2026',
    calendarDesc: 'पवित्र अनुष्ठान और यज्ञ करने के लिए सबसे अनुकूल ग्रहों का योग और पर्व दिवस।',
    tithiLabel: 'तिथि',
    significanceLabel: 'आध्यात्मिक महत्व',
    shareAlert: 'लिंक कॉपी कर लिया गया है!',
    astrologyLabel: 'वैदिक ज्योतिष परामर्श',
    navagraha: 'नवग्रह पूजा',
    navagrahaDesc: '• नवग्रह मंडप\n• रुद्राभिषेक\n• होम',
    satya: 'सत्यनारायण पूजा',
    satyaDesc: '• नवग्रह मंडप पूजा\n• लक्ष्मीनारायण पूजा\n• व्रत कथा',
    'gruha-pravesham': 'गृह प्रवेश',
    'gruha-praveshamDesc': '• वास्तु पूजा\n• लक्ष्मी पूजा\n• सत्यनारायण व्रत\n• वास्तु होम',
    marriage: 'विवाह (सभी हिंदू समुदाय)',
    marriageDesc: '• पेल्ली राटा\n• कन्यादान\n• होम'
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [langDropdown, setLangDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  // Modals and Active states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<Service | null>(null);
  const [showMyBookings, setShowMyBookings] = useState(false);
  
  // Local Submissions Store
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('divine_service_bookings');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gotra, setGotra] = useState('');
  const [nakshatra, setNakshatra] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('07:00 AM - 10:00 AM');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Current active nav section on scroll or manual click
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    localStorage.setItem('divine_service_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const t = TRANSLATIONS[lang];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleBookNowClick = (service?: Service) => {
    if (service) {
      setSelectedServiceForBooking(service);
    } else {
      setSelectedServiceForBooking(SERVICES[0]);
    }
    setBookingSuccess(false);
    setIsBookingOpen(true);
    setMobileMenu(false);
  };



  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      triggerToast('Please provide your Name, Phone Number, and Preferred Date.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'book_' + Date.now(),
        serviceId: selectedServiceForBooking?.id || 'custom',
        serviceTitle: selectedServiceForBooking?.title || 'Custom Spiritual Pooja',
        clientName: name,
        phone,
        email,
        gotra: gotra || 'Shiva / Rishi Gotra',
        nakshatra: nakshatra || 'Prasanna Nakshatra',
        date,
        time,
        notes,
        status: 'Pending Confirmation'
      };

      setBookings(prev => [newBooking, ...prev]);
      setSubmitting(false);
      setBookingSuccess(true);
      
      // Reset main inputs
      setName('');
      setPhone('');
      setEmail('');
      setGotra('');
      setNakshatra('');
      setDate('');
      setNotes('');
    }, 1500);
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    triggerToast('Ritual booking canceled successfully.');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast(t.shareAlert);
  };

  // Helper to resolve standard icons from Lucide
  const renderIcon = (name: string, className = "w-6 h-6") => {
    // Custom minimalist Ganesha icon
    const GaneshaIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 2v3m-2-2h4" />
        <path d="M9 7c-2 0-3 1.5-3 3s1 2.5 3 2m6-5c2 0 3 1.5 3 3s-1 2.5-3 2" />
        <path d="M12 5c-1.5 0-2 1-2 2s.5 2 2 3c1.5 1 2 2.5 2 4a3 3 0 0 1-3 3h-1" />
        <path d="M10 13h1" />
        <path d="M12 7.5v1.5" />
      </svg>
    );

    switch (name) {
      case 'Sun': return <Sun className={className} />;
      case 'CheckCircle': return <CheckCircle className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'Home': return <HomeIcon className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Handshake': return <Handshake className={className} />;
      case 'Ganesha': return <GaneshaIcon className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      default: return <Sun className={className} />;
    }
  };

  return (
    <div className="bg-surface text-deep-brown font-sans min-h-screen overflow-x-hidden lotus-pattern relative pb-1">
      {/* Toast notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-vermilion text-cream px-6 py-3 rounded-lg shadow-xl font-medium flex items-center gap-3 border border-outline-variant/30 text-sm md:text-base"
            id="toast-notification"
          >
            <Sparkles className="w-5 h-5 text-golden-yellow animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 w-full z-40 glass-header bg-surface/80 shadow-sm border-b border-primary/10">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-8 h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="font-display font-bold text-lg text-primary">ॐ</span>
            </div>
            <div className="font-display text-2xl md:text-3xl text-primary tracking-tight font-bold" id="header-logo-text">
              {t.brand}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              onClick={() => setActiveNav('home')}
              className={`font-sans font-semibold text-sm tracking-wider uppercase pb-1 transition-all duration-300 ${
                activeNav === 'home' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              id="nav-home"
            >
              {t.home}
            </a>
            <a
              href="#services"
              onClick={() => setActiveNav('services')}
              className={`font-sans font-semibold text-sm tracking-wider uppercase pb-1 transition-all duration-300 ${
                activeNav === 'services' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              id="nav-services"
            >
              {t.services}
            </a>

            <a
              href="#contact"
              onClick={() => setActiveNav('contact')}
              className={`font-sans font-semibold text-sm tracking-wider uppercase pb-1 transition-all duration-300 ${
                activeNav === 'contact' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              id="nav-location"
            >
              {t.location}
            </a>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-2 font-sans font-semibold text-sm tracking-wider uppercase text-on-surface-variant hover:text-primary transition-all duration-300 px-3 py-1.5 rounded-md hover:bg-primary/5 border border-transparent hover:border-primary/10"
                id="language-dropdown-btn"
              >
                <Globe className="w-4 h-4 text-primary" />
                <span>{lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు' : lang === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}</span>
                <span className="text-xs">▼</span>
              </button>

              <AnimatePresence>
                {langDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-cream border border-outline-variant rounded-lg shadow-xl z-50 overflow-hidden"
                      id="language-menu"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => { setLang('en'); setLangDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${lang === 'en' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-primary/5'}`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => { setLang('te'); setLangDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${lang === 'te' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-primary/5'}`}
                        >
                          తెలుగు (Telugu)
                        </button>
                        <button
                          onClick={() => { setLang('kn'); setLangDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${lang === 'kn' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-primary/5'}`}
                        >
                          ಕನ್ನಡ (Kannada)
                        </button>
                        <button
                          onClick={() => { setLang('hi'); setLangDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${lang === 'hi' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-primary/5'}`}
                        >
                          हिन्दी (Hindi)
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* My Bookings Button */}
            {bookings.length > 0 && (
              <button
                onClick={() => setShowMyBookings(true)}
                className="relative p-2.5 text-primary hover:bg-primary/5 rounded-full transition-colors border border-primary/20"
                title={t.myBookings}
                id="my-bookings-btn-header"
              >
                <Calendar className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-vermilion text-cream text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-cream">
                  {bookings.length}
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center gap-3">
            {bookings.length > 0 && (
              <button
                onClick={() => setShowMyBookings(true)}
                className="relative p-2 text-primary hover:bg-primary/5 rounded-full border border-primary/15"
                id="my-bookings-btn-mobile"
              >
                <Calendar className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-vermilion text-cream text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {bookings.length}
                </span>
              </button>
            )}
            
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-primary p-2 focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-t border-primary/10 overflow-hidden shadow-lg px-4 py-6 space-y-4"
              id="mobile-nav-panel"
            >
              <div className="flex flex-col space-y-3">
                <a
                  href="#home"
                  onClick={() => { setActiveNav('home'); setMobileMenu(false); }}
                  className={`text-base font-semibold px-4 py-2 rounded-md ${activeNav === 'home' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant'}`}
                >
                  {t.home}
                </a>
                <a
                  href="#services"
                  onClick={() => { setActiveNav('services'); setMobileMenu(false); }}
                  className={`text-base font-semibold px-4 py-2 rounded-md ${activeNav === 'services' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant'}`}
                >
                  {t.services}
                </a>

                <a
                  href="#contact"
                  onClick={() => { setActiveNav('contact'); setMobileMenu(false); }}
                  className={`text-base font-semibold px-4 py-2 rounded-md ${activeNav === 'contact' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant'}`}
                >
                  {t.location}
                </a>
              </div>

              {/* Language Selector in Mobile Menu */}
              <div className="border-t border-primary/10 pt-4">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest block px-4 mb-2">Select Language</span>
                <div className="grid grid-cols-2 gap-2 px-4">
                  <button
                    onClick={() => { setLang('en'); setMobileMenu(false); }}
                    className={`text-xs py-2 rounded border font-medium ${lang === 'en' ? 'bg-primary/15 border-primary text-primary' : 'border-outline-variant bg-surface'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLang('te'); setMobileMenu(false); }}
                    className={`text-xs py-2 rounded border font-medium ${lang === 'te' ? 'bg-primary/15 border-primary text-primary' : 'border-outline-variant bg-surface'}`}
                  >
                    తెలుగు
                  </button>
                  <button
                    onClick={() => { setLang('kn'); setMobileMenu(false); }}
                    className={`text-xs py-2 rounded border font-medium ${lang === 'kn' ? 'bg-primary/15 border-primary text-primary' : 'border-outline-variant bg-surface'}`}
                  >
                    ಕನ್ನಡ
                  </button>
                  <button
                    onClick={() => { setLang('hi'); setMobileMenu(false); }}
                    className={`text-xs py-2 rounded border font-medium ${lang === 'hi' ? 'bg-primary/15 border-primary text-primary' : 'border-outline-variant bg-surface'}`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Traditional Chant Bar */}
      <div className="w-full bg-cream/90 border-b border-outline-variant/30 pt-24 pb-6" id="shloka-bar">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center text-[9px] sm:text-sm md:text-base">
          <span className="font-display font-bold text-primary italic tracking-[0.15em] sm:tracking-[0.2em] uppercase opacity-90 animate-pulse">
            {t.shrirasthu}
          </span>
          <span className="font-display font-bold text-primary italic tracking-[0.15em] sm:tracking-[0.2em] uppercase opacity-90 animate-pulse">
            {t.shubhamasthu}
          </span>
          <span className="font-display font-bold text-primary italic tracking-[0.15em] sm:tracking-[0.2em] uppercase opacity-90 animate-pulse">
            {t.avignamasthu}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-24">
        
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden py-8 md:py-16" id="home-section">
          {/* Subtle decorative background circles */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full z-10">
            {/* Left Content Column */}
            <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary font-sans font-bold text-xs uppercase tracking-wider" id="hero-badge">
                <Sparkles className="w-4 h-4 text-primary-container animate-pulse" />
                <span>{t.tagline}</span>
              </div>

              {/* Headings */}
              <div className="space-y-4">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] text-on-surface leading-[1.1] font-bold tracking-tight" id="hero-name-heading">
                  {lang === 'en' ? (
                    <>
                      Bramhashree <span className="text-primary tracking-normal">Bhogapurapu</span> <br />
                      <span className="text-primary tracking-normal">Venkataramana Sharma</span>
                    </>
                  ) : t.name}
                </h1>
                
                <p className="font-display text-2xl sm:text-3xl text-primary/80 font-semibold italic" id="hero-babu-subtitle">
                  {t.babuGaru}
                </p>
              </div>

              {/* Description */}
              <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal whitespace-pre-line" id="hero-description-text">
                {t.heroDesc}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="#services"
                  className="bg-primary text-cream px-8 py-3.5 rounded-lg font-sans font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 flex items-center justify-center"
                  id="hero-explore-btn"
                >
                  {t.exploreServices}
                </a>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative group p-4">
                {/* Rotating Frame Circles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                  className="absolute -inset-2 border border-dashed border-primary/30 rounded-full pointer-events-none"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
                  className="absolute -inset-5 border-2 border-primary/10 rounded-full pointer-events-none"
                />

                {/* Main Portrait Frame */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-[10px] border-cream shadow-2xl z-10">
                  <img
                    alt="Bramhashree Bhogapurapu Venkataramana Sharma"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={heroPhoto}
                    referrerPolicy="no-referrer"
                    id="hero-portrait-img"
                  />
                </div>

                {/* Small floating info card */}
                <div className="absolute -bottom-2 -left-4 bg-cream/95 backdrop-blur border border-outline-variant rounded-lg p-3 shadow-lg z-20 max-w-[200px] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">Experience</p>
                    <p className="text-xs font-bold text-on-surface">30+ Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sacred Offerings Section */}
        <section className="py-8 scroll-mt-24" id="services">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl text-on-surface font-bold tracking-tight" id="services-section-title">
              {t.offeringsTitle}
            </h2>
            <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
            <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-normal" id="services-section-desc">
              {t.offeringsDesc}
            </p>
          </div>

          {/* Service grid displaying all services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="group bg-cream/50 border border-primary/10 rounded-xl p-5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
                id={`service-card-${service.id}`}
              >
                {/* Decorative border highlight */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/20 group-hover:bg-primary transition-colors" />

                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-cream transition-all duration-300">
                    {renderIcon(service.iconName, "w-5 h-5")}
                  </div>
                  
                  <h3 className="font-display text-base sm:text-lg text-on-surface font-semibold mb-2.5 group-hover:text-primary transition-colors">
                    {(() => {
                      const displayTitle = lang === 'en' ? service.title : (TRANSLATIONS[lang] as any)[service.id] || service.title;
                      const parts = displayTitle.split('(');
                      if (parts.length > 1) {
                        return (
                          <>
                            {parts[0]}
                            <span className="text-[10px] sm:text-xs font-normal opacity-75 block mt-0.5">({parts[1]}</span>
                          </>
                        );
                      }
                      return displayTitle;
                    })()}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-0 font-normal whitespace-pre-line">
                    {lang === 'en' ? service.description : (TRANSLATIONS[lang] as any)[`${service.id}Desc`] || service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>





        {/* Connect & Divinity Section (Map & Contact details) */}
        <section className="py-8 scroll-mt-24" id="contact">
          <div className="bg-cream border border-primary/15 rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
            
            {/* Info Panel */}
            <div className="p-6 sm:p-8 lg:p-10 bg-primary text-cream w-full lg:w-[60%] flex flex-col justify-center space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cream/10 border border-cream/20 text-cream text-[10px] uppercase tracking-wider mb-3">
                  <User className="w-3.5 h-3.5" />
                  <span>Direct Communication</span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" id="connect-section-title">
                  {t.connectTitle}
                </h2>
                
                <p className="font-sans text-xs sm:text-sm opacity-90 mb-6 leading-relaxed font-normal" id="connect-section-desc">
                  {t.connectDesc}
                </p>

                {/* Direct info items */}
                <div className="space-y-4">
                  <a
                    href="tel:+919849249296"
                    className="flex items-center gap-4 group/item cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center border border-cream/20 group-hover/item:bg-cream/20 transition-colors">
                      <Phone className="w-4 h-4 text-cream" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider opacity-70">Phone & WhatsApp</p>
                      <span className="font-sans text-sm sm:text-base font-bold group-hover/item:underline">+91 98492 49296</span>
                    </div>
                  </a>

                  <a
                    href="mailto:ramanaakpr@gmail.com"
                    className="flex items-center gap-4 group/item cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center border border-cream/20 group-hover/item:bg-cream/20 transition-colors">
                      <Mail className="w-4 h-4 text-cream" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider opacity-70">Email Address</p>
                      <span className="font-sans text-sm sm:text-base font-bold group-hover/item:underline">ramanaakpr@gmail.com</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center flex-shrink-0 border border-cream/20">
                      <MapPin className="w-4 h-4 text-cream" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider opacity-70">Residence</p>
                      <span className="font-sans text-xs sm:text-sm leading-relaxed block font-medium">
                        #21/2/16, Sri Lakshmi Venkateswara Swamy Nilaya,<br />
                        Kovempu Nagar, Thimanna Layout,<br />
                        Kattigenahalli, Bengaluru,<br />
                        Karnataka – 560064, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Panel */}
            <div className="w-full lg:w-[40%] p-6 sm:p-8 lg:p-6 bg-cream/50 relative flex flex-col justify-between">
              <div className="space-y-1 mb-3">
                <h4 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                  <Map className="w-4 h-4 text-primary" />
                  <span>residence</span>
                </h4>
              </div>

              {/* Map Image container with interactive elements */}
              <div className="relative aspect-[16/9] lg:aspect-auto w-full lg:w-[320px] lg:h-40 lg:mx-auto rounded-xl overflow-hidden border border-primary/15 shadow-inner group">
                <iframe
                  title="Google Map Location"
                  className="w-full h-full border-0"
                  src="https://maps.google.com/maps?q=13.116271,77.627987&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  id="divine-service-map"
                />
              </div>

              <div className="mt-3 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-[10px] text-on-surface-variant">Coordinates: 13.1163° N, 77.6280° E</span>
                <a
                  href="https://maps.app.goo.gl/82my9474PiRa9Gdi6?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-cream text-[10px] font-bold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-cream/80 border-t border-outline-variant py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center animate-fade-in">
          <p className="text-xs text-on-surface-variant opacity-80" id="footer-copyright-text">
            © {new Date().getFullYear()} Bramhashree Bhogapurapu Venkataramana Sharma
          </p>
        </div>
      </footer>



      {/* RITUAL BOOKING MODAL */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsBookingOpen(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-cream border border-primary/25 rounded-2xl p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              id="booking-form-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-1.5 rounded-full hover:bg-primary/5 transition-colors"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>

              {bookingSuccess ? (
                <div className="space-y-6 py-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto border-2 border-primary/30">
                    <CheckCircle className="w-10 h-10 text-primary animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-on-surface">
                      {t.bookingSuccess}
                    </h3>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">
                      ॐ SWASTI MANTRALAYA SHANTIRASTHU ॐ
                    </p>
                  </div>

                  <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                    {t.bookingSuccessDesc}
                  </p>

                  <div className="bg-primary/5 p-4 rounded-xl text-left border border-primary/10 max-w-sm mx-auto space-y-2.5">
                    <p className="text-xs text-on-surface"><strong>Service:</strong> {selectedServiceForBooking?.title}</p>
                    <p className="text-xs text-on-surface"><strong>Auspicious Date:</strong> {date}</p>
                    <p className="text-xs text-on-surface"><strong>Time Preferred:</strong> {time}</p>
                  </div>

                  <div className="pt-4 flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setIsBookingOpen(false);
                        setShowMyBookings(true);
                      }}
                      className="bg-primary text-cream px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                    >
                      {t.myBookings}
                    </button>
                    <button
                      onClick={() => setIsBookingOpen(false)}
                      className="border border-outline-variant text-on-surface-variant px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary/5"
                    >
                      {t.close}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="border-b border-primary/10 pb-4">
                    <span className="text-[10px] font-bold text-vermilion uppercase tracking-widest block">Sankalpa Registration</span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
                      <Flame className="w-5 h-5 text-vermilion" />
                      <span>{t.bookARitual}</span>
                    </h3>
                  </div>

                  {/* Service selector in-modal */}
                  <div>
                    <label className="text-xs font-bold text-on-surface block mb-1.5">Select Sacred Pooja</label>
                    <select
                      value={selectedServiceForBooking?.id || ''}
                      onChange={(e) => {
                        const found = SERVICES.find(s => s.id === e.target.value);
                        if (found) setSelectedServiceForBooking(found);
                      }}
                      className="bg-cream text-on-surface text-sm p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full font-medium"
                      id="booking-service-select"
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.id}>
                          {lang === 'en' ? s.title : (TRANSLATIONS[lang] as any)[s.id] || s.title} ({s.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {/* Grid Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-on-surface block mb-1">{t.formName} *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-cream text-on-surface text-sm p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full"
                          placeholder="e.g. Anand Sharma"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-on-surface block mb-1">{t.formPhone} *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-cream text-on-surface text-sm p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full"
                          placeholder="e.g. 9849249296"
                        />
                      </div>
                    </div>

                    {/* Grid Gotra & Star */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-on-surface block mb-1">{t.formGotra}</label>
                        <input
                          type="text"
                          value={gotra}
                          onChange={(e) => setGotra(e.target.value)}
                          className="bg-cream text-on-surface text-sm p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full"
                          placeholder="e.g. Kashyapa / Bharadwaja"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-on-surface block mb-1">{t.formNakshatra}</label>
                        <input
                          type="text"
                          value={nakshatra}
                          onChange={(e) => setNakshatra(e.target.value)}
                          className="bg-cream text-on-surface text-sm p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full"
                          placeholder="e.g. Rohini, Rishabha Rashi"
                        />
                      </div>
                    </div>

                    {/* Grid Email, Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-1">
                        <label className="text-xs font-bold text-on-surface block mb-1">{t.formDate} *</label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="bg-cream text-on-surface text-sm p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-xs font-bold text-on-surface block mb-1">{t.formTime}</label>
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="bg-cream text-on-surface text-xs p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full"
                        >
                          <option value="05:30 AM - 08:30 AM">Ushas (05:30 - 08:30)</option>
                          <option value="07:00 AM - 10:00 AM">Pratah (07:00 - 10:00)</option>
                          <option value="09:00 AM - 12:00 PM">Sangava (09:00 - 12:00)</option>
                          <option value="04:00 PM - 07:00 PM">Pradosha (16:00 - 19:00)</option>
                        </select>
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-xs font-bold text-on-surface block mb-1">{t.formEmail}</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-cream text-on-surface text-sm p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full"
                          placeholder="e.g. client@domain.com"
                        />
                      </div>
                    </div>

                    {/* Special Notes */}
                    <div>
                      <label className="text-xs font-bold text-on-surface block mb-1">{t.formNotes}</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="bg-cream text-on-surface text-sm p-2.5 rounded border border-outline-variant focus:outline-none focus:border-primary w-full resize-none"
                        placeholder="e.g. Family names, specific intentions (Sankalpa), dietary preferences for prasadam..."
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-primary/10 flex gap-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-primary text-cream py-3 rounded-lg font-sans font-bold text-sm uppercase tracking-wider text-center hover:bg-primary/95 transition-all disabled:opacity-50"
                        id="booking-form-submit"
                      >
                        {submitting ? t.formSubmitting : t.formSubmit}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsBookingOpen(false)}
                        className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-sm uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MY SCHEDULED BOOKINGS DRAWER/PANEL */}
      <AnimatePresence>
        {showMyBookings && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowMyBookings(false)}
            />

            {/* Panel Body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-cream border-l border-primary/20 h-full p-6 shadow-2xl z-10 flex flex-col justify-between"
              id="my-bookings-panel"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center border-b border-primary/15 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-bold text-on-surface">
                      {t.myBookings}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowMyBookings(false)}
                    className="p-1 rounded-full hover:bg-primary/5 text-on-surface-variant"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Bookings List */}
                <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                  {bookings.length === 0 ? (
                    <div className="text-center py-12 text-on-surface-variant space-y-3">
                      <Calendar className="w-12 h-12 text-outline mx-auto stroke-[1.5]" />
                      <p className="text-sm font-medium">{t.noBookings}</p>
                    </div>
                  ) : (
                    bookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-cream border border-primary/15 rounded-xl p-4 shadow-sm hover:shadow relative overflow-hidden"
                      >
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="absolute top-3 right-3 text-on-surface-variant hover:text-vermilion"
                          title="Cancel Booking"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="space-y-2">
                          <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            {b.status}
                          </span>
                          
                          <h4 className="font-display font-bold text-sm text-on-surface">
                            {(() => {
                              const matchingService = SERVICES.find(s => s.id === b.serviceId);
                              if (matchingService) {
                                return lang === 'en' ? matchingService.title : (TRANSLATIONS[lang] as any)[matchingService.id] || matchingService.title;
                              }
                              return b.serviceTitle;
                            })()}
                          </h4>

                          <div className="space-y-1 text-xs text-on-surface-variant font-medium">
                            <p><strong>Yajamana:</strong> {b.clientName}</p>
                            <p><strong>Date & Time:</strong> {b.date} | {b.time}</p>
                            {b.gotra && <p><strong>Gotra:</strong> {b.gotra}</p>}
                            {b.nakshatra && <p><strong>Nakshatra:</strong> {b.nakshatra}</p>}
                            {b.notes && <p className="italic text-on-surface-variant/80 border-t border-outline-variant/30 pt-1 mt-1 font-normal">"{b.notes}"</p>}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Actions at footer of drawer */}
              <div className="border-t border-primary/15 pt-4 space-y-3">
                <button
                  onClick={() => setShowMyBookings(false)}
                  className="w-full border border-outline-variant text-on-surface-variant py-3 rounded-lg text-center font-bold text-sm uppercase tracking-wider hover:bg-primary/5"
                >
                  Close Panel
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
