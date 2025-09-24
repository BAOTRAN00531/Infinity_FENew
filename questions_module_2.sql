-- =====================================================
-- MODULE 2: PERSONAL INFORMATION (Lessons 57-61)
-- =====================================================

-- LESSON 57: What's Your Name? (lesson_id = 57)
-- Question 23: How do you ask someone's name politely?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'How do you ask someone''s name politely?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q23_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q23_Id, N'What your name?', 0, 1), (@Q23_Id, N'What''s your name?', 1, 2), (@Q23_Id, N'Your name what?', 0, 3), (@Q23_Id, N'Name you?', 0, 4);

-- Question 24: Complete the sentence: "My name ___ John."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'Complete the sentence: "My name ___ John."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q24_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q24_Id, N'is'), (@Q24_Id, N'IS');

-- Question 25: Speaking - Introduce yourself
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'Introduce yourself by saying your name clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'easy', 8, 1);
DECLARE @Q25_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q25_Id, N'Clear introduction', 1, 1), (@Q25_Id, N'Unclear introduction', 0, 2);

-- Question 26: Text input - How do you respond to "What's your name?"
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'How do you respond to "What''s your name?" (Write a complete sentence)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q26_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q26_Id, N'My name is [name]'), (@Q26_Id, N'I am [name]'), (@Q26_Id, N'I''m [name]');

-- Question 27: Select all correct ways to ask for a name
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'Select all correct ways to ask for someone''s name:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q27_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q27_Id, N'What''s your name?', 1, 1), (@Q27_Id, N'May I have your name?', 1, 2), (@Q27_Id, N'Could you tell me your name?', 1, 3), (@Q27_Id, N'Name you?', 0, 4), (@Q27_Id, N'Your name what?', 0, 5);

-- Question 28: Matching - Match questions with responses
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'Match each question with the correct response:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q28_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q28_Id, N'What''s your name? - My name is Sarah', 1, 1), (@Q28_Id, N'How are you? - I''m fine, thank you', 1, 2), (@Q28_Id, N'Nice to meet you - Nice to meet you too', 1, 3), (@Q28_Id, N'Good morning - Good morning', 1, 4);

-- Question 29: Reorder words - Arrange the introduction
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'Arrange these words to make a proper introduction: "Hello, name my is John"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q29_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q29_Id, N'Hello', 1, 1), (@Q29_Id, N'my', 1, 2), (@Q29_Id, N'name', 1, 3), (@Q29_Id, N'is', 1, 4), (@Q29_Id, N'John', 1, 5);

-- Question 30: Listening - Listen and identify the name
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'Listen to the audio and identify the name being said:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q30_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q30_Id, N'Michael', 1, 1), (@Q30_Id, N'Matthew', 0, 2), (@Q30_Id, N'Mark', 0, 3), (@Q30_Id, N'Martin', 0, 4);

-- Question 31: What's the polite way to ask for someone's name in a formal situation?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'What''s the polite way to ask for someone''s name in a formal situation?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'medium', 5, 1);
DECLARE @Q31_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q31_Id, N'What''s your name?', 0, 1), (@Q31_Id, N'May I have your name, please?', 1, 2), (@Q31_Id, N'Name?', 0, 3), (@Q31_Id, N'Your name what?', 0, 4);

-- Question 32: Text input - Complete: "___ name is Maria."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 57, N'Complete the sentence: "___ name is Maria."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q32_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q32_Id, N'My'), (@Q32_Id, N'my'), (@Q32_Id, N'Her'), (@Q32_Id, N'her');

GO

-- LESSON 58: Where Are You From? (lesson_id = 58)
-- Question 33: How do you ask where someone is from?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'How do you ask where someone is from?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q33_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q33_Id, N'Where you from?', 0, 1), (@Q33_Id, N'Where are you from?', 1, 2), (@Q33_Id, N'You from where?', 0, 3), (@Q33_Id, N'From where you?', 0, 4);

-- Question 34: Complete: "I am ___ Vietnam."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'Complete the sentence: "I am ___ Vietnam."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q34_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q34_Id, N'from'), (@Q34_Id, N'FROM');

-- Question 35: Speaking - Say where you are from
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'Say where you are from clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'easy', 8, 1);
DECLARE @Q35_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q35_Id, N'Clear pronunciation', 1, 1), (@Q35_Id, N'Unclear pronunciation', 0, 2);

-- Question 36: Text input - What nationality are people from Japan?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'What nationality are people from Japan?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q36_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q36_Id, N'Japanese'), (@Q36_Id, N'japanese');

-- Question 37: Select all countries from Asia
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'Select all countries from Asia:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q37_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q37_Id, N'Japan', 1, 1), (@Q37_Id, N'China', 1, 2), (@Q37_Id, N'Korea', 1, 3), (@Q37_Id, N'Thailand', 1, 4), (@Q37_Id, N'Brazil', 0, 5), (@Q37_Id, N'Germany', 0, 6);

-- Question 38: Matching - Match countries with nationalities
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'Match each country with its nationality:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q38_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q38_Id, N'France - French', 1, 1), (@Q38_Id, N'Germany - German', 1, 2), (@Q38_Id, N'Spain - Spanish', 1, 3), (@Q38_Id, N'Italy - Italian', 1, 4);

-- Question 39: Reorder words - Arrange the sentence about origin
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'Arrange these words: "from am I Canada"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q39_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q39_Id, N'I', 1, 1), (@Q39_Id, N'am', 1, 2), (@Q39_Id, N'from', 1, 3), (@Q39_Id, N'Canada', 1, 4);

-- Question 40: Listening - Listen and identify the country
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'Listen to the audio and identify which country is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q40_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q40_Id, N'Australia', 1, 1), (@Q40_Id, N'Austria', 0, 2), (@Q40_Id, N'Argentina', 0, 3), (@Q40_Id, N'Afghanistan', 0, 4);

-- Question 41: What's the correct way to say "I'm from the United States"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'What''s the correct way to say "I''m from the United States"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q41_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q41_Id, N'I''m from the United States', 1, 1), (@Q41_Id, N'I''m from United States', 0, 2), (@Q41_Id, N'I''m from USA', 0, 3), (@Q41_Id, N'I from United States', 0, 4);

-- Question 42: Text input - Complete: "She is ___ American."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 58, N'Complete the sentence: "She is ___ American."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q42_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q42_Id, N'an'), (@Q42_Id, N'AN');

GO

-- LESSON 59: How Old Are You? (lesson_id = 59)
-- Question 43: How do you ask someone's age?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'How do you ask someone''s age?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q43_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q43_Id, N'How old you?', 0, 1), (@Q43_Id, N'How old are you?', 1, 2), (@Q43_Id, N'You old how?', 0, 3), (@Q43_Id, N'Old you how?', 0, 4);

-- Question 44: Complete: "I am ___ years old."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'Complete the sentence: "I am ___ years old."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q44_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q44_Id, N'25'), (@Q44_Id, N'30'), (@Q44_Id, N'20'), (@Q44_Id, N'35');

-- Question 45: Speaking - Say your age
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'Say your age clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'easy', 8, 1);
DECLARE @Q45_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q45_Id, N'Clear pronunciation', 1, 1), (@Q45_Id, N'Unclear pronunciation', 0, 2);

-- Question 46: Text input - How do you say "I'm 25 years old"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'How do you say "I''m 25 years old"? (Write the complete sentence)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q46_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q46_Id, N'I am 25 years old'), (@Q46_Id, N'I''m 25 years old'), (@Q46_Id, N'I am twenty-five years old'), (@Q46_Id, N'I''m twenty-five years old');

-- Question 47: Select all correct ways to express age
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'Select all correct ways to express age:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q47_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q47_Id, N'I am 20 years old', 1, 1), (@Q47_Id, N'I''m 20 years old', 1, 2), (@Q47_Id, N'I am twenty years old', 1, 3), (@Q47_Id, N'I''m twenty', 0, 4), (@Q47_Id, N'I have 20 years', 0, 5);

-- Question 48: Matching - Match ages with life stages
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'Match each age with the appropriate life stage:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q48_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q48_Id, N'5 years old - child', 1, 1), (@Q48_Id, N'16 years old - teenager', 1, 2), (@Q48_Id, N'25 years old - young adult', 1, 3), (@Q48_Id, N'65 years old - senior', 1, 4);

-- Question 49: Reorder words - Arrange the age question
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'Arrange these words: "old how you are"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q49_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q49_Id, N'How', 1, 1), (@Q49_Id, N'old', 1, 2), (@Q49_Id, N'are', 1, 3), (@Q49_Id, N'you', 1, 4);

-- Question 50: Listening - Listen and identify the age
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'Listen to the audio and identify which age is being said:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q50_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q50_Id, N'28', 1, 1), (@Q50_Id, N'18', 0, 2), (@Q50_Id, N'38', 0, 3), (@Q50_Id, N'48', 0, 4);

-- Question 51: What's the polite way to ask someone's age?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'What''s the polite way to ask someone''s age?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'medium', 5, 1);
DECLARE @Q51_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q51_Id, N'How old are you?', 0, 1), (@Q51_Id, N'May I ask how old you are?', 1, 2), (@Q51_Id, N'What''s your age?', 0, 3), (@Q51_Id, N'Age you?', 0, 4);

-- Question 52: Text input - Complete: "He is ___ years old."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 59, N'Complete the sentence: "He is ___ years old."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q52_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q52_Id, N'30'), (@Q52_Id, N'35'), (@Q52_Id, N'40'), (@Q52_Id, N'45');

GO
