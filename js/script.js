$(document).ready(function(){ // функция для работы слайдера
	$('.carousel__inner').slick({
		speed: 500, // скорость переключения слайдера
		prevArrow: '<button type="button" class="prev"><img src="icon/left.svg"></button>',
		nextArrow: '<button type="button" class="next"><img src="icon/right.svg"></button>',
		responsive: [ // настройка карусели под другие устройства
			{
			  breakpoint: 768, // для зкранов с размером до 768px
			  settings: {
				dots: true, // точки внизу слайдера
				arrows: false,
				/* dotsClass: 'dotsStyle' */ // стрелочки
			  }
			},
		]
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { // функция кнопок(табов) для каталога
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	  });
	  

	function toggleSlide(item) {  // настройка функции для смены котнента в карточках каталога
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link'); 
	toggleSlide('.catalog-item__back');

	// Modal

	$('[data-modal=consultation]').on('click', function(){
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});

	function validateForms(form) { // функция для валидации форм
		$(form).validate({ // говорим, что будем делать валидация для формы
			rules: { // настройки 
				name: {
					required: true, // должно быть
					minlength: 2 // минимальное кол-во символов
				  },
				phone: "required",
				email: {
					required: true,
					email: true // говорим, чтоб форма проверяла корректный ли адрес почты прописал полльзователь
				}
			},
			messages: { // настройка сообщений при некорректном вводе
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символа") // {0} - если указано какое мин кол-во символов должно быть
				  },
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен адрес почты" // если адрес потчы введен некорректно
				}
			}
		});
	};

	validateForms('#consultation-form'); // запуск валидации
	validateForms('#order form'); // для каждой
	validateForms('#consultation form'); // формы на странице

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function (e) {
		e.preventDefault(); // отменяем стандартное поведение браузера
		$.ajax({ // технология для изменения стандартного поведения браузера
			type: "POST", //тип для отправки данных на сервер
			url: 'mailer/smart.php', // куда отправляем заспрос
			data: $(this).serialize() // сами данные
		}).done(function() { // говорим, что когда функция ajax будет заверщена, начнется выполнения этой
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut(); // прячем модальное окно
			$('overlay, #thanks').fadeIn('slow'); // показываем модальное окно

			$('form').trigger('reset'); // сбрасываем то что было введено в форму
		});
		return false;
	});

	// появление и исчезновение стрелки

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) { // говорим, что когда мы проскроллим
			$('.pageup').fadeIn(); // 1600px вниз, появится стрелка вверх
		} else {                   // в ином случае 
			$('.pageup').fadeOut(); // ее не будет
		}
	});


	 // плавный скролл вниз
	 // Add smooth scrolling to all links
	 $("a").on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
		  // Prevent default anchor click behavior
		  event.preventDefault();
	
		  // Store hash
		  var hash = this.hash;
	
		  // Using jQuery's animate() method to add smooth page scroll
		  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 800, function(){
	
			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		  });
		} // End if
	  });

	  new WOW().init();
});