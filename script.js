var scavengerHuntData;
var currq, section_number, question_number; // current question
const matrixElement = document.getElementById('matrix'); // i don't want to pass this through all the functions
var questionsCorrect = questionsIncorrect = 0;
var autoCycleSections = true;
let currentHash = window.location.hash;
var كود_رائع_للغاية_خاص_للغاية_مذهل_للغاية = "there is no code for this question";
var hint;

function playAudio() {
  document.querySelector("#bgAudio").play();
}

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

function reloadIfNotSameHash() {
    if(currentHash != window.location.hash) {
        currentHash = window.location.hash;
        window.location.reload();
    }
    setTimeout(reloadIfNotSameHash, 100);
}

document.addEventListener("DOMContentLoaded", async () => {
    reloadIfNotSameHash();

    section_number = 0;
    question_number = 0;

    windowhash = window.location.hash.toLowerCase();
    if(windowhash == "#misinformation") {
        section_number = 0;
        autoCycleSections = false;
        كود_رائع_للغاية_خاص_للغاية_مذهل_للغاية = "EET";
        document.querySelector("#subtitle-txt").innerText = "MISINFORMATION";
    } else if(windowhash == "#onlinesafety") {
        section_number = 1;
        autoCycleSections = false;
        كود_رائع_للغاية_خاص_للغاية_مذهل_للغاية = "GIK";
        document.querySelector("#subtitle-txt").innerText = "ONLINE SAFETY";
    } else if(windowhash == "#2fa") {
        section_number = 2;
        autoCycleSections = false;
        كود_رائع_للغاية_خاص_للغاية_مذهل_للغاية = "LAW";
        document.querySelector("#subtitle-txt").innerText = "2 FACTOR AUTHENTICATION";
    } else if(windowhash == "#searchhistory") {
        section_number = 3;
        autoCycleSections = false;
        كود_رائع_للغاية_خاص_للغاية_مذهل_للغاية = "EID";
        document.querySelector("#subtitle-txt").innerText = "SEARCH HISTORY";
    } else if(windowhash != "#all") {
        window.location.href = "/choose-type.html";
        document.body.style.display = "none";
    } else {
        document.querySelector(".subtitle").style.display = "none";
    }

    // make sure section/questions are loaded before loading event listener

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

            try {
                const response = await fetchConfig; // fetch('config.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                scavengerHuntData = await response.json();
            } catch (error) {
                console.error('Error fetching questions:', error);
            }

            currq = scavengerHuntData.sections[section_number].questions[question_number];
            element.textContent = currq.question;

            await showQuestion_Prep(currq);

            nextQuestion(section_number, question_number-1)
            questionPopup(element, currq, section_number, question_number);
        }
    });
})

async function questionPopup(parent, q, snum, qnum) {
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

async function answerClicked(clicked, q, snum, qnum) {
    // nextQ = nextQuestion(snum, qnum);

    if(q.correct_answer == clicked) {
        questionsCorrect++;
        await statusSwitcher(true);
    } else {
        questionsIncorrect++;
        await statusSwitcher(false);

        /* DONT DO THIS // retry:
        console.log("Retrying question..")
        nextQ = nextQuestion(snum, qnum, false);*/
    }

    // continue:
    var nextQ = nextQuestion(snum, qnum);
    if(nextQ == "complete") {
        // ...
        const questionTotal = questionsCorrect+questionsIncorrect;
        const correctPercent = (100 * questionsCorrect) / questionTotal;
        if(correctPercent >= 80) {
          alert("Done! " + Math.round(correctPercent) + "% correct. The code for this section is: " + كود_رائع_للغاية_خاص_للغاية_مذهل_للغاية + " (remember to write it down!)");
          window.location.reload();
        } else {
          alert("Your score of " + correctPercent + "% did not reach the minimum 80% to get the code. Try taking this quiz again.");
          window.location.reload();
        }
    } else {
        const nextQInfo = scavengerHuntData.sections[nextQ[0]].questions[nextQ[1]];
        await showQuestion_Prep(nextQInfo);
        await pause(1200);
        questionPopup(matrixElement, nextQInfo, nextQ[0], nextQ[1]);
    }
}

async function showQuestion_Prep(currq) {
    // reset parent
    matrixElement.innerHTML = "";
    await unscrambleText(matrixElement, currq.question, 100);
}

async function statusSwitcher(correct) {
    matrixElement.innerHTML = "";
    if(correct) {
        matrixElement.textContent = "CORRECT";
        return pause(3500);
    } else {
        matrixElement.innerHTML = "<span class='text-incorrect'>INCORRECT</span>";
        return pause(7500);
    }
}

function nextQuestion(currentS, currentQ, progress = true) {
    const sectionQuestions = scavengerHuntData.sections[currentS].questions;
    if(currentQ+1 >= sectionQuestions.length) {
        if(scavengerHuntData.sections[currentS+1] && autoCycleSections) {
            // TODO: NEW SECTION, DO STUFF ...
            if(progress) {
              return nextQuestion(currentS+1,-1);
            } else {
              return [currentS, currentQ];
            }
        } else {
            if(progress) {
              return "complete";
            } else {
              return [currentS, currentQ];
            }
        }
    } else {
      if(progress) {
        return [currentS, currentQ+1];
      } else {
        return [currentS, currentQ];
      }
    }
}

function getRandomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

async function unscrambleText(elm, finalText, interval = 300) {
    let currentText = finalText.split('').map(char => char === ' ' ? ' ' : 'X').join('');
    elm.innerText = currentText;

    for (let i = 0; i <= finalText.length; i++) {
        await pause(interval);

        currentText = finalText.split('').map((char, idx) => {
            if (idx < i || char === ' ') {
                return char;
            } else {
                return getRandomChar();
            }
        }).join('');

        elm.textContent = currentText;
    }

    elm.textContent = finalText;
    return true;
}
