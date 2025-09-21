// @ts-nocheck
import { MicIcon, MicOffIcon, PlayIcon, SquareIcon, CheckIcon, LoaderIcon } from "lucide-react";
import React, { useState, useRef } from "react";
import { useQuizz } from "../../../../contexts/QuizzContext";
import { cn } from "../../../../lib/utils";
import Footer from "../../../layouts/lesson/Footer";
import Button from "../../../reuseables/Button";
import Notification from "../../../reuseables/Notification";
import { speakingService, SpeakingScoreResponse } from "../../../../api/speakingService";

function SpeakingQuiz() {
  const {
    state: { hasChecked, isCorrect, audioBlob, audioUrl },
    setAnswered,
    setAudioBlob,
    setAudioUrl,
    clearAudio,
  } = useQuizz();

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  // AI Assessment states
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<SpeakingScoreResponse | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update answered state when recording is available
  React.useEffect(() => {
    setAnswered(!!audioBlob);
  }, [audioBlob, setAnswered]);

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
        const newAudioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(newAudioBlob);
        const url = URL.createObjectURL(newAudioBlob);
        setAudioUrl(url);
        
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

  // Play recorded audio
  const playRecording = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause recording playback
  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Format duration to MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle audio playback events
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioPause = () => {
    setIsPlaying(false);
  };

  const handleAudioPlay = () => {
    setIsPlaying(true);
  };

  // AI Assessment function
  const handleAiAssessment = async () => {
    if (!audioBlob) {
      alert('Vui lòng ghi âm trước khi đánh giá');
      return;
    }

    setIsAssessing(true);
    try {
      // TODO: Lấy target sentence từ context hoặc props
      const targetSentence = "I suffer from vitiligo"; // Placeholder - cần lấy từ quiz data
      const transcript = "I suffer from vitiligo"; // Placeholder - cần STT service

      // Convert audio blob to file
      const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
      
      const result = await speakingService.uploadAndAssessWithTranscript(
        audioFile,
        targetSentence,
        transcript,
        'en'
      );

      setAssessmentResult(result);
      setShowAssessment(true);
      setAnswered(true);
      
      // Set correct/incorrect based on score
      // Có thể tùy chỉnh threshold
      const isPass = result.scoreTotal >= 70;
      // setCorrect(isPass); // Cần implement trong context

    } catch (error) {
      console.error('AI Assessment failed:', error);
      alert('Đánh giá thất bại. Vui lòng thử lại.');
    } finally {
      setIsAssessing(false);
    }
  };

  // Reset assessment
  const resetAssessment = () => {
    setAssessmentResult(null);
    setShowAssessment(false);
    clearAudio();
    setRecordingDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <div className="question mt-24 mx-24 space-y-24">
      <h1 className="text-xl font-bold">Ghi âm lại những gì bạn đã nghe thấy</h1>
      
      {/* Audio reference (hidden) */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnded}
          onPause={handleAudioPause}
          onPlay={handleAudioPlay}
          preload="metadata"
        />
      )}
      
      <div className="flex flex-col gap-16 items-center">
        {/* Recording controls */}
        <div className="flex gap-16 items-center">
          {!isRecording && !audioBlob && (
            <Button
              onClick={startRecording}
              className="rounded-full p-4 !min-w-20 h-20 aspect-square bg-red-500 hover:bg-red-600"
            >
              <MicIcon className="text-white" size={48} strokeWidth={4} />
            </Button>
          )}
          
          {isRecording && (
            <Button
              onClick={stopRecording}
              className="rounded-full p-4 !min-w-20 h-20 aspect-square bg-red-600 hover:bg-red-700"
            >
              <SquareIcon className="text-white" size={32} strokeWidth={4} />
            </Button>
          )}
          
          {audioBlob && !isRecording && (
            <div className="flex gap-4 items-center">
              <Button
                onClick={isPlaying ? pauseRecording : playRecording}
                className="rounded-full p-4 !min-w-16 h-16 aspect-square bg-blue-500 hover:bg-blue-600"
              >
                <PlayIcon 
                  className={cn([
                    "text-white transition-transform",
                    isPlaying && "scale-75"
                  ])} 
                  size={24} 
                  strokeWidth={4} 
                />
              </Button>
              
              <Button
                onClick={resetAssessment}
                className="rounded-full p-4 !min-w-16 h-16 aspect-square bg-gray-500 hover:bg-gray-600"
              >
                <MicOffIcon className="text-white" size={24} strokeWidth={4} />
              </Button>
              
              {/* AI Assessment Button */}
              <Button
                onClick={handleAiAssessment}
                disabled={isAssessing}
                className="rounded-full p-4 !min-w-16 h-16 aspect-square bg-green-500 hover:bg-green-600 disabled:bg-gray-400"
              >
                {isAssessing ? (
                  <LoaderIcon className="text-white animate-spin" size={24} strokeWidth={4} />
                ) : (
                  <CheckIcon className="text-white" size={24} strokeWidth={4} />
                )}
              </Button>
            </div>
          )}
        </div>
        
        {/* Recording status and duration */}
        <div className="flex flex-col items-center gap-4">
          {isRecording && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-500 font-medium">Đang ghi âm...</span>
            </div>
          )}
          
          {recordingDuration > 0 && (
            <div className="text-lg font-mono">
              {formatDuration(recordingDuration)}
            </div>
          )}
          
          {audioBlob && !isRecording && (
            <div className="text-green-600 font-medium">
              ✓ Đã ghi âm thành công
            </div>
          )}
          
          {!audioBlob && !isRecording && (
            <div className="text-slate-400 text-center">
              Nhấn nút microphone để bắt đầu ghi âm
            </div>
          )}
        </div>
      </div>
      
      {/* AI Assessment Results */}
      {showAssessment && assessmentResult && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-lg font-bold mb-4 text-center">Kết quả đánh giá AI</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{assessmentResult.scoreTotal}%</div>
              <div className="text-sm text-gray-600">Tổng điểm</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{assessmentResult.pronScore}%</div>
              <div className="text-sm text-gray-600">Phát âm</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded">
              <div className="text-2xl font-bold text-yellow-600">{assessmentResult.completeness}%</div>
              <div className="text-sm text-gray-600">Đầy đủ</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">{assessmentResult.fluency}%</div>
              <div className="text-sm text-gray-600">Trôi chảy</div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Gợi ý cải thiện:</h4>
            <div className="bg-gray-50 p-3 rounded text-sm">
              {assessmentResult.tips.map((tip, index) => (
                <p key={index} className="mb-1">{tip}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {hasChecked && !showAssessment ? (
        <Notification type={isCorrect ? "correct" : "incorrect"} />
      ) : !showAssessment ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default SpeakingQuiz;
