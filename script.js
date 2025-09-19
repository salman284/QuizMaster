// Quiz Application JavaScript
class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timer = null;
        this.timeLeft = 30;
        this.settings = {
            numQuestions: 10,
            difficulty: '',
            category: '',
            timePerQuestion: 30
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('start-screen');
    }

    bindEvents() {
        // Start screen events
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        
        // Enhanced dropdown interactions
        this.enhanceDropdowns();
        
        // Quiz screen events
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectAnswer(e));
        });
        
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        
        // Results screen events
        document.getElementById('restart-btn').addEventListener('click', () => this.restartQuiz());
        document.getElementById('review-btn').addEventListener('click', () => this.showReview());
        
        // Review screen events
        document.getElementById('back-to-results').addEventListener('click', () => this.showScreen('results-screen'));
    }

    enhanceDropdowns() {
        const selects = document.querySelectorAll('.setting-group select');
        
        selects.forEach(select => {
            // Add change event listener for visual feedback
            select.addEventListener('change', (e) => {
                e.target.setAttribute('data-selected', 'true');
                
                // Add a subtle success animation
                e.target.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 200);
            });
            
            // Add focus/blur events for better UX
            select.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            select.addEventListener('blur', (e) => {
                e.target.parentElement.classList.remove('focused');
            });
            
            // Add keyboard navigation enhancement
            select.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.target.click();
                }
            });
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    async startQuiz() {
        // Get settings
        this.settings.numQuestions = parseInt(document.getElementById('num-questions').value);
        this.settings.difficulty = document.getElementById('difficulty').value;
        this.settings.category = document.getElementById('category').value;
        this.settings.timePerQuestion = parseInt(document.getElementById('time-per-question').value);
        
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        
        // Show loading screen
        this.showScreen('loading-screen');
        
        try {
            // Fetch questions from API
            await this.fetchQuestions();
            
            // Start the quiz
            this.showScreen('quiz-screen');
            this.displayQuestion();
            this.startTimer();
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Fall back to local questions
            this.generateLocalQuestions();
            this.showScreen('quiz-screen');
            this.displayQuestion();
            this.startTimer();
        }
    }

    async fetchQuestions() {
        const baseUrl = 'https://opentdb.com/api.php';
        let url = `${baseUrl}?amount=${this.settings.numQuestions}&type=multiple`;
        
        if (this.settings.difficulty) {
            url += `&difficulty=${this.settings.difficulty}`;
        }
        
        if (this.settings.category) {
            url += `&category=${this.settings.category}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response_code === 0) {
            this.questions = data.results.map(q => ({
                question: this.decodeHtml(q.question),
                correctAnswer: this.decodeHtml(q.correct_answer),
                incorrectAnswers: q.incorrect_answers.map(ans => this.decodeHtml(ans)),
                category: this.decodeHtml(q.category),
                difficulty: q.difficulty,
                allAnswers: this.shuffleArray([
                    this.decodeHtml(q.correct_answer),
                    ...q.incorrect_answers.map(ans => this.decodeHtml(ans))
                ])
            }));
        } else {
            throw new Error('API returned error code: ' + data.response_code);
        }
    }

    generateLocalQuestions() {
        const localQuestions = [
            {
                question: "What is the capital of France?",
                correctAnswer: "Paris",
                incorrectAnswers: ["London", "Berlin", "Madrid"],
                category: "Geography",
                difficulty: "easy"
            },
            {
                question: "Which planet is known as the Red Planet?",
                correctAnswer: "Mars",
                incorrectAnswers: ["Venus", "Jupiter", "Saturn"],
                category: "Science",
                difficulty: "easy"
            },
            {
                question: "What is 2 + 2?",
                correctAnswer: "4",
                incorrectAnswers: ["3", "5", "6"],
                category: "Mathematics",
                difficulty: "easy"
            },
            {
                question: "Who painted the Mona Lisa?",
                correctAnswer: "Leonardo da Vinci",
                incorrectAnswers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
                category: "Art",
                difficulty: "medium"
            },
            {
                question: "What is the largest mammal in the world?",
                correctAnswer: "Blue Whale",
                incorrectAnswers: ["African Elephant", "Giraffe", "Hippopotamus"],
                category: "Science",
                difficulty: "easy"
            },
            {
                question: "In which year did World War II end?",
                correctAnswer: "1945",
                incorrectAnswers: ["1944", "1946", "1943"],
                category: "History",
                difficulty: "medium"
            },
            {
                question: "What is the chemical symbol for gold?",
                correctAnswer: "Au",
                incorrectAnswers: ["Go", "Gd", "Ag"],
                category: "Science",
                difficulty: "medium"
            },
            {
                question: "Which programming language is known for 'write once, run anywhere'?",
                correctAnswer: "Java",
                incorrectAnswers: ["Python", "C++", "JavaScript"],
                category: "Technology",
                difficulty: "medium"
            },
            {
                question: "What is the smallest country in the world?",
                correctAnswer: "Vatican City",
                incorrectAnswers: ["Monaco", "San Marino", "Liechtenstein"],
                category: "Geography",
                difficulty: "hard"
            },
            {
                question: "Who wrote the novel '1984'?",
                correctAnswer: "George Orwell",
                incorrectAnswers: ["Aldous Huxley", "Ray Bradbury", "Kurt Vonnegut"],
                category: "Literature",
                difficulty: "medium"
            }
        ];

        // Shuffle and take required number of questions
        const shuffled = this.shuffleArray([...localQuestions]);
        this.questions = shuffled.slice(0, this.settings.numQuestions).map(q => ({
            ...q,
            allAnswers: this.shuffleArray([q.correctAnswer, ...q.incorrectAnswers])
        }));
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('question-counter').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        
        // Update question
        document.getElementById('q-number').textContent = this.currentQuestionIndex + 1;
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('question-category').textContent = question.category;
        
        // Update difficulty badge
        const difficultyBadge = document.getElementById('question-difficulty');
        difficultyBadge.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
        difficultyBadge.className = `difficulty-badge ${question.difficulty}`;
        
        // Update answers
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, index) => {
            if (index < question.allAnswers.length) {
                btn.style.display = 'flex';
                btn.querySelector('.answer-text').textContent = question.allAnswers[index];
                btn.classList.remove('correct', 'incorrect', 'disabled');
                btn.disabled = false;
            } else {
                btn.style.display = 'none';
            }
        });
        
        // Hide next button and feedback
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('feedback-container').classList.remove('show');
        
        // Reset timer
        this.timeLeft = this.settings.timePerQuestion;
        this.updateTimerDisplay();
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 10) {
                document.querySelector('.timer-container').classList.add('warning');
            }
            
            if (this.timeLeft <= 0) {
                this.handleTimeOut();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        document.getElementById('timer').textContent = this.timeLeft;
    }

    handleTimeOut() {
        clearInterval(this.timer);
        document.querySelector('.timer-container').classList.remove('warning');
        
        // Record as skipped
        this.userAnswers.push({
            questionIndex: this.currentQuestionIndex,
            userAnswer: null,
            correctAnswer: this.questions[this.currentQuestionIndex].correctAnswer,
            isCorrect: false,
            timeOut: true
        });
        
        this.showFeedback(false, true);
    }

    selectAnswer(event) {
        clearInterval(this.timer);
        document.querySelector('.timer-container').classList.remove('warning');
        
        const selectedButton = event.currentTarget;
        const selectedAnswer = selectedButton.querySelector('.answer-text').textContent;
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedAnswer === question.correctAnswer;
        
        // Record answer
        this.userAnswers.push({
            questionIndex: this.currentQuestionIndex,
            userAnswer: selectedAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect: isCorrect,
            timeOut: false
        });
        
        if (isCorrect) {
            this.score++;
        }
        
        // Disable all buttons and show correct/incorrect styling
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
            
            const answerText = btn.querySelector('.answer-text').textContent;
            if (answerText === question.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn === selectedButton && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        this.showFeedback(isCorrect, false);
    }

    showFeedback(isCorrect, isTimeOut) {
        const feedbackContainer = document.getElementById('feedback-container');
        const feedbackIcon = feedbackContainer.querySelector('.feedback-icon');
        const feedbackTitle = document.getElementById('feedback-title');
        const feedbackMessage = document.getElementById('feedback-message');
        
        if (isTimeOut) {
            feedbackIcon.innerHTML = '<i class="fas fa-clock"></i>';
            feedbackIcon.className = 'feedback-icon incorrect';
            feedbackTitle.textContent = 'Time\'s Up!';
            feedbackMessage.textContent = `The correct answer was: ${this.questions[this.currentQuestionIndex].correctAnswer}`;
        } else if (isCorrect) {
            feedbackIcon.innerHTML = '<i class="fas fa-check"></i>';
            feedbackIcon.className = 'feedback-icon correct';
            feedbackTitle.textContent = 'Correct!';
            feedbackMessage.textContent = 'Great job! You got it right.';
        } else {
            feedbackIcon.innerHTML = '<i class="fas fa-times"></i>';
            feedbackIcon.className = 'feedback-icon incorrect';
            feedbackTitle.textContent = 'Incorrect!';
            feedbackMessage.textContent = `The correct answer was: ${this.questions[this.currentQuestionIndex].correctAnswer}`;
        }
        
        feedbackContainer.classList.add('show');
        
        // Show next button or finish quiz
        setTimeout(() => {
            feedbackContainer.classList.remove('show');
            
            if (this.currentQuestionIndex < this.questions.length - 1) {
                document.getElementById('next-btn').style.display = 'inline-flex';
            } else {
                this.finishQuiz();
            }
        }, 2000);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
        this.startTimer();
    }

    finishQuiz() {
        clearInterval(this.timer);
        this.showResults();
        this.showScreen('results-screen');
    }

    showResults() {
        const totalQuestions = this.questions.length;
        const correctAnswers = this.userAnswers.filter(answer => answer.isCorrect).length;
        const incorrectAnswers = this.userAnswers.filter(answer => !answer.isCorrect && !answer.timeOut).length;
        const skippedAnswers = this.userAnswers.filter(answer => answer.timeOut).length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Update score display
        document.getElementById('final-score').textContent = correctAnswers;
        document.getElementById('total-questions').textContent = totalQuestions;
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        
        // Update statistics
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('incorrect-answers').textContent = incorrectAnswers;
        document.getElementById('skipped-answers').textContent = skippedAnswers;
        
        // Update performance message
        const performanceTitle = document.getElementById('performance-title');
        const performanceDescription = document.getElementById('performance-description');
        
        if (percentage >= 90) {
            performanceTitle.textContent = 'Outstanding!';
            performanceDescription.textContent = 'You demonstrated exceptional knowledge! Keep up the excellent work.';
        } else if (percentage >= 80) {
            performanceTitle.textContent = 'Excellent!';
            performanceDescription.textContent = 'You have a strong grasp of the material. Well done!';
        } else if (percentage >= 70) {
            performanceTitle.textContent = 'Good Job!';
            performanceDescription.textContent = 'You performed well! A little more practice will make you even better.';
        } else if (percentage >= 60) {
            performanceTitle.textContent = 'Not Bad!';
            performanceDescription.textContent = 'You have a decent understanding. Keep studying to improve further.';
        } else {
            performanceTitle.textContent = 'Keep Trying!';
            performanceDescription.textContent = 'Don\'t worry! Practice makes perfect. Try again to improve your score.';
        }
    }

    showReview() {
        const reviewQuestions = document.getElementById('review-questions');
        reviewQuestions.innerHTML = '';
        
        this.userAnswers.forEach((answer, index) => {
            const question = this.questions[answer.questionIndex];
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-question';
            
            let statusClass = 'incorrect';
            let statusText = 'Incorrect';
            
            if (answer.timeOut) {
                statusClass = 'skipped';
                statusText = 'Time Out';
            } else if (answer.isCorrect) {
                statusClass = 'correct';
                statusText = 'Correct';
            }
            
            reviewDiv.innerHTML = `
                <div class="review-question-header">
                    <div class="review-question-number ${statusClass}">${index + 1}</div>
                    <h3>${question.question}</h3>
                </div>
                <div class="review-answers">
                    ${question.allAnswers.map(ans => {
                        let answerClass = 'neutral';
                        if (ans === question.correctAnswer) {
                            answerClass = 'correct';
                        } else if (ans === answer.userAnswer && !answer.isCorrect) {
                            answerClass = 'user-incorrect';
                        }
                        
                        return `
                            <div class="review-answer ${answerClass}">
                                <div class="review-answer-letter">${String.fromCharCode(65 + question.allAnswers.indexOf(ans))}</div>
                                <span>${ans}</span>
                                ${ans === question.correctAnswer ? '<i class="fas fa-check" style="margin-left: auto; color: #28a745;"></i>' : ''}
                                ${ans === answer.userAnswer && !answer.isCorrect ? '<i class="fas fa-times" style="margin-left: auto; color: #dc3545;"></i>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee; color: #666;">
                    <strong>Your Answer:</strong> ${answer.userAnswer || 'No answer (Time out)'}
                    <br><strong>Correct Answer:</strong> ${question.correctAnswer}
                    <br><strong>Result:</strong> ${statusText}
                </div>
            `;
            
            reviewQuestions.appendChild(reviewDiv);
        });
        
        this.showScreen('review-screen');
    }

    restartQuiz() {
        this.showScreen('start-screen');
    }

    // Utility functions
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
}

// Initialize the quiz app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});