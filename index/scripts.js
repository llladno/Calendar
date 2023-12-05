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

function changePhoto(id) {
    let exampleWorks = document.getElementsByClassName('exampleWorks')[0]
    if (id === 1) {
        exampleWorks.innerHTML = '<img src="assets/slider/calendar.png">'
    }
    if (id === 2) {
        exampleWorks.innerHTML = '<img src="assets/slider/studio.png">'
    }
    if (id === 3) {
        exampleWorks.innerHTML = '<img src="assets/slider/semicat.png">'
    }

}
