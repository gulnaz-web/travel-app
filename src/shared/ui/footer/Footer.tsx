'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Footer.module.scss'

const navItems = [
  {
    icon: 'home',
    link: '/',
  },
  {
    icon: 'explore',
    link: '/explore',
  },
  {
    icon: 'place',
    link: '/place/kyoto',
  },
  {
    icon: 'person_outline',
    link: '/profile',
  },
]

export const Footer = () => {
  const pathname = usePathname()

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            href={item.link}
            className={`${styles.link} ${pathname === item.link ? styles.active : ''}`}
            key={item.icon}
          >
            <span className="material-icons-outlined">{item.icon}</span>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
