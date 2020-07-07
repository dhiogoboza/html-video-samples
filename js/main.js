let headerLinks;
let bodyLinks;

const HEADER = 0;
const BODY = 1;

let navigationState = BODY;

let headerPos = -1;
let bodyPos = -1;

let headerLinksContainter;
let bodyLinksContainter;

let logPane;

function selectPositions(newHeaderPos, newBodyPos) {
    if (newHeaderPos != headerPos) {
        if (headerPos >= 0) {
            headerLinks[headerPos].classList.remove("selected");
        }

        if (headerLinks.length > 0) {
            headerLinks[newHeaderPos].classList.add("selected");
        }

        headerPos = newHeaderPos;
    }

    if (newBodyPos != bodyPos) {
        if (bodyPos >= 0) {
            bodyLinks[bodyPos].classList.remove("selected");
        }

        if (bodyLinks.length > 0) {
            bodyLinks[newBodyPos].classList.add("selected");
        }
        bodyPos = newBodyPos;
    }
    
    if (navigationState === HEADER) {
        if (headerLinksContainter !== null)
            headerLinksContainter.style.opacity = "1";
        if (bodyLinksContainter !== null)
            bodyLinksContainter.style.opacity = "0.5";
    } else {
        if (headerLinksContainter !== null)
            headerLinksContainter.style.opacity = "0.5";
        if (bodyLinksContainter !== null)
            bodyLinksContainter.style.opacity = "1";        
    }
}

function onKeyPressed(e) {
    if (!e) {
        e = window.event;
    }

    (e.keyCode) ? key = e.keyCode : key = e.which;
    try {
        let newHeaderPos = headerPos;
        let newBodyPos = bodyPos;
	    switch (key) {
		    case 37: // left
		        newHeaderPos--;
		        navigationState = HEADER;
		        break;
		    case 39: // right
		        newHeaderPos++;
		        navigationState = HEADER;
		        break;
		    case 38: // up
		        newBodyPos--;
		        navigationState = BODY;
		        break;
		    case 40: //down
		        if (navigationState == HEADER) {
		            newBodyPos = 0;
		        } else {
		            newBodyPos++;
		        }
		        navigationState = BODY;
		        break;
	        case 13: //enter
		        if (navigationState === HEADER) {
		            if (headerPos < headerLinks.length) {
    		            headerLinks[headerPos].click();
		            }
		        } else {
		            if (bodyPos < bodyLinks.length) {
	                    bodyLinks[bodyPos].click();
	                }
		        }
		        break;
	        default:
	            return;
	    }
	    if (newHeaderPos < 0)
	        newHeaderPos = headerLinks.length - 1;

        if (newHeaderPos === headerLinks.length)
	        newHeaderPos = 0;

        if (newBodyPos < 0) {
            if (headerLinks.length !== 0) {
                navigationState = HEADER;
	            newBodyPos = 0;
	        } else {
	            newBodyPos = bodyLinks.length - 1;
	            navigationState = BODY;
	        }
	    }

        if (newBodyPos === bodyLinks.length)
	        newBodyPos = 0;

	    selectPositions(newHeaderPos, newBodyPos)
    } catch(Exception) {}
}

function logMessage(msg, error) {
    let textNode = document.createElement("span");
    textNode.innerHTML = msg;

    logPane.appendChild(textNode);
    logPane.appendChild(document.createElement("br"));

    if (error) {
        textNode.style.color = "red";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    headerLinks = document.querySelectorAll("h1 > .nav > a");
    bodyLinks = document.querySelectorAll("#links > a");
    
    headerLinksContainter = document.querySelector("h1 .nav");
    bodyLinksContainter = document.querySelector("#links");

    selectPositions(0, 0);

    logPane = document.getElementById('log');

    if (logPane != undefined) {
        let normalLog = console.log;
        console.log = function (message) {
            logMessage(message, false);
            normalLog.apply(console, arguments);
        };

        let errorLog = console.error;
        console.error = function (message) {
            logMessage(message, true);
            errorLog.apply(console, arguments);
        };
    }
});

document.onkeydown = onKeyPressed;
