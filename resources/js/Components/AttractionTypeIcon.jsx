import {
    Utensils,
    FerrisWheel,
    Theater,
    CircleHelp
  } from 'lucide-react';
  
  export default function AttractionTypeIcon({ type }) {
    const icons = {
      ATTRACTION: <FerrisWheel className="w-5 h-5 text-yellow-500" />,
      RESTAURANT: <Utensils className="w-5 h-5 text-blue-500" />,
      SHOW: <Theater className="w-5 h-5 text-purple-500" />,
      unknown: <CircleHelp className="w-5 h-5 text-gray-400" />,
    };
  
    return (
      <span title={type} className="inline-block mr-1 align-middle">
        {icons[type] || icons.unknown}
      </span>
    );
  }
  