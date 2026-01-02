
import React from 'react';
import { CookingMethod } from '../types';
import { COOKING_METHODS_DATA } from '../constants';

interface MethodSelectorProps {
  selected: CookingMethod;
  onSelect: (method: CookingMethod) => void;
  disabled?: boolean;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({ selected, onSelect, disabled }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-wrap justify-center gap-3">
        {COOKING_METHODS_DATA.map((method) => {
          const isActive = selected === method.id;
          return (
            <button
              key={method.id}
              disabled={disabled}
              onClick={() => onSelect(method.id)}
              className={`
                group relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl border transition-all duration-300
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${isActive 
                  ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-110 z-10' 
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}
              `}
            >
              <i className={`${method.icon} text-2xl mb-1 transition-transform group-hover:scale-110 ${isActive ? method.color : 'text-slate-500'}`}></i>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-amber-500' : 'text-slate-600'}`}>
                {method.name}
              </span>
              
              {isActive && (
                <div className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 min-h-[20px]">
        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-[0.2em] animate-in fade-in duration-300">
          {getMethodDescription(selected)}
        </p>
      </div>
    </div>
  );
};

function getMethodDescription(method: CookingMethod): string {
  switch (method) {
    case CookingMethod.CHOP: return "Sharp blades for precise cuts.";
    case CookingMethod.BLEND: return "High-speed vortex for smooth textures.";
    case CookingMethod.BOIL: return "Intense convection in liquid heat.";
    case CookingMethod.FRY: return "Crispy searing in sizzling fats.";
    case CookingMethod.BAKE: return "Slow radiation for deep chemistry.";
    case CookingMethod.GRIDDLE: return "Direct contact for smoky surfaces.";
    case CookingMethod.MIX: return "Gentle integration of disparate parts.";
    default: return "";
  }
}

export default MethodSelector;
