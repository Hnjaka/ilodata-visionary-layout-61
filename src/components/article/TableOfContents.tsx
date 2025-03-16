
import React from 'react';
import { List } from 'lucide-react';

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
    <div className="sticky top-8 mb-8">
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <List className="h-5 w-5 text-ilodata-600" />
          <h2 className="text-xl font-semibold text-slate-800">Table des matières</h2>
        </div>
        <ul className="space-y-2 text-slate-600">
          {items.map((item, index) => (
            <li key={index} className="border-l-2 border-transparent hover:border-ilodata-400 pl-3 transition-all">
              <a 
                href={`#${item.id}`} 
                className="block py-1 text-ilodata-600 hover:text-ilodata-700 transition-colors"
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
    </div>
  );
};

export default TableOfContents;
