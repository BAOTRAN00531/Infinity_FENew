import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Globe, Loader2 } from 'lucide-react';

// LanguagesCRUD - Component quản lý ngôn ngữ
// Xử lý CRUD operations cho các ngôn ngữ học trong hệ thống
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/reuseables/Management/build/dialog';
import { Badge } from '@/components/reuseables/Management/build/badge';
import LanguageForm from '@/pages/Management/Form/LanguageForm';
import LanguageDetails from '@/pages/Management/Detail/LanguageDetails';
import DeleteConfirmation from '@/pages/Management/DeleteConfirmation';
import api from '@/api/api';
import { toast } from 'react-toastify';

interface Language {
  id: number;
  name: string;
  code: string;
  flag: string;
  coursesCount?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  popularity?: 'High' | 'Medium' | 'Low';
}

const LanguagesCRUD = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/languages/with-course-count');
      const langs = response.data.map((lang: any) => ({
        id: lang.id,
        name: lang.name,
        code: lang.code,
        flag: lang.flag,
        difficulty: lang.difficulty || 'Medium',
        popularity: lang.popularity || 'Medium',
        coursesCount: lang.courseCount || 0,
      }));
      setLanguages(langs);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fetch languages");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: FormData) => {
    try {
      await api.post('/api/languages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Language created');
      setIsCreateOpen(false);
      fetchLanguages();
    } catch (error) {
      toast.error('Failed to create language');
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (!selectedLanguage) return;
    try {
      await api.put(`/api/languages/${selectedLanguage.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Language updated');
      setIsEditOpen(false);
      setSelectedLanguage(null);
      fetchLanguages();
    } catch (error) {
      toast.error('Failed to update language');
    }
  };

  const handleDelete = async () => {
    if (selectedLanguage) {
      try {
        await api.delete(`/api/languages/${selectedLanguage.id}`);
        fetchLanguages();
        setIsDeleteOpen(false);
        setSelectedLanguage(null);
        toast.success('Language deleted successfully');
      } catch (error) {
        toast.error('Failed to delete language');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-purple-100 text-purple-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading languages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">Languages Management</h2>
            <p className="text-gray-600">Manage supported languages</p>
          </div>
        </div>

        {/* <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button_admin className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              Add Language
            </Button_admin>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-[hsl(var(--foreground))] dark:text-[hsl(var(--primary))] drop-shadow-md">Create New Language</DialogTitle>
            </DialogHeader>
            <LanguageForm onSubmit={handleCreate} onCancel={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog> */}
      </div>

      {/*<div className="mb-6">*/}
      {/*  <Input_admin*/}
      {/*    placeholder="Search languages..."*/}
      {/*    value={searchTerm}*/}
      {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
      {/*    className="max-w-md rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"*/}
      {/*  />*/}
      {/*</div>*/}

      {filteredLanguages.length === 0 ? (
        <div className="text-center py-12">
          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No languages found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLanguages.map((language) => (
            <div
              key={language.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">
                  <img src={language.flag} alt="Flag" className="w-10 h-10 rounded-full mx-auto" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-1">{language.name}</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{language.code}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Courses:</span>
                  <span className="font-bold text-gray-800">{language.coursesCount || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Difficulty:</span>
                  <Badge className={`text-xs ${getDifficultyColor(language.difficulty || 'Medium')}`}>
                    {language.difficulty || 'Medium'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Popularity:</span>
                  <Badge className={`text-xs ${getPopularityColor(language.popularity || 'Medium')}`}>
                    {language.popularity || 'Medium'}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-center gap-2 pt-4 border-t border-gray-200">
                <Button_admin
                  variant="ghost"
                  size="sm"
                  className="rounded-xl hover:bg-blue-100"
                  onClick={() => {
                    setSelectedLanguage(language);
                    setIsViewOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button_admin>
                <Button_admin
                  variant="ghost"
                  size="sm"
                  className="rounded-xl hover:bg-yellow-100"
                  onClick={() => {
                    setSelectedLanguage(language);
                    setIsEditOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button_admin>
                {/*<Button_admin*/}
                {/*  variant="ghost"*/}
                {/*  size="sm"*/}
                {/*  className="rounded-xl hover:bg-red-100 text-red-500"*/}
                {/*  onClick={() => {*/}
                {/*    setSelectedLanguage(language);*/}
                {/*    setIsDeleteOpen(true);*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <Trash2 className="w-4 h-4" />*/}
                {/*</Button_admin>*/}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Edit Language</DialogTitle>
          </DialogHeader>
          {selectedLanguage && (
            <LanguageForm
              initialData={{
                ...selectedLanguage!,
                difficulty: selectedLanguage?.difficulty || 'Medium',
                popularity: selectedLanguage?.popularity || 'Medium',
              }}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Language Details</DialogTitle>
          </DialogHeader>
          {selectedLanguage && <LanguageDetails language={selectedLanguage} />}
        </DialogContent>
      </Dialog>

      {/*<Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>*/}
      {/*  <DialogContent className="max-w-md rounded-3xl">*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle className="text-2xl font-black text-gray-800">Delete Language</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    {selectedLanguage && (*/}
      {/*      <DeleteConfirmation*/}
      {/*        userName={selectedLanguage.name}*/}
      {/*        onConfirm={handleDelete}*/}
      {/*        onCancel={() => setIsDeleteOpen(false)}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}
    </div>
  );
};

export default LanguagesCRUD;
