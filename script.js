const startButton = document.getElementById('startBtn')
const nextButton = document.getElementById('nextBtn')
const questionContainerElement = document.getElementById('questionContainer')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answerButtons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click',  () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame(){

    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5 )
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()


}


function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {   
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })

}

function resetState(){
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
   // nextButton.classList.remove('hide')
}

function setStatusClass(element, correct){
    clearStatusClass(document.body)
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Learning how to code is super fun',
        answers: [
            {text: 'true', correct: true},
            {text: 'false', correct: false}
        ]
    },
    {
        question: '______ Is an example of a Boolean Value',
        answers: [
            {text: 'true', correct: true},
            {text: '22', correct: false},
            {text: '.index', correct: false},
            {text: 'style.css', correct: false}
        ]
    },
    {
        question: '____ Is the Structure of a Website',
        answers: [
            {text: 'css', correct: false},
            {text: 'javaScript', correct: false},
            {text: '.html', correct: true},
            {text: 'jqueury', correct: false}
        ]
    }


]