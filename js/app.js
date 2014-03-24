$(document).ready(function () {
	/************************
	*	CONSTANTS
	************************/
	
	
	/************************
	*	GAME VARIABLES
	************************/
	
	var questionNum = 0;
	var numCorrectAnswers = 0;
	
	var questionPanel = $('#question_panel');
	var answerPanel = $('#answer_panel');
	
	var questionPanelQuizText = questionPanel.find($('.quiz_text'))
	var answerPanelQuizText = answerPanel.find($('.quiz_text'))

	/************************
	*	QUIZ QUESTIONS
	************************/
	
	var quizQuestions = [];
	
	quizQuestions.push(new quizQuestion(
		"Who was the inventor of the game of basketball?",
		[
			"James Naismith",
			"Larry O'Brien",
			"John Wooden",
			"David Stern"
		],
		0,
		"James Naismith, a Canadian-American sports coach and innovator, invented the sport of basketball in 1891."
	));
	
	quizQuestions.push(new quizQuestion(
		"What is the record for the most points scored by a single player in an NBA game?",
		[
			"81 points",
			"90 points",
			"100 points",
			"103 points"
		],
		2,
		"As a member of the Philadelphia Warriors, Wilt Chamberlain scored 100 points against the New York Knicks on March 2, 1962."
	));
	
	quizQuestions.push(new quizQuestion(
		"In what year did the NBA merge with the American Basketball Association (ABA)?",
		[
			"1966",
			"1969",
			"1972",
			"1976"
		],
		3,
		"The NBA and ABA merged in 1976. This added 4 new teams to the NBA: Denver Nuggets, Indiana Pacers, New Jersey Nets, and San Antonio Spurs."
	));


	

		
	/************************
		HELPER FUNCTIONS
	************************/
	
	// Fill in all the text of the next question on the question panel
	var populateQuestionPanel = function populateQuestionPanel(questionNum, questionObject) {
		
		questionPanelQuizText.find('#question_number').text(questionNum + ". ");

		// changing the text in the text node without destroying the span is a little harder
		// first get all text nodes in the #question_text paragraph element
		var textNodes = questionPanelQuizText.find('#question_text').contents().filter(function() {
			return this.nodeType == Node.TEXT_NODE;
		});
		// for some reason there are 2 text nodes. We only want the 2nd one.
		var textNode = textNodes.get(1);
		textNode.nodeValue = questionObject.getQuestion();
		
		// clear the choices from the previous question
		var choiceListElement = questionPanelQuizText.find('#choice_list');
		choiceListElement.children().remove();
		
		var choices = questionObject.getChoices();
		for (var i = 0; i < choices.length; i++) {
			$('<li></li>')
				.addClass('quiz_choice')
				.text(choices[i])
				.appendTo(choiceListElement);
		}
	};
	
	// reset game
	var resetQuiz = function resetQuiz() {
		// reset visuals
		questionPanelQuizText.hide();
		questionPanel.removeClass('next_panel');
		questionPanel.addClass('this_panel');
				
		answerPanelQuizText.hide();
		answerPanel.removeClass('this_panel');
		answerPanel.addClass('next_panel');
		
		// reset game data
		questionNum = 0;
		numCorrectAnswers = 0;
	};
	
	// start new game
	var startQuiz = function startQuiz() {
		questionNum = 1;
		populateQuestionPanel(questionNum, quizQuestions[questionNum-1]);
		
		//questionPanelQuizText.fadeIn(2000);
		questionPanelQuizText.show();
		
	};
		
		
	/************************
		EVENT HANDLERS
	************************/
	
	$('.quiz_choice').click(function() {
		var choiceIndex = this.index();
	});
	
	/************************
	*	START 
	************************/
	

	// populateQuestionPanel(0, quizQuestions[0
	// resetQuiz();
	startQuiz();
});