'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

// Importaciones de iconos de Heroicons
import {
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
}
 from '@heroicons/react/24/outline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faYoutube, 
  faTwitter, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';

// Estructura de navegación
interface NavItem {
  name: string;
  href: string;
  subItems?: NavItem[];
}

// Estructura de Social Links
interface SocialLink {
  label: string;
  icon: any;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'INICIO', href: '/' },
  {
    name: 'MULTIMEDIA',
    href: '#',
    subItems: [
      { name: 'ANIMACIÓN 2D Y 3D', href: '/multimedia/animacion' },
      { name: 'DESARROLLO DE VIDEOJUEGOS', href: '/multimedia/videojuegos' },
      { name: 'SEÑALIZACIÓN DIGITAL', href: '/multimedia/senalizacion' },
      { name: 'CONTENIDOS INTERACTIVOS', href: '/multimedia/interactivos' },
      { name: 'DISEÑO GRÁFICO', href: '/multimedia/diseno-grafico' },
    ],
  },
  {
    name: 'DESARROLLO A MEDIDA',
    href: '#',
    subItems: [
      { name: 'DISEÑO DE PÁGINAS WEB', href: '/desarrollo/web' },
      { name: 'PROGRESSIVE WEB APP', href: '/desarrollo/pwa' },
      { name: 'DESARROLLO DE APLICACIONES', href: '/desarrollo/apps' },
      { name: 'INTRANETS CORPORATIVAS', href: '/desarrollo/intranets' },
      { name: 'EDUCACIÓN VIRTUAL', href: '/desarrollo/e-learning' },
      { name: 'CHATBOTS', href: '/desarrollo/chatbots' },
      { name: 'E-COMMERCE/TIENDAS ONLINE', href: '/desarrollo/ecommerce' },
      { name: 'POLÍTICA DE GOBIERNO DIGITAL', href: '/desarrollo/gobierno-digital' },
    ],
  },
  {
    name: 'MARKETING DIGITAL',
    href: '#',
    subItems: [
      { name: 'POSICIONAMIENTO SEO', href: '/marketing/seo' },
      { name: 'GESTIÓN DE REDES SOCIALES', href: '/marketing/redes-sociales' },
      { name: 'MARKETING DE CONTENIDOS', href: '/marketing/contenidos' },
      { name: 'EMAIL MARKETING', href: '/marketing/email' },
    ],
  },
  { name: 'UX/UI', href: '/ux-ui' },
  { name: 'NOSOTROS', href: '/nosotros' },
];

export default function Header() { 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);

  const socialLinks: SocialLink[] = [
    { label: 'Facebook', icon: faFacebookF, href: '#' }, 
    { label: 'Instagram', icon: faInstagram, href: '#' }, 
    { label: 'YouTube', icon: faYoutube, href: '#' }, 
    { label: 'Twitter', icon: faTwitter, href: '#' }, 
    { label: 'LinkedIn', icon: faLinkedinIn, href: '#' }, 
  ];

  // Componente de Enlace de Menú de Escritorio
  const DesktopMenuLink: React.FC<{ item: NavItem }> = ({ item }) => {
    const baseClasses =
      'block px-3 py-4 text-sm text-white transition duration-150 ease-in-out uppercase cursor-pointer rounded-lg ' + 
      'font-bold tracking-widest my-auto'; 

    const hoverClasses =
      'hover:bg-[var(--terceary)] hover:text-[var(--secondary)]'; 

    const activeClasses = 
        item.name === 'INICIO' 
        ? 'bg-[var(--terceary)] text-[var(--secondary)]'
        : '';
        
    return (
      <Link
        href={item.href}
        className={`${baseClasses} ${hoverClasses} ${activeClasses}`}
      >
        {item.name}
      </Link>
    );
  };

  // Componente de Submenú de Escritorio (Dropdown)
  const DesktopSubMenu: React.FC<{ items: NavItem[] }> = ({ items }) => (
    <div className="absolute right-0 mt-[-4px] w-64 rounded-lg shadow-2xl z-50">

      <div 
        className="absolute -top-3 w-0 h-0 border-l-[11px] border-r-[11px] border-b-[11px] border-l-transparent border-r-transparent border-b-[var(--primary)]"
        style={{ right: '0.9rem' }} 
        aria-hidden="true" 
      />
      
      {/* Triángulo de Relleno */}
      <div 
        className="absolute -top-[10px] w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-[var(--secondary)]"
        style={{ right: '1rem' }} 
        aria-hidden="true" 
      />

      {/* CUERPO DEL SUBMENÚ */}
      <div className="rounded-lg bg-[var(--secondary)] text-[var(--primary)] overflow-hidden">
        <div className="py-2 px-2 space-y-1">
          {items.map((subItem) => (
            <Link
              key={subItem.name}
              href={subItem.href}
              className="block"
            >
                <div
                    className="px-2 py-2 text-sm font-bold uppercase rounded-md transition duration-150 ease-in-out hover:bg-[#20c78a]"
                >
                    {subItem.name}
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // Menú Móvil (Hamburguesa)
  const MobileMenu: React.FC = () => {
    const menuClasses = isMobileMenuOpen
      ? 'block opacity-100 max-h-screen transition-all duration-500 ease-out'
      : 'hidden opacity-0 max-h-0 overflow-hidden lg:hidden';

    const toggleSubMenu = (name: string) => {
      setOpenMobileSubMenu(openMobileSubMenu === name ? null : name);
    };

    return (
      <div className={`lg:hidden ${menuClasses} bg-[#320455] shadow-inner`}>
        <div className="p-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between items-center w-full">
                {item.subItems ? (
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[var(--primary)]"
                  >
                    {item.name}
                    </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[var(--primary)]"
                  >
                    {item.name}
                  </Link>
                )}

                {item.subItems && (
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className="p-2 text-white hover:text-[var(--secondary)]"
                  >
                    {openMobileSubMenu === item.name ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              {item.subItems && openMobileSubMenu === item.name && (
                <div className="mt-1 space-y-1 pl-6 border-l border-white/20">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-[var(--primary)]"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a
            href="tel:+573058873351"
            className="mt-4 flex items-center justify-center w-full px-4 py-3 border border-transparent text-base font-medium rounded-full text-[var(--primary)] bg-[var(--secondary)] hover:bg-[#2fe5ad] transition duration-150 ease-in-out shadow-lg"
          >
            <PhoneIcon className="w-5 h-5 mr-2" />
            CLIC PARA LLAMAR
          </a>
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[var(--terceary)] text-white py-2 px-4 text-sm"> 
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Llámenos */}
          <a 
            href="tel:+573058873351"
            className="flex items-center text-[var(--secondary)] transition duration-150 hover:text-[#2fe5ad]" 
          >
            <PhoneIcon className="w-4 h-4 mr-2" /> 
            Llámenos (+57) 305 887 33 51
          </a>

          {/* Idiomas y Redes Sociales */}
          <div className="flex items-center space-x-4">
            {/* Idiomas */}
            <div className="space-x-2 font-bold hidden sm:block">
              {/* Idioma activo */}
              <span className="text-[var(--secondary)]">ES</span> 
              <span className="cursor-pointer hover:text-gray-300">EN</span>
            </div>
            {/* Redes Sociales */}
            <div className="flex space-x-3 text-[var(--secondary)]"> 
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="hover:text-gray-300 flex items-center" aria-label={link.label}>
                  <FontAwesomeIcon 
                    icon={link.icon} 
                    className="w-4 h-4"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Desktop & Mobile Burger Button) */}
      <nav className="bg-[var(--primary)] shadow-lg px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-[5rem]"> 
          <div className="flex-shrink-0">
            <Link href="/">
              <Image 
                src="/img/logo.png"
                alt="Geostigma Logo" 
                width={180}
                height={40}
                className="w-auto h-auto"
                priority
              />
            </Link>
          </div>

          {/* Menú de Escritorio */}
          <div className="hidden lg:flex space-x-1 h-full items-center">
            {navItems.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setActiveSubMenu(item.name)}
                onMouseLeave={() => setActiveSubMenu(null)}
                className="relative" 
              >
                <DesktopMenuLink item={item} />

                {/* Submenú Dropdown */}
                {item.subItems && activeSubMenu === item.name && (
                  <DesktopSubMenu items={item.subItems} />
                )}
              </div>
            ))}
          </div>

          {/* Botón de Menú Móvil */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              // Botón de llamar que se convierte en ícono de hamburguesa
              className={`p-2 rounded-lg ${isMobileMenuOpen ? 'text-white hover:text-[var(--secondary)]' : 'bg-[var(--secondary)] text-[var(--primary)] hover:bg-[#2fe5ad]'}`}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Menú Móvil Desplegable */}
      <MobileMenu />
    </header>
  );
}
