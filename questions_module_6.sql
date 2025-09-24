-- =====================================================
-- MODULE 6: FOOD AND DRINKS (Lessons 77-81)
-- =====================================================

-- LESSON 77: Common Foods (lesson_id = 77)
-- Question 143: What fruit is red and round?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'What fruit is red and round?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q143_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q143_Id, N'Apple', 1, 1), (@Q143_Id, N'Banana', 0, 2), (@Q143_Id, N'Orange', 0, 3), (@Q143_Id, N'Grape', 0, 4);

-- Question 144: Complete: "I eat ___ for breakfast."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'Complete the sentence: "I eat ___ for breakfast."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q144_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q144_Id, N'bread'), (@Q144_Id, N'Bread'), (@Q144_Id, N'cereal'), (@Q144_Id, N'Cereal'), (@Q144_Id, N'eggs'), (@Q144_Id, N'Eggs');

-- Question 145: Speaking - Describe your favorite food
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'Describe your favorite food clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q145_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q145_Id, N'Clear description', 1, 1), (@Q145_Id, N'Unclear description', 0, 2);

-- Question 146: Text input - What vegetable is orange and long?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'What vegetable is orange and long?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q146_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q146_Id, N'carrot'), (@Q146_Id, N'Carrot');

-- Question 147: Select all fruits
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'Select all fruits:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q147_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q147_Id, N'Apple', 1, 1), (@Q147_Id, N'Banana', 1, 2), (@Q147_Id, N'Orange', 1, 3), (@Q147_Id, N'Grape', 1, 4), (@Q147_Id, N'Carrot', 0, 5), (@Q147_Id, N'Potato', 0, 6);

-- Question 148: Matching - Match foods with categories
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'Match each food with its category:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q148_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q148_Id, N'Apple - Fruit', 1, 1), (@Q148_Id, N'Carrot - Vegetable', 1, 2), (@Q148_Id, N'Bread - Grain', 1, 3), (@Q148_Id, N'Chicken - Meat', 1, 4);

-- Question 149: Reorder words - Arrange food description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'Arrange these words: "is apple red the"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q149_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q149_Id, N'The', 1, 1), (@Q149_Id, N'apple', 1, 2), (@Q149_Id, N'is', 1, 3), (@Q149_Id, N'red', 1, 4);

-- Question 150: Listening - Listen and identify the food
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'Listen to the audio and identify which food is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q150_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q150_Id, N'Banana', 1, 1), (@Q150_Id, N'Apple', 0, 2), (@Q150_Id, N'Orange', 0, 3), (@Q150_Id, N'Grape', 0, 4);

-- Question 151: What food group does rice belong to?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'What food group does rice belong to?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q151_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q151_Id, N'Grains', 1, 1), (@Q151_Id, N'Fruits', 0, 2), (@Q151_Id, N'Vegetables', 0, 3), (@Q151_Id, N'Meat', 0, 4);

-- Question 152: Text input - Complete: "I like to eat ___ for lunch."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 77, N'Complete the sentence: "I like to eat ___ for lunch."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q152_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q152_Id, N'sandwich'), (@Q152_Id, N'Sandwich'), (@Q152_Id, N'salad'), (@Q152_Id, N'Salad'), (@Q152_Id, N'soup'), (@Q152_Id, N'Soup');

GO

-- LESSON 78: Drinks and Beverages (lesson_id = 78)
-- Question 153: What hot drink do people drink in the morning?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'What hot drink do people drink in the morning?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q153_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q153_Id, N'Coffee', 1, 1), (@Q153_Id, N'Ice cream', 0, 2), (@Q153_Id, N'Cake', 0, 3), (@Q153_Id, N'Bread', 0, 4);

-- Question 154: Complete: "I drink ___ when I'm thirsty."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'Complete the sentence: "I drink ___ when I''m thirsty."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q154_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q154_Id, N'water'), (@Q154_Id, N'Water'), (@Q154_Id, N'juice'), (@Q154_Id, N'Juice');

-- Question 155: Speaking - Describe your favorite drink
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'Describe your favorite drink clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q155_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q155_Id, N'Clear description', 1, 1), (@Q155_Id, N'Unclear description', 0, 2);

-- Question 156: Text input - What cold drink is made from fruits?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'What cold drink is made from fruits?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q156_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q156_Id, N'juice'), (@Q156_Id, N'Juice');

-- Question 157: Select all hot drinks
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'Select all hot drinks:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q157_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q157_Id, N'Coffee', 1, 1), (@Q157_Id, N'Tea', 1, 2), (@Q157_Id, N'Hot chocolate', 1, 3), (@Q157_Id, N'Soup', 1, 4), (@Q157_Id, N'Ice water', 0, 5), (@Q157_Id, N'Cold juice', 0, 6);

-- Question 158: Matching - Match drinks with temperatures
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'Match each drink with its temperature:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q158_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q158_Id, N'Coffee - Hot', 1, 1), (@Q158_Id, N'Ice water - Cold', 1, 2), (@Q158_Id, N'Tea - Hot', 1, 3), (@Q158_Id, N'Cold juice - Cold', 1, 4);

-- Question 159: Reorder words - Arrange drink description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'Arrange these words: "is coffee hot the"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q159_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q159_Id, N'The', 1, 1), (@Q159_Id, N'coffee', 1, 2), (@Q159_Id, N'is', 1, 3), (@Q159_Id, N'hot', 1, 4);

-- Question 160: Listening - Listen and identify the drink
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'Listen to the audio and identify which drink is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q160_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q160_Id, N'Tea', 1, 1), (@Q160_Id, N'Coffee', 0, 2), (@Q160_Id, N'Water', 0, 3), (@Q160_Id, N'Juice', 0, 4);

-- Question 161: What drink is good for your health?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'What drink is good for your health?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q161_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q161_Id, N'Water', 1, 1), (@Q161_Id, N'Soda', 0, 2), (@Q161_Id, N'Beer', 0, 3), (@Q161_Id, N'Wine', 0, 4);

-- Question 162: Text input - Complete: "I like to drink ___ in the morning."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 78, N'Complete the sentence: "I like to drink ___ in the morning."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q162_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q162_Id, N'coffee'), (@Q162_Id, N'Coffee'), (@Q162_Id, N'tea'), (@Q162_Id, N'Tea'), (@Q162_Id, N'water'), (@Q162_Id, N'Water');

GO

-- LESSON 79: Meals of the Day (lesson_id = 79)
-- Question 163: What meal do you eat in the morning?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'What meal do you eat in the morning?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q163_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q163_Id, N'Breakfast', 1, 1), (@Q163_Id, N'Lunch', 0, 2), (@Q163_Id, N'Dinner', 0, 3), (@Q163_Id, N'Snack', 0, 4);

-- Question 164: Complete: "I eat ___ at 12:00 PM."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'Complete the sentence: "I eat ___ at 12:00 PM."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q164_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q164_Id, N'lunch'), (@Q164_Id, N'Lunch');

-- Question 165: Speaking - Describe your meals
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'Describe what you eat for each meal clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'medium', 10, 1);
DECLARE @Q165_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q165_Id, N'Clear description', 1, 1), (@Q165_Id, N'Unclear description', 0, 2);

-- Question 166: Text input - What meal do you eat in the evening?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'What meal do you eat in the evening?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q166_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q166_Id, N'dinner'), (@Q166_Id, N'Dinner');

-- Question 167: Select all meals of the day
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'Select all meals of the day:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q167_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q167_Id, N'Breakfast', 1, 1), (@Q167_Id, N'Lunch', 1, 2), (@Q167_Id, N'Dinner', 1, 3), (@Q167_Id, N'Snack', 1, 4), (@Q167_Id, N'Drink', 0, 5), (@Q167_Id, N'Food', 0, 6);

-- Question 168: Matching - Match meals with times
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'Match each meal with the appropriate time:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q168_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q168_Id, N'Breakfast - Morning', 1, 1), (@Q168_Id, N'Lunch - Noon', 1, 2), (@Q168_Id, N'Dinner - Evening', 1, 3), (@Q168_Id, N'Snack - Anytime', 1, 4);

-- Question 169: Reorder words - Arrange meal description
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'Arrange these words: "I breakfast eat morning in the"',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q169_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q169_Id, N'I', 1, 1), (@Q169_Id, N'eat', 1, 2), (@Q169_Id, N'breakfast', 1, 3), (@Q169_Id, N'in', 1, 4), (@Q169_Id, N'the', 1, 5), (@Q169_Id, N'morning', 1, 6);

-- Question 170: Listening - Listen and identify the meal
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'Listen to the audio and identify which meal is being mentioned:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q170_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q170_Id, N'Dinner', 1, 1), (@Q170_Id, N'Breakfast', 0, 2), (@Q170_Id, N'Lunch', 0, 3), (@Q170_Id, N'Snack', 0, 4);

-- Question 171: What's the biggest meal of the day?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'What''s the biggest meal of the day?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q171_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q171_Id, N'Dinner', 1, 1), (@Q171_Id, N'Breakfast', 0, 2), (@Q171_Id, N'Lunch', 0, 3), (@Q171_Id, N'Snack', 0, 4);

-- Question 172: Text input - Complete: "I have a ___ between meals."
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 79, N'Complete the sentence: "I have a ___ between meals."',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q172_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q172_Id, N'snack'), (@Q172_Id, N'Snack');

GO
