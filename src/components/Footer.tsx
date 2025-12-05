// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/', label: 'Top' },
    { href: '/about', label: 'About' },
    { href: '/characters', label: 'Character' },
    { href: '/line-log', label: 'Log' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/search', label: 'Search' },
  ];

  return (
    <footer className="footer-001">
      <Link href="/">
        <Image
          src="/rogo/chaos-yaminabe-logo.png"
          alt="やみなべロゴ"
          width={130}
          height={130}
          className="footer-001__logo"
        />
      </Link>
      <nav>
        <ul className="footer-001__list">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="footer-001__link font-[family-name:var(--font-megrim)]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="footer-001__copyright font-[family-name:var(--font-megrim)]">
        © {currentYear} やみなべ All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;


