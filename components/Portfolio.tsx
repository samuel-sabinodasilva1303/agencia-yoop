/*
 * Portfolio Component
 * Portfolio carousel section with projects and mascot
 */

'use client'

import { useState, useEffect } from 'react'
import styles from './Portfolio.module.css'

const portfolioItems = [
  {
    id: 1,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 2,
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  },
  {
    id: 3,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 4,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  }
]

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioItems.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.portfolioContent}>
        {/* Área Superior - Projetos */}
        <div className={styles.projectsArea}>
          {/* Tablet no canto esquerdo */}
          <div className={styles.tabletContainer}>
            <div className={styles.tablet}>
              <div
                className={styles.tabletScreen}
                style={{ background: portfolioItems[currentIndex].gradient }}
              ></div>
            </div>
            <div className={styles.iconStar}>✦</div>
          </div>

          {/* Carrossel de Projetos */}
          <div className={styles.carouselContainer}>
            <div className={styles.projectsCarousel}>
              {portfolioItems.map((item, index) => {
                const position = (index - currentIndex + portfolioItems.length) % portfolioItems.length
                const isActive = position === 0

                return (
                  <div
                    key={item.id}
                    className={`${styles.projectCard} ${isActive ? styles.active : ''}`}
                    style={{
                      transform: `translateX(${(position - 1.5) * 240}px) scale(${isActive ? 1.05 : 0.85})`,
                      opacity: position <= 3 ? 1 : 0,
                      zIndex: isActive ? 10 : 5 - Math.abs(position - 1.5),
                    }}
                  >
                    <div
                      className={styles.projectImage}
                      style={{ background: item.gradient }}
                    ></div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Arara no canto direito */}
          <div className={styles.araraContainer}>
            <img
              src="/images/ARARA.png"
              alt="Mascote Yoop"
              className={styles.araraImage}
            />
          </div>
        </div>

        {/* Área Inferior - Texto */}
        <div className={styles.infoArea}>
          <div className={styles.leftInfo}>
            <h2 className={styles.title}>
              <span className={styles.orange}>Nosso</span><br />
              <span className={styles.black}>portfólio! (:</span>
            </h2>
          </div>
          <div className={styles.rightInfo}>
            <div className={styles.badge}>
              CONHEÇA ALGUNS DE NOSSOS PROJETOS MAIS CRIATIVOS E IMPACTANTES
            </div>
            <p className={styles.description}>
              Conheça a eleição dos meus trabalhos em design gráfico, que incluem
              criação de identidades visuais, peças para redes sociais, layouts
              para impressos, outdoors e projetos especiais desenvolvidos com
              criatividade, estratégia e propósito.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
