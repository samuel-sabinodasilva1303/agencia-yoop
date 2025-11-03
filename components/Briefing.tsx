/*
 * Briefing Component
 * Creative process briefing section with checklist and team photo
 */

'use client'

import styles from './Briefing.module.css'

export default function Briefing() {
  const briefingItems = [
    {
      title: 'BRIEFING INICIAL',
      description: 'O briefing é a base sólida sobre a qual construímos os projetos que refletem quem você é'
    },
    {
      title: 'PESQUISA E CONCEITO',
      description: 'Desenvolvemos um plano estratégico personalizado'
    },
    {
      title: 'GERAÇÃO DE ALTERNATIVAS',
      description: 'Nossa equipe coloca a mão na massa e cria soluções inovadoras'
    }
  ]

  return (
    <section id="briefing" className={styles.briefing}>
      <div className={styles.briefingContent}>
        {/* Lado Esquerdo - Lista */}
        <div className={styles.leftSide}>
          <div className={styles.itemsList}>
            {briefingItems.map((item, index) => (
              <div key={index} className={styles.briefingItem}>
                <div className={styles.checkmark}>✓</div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lado Direito - Imagem e Cards */}
        <div className={styles.rightSide}>
          <div className={styles.photoContainer}>
            <div className={styles.photoPlaceholder}></div>

            {/* Badge sobre a imagem */}
            <div className={styles.badge}>
              <span className={styles.icon}>💡</span>
              Como funciona o processo criativo?
            </div>

            {/* Arara no canto superior direito */}
            <div className={styles.araraContainer}>
              <img
                src="/images/ARARA.png"
                alt="Mascote Yoop"
                className={styles.araraImage}
              />
            </div>

            {/* Card laranja no canto inferior direito */}
            <div className={styles.resultCard}>
              <div className={styles.cardIcon}>✓</div>
              <p className={styles.cardText}>
                <strong>Campanhas inteligentes</strong> geram resultados reais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
