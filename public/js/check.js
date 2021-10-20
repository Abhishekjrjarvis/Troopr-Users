var navbarBrand = document.querySelector('.navbar-brand')



const changeColor = async () =>{
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    let color = `rgb(${r}, ${g}, ${b})`
    navbarBrand.style.color = color
}


const setColor = setInterval(() =>{
    changeColor()
}, 1000)