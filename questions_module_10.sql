-- =====================================================
-- MODULE 10: REVIEW AND COMMUNICATION (Lessons 97-101)
-- =====================================================

-- LESSON 97: Past Tense - To Be (lesson_id = 97)
-- Question 263: What's the past tense of "am"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'What''s the past tense of "am"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q263_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q263_Id, N'Was', 1, 1), (@Q263_Id, N'Were', 0, 2), (@Q263_Id, N'Is', 0, 3), (@Q263_Id, N'Are', 0, 4);

-- Question 264: Complete: "Yesterday, I ___ at home."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'Complete the sentence: "Yesterday, I ___ at home."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q264_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q264_Id, N'was'), (@Q264_Id, N'WAS');

-- Question 265: Speaking - Use past tense of "to be"
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'Tell me what you were doing yesterday using past tense of "to be".',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q265_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q265_Id, N'Correct past tense usage', 1, 1), (@Q265_Id, N'Incorrect past tense usage', 0, 2);

-- Question 266: Text input - What's the past tense of "are"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'What''s the past tense of "are"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q266_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q266_Id, N'were'), (@Q266_Id, N'Were');

-- Question 267: Select all correct past tense forms
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'Select all correct past tense forms:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q267_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q267_Id, N'I was', 1, 1), (@Q267_Id, N'You were', 1, 2), (@Q267_Id, N'He was', 1, 3), (@Q267_Id, N'They were', 1, 4), (@Q267_Id, N'I were', 0, 5), (@Q267_Id, N'He were', 0, 6);

-- Question 268: Matching - Match present with past tense
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'Match each present tense with its past tense:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q268_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q268_Id, N'I am - I was', 1, 1), (@Q268_Id, N'You are - You were', 1, 2), (@Q268_Id, N'He is - He was', 1, 3), (@Q268_Id, N'They are - They were', 1, 4);

-- Question 269: Reorder words - Arrange past tense sentence
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'Arrange these words: "was I yesterday happy"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q269_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q269_Id, N'I', 1, 1), (@Q269_Id, N'was', 1, 2), (@Q269_Id, N'happy', 1, 3), (@Q269_Id, N'yesterday', 1, 4);

-- Question 270: Listening - Listen and identify past tense
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'Listen to the audio and identify which past tense form is being used:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q270_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q270_Id, N'Were', 1, 1), (@Q270_Id, N'Was', 0, 2), (@Q270_Id, N'Is', 0, 3), (@Q270_Id, N'Are', 0, 4);

-- Question 271: What's the past tense of "is"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'What''s the past tense of "is"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q271_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q271_Id, N'Was', 1, 1), (@Q271_Id, N'Were', 0, 2), (@Q271_Id, N'Is', 0, 3), (@Q271_Id, N'Are', 0, 4);

-- Question 272: Text input - Complete: "Last week, they ___ at school."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 97, N'Complete the sentence: "Last week, they ___ at school."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q272_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q272_Id, N'were'), (@Q272_Id, N'WERE');

GO

-- LESSON 98: Making Plans (lesson_id = 98)
-- Question 273: How do you express future plans?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'How do you express future plans?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q273_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q273_Id, N'I am going to study', 1, 1), (@Q273_Id, N'I study yesterday', 0, 2), (@Q273_Id, N'I studied last week', 0, 3), (@Q273_Id, N'I study now', 0, 4);

-- Question 274: Complete: "Tomorrow, I ___ going to visit my friend."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'Complete the sentence: "Tomorrow, I ___ going to visit my friend."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q274_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q274_Id, N'am'), (@Q274_Id, N'AM');

-- Question 275: Speaking - Talk about your future plans
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'Tell me about your plans for next week using "going to".',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q275_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q275_Id, N'Correct future tense usage', 1, 1), (@Q275_Id, N'Incorrect future tense usage', 0, 2);

-- Question 276: Text input - What's the correct form: "I ___ going to travel next month"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'What''s the correct form: "I ___ going to travel next month"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q276_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q276_Id, N'am'), (@Q276_Id, N'AM');

-- Question 277: Select all correct future plans
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'Select all correct future plans:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q277_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q277_Id, N'I am going to study', 1, 1), (@Q277_Id, N'She is going to work', 1, 2), (@Q277_Id, N'They are going to travel', 1, 3), (@Q277_Id, N'We are going to eat', 1, 4), (@Q277_Id, N'I going to study', 0, 5), (@Q277_Id, N'She going to work', 0, 6);

-- Question 278: Matching - Match plans with time expressions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'Match each plan with the appropriate time expression:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q278_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q278_Id, N'I am going to study - Tomorrow', 1, 1), (@Q278_Id, N'She is going to work - Next week', 1, 2), (@Q278_Id, N'They are going to travel - Next month', 1, 3), (@Q278_Id, N'We are going to eat - Tonight', 1, 4);

-- Question 279: Reorder words - Arrange future plan
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'Arrange these words: "going to I am study tomorrow"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q279_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q279_Id, N'I', 1, 1), (@Q279_Id, N'am', 1, 2), (@Q279_Id, N'going', 1, 3), (@Q279_Id, N'to', 1, 4), (@Q279_Id, N'study', 1, 5), (@Q279_Id, N'tomorrow', 1, 6);

-- Question 280: Listening - Listen and identify future plan
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'Listen to the audio and identify which future plan is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q280_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q280_Id, N'I am going to cook', 1, 1), (@Q280_Id, N'I am going to study', 0, 2), (@Q280_Id, N'I am going to work', 0, 3), (@Q280_Id, N'I am going to travel', 0, 4);

-- Question 281: What's the correct form: "She ___ going to buy a car"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'What''s the correct form: "She ___ going to buy a car"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q281_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q281_Id, N'is', 1, 1), (@Q281_Id, N'am', 0, 2), (@Q281_Id, N'are', 0, 3), (@Q281_Id, N'was', 0, 4);

-- Question 282: Text input - Complete: "Next year, we ___ going to move."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 98, N'Complete the sentence: "Next year, we ___ going to move."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q282_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q282_Id, N'are'), (@Q282_Id, N'ARE');

GO

-- LESSON 99: Weather and Seasons (lesson_id = 99)
-- Question 283: What's the weather like today?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'What''s the weather like today?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q283_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q283_Id, N'It''s sunny', 1, 1), (@Q283_Id, N'It''s yesterday', 0, 2), (@Q283_Id, N'It''s tomorrow', 0, 3), (@Q283_Id, N'It''s last week', 0, 4);

-- Question 284: Complete: "In winter, it''s usually ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'Complete the sentence: "In winter, it''s usually ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q284_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q284_Id, N'cold'), (@Q284_Id, N'Cold'), (@Q284_Id, N'snowy'), (@Q284_Id, N'Snowy');

-- Question 285: Speaking - Describe the weather
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'Describe the weather in your favorite season clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q285_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q285_Id, N'Clear weather description', 1, 1), (@Q285_Id, N'Unclear weather description', 0, 2);

-- Question 286: Text input - What season comes after winter?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'What season comes after winter?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q286_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q286_Id, N'spring'), (@Q286_Id, N'Spring');

-- Question 287: Select all weather conditions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'Select all weather conditions:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q287_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q287_Id, N'Sunny', 1, 1), (@Q287_Id, N'Rainy', 1, 2), (@Q287_Id, N'Cloudy', 1, 3), (@Q287_Id, N'Snowy', 1, 4), (@Q287_Id, N'Happy', 0, 5), (@Q287_Id, N'Sad', 0, 6);

-- Question 288: Matching - Match seasons with weather
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'Match each season with its typical weather:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q288_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q288_Id, N'Summer - Hot and sunny', 1, 1), (@Q288_Id, N'Winter - Cold and snowy', 1, 2), (@Q288_Id, N'Spring - Warm and rainy', 1, 3), (@Q288_Id, N'Fall - Cool and windy', 1, 4);

-- Question 289: Reorder words - Arrange weather description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'Arrange these words: "is it today sunny"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q289_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q289_Id, N'It', 1, 1), (@Q289_Id, N'is', 1, 2), (@Q289_Id, N'sunny', 1, 3), (@Q289_Id, N'today', 1, 4);

-- Question 290: Listening - Listen and identify the weather
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'Listen to the audio and identify which weather condition is being described:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q290_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q290_Id, N'Rainy', 1, 1), (@Q290_Id, N'Sunny', 0, 2), (@Q290_Id, N'Cloudy', 0, 3), (@Q290_Id, N'Snowy', 0, 4);

-- Question 291: What season is it when it's very hot?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'What season is it when it''s very hot?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q291_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q291_Id, N'Summer', 1, 1), (@Q291_Id, N'Winter', 0, 2), (@Q291_Id, N'Spring', 0, 3), (@Q291_Id, N'Fall', 0, 4);

-- Question 292: Text input - Complete: "It''s ___ today, so I need an umbrella."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 99, N'Complete the sentence: "It''s ___ today, so I need an umbrella."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q292_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q292_Id, N'rainy'), (@Q292_Id, N'Rainy');

GO

-- LESSON 100: Health and Body (lesson_id = 100)
-- Question 293: What do you use to see?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'What do you use to see?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q293_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q293_Id, N'Eyes', 1, 1), (@Q293_Id, N'Ears', 0, 2), (@Q293_Id, N'Nose', 0, 3), (@Q293_Id, N'Mouth', 0, 4);

-- Question 294: Complete: "I have a headache, so my ___ hurts."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'Complete the sentence: "I have a headache, so my ___ hurts."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q294_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q294_Id, N'head'), (@Q294_Id, N'Head');

-- Question 295: Speaking - Describe how you feel
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'Describe how you feel today clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q295_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q295_Id, N'Clear health description', 1, 1), (@Q295_Id, N'Unclear health description', 0, 2);

-- Question 296: Text input - What do you use to hear?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'What do you use to hear?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q296_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q296_Id, N'ears'), (@Q296_Id, N'Ears');

-- Question 297: Select all body parts
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'Select all body parts:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q297_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q297_Id, N'Head', 1, 1), (@Q297_Id, N'Hand', 1, 2), (@Q297_Id, N'Foot', 1, 3), (@Q297_Id, N'Leg', 1, 4), (@Q297_Id, N'Car', 0, 5), (@Q297_Id, N'House', 0, 6);

-- Question 298: Matching - Match body parts with functions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'Match each body part with its function:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q298_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q298_Id, N'Eyes - See', 1, 1), (@Q298_Id, N'Ears - Hear', 1, 2), (@Q298_Id, N'Hands - Touch', 1, 3), (@Q298_Id, N'Legs - Walk', 1, 4);

-- Question 299: Reorder words - Arrange health description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'Arrange these words: "I feel sick today"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q299_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q299_Id, N'I', 1, 1), (@Q299_Id, N'feel', 1, 2), (@Q299_Id, N'sick', 1, 3), (@Q299_Id, N'today', 1, 4);

-- Question 300: Listening - Listen and identify the body part
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'Listen to the audio and identify which body part is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q300_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q300_Id, N'Stomach', 1, 1), (@Q300_Id, N'Head', 0, 2), (@Q300_Id, N'Hand', 0, 3), (@Q300_Id, N'Foot', 0, 4);

-- Question 301: What do you say when you don't feel well?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'What do you say when you don''t feel well?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q301_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q301_Id, N'I feel sick', 1, 1), (@Q301_Id, N'I feel happy', 0, 2), (@Q301_Id, N'I feel great', 0, 3), (@Q301_Id, N'I feel wonderful', 0, 4);

-- Question 302: Text input - Complete: "I have a sore ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 100, N'Complete the sentence: "I have a sore ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q302_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q302_Id, N'throat'), (@Q302_Id, N'Throat'), (@Q302_Id, N'back'), (@Q302_Id, N'Back'), (@Q302_Id, N'arm'), (@Q302_Id, N'Arm');

GO

-- LESSON 101: Putting It All Together (lesson_id = 101)
-- Question 303: How do you introduce yourself in English?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'How do you introduce yourself in English?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q303_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q303_Id, N'Hello, my name is John', 1, 1), (@Q303_Id, N'Goodbye, see you later', 0, 2), (@Q303_Id, N'Thank you very much', 0, 3), (@Q303_Id, N'Excuse me, where is the bank?', 0, 4);

-- Question 304: Complete: "Nice to ___ you."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'Complete the sentence: "Nice to ___ you."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q304_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q304_Id, N'meet'), (@Q304_Id, N'MEET');

-- Question 305: Speaking - Have a complete conversation
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'Have a complete conversation introducing yourself and asking about someone else.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'hard', 15, 1);
DECLARE @Q305_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q305_Id, N'Complete conversation', 1, 1), (@Q305_Id, N'Incomplete conversation', 0, 2);

-- Question 306: Text input - What do you say when you meet someone for the first time?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'What do you say when you meet someone for the first time? (Write a complete sentence)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q306_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q306_Id, N'Nice to meet you'), (@Q306_Id, N'Pleased to meet you'), (@Q306_Id, N'It''s nice to meet you');

-- Question 307: Select all polite expressions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'Select all polite expressions:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q307_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q307_Id, N'Please', 1, 1), (@Q307_Id, N'Thank you', 1, 2), (@Q307_Id, N'Excuse me', 1, 3), (@Q307_Id, N'You''re welcome', 1, 4), (@Q307_Id, N'Shut up', 0, 5), (@Q307_Id, N'Go away', 0, 6);

-- Question 308: Matching - Match questions with responses
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'Match each question with the appropriate response:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q308_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q308_Id, N'How are you? - I''m fine, thank you', 1, 1), (@Q308_Id, N'What''s your name? - My name is Sarah', 1, 2), (@Q308_Id, N'Where are you from? - I''m from Canada', 1, 3), (@Q308_Id, N'How old are you? - I''m 25 years old', 1, 4);

-- Question 309: Reorder words - Arrange complete sentence
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'Arrange these words: "am I from Canada"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q309_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q309_Id, N'I', 1, 1), (@Q309_Id, N'am', 1, 2), (@Q309_Id, N'from', 1, 3), (@Q309_Id, N'Canada', 1, 4);

-- Question 310: Listening - Listen and identify the conversation
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'Listen to the audio and identify what type of conversation is taking place:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q310_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q310_Id, N'Introduction', 1, 1), (@Q310_Id, N'Asking for directions', 0, 2), (@Q310_Id, N'Ordering food', 0, 3), (@Q310_Id, N'Buying clothes', 0, 4);

-- Question 311: What's the most important thing when meeting someone new?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'What''s the most important thing when meeting someone new?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q311_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q311_Id, N'Be polite and friendly', 1, 1), (@Q311_Id, N'Be rude and mean', 0, 2), (@Q311_Id, N'Ignore them', 0, 3), (@Q311_Id, N'Laugh at them', 0, 4);

-- Question 312: Text input - Complete: "Thank you for your ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 101, N'Complete the sentence: "Thank you for your ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q312_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q312_Id, N'help'), (@Q312_Id, N'Help'), (@Q312_Id, N'time'), (@Q312_Id, N'Time'), (@Q312_Id, N'kindness'), (@Q312_Id, N'Kindness');

GO
