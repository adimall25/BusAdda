const names=window.prompt("Can I ASK YOUR NAME?");
document.querySelector("body").style.display = "block";
greetingElement = document.querySelector('.greeting')
greetingElement.textContent = `Hi, ${names}`

