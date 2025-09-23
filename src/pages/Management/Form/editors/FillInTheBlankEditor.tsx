// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Label } from '@/components/reuseables/Management/build/label';
import { Textarea } from '@/components/reuseables/Management/build/textarea';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

type BlankPosition = {
  lineIndex: number;
  blankIndex: number;
  startPos: number;
  endPos: number;
};

type ConversationLine = {
  content: string;
  speaker: 'left' | 'right';
  blankPositions: BlankPosition[];
};

type FillInTheBlankData = {
  conversation: ConversationLine[];
  correctAnswer: {
    blanks: string[];
  };
};

type Props = {
  data: FillInTheBlankData;
  onChange: (data: FillInTheBlankData) => void;
};

const FillInTheBlankEditor: React.FC<Props> = ({ data, onChange }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [conversation, setConversation] = useState<ConversationLine[]>(
    data.conversation || [
      { content: '', speaker: 'left', blankPositions: [] },
      { content: '', speaker: 'right', blankPositions: [] }
    ]
  );
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(
    data.correctAnswer?.blanks || []
  );

  // Auto-generate blank positions when content changes
  const generateBlankPositions = (content: string): BlankPosition[] => {
    const positions: BlankPosition[] = [];
    const blankRegex = /___+/g;
    let match;
    let blankIndex = 0;

    while ((match = blankRegex.exec(content)) !== null) {
      positions.push({
        lineIndex: 0, // Will be updated per line
        blankIndex: blankIndex++,
        startPos: match.index,
        endPos: match.index + match[0].length
      });
    }

    return positions;
  };

  // Update conversation when content changes
  const updateConversation = (lineIndex: number, content: string) => {
    const newConversation = [...conversation];
    newConversation[lineIndex] = {
      ...newConversation[lineIndex],
      content,
      blankPositions: generateBlankPositions(content).map(pos => ({
        ...pos,
        lineIndex
      }))
    };
    setConversation(newConversation);
  };

  // Update correct answers
  const updateCorrectAnswer = (blankIndex: number, value: string) => {
    const newAnswers = [...correctAnswers];
    newAnswers[blankIndex] = value;
    setCorrectAnswers(newAnswers);
  };

  // Add new conversation line
  const addConversationLine = () => {
    setConversation([
      ...conversation,
      { content: '', speaker: 'left', blankPositions: [] }
    ]);
  };

  // Remove conversation line
  const removeConversationLine = (lineIndex: number) => {
    if (conversation.length > 1) {
      const newConversation = conversation.filter((_, index) => index !== lineIndex);
      setConversation(newConversation);
    }
  };

  // Toggle speaker
  const toggleSpeaker = (lineIndex: number) => {
    const newConversation = [...conversation];
    newConversation[lineIndex].speaker = 
      newConversation[lineIndex].speaker === 'left' ? 'right' : 'left';
    setConversation(newConversation);
  };

  // Count total blanks across all lines
  const totalBlanks = conversation.reduce(
    (total, line) => total + line.blankPositions.length, 
    0
  );

  // Ensure correct answers array matches total blanks
  useEffect(() => {
    if (correctAnswers.length < totalBlanks) {
      const newAnswers = [...correctAnswers];
      while (newAnswers.length < totalBlanks) {
        newAnswers.push('');
      }
      setCorrectAnswers(newAnswers);
    } else if (correctAnswers.length > totalBlanks) {
      setCorrectAnswers(correctAnswers.slice(0, totalBlanks));
    }
  }, [totalBlanks, correctAnswers.length]);

  // Notify parent of changes
  useEffect(() => {
    onChange({
      conversation,
      correctAnswer: {
        blanks: correctAnswers
      }
    });
  }, [conversation, correctAnswers, onChange]);

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-4">
        <Label className="text-base font-semibold">Fill in the Blank</Label>
        <div className="flex gap-2">
          <Button_admin
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-xl px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold flex items-center gap-1"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button_admin>
        </div>
      </div>

      {showPreview ? (
        // Preview Mode
        <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-700">Preview:</h4>
          <div className="space-y-3">
            {conversation.map((line, lineIndex) => (
              <div
                key={lineIndex}
                className={`max-w-[70%] p-3 rounded-2xl border-2 border-slate-300 ${
                  line.speaker === 'left' ? 'self-start' : 'self-end ml-auto'
                }`}
              >
                {line.content.split(/(___+)/).map((part, partIndex) => (
                  <React.Fragment key={partIndex}>
                    {part === '___' ? (
                      <span className="inline-block min-w-[100px] h-6 border-b-2 border-dashed border-gray-400 bg-yellow-100 mx-1">
                        {correctAnswers[line.blankPositions.find(pos => 
                          pos.lineIndex === lineIndex && 
                          line.content.substring(pos.startPos, pos.endPos) === part
                        )?.blankIndex || 0] || '___'}
                      </span>
                    ) : (
                      part
                    )}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Edit Mode
        <div className="space-y-4">
          {/* Conversation Lines */}
          <div className="space-y-3">
            {conversation.map((line, lineIndex) => (
              <div key={lineIndex} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button_admin
                    type="button"
                    onClick={() => toggleSpeaker(lineIndex)}
                    className={`px-3 py-1 text-xs rounded-lg ${
                      line.speaker === 'left' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {line.speaker === 'left' ? '👤 User' : '🤖 Bot'}
                  </Button_admin>
                  {conversation.length > 1 && (
                    <Button_admin
                      type="button"
                      onClick={() => removeConversationLine(lineIndex)}
                      className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button_admin>
                  )}
                </div>
                <Textarea
                  value={line.content}
                  onChange={(e) => updateConversation(lineIndex, e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 h-20 text-base"
                  placeholder="Enter conversation text... Use '___' for blanks (e.g., 'Hello, my name is ___')"
                />
                <div className="text-xs text-gray-500">
                  Blanks found: {line.blankPositions.length} | 
                  Use '___' to create fill-in-the-blank spaces
                </div>
              </div>
            ))}
          </div>

          {/* Add Line Button */}
          <Button_admin
            type="button"
            onClick={addConversationLine}
            className="rounded-xl px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Conversation Line
          </Button_admin>

          {/* Correct Answers */}
          {totalBlanks > 0 && (
            <div className="space-y-3 p-4 bg-yellow-50 rounded-xl">
              <Label className="text-base font-semibold text-yellow-800">
                Correct Answers ({totalBlanks} blanks)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: totalBlanks }, (_, blankIndex) => (
                  <div key={blankIndex} className="space-y-1">
                    <Label className="text-sm text-gray-600">
                      Blank {blankIndex + 1}:
                    </Label>
                    <Input_admin
                      value={correctAnswers[blankIndex] ?? ''}
                      onChange={(e) => updateCorrectAnswer(blankIndex, e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 h-10 text-base"
                      placeholder={`Answer for blank ${blankIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-xl">
            <strong>Instructions:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Use <code>___</code> (3 underscores) to create fill-in-the-blank spaces</li>
              <li>• Each line represents a conversation turn</li>
              <li>• Toggle between User (👤) and Bot (🤖) speakers</li>
              <li>• Provide correct answers for each blank in order</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FillInTheBlankEditor;
