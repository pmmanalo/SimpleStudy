class App {
    constructor() {
        this.initEventListeners();
        this.timerInterval = null;
        this.isTimerRunning = false;
        this.originalMessage = "Let's get to work...";
        this.startTime = 25 * 60; // 25 minutes in seconds
        this.currentTime = this.startTime;
    }

    initEventListeners() {
        document.getElementById('notepadButton').addEventListener('click', () => this.toggleNotepad());
        document.getElementById('pomodoroButton').addEventListener('click', () => this.showPomodoro());
        document.getElementById('toggleButton').addEventListener('click', () => this.toggleTimer());
        document.getElementById('stopButton').addEventListener('click', () => this.stopTimer());
    }

    toggleNotepad() {
        document.body.classList.add('notepadActive');
        const savedContent = localStorage.getItem('notepadContent');
        const messages = ["Start typing...", "I like sushi...", "Today will be a good day..."];
        const placeholderMessage = messages[Math.floor(Math.random() * messages.length)];

        let textareaHtml = savedContent ?
            `<textarea autofocus>${savedContent}</textarea>` :
            `<textarea placeholder="${placeholderMessage}" autofocus></textarea>`;

        const contentElement = document.getElementById('content');
        contentElement.innerHTML = textareaHtml;
        contentElement.style.display = 'block';
        document.querySelector('.container').style.display = 'none';

        contentElement.querySelector('textarea').addEventListener('input', function() {
            localStorage.setItem('notepadContent', this.value);
        });
    }

    showPomodoro() {
        document.querySelector('.container').style.display = 'none';
        document.getElementById('pomodoroSection').classList.remove('pomodoro-hide');
    }

    updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        document.getElementById('timer').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    toggleTimer() {
        if (!this.isTimerRunning) {
            document.getElementById('toggleButton').textContent = 'Pause';
            document.getElementById('message').textContent = this.originalMessage;
            this.isTimerRunning = true;
            document.body.classList.add('dim-background');

            if (!this.timerInterval) {
                this.timerInterval = setInterval(() => {
                    if (this.currentTime <= 0) {
                        this.resetTimer();
                    } else {
                        this.currentTime--;
                        this.updateTimerDisplay(this.currentTime);
                    }
                }, 1000);
            }
        } else {
            this.pauseTimer();
        }
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.isTimerRunning = false;
        this.currentTime = this.startTime;
        this.updateTimerDisplay(this.currentTime);
        document.getElementById('toggleButton').textContent = 'Start';
        document.getElementById('message').style.display = 'block';
        document.body.classList.remove('dim-background');
    }

    pauseTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.isTimerRunning = false;
        document.getElementById('toggleButton').textContent = 'Start';
        document.body.classList.remove('dim-background');
    }

    stopTimer() {
        this.resetTimer();
        document.getElementById('message').textContent = "Done already?";
    }
}

// Instantiate and initialize the app
new App();
