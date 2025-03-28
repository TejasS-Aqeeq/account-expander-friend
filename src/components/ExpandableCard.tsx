
import React from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableCardProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isCompleted: boolean;
}

const ExpandableCard = ({
  title,
  children,
  isOpen,
  onToggle,
  isCompleted,
}: ExpandableCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <span className="font-medium text-gray-700">{title}</span>
        </div>
        <div className="flex items-center">
          {isCompleted && (
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
          )}
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandableCard;
