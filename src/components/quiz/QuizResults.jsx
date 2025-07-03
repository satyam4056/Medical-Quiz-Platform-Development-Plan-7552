import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrophy, FiTarget, FiClock, FiRefreshCw, FiHome, FiShare2, FiCheck, FiX } = FiIcons;

const QuizResults = ({ quiz, answers, score, timeSpent, mode, onRetakeQuiz }) => {
  const totalQuestions = quiz.questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const correctAnswers = Object.entries(answers).filter(([questionIndex, answerIndex]) => {
    return quiz.questions[questionIndex].correctAnswer === answerIndex;
  }).length;

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return 'Outstanding! 🎉';
    if (score >= 80) return 'Excellent work! 👏';
    if (score >= 70) return 'Good job! 👍';
    if (score >= 60) return 'Not bad, keep practicing! 📚';
    return 'Keep studying, you\'ll improve! 💪';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-medical-500 to-medical-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiTrophy} className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
          <p className="text-lg text-gray-600">{getScoreMessage(score)}</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}%
            </div>
            <p className="text-gray-600">Your Score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <SafeIcon icon={FiTarget} className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <SafeIcon icon={FiX} className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{answeredQuestions - correctAnswers}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <SafeIcon icon={FiTarget} className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalQuestions - answeredQuestions}</div>
              <div className="text-sm text-gray-600">Skipped</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <SafeIcon icon={FiClock} className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatTime(timeSpent)}</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
          </div>
        </motion.div>

        {/* Question Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Question Review</h3>
          
          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== undefined;

              return (
                <div
                  key={index}
                  className={`border-l-4 pl-4 py-3 ${
                    !wasAnswered ? 'border-gray-300 bg-gray-50' :
                    isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {index + 1}. {question.question.substring(0, 100)}...
                      </h4>
                      <div className="text-sm text-gray-600">
                        {wasAnswered ? (
                          <>
                            <span>Your answer: {String.fromCharCode(65 + userAnswer)} - {question.options[userAnswer]}</span>
                            {!isCorrect && (
                              <div className="mt-1">
                                <span className="text-green-600">
                                  Correct answer: {String.fromCharCode(65 + question.correctAnswer)} - {question.options[question.correctAnswer]}
                                </span>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-500">Not answered</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      {!wasAnswered ? (
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">-</span>
                        </div>
                      ) : isCorrect ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <SafeIcon icon={FiCheck} className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <SafeIcon icon={FiX} className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onRetakeQuiz}
            className="bg-medical-600 text-white px-6 py-3 rounded-lg hover:bg-medical-700 transition-colors flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          <button
            onClick={() => window.location.href = '#/dashboard'}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiHome} className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Quiz Results',
                  text: `I scored ${score}% on "${quiz.title}"!`,
                  url: window.location.href
                });
              }
            }}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiShare2} className="w-4 h-4" />
            <span>Share Results</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResults;