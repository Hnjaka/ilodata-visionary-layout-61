
import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  delay: string;
}

const Testimonial = ({ quote, author, position, delay }: TestimonialProps) => {
  return (
    <div className={cn("glass-card p-6 h-full animate-fade-up", delay)}>
      <div className="text-4xl text-ilodata-200 mb-4">"</div>
      <p className="text-slate-700 mb-6 italic">{quote}</p>
      <div className="mt-auto">
        <p className="font-semibold text-slate-800">{author}</p>
        <p className="text-sm text-slate-600">{position}</p>
      </div>
    </div>
  );
};

export default Testimonial;
