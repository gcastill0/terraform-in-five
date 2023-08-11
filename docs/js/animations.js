
const animated_area_1 = document.getElementById('card-animated-area-1')
const animated_elements = document.querySelectorAll('.section-one .animated-iac-section')
const hidden_elements = document.querySelectorAll('[is-hidden="true"]')
const section_one = document.querySelector('.section-one')
const section_two = document.querySelector('.section-two')
const animated_card_header = document.getElementById('animation-card-header')
const section_one_breaker = document.getElementById('section-one-breaker')
var animation_running = false

animated_area_1.addEventListener('click', () => {

    if (animation_running) {
        return;
    }

    animation_running = true

    var animation = anime.timeline({
        easing: 'easeOutExpo',
        duration: 5000
    });

    animation
        .add({
            targets: animated_elements,
            // borderRadius: ['11px', '50%'],
            width: ['150px', '75px'],
            height: ['50px', '55px'],
            easing: 'easeInOutQuad',
            duration: 1000
        })
        .add({
            targets: [animated_elements[0], animated_elements[1], animated_elements[4]],
            translateY: function (el, i) {
                if (i > 1) {
                    return (section_one.getBoundingClientRect().y + 150 - el.getBoundingClientRect().y)
                }
                return (section_one.getBoundingClientRect().y + 50 - el.getBoundingClientRect().y)
            },
            translateX: function (el, i) {
                if (i == 2) {
                    return (section_one.getBoundingClientRect().x + 14 + ((2) * 100) - el.getBoundingClientRect().x)
                }
                return (section_one.getBoundingClientRect().x + 14 + ((i % 2) * 100) - el.getBoundingClientRect().x)
            },
            easing: 'easeInOutQuad',
            delay: 500,
            duration: 1000
        })
        .add({
            targets: [animated_elements[5], animated_elements[6], animated_elements[2], animated_elements[3], animated_elements[7]],
            translateY: function (el, i) {
                if (i > 1) {
                    return (section_one.getBoundingClientRect().y + 450 - el.getBoundingClientRect().y)
                }
                return (section_one.getBoundingClientRect().y + 350 - el.getBoundingClientRect().y)
            },
            translateX: function (el, i) {
                if (i == 4) {
                    return (section_one.getBoundingClientRect().x + 14 + ((2) * 100) - el.getBoundingClientRect().x)
                }
                return (section_one.getBoundingClientRect().x + 14 + ((i % 2) * 100) - el.getBoundingClientRect().x)
            },
            easing: 'easeInOutQuad',
            opacity: ["1"],
            delay: 5000,
            duration: 1000,
        })
        .add({
            targets: ['.animation-header', '.breaker'],
            delay: 1000,
            duration: 1000,
            translateY: -75
        })
        .add({
            targets: hidden_elements,
            update: function () {
                animated_card_header.innerHTML = `<p>State Comparison</p>`
            },
            opacity: ["1"]
        })
})