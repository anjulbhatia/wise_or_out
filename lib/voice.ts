const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const VOICE_ID = 'pNInz6obpgDQGcFmaJgB' // Adam voice - clear and engaging

export async function textToSpeech(text: string): Promise<string> {
  if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY === 'your-elevenlabs-key-here') {
    console.warn('ElevenLabs API key not configured, skipping TTS')
    return ''
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`ElevenLabs API error: ${error}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    )
    return `data:audio/mp3;base64,${base64}`
  } catch (error) {
    console.error('TTS error:', error)
    return ''
  }
}

export function playAudio(base64Audio: string) {
  if (!base64Audio) return
  
  const audio = new Audio(base64Audio)
  audio.play().catch(console.error)
}
