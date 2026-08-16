let balance = 0;
let watched = 0;

function watchVideo(button, reward = 10) {
    button.disabled = true;
    button.innerText = "Watching...";

    setTimeout(() => {
        balance += reward;
        watched += 1;

        document.getElementById("balance").innerText = balance;
        document.getElementById("watched").innerText = watched;

        button.innerText = `Earned ${reward} Coins`;
    }, 10000);
}

function withdraw() {
    if (balance < 1000) {
        alert("Minimum withdrawal is 1000 coins.");
        return;
    }

    alert("Withdrawal request submitted!");
}
