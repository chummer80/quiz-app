$(document).ready(function () {
	/************************
	*	CONSTANTS
	************************/
	

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
		0
	));
	
	quizQuestions.push(new quizQuestion(
		"What is the record for the most points scored by a single player in an NBA game?",
		[
			"81 points",
			"90 points",
			"100 points",
			"103 points"
		],
		2
	));

	
	/************************
		EVENT HANDLERS
	************************/
	

		
	/************************
		HELPER FUNCTIONS
	************************/
	
	
	
	
	console.log(quizQuestions[0].getQuestion());
	console.log(quizQuestions[0].getChoices());
	console.log(quizQuestions[0].getAnswer());
	
	console.log(quizQuestions[1].getQuestion());
	console.log(quizQuestions[1].getChoices());
	console.log(quizQuestions[1].getAnswer());
});