import '../scss/style.scss';
import $ from 'jquery';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';


$(document).ready(function () {

    /* nav mobile */
    $('.navMobile').click(function () {
        $('.header').toggleClass('openMenu')
        $(this).toggleClass('openMenu');
    })


    $('.owl-homepage').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        items: 1
    });


});