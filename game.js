let currentQuestion = 0;
let score = { tamil: 0, hindi: 0, french: 0 };
let selectedSet = [];
let totalQuestions = 10;

const correctSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3');
const wrongSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3');
const wordList = [
  { word: "apple", tamil: "ஆப்பிள்", hindi: "सेब", french: "Pomme", category: "objects" },
  { word: "dog", tamil: "நாய்", hindi: "कुत्ता", french: "Chien", category: "animals" },
  { word: "run", tamil: "ஓடு", hindi: "दौड़ना", french: "Courir", category: "actions" },
  { word: "cat", tamil: "பூனை", hindi: "बिल्ली", french: "Chat", category: "animals" },
  { word: "sun", tamil: "சூரியன்", hindi: "सूरज", french: "Soleil", category: "objects" },
  { word: "milk", tamil: "பால்", hindi: "दूध", french: "Lait", category: "objects" },
  { word: "jump", tamil: "தாவு", hindi: "कूदना", french: "Sauter", category: "actions" },
  { word: "fish", tamil: "மீன்", hindi: "मछली", french: "Poisson", category: "animals" },
  { word: "flower", tamil: "மலர்", hindi: "फूल", french: "Fleur", category: "objects" },
  { word: "sleep", tamil: "தூங்கு", hindi: "सोना", french: "Dormir", category: "actions" },
  { word: "banana", tamil: "வாழை", hindi: "केला", french: "Banane", category: "objects" },
  { word: "cow", tamil: "பசு", hindi: "गाय", french: "Vache", category: "animals" },
  { word: "read", tamil: "படி", hindi: "पढ़ना", french: "Lire", category: "actions" },
  { word: "book", tamil: "புத்தகம்", hindi: "किताब", french: "Livre", category: "objects" },
  { word: "elephant", tamil: "யானை", hindi: "हाथी", french: "Éléphant", category: "animals" },
  { word: "write", tamil: "எழுது", hindi: "लिखना", french: "Écrire", category: "actions" },
  { word: "car", tamil: "கார்", hindi: "गाड़ी", french: "Voiture", category: "objects" },
  { word: "lion", tamil: "சிங்கம்", hindi: "सिंह", french: "Lion", category: "animals" },
  { word: "climb", tamil: "ஏறு", hindi: "चढ़ना", french: "Grimper", category: "actions" },
  { word: "pen", tamil: "பேனா", hindi: "कलम", french: "Stylo", category: "objects" },
  { word: "mouse", tamil: "எலி", hindi: "चूहा", french: "Souris", category: "animals" },
  { word: "phone", tamil: "தொலைபேசி", hindi: "फोन", french: "Téléphone", category: "objects" },
  { word: "dance", tamil: "நடனம்", hindi: "नृत्य", french: "Danse", category: "actions" },
  { word: "bird", tamil: "பறவை", hindi: "पक्षी", french: "Oiseau", category: "animals" },
  { word: "ball", tamil: "பந்து", hindi: "गेंद", french: "Balle", category: "objects" },
  { word: "play", tamil: "விளையாடு", hindi: "खेलना", french: "Jouer", category: "actions" },
  { word: "bear", tamil: "கரடி", hindi: "भालू", french: "Ours", category: "animals" },
  { word: "table", tamil: "மேசை", hindi: "मेज़", french: "Table", category: "objects" },
  { word: "eat", tamil: "சாப்பிடு", hindi: "खाना", french: "Manger", category: "actions" },
  { word: "tiger", tamil: "புலி", hindi: "बाघ", french: "Tigre", category: "animals" },
  { word: "chair", tamil: "நாற்காலி", hindi: "कुर्सी", french: "Chaise", category: "objects" },
  { word: "think", tamil: "சிந்தி", hindi: "सोचना", french: "Penser", category: "actions" },
  { word: "monkey", tamil: "குரங்கு", hindi: "बंदर", french: "Singe", category: "animals" },
  { word: "bottle", tamil: "குடம்", hindi: "बोतल", french: "Bouteille", category: "objects" },
  { word: "walk", tamil: "நட", hindi: "चलना", french: "Marcher", category: "actions" },
  { word: "goat", tamil: "ஆடு", hindi: "बकरी", french: "Chèvre", category: "animals" },
  { word: "spoon", tamil: "கரண்டி", hindi: "चम्मच", french: "Cuillère", category: "objects" },
  { word: "draw", tamil: "வரை", hindi: "चित्र बनाना", french: "Dessiner", category: "actions" },
  { word: "deer", tamil: "மான்", hindi: "हिरन", french: "Cerf", category: "animals" },
  { word: "fan", tamil: "காற்றாடி", hindi: "पंखा", french: "Ventilateur", category: "objects" },
  { word: "cry", tamil: "அழு", hindi: "रोना", french: "Pleurer", category: "actions" },
  { word: "duck", tamil: "வாத்து", hindi: "बतख", french: "Canard", category: "animals" },
  { word: "train", tamil: "ரயில்", hindi: "रेलगाड़ी", french: "Train", category: "objects" },
  { word: "cook", tamil: "சமை", hindi: "पकाना", french: "Cuisiner", category: "actions" },
  { word: "rabbit", tamil: "முயல்", hindi: "खरगोश", french: "Lapin", category: "animals" },
  { word: "television", tamil: "தொலைக்காட்சி", hindi: "टीवी", french: "Télévision", category: "objects" },
  { word: "swim", tamil: "மூழ்கல்", hindi: "तैरना", french: "Nager", category: "actions" }
];

function speakWord(word, langCode = 'en-IN') {
  const synth = window.speechSynthesis;
  let voices = synth.getVoices();
  const utter = new SpeechSynthesisUtterance(word);
  const voice = voices.find(v => v.lang === langCode || v.lang.includes(langCode.slice(0, 2)));
  if (voice) utter.voice = voice;
  utter.lang = langCode;
  synth.speak(utter);
}



function endGame(userName) {
  const total = score.tamil + score.hindi + score.french;
  let message = "", animId = "", bg = "#fff";

  if (total === totalQuestions * 3) {
    message = `🎉 Excellent, ${userName}! You got all correct!`;
    animId = "winAnim"; bg = "#d4edda";
  } else if (total >= totalQuestions * 2) {
    message = `👍 Great job, ${userName}! Keep it up!`;
    animId = "goodAnim"; bg = "#fff3cd";
  } else {
    message = `💪 Try again, ${userName}! Practice makes perfect.`;
    animId = "tryAnim"; bg = "#f8d7da";
  }

  document.getElementById("winAnim").style.display = "none";
  document.getElementById("goodAnim").style.display = "none";
  document.getElementById("tryAnim").style.display = "none";
  if (animId) document.getElementById(animId).style.display = "block";

  document.getElementById("result").innerHTML = `
    <div style="background: ${bg}; border: 2px solid #ccc; padding: 1rem; border-radius: 10px; margin-top: 1rem;">
      <h3>${message}</h3>
      <p>✅ Tamil: ${score.tamil} / ${totalQuestions}<br>🇮🇳 Hindi: ${score.hindi} / ${totalQuestions}<br>🇫🇷 French: ${score.french} / ${totalQuestions}</p>
      <strong>Total Score: ${total} / ${totalQuestions * 3}</strong>
    </div>
  `;
}

function checkAnswer(lang, selectedWord, correctWord, buttonEl) {
  const langCodes = { tamil: 'ta-IN', hindi: 'hi-IN', french: 'fr-FR' };
  speakWord(selectedWord, langCodes[lang]);

  const buttons = document.querySelectorAll(`#${lang}Options button`);
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove("correct", "wrong");
    if (btn.textContent === correctWord) btn.classList.add("correct");
    else if (btn.textContent === selectedWord) btn.classList.add("wrong");
  });

  if (selectedWord === correctWord) {
    score[lang]++;
    correctSound.play();
  } else {
    wrongSound.play();
  }

  if (lang === "french") {
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < totalQuestions) {
        loadQuestion();
      } else {
        const userName = document.getElementById("username").value || "Player";
        endGame(userName);
      }
    }, 1500);
  }

  updateScoreBox();
}

function createOptions(containerId, lang, correctAnswer) {
  const options = new Set([correctAnswer]);
  while (options.size < 3) {
    const rand = wordList[Math.floor(Math.random() * wordList.length)][lang];
    options.add(rand);
  }

  const container = document.getElementById(containerId);
  container.innerHTML = "";
  Array.from(options).sort(() => 0.5 - Math.random()).forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(lang, opt, correctAnswer, btn);
    container.appendChild(btn);
  });
}

function loadQuestion() {
  const current = selectedSet[currentQuestion];
  document.getElementById("randomWord").innerText = `Translate: ${current.word}`;
  createOptions("tamilOptions", "tamil", current.tamil);
  createOptions("hindiOptions", "hindi", current.hindi);
  createOptions("frenchOptions", "french", current.french);
}

function startGame() {
  currentQuestion = 0;
  score = { tamil: 0, hindi: 0, french: 0 };
  selectedSet = [];

  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  totalQuestions = parseInt(document.getElementById("numQuestions").value);

  let filtered = category === "all" ? [...wordList] : wordList.filter(w => w.category === category);
  if (filtered.length < totalQuestions) {
    alert("Not enough words. Showing fewer questions.");
    totalQuestions = filtered.length;
  }

  const shuffled = filtered.sort(() => 0.5 - Math.random());
  selectedSet = shuffled.slice(0, totalQuestions);

  document.getElementById("result").innerHTML = "";
  document.getElementById("winAnim").style.display = "none";
  document.getElementById("goodAnim").style.display = "none";
  document.getElementById("tryAnim").style.display = "none";

  loadQuestion();
  updateScoreBox();
}

function restartGame() {
  document.getElementById("username").value = "";
  document.getElementById("category").value = "all";
  document.getElementById("difficulty").value = "easy";
  document.getElementById("numQuestions").value = "10";
  document.getElementById("randomWord").innerText = "";
  document.getElementById("tamilOptions").innerHTML = "";
  document.getElementById("hindiOptions").innerHTML = "";
  document.getElementById("frenchOptions").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("score").innerHTML = "";
  document.getElementById("winAnim").style.display = "none";
  document.getElementById("goodAnim").style.display = "none";
  document.getElementById("tryAnim").style.display = "none";
}
