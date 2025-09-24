-- =====================================================
-- MODULE 8: WORK AND ACTIVITIES (Lessons 87-91)
-- =====================================================

-- LESSON 87: Jobs and Occupations (lesson_id = 87)
-- Question 203: Who teaches students in school?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'Who teaches students in school?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q203_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q203_Id, N'Teacher', 1, 1), (@Q203_Id, N'Doctor', 0, 2), (@Q203_Id, N'Engineer', 0, 3), (@Q203_Id, N'Lawyer', 0, 4);

-- Question 204: Complete: "A ___ helps sick people."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'Complete the sentence: "A ___ helps sick people."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q204_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q204_Id, N'doctor'), (@Q204_Id, N'Doctor'), (@Q204_Id, N'nurse'), (@Q204_Id, N'Nurse');

-- Question 205: Speaking - Describe your dream job
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'Describe your dream job clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q205_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q205_Id, N'Clear description', 1, 1), (@Q205_Id, N'Unclear description', 0, 2);

-- Question 206: Text input - What job involves cooking food?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'What job involves cooking food?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q206_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q206_Id, N'chef'), (@Q206_Id, N'Chef'), (@Q206_Id, N'cook'), (@Q206_Id, N'Cook');

-- Question 207: Select all medical professions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'Select all medical professions:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q207_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q207_Id, N'Doctor', 1, 1), (@Q207_Id, N'Nurse', 1, 2), (@Q207_Id, N'Dentist', 1, 3), (@Q207_Id, N'Pharmacist', 1, 4), (@Q207_Id, N'Teacher', 0, 5), (@Q207_Id, N'Engineer', 0, 6);

-- Question 208: Matching - Match jobs with workplaces
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'Match each job with its workplace:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q208_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q208_Id, N'Teacher - School', 1, 1), (@Q208_Id, N'Doctor - Hospital', 1, 2), (@Q208_Id, N'Chef - Restaurant', 1, 3), (@Q208_Id, N'Pilot - Airport', 1, 4);

-- Question 209: Reorder words - Arrange job description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'Arrange these words: "is a my father doctor"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q209_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q209_Id, N'My', 1, 1), (@Q209_Id, N'father', 1, 2), (@Q209_Id, N'is', 1, 3), (@Q209_Id, N'a', 1, 4), (@Q209_Id, N'doctor', 1, 5);

-- Question 210: Listening - Listen and identify the job
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'Listen to the audio and identify which job is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q210_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q210_Id, N'Engineer', 1, 1), (@Q210_Id, N'Teacher', 0, 2), (@Q210_Id, N'Doctor', 0, 3), (@Q210_Id, N'Lawyer', 0, 4);

-- Question 211: What job involves building houses?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'What job involves building houses?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q211_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q211_Id, N'Builder', 1, 1), (@Q211_Id, N'Teacher', 0, 2), (@Q211_Id, N'Doctor', 0, 3), (@Q211_Id, N'Chef', 0, 4);

-- Question 212: Text input - Complete: "A ___ drives a taxi."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 87, N'Complete the sentence: "A ___ drives a taxi."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q212_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q212_Id, N'driver'), (@Q212_Id, N'Driver'), (@Q212_Id, N'taxi driver'), (@Q212_Id, N'Taxi driver');

GO

-- LESSON 88: Workplace Vocabulary (lesson_id = 88)
-- Question 213: Where do people work in an office?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'Where do people work in an office?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q213_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q213_Id, N'Desk', 1, 1), (@Q213_Id, N'Bed', 0, 2), (@Q213_Id, N'Table', 0, 3), (@Q213_Id, N'Chair', 0, 4);

-- Question 214: Complete: "I use a ___ to type on the computer."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'Complete the sentence: "I use a ___ to type on the computer."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q214_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q214_Id, N'keyboard'), (@Q214_Id, N'Keyboard');

-- Question 215: Speaking - Describe your workplace
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'Describe your workplace clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q215_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q215_Id, N'Clear description', 1, 1), (@Q215_Id, N'Unclear description', 0, 2);

-- Question 216: Text input - What do you use to make phone calls at work?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'What do you use to make phone calls at work?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q216_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q216_Id, N'phone'), (@Q216_Id, N'Phone'), (@Q216_Id, N'telephone'), (@Q216_Id, N'Telephone');

-- Question 217: Select all office equipment
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'Select all office equipment:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q217_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q217_Id, N'Computer', 1, 1), (@Q217_Id, N'Printer', 1, 2), (@Q217_Id, N'Phone', 1, 3), (@Q217_Id, N'Fax machine', 1, 4), (@Q217_Id, N'Bed', 0, 5), (@Q217_Id, N'Refrigerator', 0, 6);

-- Question 218: Matching - Match equipment with functions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'Match each equipment with its function:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q218_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q218_Id, N'Computer - Work', 1, 1), (@Q218_Id, N'Printer - Print documents', 1, 2), (@Q218_Id, N'Phone - Make calls', 1, 3), (@Q218_Id, N'Fax machine - Send documents', 1, 4);

-- Question 219: Reorder words - Arrange workplace description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'Arrange these words: "I work in an office"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q219_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q219_Id, N'I', 1, 1), (@Q219_Id, N'work', 1, 2), (@Q219_Id, N'in', 1, 3), (@Q219_Id, N'an', 1, 4), (@Q219_Id, N'office', 1, 5);

-- Question 220: Listening - Listen and identify the workplace item
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'Listen to the audio and identify which workplace item is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q220_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q220_Id, N'Printer', 1, 1), (@Q220_Id, N'Computer', 0, 2), (@Q220_Id, N'Phone', 0, 3), (@Q220_Id, N'Desk', 0, 4);

-- Question 221: What do you use to store files at work?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'What do you use to store files at work?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q221_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q221_Id, N'Filing cabinet', 1, 1), (@Q221_Id, N'Refrigerator', 0, 2), (@Q221_Id, N'Bed', 0, 3), (@Q221_Id, N'Table', 0, 4);

-- Question 222: Text input - Complete: "I have a ___ at my desk."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 88, N'Complete the sentence: "I have a ___ at my desk."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q222_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q222_Id, N'computer'), (@Q222_Id, N'Computer'), (@Q222_Id, N'phone'), (@Q222_Id, N'Phone'), (@Q222_Id, N'lamp'), (@Q222_Id, N'Lamp');

GO

-- LESSON 89: Hobbies and Free Time (lesson_id = 89)
-- Question 223: What do you do for fun?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'What do you do for fun?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q223_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q223_Id, N'Read books', 1, 1), (@Q223_Id, N'Work', 0, 2), (@Q223_Id, N'Study', 0, 3), (@Q223_Id, N'Sleep', 0, 4);

-- Question 224: Complete: "I like to ___ in my free time."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'Complete the sentence: "I like to ___ in my free time."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q224_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q224_Id, N'read'), (@Q224_Id, N'Read'), (@Q224_Id, N'watch TV'), (@Q224_Id, N'Watch TV'), (@Q224_Id, N'play'), (@Q224_Id, N'Play');

-- Question 225: Speaking - Describe your hobbies
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'Describe your hobbies clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q225_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q225_Id, N'Clear description', 1, 1), (@Q225_Id, N'Unclear description', 0, 2);

-- Question 226: Text input - What hobby involves using a camera?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'What hobby involves using a camera?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q226_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q226_Id, N'photography'), (@Q226_Id, N'Photography'), (@Q226_Id, N'taking photos'), (@Q226_Id, N'Taking photos');

-- Question 227: Select all leisure activities
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'Select all leisure activities:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q227_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q227_Id, N'Reading', 1, 1), (@Q227_Id, N'Watching TV', 1, 2), (@Q227_Id, N'Playing sports', 1, 3), (@Q227_Id, N'Listening to music', 1, 4), (@Q227_Id, N'Working', 0, 5), (@Q227_Id, N'Studying', 0, 6);

-- Question 228: Matching - Match hobbies with equipment
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'Match each hobby with its equipment:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q228_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q228_Id, N'Photography - Camera', 1, 1), (@Q228_Id, N'Music - Guitar', 1, 2), (@Q228_Id, N'Sports - Ball', 1, 3), (@Q228_Id, N'Reading - Book', 1, 4);

-- Question 229: Reorder words - Arrange hobby description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'Arrange these words: "I enjoy playing guitar the"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q229_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q229_Id, N'I', 1, 1), (@Q229_Id, N'enjoy', 1, 2), (@Q229_Id, N'playing', 1, 3), (@Q229_Id, N'the', 1, 4), (@Q229_Id, N'guitar', 1, 5);

-- Question 230: Listening - Listen and identify the hobby
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'Listen to the audio and identify which hobby is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q230_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q230_Id, N'Swimming', 1, 1), (@Q230_Id, N'Reading', 0, 2), (@Q230_Id, N'Cooking', 0, 3), (@Q230_Id, N'Dancing', 0, 4);

-- Question 231: What hobby involves moving your body to music?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'What hobby involves moving your body to music?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q231_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q231_Id, N'Dancing', 1, 1), (@Q231_Id, N'Reading', 0, 2), (@Q231_Id, N'Cooking', 0, 3), (@Q231_Id, N'Swimming', 0, 4);

-- Question 232: Text input - Complete: "My favorite hobby is ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 89, N'Complete the sentence: "My favorite hobby is ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q232_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q232_Id, N'reading'), (@Q232_Id, N'Reading'), (@Q232_Id, N'cooking'), (@Q232_Id, N'Cooking'), (@Q232_Id, N'swimming'), (@Q232_Id, N'Swimming');

GO
