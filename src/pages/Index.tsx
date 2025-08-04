import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

// База из 100 вопросов по информационному моделированию
const questions = [
  // Основы моделирования (1-20)
  {
    id: 1,
    question: "Что такое информационная модель?",
    options: ["Физическое представление объекта", "Описание объекта с помощью информации", "Математическая формула", "Компьютерная программа"],
    correctAnswer: 1,
    explanation: "Информационная модель — это описание объекта или процесса с помощью информации."
  },
  {
    id: 2,
    question: "К какому типу моделей относится карта местности?",
    options: ["Математическая модель", "Компьютерная модель", "Графическая модель", "Словесная модель"],
    correctAnswer: 2,
    explanation: "Карта местности является графической моделью."
  },
  {
    id: 3,
    question: "Что является основной целью моделирования?",
    options: ["Создание красивых картинок", "Изучение объекта или процесса", "Экономия времени", "Развлечение"],
    correctAnswer: 1,
    explanation: "Основная цель моделирования — изучение объекта или процесса."
  },
  {
    id: 4,
    question: "Какая модель является формализованной?",
    options: ["Словесное описание", "Математическое уравнение", "Рисунок от руки", "Устный рассказ"],
    correctAnswer: 1,
    explanation: "Математическое уравнение является формализованной моделью."
  },
  {
    id: 5,
    question: "База данных является примером:",
    options: ["Физической модели", "Математической модели", "Информационной модели", "Материальной модели"],
    correctAnswer: 2,
    explanation: "База данных является информационной моделью."
  },
  {
    id: 6,
    question: "Какое из перечисленного НЕ является свойством модели?",
    options: ["Адекватность", "Полнота", "Абсолютная точность", "Целенаправленность"],
    correctAnswer: 2,
    explanation: "Абсолютная точность не является обязательным свойством модели."
  },
  {
    id: 7,
    question: "Что такое объект моделирования?",
    options: ["Модель объекта", "Реальный объект, который изучается", "Способ представления", "Результат моделирования"],
    correctAnswer: 1,
    explanation: "Объект моделирования — это реальный объект, который изучается."
  },
  {
    id: 8,
    question: "Адекватность модели означает:",
    options: ["Красоту модели", "Соответствие модели объекту в рамках задач моделирования", "Простоту модели", "Сложность модели"],
    correctAnswer: 1,
    explanation: "Адекватность — это соответствие модели объекту в рамках задач моделирования."
  },
  {
    id: 9,
    question: "Процесс построения модели называется:",
    options: ["Формализация", "Моделирование", "Алгоритмизация", "Программирование"],
    correctAnswer: 1,
    explanation: "Процесс построения модели называется моделированием."
  },
  {
    id: 10,
    question: "Какая модель лучше отражает структуру объекта?",
    options: ["Функциональная", "Структурная", "Алгоритмическая", "Математическая"],
    correctAnswer: 1,
    explanation: "Структурная модель лучше отражает структуру объекта."
  },
  {
    id: 11,
    question: "Информационное моделирование — это:",
    options: ["Создание физических копий", "Построение информационных моделей", "Программирование", "Рисование схем"],
    correctAnswer: 1,
    explanation: "Информационное моделирование — это построение информационных моделей."
  },
  {
    id: 12,
    question: "Модель отличается от оригинала:",
    options: ["Полностью", "Только размерами", "Существенными признаками для целей моделирования", "Цветом"],
    correctAnswer: 2,
    explanation: "Модель содержит только существенные признаки для целей моделирования."
  },
  {
    id: 13,
    question: "Этапы моделирования включают:",
    options: ["Только построение модели", "Построение, исследование, применение", "Только исследование", "Только применение"],
    correctAnswer: 1,
    explanation: "Этапы моделирования: построение, исследование, применение."
  },
  {
    id: 14,
    question: "Натурные модели — это:",
    options: ["Информационные модели", "Материальные модели", "Математические модели", "Компьютерные модели"],
    correctAnswer: 1,
    explanation: "Натурные модели — это материальные модели."
  },
  {
    id: 15,
    question: "Знаковые модели представляют информацию в виде:",
    options: ["Физических объектов", "Знаков и символов", "Звуков", "Запахов"],
    correctAnswer: 1,
    explanation: "Знаковые модели представляют информацию в виде знаков и символов."
  },
  {
    id: 16,
    question: "Примером концептуальной модели является:",
    options: ["Математическая формула", "Теория относительности", "Чертеж детали", "Компьютерная программа"],
    correctAnswer: 1,
    explanation: "Теория относительности — пример концептуальной модели."
  },
  {
    id: 17,
    question: "Вербальная модель — это:",
    options: ["Словесная модель", "Графическая модель", "Математическая модель", "Физическая модель"],
    correctAnswer: 0,
    explanation: "Вербальная модель — это словесная модель."
  },
  {
    id: 18,
    question: "Какие модели используют естественные языки?",
    options: ["Формальные", "Вербальные", "Математические", "Логические"],
    correctAnswer: 1,
    explanation: "Вербальные модели используют естественные языки."
  },
  {
    id: 19,
    question: "Детерминированная модель характеризуется:",
    options: ["Случайностью", "Определенностью связей", "Неопределенностью", "Вероятностью"],
    correctAnswer: 1,
    explanation: "Детерминированная модель характеризуется определенностью связей."
  },
  {
    id: 20,
    question: "Стохастическая модель учитывает:",
    options: ["Только детерминированные связи", "Случайные факторы", "Только логические связи", "Только причинные связи"],
    correctAnswer: 1,
    explanation: "Стохастическая модель учитывает случайные факторы."
  },
  
  // Системный анализ (21-30)
  {
    id: 21,
    question: "Система — это:",
    options: ["Множество элементов", "Совокупность взаимосвязанных элементов", "Группа объектов", "Набор данных"],
    correctAnswer: 1,
    explanation: "Система — это совокупность взаимосвязанных элементов."
  },
  {
    id: 22,
    question: "Свойство эмерджентности означает:",
    options: ["Простоту системы", "Появление у системы новых свойств", "Сложность системы", "Неизменность системы"],
    correctAnswer: 1,
    explanation: "Эмерджентность — появление у системы новых свойств."
  },
  {
    id: 23,
    question: "Иерархическая система характеризуется:",
    options: ["Равенством всех элементов", "Многоуровневой структурой", "Хаотичностью", "Простотой"],
    correctAnswer: 1,
    explanation: "Иерархическая система имеет многоуровневую структуру."
  },
  {
    id: 24,
    question: "Подсистема — это:",
    options: ["Внешняя система", "Часть системы", "Надсистема", "Независимая система"],
    correctAnswer: 1,
    explanation: "Подсистема — это часть системы."
  },
  {
    id: 25,
    question: "Открытая система характеризуется:",
    options: ["Отсутствием связей с внешней средой", "Наличием связей с внешней средой", "Изолированностью", "Замкнутостью"],
    correctAnswer: 1,
    explanation: "Открытая система имеет связи с внешней средой."
  },
  {
    id: 26,
    question: "Закрытая система:",
    options: ["Взаимодействует с внешней средой", "Не взаимодействует с внешней средой", "Частично взаимодействует", "Случайно взаимодействует"],
    correctAnswer: 1,
    explanation: "Закрытая система не взаимодействует с внешней средой."
  },
  {
    id: 27,
    question: "Структура системы определяется:",
    options: ["Количеством элементов", "Связями между элементами", "Размером системы", "Возрастом системы"],
    correctAnswer: 1,
    explanation: "Структура системы определяется связями между элементами."
  },
  {
    id: 28,
    question: "Функция системы — это:",
    options: ["Количество элементов", "Назначение системы", "Размер системы", "Возраст системы"],
    correctAnswer: 1,
    explanation: "Функция системы — это её назначение."
  },
  {
    id: 29,
    question: "Системный подход предполагает:",
    options: ["Изучение отдельных элементов", "Комплексное изучение системы", "Игнорирование связей", "Упрощение системы"],
    correctAnswer: 1,
    explanation: "Системный подход предполагает комплексное изучение системы."
  },
  {
    id: 30,
    question: "Целостность системы означает:",
    options: ["Независимость элементов", "Единство и взаимосвязанность элементов", "Случайность связей", "Отсутствие структуры"],
    correctAnswer: 1,
    explanation: "Целостность — единство и взаимосвязанность элементов."
  },
  
  // Математические модели (31-50)
  {
    id: 31,
    question: "Математическая модель использует:",
    options: ["Естественный язык", "Математические символы и отношения", "Только числа", "Только формулы"],
    correctAnswer: 1,
    explanation: "Математическая модель использует математические символы и отношения."
  },
  {
    id: 32,
    question: "Алгебраическая модель включает:",
    options: ["Только дифференциальные уравнения", "Алгебраические уравнения", "Только интегралы", "Только матрицы"],
    correctAnswer: 1,
    explanation: "Алгебраическая модель включает алгебраические уравнения."
  },
  {
    id: 33,
    question: "Дифференциальные уравнения описывают:",
    options: ["Статические процессы", "Динамические процессы", "Только константы", "Только дискретные величины"],
    correctAnswer: 1,
    explanation: "Дифференциальные уравнения описывают динамические процессы."
  },
  {
    id: 34,
    question: "Статистическая модель основана на:",
    options: ["Детерминированных законах", "Статистических закономерностях", "Логических правилах", "Физических законах"],
    correctAnswer: 1,
    explanation: "Статистическая модель основана на статистических закономерностях."
  },
  {
    id: 35,
    question: "Линейная модель характеризуется:",
    options: ["Нелинейными зависимостями", "Линейными зависимостями", "Случайными зависимостями", "Отсутствием зависимостей"],
    correctAnswer: 1,
    explanation: "Линейная модель характеризуется линейными зависимостями."
  },
  {
    id: 36,
    question: "Регрессионная модель используется для:",
    options: ["Классификации", "Прогнозирования", "Сортировки", "Поиска"],
    correctAnswer: 1,
    explanation: "Регрессионная модель используется для прогнозирования."
  },
  {
    id: 37,
    question: "Корреляционная модель изучает:",
    options: ["Причинные связи", "Статистические связи", "Логические связи", "Временные связи"],
    correctAnswer: 1,
    explanation: "Корреляционная модель изучает статистические связи."
  },
  {
    id: 38,
    question: "Оптимизационная модель служит для:",
    options: ["Описания процесса", "Поиска оптимального решения", "Анализа данных", "Представления информации"],
    correctAnswer: 1,
    explanation: "Оптимизационная модель служит для поиска оптимального решения."
  },
  {
    id: 39,
    question: "Целевая функция в оптимизационной модели:",
    options: ["Описывает ограничения", "Задает критерий оптимальности", "Определяет переменные", "Устанавливает связи"],
    correctAnswer: 1,
    explanation: "Целевая функция задает критерий оптимальности."
  },
  {
    id: 40,
    question: "Ограничения в оптимизационной модели:",
    options: ["Максимизируются", "Определяют допустимую область", "Игнорируются", "Минимизируются"],
    correctAnswer: 1,
    explanation: "Ограничения определяют допустимую область."
  },
  {
    id: 41,
    question: "Модель массового обслуживания изучает:",
    options: ["Производственные процессы", "Процессы обслуживания заявок", "Финансовые процессы", "Информационные процессы"],
    correctAnswer: 1,
    explanation: "Модель массового обслуживания изучает процессы обслуживания заявок."
  },
  {
    id: 42,
    question: "Марковская модель характеризуется:",
    options: ["Зависимостью от всей предыстории", "Зависимостью только от текущего состояния", "Независимостью состояний", "Цикличностью"],
    correctAnswer: 1,
    explanation: "Марковская модель зависит только от текущего состояния."
  },
  {
    id: 43,
    question: "Имитационная модель:",
    options: ["Решается аналитически", "Воспроизводит поведение системы", "Упрощает систему", "Исключает случайности"],
    correctAnswer: 1,
    explanation: "Имитационная модель воспроизводит поведение системы."
  },
  {
    id: 44,
    question: "Аналитическая модель:",
    options: ["Требует вычислительных экспериментов", "Решается в замкнутом виде", "Использует случайные числа", "Моделирует случайности"],
    correctAnswer: 1,
    explanation: "Аналитическая модель решается в замкнутом виде."
  },
  {
    id: 45,
    question: "Численные методы применяются:",
    options: ["Для точного решения", "Для приближенного решения", "Только для простых задач", "Только для теоретических исследований"],
    correctAnswer: 1,
    explanation: "Численные методы дают приближенное решение."
  },
  {
    id: 46,
    question: "Дискретная модель оперирует:",
    options: ["Непрерывными величинами", "Дискретными величинами", "Только целыми числами", "Только действительными числами"],
    correctAnswer: 1,
    explanation: "Дискретная модель оперирует дискретными величинами."
  },
  {
    id: 47,
    question: "Непрерывная модель использует:",
    options: ["Дискретные переменные", "Непрерывные переменные", "Только логические переменные", "Только символьные переменные"],
    correctAnswer: 1,
    explanation: "Непрерывная модель использует непрерывные переменные."
  },
  {
    id: 48,
    question: "Параметрическая модель содержит:",
    options: ["Неизвестные структуры", "Параметры, подлежащие определению", "Только константы", "Только переменные"],
    correctAnswer: 1,
    explanation: "Параметрическая модель содержит параметры, подлежащие определению."
  },
  {
    id: 49,
    question: "Непараметрическая модель:",
    options: ["Содержит много параметров", "Не предполагает конкретной параметрической формы", "Использует только линейные параметры", "Исключает все параметры"],
    correctAnswer: 1,
    explanation: "Непараметрическая модель не предполагает конкретной параметрической формы."
  },
  {
    id: 50,
    question: "Идентификация модели — это:",
    options: ["Построение модели", "Определение параметров модели", "Проверка модели", "Применение модели"],
    correctAnswer: 1,
    explanation: "Идентификация модели — это определение её параметров."
  },
  
  // Графические модели (51-65)
  {
    id: 51,
    question: "Граф состоит из:",
    options: ["Только вершин", "Вершин и рёбер", "Только рёбер", "Узлов и связей"],
    correctAnswer: 1,
    explanation: "Граф состоит из вершин и рёбер."
  },
  {
    id: 52,
    question: "Ориентированный граф характеризуется:",
    options: ["Неопределенным направлением рёбер", "Направленными рёбрами", "Отсутствием рёбер", "Циклическими рёбрами"],
    correctAnswer: 1,
    explanation: "Ориентированный граф имеет направленные рёбра."
  },
  {
    id: 53,
    question: "Неориентированный граф имеет:",
    options: ["Направленные рёбра", "Ненаправленные рёбра", "Только петли", "Взвешенные рёбра"],
    correctAnswer: 1,
    explanation: "Неориентированный граф имеет ненаправленные рёбра."
  },
  {
    id: 54,
    question: "Взвешенный граф содержит:",
    options: ["Только вершины", "Рёбра с весами", "Много рёбер", "Мало вершин"],
    correctAnswer: 1,
    explanation: "Взвешенный граф содержит рёбра с весами."
  },
  {
    id: 55,
    question: "Дерево — это граф:",
    options: ["С циклами", "Связный без циклов", "Несвязный", "Полный"],
    correctAnswer: 1,
    explanation: "Дерево — это связный граф без циклов."
  },
  {
    id: 56,
    question: "Корень дерева — это:",
    options: ["Любая вершина", "Выделенная начальная вершина", "Последняя вершина", "Средняя вершина"],
    correctAnswer: 1,
    explanation: "Корень дерева — это выделенная начальная вершина."
  },
  {
    id: 57,
    question: "Лист дерева — это вершина:",
    options: ["С максимальной степенью", "Степени 1", "В центре дерева", "Любая вершина"],
    correctAnswer: 1,
    explanation: "Лист дерева — это вершина степени 1."
  },
  {
    id: 58,
    question: "Сетевая модель представляет:",
    options: ["Линейную последовательность", "Множество взаимосвязанных элементов", "Иерархическую структуру", "Табличные данные"],
    correctAnswer: 1,
    explanation: "Сетевая модель представляет множество взаимосвязанных элементов."
  },
  {
    id: 59,
    question: "Матрица смежности описывает:",
    options: ["Веса рёбер", "Связи между вершинами", "Координаты вершин", "Цвета вершин"],
    correctAnswer: 1,
    explanation: "Матрица смежности описывает связи между вершинами."
  },
  {
    id: 60,
    question: "Список смежности содержит:",
    options: ["Матрицу", "Для каждой вершины список соседних вершин", "Только веса", "Только координаты"],
    correctAnswer: 1,
    explanation: "Список смежности содержит для каждой вершины список соседних."
  },
  {
    id: 61,
    question: "Кратчайший путь в графе — это путь:",
    options: ["С максимальным весом", "С минимальным весом", "С максимальным числом рёбер", "Любой путь"],
    correctAnswer: 1,
    explanation: "Кратчайший путь имеет минимальный вес."
  },
  {
    id: 62,
    question: "Алгоритм Дейкстры находит:",
    options: ["Максимальный поток", "Кратчайшие пути", "Остовное дерево", "Циклы в графе"],
    correctAnswer: 1,
    explanation: "Алгоритм Дейкстры находит кратчайшие пути."
  },
  {
    id: 63,
    question: "Эйлеров путь проходит:",
    options: ["Через все вершины один раз", "По каждому ребру один раз", "По любому маршруту", "Только по части графа"],
    correctAnswer: 1,
    explanation: "Эйлеров путь проходит по каждому ребру один раз."
  },
  {
    id: 64,
    question: "Гамильтонов путь проходит:",
    options: ["По каждому ребру один раз", "Через каждую вершину один раз", "По циклическому маршруту", "Только по части вершин"],
    correctAnswer: 1,
    explanation: "Гамильтонов путь проходит через каждую вершину один раз."
  },
  {
    id: 65,
    question: "Планарный граф можно:",
    options: ["Нарисовать только в пространстве", "Нарисовать на плоскости без пересечений рёбер", "Нарисовать только с пересечениями", "Невозможно нарисовать"],
    correctAnswer: 1,
    explanation: "Планарный граф можно нарисовать на плоскости без пересечений рёбер."
  },
  
  // Логические модели (66-80)
  {
    id: 66,
    question: "Логическая модель основана на:",
    options: ["Числовых данных", "Логических отношениях", "Графических элементах", "Статистических данных"],
    correctAnswer: 1,
    explanation: "Логическая модель основана на логических отношениях."
  },
  {
    id: 67,
    question: "Булева алгебра оперирует:",
    options: ["Действительными числами", "Логическими значениями", "Комплексными числами", "Символьными данными"],
    correctAnswer: 1,
    explanation: "Булева алгебра оперирует логическими значениями."
  },
  {
    id: 68,
    question: "Основные операции булевой алгебры:",
    options: ["Сложение и вычитание", "И, ИЛИ, НЕ", "Умножение и деление", "Интегрирование и дифференцирование"],
    correctAnswer: 1,
    explanation: "Основные булевы операции: И, ИЛИ, НЕ."
  },
  {
    id: 69,
    question: "Таблица истинности показывает:",
    options: ["Числовые значения", "Значения логической функции", "Графические зависимости", "Статистические данные"],
    correctAnswer: 1,
    explanation: "Таблица истинности показывает значения логической функции."
  },
  {
    id: 70,
    question: "Конъюнкция (И) истинна когда:",
    options: ["Хотя бы один операнд истинен", "Все операнды истинны", "Все операнды ложны", "Операнды различны"],
    correctAnswer: 1,
    explanation: "Конъюнкция истинна, когда все операнды истинны."
  },
  {
    id: 71,
    question: "Дизъюнкция (ИЛИ) истинна когда:",
    options: ["Все операнды ложны", "Хотя бы один операнд истинен", "Все операнды истинны", "Операнды равны"],
    correctAnswer: 1,
    explanation: "Дизъюнкция истинна, когда хотя бы один операнд истинен."
  },
  {
    id: 72,
    question: "Отрицание (НЕ) меняет:",
    options: ["Ничего", "Логическое значение на противоположное", "Только истинное на ложное", "Только ложное на истинное"],
    correctAnswer: 1,
    explanation: "Отрицание меняет логическое значение на противоположное."
  },
  {
    id: 73,
    question: "Импликация A→B ложна когда:",
    options: ["A ложно, B истинно", "A истинно, B ложно", "A и B истинны", "A и B ложны"],
    correctAnswer: 1,
    explanation: "Импликация ложна, когда A истинно, а B ложно."
  },
  {
    id: 74,
    question: "Эквиваленция A↔B истинна когда:",
    options: ["A и B различны", "A и B имеют одинаковые значения", "A истинно", "B ложно"],
    correctAnswer: 1,
    explanation: "Эквиваленция истинна, когда A и B имеют одинаковые значения."
  },
  {
    id: 75,
    question: "Закон де Моргана утверждает:",
    options: ["Коммутативность операций", "НЕ(A И B) = (НЕ A) ИЛИ (НЕ B)", "Ассоциативность операций", "Дистрибутивность операций"],
    correctAnswer: 1,
    explanation: "Закон де Моргана: НЕ(A И B) = (НЕ A) ИЛИ (НЕ B)."
  },
  {
    id: 76,
    question: "Тавтология — это формула:",
    options: ["Всегда ложная", "Всегда истинная", "Иногда истинная", "Неопределенная"],
    correctAnswer: 1,
    explanation: "Тавтология — это всегда истинная формула."
  },
  {
    id: 77,
    question: "Противоречие — это формула:",
    options: ["Всегда истинная", "Всегда ложная", "Иногда ложная", "Неопределенная"],
    correctAnswer: 1,
    explanation: "Противоречие — это всегда ложная формула."
  },
  {
    id: 78,
    question: "ДНФ (дизъюнктивная нормальная форма) — это:",
    options: ["Произведение сумм", "Сумма произведений", "Логическая функция", "Таблица истинности"],
    correctAnswer: 1,
    explanation: "ДНФ — это сумма произведений."
  },
  {
    id: 79,
    question: "КНФ (конъюнктивная нормальная форма) — это:",
    options: ["Сумма произведений", "Произведение сумм", "Логическая функция", "Таблица истинности"],
    correctAnswer: 1,
    explanation: "КНФ — это произведение сумм."
  },
  {
    id: 80,
    question: "Карты Карно используются для:",
    options: ["Построения таблиц истинности", "Минимизации логических функций", "Проверки тавтологий", "Построения графов"],
    correctAnswer: 1,
    explanation: "Карты Карно используются для минимизации логических функций."
  },
  
  // Информационные модели данных (81-100)
  {
    id: 81,
    question: "Реляционная модель данных основана на:",
    options: ["Графах", "Таблицах", "Деревьях", "Списках"],
    correctAnswer: 1,
    explanation: "Реляционная модель основана на таблицах."
  },
  {
    id: 82,
    question: "Отношение в реляционной модели — это:",
    options: ["Связь между таблицами", "Таблица", "Столбец", "Строка"],
    correctAnswer: 1,
    explanation: "Отношение в реляционной модели — это таблица."
  },
  {
    id: 83,
    question: "Кортеж в реляционной модели — это:",
    options: ["Столбец", "Строка таблицы", "Вся таблица", "Связь"],
    correctAnswer: 1,
    explanation: "Кортеж — это строка таблицы."
  },
  {
    id: 84,
    question: "Атрибут в реляционной модели — это:",
    options: ["Строка", "Столбец таблицы", "Вся таблица", "Связь"],
    correctAnswer: 1,
    explanation: "Атрибут — это столбец таблицы."
  },
  {
    id: 85,
    question: "Домен атрибута — это:",
    options: ["Название атрибута", "Множество допустимых значений", "Тип данных", "Размер поля"],
    correctAnswer: 1,
    explanation: "Домен — это множество допустимых значений атрибута."
  },
  {
    id: 86,
    question: "Первичный ключ:",
    options: ["Может повторяться", "Однозначно идентифицирует кортеж", "Может быть пустым", "Не обязателен"],
    correctAnswer: 1,
    explanation: "Первичный ключ однозначно идентифицирует кортеж."
  },
  {
    id: 87,
    question: "Внешний ключ:",
    options: ["Не связан с другими таблицами", "Ссылается на первичный ключ другой таблицы", "Всегда уникален", "Не может быть пустым"],
    correctAnswer: 1,
    explanation: "Внешний ключ ссылается на первичный ключ другой таблицы."
  },
  {
    id: 88,
    question: "Нормализация базы данных служит для:",
    options: ["Увеличения размера", "Устранения избыточности", "Усложнения структуры", "Замедления работы"],
    correctAnswer: 1,
    explanation: "Нормализация служит для устранения избыточности."
  },
  {
    id: 89,
    question: "Первая нормальная форма требует:",
    options: ["Составных атрибутов", "Атомарности атрибутов", "Множественных значений", "Вложенных таблиц"],
    correctAnswer: 1,
    explanation: "Первая НФ требует атомарности атрибутов."
  },
  {
    id: 90,
    question: "Вторая нормальная форма исключает:",
    options: ["Транзитивные зависимости", "Частичные зависимости от ключа", "Все зависимости", "Функциональные зависимости"],
    correctAnswer: 1,
    explanation: "Вторая НФ исключает частичные зависимости от ключа."
  },
  {
    id: 91,
    question: "Третья нормальная форма исключает:",
    options: ["Частичные зависимости", "Транзитивные зависимости", "Все зависимости", "Ключевые зависимости"],
    correctAnswer: 1,
    explanation: "Третья НФ исключает транзитивные зависимости."
  },
  {
    id: 92,
    question: "SQL расшифровывается как:",
    options: ["Simple Query Language", "Structured Query Language", "Standard Query Language", "System Query Language"],
    correctAnswer: 1,
    explanation: "SQL — Structured Query Language."
  },
  {
    id: 93,
    question: "Команда SELECT используется для:",
    options: ["Добавления данных", "Извлечения данных", "Удаления данных", "Изменения структуры"],
    correctAnswer: 1,
    explanation: "SELECT используется для извлечения данных."
  },
  {
    id: 94,
    question: "Команда INSERT используется для:",
    options: ["Извлечения данных", "Добавления данных", "Удаления данных", "Изменения данных"],
    correctAnswer: 1,
    explanation: "INSERT используется для добавления данных."
  },
  {
    id: 95,
    question: "Команда UPDATE используется для:",
    options: ["Добавления данных", "Изменения данных", "Удаления данных", "Создания таблиц"],
    correctAnswer: 1,
    explanation: "UPDATE используется для изменения данных."
  },
  {
    id: 96,
    question: "Команда DELETE используется для:",
    options: ["Добавления данных", "Удаления данных", "Изменения данных", "Создания таблиц"],
    correctAnswer: 1,
    explanation: "DELETE используется для удаления данных."
  },
  {
    id: 97,
    question: "JOIN в SQL служит для:",
    options: ["Сортировки данных", "Соединения таблиц", "Группировки данных", "Фильтрации данных"],
    correctAnswer: 1,
    explanation: "JOIN служит для соединения таблиц."
  },
  {
    id: 98,
    question: "WHERE в SQL используется для:",
    options: ["Сортировки", "Условной выборки", "Группировки", "Соединения"],
    correctAnswer: 1,
    explanation: "WHERE используется для условной выборки."
  },
  {
    id: 99,
    question: "ORDER BY в SQL служит для:",
    options: ["Фильтрации", "Сортировки результатов", "Группировки", "Соединения"],
    correctAnswer: 1,
    explanation: "ORDER BY служит для сортировки результатов."
  },
  {
    id: 100,
    question: "GROUP BY в SQL используется для:",
    options: ["Сортировки", "Группировки данных", "Фильтрации", "Соединения"],
    correctAnswer: 1,
    explanation: "GROUP BY используется для группировки данных."
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

  const handlePrevQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowResult(false);
    setSelectedAnswer(null);
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
    const percentage = (score / answeredQuestions.filter(Boolean).length) * 100;
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
          <p className="text-lg text-gray-600">Информационное моделирование • 100 вопросов</p>
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

            {/* Navigation */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Навигация по вопросам</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                    >
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => jumpToQuestion(index)}
                      className={`h-8 text-xs rounded transition-colors ${
                        index === currentQuestionIndex
                          ? 'bg-blue-600 text-white'
                          : !answeredQuestions[index]
                          ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          : userAnswers[index] === questions[index].correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {!isComplete ? (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
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
                      <>
                        <Button 
                          variant="outline"
                          onClick={handlePrevQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          <Icon name="ChevronLeft" size={16} className="mr-2" />
                          Назад
                        </Button>
                        <Button 
                          onClick={handleNextQuestion}
                          disabled={currentQuestionIndex === questions.length - 1}
                          className="flex-1"
                        >
                          Следующий вопрос
                          <Icon name="ChevronRight" size={16} className="ml-2" />
                        </Button>
                      </>
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
                  
                  <div className="grid grid-cols-10 gap-2 mt-6">
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

            {/* Детализированная статистика по темам */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="PieChart" size={20} />
                  Статистика по темам
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium">Основы моделирования (1-20)</span>
                    <Badge variant="outline">
                      {userAnswers.slice(0, 20).filter((answer, i) => answer === questions[i].correctAnswer).length}/20
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">Системный анализ (21-30)</span>
                    <Badge variant="outline">
                      {userAnswers.slice(20, 30).filter((answer, i) => answer === questions[i + 20].correctAnswer).length}/10
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-medium">Математические модели (31-50)</span>
                    <Badge variant="outline">
                      {userAnswers.slice(30, 50).filter((answer, i) => answer === questions[i + 30].correctAnswer).length}/20
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span className="font-medium">Графические модели (51-65)</span>
                    <Badge variant="outline">
                      {userAnswers.slice(50, 65).filter((answer, i) => answer === questions[i + 50].correctAnswer).length}/15
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="font-medium">Логические модели (66-80)</span>
                    <Badge variant="outline">
                      {userAnswers.slice(65, 80).filter((answer, i) => answer === questions[i + 65].correctAnswer).length}/15
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded">
                    <span className="font-medium">Модели данных (81-100)</span>
                    <Badge variant="outline">
                      {userAnswers.slice(80, 100).filter((answer, i) => answer === questions[i + 80].correctAnswer).length}/20
                    </Badge>
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Database" size={20} />
                    Структуры данных
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-semibold text-purple-900 mb-2">Графы:</h5>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Вершины и рёбра</li>
                        <li>• Алгоритмы поиска</li>
                        <li>• Кратчайшие пути</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h5 className="font-semibold text-yellow-900 mb-2">Деревья:</h5>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Иерархические структуры</li>
                        <li>• Корень, узлы, листья</li>
                        <li>• Обходы дерева</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h5 className="font-semibold text-red-900 mb-2">Таблицы:</h5>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>• Реляционная модель</li>
                        <li>• Ключи и связи</li>
                        <li>• Нормализация</li>
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