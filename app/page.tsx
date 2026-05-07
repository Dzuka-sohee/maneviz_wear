import CardNav from '@/components/navbar/CardNav';

const navItems = [
  {
    label: 'About',
    bgColor: '#1B1722',
    textColor: '#fff',
    links: [
      { label: 'Company', ariaLabel: 'About Company', href: '/about' },
      { label: 'Careers', ariaLabel: 'About Careers', href: '/careers' },
    ],
  },
  {
    label: 'Projects',
    bgColor: '#2F293A',
    textColor: '#fff',
    links: [
      { label: 'Featured', ariaLabel: 'Featured Projects', href: '/projects' },
      { label: 'Case Studies', ariaLabel: 'Project Case Studies', href: '/case-studies' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#2F293A',
    textColor: '#fff',
    links: [
      { label: 'Email', ariaLabel: 'Email us', href: 'mailto:hello@manevizwear.com' },
      { label: 'Twitter', ariaLabel: 'Twitter', href: 'https://twitter.com' },
      { label: 'LinkedIn', ariaLabel: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-100">
      {/* CardNav harus berada di dalam elemen yang punya `position: relative` */}
      <CardNav
        logo="/images/maneviz.png" 
        logoAlt="MANEVIZ WEAR"
        items={navItems}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        theme="light"
      />

      {/* Konten halaman kamu di sini */}
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800">MANEVIZ WEAR</h1>
      </div>
    </main>
  );
}