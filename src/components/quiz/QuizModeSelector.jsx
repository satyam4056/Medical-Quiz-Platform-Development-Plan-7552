import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBookOpen, FiClock, FiTarget, FiZap } = FiIcons;

const QuizModeSelector = ({ quiz, onModeSelect }) => {
  const modes = [
    {
      id: 'practice',
      title: 'Practice Mode',
      icon: FiBookOpen,
      description: 'Learn as you go with immediate feedback',
      features: [
        'Immediate feedback after each question',
        'Show explanations for wrong answers',
        'No time pressure',
        'Unlimited attempts',
        'Focus on learning'
      ],
      color: 'medical',
      buttonText: 'Start Practice'
    },
    {
      id: 'exam',
      title: 'Exam Mode',
      icon: FiClock,
      description: 'Simulate real exam conditions',
      features: [
        'Timed sessions (2 minutes per question)',
        'No feedback until completion',
        'Simulates real exam pressure',
        'Final scorecard with analysis',
        'Test your knowledge'
      ],
      color: 'red',
      buttonText: 'Start Exam'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{quiz.description}</p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiTarget} className="w-4 h-4" />
              <span>{quiz.questions?.length || 0} Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiZap} className="w-4 h-4" />
              <span className="capitalize">{quiz.difficulty} Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiBookOpen} className="w-4 h-4" />
              <span>{quiz.examType}</span>
            </div>
          </div>
        </motion.div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-gray-300 transition-colors p-8"
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  mode.color === 'medical' ? 'bg-medical-100' : 'bg-red-100'
                }`}>
                  <SafeIcon 
                    icon={mode.icon} 
                    className={`w-8 h-8 ${
                      mode.color === 'medical' ? 'text-medical-600' : 'text-red-600'
                    }`} 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{mode.title}</h3>
                <p className="text-gray-600">{mode.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {mode.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      mode.color === 'medical' ? 'bg-medical-100' : 'bg-red-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        mode.color === 'medical' ? 'bg-medical-600' : 'bg-red-600'
                      }`}></div>
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onModeSelect(mode.id)}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  mode.color === 'medical'
                    ? 'bg-medical-600 text-white hover:bg-medical-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {mode.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Quiz Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h4 className="font-medium text-blue-900 mb-3">Quiz Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-800 font-medium">Subject:</span>
              <span className="text-blue-700 ml-2">{quiz.subject}</span>
            </div>
            <div>
              <span className="text-blue-800 font-medium">Difficulty:</span>
              <span className="text-blue-700 ml-2 capitalize">{quiz.difficulty}</span>
            </div>
            <div>
              <span className="text-blue-800 font-medium">Questions:</span>
              <span className="text-blue-700 ml-2">{quiz.questions?.length || 0}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizModeSelector;