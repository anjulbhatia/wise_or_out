import { NextRequest, NextResponse } from 'next/server'

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY
const isConfigured = (key: string | undefined) => !!key && key !== 'your-api-key-here'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const question = body.question || ''
    const correctAnswer = body.correctAnswer || ''
    const userAnswer = body.userAnswer || ''
    
    let context = ''
    
    // Use Firecrawl to search for explanation context
    if (isConfigured(FIRECRAWL_API_KEY)) {
      try {
        const searchRes = await fetch('https://api.firecrawl.dev/v1/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
          },
          body: JSON.stringify({ 
            query: `${correctAnswer} ${question}`, 
            limit: 2 
          }),
        })
        
        if (searchRes.ok) {
          const searchData = await searchRes.json()
          if (searchData.data?.[0]?.url) {
            const scrapeRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
              },
              body: JSON.stringify({
                url: searchData.data[0].url,
                formats: ['markdown'],
              }),
            })
            
            if (scrapeRes.ok) {
              const scrapeData = await scrapeRes.json()
              context = scrapeData.markdown?.slice(0, 800) || ''
            }
          }
        }
      } catch (e) {
        console.warn('Firecrawl search failed:', e)
      }
    }

    // Generate explanation
    let explanation = ''
    
    if (context) {
      explanation = `The correct answer is ${correctAnswer}. ${context.slice(0, 200)}`
    } else {
      // Fallback explanations based on common knowledge
      explanation = generateFallbackExplanation(question || '', correctAnswer || '')
    }

    return NextResponse.json({ explanation, context })
  } catch (error) {
    console.error('Explanation API error:', error)
    return NextResponse.json({ 
      explanation: 'The correct answer is the one shown.', 
      context: '' 
    }, { status: 200 })
  }
}

function generateFallbackExplanation(question: string, correctAnswer: string): string {
  // Generic explanations for common topics
  const lowerQuestion = question.toLowerCase()
  
  if (lowerQuestion.includes('capital') || lowerQuestion.includes('country')) {
    return `${correctAnswer} is the correct answer. This is a well-established geographical fact.`
  }
  if (lowerQuestion.includes('who') || lowerQuestion.includes('person')) {
    return `${correctAnswer} is the right choice. This is a historical or cultural fact.`
  }
  if (lowerQuestion.includes('what') || lowerQuestion.includes('what is')) {
    return `The answer is ${correctAnswer}. This is the correct response based on established knowledge.`
  }
  if (lowerQuestion.includes('how many') || lowerQuestion.includes('number')) {
    return `${correctAnswer} is the correct number. This is a factual piece of information.`
  }
  if (lowerQuestion.includes('which')) {
    return `${correctAnswer} is the correct answer. This is based on established facts.`
  }
  
  return `The correct answer is ${correctAnswer}.`
}
