import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiActivity, FiAward, FiTrendingUp, FiTarget, FiClock } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'quiz_completed',
      title: 'Completed Cardiology Quiz',
      description: 'Scored 85% on 15 questions',
      time: '2 hours ago',
      icon: FiTarget,
      color: 'green'
    },
    {
      id: 2,
      type: 'streak',
      title: '7-Day Study Streak!',
      description: 'Keep up the great work',
      time: '1 day ago',
      icon: FiAward,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'improvement',
      title: 'Anatomy Score Improved',
      description: 'From 70% to 82% average',
      time: '2 days ago',
      icon: FiTrendingUp,
      color: 'blue'
    },
    {
      id: 4,
      type: 'quiz_created',
      title: 'Created New Quiz',
      description: 'Pharmacology - Drug Interactions',
      time: '3 days ago',
      icon: FiActivity,
      color: 'purple'
    }
  ];

  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <SafeIcon icon={FiClock} className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              colorClasses[activity.color]
            }`}>
              <SafeIcon icon={activity.icon} className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <p className="text-sm text-gray-600">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="text-medical-600 hover:text-medical-700 text-sm font-medium">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;