let prompt = document.querySelector("#prompt");
let contain = document.querySelector(".container");
let btn = document.querySelector("#btn");
let imageBtn = document.querySelector("#imageBtn");
let chatContainer = document.querySelector(".chat-container");
let imageInput = document.querySelector("#imageBtn input")

let Api_Url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB3H0HvQ1wPylcz4-MvyY-DbJAhagjEpgc'
let user = {
    userMessage: null,
    file: {
        mime_type: null,
        data: null
    }
}

function createChatBox(html, className) {
    let div = document.createElement("div")
    div.classList.add(className)
    div.innerHTML = html
    return div
}

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "hi-IN"
    window.speechSynthesis.speak(text_speak)

}


async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text")
    let speaker = aiChatBox.querySelector("#peak")
    try {
        let response = await fetch(Api_Url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    "role": "user",
                    "parts": [{ text: user.userMessage }, (user.file.data ? [{ "inline_data": user.file }] : [])

                    ]
                }]
            })

        })
        let data = await response.json();
        let apiResponse = data ? data.candidates[0].content.parts[0].text : "Sorry. I didn't get that. Please try again"
        let aiResponse = apiResponse.split(" ")
        let clutter = ""

        aiResponse.forEach((text, index) => {
            clutter += `<span class="aiReply">${text} </span>`;
            textElement.innerHTML = clutter
        })


        textElement.innerHTML = clutter

        let classHandler = () => {
            let aiReply = document.querySelectorAll(".aiReply")
            aiReply.forEach((reply) => {
                reply.classList.remove("aiReply")
                reply.classList.add("aiReplyOld")
            })

        }

        gsap.from(".aiReply", {
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            onComplete: () => {
                classHandler();
            }
        })
        speaker.addEventListener("click", () => {
            speak(textElement.innerText)

        })


    } catch (error) {
        console.log(error)

    } finally {
        aiChatBox.querySelector(".loading").style.display = "none"

    }
}

function showLoading() {
    let html = `<div class="img">
                <img src="ai.png" alt="ai" width="50px">
                <img src="speaker.svg" alt="speaker" id="peak">
            </div>


            <p class="text"></p>
            <img class="loading" src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif" alt="loading" height="50">`
    let aiChatBox = createChatBox(html, "ai-chat-box")
    chatContainer.append(aiChatBox)
    getApiResponse(aiChatBox)


}

btn.addEventListener("click", () => {
    user.userMessage = prompt.value;
    if (user.userMessage == "") {
        contain.style.display = "flex";
    } {
        contain.style.display = "none";
    }
    if (!user.userMessage) return;
    let html = `<p class="text"></p>
            <div class="img1">
                <img src="user.png" alt="user" width="50px">
            </div>`;
    let userChatBox = createChatBox(html, "user-chat-box")
    userChatBox.querySelector(".text").innerText = user.userMessage
    chatContainer.append(userChatBox)
    prompt.value = ""
    setTimeout(showLoading, 500)

})
prompt.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        user.userMessage = prompt.value;
        if (user.userMessage == "") {
            contain.style.display = "flex";
        } {
            contain.style.display = "none";
        }
        if (!user.userMessage) return;
        let html = `<p class="text"></p>
                <div class="img1">
                    <img src="user.png" alt="user" width="50px">
                </div>`;
        let userChatBox = createChatBox(html, "user-chat-box")
        userChatBox.querySelector(".text").innerText = user.userMessage
        chatContainer.append(userChatBox)
        prompt.value = ""
        setTimeout(showLoading, 500)
    }
})

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0]
    if (!file) return
    let reader = new FileReader()
    reader.onload = (e) => {
        let base64string = e.target.result.split(",")[1]
        user.file = {
            mime_type: file.type,
            data: base64string
        }
    }
    reader.readAsDataURL(file)
})

imageBtn.addEventListener("click", () => {
    imageBtn.querySelector("input").click()
})