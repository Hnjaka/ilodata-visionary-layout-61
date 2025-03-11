
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <div className="flex p-6 glass-card">
      <div className="mr-4 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-ilodata-600 text-white flex items-center justify-center font-semibold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-800">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
