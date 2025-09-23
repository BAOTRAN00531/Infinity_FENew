import  api  from './api';

export interface SpeakingAssessmentRequest {
  target: string;
  transcript: string;
  language?: string;
}

export interface SpeakingScoreResponse {
  scoreTotal: number;
  pronScore: number;
  completeness: number;
  fluency: number;
  tips: string[];
}

export interface SpeakingAssessmentWithAudioRequest {
  target: string;
  transcript: string;
  language?: string;
}

class SpeakingService {
  /**
   * AI Assessment với transcript (không cần audio)
   */
  async assessWithAi(request: SpeakingAssessmentRequest): Promise<SpeakingScoreResponse> {
    const response = await api.post('/ai/speaking/ai-assess', request);
    return response.data;
  }

  /**
   * Test assessment với query params
   */
  async testAssess(target: string, transcript: string, language = 'en'): Promise<SpeakingScoreResponse> {
    const response = await api.post(`/api/ai/speaking/test-assess?target=${encodeURIComponent(target)}&transcript=${encodeURIComponent(transcript)}&language=${language}`);
    return response.data;
  }

  /**
   * Upload audio file + transcript để assess
   */
  async uploadAndAssessWithTranscript(
    audioFile: File,
    target: string,
    transcript: string,
    language = 'en'
  ): Promise<SpeakingScoreResponse> {
    const formData = new File([
      audioFile,
      new Blob([target], { type: 'text/plain' }),
      new Blob([transcript], { type: 'text/plain' }),
      new Blob([language], { type: 'text/plain' })
    ], 'form-data');

    // Cách đúng để tạo FormData
    const formDataCorrect = new FormData();
    formDataCorrect.append('audio', audioFile);
    formDataCorrect.append('target', target);
    formDataCorrect.append('transcript', transcript);
    formDataCorrect.append('language', language);

    const response = await api.post('/ai/speaking/upload-assess-with-transcript', formDataCorrect, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * Convert audio blob to base64 và gửi
   */
  async assessWithBase64(
    audioBlob: Blob,
    target: string,
    transcript: string,
    language = 'en'
  ): Promise<SpeakingScoreResponse> {
    // Convert blob to base64
    const base64 = await this.blobToBase64(audioBlob);
    
    // Gửi qua JSON endpoint
    return this.assessWithAi({
      target,
      transcript,
      language
    });
  }

  /**
   * Convert Blob to Base64
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:audio/wav;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export const speakingService = new SpeakingService();
