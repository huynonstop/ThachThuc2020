const scoreEle = document.querySelector("header h1");
const timerEle = document.querySelector("footer h1");
const startBtn = document.querySelector("#startBtn");
const trueBtn = document.querySelector("#answerCorrect");
const falseBtn = document.querySelector("#answerFalse");
const gameElement = document.querySelector("#gameZone");
const initElement = document.querySelector("#initZone");
function* shuffle(array) {
	let i = array.length;
	while (i--) {
		yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
	}
}
class App {
	static start() {
		initElement.style.display = "none";
		gameElement.style.display = "block";
		const time = document.querySelector("#time").value;
		this.GAMESTART = true;
		this.wordCount = [];
		this.wordTrue = [];
		this.wordFalse = [];
		this.wordList = shuffle([...keyword]);
		this.timer = 0;
		this.timerInterval = setInterval(() => {
			this.timer += 1;
			this.updateTimer();
			if (this.timer > time) this.gameOver();
		}, 1000);
		this.updateScore();
		this.next();
	}
	static updateScore() {
		scoreEle.textContent = `${this.wordTrue.length}/${this.wordCount.length}`;
	}
	static updateTimer() {
		timerEle.textContent = `
    ${String(Math.floor(this.timer / 60)).padStart(2, "0")}
    :
    ${String(this.timer % 60).padStart(2, "0")}`;
	}
	static answer(mode) {
		const word = document.querySelector("#word").innerHTML;
		this[mode].unshift(word);
		this.wordCount.unshift(word);
		this.updateScore();
		document.querySelector("header .progress-bar").style.width = `${
			(this.wordTrue.length / this.wordCount.length) * 100
		}%`;
		if (!this.checkGame()) return this.gameOver();
		else return this.next();
	}
	static next() {
		const result = this.wordList.next().value;
		document.querySelector("#word").innerHTML = result;
		return result;
	}
	static checkGame() {
		const maxWord = document.querySelector("#maxWord").value;
		if (this.wordCount.length >= +maxWord) return false;
		return true;
	}
	static gameOver() {
		initElement.style.display = "flex";
		gameElement.style.display = "none";
		clearInterval(this.timerInterval);
	}
}
startBtn.addEventListener("click", () => {
	App.start();
});
startBtn.addEventListener("touchstart", () => {
	App.start();
});
trueBtn.addEventListener("click", () => {
	App.answer("wordTrue");
});
falseBtn.addEventListener("click", () => {
	App.answer("wordFalse");
});
