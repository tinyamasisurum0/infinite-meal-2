
import React, { useRef } from 'react';
import { CustomRecipe, Ingredient } from '../types';
import { COOKING_METHODS_DATA } from '../constants';

interface CustomRecipeLedgerProps {
  recipes: CustomRecipe[];
  ingredients: Ingredient[];
  onDelete: (index: number) => void;
  onImport: (recipes: CustomRecipe[]) => void;
  onClose: () => void;
}

const CustomRecipeLedger: React.FC<CustomRecipeLedgerProps> = ({ recipes, ingredients, onDelete, onImport, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getIngredient = (id: string) => ingredients.find(ing => ing.id === id);
  const getMethodIcon = (methodId: string) => COOKING_METHODS_DATA.find(m => m.id === methodId)?.icon || 'fa-solid fa-utensils';

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recipes, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "alchemist_ledger_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          onImport(json);
          alert(`Successfully imported ${json.length} secret techniques!`);
        }
      } catch (err) {
        alert("Invalid JSON file. Please check the format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl h-[80vh] rounded-3xl flex flex-col shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-amber-500 flex items-center gap-3">
              <i className="fa-solid fa-scroll"></i>
              Private Ledger
            </h2>
            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest">Manual Culinary Mappings</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExport}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all text-xs flex items-center gap-2"
              title="Export as JSON"
            >
              <i className="fa-solid fa-file-export"></i>
              Export
            </button>
            <button 
              onClick={handleImportClick}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all text-xs flex items-center gap-2"
              title="Import from JSON"
            >
              <i className="fa-solid fa-file-import"></i>
              Import
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".json"
            />
            <div className="w-px h-6 bg-slate-800 mx-2"></div>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          {recipes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 opacity-50">
              <i className="fa-solid fa-feather-pointed text-5xl"></i>
              <p className="text-sm font-medium">No secret techniques recorded yet.</p>
              <p className="text-[10px] text-center max-w-xs uppercase tracking-widest leading-relaxed">
                Import your base game recipes via JSON or use the '+' button in the lab.
              </p>
            </div>
          ) : (
            recipes.map((recipe, idx) => {
              const ing1 = getIngredient(recipe.ingredients[0]);
              const ing2 = getIngredient(recipe.ingredients[1]);
              return (
                <div key={idx} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between group hover:bg-slate-800/60 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <span className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xl shadow-lg" title={ing1?.name}>
                        {ing1?.emoji || '?'}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xl shadow-lg" title={ing2?.name}>
                        {ing2?.emoji || '?'}
                      </span>
                    </div>
                    
                    <i className={`${getMethodIcon(recipe.method)} text-amber-500/50 text-sm`}></i>
                    
                    <div className="flex items-center gap-3 ml-2">
                      <i className="fa-solid fa-arrow-right text-slate-600 text-[10px]"></i>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{recipe.result.emoji}</span>
                        <div>
                          <p className="text-sm font-bold text-slate-200">{recipe.result.name}</p>
                          <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{recipe.result.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onDelete(idx)}
                    className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete Entry"
                  >
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="p-8 bg-slate-900/50 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter text-center">
            These mappings will bypass AI generation and use your hardcoded logic.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomRecipeLedger;
