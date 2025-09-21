// import { useEffect, useState } from "react";
// import { getPhraseGloss } from "@/api/tooltipService";

// interface TokenGloss {
//   tokenStart: number;
//   tokenEnd: number;
//   word: string;
//   pos: string;
//   ipa: string;
//   glossVi: string;
//   audioUrl: string;
//   confidence: number;
//   source: string;
// }

// export default function QuestionTooltip({ phraseId }: { phraseId: number }) {
//   const [tokens, setTokens] = useState<TokenGloss[]>([]);

//   useEffect(() => {
//     getPhraseGloss(phraseId, "en").then((res) => {
//       setTokens(res.tokens);
//     });
//   }, [phraseId]);

//   return (
//     <div className="flex gap-2 flex-wrap">
//       {tokens.map((t, idx) => (
//         <div key={idx} className="relative group">
//           <span className="px-2 py-1 border rounded cursor-pointer hover:bg-gray-100">
//             {t.word}
//           </span>
//           <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white border shadow-md p-2 rounded w-40 z-10">
//             <p className="text-sm font-semibold">{t.glossVi || "…"}</p>
//             <p className="text-xs text-gray-500 italic">{t.pos}</p>
//             {t.ipa && <p className="text-xs">{t.ipa}</p>}
//             {t.audioUrl && (
//               <button
//                 onClick={() => new Audio(t.audioUrl).play()}
//                 className="text-xs text-blue-600"
//               >
//                 🔊 nghe
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
