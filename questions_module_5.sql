-- =====================================================
-- MODULE 5: HOME AND ENVIRONMENT (Lessons 72-76)
-- =====================================================

-- LESSON 72: Rooms in the House (lesson_id = 72)
-- Question 113: Where do you cook food?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Where do you cook food?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q113_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q113_Id, N'Kitchen', 1, 1), (@Q113_Id, N'Bedroom', 0, 2), (@Q113_Id, N'Bathroom', 0, 3), (@Q113_Id, N'Living room', 0, 4);

-- Question 114: Complete: "I sleep in the ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Complete the sentence: "I sleep in the ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q114_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q114_Id, N'bedroom'), (@Q114_Id, N'Bedroom');

-- Question 115: Speaking - Describe your house
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Describe the rooms in your house clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q115_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q115_Id, N'Clear description', 1, 1), (@Q115_Id, N'Unclear description', 0, 2);

-- Question 116: Text input - Where do you take a shower?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Where do you take a shower? (Write the room name)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q116_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q116_Id, N'bathroom'), (@Q116_Id, N'Bathroom');

-- Question 117: Select all rooms in a typical house
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Select all rooms in a typical house:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q117_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q117_Id, N'Kitchen', 1, 1), (@Q117_Id, N'Bedroom', 1, 2), (@Q117_Id, N'Bathroom', 1, 3), (@Q117_Id, N'Living room', 1, 4), (@Q117_Id, N'Garden', 0, 5), (@Q117_Id, N'Street', 0, 6);

-- Question 118: Matching - Match rooms with activities
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Match each room with the appropriate activity:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q118_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q118_Id, N'Kitchen - Cooking', 1, 1), (@Q118_Id, N'Bedroom - Sleeping', 1, 2), (@Q118_Id, N'Bathroom - Washing', 1, 3), (@Q118_Id, N'Living room - Relaxing', 1, 4);

-- Question 119: Reorder words - Arrange room description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Arrange these words: "is kitchen the where I cook"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q119_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q119_Id, N'The', 1, 1), (@Q119_Id, N'kitchen', 1, 2), (@Q119_Id, N'is', 1, 3), (@Q119_Id, N'where', 1, 4), (@Q119_Id, N'I', 1, 5), (@Q119_Id, N'cook', 1, 6);

-- Question 120: Listening - Listen and identify the room
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Listen to the audio and identify which room is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q120_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q120_Id, N'Living room', 1, 1), (@Q120_Id, N'Kitchen', 0, 2), (@Q120_Id, N'Bedroom', 0, 3), (@Q120_Id, N'Bathroom', 0, 4);

-- Question 121: What room do you use to watch TV?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'What room do you use to watch TV?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q121_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q121_Id, N'Living room', 1, 1), (@Q121_Id, N'Kitchen', 0, 2), (@Q121_Id, N'Bathroom', 0, 3), (@Q121_Id, N'Bedroom', 0, 4);

-- Question 122: Text input - Complete: "The ___ is where I eat meals."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 72, N'Complete the sentence: "The ___ is where I eat meals."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q122_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q122_Id, N'dining room'), (@Q122_Id, N'Dining room'), (@Q122_Id, N'kitchen'), (@Q122_Id, N'Kitchen');

GO

-- LESSON 73: Furniture and Objects (lesson_id = 73)
-- Question 123: Where do you sit to eat dinner?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'Where do you sit to eat dinner?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q123_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q123_Id, N'Chair', 1, 1), (@Q123_Id, N'Bed', 0, 2), (@Q123_Id, N'Table', 0, 3), (@Q123_Id, N'Sofa', 0, 4);

-- Question 124: Complete: "I put my clothes in the ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'Complete the sentence: "I put my clothes in the ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q124_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q124_Id, N'wardrobe'), (@Q124_Id, N'Wardrobe'), (@Q124_Id, N'closet'), (@Q124_Id, N'Closet');

-- Question 125: Speaking - Describe furniture in a room
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'Describe the furniture in your bedroom clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q125_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q125_Id, N'Clear description', 1, 1), (@Q125_Id, N'Unclear description', 0, 2);

-- Question 126: Text input - What do you use to store books?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'What do you use to store books? (Write the furniture name)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q126_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q126_Id, N'bookshelf'), (@Q126_Id, N'Bookshelf'), (@Q126_Id, N'bookcase'), (@Q126_Id, N'Bookcase');

-- Question 127: Select all furniture items
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'Select all furniture items:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q127_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q127_Id, N'Table', 1, 1), (@Q127_Id, N'Chair', 1, 2), (@Q127_Id, N'Bed', 1, 3), (@Q127_Id, N'Sofa', 1, 4), (@Q127_Id, N'Lamp', 0, 5), (@Q127_Id, N'Book', 0, 6);

-- Question 128: Matching - Match furniture with rooms
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'Match each furniture item with the appropriate room:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q128_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q128_Id, N'Bed - Bedroom', 1, 1), (@Q128_Id, N'Refrigerator - Kitchen', 1, 2), (@Q128_Id, N'Bathtub - Bathroom', 1, 3), (@Q128_Id, N'TV - Living room', 1, 4);

-- Question 129: Reorder words - Arrange furniture description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'Arrange these words: "is comfortable the sofa very"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q129_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q129_Id, N'The', 1, 1), (@Q129_Id, N'sofa', 1, 2), (@Q129_Id, N'is', 1, 3), (@Q129_Id, N'very', 1, 4), (@Q129_Id, N'comfortable', 1, 5);

-- Question 130: Listening - Listen and identify the furniture
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'Listen to the audio and identify which furniture item is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q130_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q130_Id, N'Dining table', 1, 1), (@Q130_Id, N'Coffee table', 0, 2), (@Q130_Id, N'Desk', 0, 3), (@Q130_Id, N'Table', 0, 4);

-- Question 131: What do you use to sit on in the living room?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'What do you use to sit on in the living room?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q131_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q131_Id, N'Sofa', 1, 1), (@Q131_Id, N'Bed', 0, 2), (@Q131_Id, N'Refrigerator', 0, 3), (@Q131_Id, N'Stove', 0, 4);

-- Question 132: Text input - Complete: "I sleep on the ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 73, N'Complete the sentence: "I sleep on the ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q132_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q132_Id, N'bed'), (@Q132_Id, N'Bed');

GO

-- LESSON 74: Prepositions of Place (lesson_id = 74)
-- Question 133: Where is the cat? "The cat is ___ the table."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'Where is the cat? "The cat is ___ the table."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q133_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q133_Id, N'under', 1, 1), (@Q133_Id, N'over', 0, 2), (@Q133_Id, N'beside', 0, 3), (@Q133_Id, N'behind', 0, 4);

-- Question 134: Complete: "The book is ___ the shelf."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'Complete the sentence: "The book is ___ the shelf."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q134_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q134_Id, N'on'), (@Q134_Id, N'ON');

-- Question 135: Speaking - Describe where things are
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'Describe where different objects are in your room clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q135_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q135_Id, N'Clear description', 1, 1), (@Q135_Id, N'Unclear description', 0, 2);

-- Question 136: Text input - What preposition means "next to"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'What preposition means "next to"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q136_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q136_Id, N'beside'), (@Q136_Id, N'Beside'), (@Q136_Id, N'next to'), (@Q136_Id, N'Next to');

-- Question 137: Select all prepositions of place
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'Select all prepositions of place:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q137_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q137_Id, N'in', 1, 1), (@Q137_Id, N'on', 1, 2), (@Q137_Id, N'under', 1, 3), (@Q137_Id, N'beside', 1, 4), (@Q137_Id, N'behind', 1, 5), (@Q137_Id, N'and', 0, 6);

-- Question 138: Matching - Match prepositions with meanings
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'Match each preposition with its meaning:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q138_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q138_Id, N'in - Inside', 1, 1), (@Q138_Id, N'on - Above/on top', 1, 2), (@Q138_Id, N'under - Below', 1, 3), (@Q138_Id, N'behind - At the back', 1, 4);

-- Question 139: Reorder words - Arrange preposition sentence
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'Arrange these words: "is the dog behind tree the"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q139_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q139_Id, N'The', 1, 1), (@Q139_Id, N'dog', 1, 2), (@Q139_Id, N'is', 1, 3), (@Q139_Id, N'behind', 1, 4), (@Q139_Id, N'the', 1, 5), (@Q139_Id, N'tree', 1, 6);

-- Question 140: Listening - Listen and identify the preposition
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'Listen to the audio and identify which preposition is being used:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q140_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q140_Id, N'between', 1, 1), (@Q140_Id, N'beside', 0, 2), (@Q140_Id, N'behind', 0, 3), (@Q140_Id, N'under', 0, 4);

-- Question 141: What preposition means "at the back of"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'What preposition means "at the back of"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q141_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q141_Id, N'behind', 1, 1), (@Q141_Id, N'in front of', 0, 2), (@Q141_Id, N'beside', 0, 3), (@Q141_Id, N'under', 0, 4);

-- Question 142: Text input - Complete: "The ball is ___ the box."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 74, N'Complete the sentence: "The ball is ___ the box."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q142_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q142_Id, N'in'), (@Q142_Id, N'IN'), (@Q142_Id, N'on'), (@Q142_Id, N'ON'), (@Q142_Id, N'under'), (@Q142_Id, N'UNDER');

GO
