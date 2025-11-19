import React, { useState } from 'react';
import { QRConfig, AIState, AIStatus } from '../types';
import { generateTheme } from '../services/geminiService';
import { Sparkles, Loader2, ArrowRight, Palette } from 'lucide-react';

interface AIFeaturesProps {
  setConfig: React.Dispatch<React.SetStateAction<QRConfig>>;
}

const AIFeatures: React.FC<AIFeaturesProps> = ({ setConfig }) => {
  const [prompt, setPrompt] = useState('');
  const [aiState, setAiState] = useState<AIState>({ status: AIStatus.IDLE, message: '' });

  // Handle Theme Generation
  const handleThemeGen = async () => {
    if (!prompt.trim()) return;
    setAiState({ status: AIStatus.LOADING, message: 'AI đang phân tích...' });

    try {
      const theme = await generateTheme(prompt);
      setConfig((prev) => ({
        ...prev,
        fgColor: theme.fgColor,
        bgColor: theme.bgColor,
      }));
      setAiState({ status: AIStatus.SUCCESS, message: 'Đã áp dụng màu mới!' });
      setTimeout(() => setAiState({ status: AIStatus.IDLE, message: '' }), 3000);
    } catch (error) {
      setAiState({ status: AIStatus.ERROR, message: 'Lỗi kết nối. Thử lại sau.' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#FFF9C4] to-[#FFFDE7] rounded-2xl border border-yellow-400/50 overflow-hidden shadow-[0_8px_30px_rgba(255,235,59,0.2)] relative group hover:shadow-[0_8px_30px_rgba(255,235,59,0.4)] transition-all duration-300">
      {/* Decorative Shine */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-400 opacity-20 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="p-5 border-b border-yellow-200/50 flex items-center gap-3 bg-white/50 backdrop-blur-sm">
        <div className="p-2 bg-yellow-400 rounded-lg shadow-sm text-[#D71920]">
            <Sparkles size={20} fill="currentColor" className="animate-pulse" />
        </div>
        <div>
             <h2 className="font-black text-[#D71920] uppercase text-sm tracking-wider">
            AI Gợi ý Màu Sắc
            </h2>
            <p className="text-[10px] font-bold text-yellow-700 uppercase tracking-wide">Công nghệ Gemini 2.5</p>
        </div>
       
      </div>

      {/* Body */}
      <div className="p-6">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-700">
              Nhập chủ đề sự kiện (ví dụ: "Đại hội Đảng", "Kỷ niệm 30/4").
            </p>
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Mô tả chủ đề..."
                onKeyDown={(e) => e.key === 'Enter' && handleThemeGen()}
                className="w-full bg-white border-2 border-yellow-300 rounded-xl py-3 pl-4 pr-14 text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-4 focus:ring-yellow-400/30 focus:border-yellow-500 transition-all shadow-inner"
              />
              <button
                onClick={handleThemeGen}
                disabled={!prompt || aiState.status === AIStatus.LOADING}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#D71920] hover:bg-red-700 rounded-lg text-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <ArrowRight size={18} strokeWidth={3} />
              </button>
            </div>
          </div>

        {/* Status Indicator */}
        {aiState.status !== AIStatus.IDLE && (
          <div className={`mt-4 p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold animate-fade-in border-2 ${
            aiState.status === AIStatus.ERROR ? 'bg-red-50 text-red-700 border-red-200' : 
            aiState.status === AIStatus.SUCCESS ? 'bg-green-50 text-green-700 border-green-200' : 
            'bg-yellow-50 text-yellow-800 border-yellow-200'
          }`}>
            {aiState.status === AIStatus.LOADING ? <Loader2 className="animate-spin" size={16} /> : null}
            {aiState.status === AIStatus.SUCCESS ? <Palette size={16} /> : null}
            <span className="uppercase">{aiState.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFeatures;