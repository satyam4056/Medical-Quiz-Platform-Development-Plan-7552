import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuthStore } from '../store/authStore';
import { useQuizStore } from '../store/quizStore';
import StatsCard from '../components/dashboard/StatsCard';
import QuizCard from '../components/dashboard/QuizCard';
import RecentActivity from '../components/dashboard/RecentActivity';

const { FiPlus, FiBrain, FiTarget, FiTrendingUp, FiClock } = FiIcons;

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { quizzes } = useQuizStore();

  const stats = [
    {
      title: 'Quizzes Created',
      value: quizzes.length,
      icon: FiBrain,
      color: 'medical',
      change: '+2 this week'
    },
    {
      title: 'Questions Answered',
      value: user?.stats?.questionsAnswered || 0,
      icon: FiTarget,
      color: 'green',
      change: '+45 this week'
    },
    {
      title: 'Average Accuracy',
      value: `${user?.stats?.accuracy || 0}%`,
      icon: FiTrendingUp,
      color: 'blue',
      change: '+5% this month'
    },
    {
      title: 'Study Streak',
      value: `${user?.stats?.streak || 0} days`,
      icon: FiClock,
      color: 'purple',
      change: 'Keep it up!'
    }
  ];

  const recentQuizzes = quizzes.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Ready to continue your medical exam preparation?
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/create-quiz"
                className="bg-medical-600 text-white px-6 py-3 rounded-lg hover:bg-medical-700 transition-colors inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Create Quiz</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Quizzes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Quizzes</h2>
                <Link
                  to="/create-quiz"
                  className="text-medical-600 hover:text-medical-700 text-sm font-medium"
                >
                  Create New
                </Link>
              </div>

              {recentQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <SafeIcon icon={FiBrain} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No quizzes yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first quiz to start practicing
                  </p>
                  <Link
                    to="/create-quiz"
                    className="bg-medical-600 text-white px-6 py-2 rounded-lg hover:bg-medical-700 transition-colors"
                  >
                    Create Your First Quiz
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <RecentActivity />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;