
import React from 'react';
import { Ingredient, RecipeDiscovery } from '../types';
import { COOKING_METHODS_DATA } from '../constants';

interface DiscoveryBookProps {
  ingredients: Ingredient[];
  history: RecipeDiscovery[];
}

const DiscoveryBook: React.FC<DiscoveryBookProps> = ({ ingredients, history }) => {
  const getMethodIcon = (methodId: string) => {
    return COOKING_METHODS_DATA.find(m => m.id === methodId)?.icon || 'fa-solid fa-utensils';
  };

  return (
    <div className="h-full bg-slate-900 border-l border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-book-open text-amber-500"></i>
          Gourmet Almanac
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {ingredients.length} unique profiles cataloged
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <section>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Latest Breakthroughs</h3>
          {history.length === 0 ? (
            <p className="text-slate-600 text-sm italic">No discoveries yet. Start mixing!</p>
          ) : (
            <div className="space-y-3">
              {[...history].reverse().slice(0, 15).map((discovery, idx) => (
                <div key={idx} className={`bg-slate-800/50 p-3 rounded-lg border flex flex-col gap-2 group transition-all
                  ${discovery.isCustom ? 'border-amber-500/20 shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]' : 'border-slate-700/50'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{discovery.result.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{discovery.result.name}</p>
                        {discovery.isCustom && (
                          <i className="fa-solid fa-signature text-[10px] text-amber-500" title="Personal Recipe"></i>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                         <i className={`${getMethodIcon(discovery.method)} text-[9px] text-amber-500/70`}></i>
                         <p className="text-[10px] text-slate-500">
                          {discovery.ingredients.join(' + ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  {discovery.result.sourceUrl && !discovery.isCustom && (
                    <a 
                      href={discovery.result.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9px] text-slate-500 hover:text-amber-500 flex items-center gap-1 transition-colors self-end"
                    >
                      Recipe <i className="fa-solid fa-external-link scale-75"></i>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Encyclopedia</h3>
          <div className="grid grid-cols-4 gap-2">
            {ingredients.map((ing) => (
              <div
                key={ing.id}
                title={`${ing.name}: ${ing.description}`}
                className={`w-full aspect-square rounded flex items-center justify-center text-xl transition-all cursor-help border
                  ${ing.isCustom ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-800 border-transparent hover:border-slate-600 hover:bg-slate-700'}`}
              >
                {ing.emoji}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiscoveryBook;
