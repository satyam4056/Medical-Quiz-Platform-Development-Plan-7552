import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuizStore = create(
  persist(
    (set, get) => ({
      quizzes: [],
      currentQuiz: null,
      isLoading: false,

      createQuiz: async (quizData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newQuiz = {
            id: Date.now().toString(),
            ...quizData,
            createdAt: new Date().toISOString(),
            lastAccessed: new Date().toISOString(),
            attempts: 0,
            averageScore: 0,
            isFavorited: false
          };

          set(state => ({
            quizzes: [...state.quizzes, newQuiz],
            isLoading: false
          }));

          return { success: true, quiz: newQuiz };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      getQuiz: (id) => {
        const { quizzes } = get();
        return quizzes.find(quiz => quiz.id === id);
      },

      updateQuizStats: (quizId, score, timeSpent) => {
        set(state => ({
          quizzes: state.quizzes.map(quiz => {
            if (quiz.id === quizId) {
              const newAttempts = quiz.attempts + 1;
              const newAverageScore = ((quiz.averageScore * quiz.attempts) + score) / newAttempts;
              
              return {
                ...quiz,
                attempts: newAttempts,
                averageScore: Math.round(newAverageScore),
                lastAccessed: new Date().toISOString()
              };
            }
            return quiz;
          })
        }));
      },

      toggleFavorite: (quizId) => {
        set(state => ({
          quizzes: state.quizzes.map(quiz =>
            quiz.id === quizId ? { ...quiz, isFavorited: !quiz.isFavorited } : quiz
          )
        }));
      },

      deleteQuiz: (quizId) => {
        set(state => ({
          quizzes: state.quizzes.filter(quiz => quiz.id !== quizId)
        }));
      },

      generateAIQuiz: async (topic, difficulty, questionCount) => {
        set({ isLoading: true });
        try {
          // Simulate AI generation
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const sampleQuestions = [
            {
              id: '1',
              question: `Which of the following is the primary function of the heart in ${topic}?`,
              options: [
                'Pumping blood throughout the body',
                'Filtering toxins from blood',
                'Producing red blood cells',
                'Storing oxygen'
              ],
              correctAnswer: 0,
              explanation: 'The heart\'s primary function is to pump blood throughout the body, delivering oxygen and nutrients to tissues.',
              difficulty: difficulty,
              topic: topic
            },
            {
              id: '2',
              question: `In ${topic}, what is the normal resting heart rate for adults?`,
              options: [
                '40-60 bpm',
                '60-100 bpm',
                '100-120 bpm',
                '120-140 bpm'
              ],
              correctAnswer: 1,
              explanation: 'The normal resting heart rate for adults is 60-100 beats per minute.',
              difficulty: difficulty,
              topic: topic
            }
          ];

          const aiQuiz = {
            title: `AI Generated: ${topic} Quiz`,
            description: `AI-generated quiz covering ${topic} concepts at ${difficulty} difficulty level`,
            subject: topic,
            examType: 'NEET-UG',
            difficulty: difficulty,
            questions: sampleQuestions.slice(0, questionCount),
            creationMethod: 'ai_generated',
            isPublic: false
          };

          const result = await get().createQuiz(aiQuiz);
          set({ isLoading: false });
          return result;
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      }
    }),
    {
      name: 'quiz-storage',
    }
  )
);