import TooltipSentence from "@/pages/TooltipSentence";

export default function LessonPlayground() {
  // ví dụ phraseId đã có sẵn từ DB khi render bài
  const phraseId = 123; 

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Viết lại bằng Tiếng Việt</h2>
      <TooltipSentence phraseId={phraseId} lang="en" />
    </div>
  );
}
