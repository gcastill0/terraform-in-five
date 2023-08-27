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

const code_snippets = [{
    "div_id": "step02",
    "code_snippet": `
Terraform used the selected providers 
to generate the following execution 
plan. Resource actions are indicated 
with the following symbols:
        + create

Terraform will perform the following 
actions:

# aws_vpc.main will be created
+ resource "aws_vpc" "main" {
  + arn              = (known after apply)
  + cidr_block       = "10.0.0.0/16"
  + id               = (known after apply)
  + instance_tenancy = "dedicated"
  + ipv6_cidr_block  = (known after apply)
  + owner_id         = (known after apply)
  + tags             = {
      + "name" = "aws-vpc-us-east-1"
    }
  }

Plan: 1 to add, 0 to change, 0 to destroy.
`
}]

window.onload = function () {

    const play_icon = document.querySelector("#play-icon path");
    const div_target = document.getElementById(code_snippets[0]["div_id"])
    div_target.innerHTML = ''
    div_target.innerHTML = code_snippets[0]["code_snippet"]

    const menu_items = document.querySelectorAll('.menu-item')
    const text_items = document.querySelectorAll('.card-overview-text')
    const svg_diagram = document.getElementById('interactive-diagram')

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

        let command_text = console_display[command_id]
        let response_text = console_display[response_id]

        const delay = 50;

        function playCommand() {
            typingEffect(command, command_text, delay);
        }

        function playResponse() {
            typingEffect(response, response_text, delay / 5);
        }

        setTimeout(playCommand, 200);
        setTimeout(playResponse, command_text.length * delay);
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