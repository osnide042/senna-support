(function () {
  const SUPPORT_EMAIL = "osnideapplewhite@gmail.com";
  const OPEN_DAYS = [1, 2, 3, 4, 5];
  const OPEN_HOUR = 9;
  const CLOSE_HOUR = 17;

  const statusPill = document.getElementById("statusPill");
  const chatStatusLabel = document.getElementById("chatStatusLabel");
  const chatPanel = document.getElementById("chatPanel");
  const chatBody = document.getElementById("chatBody");
  const chatForm = document.getElementById("chatForm");
  const chatText = document.getElementById("chatText");
  const chatLauncher = document.getElementById("chatLauncher");
  const chatClose = document.getElementById("chatClose");
  const openChatBtn = document.getElementById("openChatBtn");
  const heroChatBtn = document.getElementById("heroChatBtn");
  const emailForm = document.getElementById("emailForm");

  function londonNow() {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/London" }));
  }

  function isChatOpen() {
    const now = londonNow();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    return OPEN_DAYS.includes(day) && hour >= OPEN_HOUR && hour < CLOSE_HOUR;
  }

  function setStatus() {
    const open = isChatOpen();
    if (open) {
      statusPill.textContent = "Chat is available";
      statusPill.className = "status-pill open";
      chatStatusLabel.textContent = "Online · leave a message";
    } else {
      statusPill.textContent = "Outside hours · email available";
      statusPill.className = "status-pill closed";
      chatStatusLabel.textContent = "Offline · message via email";
    }
    return open;
  }

  function addBubble(text, who) {
    const div = document.createElement("div");
    div.className = "bubble " + who;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  let greeted = false;
  function openChat() {
    chatPanel.hidden = false;
    setStatus();
    if (!greeted) {
      greeted = true;
      if (isChatOpen()) {
        addBubble("Hi — this is Senna Support. Tell us what's going on with the app and we'll help.", "bot");
      } else {
        addBubble(
          "We're outside live hours (Mon–Fri 09:00–17:00 UK).\n\nSend a message here and we'll open your email app so it goes to our inbox.",
          "bot"
        );
      }
    }
    chatText.focus();
  }

  function closeChat() {
    chatPanel.hidden = true;
  }

  function mailtoSupport(subject, body) {
    window.location.href =
      "mailto:" + encodeURIComponent(SUPPORT_EMAIL) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  }

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = (chatText.value || "").trim();
    if (!text) return;
    addBubble(text, "user");
    chatText.value = "";

    setTimeout(function () {
      addBubble("Thanks — opening email so your message is sent to support.", "bot");
      mailtoSupport("Senna Support chat", text);
    }, 350);
  });

  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const fd = new FormData(emailForm);
    const body =
      "Name: " + fd.get("name") +
      "\nEmail: " + fd.get("email") +
      "\n\n" + fd.get("message");
    mailtoSupport("Senna Support request", body);
  });

  chatLauncher.addEventListener("click", openChat);
  chatClose.addEventListener("click", closeChat);
  openChatBtn.addEventListener("click", openChat);
  heroChatBtn.addEventListener("click", openChat);

  setStatus();
})();
