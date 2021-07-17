$(document).ready(function() {
  // MODAL
  var modalText = {
    logger: {
      title: 'logger',
      tag: 'Logger for Windows that disguises itself as a simple .exe file',
      detail:
        'This program is perfect for DuckyScripts and Social Engineers who want to quickly and easily install a rat on any Windows computer.',
      link: 'https://github.com/Krypt0c/Logger'
    },
    ordering: {
      title: 'ChowNow Ordering Web',
      tag: 'WHITE-LABEL ONLINE ORDERING SOLUTION.',
      detail:
        'ChowNow is a commission-free online ordering system and food ordering app helping restaurants feed their hungry customers.',
      link: 'https://direct.chownow.com/direct/195/locations/260'
    },
    Linky: {
      title: 'Linky',
      tag: 'Your new favorite link tool.',
      detail:
        'Linky is a tool you can use to shorten or create custom URLs, this is a great social engineering tool to make links appear as something that they are not..',
      link: 'https://github.com/Krypt0c/linky'
    },
    Basilisk: {
      title: 'Basilisk',
      tag: 'The best, most efficient, most effective, and most universal password brute-forcing tool',
      detail:
        'The best, most efficient, most effective, and most universal password brute-forcing tool.',
      link: 'https://github.com/Krypt0c/basilisk'
    },
    JsTweetBot: {
      title: 'JsTweetBot',
      tag: 'Bot for Twitter built in JS',
      detail:
        'A Twitter bot that uses Javascript to generate and Tweet a random number.',
      link: 'https://www.github.com/Krypt0c/JsTweetBot/'
    },
    CVE: {
      title: 'CVE-2021-3156-PATCHER',
      tag: 'Patching Tool for the 2021-3156 sudo CVE',
      detail:
        'This simple bash script will patch the recently discovered sudo heap overflow vulnerability.',
      link: 'https://github.com/elbee-cyber/CVE-2021-3156-PATCHER'
    },
    PyTweetBot: {
      title: 'PyTweetBot',
      tag: 'Bot for Twitter built with python',
      detail:
        'Twitter Bot that generates a random number and tweets it',
      link: 'https://github.com/Krypt0c/PyTweetBot'
      },
    crb: {
      title: 'Color Regognition Bot',
      tag: 'Python bot that recognizes color',
      detail:
        'Bot built in python that recognizes color at a user determined location.',
      link: 'https://github.com/Krypt0c/Color-Recognition-Bot'  
      },
    PyRecker: {
      title: 'PyRecker',
      tag: 'A simple python script to spam web requests',
      detail:
        'A simple python script to spam web requests, im also working on a JS version of this.',
      link: 'https://github.com/Krypt0c/PyRecker'
      },
    QRG: {
      title: 'QR Code Generator',
      tag: 'A qr code generator built with python',
      detail:
        'A simple python script to create a qr code.',
      link: 'https://github.com/Krypt0c/qr-code-generator'
      }      
      
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
