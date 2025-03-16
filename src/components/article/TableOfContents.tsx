
import React from 'react';

interface TableOfContentsItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Table des matières</h2>
      <ul className="space-y-2 list-disc pl-5 text-slate-600">
        {items.map((item, index) => (
          <li key={index}>
            <a 
              href={`#${item.id}`} 
              className="text-ilodata-600 hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
