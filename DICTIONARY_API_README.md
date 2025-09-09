# Dictionary API Integration Guide

## Tổng quan
Dictionary API đã được cập nhật để kết nối với backend Spring Boot thực tế thay vì sử dụng dữ liệu cứng.

## Backend Endpoints

### 1. Dictionary API

#### Search Word
```
GET /api/dictionary?lang={languageCode}&word={word}
```

**Parameters:**
- `lang`: Mã ngôn ngữ (en, ja, cmn-cn, ko, de, ru, fr, es)
- `word`: Từ cần tìm kiếm

#### Get Suggestions
```
GET /api/dictionary/suggest?lang={languageCode}&query={query}
```

**Parameters:**
- `lang`: Mã ngôn ngữ
- `query`: Chuỗi tìm kiếm (tối thiểu 2 ký tự)

### 2. TTS API

#### Synthesize Text
```
GET /api/tts/synthesize?text={text}&languageCode={languageCode}
```

**Parameters:**
- `text`: Văn bản cần chuyển thành giọng nói
- `languageCode`: Mã ngôn ngữ (en-US, fr-FR, zh-CN, etc.)

#### Get Available Voices
```
GET /api/tts/voices?languageCode={languageCode}
```

**Parameters:**
- `languageCode`: Mã ngôn ngữ để lấy danh sách voices

#### Get Supported Languages
```
GET /api/tts/supported-languages
```

**Response:** Map của language codes và tên ngôn ngữ

**Response:**
```json
{
  "word": "hello",
  "language": "en",
  "pronunciation": "/həˈloʊ/",
  "meanings": ["Used as a greeting"],
  "audioUrl": "data:audio/mp3;base64,...",
  "error": null,
  "partOfSpeech": "interjection",
  "examples": ["Hello, how are you?"]
}
```

### 2. Get Suggestions
```
GET /api/dictionary/suggest?lang={languageCode}&query={query}
```

**Parameters:**
- `lang`: Mã ngôn ngữ
- `query`: Chuỗi tìm kiếm (tối thiểu 2 ký tự)

**Response:**
```json
["hello", "help", "here", "home"]
```

## Frontend Usage

### 1. Search Word
```typescript
import { dictionaryApi } from '@/api/dictionaryApi';

// Tìm kiếm từ
const result = await dictionaryApi.searchByLanguage('en', 'hello');
console.log(result);
```

### 2. Get Suggestions
```typescript
import { dictionaryHelpers } from '@/api/dictionaryApi';

// Lấy gợi ý từ backend
const suggestions = await dictionaryHelpers.generateSuggestions('he', 'en');
console.log(suggestions);
```

## Fallback Mechanism

Nếu backend API không khả dụng, hệ thống sẽ tự động fallback về suggestions cục bộ:

```typescript
// Tự động fallback nếu API fails
const suggestions = await dictionaryHelpers.generateSuggestions('he', 'en');
// Nếu API fail → sử dụng generateLocalSuggestions()
```

## Error Handling

API có xử lý lỗi chi tiết:

1. **Network Error**: Log chi tiết và fallback
2. **API Error**: Log response status và data
3. **Validation Error**: Kiểm tra parameters trước khi gọi API

## Language Support

| Language | Code | API Source | Features |
|----------|------|------------|----------|
| English | en | DictionaryAPI.dev | Definitions, pronunciation, examples |
| Japanese | ja | KanjiAPI + JMdict | Kanji info, radicals, stroke count |
| Chinese | cmn-cn | CC-CEDICT | Pinyin, meanings |
| Korean | ko | Wiktionary API | Definitions, examples |
| German | de | dictionaryapi.dev | Definitions |
| Russian | ru | dictionaryapi.dev | Definitions |
| French | fr | dictionaryapi.dev | Definitions |
| Spanish | es | dictionaryapi.dev | Definitions |

**Lưu ý về Language Codes:**

**1. Dictionary API (Backend):**
- Cần language codes đơn giản: `en`, `ja`, `fr`, `zh`, `ko`, `de`, `ru`, `es`
- Frontend tự động normalize: `en-US` → `en`, `fr-FR` → `fr`
- Sử dụng `dictionaryHelpers.normalizeLanguageCode()`

**2. TTS Service (Google):**
- Cần language codes đầy đủ: `en-US`, `fr-FR`, `zh-CN`, `ja-JP`
- Database đã lưu đúng format này
- Không cần normalize, sử dụng trực tiếp

**3. Cách hoạt động:**
```typescript
// Dictionary API: normalize language code
const normalizedLang = dictionaryHelpers.normalizeLanguageCode('en-US'); // → 'en'
const suggestions = await dictionaryApi.getSuggestions(normalizedLang, 'hello');

// TTS: giữ nguyên language code
utterance.lang = formData.language; // → 'en-US' (đúng cho Google TTS)
```

## Testing

### Test API Connection
```typescript
// Kiểm tra kết nối
const health = await dictionaryApi.health();
console.log('API Health:', health);

// Test suggestions
const testSuggestions = await dictionaryApi.getSuggestions('en', 'test');
console.log('Test suggestions:', testSuggestions);
```

### Debug Mode
Trong `LexiconForm.tsx`, có button "🧪 Debug Test" để kiểm tra:
- API connection
- Language support
- Suggestions generation
- Error handling

## Backend Implementation Notes

### 1. Service Structure
- `DictionaryService`: Main orchestrator
- `JapaneseDictionaryService`: Xử lý tiếng Nhật
- `ChineseDictionaryService`: Xử lý tiếng Trung
- `KoreanDictionaryService`: Xử lý tiếng Hàn
- `EuropeanDictionaryService`: Xử lý các ngôn ngữ châu Âu

### 2. TODO Items
- Implement CC-CEDICT API call
- Implement KanjiAPI integration
- Implement Wiktionary API call
- Add caching layer
- Implement rate limiting

### 3. TTS Integration
Tất cả services đều tích hợp với `TextToSpeechService` để tạo audio pronunciation.

**Frontend TTS Flow:**
1. Gọi `/api/tts/synthesize` với text và languageCode
2. Nhận base64 audio data từ backend
3. Tạo Audio element và phát
4. Fallback về browser TTS nếu API fail

**Backend TTS Features:**
- Google Cloud TTS integration
- Support multiple languages (en-US, fr-FR, zh-CN, etc.)
- Voice selection by gender và name
- MP3 audio output
- Language code mapping service

## Performance Optimization

1. **Debouncing**: Frontend có 300ms delay trước khi gọi API
2. **Caching**: Backend có thể implement Redis cache
3. **Rate Limiting**: Bảo vệ API khỏi spam requests
4. **Fallback**: Luôn có suggestions cục bộ khi API fail

## Monitoring

- Console logs chi tiết cho debugging
- Error tracking và fallback logging
- API response time monitoring
- Health check endpoint
