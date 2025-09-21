// @ts-nocheck
import React, { useState, useRef } from 'react';
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Label } from '@/components/reuseables/Management/build/label';
import { Textarea } from '@/components/reuseables/Management/build/textarea';
import { Mic, MicOff, Play, Square, Upload, Volume2, VolumeX } from 'lucide-react';

type SpeakingData = {
  targetSentence: string;
  languageCode: string;
  audioUrl?: string;
  audioFile?: File;
  pronunciationTips?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // seconds
};

type Props = {
  data: SpeakingData;
  onChange: (data: SpeakingData) => void;
};

const SpeakingEditor: React.FC<Props> = ({ data, onChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(data.audioUrl || null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update data when props change
  React.useEffect(() => {
    if (data.audioUrl && data.audioUrl !== audioUrl) {
      setAudioUrl(data.audioUrl);
    }
  }, [data.audioUrl]);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Create file from blob
        const audioFile = new File([audioBlob], 'speaking-sample.wav', { type: 'audio/wav' });
        
        onChange({
          ...data,
          audioUrl: url,
          audioFile: audioFile
        });
        
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  // Play audio
  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Stop audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      onChange({
        ...data,
        audioUrl: url,
        audioFile: file
      });
    }
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle audio events
  const handleAudioEnded = () => setIsPlaying(false);
  const handleAudioPause = () => setIsPlaying(false);
  const handleAudioPlay = () => setIsPlaying(true);

  return (
    <div className="mb-2">
      <Label className="text-base font-semibold mb-4 block">Speaking Exercise</Label>
      
      {/* Target Sentence */}
      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Target Sentence</Label>
        <Textarea
          value={data.targetSentence}
          onChange={(e) => onChange({ ...data, targetSentence: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 h-20 text-base"
          placeholder="Enter the sentence students should practice speaking..."
        />
      </div>

      {/* Language & Difficulty */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Language</Label>
          <Input_admin
            value={data.languageCode}
            onChange={(e) => onChange({ ...data, languageCode: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 h-10 text-base"
            placeholder="e.g., en, vi, ja"
          />
        </div>
        <div>
          <Label className="text-sm font-medium mb-2 block">Difficulty</Label>
          <select
            value={data.difficulty}
            onChange={(e) => onChange({ ...data, difficulty: e.target.value as any })}
            className="w-full rounded-xl border-2 border-gray-200 h-10 text-base px-3"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Time Limit */}
      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Time Limit (seconds, optional)</Label>
        <Input_admin
          type="number"
          value={data.timeLimit || ''}
          onChange={(e) => onChange({ ...data, timeLimit: parseInt(e.target.value) || undefined })}
          className="w-full rounded-xl border-2 border-gray-200 h-10 text-base"
          placeholder="e.g., 30 (leave empty for no limit)"
        />
      </div>

      {/* Audio Recording/Upload */}
      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Sample Audio (Optional)</Label>
        
        {/* Audio Controls */}
        <div className="flex items-center gap-3 mb-3">
          {!isRecording && !audioUrl && (
            <Button_admin
              type="button"
              onClick={startRecording}
              className="rounded-full p-3 bg-red-500 hover:bg-red-600 text-white"
            >
              <Mic className="w-5 h-5" />
            </Button_admin>
          )}
          
          {isRecording && (
            <Button_admin
              type="button"
              onClick={stopRecording}
              className="rounded-full p-3 bg-red-600 hover:bg-red-700 text-white"
            >
              <Square className="w-5 h-5" />
            </Button_admin>
          )}
          
          {audioUrl && !isRecording && (
            <div className="flex items-center gap-2">
              <Button_admin
                type="button"
                onClick={isPlaying ? stopAudio : playAudio}
                className="rounded-full p-3 bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isPlaying ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button_admin>
              
              <Button_admin
                type="button"
                onClick={() => {
                  setAudioUrl(null);
                  onChange({ ...data, audioUrl: undefined, audioFile: undefined });
                }}
                className="rounded-full p-3 bg-gray-500 hover:bg-gray-600 text-white"
              >
                <MicOff className="w-5 h-5" />
              </Button_admin>
            </div>
          )}
          
          <Button_admin
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold flex items-center gap-1"
          >
            <Upload className="w-4 h-4" />
            Upload Audio
          </Button_admin>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="flex items-center gap-2 text-red-600">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Recording... {formatDuration(recordingDuration)}</span>
          </div>
        )}
        
        {audioUrl && !isRecording && (
          <div className="text-green-600 text-sm font-medium">
            ✓ Audio sample ready
          </div>
        )}
      </div>

      {/* Pronunciation Tips */}
      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Pronunciation Tips (Optional)</Label>
        <Textarea
          value={data.pronunciationTips || ''}
          onChange={(e) => onChange({ ...data, pronunciationTips: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 h-16 text-base"
          placeholder="Provide pronunciation tips or common mistakes to avoid..."
        />
      </div>

      {/* Hidden Audio Element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnded}
          onPause={handleAudioPause}
          onPlay={handleAudioPlay}
          preload="metadata"
          className="hidden"
        />
      )}

      {/* Instructions */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-xl">
        <strong>Instructions:</strong>
        <ul className="mt-1 space-y-1">
          <li>• Enter the target sentence students should practice</li>
          <li>• Set language code (e.g., "en" for English)</li>
          <li>• Optionally record or upload a sample audio</li>
          <li>• Provide pronunciation tips to help students</li>
          <li>• Set time limit if you want to restrict recording duration</li>
        </ul>
      </div>
    </div>
  );
};

export default SpeakingEditor;
