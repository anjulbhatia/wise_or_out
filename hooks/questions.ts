import type { Category, Question } from '@/lib/types'

const DEFAULT_QUESTIONS: Record<Category, Question[]> = {
  surprise: [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: "Paris", difficulty: "easy" },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars", difficulty: "easy" },
    { question: "What is 7 x 8?", options: ["54", "56", "58", "64"], answer: "56", difficulty: "easy" },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], answer: "Da Vinci", difficulty: "medium" },
    { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific", difficulty: "medium" },
    { question: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: "1945", difficulty: "medium" },
    { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: "Au", difficulty: "hard" },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], answer: "300,000 km/s", difficulty: "hard" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare", difficulty: "medium" },
    { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: "Blue Whale", difficulty: "easy" }
  ],
  ai: [
    { question: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Interface", "Advanced Integration", "Algorithmic Innovation"], answer: "Artificial Intelligence", difficulty: "easy" },
    { question: "What is ChatGPT?", options: ["A social network", "A language model", "A video game", "A search engine"], answer: "A language model", difficulty: "easy" },
    { question: "Which company created ChatGPT?", options: ["Google", "Microsoft", "OpenAI", "Meta"], answer: "OpenAI", difficulty: "medium" },
    { question: "What is machine learning?", options: ["A programming language", "A subset of AI", "A hardware", "A database"], answer: "A subset of AI", difficulty: "medium" },
    { question: "What is a neural network?", options: ["Internet connection", "AI algorithm structure", "Computer hardware", "Data storage"], answer: "AI algorithm structure", difficulty: "hard" },
    { question: "What is natural language processing?", options: ["Speech recognition", "Image recognition", "Text understanding", "Both speech and text"], answer: "Both speech and text", difficulty: "hard" },
    { question: "What is the Turing test?", options: ["A programming challenge", "AI intelligence test", "A game", "A security protocol"], answer: "AI intelligence test", difficulty: "hard" },
    { question: "What is deep learning?", options: ["Advanced AI", "Complex programming", "Neural networks with many layers", "Machine learning type"], answer: "Neural networks with many layers", difficulty: "hard" },
    { question: "What is Computer Vision?", options: ["AI seeing images", "Camera technology", "Photo editing", "Video games"], answer: "AI seeing images", difficulty: "medium" },
    { question: "What is Reinforcement Learning?", options: ["Teaching with rewards", "Learning from data", "Memorization", "Reading books"], answer: "Teaching with rewards", difficulty: "hard" }
  ],
  entertainment: [
    { question: "Who directed Inception?", options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Martin Scorsese"], answer: "Christopher Nolan", difficulty: "medium" },
    { question: "What movie won Best Picture in 2020?", options: ["1917", "Joker", "Parasite", "Once Upon a Time"], answer: "Parasite", difficulty: "medium" },
    { question: "Who plays Iron Man in MCU?", options: ["Chris Evans", "Robert Downey Jr", "Chris Hemsworth", "Mark Ruffalo"], answer: "Robert Downey Jr", difficulty: "easy" },
    { question: "What is the highest-grossing film?", options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars"], answer: "Avatar", difficulty: "medium" },
    { question: "Who sang 'Thriller'?", options: ["Prince", "Michael Jackson", "Whitney Houston", "Stevie Wonder"], answer: "Michael Jackson", difficulty: "easy" },
    { question: "What show is 'Winter is Coming' from?", options: ["The Witcher", "Game of Thrones", "Vikings", "Lord of the Rings"], answer: "Game of Thrones", difficulty: "easy" },
    { question: "Who created Mickey Mouse?", options: ["Warner Bros", "Walt Disney", "Pixar", "DreamWorks"], answer: "Walt Disney", difficulty: "easy" },
    { question: "What is the longest TV series?", options: ["The Simpsons", "Friends", "Breaking Bad", "Game of Thrones"], answer: "The Simpsons", difficulty: "medium" },
    { question: "Who played The Joker in The Dark Knight?", options: ["Jared Leto", "Jack Nicholson", "Heath Ledger", "Joaquin Phoenix"], answer: "Heath Ledger", difficulty: "medium" },
    { question: "What streaming service is 'Stranger Things' on?", options: ["Amazon Prime", "Netflix", "Disney+", "HBO Max"], answer: "Netflix", difficulty: "easy" }
  ],
  sports: [
    { question: "How many players on a soccer team?", options: ["9", "10", "11", "12"], answer: "11", difficulty: "easy" },
    { question: "Which country won 2022 FIFA World Cup?", options: ["France", "Brazil", "Argentina", "Germany"], answer: "Argentina", difficulty: "medium" },
    { question: "How many Grand Slams are there?", options: ["2", "3", "4", "5"], answer: "4", difficulty: "easy" },
    { question: "Who has the most NBA championships?", options: ["Lakers", "Celtics", "Bulls", "Warriors"], answer: "Celtics", difficulty: "medium" },
    { question: "What sport is played at Wimbledon?", options: ["Golf", "Cricket", "Tennis", "Rugby"], answer: "Tennis", difficulty: "easy" },
    { question: "How long is a marathon?", options: ["26.2 miles", "24 miles", "30 miles", "20 miles"], answer: "26.2 miles", difficulty: "medium" },
    { question: "Who holds the 100m world record?", options: ["Usain Bolt", "Carl Lewis", "Tyson Gay", "Asafa Powell"], answer: "Usain Bolt", difficulty: "easy" },
    { question: "What is the national sport of Japan?", options: ["Judo", "Karate", "Sumo", "Baseball"], answer: "Sumo", difficulty: "medium" },
    { question: "How many holes in a golf course?", options: ["9", "12", "18", "21"], answer: "18", difficulty: "easy" },
    { question: "Which country invented cricket?", options: ["Australia", "India", "England", "South Africa"], answer: "England", difficulty: "medium" }
  ],
  world: [
    { question: "What is the largest country by area?", options: ["China", "USA", "Canada", "Russia"], answer: "Russia", difficulty: "easy" },
    { question: "What is the most spoken language?", options: ["English", "Spanish", "Mandarin", "Hindi"], answer: "Mandarin", difficulty: "medium" },
    { question: "What year did the Titanic sink?", options: ["1910", "1912", "1914", "1916"], answer: "1912", difficulty: "medium" },
    { question: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], answer: "Yen", difficulty: "easy" },
    { question: "Which continent is the Sahara Desert?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa", difficulty: "easy" },
    { question: "What is the UN headquarters?", options: ["Geneva", "Paris", "New York", "London"], answer: "New York", difficulty: "medium" },
    { question: "Who was the first person on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], answer: "Neil Armstrong", difficulty: "easy" },
    { question: "What is the smallest country?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: "Vatican City", difficulty: "medium" },
    { question: "What year did Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], answer: "1989", difficulty: "medium" },
    { question: "What is the longest river?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile", difficulty: "medium" }
  ]
}

export async function fetchQuestions(category: Category): Promise<Question[]> {
  const apiKey = process.env.FIRECRAWL_API_KEY
  
  if (apiKey && apiKey !== 'your-firecrawl-key-here') {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category })
      })
      if (response.ok) {
        const data = await response.json()
        if (data.questions?.length >= 10) {
          return data.questions
        }
      }
    } catch (e) {
      console.warn('API fetch failed, using defaults')
    }
  }
  
  const selected = category === 'surprise' 
    ? DEFAULT_QUESTIONS.surprise 
    : DEFAULT_QUESTIONS[category] || DEFAULT_QUESTIONS.surprise
  
  return [...selected].sort(() => Math.random() - 0.5).slice(0, 10)
}
