'use client'; // ¡IMPORTANTE: Esta línea debe estar siempre en la parte superior!

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import {
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

// Estructura de navegación
interface NavItem {
  name: string;
  href: string;
  subItems?: NavItem[];
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

  const socialLinks = [
    { label: 'Facebook', icon: 'f', href: '#' }, 
    { label: 'Instagram', icon: 'i', href: '#' }, 
    { label: 'YouTube', icon: 'y', href: '#' }, 
    { label: 'Twitter', icon: 't', href: '#' }, 
    { label: 'LinkedIn', icon: 'l', href: '#' }, 
  ];

  // Componente de Enlace de Menú de Escritorio
  const DesktopMenuLink: React.FC<{ item: NavItem }> = ({ item }) => {
    // La clase 'h-full' es clave para que el div de hover tome toda la altura
    const baseClasses =
      'block px-3 py-2 text-sm font-medium text-white transition duration-150 ease-in-out uppercase border-b-2 h-full inline-flex items-center cursor-pointer';

    // hover:bg-[#320455] (un morado más oscuro que --primary para el hover)
    const hoverClasses =
      'hover:border-[var(--secondary)] hover:bg-[#320455] border-transparent';

    return (
      <Link
        href={item.href}
        className={`${baseClasses} ${hoverClasses} ${
            // Aplicar bg oscuro al elemento "INICIO" si es el activo
            // Puedes ajustar esta lógica para que el elemento activo se determine de otra forma (e.g., ruta actual)
            item.name === 'INICIO' ? 'bg-[#320455]' : '' 
        }`}
      >
        {item.name}
      </Link>
    );
  };

  // Componente de Submenú de Escritorio (Dropdown)
  const DesktopSubMenu: React.FC<{ items: NavItem[] }> = ({ items }) => (
    // 'mt-[1px]' para que el submenú toque el borde inferior del header
    <div className="absolute left-0 mt-[1px] w-64 origin-top-right rounded-b-lg shadow-lg">
      <div className="rounded-b-lg bg-[var(--secondary)] text-[var(--text-color)] ring-1 ring-black ring-opacity-5">
        <div className="py-1">
          {items.map((subItem) => (
            <Link
              key={subItem.name}
              href={subItem.href}
              // El hover es ahora Primary (Morado Oscuro) con texto blanco, como se ve en las capturas
              className="block px-4 py-2 text-sm hover:bg-[var(--primary)] hover:text-white transition duration-150 ease-in-out"
            >
              {subItem.name}
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
      {/* 1. Top Bar */}
      <div className="bg-[var(--primary)] text-white py-2 px-4 text-sm"> 
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Llámenos - ACTUALIZADO: Enlace clickeable y en color secondary */}
          <a 
            href="tel:+573058873351"
            className="flex items-center text-[var(--secondary)] transition duration-150 hover:text-[#2fe5ad]" 
          >
            <PhoneIcon className="w-4 h-4 mr-2" /> 
            Llámenos (+57) 305 887 33 51
          </a>

          {/* Idiomas y Redes Sociales */}
          <div className="flex items-center space-x-4">
            {/* Idiomas (oculto en pantallas pequeñas) */}
            <div className="space-x-2 font-bold hidden sm:block">
              {/* Idioma activo 'ES' en color --secondary */}
              <span className="text-[var(--secondary)]">ES</span> 
              <span className="cursor-pointer hover:text-gray-300">EN</span>
            </div>
            {/* Redes Sociales */}
            {/* Iconos de redes sociales en color --secondary */}
            <div className="flex space-x-3 text-[var(--secondary)]"> 
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="hover:text-gray-300" aria-label={link.label}>
                  {link.icon} {/* Reemplaza con SVG real si los obtienes */}
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
                src="/img/logo.png" // Asegúrate de que esta ruta sea correcta para tu proyecto (public/img/logo.png)
                alt="Geostigma Logo" 
                width={180}
                height={40}
                className="w-auto h-auto"
                priority
              />
            </Link>
          </div>

          {/* Menú de Escritorio */}
          <div className="hidden lg:flex space-x-1 h-full">
            {navItems.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setActiveSubMenu(item.name)}
                onMouseLeave={() => setActiveSubMenu(null)}
                className="relative h-full"
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