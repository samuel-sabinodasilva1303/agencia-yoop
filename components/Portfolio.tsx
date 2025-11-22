/*
 * Portfolio Component
 * Portfolio carousel section with projects and mascot
 */

'use client'

import { useState, useEffect } from 'react'
import styles from './Portfolio.module.css'

// URLs fornecidas
const imageUrls = [
  'https://gerarmemes.s3.us-east-2.amazonaws.com/memes/thumb/7aacf1da.jpg',
  'https://upload.wikimedia.org/wikipedia/pt/9/9c/Kelly_Key_-_Voc%C3%AA_%C3%A9_o_Cara_%28digital%29.png',
  'https://hermes.dio.me/assets/articles/b71ef709-1539-4da9-9209-0777ee4482e7.jpeg',
  'https://i1.sndcdn.com/artworks-000063244302-eg3m91-t500x500.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaTZSncpY73P2RJfeREPznaAH6Y2L8xBlxlg&s',
  'https://i.pinimg.com/236x/a7/7e/1a/a77e1ae1ef2fdb0966967afd6eeee41c.jpg',
  'https://www.tediado.com.br/wp-content/uploads/2020/09/alguem-colocou-animais-em-coisas-aleatorias-e-a-internet-esta-adorando-20.jpg',
  'https://pt.quizur.com/_image?href=https://img.quizur.com/f/img61a90dab78dbb8.81298788.jpg?lastEdited=1638469044&w=600&h=600&f=webp',
  'https://i.pinimg.com/564x/23/9c/05/239c05c5dcbf173b8642432fe8e460f1.jpg'
]

// Dados dos projetos com números reais de imagens
const portfolioItems = [
  {
    id: 1,
    name: "Projeto Alpha",
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    coverImage: imageUrls[0],
    images: [
      imageUrls[0],
      imageUrls[1], 
      imageUrls[2],
      imageUrls[3],
      imageUrls[4]
    ] // 5 imagens reais
  },
  {
    id: 2,
    name: "Projeto Beta", 
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    coverImage: imageUrls[1],
    images: [
      imageUrls[1],
      imageUrls[2],
      imageUrls[3],
      imageUrls[4],
      imageUrls[5],
      imageUrls[6],
      imageUrls[7],
      imageUrls[8]
    ] // 8 imagens reais
  },
  {
    id: 3,
    name: "Projeto Gamma",
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    coverImage: imageUrls[2],
    images: [
      imageUrls[2],
      imageUrls[3],
      imageUrls[4],
      imageUrls[5],
      imageUrls[6],
      imageUrls[7],
      imageUrls[8],
      imageUrls[0],
      imageUrls[1],
      imageUrls[2],
      imageUrls[3],
      imageUrls[4]
    ] // 12 imagens reais
  },
  {
    id: 4,
    name: "Projeto Delta",
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    coverImage: imageUrls[3],
    images: [
      imageUrls[3],
      imageUrls[4],
      imageUrls[5],
      imageUrls[6],
      imageUrls[7],
      imageUrls[8],
      imageUrls[0],
      imageUrls[1],
      imageUrls[2],
      imageUrls[3],
      imageUrls[4],
      imageUrls[5],
      imageUrls[6],
      imageUrls[7],
      imageUrls[8],
      imageUrls[0],
      imageUrls[1],
      imageUrls[2]
    ] // 18 imagens reais
  }
]

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const [thumbnailPage, setThumbnailPage] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioItems.length)
    }, 3000)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearInterval(interval)
    }
  }, [])

  const openProject = (project, index) => {
    setSelectedProject(project)
    setModalImageIndex(0)
    setThumbnailPage(0)
  }

  const closeProject = () => {
    setSelectedProject(null)
    setModalImageIndex(0)
    setThumbnailPage(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      const newIndex = modalImageIndex === selectedProject.images.length - 1 ? 0 : modalImageIndex + 1
      setModalImageIndex(newIndex)
      updateThumbnailPage(newIndex)
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      const newIndex = modalImageIndex === 0 ? selectedProject.images.length - 1 : modalImageIndex - 1
      setModalImageIndex(newIndex)
      updateThumbnailPage(newIndex)
    }
  }

  const goToImage = (index) => {
    setModalImageIndex(index)
    updateThumbnailPage(index)
  }

  const updateThumbnailPage = (imageIndex) => {
    if (selectedProject && !isMobile) {
      const thumbnailsPerPage = 5
      const newPage = Math.floor(imageIndex / thumbnailsPerPage)
      setThumbnailPage(newPage)
    }
  }

  const nextThumbnails = () => {
    if (selectedProject) {
      const thumbnailsPerPage = 5
      const totalPages = Math.ceil(selectedProject.images.length / thumbnailsPerPage)
      if (thumbnailPage < totalPages - 1) {
        setThumbnailPage(prev => prev + 1)
      }
    }
  }

  const prevThumbnails = () => {
    if (thumbnailPage > 0) {
      setThumbnailPage(prev => prev - 1)
    }
  }

  // Calcular thumbnails para a página atual (apenas desktop)
  const getCurrentThumbnails = () => {
    if (!selectedProject) return []
    
    if (isMobile) {
      return selectedProject.images
    } else {
      const thumbnailsPerPage = 5
      const startIndex = thumbnailPage * thumbnailsPerPage
      const endIndex = startIndex + thumbnailsPerPage
      return selectedProject.images.slice(startIndex, endIndex)
    }
  }

  const currentThumbnails = getCurrentThumbnails()
  const totalPages = selectedProject ? Math.ceil(selectedProject.images.length / 5) : 0

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
                style={{ 
                  backgroundImage: `url(${portfolioItems[currentIndex].coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
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
                const spacing = isMobile ? 160 : 240

                return (
                  <div
                    key={item.id}
                    className={`${styles.projectCard} ${isActive ? styles.active : ''}`}
                    style={{
                      transform: `translateX(${(position - 1.5) * spacing}px) scale(${isActive ? 1.05 : 0.85})`,
                      opacity: position <= 3 ? 1 : 0,
                      zIndex: isActive ? 10 : 5 - Math.abs(position - 1.5),
                    }}
                    onClick={() => openProject(item, index)}
                  >
                    <div
                      className={styles.projectImage}
                      style={{ 
                        backgroundImage: `url(${item.coverImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className={styles.imageCount}>
                        {item.images.length} imagens
                      </div>
                    </div>
                    <div className={styles.projectInfo}>
                      <h3 className={styles.projectName}>{item.name}</h3>
                      <p className={styles.projectImagesCount}>
                        {item.images.length} {item.images.length === 1 ? 'imagem' : 'imagens'}
                      </p>
                    </div>
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

      {/* Modal do Projeto */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeProject}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeProject}>
              ×
            </button>
            
            <div className={styles.modalHeader}>
              <p className={styles.modalSubtitle}>
                {modalImageIndex + 1} de {selectedProject.images.length} imagens
              </p>
            </div>

            <div className={styles.modalCarousel}>
              <button className={styles.carouselButton} onClick={prevImage}>
                ‹
              </button>
              
              <div className={styles.modalImageContainer}>
                <img
                  src={selectedProject.images[modalImageIndex]}
                  alt={`${selectedProject.name} - Imagem ${modalImageIndex + 1}`}
                  className={styles.modalImage}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gbsOjbyBjYXJyZWdvdWE8L3RleHQ+PC9zdmc+'
                  }}
                />
              </div>
              
              <button className={styles.carouselButton} onClick={nextImage}>
                ›
              </button>
            </div>

            {/* Thumbnails com paginação */}
            <div className={styles.thumbnailSection}>
              <div className={styles.thumbnailControls}>
                <div className={styles.imageGrid}>
                  {currentThumbnails.map((image, index) => {
                    const actualIndex = isMobile ? 
                      index : 
                      (thumbnailPage * 5) + index
                    
                    return (
                      <div
                        key={actualIndex}
                        className={`${styles.thumbnail} ${
                          actualIndex === modalImageIndex ? styles.thumbnailActive : ''
                        }`}
                        onClick={() => goToImage(actualIndex)}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${actualIndex + 1}`}
                          className={styles.thumbnailImage}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5FcnJvPC90ZXh0Pjwvc3ZnPg=='
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

  
            </div>

            {/* Indicadores de navegação */}
            <div className={styles.carouselIndicators}>
              {selectedProject.images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === modalImageIndex ? styles.indicatorActive : ''
                  }`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}