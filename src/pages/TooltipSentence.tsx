import React, { useEffect, useMemo, useState } from "react";
import { fetchPhraseGloss, GlossToken } from "@/api/tooltipService";

type Props = {
  phraseId: number;
  lang?: string;       // mã ngôn ngữ của câu (en, US, …)
  className?: string;
};

export default function TooltipSentence({ phraseId, lang = "en", className }: Props) {
  const [tokens, setTokens] = useState<GlossToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr(null);
    fetchPhraseGloss(phraseId, lang)
      .then((data) => {
        if (!mounted) return;
        setTokens(data.tokens ?? []);
      })
      .catch((e) => {
        console.error("fetchPhraseGloss failed:", e);
        setErr("Không tải được chú giải.");
        setTokens([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [phraseId, lang]);

  const byOrder = useMemo(
    () => [...tokens].sort((a, b) => a.tokenStart - b.tokenStart),
    [tokens]
  );

  if (loading) return <div className={className}>Đang tải…</div>;
  if (err) return <div className={className + " text-red-600"}>{err}</div>;
  if (!byOrder.length) return <div className={className}>Không có dữ liệu tooltip.</div>;

  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {byOrder.map((t, idx) => (
        <TokenWithTooltip key={`${t.tokenStart}-${t.tokenEnd}-${idx}`} token={t} />
      ))}
    </div>
  );
}

function TokenWithTooltip({ token }: { token: GlossToken }) {
  const play = () => {
    if (token.audioUrl) {
      new Audio(token.audioUrl).play().catch(() => {});
    }
  };

  return (
    <div className="relative group select-none">
      <span className="px-2 py-1 rounded border border-slate-300 cursor-pointer bg-white/70 hover:bg-white">
        {token.word}
      </span>

      {/* Tooltip */}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 bottom-full mb-2
          hidden group-hover:block z-50
          w-56 rounded-xl border border-slate-200 bg-white shadow-xl
          p-3
        "
      >
        <div className="flex items-baseline justify-between">
          <strong className="text-sm">{token.glossVi || "…"}</strong>
          {token.confidence != null && (
            <span className="text-[10px] text-slate-400">{Math.round((token.confidence ?? 0) * 100)}%</span>
          )}
        </div>
        {token.pos && <div className="text-xs text-slate-500 mt-1 italic">{token.pos}</div>}
        {token.ipa && <div className="text-xs text-slate-700 mt-1">{token.ipa}</div>}

        <div className="mt-2 flex gap-2 items-center">
          {token.audioUrl && (
            <button
              onClick={play}
              className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
            >
              🔊 Nghe
            </button>
          )}
          {token.source && (
            <span className="ml-auto text-[10px] text-slate-400">src: {token.source}</span>
          )}
        </div>

        {/* caret */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-r border-b border-slate-200" />
      </div>
    </div>
  );
}
