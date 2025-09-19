# 🧠 Online Quiz Application

A modern, interactive quiz application built with vanilla HTML, CSS, and JavaScript. Features multiple-choice questions, timer functionality, instant feedback, and integration with the Open Trivia Database API.

## ✨ Features

### ✅ Core Features (All Implemented)
- **Start Quiz Interface**: User can easily start a quiz with customizable settings
- **Multiple-Choice Questions (MCQs)**: Clean, interactive answer selection
- **Timer System**: Configurable timer for each question (15-60 seconds)
- **Instant Feedback**: Immediate visual feedback for correct/wrong answers
- **Final Score Display**: Comprehensive results with performance analysis
- **Open Trivia DB API Integration**: Fetches random questions from various categories

### 🎯 Additional Features
- **Customizable Settings**: 
  - Number of questions (5, 10, 15, 20)
  - Difficulty levels (Easy, Medium, Hard)
  - Categories (General Knowledge, Science, History, etc.)
  - Timer duration per question
- **Progress Tracking**: Visual progress bar and question counter
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Review Mode**: Review all questions and answers after completion
- **Fallback Questions**: Local questions when API is unavailable
- **Performance Analysis**: Detailed breakdown of correct, incorrect, and timed-out answers

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API questions, optional)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start taking quizzes immediately!

### File Structure
```
Quiz/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling and animations
├── script.js       # Quiz logic and API integration
└── README.md       # This documentation
```

## 🎮 How to Use

1. **Start Screen**: 
   - Choose number of questions (5-20)
   - Select difficulty level
   - Pick a category
   - Set timer duration per question
   - Click "Start Quiz"

2. **During Quiz**:
   - Read the question carefully
   - Click on your answer choice
   - Get instant feedback
   - Watch the timer and progress bar
   - Continue to next question

3. **Results Screen**:
   - View your final score and percentage
   - See breakdown of correct/incorrect/timed-out answers
   - Get performance feedback
   - Choose to review answers or start a new quiz

4. **Review Mode**:
   - See all questions with your answers
   - Identify correct answers
   - Learn from mistakes

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic structure with accessibility in mind
- **CSS3**: Modern styling with flexbox, grid, and animations
- **Vanilla JavaScript**: Clean, object-oriented code with ES6+ features
- **Open Trivia Database API**: Free trivia questions

### Key Features Implementation
- **Timer System**: JavaScript intervals with visual countdown
- **API Integration**: Fetch API with error handling and fallback
- **State Management**: Class-based architecture for clean code organization
- **Responsive Design**: CSS Grid and Flexbox for all screen sizes
- **Animations**: Smooth transitions and feedback animations

### API Details
The app uses the Open Trivia Database (https://opentdb.com/) which provides:
- Free access to thousands of questions
- Multiple categories and difficulty levels
- No API key required
- Fallback to local questions if API is unavailable

## 🎨 Design Features

- **Modern UI**: Clean, minimalist design with gradient backgrounds
- **Visual Feedback**: Color-coded answers and animated feedback
- **Progress Indicators**: Progress bar and question counter
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🔄 Future Enhancements

Potential features that could be added:
- User accounts and score tracking
- Leaderboards
- Custom quiz creation
- More question types (True/False, Fill-in-the-blank)
- Social sharing of results
- Offline mode with more local questions

## 🐛 Troubleshooting

### Common Issues
1. **API Questions Not Loading**: The app will automatically fall back to local questions
2. **Timer Issues**: Refresh the page if timer doesn't start properly
3. **Mobile Display**: Ensure you're using a modern mobile browser

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Mobile Optimization

The application is fully responsive and optimized for:
- Smartphones (portrait and landscape)
- Tablets
- Desktop computers
- Large displays

## 🎯 Performance

- **Fast Loading**: Minimal dependencies, optimized assets
- **Smooth Animations**: CSS-based animations for better performance
- **Efficient API Usage**: Smart question fetching and caching
- **Memory Management**: Proper cleanup of timers and event listeners

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Enjoy your quiz experience! 🎉**