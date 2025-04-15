export type EmotionTranslation = {
  id: string
  language: string
  name: string
}

export type Emotion = {
  id: string
  color: string
  translations: EmotionTranslation[]
}
