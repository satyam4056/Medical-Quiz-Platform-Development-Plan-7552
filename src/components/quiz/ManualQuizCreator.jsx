import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useQuizStore } from '../../store/quizStore';

const { FiPlus, FiTrash2, FiEdit, FiSave } = FiIcons;

const ManualQuizCreator = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    subject: '',
    difficulty: 'intermediate',
    examType: 'NEET-UG',
    isPublic: false
  });

  const [questions, setQuestions] = useState([
    {
      id: '1',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      difficulty: 'intermediate'
    }
  ]);

  const { createQuiz, isLoading } = useQuizStore();
  const navigate = useNavigate();

  const examTypes = [
    { value: 'NEET-UG', label: 'NEET-UG' },
    { value: 'NEET-PG', label: 'NEET-PG' },
    { value: 'USMLE-Step1', label: 'USMLE Step 1' },
    { value: 'USMLE-Step2', label: 'USMLE Step 2' },
    { value: 'PLAB', label: 'PLAB' }
  ];

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      difficulty: quizData.difficulty
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  const updateQuestion = (questionId, field, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const handleSubmit = async () => {
    // Validation
    if (!quizData.title.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    if (!quizData.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }

    const validQuestions = questions.filter(q => 
      q.question.trim() && 
      q.options.every(opt => opt.trim()) &&
      q.explanation.trim()
    );

    if (validQuestions.length === 0) {
      toast.error('Please add at least one complete question');
      return;
    }

    try {
      const finalQuizData = {
        ...quizData,
        questions: validQuestions,
        creationMethod: 'manual'
      };

      const result = await createQuiz(finalQuizData);

      if (result.success) {
        toast.success('Quiz created successfully!');
        navigate(`/quiz/${result.quiz.id}`);
      } else {
        toast.error(result.error || 'Failed to create quiz');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Quiz Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quiz Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title *
            </label>
            <input
              type="text"
              value={quizData.title}
              onChange={(e) => setQuizData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter quiz title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <input
              type="text"
              value={quizData.subject}
              onChange={(e) => setQuizData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="e.g., Cardiology, Anatomy"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty Level
            </label>
            <select
              value={quizData.difficulty}
              onChange={(e) => setQuizData(prev => ({ ...prev, difficulty: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
            >
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Type
            </label>
            <select
              value={quizData.examType}
              onChange={(e) => setQuizData(prev => ({ ...prev, examType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
            >
              {examTypes.map((exam) => (
                <option key={exam.value} value={exam.value}>
                  {exam.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={quizData.description}
            onChange={(e) => setQuizData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description of the quiz"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 resize-none"
          />
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={quizData.isPublic}
              onChange={(e) => setQuizData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="text-medical-600 focus:ring-medical-500 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Make this quiz public (others can practice it)
            </span>
          </label>
        </div>
      </motion.div>

      {/* Questions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Questions</h3>
          <button
            onClick={addQuestion}
            className="bg-medical-600 text-white px-4 py-2 rounded-lg hover:bg-medical-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>

        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">
                Question {index + 1}
              </h4>
              {questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text *
                </label>
                <textarea
                  value={question.question}
                  onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                  placeholder="Enter your question here..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer Options *
                </label>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                        className="text-medical-600 focus:ring-medical-500"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Select the correct answer by clicking the radio button
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation *
                </label>
                <textarea
                  value={question.explanation}
                  onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                  placeholder="Explain why this answer is correct..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 resize-none"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-medical-600 text-white px-8 py-3 rounded-lg hover:bg-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Creating Quiz...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Create Quiz</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ManualQuizCreator;