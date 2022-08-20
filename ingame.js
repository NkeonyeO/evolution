const question = document.querySelector('#question');
const options = Array.from(document.querySelectorAll('.option-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarOcuupied = document.querySelector('#progressBarOccupied');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which of the following is not a common misconception about Human Evolution?",
        option1: "Traits evolve in individuals",
        option2: "Humans influence Evolution",
        option3: "Humans are descended from monkeys",
        option4: "Evolution is directed with a particular end goal in mind",
        answer: 2,
    },

    {
        question: "What makes religion compatible with evolution?",
        option1: "Good religion needs to work constructibely with good science",
        option2: "Religion is incompatible with evolution",
        option3: "Evolution is a theory about the origin of life",
        option4: "Religion happened because of evolution",
        answer: 1,

    },

    {
        question: "what makes the common misconception that evolution can't explain comples organs, False?",
        option1: "this is not a common misconception",
        option2: "Face structure",
        option3: "there is no way to explain it",
        option4: "evolution of the eye, organs that allow detection of light were favoured by natural selection",
        answer: 4,

    },

    {
        question: "Is natural selection Purposeful?",
        option1: "Yes it is, natural selections happens on purpose and turns all living organisms into one super creature",
        option2: "No it isn't, natural selection can randomly favour the best of what is available, but it does not purposefully turn all living organisms into one super creature",
        option3: "Yes it is, natural selection has to be purposeful for human evolution to work",
        option4: "Natural selection can be purposeful and can be random",
        answer: 2,

    },

    {
        question: "Why can't we say that evolution is just a theory?",
        option1: "we can, evolution is just a theory",
        option2: "because scientist said so" ,
        option3: "it is much more than just a theory. theory is a well-supported explanation for a phenomenon in a natural world",
        option4: "It is just theory, that is why scientist's call it the 'theory of evolution' ",
        answer: 3,

    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarOcuupied.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    options.forEach(option => {
        const number = option.dataset['number']
        option.innerText = currentQuestion['option' + number]
    
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

options.forEach(option => {
    option.addEventListener('click', e=>  {
        if(!acceptingAnswers) return 

        acceptingAnswers = false
        const selectedOption = e.target
        const selectedAnswer = selectedOption.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedOption.parentElement.classList.add(classToApply)

        setTimeout ( () => {
            selectedOption.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
