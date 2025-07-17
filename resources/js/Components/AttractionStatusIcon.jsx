import {
    Circle,
    Octagon,
    Paintbrush,
    CircleHelp,
    Wrench
  } from 'lucide-react';
  
  export default function AttractionStatusIcon({ status }) {
    const icons = {
      OPERATING: <Circle className="w-5 h-5 text-green-500" />,
      CLOSED: <Octagon className="w-5 h-5 text-red-500" />,
      REFURBISHMENT: <Paintbrush className="w-5 h-5 text-orange-500" />,
      DOWN: <Wrench className="w-5 h-5 text-yellow-500" />,
      unknown: <CircleHelp className="w-5 h-5 text-gray-400" />,
    };
  
    return (
      <span title={status} className="inline-block mr-1 align-middle">
        {icons[status] || icons.unknown}
      </span>
    );
  }
  