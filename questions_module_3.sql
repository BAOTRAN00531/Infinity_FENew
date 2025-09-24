-- =====================================================
-- MODULE 3: FAMILY AND PEOPLE (Lessons 62-66)
-- =====================================================

-- LESSON 62: Family Members (lesson_id = 62)
-- Question 53: Who is your father's brother?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'Who is your father''s brother?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q53_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q53_Id, N'Uncle', 1, 1), (@Q53_Id, N'Aunt', 0, 2), (@Q53_Id, N'Cousin', 0, 3), (@Q53_Id, N'Grandfather', 0, 4);

-- Question 54: Complete: "My mother's sister is my ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'Complete the sentence: "My mother''s sister is my ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q54_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q54_Id, N'aunt'), (@Q54_Id, N'Aunt');

-- Question 55: Speaking - Describe your family
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'Describe your family members clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q55_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q55_Id, N'Clear description', 1, 1), (@Q55_Id, N'Unclear description', 0, 2);

-- Question 56: Text input - What do you call your father's father?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'What do you call your father''s father?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q56_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q56_Id, N'grandfather'), (@Q56_Id, N'Grandfather'), (@Q56_Id, N'grandpa'), (@Q56_Id, N'Grandpa');

-- Question 57: Select all immediate family members
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'Select all immediate family members:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q57_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q57_Id, N'Father', 1, 1), (@Q57_Id, N'Mother', 1, 2), (@Q57_Id, N'Brother', 1, 3), (@Q57_Id, N'Sister', 1, 4), (@Q57_Id, N'Cousin', 0, 5), (@Q57_Id, N'Uncle', 0, 6);

-- Question 58: Matching - Match family relationships
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'Match each family relationship correctly:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q58_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q58_Id, N'Father''s brother - Uncle', 1, 1), (@Q58_Id, N'Mother''s sister - Aunt', 1, 2), (@Q58_Id, N'Brother''s son - Nephew', 1, 3), (@Q58_Id, N'Sister''s daughter - Niece', 1, 4);

-- Question 59: Reorder words - Arrange family description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'Arrange these words: "family my has four members"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q59_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q59_Id, N'My', 1, 1), (@Q59_Id, N'family', 1, 2), (@Q59_Id, N'has', 1, 3), (@Q59_Id, N'four', 1, 4), (@Q59_Id, N'members', 1, 5);

-- Question 60: Listening - Listen and identify family member
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'Listen to the audio and identify which family member is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q60_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q60_Id, N'Grandmother', 1, 1), (@Q60_Id, N'Grandfather', 0, 2), (@Q60_Id, N'Mother', 0, 3), (@Q60_Id, N'Father', 0, 4);

-- Question 61: What do you call your mother's mother?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'What do you call your mother''s mother?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q61_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q61_Id, N'Grandmother', 1, 1), (@Q61_Id, N'Grandfather', 0, 2), (@Q61_Id, N'Aunt', 0, 3), (@Q61_Id, N'Uncle', 0, 4);

-- Question 62: Text input - Complete: "My ___ is my father's wife."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 62, N'Complete the sentence: "My ___ is my father''s wife."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q62_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q62_Id, N'mother'), (@Q62_Id, N'Mother');

GO

-- LESSON 63: Describing Appearance (lesson_id = 63)
-- Question 63: How do you describe someone's hair color?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'How do you describe someone''s hair color?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q63_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q63_Id, N'She has brown hair', 1, 1), (@Q63_Id, N'She is brown hair', 0, 2), (@Q63_Id, N'She have brown hair', 0, 3), (@Q63_Id, N'She brown hair', 0, 4);

-- Question 64: Complete: "He has ___ eyes."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'Complete the sentence: "He has ___ eyes."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q64_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q64_Id, N'blue'), (@Q64_Id, N'brown'), (@Q64_Id, N'green'), (@Q64_Id, N'black');

-- Question 65: Speaking - Describe someone's appearance
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'Describe someone''s appearance clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q65_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q65_Id, N'Clear description', 1, 1), (@Q65_Id, N'Unclear description', 0, 2);

-- Question 66: Text input - How do you say someone is tall?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'How do you say someone is tall? (Write a complete sentence)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q66_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q66_Id, N'He is tall'), (@Q66_Id, N'She is tall'), (@Q66_Id, N'He''s tall'), (@Q66_Id, N'She''s tall');

-- Question 67: Select all physical characteristics
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'Select all physical characteristics:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q67_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q67_Id, N'Tall', 1, 1), (@Q67_Id, N'Short', 1, 2), (@Q67_Id, N'Brown hair', 1, 3), (@Q67_Id, N'Blue eyes', 1, 4), (@Q67_Id, N'Kind', 0, 5), (@Q67_Id, N'Funny', 0, 6);

-- Question 68: Matching - Match descriptions with people
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'Match each description with the correct person:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q68_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q68_Id, N'Tall and thin - Basketball player', 1, 1), (@Q68_Id, N'Short and round - Chef', 1, 2), (@Q68_Id, N'Long blonde hair - Model', 1, 3), (@Q68_Id, N'Glasses and beard - Professor', 1, 4);

-- Question 69: Reorder words - Arrange appearance description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'Arrange these words: "has she long brown hair"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q69_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q69_Id, N'She', 1, 1), (@Q69_Id, N'has', 1, 2), (@Q69_Id, N'long', 1, 3), (@Q69_Id, N'brown', 1, 4), (@Q69_Id, N'hair', 1, 5);

-- Question 70: Listening - Listen and identify physical feature
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'Listen to the audio and identify which physical feature is being described:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q70_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q70_Id, N'Height', 1, 1), (@Q70_Id, N'Hair color', 0, 2), (@Q70_Id, N'Eye color', 0, 3), (@Q70_Id, N'Weight', 0, 4);

-- Question 71: What's the correct way to describe someone's height?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'What''s the correct way to describe someone''s height?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q71_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q71_Id, N'He is tall', 1, 1), (@Q71_Id, N'He has tall', 0, 2), (@Q71_Id, N'He tall', 0, 3), (@Q71_Id, N'He is have tall', 0, 4);

-- Question 72: Text input - Complete: "She has ___ hair."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 63, N'Complete the sentence: "She has ___ hair."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q72_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q72_Id, N'long'), (@Q72_Id, N'short'), (@Q72_Id, N'curly'), (@Q72_Id, N'straight');

GO

-- LESSON 64: Age and Personality (lesson_id = 64)
-- Question 73: How do you describe someone's personality?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'How do you describe someone''s personality?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q73_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q73_Id, N'He is kind', 1, 1), (@Q73_Id, N'He has kind', 0, 2), (@Q73_Id, N'He kind', 0, 3), (@Q73_Id, N'He is have kind', 0, 4);

-- Question 74: Complete: "She is very ___ and helpful."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'Complete the sentence: "She is very ___ and helpful."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q74_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q74_Id, N'kind'), (@Q74_Id, N'nice'), (@Q74_Id, N'friendly'), (@Q74_Id, N'good');

-- Question 75: Speaking - Describe someone's personality
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'Describe someone''s personality clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q75_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q75_Id, N'Clear description', 1, 1), (@Q75_Id, N'Unclear description', 0, 2);

-- Question 76: Text input - What personality trait means "always telling the truth"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'What personality trait means "always telling the truth"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q76_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q76_Id, N'honest'), (@Q76_Id, N'Honest');

-- Question 77: Select all positive personality traits
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'Select all positive personality traits:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q77_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q77_Id, N'Kind', 1, 1), (@Q77_Id, N'Honest', 1, 2), (@Q77_Id, N'Funny', 1, 3), (@Q77_Id, N'Helpful', 1, 4), (@Q77_Id, N'Mean', 0, 5), (@Q77_Id, N'Lazy', 0, 6);

-- Question 78: Matching - Match age groups with descriptions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'Match each age group with the appropriate description:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q78_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q78_Id, N'Child - Young and playful', 1, 1), (@Q78_Id, N'Teenager - Energetic and curious', 1, 2), (@Q78_Id, N'Adult - Responsible and mature', 1, 3), (@Q78_Id, N'Senior - Wise and experienced', 1, 4);

-- Question 79: Reorder words - Arrange personality description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'Arrange these words: "is he very funny and"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q79_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q79_Id, N'He', 1, 1), (@Q79_Id, N'is', 1, 2), (@Q79_Id, N'very', 1, 3), (@Q79_Id, N'funny', 1, 4), (@Q79_Id, N'and', 1, 5);

-- Question 80: Listening - Listen and identify personality trait
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'Listen to the audio and identify which personality trait is being described:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q80_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q80_Id, N'Generous', 1, 1), (@Q80_Id, N'Selfish', 0, 2), (@Q80_Id, N'Kind', 0, 3), (@Q80_Id, N'Mean', 0, 4);

-- Question 81: What's the opposite of "shy"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'What''s the opposite of "shy"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q81_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q81_Id, N'Outgoing', 1, 1), (@Q81_Id, N'Quiet', 0, 2), (@Q81_Id, N'Shy', 0, 3), (@Q81_Id, N'Timid', 0, 4);

-- Question 82: Text input - Complete: "He is ___ and always makes people laugh."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 64, N'Complete the sentence: "He is ___ and always makes people laugh."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q82_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q82_Id, N'funny'), (@Q82_Id, N'humorous'), (@Q82_Id, N'comical');

GO
