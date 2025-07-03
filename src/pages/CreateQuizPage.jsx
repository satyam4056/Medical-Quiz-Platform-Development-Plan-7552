import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useQuizStore } from '../store/quizStore';
import AIQuizGenerator from '../components/quiz/AIQuizGenerator';
import CopyPasteQuizCreator from '../components/quiz/CopyPasteQuizCreator';
import ManualQuizCreator from '../components/quiz/ManualQuizCreator';

const { FiBrain, FiCopy, FiEdit, FiArrowLeft } = FiIcons;

const CreateQuizPage = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const navigate = useNavigate();
  const { isLoading } = useQuizStore();

  const tabs = [
    {
      id: 'ai',
      name: 'AI Generation',
      icon: FiBrain,
      description: 'Generate questions from medical topics'
    },
    {
      id: 'paste',
      name: 'Copy & Paste',
      icon: FiCopy,
      description: 'Convert your study materials'
    },
    {
      id: 'manual',
      name: 'Manual Creation',
      icon: FiEdit,
      description: 'Create questions manually'
    }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'ai':
        return <AIQuizGenerator />;
      case 'paste':
        return <CopyPasteQuizCreator />;
      case 'manual':
        return <ManualQuizCreator />;
      default:
        return <AIQuizGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Quiz
          </h1>
          <p className="text-gray-600">
            Choose your preferred method to create a personalized medical quiz
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-medical-500 text-medical-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={tab.icon} className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h3>
              <p className="text-gray-600">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Creating your quiz...</p>
                </div>
              </div>
            )}

            {/* Active Component */}
            <div className="relative">
              {renderActiveComponent()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateQuizPage;