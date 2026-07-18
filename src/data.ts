export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  duration: string;
  itemsRequired: string[];
  iconName: 'Sun' | 'CheckCircle' | 'Cloud' | 'Home' | 'Flame' | 'Heart' | 'Moon' | 'Sparkles' | 'Handshake' | 'Ganesha' | 'BookOpen';
}

export const SERVICES: Service[] = [
  {
    id: 'navagraha',
    title: 'Navagraha Pooja',
    description: '• Navagraha mandapam\n• Rudrabhishekam\n• Homam',
    detailedDescription: 'The Navagraha Pooja is a powerful ritual performed to appease the nine planetary deities who control our karmas, desires, and their outcomes. By performing this pooja, any negative influences or "doshas" in one\'s birth chart are pacified, paving the way for smooth progress in career, relationships, and health.',
    benefits: [
      'Neutralizes malefic planetary influences (doshas).',
      'Promotes peace, mental clarity, and spiritual growth.',
      'Aids in overcoming unexpected obstacles in personal and professional life.',
      'Brings financial stability and professional growth.'
    ],
    duration: '2.5 Hours',
    itemsRequired: [
      'Navadhanya (Nine sacred grains)',
      'Nine dry coconuts (Kuduka)',
      'Flowers of nine different colors',
      'Pooja Kalash & Mango leaves',
      'Pure cow ghee and honey'
    ],
    iconName: 'Sun'
  },
  {
    id: 'satya',
    title: 'Satyanarayana Pooja',
    description: '• Navagraha Mandapa Pooja\n• Lakshminarayana Pooja\n• Vratha Katha',
    detailedDescription: 'The Sri Satyanarayana Pooja is performed to reverence Lord Vishnu in his most benevolent form of Truth (Satya). Usually performed on Full Moon (Purnima) days, this ritual brings harmony, removes negative energy from the household, and secures the protective blessings of the Lord for family well-being.',
    benefits: [
      'Promotes domestic peace, harmony, and happiness.',
      'Blesses the family with health, wealth, and prosperity.',
      'Acts as an expression of gratitude for life\'s achievements and milestones.',
      'Purifies the minds of family members, promoting truthfulness.'
    ],
    duration: '3 Hours',
    itemsRequired: [
      'Lord Satyanarayana Photo/Idol',
      'Sooji (Rava) for Prasad (Sajjige)',
      'Pooja banana leaves and fruits',
      'Betel leaves and betel nuts',
      'Coconuts & Panchamrutham'
    ],
    iconName: 'BookOpen'
  },
  {
    id: 'gruha-pravesham',
    title: 'Gruha pravesham',
    description: '• Vaasthu Pooja\n• Lakshmi Pooja\n• Satyanarayana Vratam\n• Vaasthu homam',
    detailedDescription: 'Griha Pravesh is performed before entering a new home. It involves multiple steps like Gau Pooja (cow worship), threshold worship, and boiling milk to symbolize overflowing abundance, ensuring that the new dwelling is filled with light, auspiciousness, and joy.',
    benefits: [
      'Consecrates the new house, turning it into a sacred living temple.',
      'Fosters peaceful, happy relationships among family members residing there.',
      'Ensures health, fortune, and long life for the occupants.',
      'Dispels any residual spirits or stagnant energies in the building.'
    ],
    duration: '4 Hours',
    itemsRequired: [
      'Kamadhenu (Cow & Calf) if possible, or representative idol',
      'Brand new clay pot for boiling milk',
      'Mango tree leaves & decorative garlands',
      'Kusha grass & Turmeric paste',
      'Toran for the main door entrance'
    ],
    iconName: 'Home'
  },
  {
    id: 'marriage',
    title: 'Marriage (All Hindu communities)',
    description: '• Pelli raata\n• Kanya daanam\n• Homam',
    detailedDescription: 'The Vedic Marriage ceremony is an ancient, beautiful sacrament consisting of seven vows (Saptapadi) around the holy fire. Each mantra binds the bride and groom physically, emotionally, and spiritually to act as companions in fulfilling Dharma, Artha, Kama, and Moksha.',
    benefits: [
      'Consecrates the union of two souls under divine and ancestral witness.',
      'Fosters deep mutual respect, loyalty, and lifelong bonding.',
      'Establishes strong lineage blessings (Pitru Ashirwad).',
      'Aligns marital life with cosmic order and family values.'
    ],
    duration: '5 Hours',
    itemsRequired: [
      'Mangalsutra & Wedding rings',
      'Holy yellow thread (Kankanam)',
      'Jeelakarra Bellam (cumin-jaggery paste)',
      'Puffed rice (Laja) for homam',
      'Sandalwood, rosewater, and vermilion'
    ],
    iconName: 'Handshake'
  }
];
