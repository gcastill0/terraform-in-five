window.onload = function () {

    const menu_items = document.querySelectorAll('.menu-item');
    const text_items = document.querySelectorAll('.card-overview-text');
    const svg_diagram = document.getElementById('interactive-diagram');

    menu_items.forEach(menu_item => {
        menu_item.addEventListener('click', (e) => {
            if (e.target.classList.contains('not-active')) {

                const active_menu = document.querySelector(".active")
                active_menu.classList.remove('active')
                active_menu.classList.add('not-active')

                const visible_text = document.querySelector(".visible")
                const invisible_text = document.querySelector(".invisible")

                visible_text.classList.remove('visible')
                visible_text.classList.add('invisible')

                invisible_text.classList.remove('invisible')
                invisible_text.classList.add('visible')

                menu_item.classList.remove('not-active')
                menu_item.classList.add('active')
            }
        })
    })

    // fetchSVG("plan_description.svg").then(svgDoc => {
    //     svg_diagram.appendChild(svgDoc.documentElement)
    //     const declare_code = document.getElementById('declare_code')

    //     declare_code.onmouseover = (e) => {
    //         document.documentElement.style.cssText = `
    //           --src1-bg: #199FB1;
    //         `
    //     }

    //     declare_code.onmouseout = (e) => {
    //         document.documentElement.style.cssText = `
    //           --src1-bg: #0d5c75;
    //         `
    //     }
    // })

}