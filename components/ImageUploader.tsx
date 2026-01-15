
import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  image: string | null;
  setImage: (base64: string | null) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, image, setImage, className = "" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="text-[10px] font-black text-[#45A29E] uppercase tracking-[0.3em]">{label}</label>
      <div 
        className={`relative border border-[#1F2833] transition-all h-72 flex flex-col items-center justify-center overflow-hidden bg-[#0B0C10] group shadow-sm ${
          image ? 'border-[#45A29E]' : 'hover:border-[#66FCF1]'
        }`}
      >
        {image ? (
          <>
            <img src={image} alt="Upload preview" className="w-full h-full object-cover transition-opacity grayscale group-hover:grayscale-0" />
            <button 
              onClick={() => setImage(null)}
              className="absolute top-6 right-6 p-2 bg-[#66FCF1] text-black hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div 
            className="cursor-pointer flex flex-col items-center p-10 text-center w-full h-full justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="p-5 bg-[#1F2833] border border-[#45A29E]/30 rounded-full mb-6">
              <Upload className="w-6 h-6 text-[#66FCF1]" />
            </div>
            <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">INPUT DATA SOURCE</p>
            <p className="text-[9px] text-[#45A29E] mt-3 font-bold uppercase tracking-widest">DRAG AND DROP DATASTREAM</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
