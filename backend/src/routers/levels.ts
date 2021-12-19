import { IProblem } from "../models/Game";

const multiplySign = String.fromCharCode(215);
const divideSign = String.fromCharCode(247);

function initProblem() : IProblem {
    return {
        question: null,
        answer: null
    }
}


/* gets integer from @from (inclusive) to @to (excluive) */
function getInteger(from : number, to: number) : number {
    const min = Math.ceil(from);
    const max = Math.floor(to);
    return Math.floor(Math.random() * (max - min) + min); //  max is exclusive, min is inclusive
}

/* easy addition */
function level1 () : IProblem {
    let problem  = initProblem();

    const num1 = getInteger(2, 12);
    const num2 = getInteger(2, 12);
    problem.question = `${num1} + ${num2} =`
    problem.answer = num1 + num2;
    return problem
}

/* slightly harder addition or subtraction */
function level2 () : IProblem {
    let problem  = initProblem();
    const num1 = getInteger(8, 30)
    let num2 : number;
    const isAddition = getInteger(0, 2);
    if (isAddition) {
        num2 = getInteger(8, 20)
        problem.question = `${num1} + ${num2} =`
        problem.answer = num1 + num2
    } else {
        num2 = getInteger(3, 11)
        problem.question = `${num1} - ${num2} =`
        problem.answer = num1 - num2
    }
    return problem
}

/* multiplication */
function level3 () : IProblem {
    let problem  = initProblem();
    const num1 = getInteger(2, 12);
    const num2 = getInteger(2, 12);
    problem.question = `${num1} ${multiplySign} ${num2} =`
    problem.answer = num1 * num2
    return problem
}

/* hard subtraction, easy division */
function level4 () : IProblem {
    const isSubtraction = getInteger(0, 2);
    let problem  = initProblem();
    if (isSubtraction) {
        const num1 = getInteger(11, 40)
        const num2 = getInteger(11, 25)
        problem.question = `${num1} - ${num2} = `
        problem.answer = num1 - num2;
    } else {
        const num1 = getInteger(2, 12);
        const ans = getInteger(2, 12)
        problem.question = `${num1 * ans} ${divideSign} ${num1} = `
        problem.answer = ans
    }
    return problem
}

/* 2 easy operations */
function level5 () : IProblem {
    const op1isAddition = getInteger(0, 2)
    let op1;
    let op2;
    if (op1isAddition) {
        op1 = "+"
        op2 = "-"
    } else {
        op1 = "-"
        op2 = "+"
    }
    let num1; let num2; let num3;
    num1 = getInteger(8, 23);
    num2 = getInteger(8, 23);
    num3 = getInteger(8, 23);
    let problem  = initProblem();
    problem.question = `${num1} ${op1} ${num2} ${op2} ${num3} = `
    problem.answer = op1isAddition ? (num1 + num2 - num3) : (num1 - num2 + num3)
    return problem
}

/* 2 hard operations */
function level6 () : IProblem {
    const isAddDivide = getInteger(0, 2)
    let op1; let op2;
    let num1; let num2; let num3;
    let problem  = initProblem();
    if (isAddDivide) {
        op1 = "+"
        op2 = divideSign
        num3 = getInteger(3, 13)
        problem.answer = getInteger(3, 13)
        num2 = getInteger(4, num3 * problem.answer - 3)
        num1 = num3 * problem.answer - num2
    } else {
        op1 = "-"
        op2 = multiplySign
        num3 = getInteger(3, 13)
        const num1MinusNum2 = getInteger(3, 13)
        num2 = getInteger(6, 25)
        num1 = num1MinusNum2 + num2
        problem.answer = num3 * num1MinusNum2
    }
    problem.question = `(${num1} ${op1} ${num2}) ${op2} ${num3} = `
    return problem
}

function generateProblems (level: number): IProblem[] {
    let questions : IProblem[] = []
    console.log(`NUMBER ${level}`)
    let getQuestion : () => IProblem;
    if (level === 1) {
        getQuestion = level1
    } else if (level === 2) {
        getQuestion = level2
    } else if (level === 3) {
        getQuestion = level3
    } else if (level === 4) {
        getQuestion = level4
    } else if (level === 5) {
        getQuestion = level5
    } else {
        getQuestion = level6
    }

    console.log('DONE')
    for (let i = 0; i < 200; i++) {
        questions.push(getQuestion())
    }
    console.log(questions[0])
    return questions;
};

export default generateProblems;