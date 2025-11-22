/*
 * Hero Component
 * Main hero section with agency branding and watermark
 */

'use client'

import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Remove esta linha: <div className={styles.heroBackground}></div> */}
      
      <div className={styles.heroContent}>
        {/* Lado Direito - Logo e Texto (agora centralizado) */}
        <div className={styles.rightSide}>
          <div className={styles.watermark}>
            <img
              src="/images/marca-dagua.png"
              alt=""
              className={styles.watermarkImage}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.logoContainer}>
              <img
                src="/images/logo-yoop-contorno.png"
                alt="Yoop"
                className={styles.logoImage}
              />
            </div>

            <p className={styles.tagline}>
              <span className={styles.orange}>ELEVAMOS</span>{' '}
              <span className={styles.white}>A SUA</span>
              <br />
              <span className={styles.white}>PRESENÇA</span>{' '}
              <span className={styles.orange}>DIGITAL!</span>
            </p>

            <div className={styles.ctaButtons}>
              <a href="#contato" className={styles.ctaPrimary}>
                INICIAR PROJETO
              </a>
              <a href="#portfolio" className={styles.ctaSecondary}>
                VER PORTFÓLIO
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}