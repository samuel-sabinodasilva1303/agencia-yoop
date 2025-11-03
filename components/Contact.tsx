/*
 * Contact Component
 * Contact form section with company information
 */

'use client'

import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contato" className={styles.contact}>
      <div className={styles.contactContent}>
        <div className={styles.contactInfo}>
          <h2 className={styles.title}>
            <span className={styles.orange}>Entre em</span>{' '}
            <span className={styles.white}>Contato</span>
          </h2>
          <p className={styles.description}>
            Tem alguma dúvida ou quer iniciar um projeto conosco?
            Preencha o formulário e nossa equipe entrará em contato em breve.
          </p>

          <div className={styles.infoItems}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <div>
                <h4 className={styles.infoTitle}>Email</h4>
                <p className={styles.infoText}>yoop.agencia@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📱</span>
              <div>
                <h4 className={styles.infoTitle}>Telefone</h4>
                <p className={styles.infoText}>(11) 99999-9999</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <h4 className={styles.infoTitle}>Localização</h4>
                <p className={styles.infoText}>São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Seu telefone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="subject"
              placeholder="Assunto"
              value={formData.subject}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="message"
              placeholder="Sua mensagem"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
              rows={6}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
          </button>

          {status === 'success' && (
            <p className={styles.successMessage}>
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </p>
          )}

          {status === 'error' && (
            <p className={styles.errorMessage}>
              Erro ao enviar mensagem. Por favor, tente novamente.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
