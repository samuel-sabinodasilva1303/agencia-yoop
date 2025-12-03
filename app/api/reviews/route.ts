import { NextResponse } from 'next/server'
import { addReview, getReviews } from '@/lib/db'

export async function GET() {
  try {
    const reviews = getReviews()
    return NextResponse.json(reviews, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar avaliações' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, role, rating, comment } = body

    if (!name || !company || !role || !rating || !comment) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'A avaliação deve ser entre 1 e 5 estrelas' },
        { status: 400 }
      )
    }

    // Validar tamanho do comentário
    if (comment.length > 1000) {
      return NextResponse.json(
        { error: 'O comentário não pode ter mais de 1000 caracteres' },
        { status: 400 }
      )
    }

    // Salvar no banco de dados
    const newReview = addReview({
      name: name.trim(),
      company: company.trim(),
      role: role.trim(),
      rating: parseInt(rating),
      comment: comment.trim(),
      avatar: null
    })

    return NextResponse.json(
      { 
        message: 'Avaliação enviada com sucesso! Obrigado pelo seu feedback.',
        review: newReview
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao processar avaliação:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar avaliação' },
      { status: 500 }
    )
  }
}

