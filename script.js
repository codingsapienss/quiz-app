let form = document.querySelector("#quizSetting");
let quizSetting = document.querySelector(".quizSetting");
let quizContainer = document.querySelector(".container");
let h = document.querySelector(".h");
let nextBtn = document.querySelector("#nextBtn");
let quitBtn = document.querySelector(".quit");
let name = document.querySelector(".name");
let option = document.querySelector(".option");

let no = 0;
let score = 0;
let values, results, ques, answer, options;


form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  values = [...formData.entries()];
  startQuiz();
});



function startQuiz() {
  quizSetting.setAttribute("style", "display:none");
  quizContainer.setAttribute("style", "display:flex");
  fetchQuiz();
}

let fetchQuiz = async () => {
  let data = await fetch(
    `https://opentdb.com/api.php?amount=22&category=${values[1][1]}&difficulty=${values[2][1]}&type=multiple`
  );
  let parsedData = await data.json();
  results = parsedData.results;
  renderQuiz();
  return results;
};


async function renderQuiz() {
  answer = await results[no].correct_answer;
  options = [];
  ques = await results[no].question;
  await results[no].incorrect_answers.map((option) => {
    return options.push(option);
  });

  options.splice(Math.floor(Math.random() * options.length + 1), 0, answer);

  populateQuiz();

  if (no > 20) {
    renderResult();
  }
}

function populateQuiz() {
  quizContainer.innerHTML = `<div class="details">
              <span class="name">Welcome ${values[0][1]}</span>

              <div class="sNc">
                <span class="category"> Category : ${values[1][1]} </span>
                <span class="score">Score :${score}</span>
              </div>

              <span class="questionNo"> Question ${no + 1}</span>
        </div>

        <h1 class="question"> ${ques} </h1>
  
        <div class="all-options" onclick="chechOption(event)">
            <div class="option">${options[0]}</div>
            <div class="option">${options[1]}</div>
            <div class="option">${options[2]}</div>
            <div class="option">${options[3]}</div>
        </div>

        <div class="buttons">
            <button id="quit" onclick = "quitQuiz()" >Quit</button>
            <button id="nextBtn" onclick = "nextClick()">Next</button>
        </div>
    `;
}

function renderResult() {
  quizContainer.innerHTML = `<div class="result">
      <span>Final Score : ${score}/20 </span>
    </div>
    
    <div class="buttons">
        <button id="quit"  onclick = "quitQuiz()" >Quit</button>
    </div>
    `;
}

function nextClick() {
  no = no + 1;
  renderQuiz();
}

function quitQuiz() {
  form.reset();
  quizSetting.setAttribute("style", "display:flex");
  quizContainer.innerHTML = "";
  quizContainer.setAttribute("style", "display:none");
  score = 0;
  no = 0;
  results = [{}];
}

function chechOption(event) {
  if (event.target.className === "option") {
    if (event.target.textContent === answer) {
      event.target.classList.add("correct");
      event.target.parentElement.style = "pointer-events: none;";
      score = score + 1;
      document.querySelector(".score").textContent = `Score :${score}`;
    } else if (event.target.textContent !== answer) {
      event.target.classList.add("wrong");
      [...event.target.parentElement.children].map((i) => {
        if (i.textContent === answer) {
          i.classList.add("correct");
        }
      });
      event.target.parentElement.style = "pointer-events: none;";
    }
  }
}
