// @ts-nocheck
import React, { useState } from 'react';
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Label } from '@/components/reuseables/Management/build/label';
import { Plus, Trash2, Shuffle, Eye, EyeOff } from 'lucide-react';

type MatchingPair = {
  id: string;
  leftItem: string;
  rightItem: string;
  correct: boolean;
};

type MatchingData = {
  pairs: MatchingPair[];
  instructions: string;
  shuffleOptions: boolean;
  showPreview: boolean;
};

type Props = {
  data: MatchingData;
  onChange: (data: MatchingData) => void;
};

const MatchingEditor: React.FC<Props> = ({ data, onChange }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Add new pair
  const addPair = () => {
    const newPair: MatchingPair = {
      id: `pair_${Date.now()}`,
      leftItem: '',
      rightItem: '',
      correct: true
    };
    
    onChange({
      ...data,
      pairs: [...data.pairs, newPair]
    });
  };

  // Remove pair
  const removePair = (pairId: string) => {
    onChange({
      ...data,
      pairs: data.pairs.filter(pair => pair.id !== pairId)
    });
  };

  // Update pair
  const updatePair = (pairId: string, field: keyof MatchingPair, value: any) => {
    onChange({
      ...data,
      pairs: data.pairs.map(pair => 
        pair.id === pairId ? { ...pair, [field]: value } : pair
      )
    });
  };

  // Shuffle pairs
  const shufflePairs = () => {
    const shuffled = [...data.pairs].sort(() => Math.random() - 0.5);
    onChange({
      ...data,
      pairs: shuffled
    });
  };

  // Toggle preview
  const togglePreview = () => {
    onChange({
      ...data,
      showPreview: !data.showPreview
    });
  };

  // Generate preview pairs (shuffled if enabled)
  const getPreviewPairs = () => {
    if (!data.showPreview) return data.pairs;
    
    const leftItems = data.pairs.map(p => p.leftItem).filter(Boolean);
    const rightItems = data.pairs.map(p => p.rightItem).filter(Boolean);
    
    if (data.shuffleOptions) {
      return leftItems.map((left, index) => ({
        id: `preview_${index}`,
        leftItem: left,
        rightItem: rightItems[index] || '',
        correct: true
      }));
    }
    
    return data.pairs;
  };

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-4">
        <Label className="text-base font-semibold">Matching Pairs</Label>
        <div className="flex gap-2">
          <Button_admin
            type="button"
            onClick={shufflePairs}
            className="rounded-xl px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-semibold flex items-center gap-1"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </Button_admin>
          <Button_admin
            type="button"
            onClick={togglePreview}
            className="rounded-xl px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 text-sm font-semibold flex items-center gap-1"
          >
            {data.showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {data.showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button_admin>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Instructions</Label>
        <Input_admin
          value={data.instructions}
          onChange={(e) => onChange({ ...data, instructions: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 h-10 text-base"
          placeholder="e.g., Match the English words with their Vietnamese translations"
        />
      </div>

      {/* Settings */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.shuffleOptions}
            onChange={(e) => onChange({ ...data, shuffleOptions: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm font-medium">Shuffle options for students</span>
        </label>
      </div>

      {/* Preview Mode */}
      {data.showPreview ? (
        <div className="mb-4 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm font-semibold mb-3 text-gray-700">Preview</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-xs font-medium text-gray-600 mb-2">Left Column</h5>
              <div className="space-y-2">
                {getPreviewPairs().map((pair, index) => (
                  <div
                    key={pair.id}
                    className="p-3 bg-white rounded-lg border-2 border-gray-200 text-sm font-medium"
                  >
                    {pair.leftItem || `Item ${index + 1}`}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-600 mb-2">Right Column</h5>
              <div className="space-y-2">
                {getPreviewPairs().map((pair, index) => (
                  <div
                    key={pair.id}
                    className="p-3 bg-white rounded-lg border-2 border-gray-200 text-sm font-medium"
                  >
                    {pair.rightItem || `Match ${index + 1}`}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-4">
          {data.pairs.map((pair, index) => (
            <div key={pair.id} className="p-4 border-2 border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-600">Pair {index + 1}</span>
                <Button_admin
                  type="button"
                  onClick={() => removePair(pair.id)}
                  className="rounded-full p-2 bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button_admin>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium mb-1 block">Left Item</Label>
                  <Input_admin
                    value={pair.leftItem}
                    onChange={(e) => updatePair(pair.id, 'leftItem', e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 h-10 text-base"
                    placeholder="e.g., Apple"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium mb-1 block">Right Item</Label>
                  <Input_admin
                    value={pair.rightItem}
                    onChange={(e) => updatePair(pair.id, 'rightItem', e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 h-10 text-base"
                    placeholder="e.g., Quả táo"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Pair Button */}
      {!data.showPreview && (
        <Button_admin
          type="button"
          onClick={addPair}
          className="w-full rounded-xl border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 py-3 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Pair
        </Button_admin>
      )}

      {/* Instructions */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-xl mt-4">
        <strong>Instructions:</strong>
        <ul className="mt-1 space-y-1">
          <li>• Create pairs by entering items in both left and right columns</li>
          <li>• Students will match items from the left column with items from the right column</li>
          <li>• Enable "Shuffle options" to randomize the order for students</li>
          <li>• Use "Show Preview" to see how the question will appear to students</li>
          <li>• Add clear instructions to help students understand the task</li>
        </ul>
      </div>
    </div>
  );
};

export default MatchingEditor;
