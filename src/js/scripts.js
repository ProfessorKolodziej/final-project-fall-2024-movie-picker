// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

document.addEventListener("DOMContentLoaded", () => {
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
				{ title: "The Pursuit of Happyness", poster: "images/pursuitofhappyness.jpg" },
				{ title: "Inside Out", poster: "images/insideout.jpg" },
				{ title: "La La Land", poster: "images/lalaland.jpg" },
			],
			"2": ["Forrest Gump", "The Grand Budapest Hotel", "The Secret Life of Walter Mitty"],
			"3": ["The Shawshank Redemption", "A Beautiful Mind", "Eternal Sunshine of the Spotless Mind"]
		},
		2: {
			"1": ["Inception", "The Dark Knight", "Interstellar"],
			"2": ["Toy Story", "Spirited Away", "Coco"]
		},
		3: {
			"1": ["Zombieland", "The Lion King", "The Social Network"],
			"2": ["The Godfather", "The Matrix", "The Avengers"],
			"3": ["The Lord of the Rings", "Schindler's List", "Gone with the Wind"]
		},
		4: {
			"1": ["Fight Club", "Her", "The Machinist"],
			"2": ["Superbad", "The Hangover", "Pitch Perfect"],
			"3": ["Finding Nemo", "Frozen", "Paddington"]
		},
		5: {
			"1": ["Casablanca", "Psycho", "12 Angry Men"],
			"2": ["The Social Network", "Mad Max: Fury Road", "Parasite"],
			"3": ["The Wizard of Oz", "The Godfather", "The Dark Knight"]
		},
		6: {
			"1": ["The Intouchables", "Amélie", "The Secret Life of Walter Mitty"],
			"2": ["Schindler's List", "The Green Mile", "A Beautiful Mind"],
			"3": ["Superbad", "The Grand Budapest Hotel", "Crazy, Stupid, Love"],
			"4": ["Inception", "The Matrix", "Interstellar"],
			"5": ["Se7en", "The Silence of the Lambs", "Prisoners"]
		},
		7: {
			"1": ["The Godfather", "The Shawshank Redemption", "The Dark Knight"],
			"2": ["Moonlight", "The Florida Project", "The Farewell"],
			"3": ["Pulp Fiction", "The Big Lebowski", "The Grand Budapest Hotel"]
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
			<h3>Here’s What We Recommend!</h3>
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
			<p class="retry-text">Didn’t like these options? Try the quiz again <a href="#">here</a>.</p>
			`;

		restartBtn.addEventListener("click", () => {
			currentQuestionIndex = 0;
			userAnswers = [];
			showPage(pages.start);
		});
	});
