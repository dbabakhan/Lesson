
// Сам прототип
function progressBar (selector) {
	
	this.selector = document.querySelectorAll(selector); 
	// Родитель, через которого будем находить дочерные элементы
	this.animatedToggle = document.querySelector('.animated-toggle');

	this.hiddenToggle = document.querySelector('.hidden-toggle');

	this._value = 0;
	// Значение в поле

	this.circle = this.selector[0].childNodes[1];

	this.elem;
	// Наш будущее поле в коротом будем ввести значение

	this.bool = false;

	this.init = function () {

		// тут мы находим через родителя инпут

		let t = this.selector[0].childNodes[3].childNodes;

		for (let i = 0; i < t.length; i++) {

			if (t[i].tagName === 'INPUT') {				
				this.elem = t[i];
			}
		}

		this.elem.addEventListener('change', this.checkValue);

		this.animatedToggle.addEventListener('change', this.setMod, this.bool);

		this.hiddenToggle.addEventListener('change', () => {

			// скрыть блок 

			if (this.circle.style.opacity == 0.1) {
				
				this.circle.style.opacity = 1;
			}
			else {
				console.log(2);
				this.circle.style.opacity = 0.1;
			}

		});
	}


	this.checkValue = () => {
		this.setValue(this.elem.value);
		// метод который рендерит
	}

	this.setValue = function (value) {

		// сеттер для value c проверкой

		if (value > 100) {
			console.log('error!');
		}

		else {

			// запускаем анимацию если сет нас устраивает

			this._value = value;

			let i = 0;

			let timerid = setInterval(()=> {

				if (i > this._value) {
					timerid = clearInterval(timerid);
				}
				else {	
					this.circle.className = 'c100 p' + i;
					i++;
				}
			}, 20);
		}

	
	}


	// метод с анимацией

	this.setMod =  (animated="normal", state) => {


		if (animated == 'animated') {
			if (state == false) {
				this.selector[0].childNodes[1].className = 'c100 p' + this._value + ' animated-progress';
			}
			else {
				this.selector[0].childNodes[1].className = 'c100 p' + this._value;
			}
		}

		else {

			if (!this.bool) {

			this.bool = true;

			this.selector[0].childNodes[1].className = 'c100 p' + this._value + ' animated-progress';
		}

		else {
			
			this.selector[0].childNodes[1].className = 'c100 p' + this._value;

			this.bool = false;

		}

		}

	}

}

let progress = new progressBar('#progress-bar');

progress.init();

progress.setValue(50);

// progress.setMod('animated', true);

// let qwe = new progressBar('#progress-bar2');

// qwe.init();

