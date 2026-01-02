
import React, { useState, useEffect } from 'react';
import { Ingredient, CookingMethod, CustomRecipe } from '../types';
import { COOKING_METHODS_DATA } from '../constants';

interface RecipeCreatorProps {
  ingredients: Ingredient[];
  onSave: (recipe: CustomRecipe) => void;
  onClose: () => void;
  initialIngredients?: string[];
  initialMethod?: CookingMethod;
}

const RecipeCreator: React.FC<RecipeCreatorProps> = ({ ingredients, onSave, onClose, initialIngredients, initialMethod }) => {
  const [ing1, setIng1] = useState(initialIngredients?.[0] || ingredients[0].id);
  const [ing2, setIng2] = useState(initialIngredients?.[1] || ingredients[1]?.id || ingredients[0].id);
  const [method, setMethod] = useState(initialMethod || CookingMethod.CHOP);
  const [resultName, setResultName] = useState('');
  const [resultEmoji, setResultEmoji] = useState('🍲');
  const [resultDesc, setResultDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ing1 === ing2) return alert("Select two different ingredients.");
    
    onSave({
      ingredients: [ing1, ing2],
      method,
      result: {
        id: resultName.toLowerCase().replace(/\s+/g, '_'),
        name: resultName,
        emoji: resultEmoji,
        description: resultDesc,
        isCustom: true
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
      <div className="bg-slate-900 border border-amber-500/30 w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-200 shadow-amber-500/5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-amber-500 flex items-center gap-2">
              <i className="fa-solid fa-scroll"></i>
              Master's Ledger
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Override the Natural Order</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Base Element</label>
              <select 
                value={ing1} 
                onChange={e => setIng1(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              >
                {ingredients.map(i => <option key={i.id} value={i.id}>{i.emoji} {i.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Additive</label>
              <select 
                value={ing2} 
                onChange={e => setIng2(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              >
                {ingredients.map(i => <option key={i.id} value={i.id}>{i.emoji} {i.name}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Method (The Technique)</label>
            <div className="grid grid-cols-4 gap-2">
              {COOKING_METHODS_DATA.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`p-2 rounded-lg border text-xs flex flex-col items-center gap-1 transition-all ${method === m.id ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                >
                  <i className={m.icon}></i>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 space-y-4">
             <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">The Secret Result (Output)</label>
             <div className="flex gap-4">
                <input 
                  value={resultEmoji} 
                  onChange={e => setResultEmoji(e.target.value)}
                  placeholder="Emoji"
                  className="w-16 bg-slate-800 border border-slate-700 rounded-xl p-3 text-2xl text-center shadow-inner"
                />
                <input 
                  required
                  value={resultName} 
                  onChange={e => setResultName(e.target.value)}
                  placeholder="Name of the Dish..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none shadow-inner"
                />
             </div>
             <textarea 
                required
                value={resultDesc} 
                onChange={e => setResultDesc(e.target.value)}
                placeholder="Write a custom description for this fusion..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm h-24 focus:ring-2 focus:ring-amber-500 outline-none resize-none shadow-inner"
             />
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-4 rounded-2xl transition-all shadow-xl uppercase tracking-widest"
          >
            Forge Secret Technique
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeCreator;
