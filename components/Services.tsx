'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './Services.module.css';

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const wiselineServices = [
    {
      icon: "🎥",
      title: "Gravação de Eventos",
      description: "Cobertura profissional completa com equipe especializada, capturando cada momento importante do seu evento."
    },
    {
      icon: "📽️",
      title: "Edição de Vídeo",
      description: "Transformamos suas gravações em conteúdos impactantes com edição criativa, motion graphics e finalização profissional."
    },
    {
      icon: "📊",
      title: "Mídias Pagas",
      description: "Gestão estratégica de campanhas no Google Ads, Meta Ads e outras plataformas para maximizar seu ROI."
    },
    {
      icon: "📱",
      title: "Marketing Digital",
      description: "Estratégias completas de marketing digital incluindo SEO, conteúdo, social media e automação de marketing."
    },
    {
      icon: "🎪",
      title: "Produção de Eventos",
      description: "Planejamento e execução completa de eventos corporativos, lançamentos e experiências imersivas."
    },
    {
      icon: "🎬",
      title: "Conteúdo Audiovisual",
      description: "Criação de conteúdos profissionais para redes sociais, websites e campanhas publicitárias."
    }
  ];

  // Auto-play do carrossel infinito
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // Se chegou ao final, volta para o primeiro (efeito infinito)
        if (prev >= wiselineServices.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000); // 3 segundos

    return () => clearInterval(interval);
  }, [autoPlay, wiselineServices.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= wiselineServices.length - 1) {
        return 0;
      }
      return prev + 1;
    });
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev <= 0) {
        return wiselineServices.length - 1;
      }
      return prev - 1;
    });
    setAutoPlay(false);
  };

  return (
    <>
      {/* Seção Original com Card Laranja */}
      <section id="servicos" className={styles.services}>
        <div className={styles.servicesContent}>
          {/* Lado Esquerdo - Card Laranja */}
          <div className={styles.leftSide}>
            <div className={styles.orangeCard}>
              <div className={styles.iconStar}>✦</div>

              <img
                src="/images/ARARA.png"
                alt="Mascote Wiseline"
                className={styles.araraImage}
              />

              <div className={styles.cardContent}>
                <h2 className={styles.title}>
                  Do cadastro ao<br />
                  cliente fidelizado!
                </h2>
                <p className={styles.description}>
                  Oferecemos todas as ferramentas necessárias<br />
                  para você transformar seu consultório em um<br />
                  negócio digital de sucesso, com resultados<br />
                  reais e mensuráveis.
                </p>
              </div>

              <div className={styles.deviceContainer}>
                <div className={styles.tabletMockup}>
                  <div className={styles.tabletScreen}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito - Foto (placeholder) */}
          <div className={styles.rightSide}>
            <div className={styles.photoContainer}>
              <div className={styles.photoPlaceholder}>
                {/* GIF do Saitama permanece aqui */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nova Seção com Carrossel de Serviços */}
      <section className={styles.wiselineServices}>
        <div className={styles.wiselineContainer}>
          {/* Carrossel Container */}
          <div 
            className={styles.carouselContainer}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            ref={carouselRef}
          >
            {/* Slides */}
            <div 
              className={styles.carouselTrack}
              style={{ 
                transform: `translateX(-${currentSlide * (100 / 6)}%)`,
                width: `${wiselineServices.length * (100 / 6)}%`
              }}
            >
              {wiselineServices.map((service, index) => (
                <div key={index} className={styles.carouselSlide}>
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>
                      <span>{service.icon}</span>
                    </div>
                    <div className={styles.serviceContent}>
                      <h3 className={styles.serviceTitle}>{service.title}</h3>
                      <p className={styles.serviceDescription}>{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplica os primeiros 3 itens para criar efeito infinito */}
              {wiselineServices.slice(0, 3).map((service, index) => (
                <div key={`duplicate-${index}`} className={styles.carouselSlide}>
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>
                      <span>{service.icon}</span>
                    </div>
                    <div className={styles.serviceContent}>
                      <h3 className={styles.serviceTitle}>{service.title}</h3>
                      <p className={styles.serviceDescription}>{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botões de Navegação */}
            <button 
              className={`${styles.carouselButton} ${styles.prevButton}`}
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              <span>‹</span>
            </button>
            <button 
              className={`${styles.carouselButton} ${styles.nextButton}`}
              onClick={nextSlide}
              aria-label="Próximo slide"
            >
              <span>›</span>
            </button>

            {/* Indicadores de Slide */}
            <div className={styles.carouselIndicators}>
              {wiselineServices.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${currentSlide === index ? styles.active : ''}`}
                  onClick={() => {
                    setCurrentSlide(index);
                    setAutoPlay(false);
                  }}
                  aria-label={`Ir para serviço ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;