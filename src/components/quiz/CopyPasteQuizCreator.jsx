import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useQuizStore } from '../../store/quizStore';

const { FiCopy, FiUpload, FiAlertCircle } = FiIcons;

const CopyPasteQuizCreator = () => {
  const [textContent, setTextContent] = useState('');
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    description: '',
    difficulty: 'intermediate',
    examType: 'NEET-UG'
  });
  const [step, setStep] = useState(1);

  const { createQuiz, isLoading } = useQuizStore();
  const navigate = useNavigate();

  const examTypes = [
    { value: 'NEET-UG', label: 'NEET-UG' },
    { value: 'NEET-PG', label: 'NEET-PG' },
    { value: 'USMLE-Step1', label: 'USMLE Step 1' },
    { value: 'USMLE-Step2', label: 'USMLE Step 2' },
    { value: 'PLAB', label: 'PLAB' }
  ];

  const handleProcessText = () => {
    if (!textContent.trim()) {
      toast.error('Please paste your study material first');
      return;
    }
    setStep(2);
  };

  const handleCreateQuiz = async () => {
    if (!quizDetails.title.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    try {
      // Simulate AI processing of pasted content
      const processedQuestions = [
        {
          id: '1',
          question: 'Based on your study material, which of the following best describes the main concept?',
          options: [
            'Option A from your text',
            'Option B from your text',
            'Option C from your text',
            'Option D from your text'
          ],
          correctAnswer: 0,
          explanation: 'This answer is correct based on the content you provided.',
          difficulty: quizDetails.difficulty,
          topic: 'Custom Content'
        },
        {
          id: '2',
          question: 'According to your study material, what is the key relationship mentioned?',
          options: [
            'Relationship A',
            'Relationship B',
            'Relationship C',
            'Relationship D'
          ],
          correctAnswer: 1,
          explanation: 'This relationship is clearly outlined in your provided text.',
          difficulty: quizDetails.difficulty,
          topic: 'Custom Content'
        }
      ];

      const quizData = {
        title: quizDetails.title,
        description: quizDetails.description || 'Quiz created from your study materials',
        subject: 'Custom Content',
        examType: quizDetails.examType,
        difficulty: quizDetails.difficulty,
        questions: processedQuestions,
        creationMethod: 'copy_paste',
        isPublic: false
      };

      const result = await createQuiz(quizData);

      if (result.success) {
        toast.success('Quiz created successfully from your content!');
        navigate(`/quiz/${result.quiz.id}`);
      } else {
        toast.error(result.error || 'Failed to create quiz');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">How it works</h4>
                <p className="text-sm text-blue-800">
                  Paste your study materials, notes, or textbook content. Our AI will analyze the text 
                  and create relevant multiple-choice questions with explanations.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Your Study Material
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste your study notes, textbook content, or any medical educational material here. The AI will analyze it and create relevant questions..."
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 resize-none"
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {textContent.length} characters
              </span>
              <span className="text-sm text-gray-500">
                Recommended: 500-2000 characters
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleProcessText}
              disabled={!textContent.trim()}
              className="bg-medical-600 text-white px-6 py-2 rounded-lg hover:bg-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiUpload} className="w-4 h-4" />
              <span>Process Content</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Quiz Details</h3>
            <button
              onClick={() => setStep(1)}
              className="text-medical-600 hover:text-medical-700 text-sm"
            >
              Edit Content
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Content Preview</h4>
            <p className="text-sm text-gray-600 line-clamp-3">
              {textContent.substring(0, 200)}...
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title *
              </label>
              <input
                type="text"
                value={quizDetails.title}
                onChange={(e) => setQuizDetails(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter a title for your quiz"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={quizDetails.description}
                onChange={(e) => setQuizDetails(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Optional description for your quiz"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  value={quizDetails.difficulty}
                  onChange={(e) => setQuizDetails(prev => ({ ...prev, difficulty: e.target.value }))}
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
                  value={quizDetails.examType}
                  onChange={(e) => setQuizDetails(prev => ({ ...prev, examType: e.target.value }))}
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
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCreateQuiz}
              disabled={isLoading || !quizDetails.title.trim()}
              className="bg-medical-600 text-white px-6 py-2 rounded-lg hover:bg-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating Quiz...</span>
                </>
              ) : (
                <>
                  <SafeIcon icon={FiCopy} className="w-4 h-4" />
                  <span>Create Quiz</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CopyPasteQuizCreator;