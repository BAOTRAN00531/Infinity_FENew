import React, { useState, useRef, useEffect } from 'react';
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Label } from '@/components/reuseables/Management/build/label';
import { Textarea } from '@/components/reuseables/Management/build/textarea';
import { AnswerCreateDto } from '@/api/types';
import { toast } from 'react-toastify';
import api from '@/api/api';

interface ListeningInputEditorProps {
  answers: AnswerCreateDto[];
  onAnswersChange: (answers: AnswerCreateDto[]) => void;
  audioUrl?: string;
  onAudioChange: (audioFile: File | null, audioUrl: string | null) => void;
}

const ListeningInputEditor: React.FC<ListeningInputEditorProps> = ({
  answers,
  onAnswersChange,
  audioUrl,
  onAudioChange
}) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(audioUrl || null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TTS controls
  const [ttsLang, setTtsLang] = useState<string>('en-US');
  const [ttsGender, setTtsGender] = useState<'MALE' | 'FEMALE'>('FEMALE');
  const [ttsVoice, setTtsVoice] = useState<string>('');
  const [loadingTts, setLoadingTts] = useState<boolean>(false);

  // Ensure we have at least one answer
  useEffect(() => {
    if (answers.length === 0) {
      handleAddAnswer();
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('audio/')) {
      toast.error('Vui lòng chọn file audio hợp lệ', { autoClose: 1200 });
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setAudioFile(file);
    setPreviewUrl(url);
    onAudioChange(file, url);
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onAudioChange(null, null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddAnswer = () => {
    const newAnswers = [
      ...answers,
      {
        answerText: '',
        caseSensitive: false,
        position: answers.length + 1
      }
    ];
    onAnswersChange(newAnswers);
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    // Update positions
    const updatedAnswers = newAnswers.map((answer, i) => ({
      ...answer,
      position: i + 1
    }));
    onAnswersChange(updatedAnswers);
  };

  const handleAnswerChange = (
    index: number,
    field: keyof AnswerCreateDto,
    value: any
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = {
      ...updatedAnswers[index],
      [field]: value
    };
    onAnswersChange(updatedAnswers);
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-orange-700 mb-2">Hướng dẫn</h3>
        <p className="text-orange-600">
          Tạo câu hỏi nghe và nhập. Tải lên file audio và thêm các câu trả lời được chấp nhận.
          Người học sẽ nghe audio và nhập câu trả lời.
        </p>
      </div>

      {/* TTS Generate (no upload needed) */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Tạo audio bằng TTS</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-sm">Ngôn ngữ (xx-YY)</Label>
            <Input_admin value={ttsLang} onChange={(e) => setTtsLang(e.target.value || 'en-US')} placeholder="en-US" />
          </div>
          <div>
            <Label className="text-sm">Giọng</Label>
            <select className="w-full border rounded-lg h-10 px-3" value={ttsGender} onChange={(e) => setTtsGender((e.target.value as 'MALE'|'FEMALE') || 'FEMALE')}>
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
          </div>
          <div>
            <Label className="text-sm">Voice name (tuỳ chọn)</Label>
            <Input_admin value={ttsVoice} onChange={(e) => setTtsVoice(e.target.value)} placeholder="en-US-Standard-B" />
          </div>
        </div>
        <div className="flex gap-3">
          <Button_admin type="button" disabled={loadingTts}
            onClick={async () => {
              const text = (answers[0]?.answerText || '').trim();
              if (!text) { toast.error('Nhập đáp án trước khi tạo TTS', { autoClose: 1200 }); return; }
              try {
                setLoadingTts(true);
                const res = await api.get<string>('/tts/synthesize', { params: { text, languageCode: ttsLang, voice: ttsVoice || undefined, gender: ttsGender } });
                const base64 = res.data || '';
                if (!base64) { toast.warn('Không có audio trả về – thử voice khác', { autoClose: 1500 }); return; }
                const url = `data:audio/mp3;base64,${base64}`;
                setPreviewUrl(url);
                onAudioChange(null, url);
              } catch (err) {
                console.error(err);
                toast.error('Tạo TTS thất bại', { autoClose: 1200 });
              } finally { setLoadingTts(false); }
            }}
          >{loadingTts ? 'Đang tạo...' : 'Tạo audio từ đáp án'}</Button_admin>
          {previewUrl && (
            <Button_admin type="button" variant="destructive" onClick={handleRemoveAudio}>Xóa</Button_admin>
          )}
        </div>
        {previewUrl && (
          <div className="mt-4">
            <Label className="block mb-2">Nghe thử:</Label>
            <audio ref={audioRef} controls src={previewUrl} className="w-full" />
          </div>
        )}
      </div>

      {/* Audio Upload Section */}
      <div className="space-y-4">
        <Label htmlFor="audio-upload" className="text-lg font-semibold">
          File Audio
        </Label>
        <div className="flex items-center gap-4">
          <Input_admin
            id="audio-upload"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="flex-1"
          />
          {previewUrl && (
            <Button_admin
              type="button"
              variant="destructive"
              onClick={handleRemoveAudio}
            >
              Xóa
            </Button_admin>
          )}
        </div>

        {/* Audio Preview */}
        {previewUrl && (
          <div className="mt-4">
            <Label className="block mb-2">Nghe thử:</Label>
            <audio
              ref={audioRef}
              controls
              src={previewUrl}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Answers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Câu trả lời được chấp nhận</Label>
          <Button_admin
            type="button"
            variant="outline"
            onClick={handleAddAnswer}
          >
            Thêm câu trả lời
          </Button_admin>
        </div>

        <div className="space-y-4">
          {answers.map((answer, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <Textarea
                  value={answer.answerText}
                  onChange={(e) =>
                    handleAnswerChange(index, 'answerText', e.target.value)
                  }
                  placeholder="Nhập câu trả lời"
                  className="w-full"
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`case-sensitive-${index}`}
                  checked={answer.caseSensitive}
                  onChange={(e) =>
                    handleAnswerChange(index, 'caseSensitive', e.target.checked)
                  }
                  className="mr-2"
                />
                <Label htmlFor={`case-sensitive-${index}`} className="text-sm">
                  Phân biệt hoa thường
                </Label>
              </div>
              <Button_admin
                type="button"
                variant="destructive"
                onClick={() => handleRemoveAnswer(index)}
                disabled={answers.length <= 1}
              >
                Xóa
              </Button_admin>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-8 p-6 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Xem trước</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          {previewUrl ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <audio controls src={previewUrl} className="w-full max-w-md" />
              </div>
              <div className="mt-4">
                <Label className="block mb-2">Câu trả lời:</Label>
                <Input_admin
                  type="text"
                  placeholder="Nhập câu trả lời của bạn..."
                  disabled
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Tải lên file audio để xem trước
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListeningInputEditor;
