
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  delay: string;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  link, 
  delay 
}: ServiceCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 md:p-8 flex flex-col h-full animate-fade-up transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      delay
    )}>
      <div className="mb-5 p-3 rounded-lg bg-blue-50 w-fit">
        <Icon className="h-6 w-6 text-ilodata-600" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 mb-8 flex-grow">{description}</p>
      
      <Link 
        to={link} 
        className="group inline-flex items-center justify-center button-primary mt-auto"
      >
        {buttonText}
        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default ServiceCard;
