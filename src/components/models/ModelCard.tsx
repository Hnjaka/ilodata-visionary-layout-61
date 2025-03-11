
import React from 'react';
import { ArrowDownToLine, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelCardProps {
  title: string;
  description: string;
  imageSrc: string;
  downloadLink: string;
  price?: string;
  isFree?: boolean;
  delay: string;
}

const ModelCard = ({
  title,
  description,
  imageSrc,
  downloadLink,
  price,
  isFree = false,
  delay
}: ModelCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 md:p-8 flex flex-col h-full animate-fade-up transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      delay
    )}>
      <div className="mb-6 overflow-hidden rounded-lg h-48">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      
      <div className="mt-auto">
        {isFree ? (
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <Check size={14} className="inline mr-1" />
            Gratuit
          </span>
        ) : price ? (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            {price}
          </span>
        ) : null}
        
        <a 
          href={downloadLink} 
          className="group inline-flex items-center justify-center w-full button-primary"
          download
        >
          Télécharger
          <ArrowDownToLine size={16} className="ml-2 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </div>
  );
};

export default ModelCard;
