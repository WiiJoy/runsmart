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

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { // В списке табов при событии "клик" на таб, у которого отсутствует класс активности
        $(this) // Указание на элемент, на который выполнено событие
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active') // Для таба с событием установить класс активности, у всех остальных табов класс активности удалить
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); // в родителе таба найти блок с контентом, удалить класс активности, по индексу таба установить класс активности на соответствующий блок контента
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
});