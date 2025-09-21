import api from "./api";

export type GlossToken = {
  tokenStart: number;
  tokenEnd: number;
  word: string;          // từ đã tách
  pos?: string;          // part-of-speech
  ipa?: string;
  glossVi?: string;      // nghĩa TV
  audioUrl?: string;
  confidence?: number;
  source?: string;       // "phrase-map" | "ai" ...
};

export type PhraseGlossResponse = {
  phraseId: number;
  lang: string;
  source: string;
  tokens: GlossToken[];
};

export async function fetchPhraseGloss(
  phraseId: number,
  lang: string = "en"
): Promise<PhraseGlossResponse> {
  const res = await api.get<PhraseGlossResponse>(
    `/api/tooltip/phrase/${phraseId}`,
    { params: { lang } }
  );
  return res.data;
}