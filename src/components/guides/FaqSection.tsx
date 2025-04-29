
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqItems: FaqItem[];
}

const FaqSection = ({ faqItems }: FaqSectionProps) => {
  return (
    <div className="mt-16">
      <div className="glass-card p-8 animate-fade-up">
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-lg bg-blue-50 mr-4">
            <HelpCircle className="h-6 w-6 text-ilodata-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-800">Questions Fréquentes</h2>
        </div>
        
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-5 last:border-0">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.question}</h3>
              <p className="text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
