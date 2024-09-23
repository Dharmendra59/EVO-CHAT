let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;

function createChatBox(html, className) {
    let div = document.createElement("div")
    div.classList.add(className)
    div.innerHTML = html
    return div
}

btn.addEventListener("click", () => {
    userMessage = prompt.value;
    if (!userMessage) return;
    let html = `<p class="text"></p>
            <div class="img1">
                <img src="user.png" alt="user" width="50px">
            </div>`;
    let userChatBox = createChatBox(html, "user-chat-box")
    userChatBox.querySelector(".text").innerText = userMessage
    chatContainer.append(userChatBox)
    prompt.value = ""

})