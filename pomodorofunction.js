document.getElementById('notepadButton').addEventListener('click', function() {
    // Add class to body to adjust layout
    document.body.classList.add('notepadActive');

    const messages = ["Start typing...", "I like sushi...", "Today will be a good day..."];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('content').innerHTML = `<textarea placeholder="${randomMessage}" autofocus></textarea>`;
    document.getElementById('content').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
});
document.getElementById('pomodoroButton').addEventListener('click', function() {
    // Show the Pomodoro timer section
    document.querySelector('.container').style.display = 'none';
    document.getElementById('pomodoroSection').classList.remove('pomodoro-hide');
});

let timerInterval = null;
let isTimerRunning = false;
let originalMessage = "Let's get to work...";
const startTime = 25 * 60; // 25 minutes in seconds
let currentTime = startTime;

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function toggleTimer() {
    if (!isTimerRunning) {
        // Start or resume the timer
        document.getElementById('toggleButton').textContent = 'Pause';
        document.getElementById('message').textContent = originalMessage; // Reset the message
        isTimerRunning = true;
        document.body.classList.add('dim-background'); // Dim the background
        
        // Only set the interval if it's not already running
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                if (currentTime <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null; // Ensure interval is cleared
                    isTimerRunning = false;
                    document.getElementById('toggleButton').textContent = 'Start';
                    document.getElementById('message').style.display = 'block';
                    document.body.classList.remove('dim-background'); // Brighten the background
                    // Optionally reset currentTime for a break
                } else {
                    currentTime--;
                    updateTimerDisplay(currentTime);
                }
            }, 1000);
        }
    } else {
        // Pause the timer
        clearInterval(timerInterval);
        timerInterval = null; // Ensure interval is cleared
        isTimerRunning = false;
        document.getElementById('toggleButton').textContent = 'Start';
        document.body.classList.remove('dim-background'); // Brighten the background
    }
}

document.getElementById('toggleButton').addEventListener('click', toggleTimer);

document.getElementById('stopButton').addEventListener('click', function() {
    // Stop the timer and reset it
    clearInterval(timerInterval);
    timerInterval = null; // Ensure interval is cleared
    isTimerRunning = false;
    currentTime = startTime; // Reset to initial time
    updateTimerDisplay(currentTime);
    document.getElementById('toggleButton').textContent = 'Start';
    document.body.classList.remove('dim-background'); // Brighten the background
    document.getElementById('message').textContent = "Done already?";
    document.getElementById('message').style.display = 'block'; // Show the updated message});
});

