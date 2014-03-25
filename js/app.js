$(document).ready(function () {
	
	/************************
	*	QUIZ QUESTIONS
	************************/
		
	var quizQuestions = [];

	quizQuestions.push(new quizQuestion(
		"Who invented the game of basketball?",
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
		"The NBA and ABA merged in 1976. This added 4 new teams to the NBA: the Denver Nuggets, Indiana Pacers, New Jersey Nets, and San Antonio Spurs."
	));

	quizQuestions.push(new quizQuestion(
		"Which NBA team has won the most championships?",
		[
			"Los Angeles Lakers",
			"Chicago Bulls",
			"San Antonio Spurs",
			"Boston Celtics"
		],
		3,
		"The Boston Celtics have won 17 championships, the most of any team in the NBA. From 1959-1966 they won 8 in a row!"
	));

	/************************
	*	GAME VARIABLES
	************************/
	
	var questionNum = 0;
	var numCorrectAnswers = 0;
	
	/************************
	*	DOM ELEMENTS
	************************/
	
	var questionPanel = $('#question_panel');
	var answerPanel = $('#answer_panel');
	
	var questionPanelQuizText = questionPanel.find($('.quiz_text'))
	var answerPanelQuizText = answerPanel.find($('.quiz_text'))
	
	var continueButton = answerPanel.find($('#continue_button'));
	var newGameButton = answerPanel.find($('#new_game_button'));

	/************************
	*	 FUNCTIONS
	************************/
	
	var stopSounds = function stopSounds() {
		$('audio').each(function(index, element) {
			element.pause();
		});		
	};
	
	var playSound = function playSound(soundName) {
		//stop all other sounds that are playing so they don't overlap
		stopSounds();
		
		var soundElement = $('#' + soundName + '_sound')[0];
		soundElement.load();
		soundElement.play();
	};
	
	// move the given panel to the middle of the screen if focused = true
	// otherwise move it off of the screen.
	var rollPanel = function rollPanel(panel, answeredCorrectly) {
		if (panel.hasClass('offscreen_left_panel')) {
			playSound('dribbling');
			panel.addClass('spinning', 0);
			panel.switchClass('offscreen_left_panel', 'onscreen_panel', 1500, function() {
				panel.removeClass('spinning', 0);
				panel.find('.quiz_text').show('puff');
				// if the panel rolling onscreen is the answer panel, play the appropriate sound for right/wrong answer
				if (panel == answerPanel) {
					panel.find('#continue_button').show('puff');
					if (answeredCorrectly) {
						playSound('swish');
					}
					else {
						playSound('miss_shot');
					}
					updateScore();
				}
				else {
					stopSounds();
				}
			});
		}
		else if (panel.hasClass('onscreen_panel')) {
			if (panel == answerPanel) {
				panel.find('#continue_button').hide('puff');
			}
			panel.find('.quiz_text').hide('puff');
			panel.addClass('spinning', 0);
			panel.switchClass('onscreen_panel', 'offscreen_right_panel', 1500, function() {
				panel.removeClass('spinning', 0);
				// after animation, invisibly move the panel off the left side of the screen
				// so it will be prepared to roll on-screen next time.
				panel.removeClass('offscreen_right_panel', 0);
				panel.addClass('offscreen_left_panel', 0);
			});
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
		
		populateAnswerPanel(answeredCorrectly, quizQuestions[questionNum-1]);
		
		rollPanel(questionPanel);
		rollPanel(answerPanel, answeredCorrectly);
	}
	
	// Either go to the next question, or show a game over message
	var continueQuiz = function continueQuiz() {
		if (questionNum < quizQuestions.length) {
			// Quiz is still going, show the next question
			questionNum++;
			
			populateQuestionPanel(questionNum, quizQuestions[questionNum-1]);
			
			rollPanel(answerPanel);
			rollPanel(questionPanel);
		}
		else {
			// no more questions, show game over message
			continueButton.hide('puff');
			answerPanelQuizText.hide('puff', function() {
				answerPanelQuizText.find('#result').text("GAME OVER");
				answerPanelQuizText.find('#extra_info').text("Score: " + numCorrectAnswers + " out of " + quizQuestions.length);
				
				newGameButton.show('puff');
				answerPanelQuizText.show('puff', function() {
					if (numCorrectAnswers < (quizQuestions.length / 2)) {
						// player did badly and should be booed
						playSound('boo');
					}
					else {
						//player did well and should be cheered
						playSound('cheer');
					}
				});
			});
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
		questionPanel.removeClass('offscreen_left_panel');
		questionPanel.removeClass('offscreen_right_panel');
		questionPanel.addClass('onscreen_panel');
				
		answerPanelQuizText.hide();
		continueButton.hide();
		newGameButton.hide();
		answerPanel.removeClass('onscreen_panel');
		answerPanel.removeClass('offscreen_right_panel');
		answerPanel.addClass('offscreen_left_panel');
		
		// reset game data
		questionNum = 0;
		numCorrectAnswers = 0;
		
		updateScore();
	};
	
	// start new game
	var startQuiz = function startQuiz() {
		questionNum = 1;
		populateQuestionPanel(questionNum, quizQuestions[questionNum-1]);		
		questionPanelQuizText.delay(500).show('puff');
	};
	
		
	/************************
	*	EVENT HANDLERS
	************************/
	
	continueButton.click(continueQuiz);
	
	newGameButton.click(function() {
		answerPanelQuizText.hide('puff');
		newGameButton.hide('puff', function() {
			resetQuiz();
			startQuiz();
		});
	});
	
	/************************
	*	START 
	************************/
	
	resetQuiz();
	startQuiz();
});