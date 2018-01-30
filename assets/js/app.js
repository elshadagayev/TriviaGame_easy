

$(document).ready(function($){
	var questions = [
		{
			text: 'Which is the heavier metal of these two?',
			answers: [
				{
					text: "Gold",
					correct: true,
				},
				{
					text: 'Silver',
					correct: false,
				},
			]
		},
		{
			text: 'Which is the most common non-contagious disease in the world?',
			answers: [
				{
					text: 'Headache',
					correct: false,
				},
				{
					text: 'Tooth decay',
					correct: true,
				},
				{
					text: 'Stomach-ache',
					correct: false,
				},
				{
					text: 'Cataracta',
					correct: false,
				},
			]
		},
		{
			text: 'Which is the coldest location in the earth? ',
			answers: [
				{
					text: 'Africa',
					correct: false,
				},
				{
					text: 'Antarctida',
					correct: true,
				},
				{
					text: 'Iceland',
					correct: false,
				},
				{
					text: 'Sibiria',
					correct: false,
				},
			]
		},
		{
			text: 'Which is the hottest place in the earth?',
			answers: [
				{
					text: 'San-Francisco',
					correct: false,
				},
				{
					text: 'Indonesia',
					correct: false,
				},
				{
					text: 'Ethiopia',
					correct: true,
				},
				{
					text: 'Columbia',
					correct: false,
				},
			]
		},
	];

	const TIME_LEFT = 60;
	var wrapper = $('.game-wrapper');
	var intervalHandler;
	var timeLeft = TIME_LEFT;

	var game = {
		init: function() {
			wrapper.find('.page').hide();
			wrapper.find('.start-page').show();
			wrapper.find('.btn.start').on('click', function(){
				game.start();
			});
			wrapper.find('.btn.restart').on('click', function(){
				game.restartGame();
			});

			game.setQuestions();
		},
		start: function() {
			wrapper.find('.page').hide();
			wrapper.find('.questions-page').show();
			wrapper.find('.questions-page input[type=radio]').prop('checked', false);
			game.startTimer();
			clearInterval(intervalHandler);
			intervalHandler = setInterval(game.startTimer, 1000);
		},

		startTimer: function(){
			var text = 'Time Remaining: ' + timeLeft + ' Seconds';
			timeLeft--;
			if(!$('.time-left').length) {
				wrapper.find('.questions-page .questions-wrapper').prepend($('<div id="time-left">').html(text));
			} else {
				$('.time-left').html(text);
			}

			if(timeLeft < 0) {
				timeLeft = 0;
				clearInterval(intervalHandler);
				game.timeOut();
			}
		},

		setQuestions: function () {
			wrapper.find('.questions-page .questions-wrapper').empty();
			
			for(var i in questions) {
				var question = questions[i];
				var div = $('<div class="question">');
				var title = $('<h2>');
				var answer = $('<div class="answers">');
				var ul = $('<ul>');
				answer.append(ul);
				for(var j in question.answers) {
					var answerJ = question.answers[j];
					ul.append('<li><label><input data-ind="' + j + '" type="radio" name="answer' + i + '">' + answerJ.text + '</label></li>');
				}
				title.html(question.text);
				div.append(title);
				div.append(ul);
				wrapper.find('.questions-page .questions-wrapper').append(div);
			}

			wrapper.find('.questions-page').append('<button class="btn btn-primary done">Done</button>')
			$('button.done').on('click', function(){
				game.endGame();
			});
		},
		timeOut: function () {
			wrapper.find('.page').hide();
			wrapper.find('.timeout-page').show();
		},
		endGame: function () {
			clearInterval(intervalHandler);
			// calculating correct and wrong answers
			var correct = 0;
			var incorrect = 0;
			var unanswered = 0;

			$('.question').each(function(ind,el){
				var question = questions[ind];
				var answerInd = $(el).find('input[type=radio]:checked').data('ind');
				if(typeof answerInd === 'undefined' || typeof question.answers[answerInd] === 'undefined') {
					unanswered++;
				} else if(question.answers[answerInd].correct) {
					correct++;
				} else {
					incorrect++;
				}
			});

			game.showResults(correct, incorrect, unanswered);
		},
		showResults: function (correct, incorrect, unanswered) {
			wrapper.find('.page').hide();
			wrapper.find('.results-page').show();
			wrapper.find('.results-page .results-wrapper').empty();
			wrapper.find('.results-page .results-wrapper').append('<div><strong>Correct: ' + correct + '</strong></div>');
			wrapper.find('.results-page .results-wrapper').append('<div><strong>Incorrect: ' + incorrect + '</strong></div>');
			wrapper.find('.results-page .results-wrapper').append('<div><strong>Unanswered: ' + unanswered + '</strong></div>');
		},
		restartGame: function () {
			clearInterval(intervalHandler);
			timeLeft = TIME_LEFT;
			game.start();
		}

	}

	game.init();
});