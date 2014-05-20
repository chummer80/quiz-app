$(document).ready(function () {
	
	var quizModule = (function () {
		var questionNum = 1;
		var numCorrectAnswers = 0;
		var quizQuestions = [];
		
		// Define quiz questions and answers
		{
		// Question 1
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
		// Question 2
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
		// Question 3
		quizQuestions.push(new quizQuestion(
			"In what year did the NBA merge with the American Basketball Association (ABA)?",
			[
				"1958",
				"1963",
				"1970",
				"1976"
			],
			3,
			"The NBA and ABA merged in 1976. This added 4 new teams to the NBA: the Denver Nuggets, Indiana Pacers, New Jersey Nets, and San Antonio Spurs."
		));
		// Question 4
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
		// Question 5	
		quizQuestions.push(new quizQuestion(
			"Which of the following players was nicknamed \"The Human Highlight Film\"?",
			[
				"George Gervin",
				"Dominique Wilkins",
				"Shaquille O'Neal",
				"Michael Jordan"
			],
			1,
			"Known for his powerful windmill dunks, Dominique Wilkins was nicknamed \"The Human Highlight Film\". He is the all-time leading scorer in Atlanta Hawks history."
		));
		// Question 6
		quizQuestions.push(new quizQuestion(
			"Who is the shortest player ever to play in the NBA?",
			[
				"Muggsy Bogues",
				"Spud Webb",
				"Earl Boykins",
				"Manute Bol",
			],
			0,
			"The shortest NBA player ever was 5'3\" Tyrone \"Muggsy\" Bogues. In 1987-1988, he and one of the tallest players in NBA history (7'7\" Gheorghe Muresan) were teammates."
		));
		// Question 7
		quizQuestions.push(new quizQuestion(
			"Which of the current NBA teams has the worst franchise winning percentage?",
			[
				"Charlotte Bobcats",
				"Minnesota Timberwolves",
				"Los Angeles Clippers",
				"Memphis Grizzlies",
			],
			0,
			"The Charlotte Bobcats, the most recently founded team in the league, has an abysmal 35.9% franchise winning percentage."
		));
		// Question 8
		quizQuestions.push(new quizQuestion(
			"Which NBA sportscaster first coined the term \"slam dunk\"?",
			[
				"Dick Stockton",
				"Marv Albert",
				"Tommy Heinsohn",
				"Chick Hearn",
			],
			3,
			"Legendary Laker play-by-play announcer Francis \"Chick\" Hearn was the first to use the term \"slam dunk\". Before that, it was known as a \"dunk shot\"."
		));
		// Question 9
		quizQuestions.push(new quizQuestion(
			"Combining salary and endorsement deals, who is the highest-paid NBA player of 2014?",
			[
				"Lebron James",
				"Kobe Bryant",
				"Kevin Durant",
				"Derrick Rose",
			],
			1,
			"Kobe Bryant's combined $64.5 million total earnings barely edge out Lebron James' $61.1 million total earnings."
		));
		// Question 10
		quizQuestions.push(new quizQuestion(
			"1992 was the first year in which NBA players were permitted to play in the Olympics. Which of these players was not on that team (known as the \"Dream Team\")?",
			[
				"Clyde Drexler",
				"Karl Malone",
				"Hakeem Olajuwon",
				"Scottie Pippen",
			],
			2,
			"Hakeem Olajuwon was part of the 1996 Olympic team, but not the 1992 team. The 1992 Dream Team beat their opponents by an average of 43.8 points per game!"
		));
		// Question 11
		quizQuestions.push(new quizQuestion(
			"In the longest game in NBA history, how many overtime periods were played?",
			[
				"5",
				"6",
				"7",
				"8",
			],
			1,
			"On January 6, 1951, the Indianapolis Olympians defeated the Rochester Royals 75-73 in 6 overtimes. That's 78 minutes of basketball!"
		));
		// Question 12
		quizQuestions.push(new quizQuestion(
			"In the highest-scoring game in NBA history, what was the number of points scored by both teams combined?",
			[
				"300",
				"337",
				"356",
				"370",
			],
			3,
			"On December 13, 1983, the Detroit Pistons defeated the Denver Nuggets 186–184. (370 combined points)"
		));
		// Question 13
		quizQuestions.push(new quizQuestion(
			"Of all the international (non-American) players who have ever played in the NBA, which nationality has been the most common?",
			[
				"Spanish",
				"Canadian",
				"Australian",
				"French",
			],
			1,
			"There have been 24 Canadian players in NBA history. Canadian Hank Biasatti became the first ever international player when he joined the league in 1946."
		));
		}
		
		return {
			getQuestionNum: function() { return questionNum; },
			goNextQuestion: function() { questionNum++; },
			
			getScore: function() { return numCorrectAnswers; },
			addToScore: function() { numCorrectAnswers++; },
			
			resetQuiz: function() { 
				// Fisher-Yates shuffle algorithm to randomize the order of questions
				var randomizeQuestions = function randomizeQuestions() {
					var currentIndex = quizQuestions.length, tempQuestion, randomIndex;

					// While there remain elements to shuffle…
					while (currentIndex > 0) {
						// Pick a remaining element…
						randomIndex = Math.floor(Math.random() * currentIndex--);

						// And swap it with the current element.
						tempQuestion = quizQuestions[currentIndex];
						quizQuestions[currentIndex] = quizQuestions[randomIndex];
						quizQuestions[randomIndex] = tempQuestion;
					}
				}
		
				questionNum = 1;
				numCorrectAnswers = 0;
				randomizeQuestions();
			},
			
			getQuestionObject: function() { return quizQuestions[questionNum-1]; },
			getNumQuizQuestions: function() { return quizQuestions.length; }
		};
	})();

	
	/************************
	*	DOM ELEMENTS
	************************/
	
	var questionPanel = $('#question_panel');
	var answerPanel = $('#answer_panel');
	
	var questionPanelQuizText = questionPanel.find($('.quiz_text'))
	var answerPanelQuizText = answerPanel.find($('.quiz_text'))
	
	var continueButton = answerPanel.find($('#continue_button'));
	var newGameButton = answerPanel.find($('#new_game_button'));
	
	var scoreBoard = $('#score');

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
			panel.switchClass('offscreen_left_panel', 'onscreen_panel', 1500, 'linear', function() {
				panel.removeClass('spinning', 0);
				panel.find('.quiz_text').show('clip');
				// if the panel rolling onscreen is the answer panel, play the appropriate sound for right/wrong answer
				if (panel == answerPanel) {
					panel.find('#continue_button').show('clip');
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
				panel.find('#continue_button').hide('clip');
			}
			panel.find('.quiz_text').hide('clip');
			panel.addClass('spinning', 0);
			panel.switchClass('onscreen_panel', 'offscreen_right_panel', 1500, 'linear', function() {
				panel.removeClass('spinning', 0);
				// after animation, invisibly move the panel off the left side of the screen
				// so it will be prepared to roll on-screen next time.
				panel.removeClass('offscreen_right_panel', 0);
				panel.addClass('offscreen_left_panel', 0);
			});
		}
	};
	
	var updateScore = function updateScore() {
		scoreBoard.text("Score: " + quizModule.getScore() + " / " + quizModule.getQuestionNum());
	};
	
	var resetScore = function resetScore() {
		scoreBoard.text("Score: 0 / 0");
	};
		
	// a quiz choice was selected. submit the choice to see if it was right.
	var submitChoice = function submitChoice() {
		// check which quiz choice element was clicked.
		var choiceIndex = $(this).index();
		console.log("Choice index: " + choiceIndex);
		
		var answeredCorrectly = (choiceIndex == quizModule.getQuestionObject().getAnswerIndex());
		if (answeredCorrectly) {
			quizModule.addToScore();	
		}
		
		populateAnswerPanel(answeredCorrectly);
		
		rollPanel(questionPanel);
		rollPanel(answerPanel, answeredCorrectly);
	}
	
	// Either go to the next question, or show a game over message
	var continueQuiz = function continueQuiz() {
		if (quizModule.getQuestionNum() < quizModule.getNumQuizQuestions()) {
			// Quiz is still going, show the next question
			quizModule.goNextQuestion();
			
			populateQuestionPanel();
			
			rollPanel(answerPanel);
			rollPanel(questionPanel);
		}
		else {
			// no more questions, show game over message
			continueButton.hide('clip');
			answerPanelQuizText.hide('clip', function() {
				answerPanelQuizText.find('#result').text("GAME OVER");
				answerPanelQuizText.find('#extra_info').text("Score: " + quizModule.getScore() + " out of " + quizModule.getNumQuizQuestions());
				
				newGameButton.show('clip');
				answerPanelQuizText.show('clip', function() {
					if (quizModule.getScore() < (quizModule.getNumQuizQuestions() / 2)) {
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
	var populateQuestionPanel = function populateQuestionPanel() {
		questionPanelQuizText.find('#question_number').text(quizModule.getQuestionNum() + ". ");

		// changing the text in the text node without destroying the span is a little harder
		// first get all text nodes in the #question_text paragraph element
		var textNodes = questionPanelQuizText.find('#question_text').contents().filter(function() {
			return this.nodeType == Node.TEXT_NODE;
		});
		// for some reason there are 2 text nodes. We only want the 2nd one.
		var textNode = textNodes.get(1);
		textNode.nodeValue = quizModule.getQuestionObject().getQuestion();
		
		// remove the choices from the previous question, then create all new list items.
		// this allows different questions to have different number of choices
		var choiceListElement = questionPanelQuizText.find('#choice_list');
		choiceListElement.children().remove();
		
		var choices = quizModule.getQuestionObject().getChoices();
		for (var i = 0; i < choices.length; i++) {
			$('<li></li>')
				.addClass('quiz_choice')
				.text(choices[i])
				.appendTo(choiceListElement)
				.click(submitChoice);
		}
	};
	
	// Fill in text on answer panel depending on whether question was answered correctly
	var populateAnswerPanel = function populateAnswerPanel(answeredCorrectly) {
		var result = answeredCorrectly ? "CORRECT!" : "INCORRECT!";
		answerPanelQuizText.find('#result').text(result);
		
		var extraInfo = quizModule.getQuestionObject().getExtraInfo();
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
		
		resetScore();
		
		// reset game data
		quizModule.resetQuiz();
	};
	
	// start new game
	var startQuiz = function startQuiz() {
		populateQuestionPanel();
		questionPanelQuizText.delay(500).show('clip');
	};
	
		
	/************************
	*	EVENT HANDLERS
	************************/
	
	continueButton.click(continueQuiz);
	
	newGameButton.click(function() {
		answerPanelQuizText.hide('clip');
		newGameButton.hide('clip', function() {
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