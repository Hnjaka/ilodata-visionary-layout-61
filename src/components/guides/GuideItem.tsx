
import React from 'react';
import { Link } from 'react-router-dom';

export interface GuideItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  delay: string;
}

const GuideItem: React.FC<GuideItemProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  link,
  delay
}) => {
  return (
    <div className={`fade-in-section ${delay} bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all`}>
      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-ilodata-600" />
      </div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      <Link to={link} className="text-ilodata-600 hover:text-ilodata-700 font-medium inline-flex items-center">
        {buttonText}
        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default GuideItem;
