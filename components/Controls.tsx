import React, { useRef, useState } from 'react';
import { QRConfig } from '../types';
import { Type, Layout, Flag, Info, Upload, Image as ImageIcon, Link as LinkIcon, Check, Star } from 'lucide-react';

interface ControlsProps {
  config: QRConfig;
  setConfig: React.Dispatch<React.SetStateAction<QRConfig>>;
  defaultLogoUrl: string;
}

const Controls: React.FC<ControlsProps> = ({ config, setConfig, defaultLogoUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customUrl, setCustomUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'default'>('upload');

  const handleChange = (key: keyof QRConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoToggle = (checked: boolean) => {
    // When enabling, we check if there is a logoUrl already, if not we default to standard MTTQ logo for convenience
    setConfig((prev) => ({
        ...prev,
        includeLogo: checked,
        logoUrl: checked ? (prev.logoUrl || defaultLogoUrl) : null 
    }));
    
    // If no logo was selected before, set tab to default
    if (checked && !config.logoUrl) {
        setActiveTab('default');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig((prev) => ({
          ...prev,
          logoUrl: reader.result as string,
          includeLogo: true
        }));
        setActiveTab('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (customUrl) {
        setConfig((prev) => ({
            ...prev,
            logoUrl: customUrl,
            includeLogo: true
        }));
        setActiveTab('url');
    }
  };

  const handleDefaultLogo = () => {
      setConfig((prev) => ({
          ...prev,
          logoUrl: defaultLogoUrl,
          includeLogo: true
      }));
      setActiveTab('default');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Content Input */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-200 hover:border-[#D71920] hover:shadow-[0_10px_30px_rgba(215,25,32,0.1)] transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-4 text-[#D71920] font-black uppercase text-sm tracking-wide border-b-2 border-red-50 pb-2">
          <Type size={20} />
          <h3>Nội dung mã QR</h3>
        </div>
        <textarea
          value={config.value}
          onChange={(e) => handleChange('value', e.target.value)}
          placeholder="Nhập đường dẫn website hoặc văn bản..."
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-800 font-medium focus:ring-4 focus:ring-red-500/20 focus:border-[#D71920] focus:outline-none h-32 resize-none transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Appearance */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-200 hover:border-[#D71920] hover:shadow-[0_10px_30px_rgba(215,25,32,0.1)] transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-6 text-[#D71920] font-black uppercase text-sm tracking-wide border-b-2 border-red-50 pb-2">
          <Layout size={20} />
          <h3>Giao diện hiển thị</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Màu mã (Foreground)</label>
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border-2 border-slate-200 hover:border-[#D71920] transition-colors cursor-pointer group">
              <input
                type="color"
                value={config.fgColor}
                onChange={(e) => handleChange('fgColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
              />
              <span className="text-xs font-mono font-bold text-slate-700 group-hover:text-[#D71920]">{config.fgColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Màu nền (Background)</label>
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border-2 border-slate-200 hover:border-[#D71920] transition-colors cursor-pointer group">
              <input
                type="color"
                value={config.bgColor}
                onChange={(e) => handleChange('bgColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
              />
              <span className="text-xs font-mono font-bold text-slate-700 group-hover:text-[#D71920]">{config.bgColor}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
            <div className="flex justify-between mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Kích thước ảnh</label>
                <span className="text-xs font-bold text-[#D71920]">{config.size}px</span>
            </div>
            <input 
                type="range" 
                min="128" 
                max="512" 
                step="32"
                value={config.size}
                onChange={(e) => handleChange('size', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#D71920] hover:accent-red-700"
            />
        </div>

        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Mức sửa lỗi</label>
                <div className="group relative">
                     <Info size={14} className="text-slate-400 cursor-help"/>
                     <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-800 text-white text-xs p-2 rounded shadow-lg hidden group-hover:block z-10">
                        Mức sửa lỗi càng cao (H) giúp QR vẫn quét được khi bị che khuất hoặc in xấu.
                     </div>
                </div>
            </div>
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl">
                {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                    <button
                        key={level}
                        onClick={() => handleChange('level', level)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${
                            config.level === level 
                            ? 'bg-white text-[#D71920] shadow-md border border-slate-100 transform scale-105' 
                            : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                        }`}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Logo Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-200 hover:border-[#D71920] hover:shadow-[0_10px_30px_rgba(215,25,32,0.1)] transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-[#D71920] font-black uppercase text-sm tracking-wide">
                <Flag size={20} />
                <h3>Tùy Chỉnh Logo</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    checked={config.includeLogo} 
                    onChange={(e) => handleLogoToggle(e.target.checked)}
                    className="sr-only peer" 
                />
                <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#D71920]"></div>
            </label>
        </div>

        {config.includeLogo && (
            <div className="animate-fade-in space-y-4 pt-2">
                
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={handleDefaultLogo}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1 ${activeTab === 'default' ? 'bg-white text-[#D71920] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Star size={12} /> Logo MTTQ
                    </button>
                    <button
                        onClick={() => {
                            fileInputRef.current?.click();
                            setActiveTab('upload');
                        }}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1 ${activeTab === 'upload' ? 'bg-white text-[#D71920] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Upload size={12} /> Tải ảnh
                    </button>
                    <button
                        onClick={() => setActiveTab('url')}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1 ${activeTab === 'url' ? 'bg-white text-[#D71920] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <LinkIcon size={12} /> Link ảnh
                    </button>
                </div>

                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                />

                {/* URL Input Field */}
                {activeTab === 'url' && (
                    <div className="flex gap-2 animate-fade-in">
                        <input 
                            type="text" 
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                            placeholder="Dán liên kết ảnh (https://...)"
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] outline-none"
                        />
                        <button 
                            onClick={handleUrlSubmit}
                            className="bg-[#D71920] text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <Check size={16} />
                        </button>
                    </div>
                )}

                {/* Preview Area */}
                <div className="flex items-center gap-4 bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100 mt-4">
                     <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center border border-red-100 shrink-0 overflow-hidden relative">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        {config.logoUrl ? (
                             <img src={config.logoUrl} alt="Logo Preview" className="h-full w-full object-contain p-1 z-10" />
                        ) : (
                             <ImageIcon size={24} className="text-slate-300" />
                        )}
                     </div>
                     <div className="flex-1">
                         <p className="text-xs text-slate-500 font-bold uppercase mb-1">Trạng thái:</p>
                         {config.logoUrl ? (
                             <p className="text-sm text-[#D71920] font-bold line-clamp-1">
                                {activeTab === 'upload' ? "Đã tải ảnh lên" : activeTab === 'url' ? "Đã nhập liên kết" : "Logo MTTQ Chuẩn"}
                             </p>
                         ) : (
                            <p className="text-sm text-slate-400 font-bold italic">
                                Chưa chọn logo...
                            </p>
                         )}
                     </div>
                </div>

                {/* Size Slider */}
                <div>
                     <div className="flex justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Độ lớn Logo</label>
                     </div>
                    <input 
                        type="range" 
                        min="20" 
                        max={config.size / 3} 
                        value={config.logoSize}
                        onChange={(e) => handleChange('logoSize', Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#D71920]"
                    />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Controls;