
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Ingredient, GameStatus, RecipeDiscovery, CookingMethod, CustomRecipe } from './types';
import { INITIAL_INGREDIENTS, MAX_MIX_ITEMS, BASE_RECIPES } from './constants';
import { combineIngredients } from './services/geminiService';
import IngredientItem from './components/IngredientItem';
import MixingBowl from './components/MixingBowl';
import DiscoveryBook from './components/DiscoveryBook';
import SuccessModal from './components/SuccessModal';
import MethodSelector from './components/MethodSelector';
import RecipeCreator from './components/RecipeCreator';
import CustomRecipeLedger from './components/CustomRecipeLedger';

const App: React.FC = () => {
  const [discoveredIngredients, setDiscoveredIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem('discovered_ingredients');
    return saved ? JSON.parse(saved) : INITIAL_INGREDIENTS;
  });

  const [discoveryHistory, setDiscoveryHistory] = useState<RecipeDiscovery[]>(() => {
    const saved = localStorage.getItem('discovery_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [customRecipes, setCustomRecipes] = useState<CustomRecipe[]>(() => {
    const saved = localStorage.getItem('custom_recipes');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentMixingIds, setCurrentMixingIds] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<CookingMethod>(CookingMethod.MIX);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [lastDiscovery, setLastDiscovery] = useState<{ ingredient: Ingredient; isNew: boolean; isCustom: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('discovered_ingredients', JSON.stringify(discoveredIngredients));
    localStorage.setItem('discovery_history', JSON.stringify(discoveryHistory));
    localStorage.setItem('custom_recipes', JSON.stringify(customRecipes));
  }, [discoveredIngredients, discoveryHistory, customRecipes]);

  const mixingIngredients = useMemo(() => 
    currentMixingIds.map(id => discoveredIngredients.find(i => i.id === id)!).filter(Boolean),
    [currentMixingIds, discoveredIngredients]
  );

  const filteredIngredients = useMemo(() => 
    discoveredIngredients.filter(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [discoveredIngredients, searchTerm]
  );

  const handleMix = useCallback(async () => {
    if (mixingIngredients.length === 0) return;
    
    // MIX usually requires 2, but other methods can work on 1
    if (selectedMethod === CookingMethod.MIX && mixingIngredients.length < 2) {
      setError("Mixing requires at least two items.");
      return;
    }

    setStatus(GameStatus.MIXING);
    setError(null);

    // Normalize IDs for comparison
    const sortedCurrent = [...currentMixingIds].sort();

    // 1. CHECK BASE GAME REPO (Laws of Nature)
    const baseMatch = BASE_RECIPES.find(r => {
      if (r.method !== selectedMethod) return false;
      const sortedBase = [...r.ingredients].sort();
      return JSON.stringify(sortedCurrent) === JSON.stringify(sortedBase);
    });

    // 2. CHECK CUSTOM LEDGER
    const customMatch = customRecipes.find(r => {
      if (r.method !== selectedMethod) return false;
      const sortedCustom = [...r.ingredients].sort();
      return JSON.stringify(sortedCurrent) === JSON.stringify(sortedCustom);
    });

    const match = baseMatch || customMatch;
    let result;

    if (match) {
      result = { ...match.result, isCustom: !!customMatch };
    } else {
      // 3. FALLBACK TO GENERATIVE AI
      result = await combineIngredients(mixingIngredients, selectedMethod);
    }

    if (result) {
      const existing = discoveredIngredients.find(i => i.name.toLowerCase() === result.name.toLowerCase());
      const isNew = !existing;
      
      const discoveredIng: Ingredient = existing || {
        id: result.name.toLowerCase().replace(/\s+/g, '_'),
        name: result.name,
        emoji: result.emoji,
        description: result.description,
        isCustom: !!result.isCustom,
        discoveredAt: Date.now()
      };

      if (isNew) {
        setDiscoveredIngredients(prev => [...prev, discoveredIng]);
      }

      setDiscoveryHistory(prev => [...prev, {
        ingredients: mixingIngredients.map(i => i.name),
        method: selectedMethod,
        result: discoveredIng,
        isNewDiscovery: isNew,
        isCustom: !!result.isCustom
      }]);

      setLastDiscovery({ ingredient: discoveredIng, isNew, isCustom: !!result.isCustom });
      setStatus(GameStatus.SUCCESS);
      setCurrentMixingIds([]);
    } else {
      setStatus(GameStatus.FAILURE);
      setError("The Alchemist is stumped... a new technique?");
      setTimeout(() => setStatus(GameStatus.IDLE), 5000);
    }
  }, [mixingIngredients, discoveredIngredients, selectedMethod, customRecipes, currentMixingIds]);

  const handleDrop = (id: string) => {
    if (status === GameStatus.MIXING) return;
    if (currentMixingIds.length >= MAX_MIX_ITEMS) return;
    setCurrentMixingIds(prev => [...prev, id]);
  };

  useEffect(() => {
    if (currentMixingIds.length === MAX_MIX_ITEMS) {
      handleMix();
    }
  }, [currentMixingIds, handleMix]);

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-100 overflow-hidden">
      {/* Sidebar: Ingredient Shelf */}
      <div className="w-80 flex flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-amber-500 flex items-center gap-2">
              <i className="fa-solid fa-mortar-pestle"></i>
              Gourmet Lab
            </h1>
            <div className="flex gap-1">
              <button 
                onClick={() => setIsLedgerOpen(true)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all"
                title="View Ledger"
              >
                <i className="fa-solid fa-scroll text-xs"></i>
              </button>
              <button 
                onClick={() => setIsCreatorOpen(true)}
                className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg transition-all shadow-lg"
                title="Add Custom Recipe"
              >
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
            </div>
          </div>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input
              type="text"
              placeholder="Filter ingredients..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
          <div className="grid grid-cols-2 gap-3">
            {filteredIngredients.map((ing) => (
              <IngredientItem key={ing.id} ingredient={ing} />
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 text-[10px] text-slate-500 text-center flex justify-between items-center">
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-fire text-amber-500"></i>
            <span className="font-bold text-slate-300">{discoveryHistory.length}</span>
          </div>
          <span className="text-amber-500 font-bold uppercase tracking-tighter">Ledger: {customRecipes.length}</span>
          <span>{discoveredIngredients.length} Discovered</span>
        </div>
      </div>

      {/* Main Area: Unified Mixing Station */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden px-4">
        <div className="z-10 text-center mb-8">
          <h2 className="text-4xl font-light tracking-widest text-slate-100 uppercase">Synthesizer</h2>
          <div className="h-14 mt-2 flex flex-col items-center justify-center">
            {error && (
              <div className="flex flex-col items-center animate-in slide-in-from-top duration-300">
                <p className="text-red-400 font-medium text-sm mb-2">{error}</p>
                <button 
                  onClick={() => setIsCreatorOpen(true)}
                  className="text-[10px] bg-slate-800 hover:bg-amber-500 hover:text-slate-900 px-3 py-1.5 rounded-full border border-slate-700 transition-all uppercase font-black tracking-widest shadow-xl"
                >
                  <i className="fa-solid fa-wand-sparkles mr-1"></i> Define Secret Technique
                </button>
              </div>
            )}
            {!error && <p className="text-slate-500 text-xs italic tracking-widest opacity-60">Master the ingredients, define the rules.</p>}
          </div>
        </div>

        <div className="z-10 flex flex-col items-center gap-12 w-full max-w-2xl">
          <MethodSelector 
            selected={selectedMethod} 
            onSelect={setSelectedMethod} 
            disabled={status === GameStatus.MIXING}
          />

          <div className="relative group">
            <MixingBowl
              items={mixingIngredients}
              onDrop={handleDrop}
              status={status}
              onClear={() => {
                setCurrentMixingIds([]);
                setStatus(GameStatus.IDLE);
                setError(null);
              }}
            />
            {/* Direct Cook Trigger for Single Items */}
            {mixingIngredients.length === 1 && status === GameStatus.IDLE && (
               <button 
                onClick={handleMix}
                className="absolute -right-24 top-1/2 -translate-y-1/2 bg-amber-500 text-slate-900 font-black p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce"
                title={`Perform ${selectedMethod}`}
               >
                 <i className="fa-solid fa-bolt-lightning text-xl"></i>
               </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar: History & Almanac */}
      <div className="w-80">
        <DiscoveryBook
          ingredients={discoveredIngredients}
          history={discoveryHistory}
        />
      </div>

      {/* Overlays */}
      {lastDiscovery && (
        <SuccessModal
          discovery={lastDiscovery.ingredient}
          isNew={lastDiscovery.isNew}
          isCustom={lastDiscovery.isCustom}
          onClose={() => setLastDiscovery(null)}
        />
      )}

      {isCreatorOpen && (
        <RecipeCreator 
          ingredients={discoveredIngredients}
          onSave={(recipe) => {
            setCustomRecipes(prev => [...prev, recipe]);
            setIsCreatorOpen(false);
            setCurrentMixingIds([]);
            setError(null);
            setStatus(GameStatus.IDLE);
          }}
          onClose={() => setIsCreatorOpen(false)}
          initialIngredients={currentMixingIds}
          initialMethod={selectedMethod}
        />
      )}

      {isLedgerOpen && (
        <CustomRecipeLedger
          recipes={customRecipes}
          ingredients={discoveredIngredients}
          onDelete={(idx) => setCustomRecipes(prev => prev.filter((_, i) => i !== idx))}
          onImport={(imported) => setCustomRecipes(prev => [...prev, ...imported])}
          onClose={() => setIsLedgerOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
