/*
 * Services Component
 * Services section with orange card, mascot, tablet mockup, and team photo
 */

'use client'

import styles from './Services.module.css'

export default function Services() {
  return (
    <section id="servicos" className={styles.services}>
      <div className={styles.servicesContent}>
        {/* Lado Esquerdo - Card Laranja */}
        <div className={styles.leftSide}>
          <div className={styles.orangeCard}>
            <div className={styles.iconStar}>✦</div>

            <img
              src="/images/ARARA.png"
              alt="Mascote Yoop"
              className={styles.araraImage}
            />

            <div className={styles.cardContent}>
              <h2 className={styles.title}>
                Do esboço ao<br />
                impacto visual!
              </h2>
              <p className={styles.description}>
                Ofereço uma ampla gama de serviços<br />
                para impulsionar sua marca para o<br />
                próximo nível e obter os melhores<br />
                resultados.
              </p>
            </div>

            <div className={styles.deviceContainer}>
              <div className={styles.tabletMockup}>
                {/* Placeholder para o tablet - você pode adicionar uma imagem real */}
                <div className={styles.tabletScreen}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Foto */}
        <div className={styles.rightSide}>
          <div className={styles.photoContainer}>
            {/* Placeholder para foto de pessoas trabalhando */}
            <div className={styles.photoPlaceholder}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
