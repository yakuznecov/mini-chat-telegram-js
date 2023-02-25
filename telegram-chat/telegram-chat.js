window.$ = (el) => document.querySelector(el);

let timeNow = new Date().toLocaleTimeString();
let lastMesTime, nowMesTime, chatUpdater;

let template = `
<div class="chat__wrap">
<div class="chat__title">Online-Chat
<div class="btn__close chat__close"><svg width="46" height="46" viewBox="0 0 46 46" fill="#3390EC" xmlns="http://www.w3.org/2000/svg">
<path d="M32.899 13.1005C27.4322 7.63366 18.5668 7.63366 13.1 13.1005C7.6332 18.5673 7.6332 27.4327 13.1 32.8995C18.5668 38.3663 27.4322 38.3663 32.899 32.8995C38.3658 27.4327 38.3658 18.5673 32.899 13.1005ZM26.7118 27.7729C26.6146 27.8702 26.4555 27.8702 26.3583 27.7729L22.9995 24.4142L19.6408 27.7729C19.5435 27.8702 19.3844 27.8702 19.2872 27.7729L18.2265 26.7123C18.1293 26.6151 18.1293 26.456 18.2265 26.3587L21.5853 23L18.2265 19.6412C18.1293 19.544 18.1293 19.3849 18.2265 19.2877L19.2872 18.227C19.3844 18.1298 19.5435 18.1298 19.6408 18.227L22.9995 21.5858L26.3583 18.227C26.4555 18.1298 26.6146 18.1298 26.7118 18.227L27.7725 19.2877C27.8697 19.3849 27.8697 19.544 27.7725 19.6412L24.4137 23L27.7725 26.3587C27.8697 26.456 27.8697 26.6151 27.7725 26.7123L26.7118 27.7729Z" ></path>
</svg></div>
</div>
<div class="chat__body">
<div class="chat__body__item chat__body__item__manager">
<span class="chat__body__item__user">Manager</span>
<span class="chat__body__item__text">Hello, what is your question?</span>
<i class="chat__body__item__time">${timeNow}</i>
</div>
</div>
<div class="chat__input">
    <div class="chat__input__message">
        <textarea type="text" rows="1" class="chat__main__input" aria-label="Write a message" placeholder="Write a message" required></textarea>
    </div>
		<img class="chat__input__submit" src="telegram-chat/images/sent.svg" alt="Отправить">
</div>

</div>`;

class TelegramChat {
	init() {
		$('body').insertAdjacentHTML('afterbegin', template);

		let store = localStorage.getItem("historyMessages");

		if (store !== null) {
			$('.chat__body').innerHTML = store;
		}

		$('.chat__main__input').addEventListener('keypress', (e) => {
			if (e.key === `Enter`) {
				this.submit();
			}
		})

		$(".chat__input__submit").onclick = () => this.submit();
	}

	open() {

		$(".chat__close").addEventListener("click", (e) => this.close());

		$(".chat__body").scrollTop = 100000;

		$('.chat__wrap').classList.add('open');

		// 	axios.get(`https://api.telegram.org/bot${botId}:${token}/getupdates`)

		// 	.then(r => {

		// 	lastMesTime = r.data.result[r.data.result.length - 1].message.date

		// })

		chatUpdater = setInterval(() => this.checkResponse(), 1000);
	}

	close() {
		$('.chat__wrap').classList.remove('open');
	}

	submit() {
		let val = $(".chat__main__input").value;

		if (val !== ``) {
			let tplItemClient = `<div class="chat__body__item chat__body__item__client">
    <span class="chat__body__item__user">You</span>
    <span class="chat__body__item__text">${val}</span>
    <i class="chat__body__item__time">${timeNow}</i></div>`;

			$('.chat__body').innerHTML += tplItemClient;

			$(".chat__main__input").value = ``.trim();

			$(".chat__body").scrollTop = 100000;

			// axios.get(`https://api.telegram.org/bot${botId}:${token}/sendMessage?chat_id=${chatId}&text=${val}`)

		}
		else {
			alert(`Enter the text`);
		}
	}

	checkResponse() {

		// axios.get(`https://api`)
		// 	.then((r) => {

		// 		nowMesTime = r.data.result[r.data.result.length - 1].message.date

		// 		if (nowMesTime !== lastMesTime) {

		// 			lastMesTime = nowMesTime;

		// 			let Text = r.data.result.pop().message.text;

		// 			let tplItemMenager = `<div class="chat__body__item chat__body__item__manager">
		//         <span class="chat__body__item__user">Manager</span>
		//         <span class="chat__body__item__text">${Text}</span>
		//         <i class="chat__body__item__time">${timeNow}</i></div>`;

		// 			$(".chat__body").innerHTML += tplItemMenager;

		// 			if (localStorage) localStorage.setItem("historyMessages", $(".chat__body").innerHTML);

		// 			$('.chat__wrap').classList.contains('open') ? `` : alert(`Message: ${Text}`);

		// 			$(".chat__body").scrollTop = 100000;
		// 		}
		// 	});


	}
}

new TelegramChat().init();
