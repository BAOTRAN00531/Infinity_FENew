//	Ánh xạ chung (dùng đa mục đích)
export * from '@/utils/question/mapQuestion';


//Edit câu hỏi
export * from '@/utils/question/mapQuestionDtoToUIQuestion';


//Gửi answer về backend
export * from '@/utils/question/mapUIQuestionToAnswerDto';

//Gửi tạo mới câu hỏi
export * from '@/utils/question/mapUIQuestionToCreateDto';


//Gửi cập nhật câu hỏi
export * from '@/utils/question/mapUIQuestionToUpdateDto';

//Load từ API để hiển thị UI
export * from '@/utils/question/mapQuestionResponseToUIQuestion';