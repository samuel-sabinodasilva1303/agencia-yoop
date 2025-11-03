/*
 * Footer Component
 * Footer with copyright and developer information
 */

'use client'

import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          <p className={styles.copyrightText}>
            © {currentYear} <span className={styles.orange}>Yoop</span>. Todos os direitos reservados.
          </p>
        </div>
        <div className={styles.developer}>
          <p className={styles.developerText}>
            Desenvolvido por{' '}
            <a
              href="https://www.wiseline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.wiselineLink}
            >
              Wiseline
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
