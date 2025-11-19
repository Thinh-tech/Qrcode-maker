import React, { useState } from 'react';
import { QRConfig } from './types';
import QRCodeCanvas from './components/QRCodeCanvas';
import Controls from './components/Controls';
import AIFeatures from './components/AIFeatures';
import { QrCode, ShieldCheck, Star } from 'lucide-react';

const App: React.FC = () => {
  // Official MTTQ VN Logo - Updated as per user request
  const mttqLogoUrl = "https://inkythuatso.com/uploads/thumbnails/800/2021/12/logo-mat-tran-to-quoc-viet-nam-inkythuatso-01-08-10-02-25.jpg";

  const [config, setConfig] = useState<QRConfig>({
    value: 'Nội dung hoặc link',
    fgColor: '#1d1b1b', // MTTQ Black
    bgColor: '#FFFFFF', // White
    size: 320,
    level: 'H',
    includeLogo: false, // Default to False
    logoUrl: null,      // No default logo inside QR
    logoSize: 70,
  });

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-800 pb-12">
      {/* Header */}
      <header className="bg-[#D71920] shadow-xl border-b-4 border-yellow-400 relative overflow-hidden">
        {/* Decorative star pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{backgroundImage: 'radial-gradient(#FFFF00 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo & Title */}
            <div className="flex items-center gap-6">
              <div className="relative group shrink-0">
                  <div className="absolute -inset-2 bg-yellow-400 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                  <div className="relative bg-white p-2 rounded-full h-28 w-28 flex items-center justify-center shadow-2xl border-[3px] border-yellow-400 overflow-hidden">
                      <img 
                        src={mttqLogoUrl} 
                        alt="MTTQ VN Logo" 
                        className="h-full w-full object-contain drop-shadow-sm"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Fallback to a star icon if image fails to load
                          e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/200px-Flag_of_Vietnam.svg.png";
                          e.currentTarget.alt = "Vietnam Star Fallback";
                        }}
                      />
                  </div>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black text-[#FFFF00] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] tracking-tight uppercase leading-none mb-2">
                  QrCode Maker
                </h1>
                <div className="inline-block bg-red-800/50 rounded-lg px-4 py-2 border border-red-500/30 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <div className="flex items-center gap-1.5 text-white font-bold">
                            <Star size={18} className="text-[#FFFF00] fill-[#FFFF00]" />
                            <span className="uppercase tracking-wider text-sm md:text-base">Mặt Trận Tổ Quốc Việt Nam</span>
                        </div>
                        <span className="hidden md:inline text-yellow-400 mx-1">•</span>
                        <p className="text-yellow-200 font-medium text-sm uppercase tracking-wide">
                            Phường Sa Đéc
                        </p>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="hidden md:flex flex-col items-end">
               <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-400 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 cursor-default border-2 border-white">
                 <ShieldCheck size={18} className="text-[#D71920]" />
                 <span className="text-sm font-bold text-[#D71920] uppercase tracking-wide">
                   Hệ thống chuẩn MTTQ
                 </span>
               </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 md:mt-12">
        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls & AI */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* AI Section */}
            <AIFeatures setConfig={setConfig} />

            {/* Standard Controls - Pass mttqLogoUrl as standard option */}
            <Controls config={config} setConfig={setConfig} defaultLogoUrl={mttqLogoUrl} />
            
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-8 space-y-8">
               <div className="flex items-center justify-between px-4 border-l-[6px] border-[#D71920] bg-white py-3 shadow-sm rounded-r-lg animate-fade-in">
                  <h2 className="text-xl font-black text-[#D71920] flex items-center gap-3 uppercase tracking-tight">
                    <QrCode className="text-[#D71920]" strokeWidth={2.5} />
                    Xem trước mẫu
                  </h2>
                  <div className="text-xs font-bold text-white bg-[#D71920] px-3 py-1.5 rounded-full shadow-sm">
                      {config.value.length} ký tự
                  </div>
               </div>
               
               <QRCodeCanvas config={config} />

               {/* Instructions */}
               <div className="bg-white p-6 rounded-2xl border border-yellow-400 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(215,25,32,0.1)] transition-all duration-300 animate-fade-in">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D71920] via-yellow-400 to-[#D71920]"></div>
                  <h3 className="text-[#D71920] font-bold mb-3 text-base flex items-center gap-2 uppercase">
                      <Star size={20} className="text-yellow-500 fill-yellow-500"/>
                      Lưu ý sử dụng
                  </h3>
                  <ul className="text-sm text-slate-700 space-y-2.5 pl-2">
                    <li className="flex items-start gap-2">
                        <span className="text-[#D71920] font-bold">•</span>
                        <span>Mã QR được thiết kế theo chuẩn nhận diện của MTTQ VN.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#D71920] font-bold">•</span>
                        <span>Nên sử dụng màu đỏ đậm và nền trắng để đạt độ tương phản tốt nhất.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#D71920] font-bold">•</span>
                        <span>Bạn có thể chọn "Logo MTTQ" hoặc tải logo riêng để cá nhân hóa.</span>
                    </li>
                  </ul>
               </div>
               
               <div className="text-center pt-8 pb-4">
                   <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                       © 2025 Mặt Trận Tổ Quốc Việt Nam - Phường Sa Đéc
                   </p>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;