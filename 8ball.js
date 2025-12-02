function shakeMagic8Ball(){
    const question = prompt("What is your question for the Magic 8 Ball?");

    if(question === null){
        document.getElementById('response-text').innerText = 'Please ask a question!'
        document.getElementById('response-text').classList = 'lead text-warning'
        document.getElementById('response-img').src = '8ball.png'
    }

    if(!question.trim()){
        alert('Please ask a valid question!')
    }


    const randomNumber = Math.floor(Math.random()*8);
    let image, color;

    switch(randomNumber){
        case 0:
            image = 'yes.png'
            color = 'text-success';
            break;
        case 1:
            image = 'no.png'
            color = 'text-success';
            break;
        case 2:
            image = 'maybe.png'
            color = 'text-success';
            break;
        case 3:
            image = 'notlikely.png'
            color = 'text-success';
            break;
        case 4:
            image = 'doubtful.png'
            color = 'text-success';
            break;
        case 5:
            image = 'cannotpredict.png'
            color = 'text-success';
            break;
        case 6:
            image = 'askagainlater.png'
            color = 'text-success';
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

       
        document.getElementById('response-img').src = image

}