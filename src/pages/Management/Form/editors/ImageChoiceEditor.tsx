// @ts-nocheck
import React, { useState } from 'react';
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Label } from '@/components/reuseables/Management/build/label';
import { BookOpen, Image, Trash2, Plus, Eye, EyeOff, X } from 'lucide-react';

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

const ImageChoiceEditor: React.FC<Props> = ({
  options,
  onAddOption,
  onRemoveOption,
  onChangeOption,
  onOpenSuggest,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  // Giả lập tải lên hình ảnh
  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Trong thực tế, bạn sẽ tải lên file và nhận URL từ server
    // Ở đây chúng ta giả lập bằng cách tạo URL tạm thời
    const imageUrl = URL.createObjectURL(file);
    onChangeOption(index, 'imageUrl', imageUrl);
  };

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-base font-semibold">Image Choice Options</Label>
        <div className="flex gap-2">
          <Button_admin
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-xl px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 text-sm font-semibold flex items-center gap-1"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button_admin>
          <Button_admin
            type="button"
            onClick={onAddOption}
            className="rounded-xl px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Option
          </Button_admin>
        </div>
      </div>

      {showPreview ? (
        <div className="mb-4 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm font-semibold mb-3 text-gray-700">Preview</h4>
          <div className="grid grid-cols-2 gap-4">
            {options.map((opt, i) => (
              <div 
                key={i}
                className={`p-3 bg-white rounded-lg border-2 ${opt.correct ? 'border-green-500' : 'border-gray-200'} flex flex-col items-center`}
              >
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                  {opt.imageUrl ? (
                    <img src={opt.imageUrl} alt={opt.optionText} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <Image className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="text-center font-medium">{opt.optionText || `Option ${i + 1}`}</div>
                {opt.correct && <div className="text-xs text-green-600 mt-1">(Correct Answer)</div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {options.map((opt, i) => (
            <div
              className="bg-gray-50 rounded-xl p-4 shadow-sm"
              key={i}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={opt.correct}
                    onChange={(e) => onChangeOption(i, 'correct', e.target.checked)}
                    className="w-5 h-5 accent-blue-600 rounded"
                  />
                  <span className="text-sm font-semibold text-gray-600">Option {i + 1}</span>
                </div>
                <Button_admin
                  type="button"
                  className="rounded-full p-2 bg-red-100 hover:bg-red-200 text-red-600"
                  onClick={() => onRemoveOption(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button_admin>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium mb-1 block">Image</Label>
                  <div className="w-full h-40 bg-gray-100 rounded-lg mb-2 flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                    {opt.imageUrl ? (
                      <div className="relative w-full h-full">
                        <img src={opt.imageUrl} alt={opt.optionText} className="max-w-full max-h-full object-contain absolute inset-0 m-auto" />
                        <button 
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                          onClick={() => onChangeOption(i, 'imageUrl', '')}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Image className="w-12 h-12 text-gray-400 mb-2" />
                        <label className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                          Upload Image
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(i, e)}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium mb-1 block">Label Text</Label>
                  <Input_admin
                    value={opt.optionText}
                    onChange={(e) => onChangeOption(i, 'optionText', e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 h-10 text-base"
                    placeholder={`Option ${i + 1} label`}
                  />
                  {onOpenSuggest && (
                    <button
                      type="button"
                      className="mt-2 rounded-xl border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 px-3 py-2 text-xs font-semibold flex items-center gap-1 w-full justify-center"
                      onClick={() => onOpenSuggest(i)}
                    >
                      <BookOpen className="w-4 h-4 mr-1" />
                      Suggest Text
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-xl mt-4">
        <strong>Instructions:</strong>
        <ul className="mt-1 space-y-1">
          <li>• Add options with images and labels</li>
          <li>• Check the box for the correct answer(s)</li>
          <li>• Upload images for each option</li>
          <li>• Use "Show Preview" to see how the question will appear to students</li>
          <li>• You can have multiple correct answers for multiple-choice questions</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageChoiceEditor;
