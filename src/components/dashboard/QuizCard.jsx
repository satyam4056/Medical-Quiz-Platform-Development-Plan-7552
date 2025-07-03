import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useQuizStore } from '../../store/quizStore';

const { FiPlay, FiEdit, FiTrash2, FiHeart, FiClock, FiTarget } = FiIcons;

const QuizCard = ({ quiz }) => {
  const { toggleFavorite, deleteQuiz } = useQuizStore();

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(quiz.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(quiz.id);
    }
  };

  const difficultyColors = {
    basic: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {quiz.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {quiz.description}
          </p>
        </div>
        <button
          onClick={handleToggleFavorite}
          className={`ml-2 p-1 rounded ${
            quiz.isFavorited 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <SafeIcon icon={FiHeart} className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
        <div className="flex items-center">
          <SafeIcon icon={FiTarget} className="w-3 h-3 mr-1" />
          <span>{quiz.questions?.length || 0} questions</span>
        </div>
        <div className="flex items-center">
          <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
          <span>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            difficultyColors[quiz.difficulty] || difficultyColors.basic
          }`}>
            {quiz.difficulty}
          </span>
          {quiz.averageScore > 0 && (
            <span className="text-xs text-gray-600">
              Avg: {quiz.averageScore}%
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/quiz/${quiz.id}`}
            className="bg-medical-600 text-white px-3 py-1 rounded text-xs hover:bg-medical-700 transition-colors flex items-center space-x-1"
          >
            <SafeIcon icon={FiPlay} className="w-3 h-3" />
            <span>Practice</span>
          </Link>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 p-1"
          >
            <SafeIcon icon={FiTrash2} className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard;