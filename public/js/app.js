console.log('Client Side Javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'Location Forecast'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    const address = search.value 
    const url = `http://localhost:3000/weather?address=${address}`

    fetch(url).then((res)=> {
        res.json().then((data) => {
            if (data.error){
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})

