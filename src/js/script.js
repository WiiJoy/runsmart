$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 300,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 2000
                }
            }
        ]
    });

    // В списке табов при событии "клик" на таб, у которого отсутствует класс активности
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { 
        $(this) // Указание на элемент, на который выполнено событие
            // Для таба с событием установить класс активности, у всех остальных табов класс активности удалить
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active') 
            // в родителе таба найти блок с контентом, удалить класс активности
            // по индексу таба установить класс активности на соответствующий блок
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
            .eq($(this).index()).addClass('catalog__content_active');
    });

    

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    // для всех элементов с data-атрибутом data-modal=consultation при событии (.on) 'click'
    $('[data-modal=consultation]').on('click', function() {
        // 'отобразить (.fadeIn) элементы .overlay, #consultation со скоростью 'slow'
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        //скрытие элементов (.fadeOut)
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    // Для получения наименования позиций в descr для модалок в табах
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // Validate form

    function validateForm(form) { // Получение селектора
        $(form).validate({ // Валидация селектора
            rules: { // Установка правил
                name: 'required', // Установка обязательности поля
                phone: 'required',
                email: { // Несколько проверок для поля
                    required: true, // Установка обязательности поля
                    email: true // Установка проверки формата
                }
            },
            messages: { // Установка сообщений ошибок
                name: 'Введите свое имя', // Сообщение для пустого поля
                phone: 'Введите свой номер телефона',
                email: {
                    required: 'Введите свой адрес почты', // Сообщение для пустого поля
                    email: 'Неправильно введен адрес почты' // Сообщение, если неверный формат
                }
            }
        });
    }

    validateForm('#consultation-form');
    validateForm('#order form');
    validateForm('#consultation form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function() { // отслеживание скролла окна
        if ($(this).scrollTop() > 1600) { // если скролл от верха > 1600px
            $('.pageup').fadeIn(); // показывает ссылку pageup
        } else { // иначе
            $('.pageup').fadeOut(); // прячет ссылку pageup
        }
    });

    $("a[href^='#']").click(function() { // получение всех ссылок по опр. аттрибутам, клик
        const _href = $(this).attr("href"); // создание переменной и получение значения из href
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"}); // воспроизведение анимации
        return false;
    });

    new WOW().init();
});