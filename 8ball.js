function processQuestion(question){
    const imgEl = document.getElementById('response-img');
    const textEl = document.getElementById('response-text');
    // reset to neutral when processing a new question
    textEl.className = 'lead text-white';

    // Cancel / no input handling: only show the message when user canceled (question === null)
    if (question === null) {
        textEl.innerText = 'Please ask a question!';
        imgEl.src = '8ball.png';
        return;
    }

    // If the user submitted an empty string, ignore it (don't show the cancel message)
    if (!question.trim()) {
        return;
    }

    // start spin
    imgEl.classList.add('spin');

    // choose a random response (0..8)
    const randomNumber = Math.floor(Math.random() * 9);
    let image, color;

    switch(randomNumber){
        case 0:
            image = 'yes.png'
            color = 'text-success';
            break;
        case 1:
            image = 'no.png'
            color = 'text-danger';
            break;
        case 2:
            image = 'maybe.png'
            color = 'text-warning';
            break;
        case 3:
            image = 'notlikely.png'
            color = 'text-warning';
            break;
        case 4:
            image = 'doubtful.png'
            color = 'text-danger';
            break;
        case 5:
            image = 'cannotpredict.png'
            color = 'text-warning';
            break;
        case 6:
            image = 'askagainlater.png'
            color = 'text-muted';
            break;
        case 7:
            image = 'mostlikely.png'
            color = 'text-success';
            break;
        case 8:
            image = 'certainly.png'
            color = 'text-success';
            break;
    }

    // When the spin animation ends, remove the class and update the image
    function onAnimEnd() {
        imgEl.classList.remove('spin');
        imgEl.removeEventListener('animationend', onAnimEnd);
        imgEl.src = image;
        // Keep the prompt text color constant (white). Do not change `textEl` class here.
    }
    imgEl.addEventListener('animationend', onAnimEnd);
}

function shakeMagic8Ball(){
    // open the Bootstrap modal to collect a styled question input
    const modalEl = document.getElementById('questionModal');
    const input = document.getElementById('questionInput');
    const submitBtn = document.getElementById('questionSubmit');
    const textEl = document.getElementById('response-text');

    // Make sure Bootstrap's JS is available
    if (typeof bootstrap === 'undefined' || !modalEl) {
        // Fallback to prompt if Bootstrap isn't available
        const fallbackQ = prompt("What is your question for the Magic 8 Ball?");
        processQuestion(fallbackQ);
        return;
    }

    const modal = new bootstrap.Modal(modalEl);
    let submitted = false;
    input.value = '';
    // ensure prompt text is neutral while typing
    textEl.className = 'lead text-white';
    textEl.innerText = 'Ask A Question';
    modal.show();

    function cleanup() {
        submitBtn.removeEventListener('click', submitHandler);
        input.removeEventListener('keydown', keyHandler);
        modalEl.removeEventListener('hidden.bs.modal', onModalHidden);
    }

    function submitHandler(){
        submitted = true;
        const q = input.value;
        modal.hide();
        cleanup();
        processQuestion(q);
    }

    function keyHandler(e){
        if (e.key === 'Enter') submitHandler();
    }

    // When modal is hidden, if the user didn't submit, treat that as cancel
    function onModalHidden(){
        if (!submitted) {
            // user dismissed modal (cancel or closed)
            processQuestion(null);
        }
    }

    submitBtn.addEventListener('click', submitHandler);
    input.addEventListener('keydown', keyHandler);
    modalEl.addEventListener('hidden.bs.modal', onModalHidden);
}

