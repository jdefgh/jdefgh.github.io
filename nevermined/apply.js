var discord = document.getElementById("discord");
var nick = document.getElementById("nick");
var pickaxe = document.getElementById("pickaxe");
var reason = document.getElementById("reason");
var experience = document.getElementById("experience");

var age_slider = document.getElementById("age");
var age_output = document.getElementById("age_value");
age_output.innerHTML = age_slider.value;

age_slider.oninput = function() {
    age_output.innerHTML = this.value;
    if (this.value >= this.max) {
        age_output.innerHTML += "+";
    }
}

var tz_slider = document.getElementById("timezone");
var tz_output = document.getElementById("timezone_value");
tz_output.innerHTML = "UTC";

tz_slider.oninput = function() {
    tz_output.innerHTML = "UTC";
    if (this.value > 0) {
        tz_output.innerHTML += "+";
    }
    if (this.value != 0) {
        tz_output.innerHTML += this.value;
    }
}

var button = document.getElementById("submit");
var result = document.getElementById("result");

var discord_regex = /[\x20-\x7E]+#\d{4}/;
var nick_regex = /^\w{3,16}$/;

var send_string = "";

result.innerHTML = "Result will appear here.";
button.onclick = function() {
    result.innerHTML = "Something went wrong.";
    if (discord.value.includes("\x1d") ||
        nick.value.includes("\x1d") ||
        reason.value.includes("\x1d") ||
        experience.value.includes("\x1d")
    ) {
        result.innerHTML = "ha ha very funny, now remove the group separators";
        return;
    }
    if (discord.value.match(discord_regex) == null) {
        result.innerHTML = "Your discord username is incorrect, it has to include tag and shouldn't contain any non-ascii characters";
        return;
    }
    if (nick.value.match(nick_regex) == null) {
        result.innerHTML = "Your minecraft username is not valid";
        return;
    }
    if (pickaxe.checked == false) {
        result.innerHTML = "You need at least Tier 25 Pickaxe";
        return;
    }
    if (reason.value.length < 100) {
        result.innerHTML = "Your answer to \"Why do you want to be a helper?\" is too short";
        return;
    }
    send_string = String.fromCharCode((parseInt(age_slider.value) - 13) * 32 + parseInt(tz_slider.value) + 12)
        + discord.value + "\x1d"
        + nick.value + "\x1d"
        + reason.value + "\x1d"
        + experience.value;
    if (send_string.length > 1024) {
        result.innerHTML = "Your apply can't exceed 1kb";
        return;
    }
    result.innerHTML = send_string.length;
}