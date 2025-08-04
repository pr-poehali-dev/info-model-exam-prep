import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

// Типичные вопросы по информационному моделированию
const questions = [
  {
    id: 1,
    question: "Что такое информационная модель?",
    options: [
      "Физическое представление объекта",
      "Описание объекта с помощью информации",
      "Математическая формула",
      "Компьютерная программа"
    ],
    correctAnswer: 1,
    explanation: "Информационная модель — это описание объекта или процесса с помощью информации, отражающее его основные свойства и характеристики."
  },
  {
    id: 2,
    question: "К какому типу моделей относится карта местности?",
    options: [
      "Математическая модель",
      "Компьютерная модель",
      "Графическая модель",
      "Словесная модель"
    ],
    correctAnswer: 2,
    explanation: "Карта местности является графической моделью, так как представляет информацию в виде изображения."
  },
  {
    id: 3,
    question: "Что является основной целью моделирования?",
    options: [
      "Создание красивых картинок",
      "Изучение объекта или процесса",
      "Экономия времени",
      "Развлечение"
    ],
    correctAnswer: 1,
    explanation: "Основная цель моделирования — изучение объекта или процесса путем исследования его модели."
  },
  {
    id: 4,
    question: "Какая модель является формализованной?",
    options: [
      "Словесное описание",
      "Математическое уравнение",
      "Рисунок от руки",
      "Устный рассказ"
    ],
    correctAnswer: 1,
    explanation: "Математическое уравнение является формализованной моделью, записанной с помощью формальных символов и правил."
  },
  {
    id: 5,
    question: "База данных является примером:",
    options: [
      "Физической модели",
      "Математической модели",
      "Информационной модели",
      "Материальной модели"
    ],
    correctAnswer: 2,
    explanation: "База данных является информационной моделью, представляющей структурированную информацию об объектах предметной области."
  }
];

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = (answeredQuestions.filter(Boolean).length / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnsweredQuestions = [...answeredQuestions];
    const newUserAnswers = [...userAnswers];
    
    newAnsweredQuestions[currentQuestionIndex] = true;
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    
    setAnsweredQuestions(newAnsweredQuestions);
    setUserAnswers(newUserAnswers);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    // Проверяем, завершен ли тест
    if (newAnsweredQuestions.every(Boolean)) {
      setIsComplete(true);
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setUserAnswers(new Array(questions.length).fill(-1));
    setIsComplete(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Подготовка к экзамену
          </h1>
          <p className="text-lg text-gray-600">Информационное моделирование</p>
        </div>

        <Tabs defaultValue="test" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="test" className="flex items-center gap-2">
              <Icon name="FileQuestion" size={16} />
              Тестирование
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="theory" className="flex items-center gap-2">
              <Icon name="BookOpen" size={16} />
              Теория
            </TabsTrigger>
          </TabsList>

          {/* Тестирование */}
          <TabsContent value="test" className="space-y-6">
            {/* Progress Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Прогресс: {answeredQuestions.filter(Boolean).length} из {questions.length}
                  </span>
                  <Badge variant="outline" className={getScoreColor()}>
                    Правильных: {score}
                  </Badge>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </CardContent>
            </Card>

            {!isComplete ? (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Вопрос {currentQuestionIndex + 1}</span>
                    <Icon name="Brain" size={24} className="text-blue-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <h3 className="text-lg font-medium leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          selectedAnswer === index
                            ? showResult
                              ? index === currentQuestion.correctAnswer
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-red-500 bg-red-50 text-red-700'
                              : 'border-blue-500 bg-blue-50'
                            : showResult && index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index
                              ? showResult
                                ? index === currentQuestion.correctAnswer
                                  ? 'border-green-500 bg-green-500'
                                  : 'border-red-500 bg-red-500'
                                : 'border-blue-500 bg-blue-500'
                              : showResult && index === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                          }`}>
                            {((selectedAnswer === index && showResult) || 
                              (showResult && index === currentQuestion.correctAnswer)) && (
                              <Icon 
                                name={index === currentQuestion.correctAnswer ? "Check" : "X"} 
                                size={14} 
                                className="text-white" 
                              />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Объяснение:</h4>
                      <p className="text-blue-800">{currentQuestion.explanation}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {!showResult ? (
                      <Button 
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className="flex-1"
                      >
                        Ответить
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="flex-1"
                      >
                        Следующий вопрос
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="animate-scale-in">
                <CardContent className="p-8 text-center">
                  <Icon name="Trophy" size={48} className="text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">Тест завершен!</h2>
                  <div className="text-4xl font-bold mb-4 text-blue-600">
                    {score} из {questions.length}
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Ваш результат: {Math.round((score / questions.length) * 100)}%
                  </p>
                  <Button onClick={resetTest} size="lg">
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Пройти заново
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Статистика */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Target" size={32} className="text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-gray-600">Правильных ответов</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Percent" size={32} className="text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {answeredQuestions.filter(Boolean).length > 0 
                      ? Math.round((score / answeredQuestions.filter(Boolean).length) * 100)
                      : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Точность</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="CheckCircle" size={32} className="text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {answeredQuestions.filter(Boolean).length}
                  </div>
                  <div className="text-sm text-gray-600">Отвечено</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Визуализация прогресса
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Общий прогресс</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  
                  <div className="grid grid-cols-5 gap-2 mt-6">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-8 rounded flex items-center justify-center text-xs font-medium ${
                          !answeredQuestions[index]
                            ? 'bg-gray-200 text-gray-500'
                            : userAnswers[index] === questions[index].correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Теория */}
          <TabsContent value="theory" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" size={20} />
                    Основы информационного моделирования
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Ключевые понятия:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Icon name="Dot" size={16} className="mt-1 text-blue-600" />
                        <span><strong>Модель</strong> — упрощенное представление объекта или процесса</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Dot" size={16} className="mt-1 text-blue-600" />
                        <span><strong>Информационная модель</strong> — модель, представленная в виде информации</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Dot" size={16} className="mt-1 text-blue-600" />
                        <span><strong>Формализация</strong> — процесс построения формальной модели</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Layers" size={20} />
                    Типы моделей
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">По способу представления:</h5>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Материальные модели</li>
                        <li>• Информационные модели</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-2">По форме представления:</h5>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Словесные модели</li>
                        <li>• Математические модели</li>
                        <li>• Графические модели</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;