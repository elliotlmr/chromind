// ✅ Types générés automatiquement le 2025-05-14
// Ne pas modifier manuellement.

///////////////////////////
// Prisma Models
///////////////////////////

export type Role =
  "ADMIN" |
  "USER";



export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  entries: EmotionsRecord[];
  role: Role;
};

export type Emotion = {
  id: string;
  color: string;
  translations: EmotionTranslation[];
  emotionScores: EmotionScore[];
};

export type EmotionTranslation = {
  id: string;
  language: string;
  name: string;
  emotionId: string;
  emotion: Emotion;
};

export type EmotionScore = {
  id: string;
  emotionId: string;
  emotion: Emotion;
  recordId: string;
  emotionsRecord: EmotionsRecord;
  score: number;
};

export type EmotionsRecord = {
  id: string;
  userId: string;
  user: User;
  createdAt: Date;
  scores: EmotionScore[];
};

///////////////////////////
// NestJS DTOs
///////////////////////////

export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateEmotionDto = {
  color: string;
  translations: EmotionTranslationDto[];
};

export type EmotionTranslationDto = {
  language: string;
  name: string;
};

export type EmotionScoreDto = {
  emotionId: Emotion['id'];
  score: number;
};

export type CreateEmotionsRecordDto = {
  emotions: EmotionScoreDto[];
};
