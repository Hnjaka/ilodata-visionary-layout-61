
import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

const FaqSection = ({ faqs }: FaqSectionProps) => {
  return (
    <section id="faq" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">FAQ sur la mise en page professionnelle</h2>
      
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

export default FaqSection;
