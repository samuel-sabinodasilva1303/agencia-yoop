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

const DB_FILE = path.join(process.cwd(), 'data', 'reviews.json')
// lib/db.ts
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

// Para Vercel, usaremos uma solução serverless
// Nota: O estado será resetado entre deploys, mas funciona para demonstração

let memoryCache: Review[] | null = null

// Dados iniciais
const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Maria Silva',
    company: 'Boutique Elegance',
    role: 'Proprietária',
    rating: 5,
    comment: 'A Yoop transformou completamente nossa presença digital! As fotos profissionais e o conteúdo criado aumentaram nossas vendas em 40%.',
    avatar: null,
    date: '2025-10-15'
  },
  {
    id: 2,
    name: 'João Santos',
    company: 'Tech Solutions',
    role: 'CEO',
    rating: 5,
    comment: 'Excelente trabalho na criação do nosso site. Profissionais muito competentes e atenciosos.',
    avatar: null,
    date: '2025-09-20'
  },
  {
    id: 3,
    name: 'Ana Oliveira',
    company: 'Consultoria Plus',
    role: 'Diretora de Marketing',
    rating: 4,
    comment: 'Ótima parceria. O redesign da nossa identidade visual foi fundamental para o reposicionamento da marca.',
    avatar: null,
    date: '2025-08-10'
  }
]

// Funções otimizadas para Vercel
export function getReviews(): Review[] {
  try {
    // Retorna cache ou dados iniciais
    if (memoryCache) {
      return [...memoryCache].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }
    
    return [...initialReviews].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('Erro ao buscar reviews:', error)
    return [...initialReviews]
  }
}

export function addReview(reviewData: Omit<Review, 'id' | 'date'>): Review {
  try {
    const newReview: Review = {
      ...reviewData,
      id: Date.now(), // ID único baseado em timestamp
      date: new Date().toISOString().split('T')[0]
    }
    
    // Atualiza o cache em memória
    const currentReviews = memoryCache || initialReviews
    memoryCache = [newReview, ...currentReviews]
    
    return newReview
    
  } catch (error) {
    console.error('Erro ao adicionar review:', error)
    throw error
  }
}

export function getReviewById(id: number): Review | null {
  const reviews = memoryCache || initialReviews
  return reviews.find(r => r.id === id) || null
}