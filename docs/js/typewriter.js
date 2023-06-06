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

// let command_txt   = command_e.innerHTML.replace(/([\n\r])/g, "~").replace(/\s{2,}/g, " ").replace(/~/g, "\n");
// let response_text = response_e.innerHTML.replace(/([\n\r])/g, "~").replace(/\s{2,}/g, " ").replace(/~/g, "\n");

function playStage(command_id, response_id) {
  let command = document.querySelector("#" + command_id);
  let response = document.querySelector("#" + response_id);

  command.innerHTML = "";
  response.innerHTML = "";

  let command_text = console_display[command_id];
  let response_text = console_display[response_id];

  let delay = command_text.length * 20 + 500;

  typingEffect(command, command_text, 50);

  function playResponse() {
    typingEffect(response, response_text, 0);
  }

  setTimeout(playResponse, delay);
}

