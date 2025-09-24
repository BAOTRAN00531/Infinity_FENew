-- =====================================================
-- MODULE 4: DAILY LIFE AND ROUTINES (Lessons 67-71)
-- =====================================================

-- LESSON 67: Daily Activities (lesson_id = 67)
-- Question 83: What do you do in the morning?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'What do you do in the morning?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q83_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q83_Id, N'I brush my teeth', 1, 1), (@Q83_Id, N'I sleep', 0, 2), (@Q83_Id, N'I eat dinner', 0, 3), (@Q83_Id, N'I watch TV', 0, 4);

-- Question 84: Complete: "I ___ my teeth every morning."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'Complete the sentence: "I ___ my teeth every morning."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q84_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q84_Id, N'brush'), (@Q84_Id, N'BRUSH');

-- Question 85: Speaking - Describe your morning routine
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'Describe your morning routine clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q85_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q85_Id, N'Clear description', 1, 1), (@Q85_Id, N'Unclear description', 0, 2);

-- Question 86: Text input - What do you do before going to bed?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'What do you do before going to bed? (Write a complete sentence)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q86_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q86_Id, N'I brush my teeth'), (@Q86_Id, N'I read a book'), (@Q86_Id, N'I take a shower'), (@Q86_Id, N'I get ready for bed');

-- Question 87: Select all morning activities
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'Select all morning activities:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q87_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q87_Id, N'Brush teeth', 1, 1), (@Q87_Id, N'Eat breakfast', 1, 2), (@Q87_Id, N'Take a shower', 1, 3), (@Q87_Id, N'Get dressed', 1, 4), (@Q87_Id, N'Watch TV', 0, 5), (@Q87_Id, N'Go to sleep', 0, 6);

-- Question 88: Matching - Match activities with times
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'Match each activity with the appropriate time:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q88_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q88_Id, N'Brush teeth - Morning and evening', 1, 1), (@Q88_Id, N'Eat breakfast - Morning', 1, 2), (@Q88_Id, N'Eat dinner - Evening', 1, 3), (@Q88_Id, N'Go to sleep - Night', 1, 4);

-- Question 89: Reorder words - Arrange daily routine
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'Arrange these words: "I morning in get up early"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q89_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q89_Id, N'I', 1, 1), (@Q89_Id, N'get', 1, 2), (@Q89_Id, N'up', 1, 3), (@Q89_Id, N'early', 1, 4), (@Q89_Id, N'in', 1, 5), (@Q89_Id, N'morning', 1, 6);

-- Question 90: Listening - Listen and identify daily activity
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'Listen to the audio and identify which daily activity is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q90_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q90_Id, N'Take a shower', 1, 1), (@Q90_Id, N'Brush teeth', 0, 2), (@Q90_Id, N'Eat breakfast', 0, 3), (@Q90_Id, N'Get dressed', 0, 4);

-- Question 91: What's the first thing you do when you wake up?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'What''s the first thing you do when you wake up?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q91_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q91_Id, N'Get up', 1, 1), (@Q91_Id, N'Go to sleep', 0, 2), (@Q91_Id, N'Eat dinner', 0, 3), (@Q91_Id, N'Watch TV', 0, 4);

-- Question 92: Text input - Complete: "I ___ my face every morning."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 67, N'Complete the sentence: "I ___ my face every morning."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q92_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q92_Id, N'wash'), (@Q92_Id, N'WASH');

GO

-- LESSON 68: Time and Clock (lesson_id = 68)
-- Question 93: What time is it when the clock shows 3:00?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'What time is it when the clock shows 3:00?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q93_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q93_Id, N'Three o''clock', 1, 1), (@Q93_Id, N'Three thirty', 0, 2), (@Q93_Id, N'Three fifteen', 0, 3), (@Q93_Id, N'Three forty-five', 0, 4);

-- Question 94: Complete: "It's ___ o'clock."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'Complete the sentence: "It''s ___ o''clock."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q94_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q94_Id, N'five'), (@Q94_Id, N'5'), (@Q94_Id, N'ten'), (@Q94_Id, N'10');

-- Question 95: Speaking - Tell the time
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'Tell the time clearly when you see 2:30 on the clock.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q95_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q95_Id, N'Clear time telling', 1, 1), (@Q95_Id, N'Unclear time telling', 0, 2);

-- Question 96: Text input - How do you say 4:15?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'How do you say 4:15? (Write the time in words)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q96_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q96_Id, N'Four fifteen'), (@Q96_Id, N'Quarter past four'), (@Q96_Id, N'4:15');

-- Question 97: Select all correct ways to say 6:30
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'Select all correct ways to say 6:30:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q97_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q97_Id, N'Six thirty', 1, 1), (@Q97_Id, N'Half past six', 1, 2), (@Q97_Id, N'6:30', 1, 3), (@Q97_Id, N'Six o''clock', 0, 4), (@Q97_Id, N'Six fifteen', 0, 5);

-- Question 98: Matching - Match times with activities
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'Match each time with the appropriate activity:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q98_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q98_Id, N'7:00 AM - Wake up', 1, 1), (@Q98_Id, N'12:00 PM - Eat lunch', 1, 2), (@Q98_Id, N'6:00 PM - Eat dinner', 1, 3), (@Q98_Id, N'10:00 PM - Go to bed', 1, 4);

-- Question 99: Reorder words - Arrange time expression
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'Arrange these words: "it''s past quarter three"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q99_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q99_Id, N'It''s', 1, 1), (@Q99_Id, N'quarter', 1, 2), (@Q99_Id, N'past', 1, 3), (@Q99_Id, N'three', 1, 4);

-- Question 100: Listening - Listen and identify the time
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'Listen to the audio and identify which time is being said:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q100_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q100_Id, N'8:45', 1, 1), (@Q100_Id, N'8:15', 0, 2), (@Q100_Id, N'8:30', 0, 3), (@Q100_Id, N'9:00', 0, 4);

-- Question 101: What's the difference between AM and PM?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'What''s the difference between AM and PM?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'medium', 5, 1);
DECLARE @Q101_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q101_Id, N'AM is morning, PM is afternoon/evening', 1, 1), (@Q101_Id, N'AM is afternoon, PM is morning', 0, 2), (@Q101_Id, N'AM and PM are the same', 0, 3), (@Q101_Id, N'AM is night, PM is day', 0, 4);

-- Question 102: Text input - Complete: "It's ___ to nine."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 68, N'Complete the sentence: "It''s ___ to nine."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q102_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q102_Id, N'ten'), (@Q102_Id, N'fifteen'), (@Q102_Id, N'five');

GO

-- LESSON 69: Days of the Week (lesson_id = 69)
-- Question 103: What day comes after Monday?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'What day comes after Monday?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q103_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q103_Id, N'Tuesday', 1, 1), (@Q103_Id, N'Wednesday', 0, 2), (@Q103_Id, N'Sunday', 0, 3), (@Q103_Id, N'Friday', 0, 4);

-- Question 104: Complete: "Today is ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'Complete the sentence: "Today is ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q104_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q104_Id, N'Monday'), (@Q104_Id, N'Tuesday'), (@Q104_Id, N'Wednesday'), (@Q104_Id, N'Thursday'), (@Q104_Id, N'Friday'), (@Q104_Id, N'Saturday'), (@Q104_Id, N'Sunday');

-- Question 105: Speaking - Say the days of the week
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'Say all the days of the week in order.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q105_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q105_Id, N'Correct order', 1, 1), (@Q105_Id, N'Incorrect order', 0, 2);

-- Question 106: Text input - What day comes before Friday?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'What day comes before Friday?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q106_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q106_Id, N'Thursday'), (@Q106_Id, N'Thursday');

-- Question 107: Select all weekdays
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'Select all weekdays:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q107_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q107_Id, N'Monday', 1, 1), (@Q107_Id, N'Tuesday', 1, 2), (@Q107_Id, N'Wednesday', 1, 3), (@Q107_Id, N'Thursday', 1, 4), (@Q107_Id, N'Friday', 1, 5), (@Q107_Id, N'Saturday', 0, 6), (@Q107_Id, N'Sunday', 0, 7);

-- Question 108: Matching - Match days with activities
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'Match each day with the appropriate activity:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q108_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q108_Id, N'Monday - Start of work week', 1, 1), (@Q108_Id, N'Friday - End of work week', 1, 2), (@Q108_Id, N'Saturday - Weekend', 1, 3), (@Q108_Id, N'Sunday - Weekend', 1, 4);

-- Question 109: Reorder words - Arrange days in order
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'Arrange these days in order: "Friday, Monday, Wednesday"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q109_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q109_Id, N'Monday', 1, 1), (@Q109_Id, N'Wednesday', 1, 2), (@Q109_Id, N'Friday', 1, 3);

-- Question 110: Listening - Listen and identify the day
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'Listen to the audio and identify which day is being said:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q110_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q110_Id, N'Wednesday', 1, 1), (@Q110_Id, N'Monday', 0, 2), (@Q110_Id, N'Friday', 0, 3), (@Q110_Id, N'Sunday', 0, 4);

-- Question 111: What's the first day of the week?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'What''s the first day of the week?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q111_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q111_Id, N'Sunday', 1, 1), (@Q111_Id, N'Monday', 0, 2), (@Q111_Id, N'Tuesday', 0, 3), (@Q111_Id, N'Wednesday', 0, 4);

-- Question 112: Text input - Complete: "Tomorrow is ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 69, N'Complete the sentence: "Tomorrow is ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q112_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q112_Id, N'Monday'), (@Q112_Id, N'Tuesday'), (@Q112_Id, N'Wednesday'), (@Q112_Id, N'Thursday'), (@Q112_Id, N'Friday'), (@Q112_Id, N'Saturday'), (@Q112_Id, N'Sunday');

GO
