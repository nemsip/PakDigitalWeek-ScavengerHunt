var currq, section_number, question_number; // current question
const matrixElement = document.getElementById('matrix'); // i don't want to pass this through all the functions

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// minified (obviously)
function getLetterFromNumber(r,t=!0){const e=t?65:97;let o="";do{o=String.fromCharCode(e+r%26)+o,r=Math.floor(r/26)-1}while(r>=0);return o}

// Notice these run immediately, but because they don't 'await',
// the rest of the script continues to run while these download.
// The response gets 'await'ed further down when it is needed.
const fetchConfig = fetch('config.json');
const fetchText = fetch('consoleanimationtext.txt');

document.addEventListener('keydown', async function start(event) {
    if (event.key === 'Enter') {
        document.removeEventListener('keydown', start);

        // fadeOutElements
        document.querySelector('.title').classList.add('fade-out');
        document.querySelector('.subtitle').classList.add('fade-out');
        document.querySelector('.begin-text').classList.add('fade-out');
        await pause(2100);
        document.getElementById("console").style.display = 'block';

        // fetchTextFromFile
        let textArray = [];
        try {
            const response = await fetchText; // await fetch('consoleanimationtext.txt');
            if (!response.ok) {
                throw new Error('Failed to fetch text');
            }
            const text = await response.text();
            textArray = text.split('\n');
        } catch (error) {
            console.error('Error fetching text:', error);
        }

        // displayConsoleOutput
        const delay = 10;
        const consoleElement = document.getElementById('console');
        let lines = []; 

        const viewportHeight = window.innerHeight;
        const paddingTopBottom = 40 * 2; 
        const fontSize = parseFloat(getComputedStyle(consoleElement).fontSize); 
        const lineHeight = fontSize * 1.2; 
        const availableHeight = viewportHeight - paddingTopBottom;
        const maxLines = Math.floor(availableHeight / lineHeight);

        // appendLine
        for (const line of textArray) {
            if (line.startsWith("DELAY:")) {
                const delayTime = parseFloat(line.substring(6));
                await pause(delayTime * 1000);
            } else {

                // processLine
                if (!line.includes("GRANTED")) {
                    lines.push(line);
                } else {
                    break; // showAccessGranted could be here, but the indentation was building up
                }
                if (lines.length > maxLines) {
                    lines.shift();
                }
                consoleElement.innerHTML = lines.join("<br>");
                await pause(delay);
            }
        }
        
        // showAccessGranted
        await pause(1000);
        document.querySelector('.access-granted').style.display = 'block';

        // hideElements
        await pause(3000);
        document.getElementById("console").style.display = 'none';
        document.getElementById("console").style.opacity = '0';
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.access-granted').style.display = 'none';
        document.getElementById("matrix").style.display = 'block';
        await pause(1000);

        // scrambleText
        const element = matrixElement;
        const duration = 5;
        const speed = 100;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&';
        const iterations = duration * (1000 / speed);
        element.textContent = "111111111111";

        // updateText
        for (let currentIteration = 0; currentIteration < iterations; currentIteration++) {
            let scramble = '';
            for (let i = 0; i < element.textContent.length; i++) {
                scramble += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            element.textContent = scramble;
            await pause(speed);
        }

        let scavengerHuntData;
        try {
            const response = await fetchConfig; // fetch('config.json');
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            scavengerHuntData = await response.json();
        } catch (error) {
            console.error('Error fetching questions:', error);
        }

        section_number = 0;
        question_number = 0;
        currq = scavengerHuntData.sections[section_number].questions[question_number];

        // TODO: Do something with scavengerHuntData
        element.textContent = currq.question;

        questionPopup(element, currq, section_number, question_number);
    }
});

async function questionPopup(parent, q, snum, qnum) {
    // TODO: unscramble and animation
    const boxesparent = document.createElement("div");
    boxesparent.classList.add("btn-boxes");

    opts = q.options;

    for (let i = 0; i < opts.length; i++) {
        const elm = document.createElement("div");

        elm.classList.add("btn-box");
        elm.dataset.ansLetter = getLetterFromNumber(i);

        boxesparent.appendChild(elm);
    }

    parent.appendChild(boxesparent);

    for (let i = 0; i < boxesparent.children.length; i++) {
        elm = boxesparent.children[i];
        elm.addEventListener("click", (e) => {answerClicked(e.target.dataset.ansLetter, q, snum, qnum)});

        elm = boxesparent.children[i];
        await typeText(elm, opts[i]);
    }
}

var i = {};

async function typeText(elm, txt) {
    for (let i = 0; i < txt.length; i++) {
        elm.innerHTML += txt.charAt(i);
        await pause(randomNumber(10, 30));
    }
    return true;
}

function answerClicked(clicked, q, snum, qnum) {
    if(q.correct_answer == clicked) {
        alert("correct");
        // TODO: go to next question, keep track of score
    } else {
        alert("incorrect");
        // TODO: tell user off then go to next question, keep track of score
    }
}

function nextQuestion(currentS, currentQ) {
    const sectionQuestions = scavengerHuntData.sections[currentS].questions;
    if(sectionQuestions.length >= currentQ) {
        if(scavengerHuntData.sections[currentS+1]) {
            return nextQuestion(currentS+1,0);
        } else {
            return false;
        }
    } else {
        return true;
    }
}