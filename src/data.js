// Edit this file to change the content of the whole site.
export const profile = {
  name: 'Mikiyas Adawerk',
  role: 'Web Developer',
  location: 'Addis Ababa, Ethiopia',
  intro:
    'I build responsive websites and web apps for businesses in Ethiopia and beyond, from the design in Figma to a working React front end connected to a database.',
  availability: 'Open to freelance projects',
  email: 'mikiyasadawerk121@gmail.com',
  phone: '0970366053',
  phoneHref: '+251970366053',
  cvUrl: '', // put your CV in /public (e.g. /Mikiyas-Adawerk-CV.pdf) and set the path here to show a Download CV button
}

// Links left empty are hidden automatically.
export const socials = [
  { id: 'github', label: 'GitHub', url: '' },
  { id: 'linkedin', label: 'LinkedIn', url: '' },
  { id: 'telegram', label: 'Telegram', url: 'https://t.me/Mikileo10' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/mikiyas_18' },
]

export const about = [
  'I am a web developer based in Addis Ababa. I care about interfaces that are fast, clear on a phone, and easy for the people who run them.',
  'My recent work is a digital menu and guest portal for a hotel: QR codes for rooms and tables, prices in four currencies, an admin panel for staff, and Ethiopian payment options.',
]

export const services = [
  { title: 'Responsive websites', text: 'Layouts that read well on any screen, with images and fonts optimised so pages load quickly on mobile data.' },
  { title: 'Web apps with an admin panel', text: 'React front ends backed by Supabase, so you can update prices, content and users yourself without calling a developer.' },
  { title: 'Payments and integrations', text: 'Connecting your site to payment providers, exchange-rate feeds and other APIs, including Ethiopian options like Telebirr.' },
]

export const skills = [
  { group: 'Front end', items: [
    { name: 'HTML', level: 'Intermediate', logo: 'html-logo.svg' },
    { name: 'CSS', level: 'Advanced', logo: 'css-logo.svg' },
    { name: 'JavaScript', level: 'Intermediate', logo: 'javascript-logo.svg' },
    { name: 'React', level: 'Basic', logo: 'react-logo.svg' },
    { name: 'Tailwind', level: 'Intermediate', logo: 'tailwind-css-logo.svg' },
    { name: 'Supabase', level: 'Intermediate' },
  ] },
  { group: 'Design', items: [
    { name: 'Figma', level: 'Advanced', logo: 'figma-logo.svg' },
    { name: 'Sketch', level: 'Basic', logo: 'sketch-logo.svg' },
    { name: 'Adobe XD', level: 'Intermediate', logo: 'adobe-xd-logo.svg' },
    { name: 'Photoshop', level: 'Intermediate', logo: 'adobe-photoshop-logo.svg' },
    { name: 'InVision', level: 'Basic', logo: 'invision-logo.svg' },
  ] },
]

// Add education / experience here and a "Journey" section appears. Example:
// { title: 'Diploma in Computer Science', place: 'Your school', period: '2020 - 2023', text: 'What you did.' }
export const journey = []

// Add `image: '/projects/name.webp'` (file in /public/projects) to replace the generated cover with a screenshot.
export const projects = [
  {
    title: 'Marsilen Hotel digital menu and guest portal',
    category: 'Web app',
    hue: 262,
    summary: 'A QR-code menu and guest portal for a hotel, with an admin panel staff use to manage the menu.',
    status: 'In development',
    overview: 'Guests scan a QR code in their room or at a table to browse the menu. Staff manage everything from an admin area, so changes show up without touching code.',
    features: [
      'Menu split into food sections with a photo for every item, plus halal badge, preparation time and price in ETB',
      'Currency switcher for ETB, USD, GBP and EUR using exchange rates',
      'English and Amharic language switch, and dark and light mode',
      'Room QR codes sign guests in with last name and an admin-issued PIN; table, pool bar and lobby QR codes skip the sign-in',
      'Admin can add and edit food items and drinks per category, upload photos and change prices',
      'Bill payment through Telebirr and other Ethiopian banks (being built)',
    ],
    stack: ['React', 'Vite', 'Supabase', 'JavaScript', 'CSS'],
    links: [],
  },
  {
    title: 'This portfolio',
    category: 'Website',
    hue: 216,
    summary: 'The site you are on: a React rebuild of my original HTML portfolio.',
    overview: 'Rebuilt from plain HTML, CSS and JavaScript into React, with a light and dark theme, a working contact form and fast image loading.',
    features: ['Light and dark theme that remembers your choice', 'Contact form that sends email through EmailJS', 'All content edited from one data file', 'Deployed on Vercel'],
    stack: ['React', 'Vite', 'EmailJS', 'CSS'],
    links: [],
  },
]
