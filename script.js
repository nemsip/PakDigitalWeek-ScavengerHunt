// Okay wallace im not sure i can be done by the due date this is way over my head
// i have no idea what im doing i have been trying to figure this out for hours
// i have no idea how to get the data from the config.json file without overcomplicating it
//i have no idea how to make this code not be a mess and brainbarf to read
// ask mr mcleod (my computer studies teacher) for help for i am lost in this quest alone and i need guidance to find the light
// img oing to bed after i push this to github
//gn 


const ANIM_SPEED = 10;
const ANIM_INTERATIONS = 10;



document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startScavengerHunt();
    }
});

function startScavengerHunt() {
    fadeOutElements();

    // ge t section title from <title> element, im aware this is the best way to do it but f*ck it
    const sectionTitle = document.querySelector('title').id;

    // fetch questions and answers from config.json dependings on section
    fetch('config.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            return response.json();
        })
        .then(data => {
            // demo for findinh the section data in config.json based on section title
            const sectionData = data.sections.find(section => section.title.toLowerCase() === sectionTitle);
            if (!sectionData) {
                throw new Error('Section data not found');
            }
            displayScavengerHunt(sectionData.questions);
        })
        .catch(error => {
            console.error('Error fetching or displaying questions:', error);
        });
}

function displayScavengerHunt(questions) {
    // i dont even know at this point
    const firstQuestion = questions[0];
    const questionElement = document.querySelector('.question');
    questionElement.textContent = firstQuestion.question;
}

function fadeOutElements() {
    document.querySelector('.title').classList.add('fade-out');
    document.querySelector('.subtitle').classList.add('fade-out');
    document.querySelector('.begin-text').classList.add('fade-out');

    setTimeout(function() {
        document.getElementById("console").style.display = 'block';
    }, 2100); 
}

function displayConsoleOutput(textArray, elementId, delay = 500) {
    let i = 0;
    const consoleElement = document.getElementById(elementId);
    let lines = []; 

    const viewportHeight = window.innerHeight;
    const paddingTopBottom = 40 * 2; 
    const fontSize = parseFloat(getComputedStyle(consoleElement).fontSize); 
    const lineHeight = fontSize * 1.2; 
    const availableHeight = viewportHeight - paddingTopBottom;
    const maxLines = Math.floor(availableHeight / lineHeight);

    function appendLine() {
        if (i < textArray.length) {
            const line = textArray[i];
            if (line.startsWith("DELAY:")) {
                const delayTime = parseFloat(line.substring(6));
                setTimeout(function() {
                    i++;
                    appendLine();
                }, delayTime * 1000); 
            } else {
                processLine(line);
            }
        }
    }

    function processLine(line) {
        if (!line.includes("GRANTED")) {
            lines.push(line);
        }
        if (line.includes("GRANTED")) {
            showAccessGranted();
        }
    
        if (lines.length > maxLines) {
            lines.shift();
        }
        consoleElement.innerHTML = lines.join("<br>");
        i++;
        setTimeout(appendLine, delay);
    }
    

    function showAccessGranted() {
        setTimeout(function() {
            document.querySelector('.access-granted').style.display = 'block';
            hideElements();
        }, 1000); // 1sec
    }

    function hideElements() {
        setTimeout(function() {
            document.getElementById("console").style.display = 'none';
            document.getElementById("console").style.opacity = '0';
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.access-granted').style.display = 'none';

            document.getElementById("matrix").style.display = 'block';
            setTimeout(function() {
                scrambleText("matrix", 5, 100);
            }, 1000);
        }, 3000);
    }
    
    function startAnimation() {
        appendLine(); 
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startAnimation();
            observer.disconnect();
        }
    });

    observer.observe(consoleElement);
}

function scrambleText(elementId, duration, speed) {
    const element = document.getElementById(elementId);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&';
    let iterations = duration * (1000 / speed);
    let currentIteration = 0;

    element.textContent = "111111111111";

    function updateText() {
        if (currentIteration < iterations) {
            let scramble = '';
            for (let i = 0; i < element.textContent.length; i++) {
                scramble += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            element.textContent = scramble;
            currentIteration++;
            setTimeout(updateText, speed);
        } else {
            // set the final text here, doesnt work because scavengerHuntData is not even set up its 1am and i need to sleep so no time to fix this
            element.textContent = scavengerHuntData.question;
        }
    }

    updateText();
}

// function to fetch text from file. WOOORKS!!!
async function fetchTextFromFile(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error('Failed to fetch text');
        }
        const text = await response.text();
        return text.split('\n');
    } catch (error) {
        console.error('Error fetching text:', error);
        return [];
    }
}

// Fetch text from file and display console output, WORKS!!!!
fetchTextFromFile('consoleanimationtext.txt')
    .then(textArray => {
        displayConsoleOutput(textArray, 'console', 10);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// fetch questions and answers from config.json file, DOES NOT WORK AAAHH
let scavengerHuntData;
fetch('config.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        return response.json();
    })
    .then(data => {
        scavengerHuntData = data;
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
    });
