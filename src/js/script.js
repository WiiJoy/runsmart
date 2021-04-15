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
    // $('.button_mini').on('click', function() {
    //     $('.overlay, #order').fadeIn('slow');
    // });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: 'Введите свое имя',
                phone: 'Введите свой номер телефона',
                email: {
                    required: 'Введите свой адрес почты',
                    email: 'Неправильно введен адрес почты'
                }
            }
        });
    }

    validateForm('#consultation-form');
    validateForm('#order form');
    validateForm('#consultation form');

});