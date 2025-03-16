
import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FontSizeFaqSectionProps {
  faqs: FaqItem[];
}

const FontSizeFaqSection = ({ faqs }: FontSizeFaqSectionProps) => {
  return (
    <section id="faq" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">FAQ sur la taille de police d'un livre</h2>
      
      <div className="space-y-6 bg-slate-50 p-6 rounded-lg">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">{`${index + 1}. ${faq.question}`}</h3>
            <p className="text-slate-700">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FontSizeFaqSection;
