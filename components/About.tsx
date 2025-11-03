/*
 * About Component
 * About section with company description, photo card, and mascot
 */

'use client'

import styles from './About.module.css'

export default function About() {
  return (
    <section id="sobre" className={styles.about}>
      <div className={styles.aboutContent}>
        {/* Card Laranja de Fundo */}
        <div className={styles.orangeCard}></div>

        {/* Lado Esquerdo - Texto */}
        <div className={styles.leftContent}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🎯</span>
            MARKETING DIGITAL
          </div>

          <h2 className={styles.title}>
            <span className={styles.orange}>Somos a Yoop,</span>
            <br />
            <span className={styles.white}>muito prazer! (:</span>
          </h2>

          <p className={styles.description}>
            Destaque-se no digital com fotografias e vídeos profissionais.
            Criamos conteúdos que atraem clientes e valoriza sua marca!
          </p>
        </div>

        {/* Centro - Card com Foto */}
        <div className={styles.centerContent}>
          <div className={styles.photoCard}>
            <div className={styles.photoFrame}>
              {/* Placeholder para foto - você pode adicionar uma imagem real aqui */}
              <div className={styles.photoPlaceholder}></div>
            </div>
            <div className={styles.cardLabel}>
              <span className={styles.checkmark}>✓</span>
              <p>
                Empresas e<br />
                profissionais geram<br />
                resultados reais.
              </p>
            </div>
          </div>
        </div>

        {/* Direita - Arara */}
        <div className={styles.rightContent}>
          <img
            src="/images/ARARA.png"
            alt="Mascote Yoop"
            className={styles.araraImage}
          />
        </div>
      </div>
    </section>
  )
}
