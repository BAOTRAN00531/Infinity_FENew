import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, BookOpen, Volume2, Loader2, Mic } from 'lucide-react';

// LexiconCRUD - Component quản lý từ vựng
// Xử lý CRUD operations cho hệ thống từ điển và từ vựng
import { Button } from '@/components/reuseables/Management/build/button';
import { Input } from '@/components/reuseables/Management/build/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/reuseables/Management/build/dialog';
import { Badge } from '@/components/reuseables/Management/build/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/reuseables/Management/build/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/reuseables/Management/build/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/reuseables/Management/build/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/reuseables/Management/build/select';
import LexiconForm from  '@/pages/Management/Form/LexiconForm';
import LexiconDetails from '@/pages/Management/Detail/LexiconDetails';
import DeleteConfirmation from '@/pages/Management/DeleteConfirmation';
import { lexiconApi, Language } from '@/api/Management/lexiconApi';
import { toast } from 'react-toastify';

export interface LexiconUnit {
  id: number;
  text: string;
  ipa: string;
  meaning_en?: string;
  audio?: string;
  image?: string;
  type: 'vocabulary' | 'phrase';
  partOfSpeech?: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const LexiconCRUD = () => {
  const [units, setUnits] = useState<LexiconUnit[]>([]);
  const [phrases, setPhrases] = useState<LexiconUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<LexiconUnit | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('units');
  const [selectedLanguage, setSelectedLanguage] = useState('all'); // ✅ Thay đổi default thành 'all'
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [languages, setLanguages] = useState<Language[]>([]);

  // Load data from API on component mount
  useEffect(() => {
    loadData();
    loadLanguages();
    loadVoices();
  }, []);

  // ✅ Sửa lại useEffect để tránh conflict và đảm bảo ổn định
  useEffect(() => {
    if (selectedLanguage && languages.length > 0) {
      console.log('🌍 Language changed to:', selectedLanguage);
      console.log('📊 Current data stats:', {
        totalUnits: units.length,
        totalPhrases: phrases.length,
        selectedLanguage,
        availableLanguages: languages.map(l => l.code)
      });
      
      // ✅ Không gọi loadVoices() ở đây để tránh conflict
      // loadVoices() sẽ được gọi khi user thay đổi ngôn ngữ trong dropdown
    }
  }, [selectedLanguage, languages.length]); // ✅ Bỏ units.length, phrases.length để tránh re-render loop

  const loadData = async () => {
    try {
      setLoading(true);
      const [unitsResponse, phrasesResponse] = await Promise.all([
        lexiconApi.units.getVocabulary(),
        lexiconApi.units.getPhrases()
      ]);
      
      const mappedUnits = unitsResponse.result.map(mapResponseToLexiconUnit);
      const mappedPhrases = phrasesResponse.result.map(mapResponseToLexiconUnit);
      
      setUnits(mappedUnits);
      setPhrases(mappedPhrases);
    } catch (error) {
      console.error('Error loading lexicon data:', error);
      toast.error("Failed to load lexicon data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadLanguages = async () => {
    try {
      const languagesResponse = await lexiconApi.languages.getAll();
      setLanguages(languagesResponse);
      
      // Set default language to first available
      if (languagesResponse.length > 0) {
        setSelectedLanguage(languagesResponse[0].code);
      }
    } catch (error) {
      console.error('Error loading languages:', error);
      toast.error("Failed to load languages. Please try again.");
    }
  };

  const loadVoices = async () => {
    try {
      // ✅ Chỉ load voices khi cần thiết, không load mỗi khi thay đổi ngôn ngữ
      if (selectedLanguage === 'all') {
        // Nếu chọn "All Languages", lấy voices cho tất cả ngôn ngữ
        const voicesResponse = await lexiconApi.tts.getAvailableVoices();
        setAvailableVoices(voicesResponse);
      } else if (selectedLanguage && selectedLanguage !== 'all') {
        // Nếu chọn một ngôn ngữ cụ thể, lấy voices cho ngôn ngữ đó
        const voicesResponse = await lexiconApi.tts.getAvailableVoices(selectedLanguage);
        setAvailableVoices(voicesResponse);
      }
    } catch (error) {
      console.error('Error loading voices:', error);
      // Fallback: sử dụng 'en' nếu API fails
      try {
        const voicesResponse = await lexiconApi.tts.getAvailableVoices('en');
        setAvailableVoices(voicesResponse);
      } catch (fallbackError) {
        console.error('Fallback error loading voices:', fallbackError);
        setAvailableVoices([]);
      }
    }
  };

  const mapResponseToLexiconUnit = (response: any): LexiconUnit => {
    // Xử lý language một cách an toàn
    let language = 'en'; // Default value
    if (response.language) {
      if (typeof response.language === 'string') {
        language = response.language;
      } else if (typeof response.language === 'object' && response.language.code) {
        language = response.language.code;
      } else if (typeof response.language === 'object' && response.language.name) {
        language = response.language.name;
      }
    }

    return {
      id: response.id,
      text: response.text,
      ipa: response.ipa,
      meaning_en: response.meaningEn,
      audio: response.audio,
      image: response.image,
      type: response.type,
      partOfSpeech: response.partOfSpeech,
      language: language,
      difficulty: response.difficulty
    };
  };

  const filteredUnits = React.useMemo(() => {
    console.log('🔄 Recalculating filteredUnits...', {
      totalUnits: units.length,
      selectedLanguage,
      searchTerm
    });
    
    return units.filter(unit => {
      // Lọc theo searchTerm
      const matchesSearch = 
        unit.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.ipa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (unit.meaning_en && unit.meaning_en.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Lọc theo selectedLanguage
      const matchesLanguage = 
        selectedLanguage === 'all' || // ✅ Hiển thị tất cả ngôn ngữ
        unit.language === selectedLanguage || 
        (typeof unit.language === 'string' && unit.language.startsWith(selectedLanguage)) ||
        (typeof unit.language === 'object' && unit.language && (unit.language as any).code === selectedLanguage);
      
      console.log(`🔍 Unit "${unit.text}": search=${matchesSearch}, language=${matchesLanguage} (${unit.language} vs ${selectedLanguage})`);
      
      return matchesSearch && matchesLanguage;
    });
  }, [units, selectedLanguage, searchTerm]);

  const filteredPhrases = React.useMemo(() => {
    console.log('🔄 Recalculating filteredPhrases...', {
      totalPhrases: phrases.length,
      selectedLanguage,
      searchTerm
    });
    
    return phrases.filter(phrase => {
      // Lọc theo searchTerm
      const matchesSearch = 
        phrase.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phrase.ipa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (phrase.meaning_en && phrase.meaning_en.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Lọc theo selectedLanguage
      const matchesLanguage = 
        selectedLanguage === 'all' || // ✅ Hiển thị tất cả ngôn ngữ
        phrase.language === selectedLanguage || 
        (typeof phrase.language === 'string' && phrase.language.startsWith(selectedLanguage)) ||
        (typeof phrase.language === 'object' && phrase.language && (phrase.language as any).code === selectedLanguage);
      
      console.log(`🔍 Phrase "${phrase.text}": search=${matchesSearch}, language=${matchesLanguage} (${phrase.language} vs ${selectedLanguage})`);
      
      return matchesSearch && matchesLanguage;
    });
  }, [phrases, selectedLanguage, searchTerm]);

  // ✅ Thêm logging để debug kết quả lọc
  console.log('📊 Filtering results:', {
    searchTerm,
    selectedLanguage,
    totalUnits: units.length,
    totalPhrases: phrases.length,
    filteredUnits: filteredUnits.length,
    filteredPhrases: filteredPhrases.length,
    isAllLanguages: selectedLanguage === 'all'
  });

  // ✅ Thêm thông tin hiển thị cho user
  const getFilterInfo = () => {
    if (selectedLanguage === 'all') {
      return `Showing all languages (${filteredUnits.length + filteredPhrases.length} items)`;
    }
    const languageName = languages.find(l => l.code === selectedLanguage)?.name || selectedLanguage;
    return `Filtered by ${languageName} (${filteredUnits.length + filteredPhrases.length} items)`;
  };

  const handleCreate = async (data: Omit<LexiconUnit, 'id'>) => {
    try {
      const unitDto = {
        text: data.text,
        ipa: data.ipa,
        meaningEn: data.meaning_en,
        image: data.image,
        type: data.type,
        partOfSpeech: data.partOfSpeech,
        language: data.language,
        difficulty: data.difficulty
      };

      // Hiển thị loading message
      toast.info("Đang tạo từ vựng... Vui lòng đợi", {
        autoClose: 3000,
        hideProgressBar: false
      });

      const response = await lexiconApi.units.create(unitDto, data.language);
      const newUnit = mapResponseToLexiconUnit(response);
      
      if (data.type === 'vocabulary') {
        setUnits([...units, newUnit]);
      } else {
        setPhrases([...phrases, newUnit]);
      }
      
      // Thông báo thành công
      toast.success("Từ vựng đã được tạo thành công! Bạn có thể tạo audio sau bằng nút 🎤", {
        autoClose: 5000
      });
      setIsCreateOpen(false);
    } catch (error: any) {
      console.error('Error creating lexicon item:', error);
      
      // Xử lý các loại lỗi khác nhau
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        toast.error("Request timeout - TTS service đang xử lý. Vui lòng thử lại sau vài phút.", {
          autoClose: 10000
        });
      } else if (error.response?.status === 500) {
        toast.error("Lỗi server - Có thể do TTS service. Vui lòng thử lại.", {
          autoClose: 8000
        });
      } else {
        toast.error("Không thể tạo từ vựng. Vui lòng kiểm tra thông tin và thử lại.");
      }
    }
  };

  const handleUpdate = async (data: Omit<LexiconUnit, 'id'>) => {
    if (selectedItem) {
      try {
        const unitDto = {
          text: data.text,
          ipa: data.ipa,
          meaningEn: data.meaning_en,
          image: data.image,
          type: data.type,
          partOfSpeech: data.partOfSpeech,
          language: data.language,
          difficulty: data.difficulty
        };
        const response = await lexiconApi.units.update(selectedItem.id, unitDto);
        const updatedUnit = mapResponseToLexiconUnit(response);
        
        if (data.type === 'vocabulary') {
          setUnits(units.map(unit => 
            unit.id === selectedItem.id ? updatedUnit : unit
          ));
        } else {
          setPhrases(phrases.map(phrase => 
            phrase.id === selectedItem.id ? updatedUnit : phrase
          ));
        }
        
        toast.success("Lexicon item updated successfully!");
        setIsEditOpen(false);
        setSelectedItem(null);
      } catch (error) {
        console.error('Error updating lexicon item:', error);
        toast.error("Failed to update lexicon item. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    if (selectedItem) {
      try {
        await lexiconApi.units.delete(selectedItem.id);
        
        if (selectedItem.type === 'vocabulary') {
          setUnits(units.filter(unit => unit.id !== selectedItem.id));
        } else {
          setPhrases(phrases.filter(phrase => phrase.id !== selectedItem.id));
        }
        
        toast.success("Lexicon item deleted successfully!");
        setIsDeleteOpen(false);
        setSelectedItem(null);
      } catch (error) {
        console.error('Error deleting lexicon item:', error);
        toast.error("Failed to delete lexicon item. Please try again.");
      }
    }
  };

  const handleGenerateAudio = async (item: LexiconUnit) => {
    try {
      const response = await lexiconApi.units.generateAudio(item.id);
      const updatedItem = mapResponseToLexiconUnit(response);
      
      if (item.type === 'vocabulary') {
        setUnits(units.map(unit => 
          unit.id === item.id ? updatedItem : unit
        ));
      } else {
        setPhrases(phrases.map(phrase => 
          phrase.id === item.id ? updatedItem : phrase
        ));
      }
      
      toast.success("Audio generated successfully!");
    } catch (error) {
      console.error('Error generating audio:', error);
      toast.error("Failed to generate audio. Please try again.");
    }
  };

  const handleGenerateAudioWithVoice = async (item: LexiconUnit) => {
    if (!selectedVoice) {
      toast.error("Please select a voice first");
      return;
    }

    try {
      const response = await lexiconApi.units.generateAudioWithVoice(item.id, selectedVoice);
      const updatedItem = mapResponseToLexiconUnit(response);
      
      if (item.type === 'vocabulary') {
        setUnits(units.map(unit => 
          unit.id === item.id ? updatedItem : unit
        ));
      } else {
        setPhrases(phrases.map(phrase => 
          phrase.id === item.id ? updatedItem : phrase
        ));
      }
      
      toast.success("Audio generated with selected voice!");
    } catch (error) {
      console.error('Error generating audio with voice:', error);
      toast.error("Failed to generate audio with voice. Please try again.");
    }
  };

  const playAudio = (audioUrl?: string, text?: string, language?: string) => {
    if (audioUrl) {
      // Nếu có audio URL từ backend, phát audio đó
      const audio = new Audio(audioUrl);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        // Fallback to TTS nếu audio không phát được
        if (text && language) {
          playTTSWithLanguage(text, language);
        }
      });
    } else if (text && language) {
      // Nếu không có audio URL, sử dụng TTS của browser với ngôn ngữ phù hợp
      playTTSWithLanguage(text, language);
    }
  };

  // Hàm mới để phát TTS với ngôn ngữ phù hợp
  const playTTSWithLanguage = (text: string, language: string) => {
    // Dừng bất kỳ audio nào đang phát
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Tìm language object từ danh sách languages
    const languageObj = languages.find(lang => lang.code === language);
    
    // Thiết lập ngôn ngữ dựa trên language code từ database
    const languageMap: { [key: string]: string } = {
      'vi': 'vi-VN',
      'th-TH': 'th-TH', 
      'ms-MY': 'ms-MY',
      'fr-FR': 'fr-FR',
      'zh-CN': 'zh-CN',
      'vi-VN': 'vi-VN',
      'ar-EG': 'ar-EG',
      'ru-RU': 'ru-RU',
      'en': 'en-US',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'es': 'es-ES'
    };

    // Sử dụng language code từ database hoặc fallback
    utterance.lang = languageMap[language] || language || 'en-US';
    
    // Hàm để tìm và thiết lập voice
    const findAndSetVoice = () => {
      const voices = speechSynthesis.getVoices();
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      
      // Tìm giọng đọc phù hợp với ngôn ngữ
      const preferredVoice = voices.find(voice => {
        // Kiểm tra exact match trước
        if (voice.lang === utterance.lang) return true;
        
        // Kiểm tra language code base (trước dấu -)
        const baseLang = utterance.lang.split('-')[0];
        const voiceBaseLang = voice.lang.split('-')[0];
        return voiceBaseLang === baseLang;
      });
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        console.log(`Using voice: ${preferredVoice.name} for language: ${utterance.lang}`);
      } else {
        console.warn(`No suitable voice found for language: ${utterance.lang}`);
        // Fallback to first available voice
        if (voices.length > 0) {
          utterance.voice = voices[0];
          console.log(`Fallback to voice: ${voices[0].name}`);
        }
      }

      // Thiết lập tốc độ và pitch phù hợp
      utterance.rate = 0.8; // Chậm hơn một chút
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Xử lý lỗi
      utterance.onerror = (event) => {
        console.error('TTS Error:', event);
        const languageName = languageObj?.name || language;
        toast.error(`Cannot pronounce "${text}" in ${languageName}. Please generate audio instead.`);
      };

      utterance.onend = () => {
        console.log('TTS finished');
      };

      speechSynthesis.speak(utterance);
    };

    // Kiểm tra xem voices đã được load chưa
    if (speechSynthesis.getVoices().length > 0) {
      findAndSetVoice();
    } else {
      // Đợi voices được load
      speechSynthesis.onvoiceschanged = () => {
        findAndSetVoice();
        // Remove listener sau khi sử dụng
        speechSynthesis.onvoiceschanged = null;
      };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function để xử lý language an toàn
  const getSafeLanguage = (language: any): string => {
    if (!language) return 'EN';
    if (typeof language === 'string') return language.toUpperCase();
    if (typeof language === 'object' && language.code) return language.code.toUpperCase();
    if (typeof language === 'object' && language.name) return language.name.toUpperCase();
    return 'EN';
  };

  const LexiconCard = ({ item, type }: { item: LexiconUnit, type: 'unit' | 'phrase' }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center gap-2 mb-3">
        <Badge className="text-xs bg-blue-100 text-blue-800">
          {getSafeLanguage(item.language)}
        </Badge>
        <Badge className="text-xs bg-purple-100 text-purple-800">
          {item.type}
        </Badge>
        <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
          {item.difficulty}
        </Badge>
      </div>
      
      <div className="mb-3">
        <HoverCard>
          <HoverCardTrigger asChild>
            <h3 className="text-lg font-black text-gray-800 mb-1 cursor-pointer hover:text-blue-600">
              {item.text}
            </h3>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-bold">{item.text}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => playAudio(item.audio, item.text, item.language)}
                  className="p-1"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">IPA: {item.ipa}</p>
              {item.meaning_en && <p className="text-sm text-gray-500">{item.meaning_en}</p>}
              {item.image && (
                <Avatar className="w-16 h-16">
                  <AvatarImage src={item.image} alt={item.text} />
                  <AvatarFallback>{item.text.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
        <p className="text-sm text-gray-600 mb-1">IPA: {item.ipa}</p>
        {item.meaning_en && <p className="text-sm text-gray-700">{item.meaning_en}</p>}
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-xl hover:bg-green-100"
          onClick={() => playAudio(item.audio, item.text, item.language)}
        >
          <Volume2 className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-xl hover:bg-purple-100"
          onClick={() => handleGenerateAudio(item)}
          title="Generate Audio"
        >
          <Mic className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-xl hover:bg-blue-100"
          onClick={() => {
            setSelectedItem(item);
            setIsViewOpen(true);
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-xl hover:bg-yellow-100"
          onClick={() => {
            setSelectedItem(item);
            setIsEditOpen(true);
          }}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-xl hover:bg-red-100 text-red-500"
          onClick={() => {
            setSelectedItem(item);
            setIsDeleteOpen(true);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">Lexicon Management</h2>
            <p className="text-gray-600">Manage vocabulary and phrases dictionary</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              Add {activeTab === 'units' ? 'Word' : 'Phrase'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-gray-800">
                Create New {activeTab === 'units' ? 'Word' : 'Phrase'}
              </DialogTitle>
            </DialogHeader>
            <LexiconForm 
              onSubmit={handleCreate} 
              type={activeTab as 'units' | 'phrases'}
              units={units}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Search by text, pronunciation, or meaning..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
        />
        
        <div className="flex gap-2">
          <Select value={selectedLanguage} onValueChange={(value) => {
            console.log('🌍 Language selection changed from', selectedLanguage, 'to', value);
            setSelectedLanguage(value);
            // ✅ Chỉ load voices khi cần thiết, không load mỗi khi thay đổi ngôn ngữ
            if (value !== selectedLanguage) {
              // Chỉ load voices khi thực sự thay đổi ngôn ngữ
              setTimeout(() => loadVoices(), 100); // Delay nhỏ để tránh conflict
            }
          }}>
            <SelectTrigger className="w-32 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="w-48 rounded-xl">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              {availableVoices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ✅ Thêm thông tin filter */}
      <div className="mb-4 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
        {getFilterInfo()}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-2xl">
          <TabsTrigger value="units" className="rounded-xl">Vocabulary</TabsTrigger>
          <TabsTrigger value="phrases" className="rounded-xl">Phrases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="units" className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Loading lexicon units...</span>
            </div>
          ) : filteredUnits.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No lexicon units found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnits.map((unit) => (
                <LexiconCard key={unit.id} item={unit} type="unit" />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="phrases" className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Loading lexicon phrases...</span>
            </div>
          ) : filteredPhrases.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No lexicon phrases found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPhrases.map((phrase) => (
                <LexiconCard key={phrase.id} item={phrase} type="phrase" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">
              Edit {activeTab === 'units' ? 'Word' : 'Phrase'}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <LexiconForm
              initialData={selectedItem}
              onSubmit={handleUpdate}
              type={activeTab as 'units' | 'phrases'}
              units={units}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">
              {activeTab === 'units' ? 'Word' : 'Phrase'} Details
            </DialogTitle>
          </DialogHeader>
          {selectedItem && <LexiconDetails item={selectedItem} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">
              Delete {activeTab === 'units' ? 'Word' : 'Phrase'}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <DeleteConfirmation
              userName={selectedItem.text}
              onConfirm={handleDelete}
              onCancel={() => setIsDeleteOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LexiconCRUD;