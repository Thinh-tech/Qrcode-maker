import React, { useRef } from 'react';
import { QRCodeCanvas as QRCanvasLib } from 'qrcode.react';
import { QRConfig } from '../types';
import { Download, CheckCircle, AlertCircle } from 'lucide-react';

interface QRCodeCanvasProps {
  config: QRConfig;
}

const QRCodeCanvas: React.FC<QRCodeCanvasProps> = ({ config }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    try {
        const url = canvas.toDataURL('image/png');
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'mttq-qrcode.png';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    } catch (error) {
        console.error("Download failed", error);
        alert("Không thể tải ảnh do lỗi bảo mật của trình duyệt với hình ảnh bên ngoài. Vui lòng thử 'Sao chép hình ảnh' bằng chuột phải hoặc tải ảnh logo lên từ máy tính của bạn.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* QR Display Card */}
      <div className="relative group perspective-1000">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
        
        <div 
            ref={qrRef} 
            className="relative p-8 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white transform transition-transform duration-300 group-hover:-translate-y-1"
            style={{ backgroundColor: config.bgColor }} // Match BG color
        >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#D71920] rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#D71920] rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#D71920] rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#D71920] rounded-br-lg"></div>

            <QRCanvasLib
            value={config.value || "https://google.com"}
            size={config.size}
            bgColor={config.bgColor}
            fgColor={config.fgColor}
            level={config.level}
            imageSettings={
                config.includeLogo && config.logoUrl
                ? {
                    src: config.logoUrl,
                    height: config.logoSize,
                    width: config.logoSize,
                    excavate: true,
                    crossOrigin: "anonymous", // Important for CORS
                    }
                : undefined
            }
            />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm">
        <button
          onClick={handleDownload}
          className="w-full group relative flex items-center justify-center gap-3 bg-[#FFFF00] hover:bg-[#FFEA00] text-[#D71920] font-black text-lg py-4 px-8 rounded-xl shadow-[0_4px_0_rgb(180,180,0)] hover:shadow-[0_2px_0_rgb(180,180,0)] hover:translate-y-[2px] transition-all border-2 border-yellow-500 uppercase tracking-wide"
        >
          <Download size={24} strokeWidth={3} />
          Tải Mã QR Ngay
        </button>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-[#D71920] bg-red-50 py-2 px-4 rounded-lg border border-red-100">
            <CheckCircle size={16} />
            <span className="text-xs font-bold uppercase">Đã kiểm tra độ nét cao</span>
        </div>
      </div>
    </div>
  );
};

export default QRCodeCanvas;