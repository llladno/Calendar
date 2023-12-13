const line = document.getElementsByClassName('line')[0]
let wi = window.innerWidth
let wistart = wi
let sendMail = document.getElementsByClassName('sendMail')[0]
let rotateel = document.querySelector('.rotateel')
let catalogcard = document.getElementsByClassName('catalogcard')
wi = 0
let cars = document.querySelector('.cars')
let img = document.querySelector('.img')

setInterval(() => {
    wi = wi + window.innerWidth
    if (wi >= wistart * 4) {
        line.style.transitionDuration = '0s';
        wi = 0
    }
    else{
        line.style.transitionDuration = '1s';
    }
    line.style.left = -wi + 'px'

}, 5000)
let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

let circles = document.getElementsByClassName('circle')

addEventListener("scroll", (event) => {
    let all4 = scrollHeight / 3
    if (window.scrollY < all4) {
        let a
        a = (window.scrollY * 100) / all4
        let roun = Math.round(a)
        circles[0].style.opacity = 20 + roun + "%"
        circles[1].style.opacity = 100 + 50 - roun + "%"
    } else if (window.scrollY < all4 * 2) {
        let a
        a = (window.scrollY * 100) / (all4 * 2)
        let roun = Math.round(a)
        circles[1].style.opacity = roun + "%"
        circles[2].style.opacity = 100 + 50 - roun + "%"

    }
    // else if (window.scrollY < all4 * 3) {
    //     let a
    //     console.log(3)
    //     a = (window.scrollY * 100) / (all4 * 4)
    //     console.log(a)
    //     let roun = Math.round(a)
    //     circles[2].style.opacity = 100 + 50 - roun + "%"
    // }

    // console.log(window.scrollY)
});

function init() {
    let map = new ymaps.Map('map', {
        center: [59.886243, 30.386548],
        zoom: 13

    })
    let placemark = new ymaps.Placemark([59.886243, 30.386548], {}, {
        iconLayout: 'default#image',
        iconImageHref: './img/AboutUs/placeholder.png',
        iconImageSize: [25, 25],
        iconImageOffset: [0, 0]
    })
    map.geoObjects.add(placemark)
}
ymaps.ready(init)

sendMail.onclick = ()=> {
    let name = document.getElementsByClassName('name')[0]
    let email = document.getElementsByClassName('email')[0]
    let maintext = document.getElementsByClassName('textar')[0]
    let mail = {
        text: maintext.value,
        name: name.value,
        email: email.value,
    };
    if ((maintext.value && name.value && email.value) != '') {
        async function sendMail() {
            let response = await fetch('./mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(mail)
            });
        }

        sendMail()
    } else {
        if (name.value == '') {
            name.style.border = '2px solid red'
            name.style.transition = 'all ease 1s';
        }
        else {
            name.style.border = '2px solid white'
        }
        if (maintext.value === '') {
            maintext.style.border = '2px solid red'
            maintext.style.transition = 'all ease 1s';
        }
        else {
            maintext.style.border = '2px solid white'
        }
        if (email.value === '') {
            email.style.border = '2px solid red'
            email.style.transition = 'all ease 1s';
        }
        else {
            email.style.border = '2px solid white'
        }
    }
}

window.onresize = function(event) {
    let wi = window.innerWidth
    if(window.innerWidth < 481){
        if(wi % 25 == 0){
            window.scrollTo(0,0);
        }
    }
    else {
        window.location.reload()
        window.scrollTo(0,0);
    }

        // document.querySelectorAll("link[rel=stylesheet]").forEach(link => link.href = link.href.replace(/\?.*|$/, "?" + Date.now()))


};

catalogcard[0].addEventListener('click',()=>{
    rotateel.textContent = 'БУЛЬДОЗЕРЫ'
    cars.innerHTML = `
                                                <p>SEM816D</p>
                                            <p>SEM816D LGP</p>
                                            <p>SEM816D FR</p>
                                            <p>SEM822</p>
                                            <p>SEM822LGP</p>
                                            <p>SEM822D FR</p>
                                            <p>SEM826D</p>`

    for (let c = 1; c < catalogcard.length;c++){
        catalogcard[c].style.backgroundColor='#1F1F1FFF'
        catalogcard[c].classList.remove('selected')
        catalogcard[c].onmouseover = function () {
            catalogcard[c].classList.add('hover');
        };
        catalogcard[c].onmouseleave = function () {
            catalogcard[c].classList.remove('hover');
        }
    }
    catalogcard[0].classList.add('selected')
    rotateel.style.left = '120px'
    catalogcard[0].style.backgroundColor='#343434'
    img.src='img/Бульдозер.JPG'

})
catalogcard[1].addEventListener('click',()=>{
    img.src='img/погрузчик.jpeg'
    rotateel.textContent = 'ПОГРУЗЧИКИ'
    cars.innerHTML = `
                                                <p>SEM636D</p>
                                            <p>SEM653D    </p>
                                            <p>SEM655D</p>
                                            <p>SEM660D</p>
                                            <p>SEM668D</p>`

    for (let c = 0; c < catalogcard.length;c++){
        if(c != 1)
        {catalogcard[c].style.backgroundColor='#1F1F1FFF'
            catalogcard[c].classList.remove('selected')
            catalogcard[c].onmouseover = function () {
                catalogcard[c].classList.add('hover');
            };
            catalogcard[c].onmouseleave = function () {
                catalogcard[c].classList.remove('hover');
            }
        }
        }
    rotateel.style.left = '120px'
    catalogcard[1].classList.add('selected')
    catalogcard[1].style.backgroundColor='#343434'
})
catalogcard[2].addEventListener('click',()=>{
    cars.innerHTML = `<p>SEM915</p>
                                            <p>SEM917</p>
                                            <p>SEM919</p>
                                            <p>SEM922AWD</p>`

    for (let c = 0; c < catalogcard.length;c++){
        if(c != 2){
            catalogcard[c].style.backgroundColor='#1F1F1FFF'
            catalogcard[c].classList.remove('selected')
            catalogcard[c].onmouseover = function () {
                catalogcard[c].classList.add('hover');
            };
            catalogcard[c].onmouseleave = function () {
                catalogcard[c].classList.remove('hover');
            }
        }
    }
    rotateel.style.left = '100px'
    img.src='img/Грейдер.jpeg'
    catalogcard[2].classList.add('selected')
    rotateel.textContent = 'ГРЕЙДЕРЫ'
    catalogcard[2].style.backgroundColor='#343434'
})
catalogcard[3].addEventListener('click',()=>{
    rotateel.textContent = 'КАТКИ'
    cars.innerHTML = `
                                                <p>SEM512</p>
                                            <p>SEM518</p>
                                            <p>SEM816D FR</p>
                                            <p>SEM822</p>
                                            <p>SEM822LGP</p>
                                            <p>SEM822D FR</p>
                                            <p>SEM826D</p>`

    for (let c = 0; c < catalogcard.length-1;c++){
        catalogcard[c].style.backgroundColor='#1F1F1FFF'
        catalogcard[c].classList.remove('selected')
        catalogcard[c].onmouseover = function () {
            catalogcard[c].classList.add('hover');
        };
        catalogcard[c].onmouseleave = function () {
            catalogcard[c].classList.remove('hover');
        }
    }
    img.src='img/Дорожный каток.jpeg'
    rotateel.style.left = '50px'
    catalogcard[3].classList.add('selected')
    catalogcard[3].style.backgroundColor='#343434'
})


