$(function () {

    //Назначение стилей для хедера в адаптивной версии
    const navigation = $('.header-nav');

    $(window).on('scroll', () => {
        $(window).scrollTop() > 0 && $(window).width() <= 768 ?
            navigation.css('background', 'rgba(0, 0, 0, 0.6)') :
            navigation.css('background', 'none');
    });

    //Анимации
    if ($(window).width() <= 768) {
        navigation.removeClass('wow').removeClass('backInDown').removeAttr('data-wow-duration').removeAttr('data-wow-delay');
    }
    new WOW().init();


    //Слайдер для дат туров
    $('.tour-date-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: ".slide-prev-arrow",
        nextArrow: ".slide-next-arrow",
        appendDots: ".slide-pagination",
        dotsClass: 'slide-dots',
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
        ]
    });


    //Слайдер для фотографий
    $('.report-photo-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: ".slide-prev-arrow-photo",
        nextArrow: ".slide-next-arrow-photo",
        appendDots: ".slide-photo-pagination",
        dotsClass: 'slide-dots',
        centerMode: false,
        adaptiveHeight: true,
        autoplay: true,
    });


    //Слайдер для отзывов
    $('.tour-reviews-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: ".slide-prev-arrow-review",
        nextArrow: ".slide-next-arrow-review",
        appendDots: ".slide-review-pagination",
        dotsClass: 'slide-dots',
        centerMode: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });


    //Поп-ап для изображений слайдера c одной фотографией
    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }
    });


    //Поп-ап для изображений слайдера с коллажом фотографий
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        },
    });


    //Клик по кнопке "Смотреть программу"
    $('.header-action-btn').on('click', function () {
        $('#program-tour')[0].scrollIntoView({behavior: 'smooth'});
    });


    //Бургер меню
    const burgerMenu = $('#burger');
    const menu = $('.menu');
    const phone = $('.phone');
    const menuAdaptive = $('.menu-adaptive');

    burgerMenu.on('click', function () {
        burgerMenu.toggleClass('open');
        menu.toggleClass('open');
        phone.toggleClass('open');
        menuAdaptive.toggleClass('open');
    });

    $('.menu-adaptive *').on('click', function () {
        $('.menu-adaptive').removeClass('open');
        burgerMenu.removeClass('open');
    });


    //Валидация формы заявки
    const inputName = $('#inputName');
    const inputPhone = $('#inputPhone');
    inputPhone.inputmask({"mask": "+7 (999) 999-9999"});
    let errorText = ["Введите имя", "Введите телефон", "Введите email"];
    let validRes = false;

    // inputName.oninput = () => {
    //     if(inputName.value.charAt(0) === ' ') {
    //         inputName.value = '';
    //         // e.preventDefault();
    //     }
    // };

    $('.form').on('submit', function (e) {
        e.preventDefault();

        inputName.removeClass('error');
        $('[for="inputName"] p').remove();
        validRes = false;
        if (!inputName.val()) {
            inputName.addClass('error');
            $('[for="inputName"]').append(`<p style="margin: 10px 0 0 20px; color: red; font-size: 12px; max-width: max-content;">${errorText[0]}</p>`);
            validRes = true;
        }

        inputPhone.removeClass('error');
        $('[for="inputPhone"] p').remove();
        validRes = false;
        if (!inputPhone.val()) {
            inputPhone.addClass('error');
            $('[for="inputPhone"]').append(`<p style="margin: 10px 0 0 20px; color: red; font-size: 12px; max-width: max-content;">${errorText[1]}</p>`);
            validRes = true;
        }

        if (!validRes) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: { name: inputName.val(), phone: inputPhone.val() },
            })
                .done(function( msg ) {
                    console.log(msg);
                    if (msg.success) {
                        // $('.form').removeClass('wow').removeClass('fadeIn').removeAttr('data-wow-duration').removeAttr('data-wow-delay');
                        $('.form').hide('slow');
                        $('.form-text-done').show('slow').css({'visibility': 'visible', 'opacity': '1'});

                        setTimeout(() => {
                            $('.form').show(500);
                                // .removeAttr('data-wow-duration').removeAttr('data-wow-delay');
                        }, 5000);

                        setTimeout(() => {
                            $('.form-text-done').hide('slow').css({'visibility': 'hidden', 'opacity': '0'});
                        }, 4500);
                    } else {
                        alert("Возникла ошибка при отправке заявки, повторите попытку");
                    }
                });
            $('.form')[0].reset();
        }
    });


    //Валидация формы email
    const inputEmail = $('#inputEmail');
    const inputWrap = $('.input-wrap');

    $('.email').on('submit', function (event) {
        event.preventDefault();

        const inputEmailLabel = $('[for="inputEmail"]')

        inputEmail.removeClass('error');
        inputWrap.removeClass('border-none');
        $('[for="inputEmail"] p').remove();
        validRes = false;
        if (!inputEmail.val()) {
            inputEmail.addClass('error');
            inputWrap.addClass('border-none');
            $('.email .input-wrap:before').remove();
            inputEmailLabel.append(`<p style="margin: 10px 0 0 20px; color: red; font-size: 12px; max-width: max-content;">${errorText[2]}</p>`);
            validRes = true;
        }

        if (!validRes) {
            alert("Ваш email принят")
        }

        $('.email')[0].reset();
    });


    //Взаимодействие с модальным окном
    const modalWrapper = $('.modal-wrapper');
    //Включение - отключение скролла
    const scrollController = {
        disabledScroll() {
            $('body').css({
                'overflow': 'hidden',
            });
        },
        enabledScroll() {
            $('body').css({
                'overflow': 'visible',
            });
        }
    }
    //Событие открытия модального окна
    $('.order-call, .btn-footer-phone').on('click', function () {
        modalWrapper.addClass('open-modal');
        scrollController.disabledScroll();
        $('.modal-close').on('click', function () {
            modalWrapper.removeClass('open-modal');
            scrollController.enabledScroll();
        });
    });
    //Закрытие модального окна при клике вне его
    modalWrapper.on('click', function (event) {
        const target = $(event.target);
        if (target.hasClass('open-modal')) {
            modalWrapper.removeClass('open-modal');
            scrollController.enabledScroll();
        }
    });
    //Закрытие модального окна клавишей "Escape"
    $(window).on('keydown', function(e) {
        if (e.key === "Escape") {
            modalWrapper.removeClass('open-modal');
            scrollController.enabledScroll();
        }
    });


    //Валидация формы заявки из модального окна
    const inputNameModal = $('#inputNameModal');
    const inputPhoneModal = $('#inputPhoneModal');
    inputPhoneModal.inputmask({"mask": "+7 (999) 999-9999"});

    $('.modal-form').on('submit', function (e) {
        e.preventDefault();

        inputNameModal.removeClass('error');
        $('[for="inputNameModal"] p').remove();
        validRes = false;
        if (!inputNameModal.val()) {
            inputNameModal.addClass('error');
            $('[for="inputNameModal"]').append(`<p style="margin: 10px 0 0 20px; color: red; font-size: 12px; max-width: max-content;">${errorText[0]}</p>`);
            validRes = true;
        }

        inputPhoneModal.removeClass('error');
        $('[for="inputPhoneModal"] p').remove();
        validRes = false;
        if (!inputPhoneModal.val()) {
            inputPhoneModal.addClass('error');
            $('[for="inputPhoneModal"]').append(`<p style="margin: 10px 0 0 20px; color: red; font-size: 12px; max-width: max-content;">${errorText[1]}</p>`);
            validRes = true;
        }

        if (!validRes) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: { name: inputNameModal.val(), phone: inputPhoneModal.val() },
            })
                .done(function( msg ) {
                    console.log(msg);
                    if (msg.success) {
                        $('.modal-form').hide('slow');
                        $('.modal-form-text-done').show('slow').css({'visibility': 'visible', 'opacity': '1', 'minHeight': '200px'});

                        setTimeout(() => {
                            $('.modal-form').show(500);
                        }, 5000);

                        setTimeout(() => {
                            $('.modal-form-text-done').hide('slow').css({'visibility': 'hidden', 'opacity': '0'});
                        }, 4500);
                    } else {
                        alert("Возникла ошибка при отправке заявки, повторите попытку");
                    }
                });
            $('.modal-form')[0].reset();
        }
    });

});