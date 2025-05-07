
import React from 'react';

interface DateFormatterProps {
  dateString?: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ dateString }) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);

  return <span>{formattedDate}</span>;
};

export default DateFormatter;
