-- =====================================================
-- MODULE 9: TRANSPORTATION AND DIRECTIONS (Lessons 92-96)
-- =====================================================

-- LESSON 92: Modes of Transportation (lesson_id = 92)
-- Question 233: How do you travel by air?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'How do you travel by air?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q233_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q233_Id, N'Airplane', 1, 1), (@Q233_Id, N'Car', 0, 2), (@Q233_Id, N'Bus', 0, 3), (@Q233_Id, N'Train', 0, 4);

-- Question 234: Complete: "I take the ___ to work every day."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'Complete the sentence: "I take the ___ to work every day."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q234_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q234_Id, N'bus'), (@Q234_Id, N'Bus'), (@Q234_Id, N'train'), (@Q234_Id, N'Train'), (@Q234_Id, N'subway'), (@Q234_Id, N'Subway');

-- Question 235: Speaking - Describe how you travel
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'Describe how you travel to school or work clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q235_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q235_Id, N'Clear description', 1, 1), (@Q235_Id, N'Unclear description', 0, 2);

-- Question 236: Text input - What vehicle has two wheels?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'What vehicle has two wheels?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q236_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q236_Id, N'bicycle'), (@Q236_Id, N'Bicycle'), (@Q236_Id, N'bike'), (@Q236_Id, N'Bike'), (@Q236_Id, N'motorcycle'), (@Q236_Id, N'Motorcycle');

-- Question 237: Select all public transportation
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'Select all public transportation:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q237_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q237_Id, N'Bus', 1, 1), (@Q237_Id, N'Train', 1, 2), (@Q237_Id, N'Subway', 1, 3), (@Q237_Id, N'Taxi', 1, 4), (@Q237_Id, N'Car', 0, 5), (@Q237_Id, N'Bicycle', 0, 6);

-- Question 238: Matching - Match transportation with speed
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'Match each transportation with its speed:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q238_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q238_Id, N'Airplane - Fast', 1, 1), (@Q238_Id, N'Bicycle - Slow', 1, 2), (@Q238_Id, N'Car - Medium', 1, 3), (@Q238_Id, N'Train - Fast', 1, 4);

-- Question 239: Reorder words - Arrange transportation description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'Arrange these words: "I drive car my to work"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q239_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q239_Id, N'I', 1, 1), (@Q239_Id, N'drive', 1, 2), (@Q239_Id, N'my', 1, 3), (@Q239_Id, N'car', 1, 4), (@Q239_Id, N'to', 1, 5), (@Q239_Id, N'work', 1, 6);

-- Question 240: Listening - Listen and identify the transportation
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'Listen to the audio and identify which transportation is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q240_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q240_Id, N'Motorcycle', 1, 1), (@Q240_Id, N'Car', 0, 2), (@Q240_Id, N'Bicycle', 0, 3), (@Q240_Id, N'Bus', 0, 4);

-- Question 241: What's the fastest way to travel long distances?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'What''s the fastest way to travel long distances?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q241_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q241_Id, N'Airplane', 1, 1), (@Q241_Id, N'Car', 0, 2), (@Q241_Id, N'Bus', 0, 3), (@Q241_Id, N'Bicycle', 0, 4);

-- Question 242: Text input - Complete: "I ride my ___ to school."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 92, N'Complete the sentence: "I ride my ___ to school."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q242_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q242_Id, N'bicycle'), (@Q242_Id, N'Bicycle'), (@Q242_Id, N'bike'), (@Q242_Id, N'Bike');

GO

-- LESSON 93: Places in the City (lesson_id = 93)
-- Question 243: Where do you go to buy food?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Where do you go to buy food?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q243_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q243_Id, N'Supermarket', 1, 1), (@Q243_Id, N'Hospital', 0, 2), (@Q243_Id, N'School', 0, 3), (@Q243_Id, N'Library', 0, 4);

-- Question 244: Complete: "I go to the ___ to see a doctor."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Complete the sentence: "I go to the ___ to see a doctor."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q244_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q244_Id, N'hospital'), (@Q244_Id, N'Hospital'), (@Q244_Id, N'clinic'), (@Q244_Id, N'Clinic');

-- Question 245: Speaking - Describe places in your city
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Describe important places in your city clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q245_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q245_Id, N'Clear description', 1, 1), (@Q245_Id, N'Unclear description', 0, 2);

-- Question 246: Text input - Where do you go to borrow books?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Where do you go to borrow books?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q246_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q246_Id, N'library'), (@Q246_Id, N'Library');

-- Question 247: Select all public places
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Select all public places:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q247_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q247_Id, N'Library', 1, 1), (@Q247_Id, N'Hospital', 1, 2), (@Q247_Id, N'Park', 1, 3), (@Q247_Id, N'Post office', 1, 4), (@Q247_Id, N'House', 0, 5), (@Q247_Id, N'Apartment', 0, 6);

-- Question 248: Matching - Match places with purposes
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Match each place with its purpose:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q248_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q248_Id, N'Hospital - Medical care', 1, 1), (@Q248_Id, N'Library - Reading books', 1, 2), (@Q248_Id, N'Park - Recreation', 1, 3), (@Q248_Id, N'Post office - Mail services', 1, 4);

-- Question 249: Reorder words - Arrange place description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Arrange these words: "I go to the park"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q249_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q249_Id, N'I', 1, 1), (@Q249_Id, N'go', 1, 2), (@Q249_Id, N'to', 1, 3), (@Q249_Id, N'the', 1, 4), (@Q249_Id, N'park', 1, 5);

-- Question 250: Listening - Listen and identify the place
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Listen to the audio and identify which place is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q250_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q250_Id, N'Bank', 1, 1), (@Q250_Id, N'Hospital', 0, 2), (@Q250_Id, N'Library', 0, 3), (@Q250_Id, N'Park', 0, 4);

-- Question 251: Where do you go to exercise outdoors?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Where do you go to exercise outdoors?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q251_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q251_Id, N'Park', 1, 1), (@Q251_Id, N'Hospital', 0, 2), (@Q251_Id, N'Library', 0, 3), (@Q251_Id, N'Bank', 0, 4);

-- Question 252: Text input - Complete: "I go to the ___ to buy medicine."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 93, N'Complete the sentence: "I go to the ___ to buy medicine."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q252_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q252_Id, N'pharmacy'), (@Q252_Id, N'Pharmacy'), (@Q252_Id, N'drugstore'), (@Q252_Id, N'Drugstore');

GO

-- LESSON 94: Asking for Directions (lesson_id = 94)
-- Question 253: How do you ask for directions politely?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'How do you ask for directions politely?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q253_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q253_Id, N'Excuse me, can you help me?', 1, 1), (@Q253_Id, N'Hey, where is it?', 0, 2), (@Q253_Id, N'Tell me where to go', 0, 3), (@Q253_Id, N'Help me now', 0, 4);

-- Question 254: Complete: "Excuse me, ___ is the library?"
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'Complete the sentence: "Excuse me, ___ is the library?"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q254_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q254_Id, N'where'), (@Q254_Id, N'WHERE');

-- Question 255: Speaking - Ask for directions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'Ask for directions to a specific place clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q255_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q255_Id, N'Clear request', 1, 1), (@Q255_Id, N'Unclear request', 0, 2);

-- Question 256: Text input - What do you say when you don't understand directions?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'What do you say when you don''t understand directions? (Write a complete sentence)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q256_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q256_Id, N'I don''t understand'), (@Q256_Id, N'Can you repeat that'), (@Q256_Id, N'Could you say that again'), (@Q256_Id, N'I''m sorry, I don''t understand');

-- Question 257: Select all polite ways to ask for help
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'Select all polite ways to ask for help:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q257_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q257_Id, N'Excuse me, can you help me?', 1, 1), (@Q257_Id, N'Could you please help me?', 1, 2), (@Q257_Id, N'I''m sorry, but could you help?', 1, 3), (@Q257_Id, N'Hey, help me', 0, 4), (@Q257_Id, N'Tell me now', 0, 5);

-- Question 258: Matching - Match questions with responses
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'Match each question with the appropriate response:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q258_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q258_Id, N'Where is the bank? - It''s on Main Street', 1, 1), (@Q258_Id, N'How far is it? - About 5 minutes walk', 1, 2), (@Q258_Id, N'Is it near here? - Yes, it''s very close', 1, 3), (@Q258_Id, N'Can you help me? - Of course, I''d be happy to help', 1, 4);

-- Question 259: Reorder words - Arrange direction question
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'Arrange these words: "where is the hospital"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q259_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q259_Id, N'Where', 1, 1), (@Q259_Id, N'is', 1, 2), (@Q259_Id, N'the', 1, 3), (@Q259_Id, N'hospital', 1, 4);

-- Question 260: Listening - Listen and identify the direction question
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'Listen to the audio and identify which direction question is being asked:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q260_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q260_Id, N'Where is the post office?', 1, 1), (@Q260_Id, N'How far is it?', 0, 2), (@Q260_Id, N'Is it near here?', 0, 3), (@Q260_Id, N'Can you help me?', 0, 4);

-- Question 261: What's the most polite way to start asking for directions?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'What''s the most polite way to start asking for directions?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q261_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q261_Id, N'Excuse me', 1, 1), (@Q261_Id, N'Hey', 0, 2), (@Q261_Id, N'Listen', 0, 3), (@Q261_Id, N'Stop', 0, 4);

-- Question 262: Text input - Complete: "___ me, where is the bank?"
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 94, N'Complete the sentence: "___ me, where is the bank?"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q262_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q262_Id, N'Excuse'), (@Q262_Id, N'excuse');

GO
