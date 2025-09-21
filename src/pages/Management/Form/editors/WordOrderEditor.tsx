import React, { useState, useEffect } from 'react';
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Label } from '@/components/reuseables/Management/build/label';
import { Textarea } from '@/components/reuseables/Management/build/textarea';
import { X, Plus, ArrowUpDown, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface WordOrderEditorProps {
  initialData?: {
    words: string[];
    correctOrder: number[];
  };
  onChange: (data: {
    words: string[];
    correctOrder: number[];
  }) => void;
}

const WordOrderEditor: React.FC<WordOrderEditorProps> = ({ initialData, onChange }) => {
  const [words, setWords] = useState<string[]>(initialData?.words || []);
  const [correctOrder, setCorrectOrder] = useState<number[]>(initialData?.correctOrder || []);
  const [newWord, setNewWord] = useState('');

  // Cập nhật dữ liệu khi có thay đổi
  useEffect(() => {
    onChange({
      words,
      correctOrder,
    });
  }, [words, correctOrder, onChange]);

  // Thêm từ mới vào danh sách
  const addWord = () => {
    if (!newWord.trim()) {
      toast.error('Từ không được để trống', { autoClose: 1200 });
      return;
    }

    const updatedWords = [...words, newWord.trim()];
    setWords(updatedWords);
    
    // Cập nhật correctOrder để thêm từ mới vào cuối
    setCorrectOrder([...correctOrder, updatedWords.length - 1]);
    
    // Reset input
    setNewWord('');
  };

  // Xóa từ khỏi danh sách
  const removeWord = (index: number) => {
    const updatedWords = words.filter((_, i) => i !== index);
    setWords(updatedWords);
    
    // Cập nhật correctOrder sau khi xóa từ
    const updatedOrder = correctOrder
      .filter(pos => pos !== index) // Xóa vị trí của từ bị xóa
      .map(pos => (pos > index ? pos - 1 : pos)); // Giảm vị trí của các từ sau từ bị xóa
    
    setCorrectOrder(updatedOrder);
  };

  // Di chuyển từ lên trên trong thứ tự đúng
  const moveWordUp = (index: number) => {
    if (index === 0) return;
    
    const newOrder = [...correctOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;
    
    setCorrectOrder(newOrder);
  };

  // Di chuyển từ xuống dưới trong thứ tự đúng
  const moveWordDown = (index: number) => {
    if (index === correctOrder.length - 1) return;
    
    const newOrder = [...correctOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;
    
    setCorrectOrder(newOrder);
  };

  // Hiển thị câu hoàn chỉnh theo thứ tự đúng
  const getOrderedSentence = () => {
    return correctOrder.map(index => words[index]).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-bold text-orange-800 mb-2">Hướng dẫn</h3>
        <p className="text-orange-700 text-sm">
          Thêm các từ riêng lẻ vào danh sách. Sau đó, sắp xếp thứ tự đúng của các từ để tạo thành câu hoàn chỉnh.
          Học viên sẽ nhận được các từ theo thứ tự ngẫu nhiên và phải sắp xếp chúng thành câu có nghĩa.
        </p>
      </div>

      {/* Thêm từ mới */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label htmlFor="new-word">Thêm từ mới</Label>
          <Input_admin
            id="new-word"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Nhập từ hoặc cụm từ"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addWord();
              }
            }}
          />
        </div>
        <Button_admin
          type="button"
          onClick={addWord}
          className="mb-0.5"
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm
        </Button_admin>
      </div>

      {/* Danh sách các từ đã thêm */}
      {words.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold">Danh sách từ ({words.length})</h3>
          <div className="grid grid-cols-1 gap-2 p-4 bg-gray-50 rounded-lg">
            {words.map((word, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                <span className="font-medium">{index + 1}.</span>
                <span className="flex-1">{word}</span>
                <Button_admin
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWord(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button_admin>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sắp xếp thứ tự đúng */}
      {words.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold">Thứ tự đúng của câu</h3>
          <div className="grid grid-cols-1 gap-2 p-4 bg-blue-50 rounded-lg">
            {correctOrder.map((wordIndex, orderIndex) => (
              <div key={orderIndex} className="flex items-center gap-2 p-2 bg-white rounded border">
                <span className="font-medium">{orderIndex + 1}.</span>
                <span className="flex-1">{words[wordIndex]}</span>
                <div className="flex gap-1">
                  <Button_admin
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveWordUp(orderIndex)}
                    disabled={orderIndex === 0}
                    className="text-blue-500 hover:text-blue-700 disabled:opacity-30"
                  >
                    <ArrowUpDown className="w-4 h-4 rotate-180" />
                  </Button_admin>
                  <Button_admin
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveWordDown(orderIndex)}
                    disabled={orderIndex === correctOrder.length - 1}
                    className="text-blue-500 hover:text-blue-700 disabled:opacity-30"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button_admin>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Xem trước câu hoàn chỉnh */}
      {words.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-bold text-green-800 mb-2">Câu hoàn chỉnh</h3>
          <p className="text-green-700 font-medium">
            {getOrderedSentence()}
          </p>
        </div>
      )}
    </div>
  );
};

export default WordOrderEditor;