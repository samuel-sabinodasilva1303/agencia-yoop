/*
 * Reviews Component
 * Client testimonials section with reviews cards
 */

'use client'

import { useState, useEffect } from 'react'
import styles from './Reviews.module.css'

interface Review {
  id: number
  name: string
  company: string
  role: string
  rating: number
  comment: string
  avatar: string | null
  date: string
}

const MAX_COMMENT_LENGTH = 200

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showForm, setShowForm] = useState(false)
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set())
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    rating: 5,
    comment: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Carregar avaliações da API (que busca do banco de dados)
    const loadReviews = async () => {
      try {
        // Primeiro tenta carregar da API
        const response = await fetch('/api/reviews')
        if (response.ok) {
          const data = await response.json()
          setReviews(data)
        } else {
          // Fallback para JSON estático
          const jsonResponse = await fetch('/data/reviews.json')
          if (jsonResponse.ok) {
            const data = await jsonResponse.json()
            setReviews(data)
          } else {
            throw new Error('Não foi possível carregar avaliações')
          }
        }
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error)
        // Fallback para dados mockados
        const jsonResponse = await fetch('/data/reviews.json')
        jsonResponse
          .json()
          .then((data) => setReviews(data))
          .catch(() => {
            setReviews([
              {
                id: 1,
                name: 'Maria Silva',
                company: 'Boutique Elegance',
                role: 'Proprietária',
                rating: 5,
                comment:
                  'A Yoop transformou completamente nossa presença digital! As fotos profissionais e o conteúdo criado aumentaram nossas vendas em 40%.',
                avatar: null,
                date: '2025-10-15'
              }
            ])
          })
      }
    }

    loadReviews()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? styles.starFilled : styles.starEmpty}
      >
        ★
      </span>
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    })
  }

  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  const shouldTruncate = (comment: string) => {
    return comment.length > MAX_COMMENT_LENGTH
  }

  const getDisplayComment = (comment: string, reviewId: number) => {
    const isExpanded = expandedReviews.has(reviewId)
    if (!shouldTruncate(comment) || isExpanded) {
      return comment
    }
    return comment.substring(0, MAX_COMMENT_LENGTH) + '...'
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRatingClick = (rating: number) => {
    setFormData({
      ...formData,
      rating
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setFormStatus('success')

        const reviewsResponse = await fetch('/api/reviews')
        if (reviewsResponse.ok) {
          const updatedReviews = await reviewsResponse.json()
          setReviews(updatedReviews)
        } else {
          const newReview: Review = {
            id: data.review.id,
            name: formData.name,
            company: formData.company,
            role: formData.role,
            rating: formData.rating,
            comment: formData.comment,
            avatar: null,
            date: data.review.date
          }
          setReviews([newReview, ...reviews])
        }

        setFormData({
          name: '',
          company: '',
          role: '',
          rating: 5,
          comment: ''
        })

        setTimeout(() => {
          setFormStatus('idle')
          setShowForm(false)
        }, 3000)
      } else {
        const error = await response.json()
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 5000)
      }
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  return (
    <section id="avaliacoes" className={styles.reviews}>
      <div className={styles.reviewsContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>⭐</span>
            AVALIAÇÕES
          </div>

          <h2 className={styles.title}>
            <span className={styles.orange}>O que nossos</span>
            <br />
            <span className={styles.white}>clientes dizem</span>
          </h2>

          <p className={styles.description}>
            Confira a opinião de quem já trabalhou conosco e transformou sua
            presença digital
          </p>

          <button
            className={styles.addReviewBtn}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : '+ Deixar Avaliação'}
          </button>
        </div>

        {/* Formulário de Avaliação */}
        {showForm && (
          <div className={styles.formContainer}>
            <form className={styles.reviewForm} onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>Deixe sua avaliação</h3>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="company"
                    placeholder="Nome da empresa *"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="role"
                  placeholder="Seu cargo/função *"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.ratingSelector}>
                <label className={styles.ratingLabel}>Avaliação *</label>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.ratingStar} ${star <= formData.rating ? styles.ratingStarActive : ''
                        }`}
                      onClick={() => handleRatingClick(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="comment"
                  placeholder="Sua avaliação *"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  className={styles.textarea}
                  rows={5}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Enviando...' : 'Enviar Avaliação'}
              </button>

              {formStatus === 'success' && (
                <p className={styles.successMessage}>
                  Avaliação enviada com sucesso! Obrigado pelo seu feedback.
                </p>
              )}

              {formStatus === 'error' && (
                <p className={styles.errorMessage}>
                  Erro ao enviar avaliação. Por favor, tente novamente.
                </p>
              )}
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className={styles.avatarImage}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className={styles.clientInfo}>
                  <h3 className={styles.clientName}>{review.name}</h3>
                  <p className={styles.clientRole}>
                    {review.role} • {review.company}
                  </p>
                </div>
              </div>

              <div className={styles.rating}>{renderStars(review.rating)}</div>

              <div className={styles.commentContainer}>
                <p className={styles.comment}>
                  {expandedReviews.has(review.id)
                    ? review.comment
                    : review.comment.length > MAX_COMMENT_LENGTH
                      ? review.comment.slice(0, MAX_COMMENT_LENGTH) + '...'
                      : review.comment}
                </p>

                {review.comment.length > MAX_COMMENT_LENGTH && (
                  <button
                    className={styles.readMoreBtn}
                    onClick={() => toggleReviewExpansion(review.id)}
                  >
                    {expandedReviews.has(review.id) ? 'Ver menos' : 'Ver mais'}
                  </button>
                )}
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.date}>{formatDate(review.date)}</span>
              </div>

              {/* Decorative element */}
              <div className={styles.cardDecoration}></div>
            </div>
          ))}
        </div>

        {/* Mascot decoration */}
        <div className={styles.araraContainer}>
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

