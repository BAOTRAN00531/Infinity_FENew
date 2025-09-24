-- =====================================================
-- MODULE 1: GETTING STARTED (Lessons 52-56)
-- =====================================================

-- LESSON 52: English Alphabet and Sounds (lesson_id = 52)
-- Question 1: Which letter comes after 'M'?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'Which letter comes after ''M'' in the English alphabet?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q1_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q1_Id, N'L', 0, 1), (@Q1_Id, N'N', 1, 2), (@Q1_Id, N'O', 0, 3), (@Q1_Id, N'P', 0, 4);

-- Question 2: How many letters in alphabet?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'How many letters are there in the English alphabet?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q2_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q2_Id, N'24', 0, 1), (@Q2_Id, N'25', 0, 2), (@Q2_Id, N'26', 1, 3), (@Q2_Id, N'27', 0, 4);

-- Question 3: Which is a vowel?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'Which of these is a vowel?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q3_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q3_Id, N'B', 0, 1), (@Q3_Id, N'D', 0, 2), (@Q3_Id, N'E', 1, 3), (@Q3_Id, N'F', 0, 4);

-- Question 4: Select all vowels (Multiple choice multiple)
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'Select all the vowels from the options below:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q4_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q4_Id, N'A', 1, 1), (@Q4_Id, N'B', 0, 2), (@Q4_Id, N'E', 1, 3), (@Q4_Id, N'F', 0, 4), (@Q4_Id, N'I', 1, 5), (@Q4_Id, N'J', 0, 6);

-- Question 5: Text input - What letter comes before 'C'?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'What letter comes before ''C'' in the alphabet?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q5_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q5_Id, N'B'), (@Q5_Id, N'b');

-- Question 6: Fill in blank - The letter _ comes after G
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'The letter _ comes after G in the alphabet.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q6_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q6_Id, N'H'), (@Q6_Id, N'h');

-- Question 7: Speaking - Pronounce the letter 'A'
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'Please pronounce the letter ''A'' clearly.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'easy', 8, 1);
DECLARE @Q7_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q7_Id, N'Correct pronunciation', 1, 1), (@Q7_Id, N'Incorrect pronunciation', 0, 2);

-- Question 8: Matching - Match letters with their positions
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'Match each letter with its position in the alphabet:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q8_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q8_Id, N'A - 1st', 1, 1), (@Q8_Id, N'B - 2nd', 1, 2), (@Q8_Id, N'C - 3rd', 1, 3), (@Q8_Id, N'D - 4th', 1, 4);

-- Question 9: Reorder words - Arrange letters in alphabetical order
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'Arrange these letters in alphabetical order: C, A, B, D',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q9_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q9_Id, N'A', 1, 1), (@Q9_Id, N'B', 1, 2), (@Q9_Id, N'C', 1, 3), (@Q9_Id, N'D', 1, 4);

-- Question 10: Listening - Listen and identify the letter
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'Listen to the audio and identify which letter is being pronounced:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q10_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q10_Id, N'F', 1, 1), (@Q10_Id, N'G', 0, 2), (@Q10_Id, N'H', 0, 3), (@Q10_Id, N'I', 0, 4);

-- Question 11: Which letter is pronounced as "double-u"?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'Which letter is pronounced as "double-u"?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'medium', 5, 1);
DECLARE @Q11_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q11_Id, N'V', 0, 1), (@Q11_Id, N'W', 1, 2), (@Q11_Id, N'X', 0, 3), (@Q11_Id, N'Y', 0, 4);

-- Question 12: Text input - What are the first 5 letters of the alphabet?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 52, N'What are the first 5 letters of the English alphabet? (Write them in order)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 8, 1);
DECLARE @Q12_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q12_Id, N'A B C D E'), (@Q12_Id, N'ABCDE'), (@Q12_Id, N'a b c d e'), (@Q12_Id, N'abcde');

GO

-- LESSON 53: Numbers 1-20 (lesson_id = 53)
-- Question 13: What number comes after 15?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'What number comes after 15?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q13_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q13_Id, N'14', 0, 1), (@Q13_Id, N'16', 1, 2), (@Q13_Id, N'17', 0, 3), (@Q13_Id, N'18', 0, 4);

-- Question 14: How do you write "twelve" in numbers?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'How do you write "twelve" in numbers?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q14_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q14_Id, N'12'), (@Q14_Id, N'twelve');

-- Question 15: Select all even numbers from 1-20
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'Select all even numbers from 1 to 20:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_multi'), 'medium', 10, 1);
DECLARE @Q15_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q15_Id, N'2', 1, 1), (@Q15_Id, N'4', 1, 2), (@Q15_Id, N'6', 1, 3), (@Q15_Id, N'8', 1, 4), (@Q15_Id, N'10', 1, 5), (@Q15_Id, N'12', 1, 6), (@Q15_Id, N'14', 1, 7), (@Q15_Id, N'16', 1, 8), (@Q15_Id, N'18', 1, 9), (@Q15_Id, N'20', 1, 10);

-- Question 16: Fill in blank - I have _ apples
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'I have _ apples. (Write the number)',
        (SELECT id FROM dbo.Question_Types WHERE code = 'fill_in_the_blank'), 'easy', 5, 1);
DECLARE @Q16_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q16_Id, N'5'), (@Q16_Id, N'five'), (@Q16_Id, N'10'), (@Q16_Id, N'ten'), (@Q16_Id, N'15'), (@Q16_Id, N'fifteen');

-- Question 17: Speaking - Count from 1 to 10
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'Count from 1 to 10 out loud.',
        (SELECT id FROM dbo.Question_Types WHERE code = 'speaking'), 'easy', 8, 1);
DECLARE @Q17_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q17_Id, N'Correct counting', 1, 1), (@Q17_Id, N'Incorrect counting', 0, 2);

-- Question 18: Matching - Match numbers with words
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'Match each number with its word form:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'matching'), 'medium', 8, 1);
DECLARE @Q18_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q18_Id, N'7 - seven', 1, 1), (@Q18_Id, N'11 - eleven', 1, 2), (@Q18_Id, N'19 - nineteen', 1, 3), (@Q18_Id, N'20 - twenty', 1, 4);

-- Question 19: Reorder words - Arrange numbers in order
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'Arrange these numbers in order from smallest to largest: 18, 3, 12, 7',
        (SELECT id FROM dbo.Question_Types WHERE code = 'reorder_words'), 'medium', 8, 1);
DECLARE @Q19_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q19_Id, N'3', 1, 1), (@Q19_Id, N'7', 1, 2), (@Q19_Id, N'12', 1, 3), (@Q19_Id, N'18', 1, 4);

-- Question 20: Listening - Listen and identify the number
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'Listen to the audio and identify which number is being said:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'listening'), 'easy', 8, 1);
DECLARE @Q20_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q20_Id, N'13', 1, 1), (@Q20_Id, N'14', 0, 2), (@Q20_Id, N'15', 0, 3), (@Q20_Id, N'16', 0, 4);

-- Question 21: What is 5 + 7?
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'What is 5 + 7?',
        (SELECT id FROM dbo.Question_Types WHERE code = 'multiple_choice_single'), 'easy', 5, 1);
DECLARE @Q21_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Options (question_id, option_text, is_correct, position)
VALUES (@Q21_Id, N'11', 0, 1), (@Q21_Id, N'12', 1, 2), (@Q21_Id, N'13', 0, 3), (@Q21_Id, N'14', 0, 4);

-- Question 22: Text input - Write the number "seventeen"
INSERT INTO dbo.Questions (course_id, lesson_id, question_text, question_type_id, difficulty, points, created_by)
VALUES (2, 53, N'Write the number "seventeen" in digits:',
        (SELECT id FROM dbo.Question_Types WHERE code = 'text_input'), 'easy', 5, 1);
DECLARE @Q22_Id INT = SCOPE_IDENTITY();
INSERT INTO dbo.Question_Answers (question_id, answer_text)
VALUES (@Q22_Id, N'17');

GO
