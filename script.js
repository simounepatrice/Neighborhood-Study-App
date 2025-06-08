let timer;
let minutes = 25;
let seconds = 0;
let isPaused = true;
let isRunning = false;
let enteredTime = null;

function toggleTimer(){
  const button = document.getElementById('startPauseBtn');

  if (!isRunning){
    // first time starting
    isRunning = true;
    isPaused = false;
    startiInterval();
    button.textContent = 'Pause';
  } else if (isPaused) {
    isPaused = false;
    startInterval();
    button.textContent='Pause';
  } else {
    isPaused = true;
    clearInterval(timer);
  }
}

function startInterval(){
  clearInterval(timer);
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
 const timerElement = document.getElementById('timer');
 timerElement.textContent = formatTime(minutes, seconds);


 if (minutes === 0 && seconds === 0) {
   clearInterval(timer);
   alert('Time is up!');
   return;
 }


 if (!isPaused) {
   if (seconds > 0) {
     seconds--;
   } else {
     seconds = 59;
     minutes--;
   }
 }
}

function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function restartTimer() {
  clearInterval(timer);
  minutes = enteredTime || 25;
  seconds = 0;
  isPaused = false;

  const timerElement = document.getElementById('timer');
  timerElement.textContent = formatTime(minutes, seconds);

  const pauseResumeButton = document.querySelector('.control-buttons button');
  pauseResumeButton.textContent = 'Pause';

  startTimer();
}

function chooseTime() {
  const newTime = prompt('Enter new time in minutes:');

  if (!isNaN(newTime) && newTime > 0) {
    enteredTime = parseInt(newTime);
    minutes = enteredTime;
    seconds = 0;
    isPaused = false;

    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

    const pauseResumeButton = document.querySelector('.control-buttons button');
    pauseResumeButton.textContent = 'Pause';

    clearInterval(timer);
    startTimer();
  } else {
    alert('Invalid input. Please enter a number greater than 0.');
  }
}

// Show initial time when app loads
document.addEventListener('DOMContentLoaded', () => {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = formatTime(minutes, seconds);
});

function startBreak(){
  clearInterval(timer);
  minutes = 15;
  seconds = 0;
  isPaused = false;
  isRunning = true;

  const timerElement = document.getAnimations('timer');
  timerElement.textContent = formatTime(minutes, seconds);

  const button = document.getElementById('startPauseBtn');
  button.textContent = 'Pause';

  startInterval();
}

function addTask(){
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const li = document.createElement('li');
 
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.style.cursor = 'pointer';

  taskSpan.addEventListener('click', function(){
    taskSpan.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = function (){
    li.remove();
  };

  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);
  document.getElementById('taskList').appendChild(li);
  input.value = '';
}

toggleTimer(); // Start timer on page load
