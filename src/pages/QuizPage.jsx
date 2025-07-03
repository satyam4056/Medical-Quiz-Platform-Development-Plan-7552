import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useQuizStore } from '../store/quizStore';
import { useAuthStore } from '../store/authStore';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResults from '../components/quiz/QuizResults';
import QuizModeSelector from '../components/quiz/QuizModeSelector';

const { FiArrowLeft, FiClock, FiTarget, FiFlag } = FiIcons;

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuiz, updateQuizStats } = useQuizStore();
  const { updateStats } = useAuthStore();

  const [quiz, setQuiz] = useState(null);
  const [mode, setMode] = useState(null); // 'practice' or 'exam'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [timeStarted, setTimeStarted] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const foundQuiz = getQuiz(id);
    if (foundQuiz) {
      setQuiz(foundQuiz);
    } else {
      toast.error('Quiz not found');
      navigate('/dashboard');
    }
  }, [id, getQuiz, navigate]);

  useEffect(() => {
    if (mode === 'exam' && timeStarted) {
      const duration = quiz?.questions?.length * 2 * 60 * 1000 || 1800000; // 2 minutes per question
      setTimeRemaining(duration);

      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1000) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mode, timeStarted, quiz]);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setTimeStarted(Date.now());
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));

    if (mode === 'practice') {
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(mode === 'practice' && answers[currentQuestion - 1] !== undefined);
    }
  };

  const handleQuestionJump = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setShowExplanation(mode === 'practice' && answers[questionIndex] !== undefined);
  };

  const toggleFlag = (questionIndex) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex);
      } else {
        newSet.add(questionIndex);
      }
      return newSet;
    });
  };

  const handleFinishQuiz = () => {
    const score = calculateScore();
    const timeSpent = Date.now() - timeStarted;

    // Update quiz stats
    updateQuizStats(quiz.id, score, timeSpent);

    // Update user stats
    updateStats({
      questionsAnswered: Object.keys(answers).length,
      accuracy: score
    });

    setShowResults(true);
  };

  const calculateScore = () => {
    const correctAnswers = Object.entries(answers).filter(([questionIndex, answerIndex]) => {
      return quiz.questions[questionIndex].correctAnswer === answerIndex;
    }).length;

    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600"></div>
      </div>
    );
  }

  if (!mode) {
    return <QuizModeSelector quiz={quiz} onModeSelect={handleModeSelect} />;
  }

  if (showResults) {
    return (
      <QuizResults
        quiz={quiz}
        answers={answers}
        score={calculateScore()}
        timeSpent={Date.now() - timeStarted}
        mode={mode}
        onRetakeQuiz={() => {
          setAnswers({});
          setCurrentQuestion(0);
          setShowResults(false);
          setShowExplanation(false);
          setTimeStarted(Date.now());
          setMode(null);
        }}
      />
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{quiz.title}</h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {mode === 'exam' && timeRemaining && (
                <div className="flex items-center space-x-2 text-red-600">
                  <SafeIcon icon={FiClock} className="w-4 h-4" />
                  <span className="font-medium">{formatTime(timeRemaining)}</span>
                </div>
              )}
              <button
                onClick={() => toggleFlag(currentQuestion)}
                className={`p-2 rounded-lg transition-colors ${
                  flaggedQuestions.has(currentQuestion)
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'text-gray-400 hover:text-yellow-600'
                }`}
              >
                <SafeIcon icon={FiFlag} className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-medical-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <h3 className="font-medium text-gray-900 mb-4">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionJump(index)}
                    className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                      index === currentQuestion
                        ? 'bg-medical-600 text-white'
                        : answers[index] !== undefined
                        ? 'bg-green-100 text-green-700'
                        : flaggedQuestions.has(index)
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-medical-600 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                  <span>Flagged</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuizQuestion
                  question={currentQ}
                  questionIndex={currentQuestion}
                  selectedAnswer={answers[currentQuestion]}
                  showExplanation={showExplanation}
                  mode={mode}
                  onAnswerSelect={(answerIndex) => handleAnswerSelect(currentQuestion, answerIndex)}
                  onShowExplanation={() => setShowExplanation(true)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center space-x-4">
                {currentQuestion === quiz.questions.length - 1 ? (
                  <button
                    onClick={handleFinishQuiz}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Finish Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-medical-600 text-white px-6 py-2 rounded-lg hover:bg-medical-700 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;