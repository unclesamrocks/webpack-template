const myButton = {
    draw: '<button id="my-button">Нажми меня</button>',
    el: ()=>{
        document.getElementById('my-button').addEventListener('click', ()=>{
            // debugger;
            console.log('clicked');
        })
    }
}

export default myButton;