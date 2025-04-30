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

	// Hamburger menu toggle
	const menuIcon = document.querySelector(".menu-icon");
	const navLinks = document.getElementById("nav-links");

	if (menuIcon && navLinks) {
		menuIcon.addEventListener("click", () => {
			navLinks.classList.toggle("show");
		});

		const navItems = document.querySelectorAll("#nav-links a");
		navItems.forEach(item => item.addEventListener("click", () => {
			navLinks.classList.remove("show");
		}));

	}

	// Buttons
	const startBtn = document.getElementById("start-btn");
	const prevBtn = document.getElementById("prev-btn");
	const nextBtn = document.getElementById("next-btn");
	const submitBtn = document.getElementById("submit-btn");
	const restartBtn = document.getElementById("restart-btn");

	// Quiz elements
	const questionContainer = document.getElementById("question-container");
	const resultsContainer = document.getElementById("results");

	// Progress bar
	const progressBar = document.getElementById("progress-bar");

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
				{
					title: "Forrest Gump",
					poster: "images/forrestgump.jpg",
					genre: "Drama/Romance",
					description: "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
					trailer: "https://youtu.be/bLvqoHBptjg?si=ucDxbw9QSCY3yo9u",
				},
				{
					title: "About Time",
					poster: "images/abouttime.jpg",
					genre: "Romance/Comedy",
					description: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.",
					trailer: "https://youtu.be/7OIFdWk83no?si=uIwjOfrvywprmC4J",
				},
				{
					title: "The Peanut Butter Falcon",
					poster: "images/peanutbutterfalcon.jpg",
					genre: "Adventure/Comedy",
					description: "Zak, a man with Down syndrome, runs away from a residential nursing home to pursue his dream of becoming a wrestler. Later, he meets with an outlaw who becomes his friend and coach.",
					trailer: "https://youtu.be/UNl9RqjLCwc?si=uwNR4QbcWpIfJj49",
				},
			],
			"3": [
				{
					title: "The Shawshank Redemption",
					poster: "images/shawshank.jpg",
					genre: "Thriller/Crime",
					description: "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
					trailer: "https://youtu.be/NmzuHjWmXOc?si=oxuvF1-IA1wrGop4",
				},
				{
					title: "Aftersun",
					poster: "images/aftersun.jpg",
					genre: "Drama/Coming-of-age story",
					description: "Sophie reflects on the shared joy and private melancholy of a holiday she took with her father twenty years earlier. Memories real and imagined fill the gaps between as she tries to reconcile the father she knew with the man she didn't.",
					trailer: "https://www.youtube.com/watch?v=G9jOaggGPKQ&ab_channel=A24",
				},
				{
					title: "Eternal Sunshine of the Spotless Mind",
					poster: "images/eternal.jpg",
					genre: "Romance/Sci-fi",
					description: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories forever.",
					trailer: "https://youtu.be/07-QBnEkgXU?si=U2tKaYphtwDgZPEn",
				},
			],
		},
		2: {
			"1": [
				{
					title: "Inception",
					poster: "images/inception.jpg",
					genre: "Sci-fi/Action",
					description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
					trailer: "https://youtu.be/YoHD9XEInc0?si=omWdOU20PpkEdZHT",
				},
				{
					title: "The Dark Knight",
					poster: "images/darkknight.jpg",
					genre: "Action/Crime",
					description: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
					trailer: "https://youtu.be/EXeTwQWrcwY?si=c2kPbkBjHUMyPAw1",
				},
				{
					title: "1917",
					poster: "images/1917.jpg",
					genre: "War/Action",
					description: "April 6th, 1917. As an infantry battalion assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
					trailer: "https://youtu.be/YqNYrYUiMfg?si=RmfRylCdSKWVlwaL",
				},
			],
			"2": [
				{
					title: "Toy Story",
					poster: "images/toystory.jpg",
					genre: "Family/Adventure",
					description: "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
					trailer: "https://youtu.be/v-PjgYDrg70?si=YVvZNO1XAeIGQAdD",
				},
				{
					title: "Spirited Away",
					poster: "images/spiritedaway.jpg",
					genre: "Fantasy/Adventure",
					description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.",
					trailer: "https://youtu.be/ByXuk9QqQkk?si=vgf45DpnF8r0RvBl",
				},
				{
					title: "Coco",
					poster: "images/coco.jpg",
					genre: "Family/Fantasy",
					description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
					trailer: "https://youtu.be/yg8116aeD7E?si=6FZQ7evm20sUKuLU",
				},
			],
		},
		3: {
			"1": [
				{
					title: "Zombieland",
					poster: "images/zombieland.jpg",
					genre: "Horror/Comedy",
					description: "A shy student trying to reach his family in Ohio, a gun-toting bruiser in search of the last Twinkie and a pair of sisters striving to get to an amusement park join forces in a trek across a zombie-filled America.",
					trailer: "https://youtu.be/8m9EVP8X7N8?si=qCLpw5ONQdf-trSU",
				},
				{
					title: "The Lion King",
					poster: "images/lionking.jpg",
					genre: "Family/Musical",
					description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
					trailer: "https://youtu.be/lFzVJEksoDY?si=6VFQkN5pLqEzOIWZ",
				},
				{
					title: "The Mitchells vs. the Machines",
					poster: "images/mitchellsvmachines.jpg",
					genre: "Family/Comedy",
					description: "A quirky, dysfunctional family's road trip is upended when they find themselves in the middle of the robot apocalypse and suddenly become humanity's unlikeliest last hope.",
					trailer: "https://youtu.be/toBGv7yvIV8?si=-u3Vr08Sdf8aDi6f",
				},
			],
			"2": [
				{
					title: "Arrival",
					poster: "images/arrival.jpg",
					genre: "Sci-fi/Thriller",
					description: "Linguist Louise Banks leads a team of investigators when gigantic spaceships touch down around the world. As nations teeter on the verge of global war, Banks and her crew must find a way to communicate with the extraterrestrial visitors.",
					trailer: "https://youtu.be/tFMo3UJ4B4g?si=imbMoGXWHd4xfS0A",
				},
				{
					title: "A Quiet Place",
					poster: "images/quietplace.jpg",
					genre: "Horror/Sci-fi",
					description: "A family struggles for survival in a world invaded by blind alien creatures with ultra-sensitive hearing.",
					trailer: "https://youtu.be/WR7cc5t7tv8?si=bQm-MxQb6eSTOnIx",
				},
				{
					title: "Back to the Future",
					poster: "images/b2tf.jpg",
					genre: "Family/Sci-fi",
					description: "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
					trailer: "https://youtu.be/qvsgGtivCgs?si=ZLKy8_aQ-sLENgN6",
				},
			],
			"3": [
				{
					title: "The Lord of the Rings: The Fellowship of the Ring",
					poster: "images/lotr.jpg",
					genre: "Fantasy/Adventure",
					description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
					trailer: "https://youtu.be/V75dMMIW2B4?si=5vmzCSBkJS06BnEE",
				},
				{
					title: "Jurassic Park",
					poster: "images/jurassicpark.jpg",
					genre: "Adventure/Sci-fi",
					description: "An industrialist invites some experts to visit his theme park of cloned dinosaurs. After a power failure, the creatures run loose, putting everyone's lives, including his grandchildren's, in danger.",
					trailer: "https://youtu.be/QWBKEmWWL38?si=objrbDCgZ84S2rAy",
				},
				{
					title: "Gone with the Wind",
					poster: "images/gonewiththewind.jpg",
					genre: "Romance/War",
					description: "A sheltered and manipulative Southern belle and a roguish profiteer face off in a turbulent romance as the society around them crumbles with the end of slavery and is rebuilt during the Civil War and Reconstruction periods.",
					trailer: "https://youtu.be/0X94oZgJis4?si=wo6nj2B2XAvVfEXD",
				},
			],
		},
		4: {
			"1": [
				{
					title: "Fight Club",
					poster: "images/fightclub.jpg",
					genre: "Action/Crime",
					description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
					trailer: "https://youtu.be/qtRKdVHc-cE?si=otv-y7R0UYvYLVuX",
				},
				{
					title: "Her",
					poster: "images/her.jpg",
					genre: "Romance/Sci-fi",
					description: "In the near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
					trailer: "https://youtu.be/dJTU48_yghs?si=uuv5ydKJXmtVDVVf",
				},
				{
					title: "The Machinist",
					poster: "images/machinist.jpg",
					genre: "Thriller/Mystery",
					description: "An industrial worker who hasn't slept in a year begins to doubt his own sanity.",
					trailer: "https://youtu.be/-R4rQMImHwE?si=h5n_d_Xx7gGGIDgf",
				},
			],
			"2": [
				{
					title: "21 Jump Street",
					poster: "images/21jumpstreet.jpg",
					genre: "Comedy/Action",
					description: "A pair of underachieving cops are sent back to a local high school to blend in and bring down a synthetic drug ring.",
					trailer: "https://youtu.be/Oj55KinxZx4?si=uQ_kYIKgA9OiWTZb",
				},
				{
					title: "The Hangover",
					poster: "images/hangover.jpg",
					genre: "Comedy/Adventure",
					description: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing. They must make their way around the city in order to find their friend in time for his wedding.",
					trailer: "https://youtu.be/tlize92ffnY?si=5H8GGP11PNxtCnQO",
				},
				{
					title: "Pitch Perfect",
					poster: "images/pitchperfect.jpg",
					genre: "Comedy/Romance",
					description: "Beca, a freshman at Barden University, is cajoled into joining The Bellas, her school's all-girls singing group. Injecting some much needed energy into their repertoire, The Bellas take on their male rivals in a campus competition.",
					trailer: "https://youtu.be/8dItOM6eYXY?si=Z7g7QP27hbD3Hbz1",
				},
			],
			"3": [
				{
					title: "Finding Nemo",
					poster: "images/findingnemo.jpg",
					genre: "Family/Adventure",
					description: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
					trailer: "https://youtu.be/9oQ628Seb9w?si=shn9SDDP-ElMTd8M",
				},
				{
					title: "Frozen",
					poster: "images/frozen.jpg",
					genre: "Family/Musical",
					description: "Fearless optimist Anna teams up with rugged mountain man Kristoff and his loyal reindeer Sven in an epic journey to find Anna's sister Elsa, whose icy powers have trapped the kingdom of Arendelle in eternal winter.",
					trailer: "https://youtu.be/TbQm5doF_Uc?si=NB702KfpK_SBzTFi",
				},
				{
					title: "Paddington",
					poster: "images/paddington.jpg",
					genre: "Family/Comedy",
					description: "A young Peruvian bear travels to London in search of a home. Finding himself lost and alone at Paddington Station, he meets the kindly Brown family, who offer him a temporary haven.",
					trailer: "https://youtu.be/W5tUEw4Nq4E?si=dSj1eOo0w4JFbZu7",
				},
			],
		},
		5: {
			"1": [
				{
					title: "Casablanca",
					oster: "images/casablanca.jpg",
					genre: "Romance/War",
					description: "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
					trailer: "https://youtu.be/BkL9l7qovsE?si=8c8Yss_2RCjmzlOB",
				},
				{
					title: "Psycho",
					poster: "images/psycho.jpg",
					genre: "Horror/Mystery",
					description: "A secretary on the run for embezzlement takes refuge at a secluded California motel owned by a repressed man and his overbearing mother.",
					trailer: "https://youtu.be/NG3-GlvKPcg?si=3BsajyOHID_UdNti",
				},
				{
					title: "12 Angry Men",
					poster: "images/12angrymen.jpg",
					genre: "Thriller/Crime",
					description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
					trailer: "https://youtu.be/_13J_9B5jEk?si=UnZbIEOn8wPgXbqL",
				},
			],
			"2": [
				{
					title: "The Social Network",
					poster: "images/socialnetwork.jpg",
					genre: "Drama/Historical Drama",
					description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business.",
					trailer: "https://youtu.be/lB95KLmpLR4?si=QCGYLz3N10hCk-Zl",
				},
				{
					title: "Mad Max: Fury Road",
					poster: "images/madmaxfuryroad.jpg",
					genre: "Action/Sci-fi",
					description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshipper and a drifter named Max.",
					trailer: "https://youtu.be/hEJnMQG9ev8?si=d9U8JIGRJ_LuIfWU",
				},
				{
					title: "Parasite",
					poster: "images/parasite.jpg",
					genre: "Thriller/Comedy",
					description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
					trailer: "https://youtu.be/5xH0HfJHsaY?si=mAwel1bjXUFhCyR9",
				},
			],
			"3": [
				{
					title: "The Wizard of Oz",
					poster: "images/wizardofoz.jpg",
					genre: "Family/Musical",
					description: "Young Dorothy Gale and her dog Toto are swept away by a tornado from their Kansas farm to the magical Land of Oz and embark on a quest with three new friends to see the Wizard, who can return her to her home and fulfill the others' wishes.",
					trailer: "https://youtu.be/H_3T4DGw10U?si=wSuuZFAaE9JJ7yjp",
				},
				{
					title: "Zodiac",
					poster: "images/zodiac.jpg",
					genre: "Thriller/Crime",
					description: "Between 1968 and 1983, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer, an unidentified individual who terrorizes Northern California with a killing spree.",
					trailer: "https://youtu.be/yNncHPl1UXg?si=3nWZzYfg3V7DFu4l",
				},
				{
					title: "500 Days of Summer",
					poster: "images/500daysofsummer.jpg",
					genre: "Comedy/Romance",
					description: "After being dumped by the girl he believes to be his soulmate, hopeless romantic Tom Hansen reflects on their relationship to try and figure out where things went wrong and how he can win her back.",
					trailer: "https://youtu.be/PsD0NpFSADM?si=vc6bV5lPH7KBjHnG",
				},
			],
		},
		6: {
			"1": [
				{
					title: "The Intouchables",
					poster: "images/intouchables.jpg",
					genre: "Comedy/Drama",
					description: "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.",
					trailer: "https://youtu.be/34WIbmXkewU?si=iO93wBUBm8vWKF46",
				},
				{
					title: "Amélie",
					poster: "images/amelie.jpg",
					genre: "Comedy/Romance",
					description: "Despite being caught in her imaginative world, young waitress Amelie decides to help people find happiness. Her quest to spread joy leads her on a journey during which she finds true love.",
					trailer: "https://youtu.be/HUECWi5pX7o?si=dsXein4lN2xZbUv1",
				},
				{
					title: "The Secret Life of Walter Mitty",
					poster: "images/waltermitty.jpg",
					genre: "Adventure/Comedy",
					description: "When both he and a colleague are about to lose their job, Walter takes action by embarking on an adventure more extraordinary than anything he ever imagined.",
					trailer: "https://youtu.be/QD6cy4PBQPI?si=VsTCKzeGYcdaptTH",
				},
			],
			"2": [
				{
					title: "Schindler's List",
					poster: "images/schindlerslist.jpg",
					genre: "War/Drama",
					description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
					trailer: "https://youtu.be/gG22XNhtnoY?si=1_k9mbc4QBpQbzfs",
				},
				{
					title: "The Green Mile",
					poster: "images/greenmile.jpg",
					genre: "Fantasy/Crime",
					description: "A death row guard learns that a gentle giant in his charge possesses a mysterious gift.",
					trailer: "https://youtu.be/Ki4haFrqSrw?si=WRbUm-WlngD7wOHF",
				},
				{
					title: "A Beautiful Mind",
					poster: "images/abeautifulmind.jpg",
					genre: "Thriller/Romance ",
					description: "A mathematical genius, John Nash made an astonishing discovery early in his career and stood on the brink of international acclaim. But the handsome and arrogant Nash soon found himself on a harrowing journey of self-discovery.",
					trailer: "https://youtu.be/YWwAOutgWBQ?si=QOJORprAA_OGP_-r",
				},
			],
			"3": [
				{
					title: "Superbad",
					poster: "images/superbad.jpg",
					genre: "Comedy/Teen",
					description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
					trailer: "https://youtu.be/LvKvus3vCEY?si=u6KzzOw_I4NkHZYw",
				},
				{
					title: "The Grand Budapest Hotel",
					poster: "images/grandbudapest.jpg",
					genre: "Comedy/Adventure",
					description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
					trailer: "https://youtu.be/zru-1DbbcsA?si=MZ63-iyGX8SyNCVZ",
				},
				{
					title: "Crazy, Stupid, Love.",
					poster: "images/crazystupidlove.jpg",
					genre: "Romance/Drama",
					description: "A middle-aged husband's life changes dramatically when his wife asks him for a divorce. He seeks to rediscover his manhood with the help of a newfound friend, Jacob, learning to pick up girls at bars.",
					trailer: "https://youtu.be/flvz5RMRx7E?si=X_u_jY7JRUhezNEY",
				},
			],
			"4": [
				{
					title: "Shutter Island",
					poster: "images/shutterisland.jpg",
					genre: "Horror/Mystery",
					description: "Two US marshals are sent to a mental institution on an inhospitable island in order to investigate the disappearance of a patient.",
					trailer: "https://youtu.be/v8yrZSkKxTA?si=JEUUofrrPwXlNJb9",
				},
				{
					title: "The Matrix",
					poster: "images/matrix.jpg",
					genre: "Action/Sci-fi",
					description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
					trailer: "https://youtu.be/vKQi3bBA1y8?si=GztA5xuFXgEVs1wy",
				},
				{
					title: "Interstellar",
					poster: "images/interstellar.jpg",
					genre: "Sci-fi/Adventure",
					description: "A travel through the stars and the space with the Nolan's Interstellar and how you can see it.",
					trailer: "https://youtu.be/zSWdZVtXT7E?si=OhIOTJgVrmwGtjnn",
				},
			],
			"5": [
				{
					title: "Se7en",
					poster: "images/se7en.jpg",
					genre: "Crime/Horror",
					description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
					trailer: "https://youtu.be/znmZoVkCjpI?si=k7BwT5Rl2o_uUHkl",
				},
				{
					title: "The Silence of the Lambs",
					poster: "images/silenceofthelambs.jpg",
					genre: "Horror/Crime",
					description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
					trailer: "https://youtu.be/W6Mm8Sbe__o?si=UC3QvwFIi8xC2Hut",
				},
				{
					title: "Prisoners",
					poster: "images/prisoners.jpg",
					genre: "Thriller/Crime",
					description: "A desperate father takes the law into his own hands after police fail to find two kidnapped girls.",
					trailer: "https://youtu.be/bpXfcTF6iVk?si=8qXv28SpTHQllsV5",
				},
			],
		},
		7: {
			"1": [
				{
					title: "The Godfather",
					poster: "images/godfather.jpg",
					genre: "Crime",
					description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
					trailer: "https://youtu.be/UaVTIH8mujA?si=0REIq3iglAjHQiGs",
				},
				{
					title: "All Quiet on the Western Front",
					poster: "images/allquiet.jpg",
					genre: "War/Action",
					description: "A young German soldier's terrifying experiences and distress on the western front during World War I.",
					trailer: "https://youtu.be/hf8EYbVxtCY?si=rs16ISsSdFRRf5ce",
				},
				{
					title: "Citizen Kane",
					poster: "images/citizenkane.jpg",
					genre: "Mystery",
					description: "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: 'Rosebud.'",
					trailer: "https://youtu.be/8dxh3lwdOFw?si=82T6VNNBds0GXEzN",
				},
			],
			"2": [
				{
					title: "Moonlight",
					poster: "images/moonlight.jpg",
					genre: "Romance/Drama",
					description: "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
					trailer: "https://youtu.be/9NJj12tJzqc?si=6AraqE4H6dQR2Mg3",
				},
				{
					title: "The Florida Project",
					poster: "images/floridaproject.jpg",
					genre: "Drama/Indie Film",
					description: "A single mother and the manager of a roadside motel do their utmost to maintain the innocence of a six-year-old girl's life.",
					trailer: "https://youtu.be/WwQ-NH1rRT4?si=zFfMBi2vARg9phe8",
				},
				{
					title: "The Farewell",
					poster: "images/farewell.jpg",
					genre: "Comedy/Drama",
					description: "A Chinese family discovers their grandmother has only a short while left to live and decide to keep her in the dark, scheduling a wedding to gather before she dies.",
					trailer: "https://youtu.be/RofpAjqwMa8?si=NteLJ_33trV33dTt",
				},
			],
			"3": [
				{
					title: "Pulp Fiction",
					poster: "images/pulpfiction.jpg",
					genre: "Crime/Thriller",
					description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
					trailer: "https://youtu.be/s7EdQ4FqbhY?si=C5cFEZAK8A_nT-sP",
				},
				{
					title: "The Big Lebowski",
					poster: "images/biglebowski.jpg",
					genre: "Comedy/Crime",
					description: "Jeff 'The Dude' Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.",
					trailer: "https://youtu.be/gk5WiQWOXtY?si=ESD1Sgg7lsU76P8n",
				},
				{
					title: "Muriel's Wedding",
					poster: "images/murielswedding.jpg",
					genre: "Comedy/Romance",
					description: "A young social outcast in Australia steals money from her parents to finance a vacation where she hopes to find happiness, and perhaps love.",
					trailer: "https://youtu.be/vwkCIpLMZBw?si=Up9Ra3c8uS-ELcLm",
				},
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
		document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
		questionContainer.innerHTML = `
			<h3>${question.question}</h3>
			${question.answers.map((answer, index) => `
				<label class="answer-option">
			  		<input type="radio" name="answer" value="${index + 1}" ${userAnswers[currentQuestionIndex] == index + 1 ? "checked" : ""}>
					<span>${answer.text}</span>
					${answer.image ? `<img src="${answer.image}" alt="${answer.text}" class="option-img">` : ""}
				</label><br>
		 `).join("")}
	  `;

		// Button visibility
		prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
		nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
		submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";

		updateProgressBar();

		const questionEl = document.getElementById("question-container");
		questionEl.classList.remove("visible");
		setTimeout(() => {
			questionEl.classList.add("visible");
		}, 100);
	}

	// Save answer
	function saveAnswer() {
		const selected = document.querySelector('input[name="answer"]:checked');
		if (selected) {
			userAnswers[currentQuestionIndex] = selected.value;
		}
	}

	// Update progress bar
	function updateProgressBar() {
		progressBar.innerHTML = "";

		for (let i = 0; i < questions.length; i++) {
			const step = document.createElement("div");
			step.classList.add("progress-step");
			if (i <= currentQuestionIndex) step.classList.add("active");
			progressBar.appendChild(step);
		}
	}

	// Event Listener for Start Quiz with animation
	startBtn.addEventListener("click", () => {
		const transitionPage = document.getElementById("transition-page");
		const posterGallery = document.getElementById("poster-gallery");
		showPage(transitionPage);
		transitionPage.classList.add("active");
		setTimeout(() => {
			posterGallery.classList.add("flow-up");
		}, 100);
		setTimeout(() => {
			showPage(pages.quiz);
			document.getElementById("transition-page").style.display = "none";
			loadQuestion();
			window.scrollTo(0, 0);
		}, 5000); // match CSS animation duration & this is the wait time between animation and question load
	});

	nextBtn.addEventListener("click", () => {
		const selected = document.querySelector('input[name="answer"]:checked');
		if (!selected) {
			alert("Please select an option before continuing.");
			return;
		}
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
		const selected = document.querySelector('input[name="answer"]:checked');
		if (!selected) {
			alert("Please select an option before submitting.");
			return;
		}
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
							<p class="movie-info">
								<span class="movie-genre">${movie.genre ? movie.genre : ''}</span>
								${movie.description ? ' - ' + movie.description : ''}
							</p>
							<a href="${movie.trailer}" target="_blank">
								<button class="trailer-btn">Watch Trailer</button>
							</a>
						</div>
					`;
			}
		}).join("")}
			</div>
				<p class="retry-text">
				Didn't like these options? <a href="#" id="retry-link">Try again here.</a>
				</p>
			`;

		// Set up retry link event
		document.getElementById("retry-link").addEventListener("click", (e) => {
			e.preventDefault();
			currentQuestionIndex = 0;
			userAnswers = [];
			showPage(pages.start);
		});
	});
});
