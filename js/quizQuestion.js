
/*********************************
*	quizQuestion CLASS CONSTRUCTOR
**********************************/

function quizQuestion (question, choices, answerIndex) {
	// validate constructor arguments and initialize private members
	
	console.assert(typeof question == "string", "quizQuestion constructor: 'question' must be a string");
	var questionText = question;
	
	console.assert(choices instanceof Array, "quizQuestion constructor: 'choices' must be an array");
	console.assert(choices.length > 0, "quizQuestion constructor: 'choices' cannot be empty");
	for (var i = 0; i < choices.length; i++) {
		console.assert(typeof choices[i] == "string", "quizQuestion constructor: 'choices' array must only contain strings");
	}
	var choiceTextArray = choices;
	
	console.assert(choices[answerIndex], "quizQuestion constructor: 'answerIndex' must be a valid index of the 'choices' array");
	var correctAnswerIndex = answerIndex;
	
	// accessor functions
	
	this.getQuestion = function getQuestion() {
		return questionText;
	};
	
	this.getChoices = function getChoices() {
		return choiceTextArray;
	};
	
	this.getAnswerIndex = function getAnswerIndex() {
		return correctAnswerIndex;
	};
	
	this.getAnswer = function getAnswer() {
		return choiceTextArray[correctAnswerIndex];
	};
}