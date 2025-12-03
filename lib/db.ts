/*
 * Database utility
 * SQLite database setup for reviews storage
 * 
 * Para produção, recomenda-se usar:
 * - Turso (https://turso.tech) - SQLite gerenciado
 * - Supabase - PostgreSQL gratuito
 * - PlanetScale - MySQL serverless
 * 
 * Esta implementação usa um arquivo JSON simples que funciona bem
 * para landing pages pequenas. Para produção, migre para um dos serviços acima.
 */

import fs from 'fs'
import path from 'path'

const DB_FILE = path.join(process.cwd(), 'data', 'reviews.db.json')

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

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

export function getReviews(): Review[] {
  try {
    ensureDataDir()
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Erro ao ler avaliações:', error)
    return []
  }
}

export function addReview(review: Omit<Review, 'id' | 'date'>): Review {
  try {
    ensureDataDir()
    const reviews = getReviews()

    const newReview: Review = {
      id: Date.now(),
      ...review,
      date: new Date().toISOString().split('T')[0]
    }

    reviews.push(newReview)

    fs.writeFileSync(DB_FILE, JSON.stringify(reviews, null, 2), 'utf-8')

    return newReview
  } catch (error) {
    console.error('Erro ao adicionar avaliação:', error)
    throw error
  }
}

export function getReviewById(id: number): Review | null {
  const reviews = getReviews()
  return reviews.find((r) => r.id === id) || null
}

export function deleteReview(id: number): boolean {
  try {
    ensureDataDir()
    const reviews = getReviews()
    const filtered = reviews.filter((r) => r.id !== id)

    if (filtered.length === reviews.length) {
      return false
    }

    fs.writeFileSync(DB_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error)
    return false
  }
}

