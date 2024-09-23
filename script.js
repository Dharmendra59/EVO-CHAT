let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let usermessage = null;

function createChatBox(html, className) {}

btn.addEventListener("click", () => {
    usermessage = prompt.value;
    if (!usermessage) return;
    let html = `<p class="text"></p>
            <div class="img">
                <img src="user.png" alt="user" width="50px">
            </div>`;
    createChatBox(html, "user-chat-box")

})