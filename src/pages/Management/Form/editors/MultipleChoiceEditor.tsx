// @ts-nocheck
import React from 'react';
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Label } from '@/components/reuseables/Management/build/label';
import { BookOpen } from 'lucide-react';

type Option = {
  optionText: string;
  correct: boolean;
  position: number;
  imageUrl?: string;
};

type Props = {
  options: Option[];
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onChangeOption: (
    index: number,
    field: keyof Option,
    value: Option[keyof Option]
  ) => void;
  onOpenSuggest?: (index: number) => void;
};

const MultipleChoiceEditor: React.FC<Props> = ({
  options,
  onAddOption,
  onRemoveOption,
  onChangeOption,
  onOpenSuggest,
}) => {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-base font-semibold">Answer Options</Label>
        <Button_admin
          type="button"
          onClick={onAddOption}
          className="rounded-xl px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold flex items-center gap-1"
        >
          <span className="text-lg">+</span> Add Option
        </Button_admin>
      </div>
      <div className="space-y-3">
        {options.map((opt, i) => (
          <div
            className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 shadow-sm"
            key={i}
          >
            <input
              type="checkbox"
              checked={opt.correct}
              onChange={(e) => onChangeOption(i, 'correct', e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded"
            />
            <Input_admin
              value={opt.optionText}
              onChange={(e) => onChangeOption(i, 'optionText', e.target.value)}
              className="flex-1 min-w-[300px] rounded-xl border-2 border-gray-200 h-10 text-base"
              placeholder={`Option ${i + 1}`}
            />
            {onOpenSuggest && (
              <button
                type="button"
                className="rounded-xl border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 px-3 py-2 text-xs font-semibold flex items-center gap-1"
                onClick={() => onOpenSuggest(i)}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Suggest
              </button>
            )}
            <Button_admin
              type="button"
              className="rounded-xl px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold"
              onClick={() => onRemoveOption(i)}
            >
              ✕
            </Button_admin>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceEditor;


