const parser = new DOMParser();

async function fetchSVG(svg_name) {
    const response = await fetch(svg_name)
    const svgText = await response.text()
    const svgDoc = parser.parseFromString(svgText, 'text/xml')

    return svgDoc
}

async function typingEffect(element, text, speed) {
    var i = 0;
    var c = 0;

    var timer = setInterval(function () {
        if (i < text.length) {
            var ch = text.charAt(i);
            if (ch === '\n') {
                element.append(ch);
                c = 0;
            } else if (ch === '\\') {
                element.append(ch);
                linebreak = document.createElement("br");
                element.appendChild(linebreak);
                c = 0;
            }
            else if (((c > 56 && c < 65) && ch === ' ') || c >= 65) {
                element.append(ch);
                linebreak = document.createElement("br");
                element.appendChild(linebreak);
                c = 0;
            }
            else {
                element.append(ch);
            }
            i++;
            c++;
        } else {
            clearInterval(timer);
        }
    }, speed)
}

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


    const hud_play_button = document.getElementById("hud-play-button")
    const hud_terminal = document.getElementById("hud-terminal")

    let console_display = {};

    document.querySelectorAll(".bash").forEach((item) => {
        console_display[item.id] = item.innerHTML;
        item.innerHTML = "";
    });

    document.querySelectorAll(".json").forEach((item) => {
        console_display[item.id] = item.innerHTML;
        item.innerHTML = "";
    });

    let hud_display_handler = function () {
        if (hud_terminal.getAttribute("active") == "true") return;

        hud_play_button.setAttribute("active", "false")
        hud_terminal.setAttribute("active", "true")
        playStage("step01", "step02");

    }

    hud_play_button.addEventListener('click', hud_display_handler)

    if ('ontouchstart' in window) {
        menu.addEventListener("touchstart", function () {
            var touchHndl = function () {
                hud_display_handler();
                this.removeEventListener(touchHndl)
            }
            this.addEventListener(touchHndl);
        });
    }

    function playStage(command_id, response_id) {
        let command = document.querySelector("#" + command_id);
        let response = document.querySelector("#" + response_id);

        command.innerHTML = "";
        response.innerHTML = "";

        // let command_text = String(console_display[command_id]).replace(/(\s{2,})/g, " ");
        // let response_text = String(console_display[response_id]).replace(/([\n\r])/g, "NL").replace(/(\s{2,})/g, " ").replace(/NL/g, "\n");

        let command_text = console_display[command_id]
        let response_text = console_display[response_id]

        let delay = command_text.length * 100 + 1000;

        function playCommand() {
            typingEffect(command, command_text, 50);
        }

        function playResponse() {
            typingEffect(response, response_text, 2);
        }

        setTimeout(playCommand, 500);
        setTimeout(playResponse, delay);
    }

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