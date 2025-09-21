import api from "./api";
import { Language } from "./types";

/**
 * Lấy danh sách tất cả ngôn ngữ
 */
export const fetchLanguages = async (): Promise<Language[]> => {
  const response = await api.get<Language[]>("/languages");
  return response.data;
};

/**
 * Lấy ngôn ngữ theo ID
 */
export const fetchLanguageById = async (id: number): Promise<Language> => {
  const response = await api.get<Language>(`/languages/${id}`);
  return response.data;
};

/**
 * Lấy ngôn ngữ United States (tiếng Anh)
 */
export const fetchEnglishLanguage = async (): Promise<Language> => {
  // Giả định rằng tiếng Anh có ID là 1 hoặc có code là 'en'
  // Nếu không chắc chắn, bạn có thể lấy tất cả ngôn ngữ và lọc
  const languages = await fetchLanguages();
  const english = languages.find(lang => 
    lang.code === 'en' || 
    lang.name.toLowerCase().includes('english') ||
    lang.name.toLowerCase().includes('united states')
  );
  
  if (!english) {
    throw new Error("Không tìm thấy ngôn ngữ tiếng Anh");
  }
  
  return english;
};

/**
 * Lấy danh sách module theo ngôn ngữ
 */
export const fetchModulesByLanguage = async (languageId: number): Promise<any[]> => {
  try {
    // Sử dụng languageId được truyền vào
    const response = await api.get(`/modules/by-language/${languageId}`);
    return response.data;
  } catch (error) {
    console.warn(`Không thể lấy module cho ngôn ngữ ID ${languageId}. Sử dụng dữ liệu mẫu.`, error);
    // Trả về dữ liệu mẫu khi API không hoạt động
    return [
      {
        id: 1,
        name: "Bảng chữ cái",
        description: "Đây là bảng chữ cái",
        status: "active"
      },
      {
        id: 2,
        name: "Thì hiện tại đơn",
        description: "Simple Present Tense",
        status: "not-started"
      },
      {
        id: 3,
        name: "Thì hiện tại tiếp diễn",
        description: "Present Continuous Tense",
        status: "not-started"
      },
      {
        id: 4,
        name: "Thì hiện tại hoàn thành",
        description: "Present Perfect Tense",
        status: "not-started"
      },
      {
        id: 5,
        name: "Thì hiện tại hoàn thành tiếp diễn",
        description: "Present Perfect Continuous Tense",
        status: "not-started"
      },
      {
        id: 6,
        name: "Thì quá khứ đơn",
        description: "Simple Past Tense",
        status: "not-started"
      },
      {
        id: 7,
        name: "Thì quá khứ tiếp diễn",
        description: "Past Continuous Tense",
        status: "not-started"
      },
      {
        id: 8,
        name: "Thì quá khứ hoàn thành",
        description: "Past Perfect Tense",
        status: "not-started"
      }
    ];
  }
};