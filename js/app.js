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
	
	var continueButton = answerPanel.find($('#continue_button'));
	var newGameButton = answerPanel.find($('#new_game_button'));

	/************************
	*	 FUNCTIONS
	************************/
	
	// move the given panel to the middle of the screen if focused = true
	// otherwise move it off of the screen.
	var setPanelFocus = function setPanelFocus(panel, focused) {
		if (focused) {
			panel.removeClass('next_panel');
			panel.addClass('current_panel');
		}
		else {
			panel.removeClass('current_panel');
			panel.addClass('next_panel');
		}
	};
	
	var updateScore = function updateScore() {
		$('#score').text("Score: " + numCorrectAnswers + " / " + questionNum);
	};
	
	// a quiz choice was selected. submit the choice to see if it was right.
	var submitChoice = function submitChoice() {
		// check which quiz choice element was clicked.
		var choiceIndex = $(this).index();
		console.log("Choice index: " + choiceIndex);
		
		var answeredCorrectly = (choiceIndex == quizQuestions[questionNum-1].getAnswerIndex());
		if (answeredCorrectly) {
			numCorrectAnswers++;	
		}
		updateScore();
		
		questionPanelQuizText.hide();
		
		populateAnswerPanel(answeredCorrectly, quizQuestions[questionNum-1]);
		answerPanelQuizText.show();
		continueButton.show();
		
		setPanelFocus(questionPanel, false);
		setPanelFocus(answerPanel, true);
	}
	
	// Either go to the next question, or show a game over message
	var continueQuiz = function continueQuiz() {
		if (questionNum < quizQuestions.length) {
			// Quiz is still going, show the next question
			questionNum++;
			
			answerPanelQuizText.hide();
			continueButton.hide();
			
			populateQuestionPanel(questionNum, quizQuestions[questionNum-1]);
			questionPanelQuizText.show();
			
			setPanelFocus(answerPanel, false);
			setPanelFocus(questionPanel, true);		
		}
		else {
			// no more questions, show game over message
			answerPanelQuizText.find('#result').text("GAME OVER");
			answerPanelQuizText.find('#extra_info').text("Score: " + numCorrectAnswers + " out of " + quizQuestions.length);
			
			continueButton.hide();
			newGameButton.show();
		}
	};
	
	// Fill in all the text for the next question on the question panel
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
		
		// remove the choices from the previous question, then create all new list items.
		// this allows different questions to have different number of choices
		var choiceListElement = questionPanelQuizText.find('#choice_list');
		choiceListElement.children().remove();
		
		var choices = questionObject.getChoices();
		for (var i = 0; i < choices.length; i++) {
			$('<li></li>')
				.addClass('quiz_choice')
				.text(choices[i])
				.appendTo(choiceListElement)
				.click(submitChoice);
		}
	};
	
	// Fill in text on answer panel depending on whether question was answered correctly
	var populateAnswerPanel = function populateAnswerPanel(answeredCorrectly, questionObject) {
		var result = answeredCorrectly ? "CORRECT!" : "INCORRECT!";
		answerPanelQuizText.find('#result').text(result);
		
		var extraInfo = questionObject.getExtraInfo();
		answerPanelQuizText.find('#extra_info').text(extraInfo);
	};	
	
	
	var resetQuiz = function resetQuiz() {
		// reset visuals
		questionPanelQuizText.hide();
		setPanelFocus(questionPanel, true);
				
		answerPanelQuizText.hide();
		continueButton.hide();
		newGameButton.hide();
		setPanelFocus(answerPanel, false);
		
		// reset game data
		questionNum = 0;
		numCorrectAnswers = 0;
		
		updateScore();
	};
	
	// start new game
	var startQuiz = function startQuiz() {
		questionNum = 1;
		populateQuestionPanel(questionNum, quizQuestions[questionNum-1]);		
		questionPanelQuizText.show();
	};
	
		
	/************************
	*	EVENT HANDLERS
	************************/
	
	continueButton.click(continueQuiz);
	
	newGameButton.click(function() {
		resetQuiz();
		startQuiz();
	});
	
	/************************
	*	START 
	************************/
	
	resetQuiz();
	startQuiz();
});