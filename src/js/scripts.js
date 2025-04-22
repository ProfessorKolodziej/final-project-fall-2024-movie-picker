// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

document.addEventListener("DOMContentLoaded", function () {
	// Page elements
	const pages = {
		start: document.getElementById("start-page"),
		quiz: document.getElementById("quiz-page"),
		result: document.getElementById("result-page")
	};

	// Buttons
	const startBtn = document.getElementById("start-btn");
	const prevBtn = document.getElementById("prev-btn");
	const nextBtn = document.getElementById("next-btn");
	const submitBtn = document.getElementById("submit-btn");
	const restartBtn = document.getElementById("restart-btn");

	// Quiz elements
	const questionContainer = document.getElementById("question-container");
	const resultsContainer = document.getElementById("results");

	// Quiz state
	let currentQuestionIndex = 0;
	let userAnswers = [];

	// Questions
	const questions = [
		{
			question: "What mood are you in today?",
			answers: [
				{ text: "1. Happy", image: "images/happy.png" },
				{ text: "2. Neutral", image: "images/neutral.png" },
				{ text: "3. Sad", image: "images/sad.png" },
			]
		},
		{
			question: "Do you prefer live-action or animated movies?",
			answers: [
				{ text: "1. Live-action", image: "images/captainamericaposter.jpg" },
				{ text: "2. Animated", image: "images/paddingtonposter.jpg" },
			]
		},
		{
			question: "How much time do you have?",
			answers: [
				{ text: "1. Under 90 minutes", image: "images/hourglass.png" },
				{ text: "2. 90-120 minutes", image: "images/clock.png" },
				{ text: "3. Over 120 minutes", image: "images/timer.png" },
			]
		},
		{
			question: "Are you watching alone or with others?",
			answers: [
				{ text: "1. Solo", image: "images/single.png" },
				{ text: "2. With friends", image: "images/friends.png" },
				{ text: "3. Family-friendly pick", image: "images/family.png" },
			]
		},
		{
			question: "Do you prefer a classic film or something modern?",
			answers: [
				{ text: "1. Classic (Pre-2000s)", image: "images/reel.png" },
				{ text: "2. Modern (2000s & beyond)", image: "images/popcorn.png" },
				{ text: "3. No preference", image: "images/film.png" },
			]
		},
		{
			question: "What kind of vibe do you want?",
			answers: [
				{ text: "1. Feel-good & uplifting", image: "images/star.png" },
				{ text: "2. Emotional & deep", image: "images/sad2.png" },
				{ text: "3. Light & funny", image: "images/funny.png" },
				{ text: "4. Mind-blowing & intense", image: "images/mindblowing.png" },
				{ text: "5. Thrilling & suspenseful", image: "images/stunning.png" },
			]
		},
		{
			question: "Do you want something highly rated or a hidden gem?",
			answers: [
				{ text: "1. Critically acclaimed", image: "images/star2.png" },
				{ text: "2. Hidden gem", image: "images/diamond.png" },
				{ text: "3. Surprise me!", image: "images/dice.png" },
			]
		}
	];

	const movieMapping = {
		1: {
			"1": [
				{
					title: "The Pursuit of Happyness",
					poster: "images/pursuitofhappyness.jpg",
					genre: "Family/Drama",
					description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
					trailer: "https://youtu.be/DMOBlEcRuw8?si=PsUPDJT92DzCVDLr",
				},
				{
					title: "Inside Out",
					poster: "images/insideout.jpg",
					genre: "Family/Comedy",
					description: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.",
					trailer: "https://youtu.be/yRUAzGQ3nSY?si=84_b0xo4ET2tpW3U",
				},
				{
					title: "La La Land",
					poster: "images/lalaland.jpg",
					genre: "Musical/Romance",
					description: "When Sebastian, a pianist, and Mia, an actress, follow their passion and achieve success in their respective fields, they find themselves torn between their love for each other and their careers.",
					trailer: "https://youtu.be/0pdqf4P9MB8?si=3KMeXJk8xUGAOl3g",
				},
			],
			"2": [
				{ title: "Forrest Gump", poster: "images/forrestgump.jpg" },
				{ title: "About Time", poster: "images/abouttime.jpg" },
				{ title: "The Peanut Butter Falcon", poster: "images/peanutbutterfalcon.jpg" },
			],
			"3": [
				{ title: "The Shawshank Redemption", poster: "images/shawshank.jpg" },
				{ title: "Aftersun", poster: "images/aftersun.jpg" },
				{ title: "Eternal Sunshine of the Spotless Mind", poster: "images/eternal.jpg" },
			],
		},
		2: {
			"1": [
				{ title: "Inception", poster: "images/inception.jpg" },
				{ title: "The Dark Knight", poster: "images/darkknight.jpg" },
				{ title: "1917", poster: "images/1917.jpg" },
			],
			"2": [
				{ title: "Toy Story", poster: "images/toystory.jpg" },
				{ title: "Spirited Away", poster: "images/spiritedaway.jpg" },
				{ title: "Coco", poster: "images/coco.jpg" },
			],
		},
		3: {
			"1": [
				{ title: "Zombieland", poster: "images/zombieland.jpg" },
				{ title: "The Lion King", poster: "images/lionking.jpg" },
				{ title: "The Mitchells vs. the Machines", poster: "images/mitchellsvmachines.jpg" },
			],
			"2": [
				{ title: "Arrival", poster: "images/arrival.jpg" },
				{ title: "A Quiet Place", poster: "images/quietplace.jpg" },
				{ title: "Back to the Future", poster: "images/b2tf.jpg" },
			],
			"3": [
				{ title: "The Lord of the Rings: The Fellowship of the Ring", poster: "images/lotr.jpg" },
				{ title: "Jurassic Park", poster: "images/jurassicpark.jpg" },
				{ title: "Gone with the Wind", poster: "images/gonewiththewind.jpg" },
			],
		},
		4: {
			"1": [
				{ title: "Fight Club", poster: "images/fightclub.jpg" },
				{ title: "Her", poster: "images/her.jpg" },
				{ title: "The Machinist", poster: "images/machinist.jpg" },
			],
			"2": [
				{ title: "21 Jump Street", poster: "images/21jumpstreet.jpg" },
				{ title: "The Hangover", poster: "images/hangover.jpg" },
				{ title: "Pitch Perfect", poster: "images/pitchperfect.jpg" },
			],
			"3": [
				{ title: "Finding Nemo", poster: "images/findingnemo.jpg" },
				{ title: "Frozen", poster: "images/frozen.jpg" },
				{ title: "Paddington", poster: "images/paddington.jpg" },
			],
		},
		5: {
			"1": [
				{ title: "Casablanca", poster: "images/casablanca.jpg" },
				{ title: "Psycho", poster: "images/psycho.jpg" },
				{ title: "12 Angry Men", poster: "images/12angrymen.jpg" },
			],
			"2": [
				{ title: "The Social Network", poster: "images/socialnetwork.jpg" },
				{ title: "Mad Max: Fury Road", poster: "images/madmaxfuryroad.jpg" },
				{ title: "Parasite", poster: "images/parasite.jpg" },
			],
			"3": [
				{ title: "The Wizard of Oz", poster: "images/wizardofoz.jpg" },
				{ title: "Zodiac", poster: "images/zodiac.jpg" },
				{ title: "500 Days of Summer", poster: "images/500daysofsummer.jpg" },
			],
		},
		6: {
			"1": [
				{ title: "The Intouchables", poster: "images/intouchables.jpg" },
				{ title: "Amélie", poster: "images/amelie.jpg" },
				{ title: "The Secret Life of Walter Mitty", poster: "images/waltermitty.jpg" },
			],
			"2": [
				{ title: "Schindler's List", poster: "images/schindlerslist.jpg" },
				{ title: "The Green Mile", poster: "images/greenmile.jpg" },
				{ title: "A Beautiful Mind", poster: "images/abeautifulmind.jpg" },
			],
			"3": [
				{ title: "Superbad", poster: "images/superbad.jpg" },
				{ title: "The Grand Budapest Hotel", poster: "images/grandbudapest.jpg" },
				{ title: "Crazy, Stupid, Love", poster: "images/crazystupidlove.jpg" },
			],
			"4": [
				{ title: "Shutter Island", poster: "images/shutterisland.jpg" },
				{ title: "The Matrix", poster: "images/matrix.jpg" },
				{ title: "Interstellar", poster: "images/interstellar.jpg" },
			],
			"5": [
				{ title: "Se7en", poster: "images/se7en.jpg" },
				{ title: "The Silence of the Lambs", poster: "images/silenceofthelambs.jpg" },
				{ title: "Prisoners", poster: "images/prisoners.jpg" },
			],
		},
		7: {
			"1": [
				{ title: "The Godfather", poster: "images/godfather.jpg" },
				{ title: "All Quiet on the Western Front", poster: "images/allquiet.jpg" },
				{ title: "Citizen Kane", poster: "images/citizenkane.jpg" },
			],
			"2": [
				{ title: "Moonlight", poster: "images/moonlight.jpg" },
				{ title: "The Florida Project", poster: "images/floridaproject.jpg" },
				{ title: "The Farewell", poster: "images/farewell.jpg" },
			],
			"3": [
				{ title: "Pulp Fiction", poster: "images/pulpfiction.jpg" },
				{ title: "The Big Lebowski", poster: "images/biglebowski.jpg" },
				{ title: "Muriel's Wedding", poster: "images/murielswedding.jpg" },
			],
		}
	};

	// Show specific page
	function showPage(page) {
		Object.values(pages).forEach(p => p.classList.remove("active"));
		page.classList.add("active");
	}

	// Load current question
	function loadQuestion() {
		const question = questions[currentQuestionIndex];
		questionContainer.innerHTML = `
		 <h2>Question ${currentQuestionIndex + 1} of ${questions.length}</h2>
		 <h3>${question.question}</h3>
		 ${question.answers.map((answer, index) => `
			<label class="answer-option">
			  <input type="radio" name="answer" value="${index + 1}" ${userAnswers[currentQuestionIndex] == index + 1 ? "checked" : ""}>
			  ${answer.image ? `<img src="${answer.image}" alt="${answer.text}" class="option-img">` : ""}
			  ${answer.text}
			</label><br>
		 `).join("")}
	  `;

		// Button visibility
		prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
		nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
		submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
	}

	// Save answer
	function saveAnswer() {
		const selected = document.querySelector('input[name="answer"]:checked');
		if (selected) {
			userAnswers[currentQuestionIndex] = selected.value;
		}
	}

	// Event Listeners
	startBtn.addEventListener("click", () => {
		showPage(pages.quiz);
		loadQuestion();
	});

	nextBtn.addEventListener("click", () => {
		saveAnswer();
		currentQuestionIndex++;
		loadQuestion();
	});

	prevBtn.addEventListener("click", () => {
		saveAnswer();
		currentQuestionIndex--;
		loadQuestion();
	});

	submitBtn.addEventListener("click", () => {
		saveAnswer();
		const recommendedMovies = [];

		userAnswers.forEach((answer, index) => {
			const questionNumber = index + 1;
			if (movieMapping[questionNumber]?.[answer]) {
				recommendedMovies.push(...movieMapping[questionNumber][answer]);
			}
		});

		const uniqueMovies = [...new Set(recommendedMovies)].slice(0, 3);

		showPage(pages.result);
		resultsContainer.innerHTML = `
			<h3>Here's What We Recommend!</h3>
			<div class="movie-grid">
				${uniqueMovies.map((movie, i) => {
			if (typeof movie === "string") {
				return `
						<div class="movie-card">
							<h4>${i + 1}. ${movie}</h4>
							<div class="poster-placeholder">(Poster image)</div>
							<p class="movie-info">(short description, genre, and rating)</p>
							<button class="trailer-btn">Watch Trailer</button>
						</div>
					`;
			} else {
				return `
						<div class="movie-card">
							<h4>${i + 1}. ${movie.title}</h4>
							<img src="${movie.poster}" alt="${movie.title}" class="poster-img" />
							<p class="movie-info">(short description, genre, and rating)</p>
							<button class="trailer-btn">Watch Trailer</button>
						</div>
					`;
			}
		}).join("")}
			</div>
			<p class="retry-text">Didn't like these options? Try the quiz again <a href="#">here</a>.</p>
			`;

		restartBtn.addEventListener("click", () => {
