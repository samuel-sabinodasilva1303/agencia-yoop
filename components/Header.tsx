/*
 * Header Component
 * Navigation header with active section detection and mobile hamburger menu
 */

'use client'

import { useState, useEffect } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'sobre', 'servicos', 'portfolio', 'briefing', 'contato']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <li className={`${styles.menuItem} ${activeSection === 'sobre' ? styles.active : ''}`}>
              <span className={styles.arrowLeft}>▼</span>
              <a href="#sobre" onClick={handleMenuClick}>SOBRE NÓS</a>
              <span className={styles.arrowTop}>▼</span>
            </li>
            <li className={`${styles.menuItem} ${activeSection === 'servicos' ? styles.active : ''}`}>
              <a href="#servicos" onClick={handleMenuClick}>SERVIÇOS</a>
              <span className={styles.arrowTop}>▼</span>
            </li>
            <li className={`${styles.menuItem} ${activeSection === 'portfolio' ? styles.active : ''}`}>
              <a href="#portfolio" onClick={handleMenuClick}>PORTFÓLIO</a>
              <span className={styles.arrowTop}>▼</span>
            </li>
            <li className={`${styles.menuItem} ${activeSection === 'briefing' ? styles.active : ''}`}>
              <a href="#briefing" onClick={handleMenuClick}>BRIEFING</a>
              <span className={styles.arrowTop}>▼</span>
            </li>
            <li className={`${styles.menuItem} ${activeSection === 'contato' ? styles.active : ''}`}>
              <a href="#contato" onClick={handleMenuClick}>CONTATO</a>
              <span className={styles.arrowTop}>▼</span>
              <span className={styles.arrowRight}>▼</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
