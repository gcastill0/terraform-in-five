let card_index = 0

let card_indices = []

const cards = document.getElementsByTagName('section')

for (let i = 0; i < cards.length; i++) {
    let a = i
    let b = i + 1

    if (b >= cards.length) {
        b = 0;
    }

    card_indices.push([a, b])
}

const dots_container = document.getElementById("dots_container")

for (let i = 0; i < cards.length - 1; i++) {
    const dot = document.createElement("div")
    dot.classList.add("dot")
    dot.setAttribute('is-active', 'false')
    dots_container.appendChild(dot)
}

const dots = document.querySelectorAll('.dot')

function show_cards(n) {

    const active_cards = document.querySelectorAll("[is-visible='true']")
    const active_dot = document.querySelector("[is-active='true']")

    if (active_dot) {
        active_dot.setAttribute('is-active', 'false')
    }

    dots[n].setAttribute('is-active', 'true')

    if (active_cards.length > 0) {
        active_cards[0].setAttribute('is-visible', 'false')
        active_cards[1].setAttribute('is-visible', 'false')
    }

    cards[card_indices[n][0]].setAttribute('is-visible', 'true')
    cards[card_indices[n][1]].setAttribute('is-visible', 'true')
}

show_cards(card_index)

dots.forEach((element, index) => {
    element.addEventListener('click', (element) => {
        if (element.target.getAttribute('is-active') == "false") {
            show_cards(index)
        }
    })
})