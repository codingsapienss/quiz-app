let form = document.querySelector("#quizSetting");
let quizSetting = document.querySelector(".quizSetting");
let quizContainer = document.querySelector(".container");
let h = document.querySelector(".h");
let nextBtn = document.querySelector("#nextBtn");
let quitBtn = document.querySelector(".quit");
let name = document.querySelector(".name");
let option = document.querySelector(".option");

// console.log(quizSetting);
let no = 0;
let score = 0;
let values, results, ques, answer, options;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //  if(name.value && option.value){
  let formData = new FormData(form);
  values = [...formData.entries()];
  // console.log(values);
  startQuiz();
  //  }
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
  // console.log(results);
  renderQuiz();
  return results;
};

// function renderQuiz(){

// let container = document.createElement('div')
// container.classList.add('container')

//     let details = document.createElement('div')
//     details.classList.add('details')

//     let name = document.createElement('span')
//     name.classList.add('name')
//     name.textContent = `Welcome Prashant`

//     let sNc = document.createElement('div')
//     let category = document.createElement('span')
//     category.classList.add('category')
//     category.textContent = `Category : Science`

//     let score = document.createElement('span')
//     score.classList.add('score')
//     score.textContent = `Score : 0`

//     let questionNo = document.createElement('span')
//     questionNo.classList.add(questionNo)
//     questionNo.textContent=  `Question 1`

//     let question = document.createElement('h1')
//     question.classList.add('question')
//     question.textContent = `Q. What is the capital of india ?`

//     let allOption = document.createElement('div')
//     allOption.classList.add('all-option')

//     let option1 = document.createElement('div')
//     option1.classList.add('option')
//     option1.textContent = `Option 1`

//     let option2 = document.createElement('div')
//     option2.classList.add('option')
//     option2.textContent = `Option 2`

//     let option3 = document.createElement('div')
//     option3.classList.add('option')
//     option3.textContent = `Option 3`

//     let option4 = document.createElement('div')
//     option4.classList.add('option')
//     option4.textContent = `Option 4`

//     let buttons = document.createElement('div')
//     buttons.classList.add('buttons')

//     let quitBtn = document.createElement('button')
//     quitBtn.setAttribute('id', 'quit')
//     quitBtn.textContent = 'Quit'

//     let nextBtn = document.createElement('button')
//     nextBtn.setAttribute('id', 'next')
//     nextBtn.textContent = 'Next'

//     sNc.append(category)
//     sNc.append(score)

//     details.append(name)
//     details.append(sNc)
//     details.append(questionNo)

//     allOption.append(option1)
//     allOption.append(option2)
//     allOption.append(option3)
//     allOption.append(option4)

//     buttons.append(quitBtn)
//     buttons.append(nextBtn)

//     quizContainer.append(details)
//     quizContainer.append(question)
//     quizContainer.append(allOption)
//     quizContainer.append(buttons)

// }

async function renderQuiz() {
  answer = await results[no].correct_answer;
  options = [];
  ques = await results[no].question;
  await results[no].incorrect_answers.map((option) => {
    return options.push(option);
  });

  options.splice(Math.floor(Math.random() * options.length + 1), 0, answer);

  function populateQuiz() {
    quizContainer.innerHTML = "";
    quizContainer.innerHTML = 
        `<div class="details">
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
    quizContainer.innerHTML = 
      `<div class="result">
        <span>Final Score : ${score}/20 </span>
      </div>
      
      <div class="buttons">
          <button id="quit"  onclick = "quitQuiz()" >Quit</button>
      </div>
      `;
  }

  populateQuiz();

  if (no > 20) {
    renderResult();
  }
}

function nextClick() {
  no = no + 1;
  // console.log(no);
  renderQuiz();
}

function quitQuiz() {
  form.reset();
  quizSetting.setAttribute("style", "display:flex");
  // quizContainer.setAttribute("style", "display:none");
  quizContainer.innerHTML = "";
  quizContainer.setAttribute("style", "display:none");
  score = 0;
  no = 0;
  results = [{}];
}

function chechOption(event) {
  if (event.target.className === "option") {
    // console.log(event.target.textContent);
    // console.log(event.target.parentElement);
    // console.log(answer);
    // console.log(ques);
    // console.log(options);
    // console.log(values);

    if (event.target.textContent === answer) {
      event.target.classList.add("correct");
      event.target.parentElement.style = "pointer-events: none;";
      score++;
    } else if (event.target.textContent !== answer) {
      event.target.classList.add("wrong");
      event.target.parentElement.style = "pointer-events: none;";
    }
  }
}
