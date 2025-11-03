/*
 * ScrollToTop Component
 * Innovative scroll-to-top button with rocket animation
 */

'use client'

import { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.css'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          className={styles.scrollToTop}
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
        >
          <div className={styles.rocketContainer}>
            <div className={styles.rocket}>🚀</div>
            <div className={styles.flame}></div>
          </div>
        </button>
      )}
    </>
  )
}
