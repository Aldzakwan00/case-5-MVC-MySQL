var cardUsername = document.getElementById('cardUsername');
var cardContainer = document.getElementById('cardContainer');
var usernameInput = document.getElementById('username');
var pesanInput = document.getElementById('isi-chat');
var submitButton = document.getElementById('buttonSubmit');
var sendButton = document.getElementById('send');
var gantiUsername = document.getElementById('ganti-username');
var usernameSet = false;

document.getElementById('pesanButton').addEventListener('click', (e) => {
    if (!usernameSet) {
        cardUsername.classList.toggle('hidden');
    } else {
        cardContainer.classList.toggle('hidden');
    }
});

gantiUsername.addEventListener('click', (e) => {
    cardContainer.classList.add('hidden');
    cardUsername.classList.remove('hidden');
    usernameSet = false;
});

async function tampilkanPesan() {
    try {
        const response = await fetch('../controller/Controller.php'); 
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            let pesanTampilan = '';
            data.forEach(pesan => {
                if (pesan.username === usernameInput.value) {
                    pesanTampilan += `<div class="chat-pengguna p-2">
                                          <div class='pesan-baris'>
                                              <strong>You</strong><br>
                                              ${pesan.message} <br>
                                              <div class='hour mt-2'>${pesan.timestamp}</div>
                                          </div>
                                      </div>`;
                } else {
                    pesanTampilan += `<div class="chat-other p-2">
                                          <div class='pesan-baris'>
                                              <strong>${pesan.username}</strong><br>
                                              ${pesan.message} <br>
                                              <div class='hour mt-2'>${pesan.timestamp}</div>
                                          </div>
                                      </div>`;
                }
            });
            document.getElementById('chat-box').innerHTML = pesanTampilan;
        } 
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
    setTimeout(tampilkanPesan, 2000);
}

submitButton.addEventListener('click', (e) => {
    var user = usernameInput.value;
    if (user) {
        cardUsername.classList.add('hidden');
        cardContainer.classList.remove('hidden');
        usernameSet = true;
    } else {
        alert('Masukkan username terlebih dahulu.');
    }
});

sendButton.addEventListener('click', (e) => {
    var user = usernameInput.value;
    var pesan = pesanInput.value;
    if (pesan !== '') {
        fetch('../controller/Controller.php', { 
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: `user=${user}&pesan=${pesan}`
        }).then(response => response.json());
        pesanInput.value = '';
    }
});

tampilkanPesan();
