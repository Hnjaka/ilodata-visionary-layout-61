
import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceTestimonialProps {
  quote: string;
  author: string;
  position: string;
  image?: string;
  delay: string;
}

const ServiceTestimonial = ({ quote, author, position, image, delay }: ServiceTestimonialProps) => {
  return (
    <div className={cn("glass-card p-6 h-full animate-fade-up flex flex-col", delay)}>
      <div className="text-4xl text-ilodata-200 mb-4">"</div>
      <p className="text-slate-700 mb-6 italic flex-grow">{quote}</p>
      <div className="flex items-center mt-4">
        {image && (
          <div className="mr-4">
            <img 
              src={image} 
              alt={author} 
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-semibold text-slate-800">{author}</p>
          <p className="text-sm text-slate-600">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceTestimonial;
