let slieder1 = document.getElementsByClassName("slieder1")
console.log(slieder1)
let iterat = 0


    setInterval(()=>{
        let moveSlides1 = document.getElementsByClassName('moveSlides')[0]
        let fullSliderWidth = slieder1[0].clientWidth*4
        let slieder1Width = slieder1[0].clientWidth
        if (slieder1Width*iterat >= fullSliderWidth) {
            iterat = 0
        } else {
            console.log(moveSlides1.style.right)
            moveSlides1.style.right = slieder1Width*iterat+'px'
            iterat += 1
            console.log(slieder1Width*iterat)
        }
    }, 3000)

function changePhoto(event,id) {
    let exampleWorks = document.getElementsByClassName('exampleWorks')[0]
    let selectSite = document.getElementsByClassName('selectSite')
    if (!Array.from(event.target.classList).includes('selectedSite')){
        if (id === 0) {
            exampleWorks.innerHTML = '<img src="assets/slider/calendar.png">'
            event.target.classList.add('selectedSite')
        }
        if (id === 1) {
            exampleWorks.innerHTML = '<img src="assets/slider/studio.png">'
            event.target.classList.add('selectedSite')
        }
        if (id === 2) {
            exampleWorks.innerHTML = '<img src="assets/slider/semicat2.png">'
            event.target.classList.add('selectedSite')
        }
    }

    Array.from(selectSite).map((x, index)=>{
        console.log(x.classList.remove)
        if (index !== id)x.classList.remove('selectedSite')
        console.log(index)
    })
}


function loadedBody(){
    let scrollSlide1 = document.querySelector('.scrollSlide1').getBoundingClientRect().y
    let scrollSlide2 = document.querySelector('.scrollSlide2').getBoundingClientRect().y
    let scrollSlide3 = document.querySelector('.scrollSlide3').getBoundingClientRect().y
    let scrollSlide4 = document.querySelector('.scrollSlide4').getBoundingClientRect().y

    addEventListener("scroll", (event)=>{
        console.log(event)
        // if (window.pageYOffset < scrollSlide2) {
        //     window.scrollTo(0,scrollSlide2)
        //     console.log(window.pageYOffset)
        // }
        // else if (window.pageYOffset > scrollSlide2 && window.pageYOffset < scrollSlide3){
        //     window.scrollTo(0,scrollSlide3)
        // }
    })
}




