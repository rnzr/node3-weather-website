



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    fetch('/weather?location='+location).then((response)=>{
    response.json().then((data)=> {
        if(data.error) {
            console.log(data.error);
            messageOne.textContent = data.error;
            messageTwo.textContent = "";
        }
        else {
            messageOne.textContent = "";
            messageTwo.textContent = "In "+data.address+" beträgt die aktuelle Temperatur: "+data.temperature+" Grad Celsius. Jedoch fühlt es sich eher nach "+data.feelslike+" Grad Celsius an. Die Luftfeuchtigkeit liegt bei "+data.humidity+"%. Wussten Sie dass "+data.address+" in "+data.country+" liegt? Wieder was gerlernt! :)";
            console.log(data.address);
            console.log(data.temperature);
    }  
    })
})
})