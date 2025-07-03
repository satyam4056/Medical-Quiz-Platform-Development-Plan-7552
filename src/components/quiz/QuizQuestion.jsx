import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck, FiX, FiEye, FiAlertCircle } = FiIcons;

const QuizQuestion = ({ 
  question, 
  questionIndex, 
  selectedAnswer, 
  showExplanation, 
  mode, 
  onAnswerSelect, 
  onShowExplanation 
}) => {
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Question */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-medium text-gray-900 leading-relaxed">
            {question.question}
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            question.difficulty === 'basic' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          const showCorrectness = showExplanation && mode === 'practice';

          let optionClass = 'border-gray-300 hover:border-gray-400';
          let iconColor = 'text-gray-400';
          let icon = null;

          if (isSelected && !showCorrectness) {
            optionClass = 'border-medical-500 bg-medical-50';
          } else if (showCorrectness) {
            if (isCorrectOption) {
              optionClass = 'border-green-500 bg-green-50';
              iconColor = 'text-green-600';
              icon = FiCheck;
            } else if (isSelected && !isCorrectOption) {
              optionClass = 'border-red-500 bg-red-50';
              iconColor = 'text-red-600';
              icon = FiX;
            }
          }

          return (
            <motion.button
              key={index}
              onClick={() => !showExplanation && onAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${optionClass} ${
                showExplanation ? 'cursor-default' : 'cursor-pointer'
              }`}
              whileHover={!showExplanation ? { scale: 1.01 } : {}}
              whileTap={!showExplanation ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected && !showCorrectness ? 'border-medical-500 bg-medical-500' :
                  showCorrectness && isCorrectOption ? 'border-green-500 bg-green-500' :
                  showCorrectness && isSelected && !isCorrectOption ? 'border-red-500 bg-red-500' :
                  'border-gray-300'
                }`}>
                  {icon && <SafeIcon icon={icon} className="w-3 h-3 text-white" />}
                  {!icon && isSelected && !showCorrectness && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-gray-700">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="text-gray-900">{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Show Explanation Button (Practice Mode) */}
      {mode === 'practice' && isAnswered && !showExplanation && (
        <div className="mb-6">
          <button
            onClick={onShowExplanation}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiEye} className="w-4 h-4" />
            <span>Show Explanation</span>
          </button>
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-l-4 pl-4 py-3 ${
            isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
          }`}
        >
          <div className="flex items-start space-x-3">
            <SafeIcon 
              icon={isCorrect ? FiCheck : FiAlertCircle} 
              className={`w-5 h-5 mt-0.5 ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`} 
            />
            <div>
              <h4 className={`font-medium mb-2 ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h4>
              <p className={`text-sm leading-relaxed ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {question.explanation}
              </p>
              {!isCorrect && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Correct answer:</strong> {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizQuestion;