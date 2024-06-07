function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        const element = document.getElementById('matrix');
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

        // TODO: Do something with scavengerHuntData
        element.textContent = scavengerHuntData.sections[0].questions[0].question;
    }
});
