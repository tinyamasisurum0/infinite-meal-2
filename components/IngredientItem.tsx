
import React from 'react';
import { Ingredient } from '../types';

interface IngredientItemProps {
  ingredient: Ingredient;
  isDragging?: boolean;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient }) => {
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('ingredientId', ingredient.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-slate-800 border border-slate-700 p-3 rounded-xl shadow-md cursor-grab active:cursor-grabbing hover:bg-slate-700 transition-all duration-200 flex flex-col items-center justify-center min-w-[100px] h-[100px] group"
    >
      <span className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-200">
        {ingredient.emoji}
      </span>
      <span className="text-sm font-semibold text-slate-200 truncate w-full text-center">
        {ingredient.name}
      </span>
    </div>
  );
};

export default IngredientItem;
