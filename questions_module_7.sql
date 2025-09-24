-- =====================================================
-- MODULE 7: SHOPPING AND MONEY (Lessons 82-86)
-- =====================================================

-- LESSON 82: Numbers and Prices (lesson_id = 82)
-- Question 173: How much does a dollar cost?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'How much does a dollar cost?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q173_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q173_Id, N'$1.00', 1, 1), (@Q173_Id, N'$10.00', 0, 2), (@Q173_Id, N'$100.00', 0, 3), (@Q173_Id, N'$0.50', 0, 4);

-- Question 174: Complete: "This shirt costs ___ dollars."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'Complete the sentence: "This shirt costs ___ dollars."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q174_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q174_Id, N'20'), (@Q174_Id, N'25'), (@Q174_Id, N'30'), (@Q174_Id, N'35');

-- Question 175: Speaking - Say the price
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'Say the price "$15.99" clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q175_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q175_Id, N'Clear price pronunciation', 1, 1), (@Q175_Id, N'Unclear price pronunciation', 0, 2);

-- Question 176: Text input - How do you say $50.00?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'How do you say $50.00? (Write in words)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q176_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q176_Id, N'Fifty dollars'), (@Q176_Id, N'fifty dollars'), (@Q176_Id, N'$50'), (@Q176_Id, N'50 dollars');

-- Question 177: Select all correct ways to write $25
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'Select all correct ways to write $25:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q177_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q177_Id, N'$25.00', 1, 1), (@Q177_Id, N'$25', 1, 2), (@Q177_Id, N'Twenty-five dollars', 1, 3), (@Q177_Id, N'25 dollars', 1, 4), (@Q177_Id, N'$250', 0, 5), (@Q177_Id, N'$2.50', 0, 6);

-- Question 178: Matching - Match numbers with words
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'Match each number with its word form:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q178_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q178_Id, N'100 - One hundred', 1, 1), (@Q178_Id, N'50 - Fifty', 1, 2), (@Q178_Id, N'75 - Seventy-five', 1, 3), (@Q178_Id, N'200 - Two hundred', 1, 4);

-- Question 179: Reorder words - Arrange price expression
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'Arrange these words: "costs this ten dollars"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q179_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q179_Id, N'This', 1, 1), (@Q179_Id, N'costs', 1, 2), (@Q179_Id, N'ten', 1, 3), (@Q179_Id, N'dollars', 1, 4);

-- Question 180: Listening - Listen and identify the price
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'Listen to the audio and identify which price is being said:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q180_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q180_Id, N'$12.50', 1, 1), (@Q180_Id, N'$12.00', 0, 2), (@Q180_Id, N'$15.00', 0, 3), (@Q180_Id, N'$20.00', 0, 4);

-- Question 181: What's the correct way to say $99.99?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'What''s the correct way to say $99.99?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q181_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q181_Id, N'Ninety-nine dollars and ninety-nine cents', 1, 1), (@Q181_Id, N'Ninety-nine dollars', 0, 2), (@Q181_Id, N'Ninety-nine cents', 0, 3), (@Q181_Id, N'Ninety dollars', 0, 4);

-- Question 182: Text input - Complete: "The total is ___ dollars."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 82, N'Complete the sentence: "The total is ___ dollars."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q182_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q182_Id, N'45'), (@Q182_Id, N'50'), (@Q182_Id, N'55'), (@Q182_Id, N'60');

GO

-- LESSON 83: Clothing Items (lesson_id = 83)
-- Question 183: What do you wear on your feet?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'What do you wear on your feet?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q183_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q183_Id, N'Shoes', 1, 1), (@Q183_Id, N'Hat', 0, 2), (@Q183_Id, N'Gloves', 0, 3), (@Q183_Id, N'Belt', 0, 4);

-- Question 184: Complete: "I wear a ___ on my head."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'Complete the sentence: "I wear a ___ on my head."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q184_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q184_Id, N'hat'), (@Q184_Id, N'Hat'), (@Q184_Id, N'cap'), (@Q184_Id, N'Cap');

-- Question 185: Speaking - Describe what you're wearing
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'Describe what you''re wearing today clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q185_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q185_Id, N'Clear description', 1, 1), (@Q185_Id, N'Unclear description', 0, 2);

-- Question 186: Text input - What do you wear on your hands in winter?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'What do you wear on your hands in winter?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q186_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q186_Id, N'gloves'), (@Q186_Id, N'Gloves'), (@Q186_Id, N'mittens'), (@Q186_Id, N'Mittens');

-- Question 187: Select all clothing items
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'Select all clothing items:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q187_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q187_Id, N'Shirt', 1, 1), (@Q187_Id, N'Pants', 1, 2), (@Q187_Id, N'Shoes', 1, 3), (@Q187_Id, N'Hat', 1, 4), (@Q187_Id, N'Book', 0, 5), (@Q187_Id, N'Phone', 0, 6);

-- Question 188: Matching - Match clothing with body parts
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'Match each clothing item with the body part:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q188_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q188_Id, N'Shirt - Torso', 1, 1), (@Q188_Id, N'Pants - Legs', 1, 2), (@Q188_Id, N'Shoes - Feet', 1, 3), (@Q188_Id, N'Hat - Head', 1, 4);

-- Question 189: Reorder words - Arrange clothing description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'Arrange these words: "I wearing am a blue shirt"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q189_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q189_Id, N'I', 1, 1), (@Q189_Id, N'am', 1, 2), (@Q189_Id, N'wearing', 1, 3), (@Q189_Id, N'a', 1, 4), (@Q189_Id, N'blue', 1, 5), (@Q189_Id, N'shirt', 1, 6);

-- Question 190: Listening - Listen and identify the clothing
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'Listen to the audio and identify which clothing item is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q190_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q190_Id, N'Jacket', 1, 1), (@Q190_Id, N'Shirt', 0, 2), (@Q190_Id, N'Pants', 0, 3), (@Q190_Id, N'Dress', 0, 4);

-- Question 191: What do you wear to keep warm in winter?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'What do you wear to keep warm in winter?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q191_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q191_Id, N'Coat', 1, 1), (@Q191_Id, N'Shorts', 0, 2), (@Q191_Id, N'T-shirt', 0, 3), (@Q191_Id, N'Sandals', 0, 4);

-- Question 192: Text input - Complete: "I need to buy new ___."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 83, N'Complete the sentence: "I need to buy new ___."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q192_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q192_Id, N'shoes'), (@Q192_Id, N'Shoes'), (@Q192_Id, N'clothes'), (@Q192_Id, N'Clothes'), (@Q192_Id, N'pants'), (@Q192_Id, N'Pants');

GO

-- LESSON 84: At the Store (lesson_id = 84)
-- Question 193: Where do you buy groceries?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'Where do you buy groceries?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q193_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q193_Id, N'Supermarket', 1, 1), (@Q193_Id, N'Hospital', 0, 2), (@Q193_Id, N'School', 0, 3), (@Q193_Id, N'Library', 0, 4);

-- Question 194: Complete: "I go to the ___ to buy clothes."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'Complete the sentence: "I go to the ___ to buy clothes."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q194_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q194_Id, N'store'), (@Q194_Id, N'Store'), (@Q194_Id, N'shop'), (@Q194_Id, N'Shop');

-- Question 195: Speaking - Ask for help in a store
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'Ask a store employee for help finding something clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q195_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q195_Id, N'Clear request', 1, 1), (@Q195_Id, N'Unclear request', 0, 2);

-- Question 196: Text input - What do you say when you want to buy something?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'What do you say when you want to buy something? (Write a complete sentence)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q196_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q196_Id, N'I would like to buy this'), (@Q196_Id, N'I want to buy this'), (@Q196_Id, N'Can I buy this'), (@Q196_Id, N'I''ll take this');

-- Question 197: Select all types of stores
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'Select all types of stores:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q197_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q197_Id, N'Supermarket', 1, 1), (@Q197_Id, N'Clothing store', 1, 2), (@Q197_Id, N'Bookstore', 1, 3), (@Q197_Id, N'Pharmacy', 1, 4), (@Q197_Id, N'Hospital', 0, 5), (@Q197_Id, N'School', 0, 6);

-- Question 198: Matching - Match stores with what they sell
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'Match each store with what it sells:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q198_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q198_Id, N'Supermarket - Food', 1, 1), (@Q198_Id, N'Clothing store - Clothes', 1, 2), (@Q198_Id, N'Bookstore - Books', 1, 3), (@Q198_Id, N'Pharmacy - Medicine', 1, 4);

-- Question 199: Reorder words - Arrange shopping sentence
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'Arrange these words: "I shopping go on Saturday"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q199_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q199_Id, N'I', 1, 1), (@Q199_Id, N'go', 1, 2), (@Q199_Id, N'shopping', 1, 3), (@Q199_Id, N'on', 1, 4), (@Q199_Id, N'Saturday', 1, 5);

-- Question 200: Listening - Listen and identify the store
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'Listen to the audio and identify which store is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q200_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q200_Id, N'Bookstore', 1, 1), (@Q200_Id, N'Supermarket', 0, 2), (@Q200_Id, N'Clothing store', 0, 3), (@Q200_Id, N'Pharmacy', 0, 4);

-- Question 201: What do you use to carry your purchases?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'What do you use to carry your purchases?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q201_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q201_Id, N'Shopping bag', 1, 1), (@Q201_Id, N'Car', 0, 2), (@Q201_Id, N'Bicycle', 0, 3), (@Q201_Id, N'Book', 0, 4);

-- Question 202: Text input - Complete: "I need to find the ___ section."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 84, N'Complete the sentence: "I need to find the ___ section."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q202_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q202_Id, N'clothing'), (@Q202_Id, N'Clothing'), (@Q202_Id, N'food'), (@Q202_Id, N'Food'), (@Q202_Id, N'electronics'), (@Q202_Id, N'Electronics');

GO
