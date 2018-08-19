//Working of Timer
  var  min=0;
  var sec=0;
  var stopTime=0;
  window.onload=function () {
    setInterval(function () {
      if (stopTime!==1) {
        sec++;
      }
      $('.timer').html(sec);
    },1000);
  }

/*
 * Create a list that holds all of your cards
 */
//Contains list of cards in the deck
var icons=[];
var iconsName = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
var openedCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
$('.deck').each(function () {
  $(this).find('li').each(function () {
    icons.push($(this));
  });
});

var temp = 0;

iconsName=shuffle(iconsName);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var iconNumber=0;
$('.deck').each(function () {
  $(this).find('li').find('i').each(function () {
    $(this).removeAttr('class');
    $(this).addClass(iconsName[iconNumber]);
    iconNumber++;
  });
});

$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        var tempClass = $($(icons[temp][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(tempClass);
        temp++;
    });
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var moves=0,stars=3;

removeProperties=function (prop) {
  setTimeout(function () {
    prop.removeClass('show open');
    openedCards[0].removeClass('show open');
    openedCards=[];
  },400);
};

showCardOnClick=function (clickEvent) {
  clickEvent.on('click',function () {
    moves++;
    const star=`<li><i class="fa fa-star"></i></li>`;
    if(moves >=14 && moves<=23){
      $('section ul li').hide();
      $('section ul').append(star);
      $('section ul').append(star);
      stars=2;
    }else if (moves>23) {
      $('section ul li').hide();
      $('section ul').append(star);
      stars=1;
    }
    $('.moves').html(moves);
    if((openedCards.length%2)===0){
      $(this).addClass('show open');
      $(this).off('click');
      openedCards.push($(this));
    }else if (openedCards.length!==0) {
      $(this).addClass('show open');

      var self=$(this);
      for (var i = 0; i < openedCards.length; i++) {
        if (openedCards[i].find('i').attr('class')===self.find('i').attr('class')) {
          self.addClass('show match');
          openedCards[i].addClass('show match');
          console.log('match');
          $(this).off('click');
          openedCards=[];
          break;
        } else {
          self.addClass('show open');
          removeProperties(self);
          openedCards[0].on('click', showCardOnClick(openedCards[0]));
        }
      }
    }
    if ($('.deck').find('.match').length===16) {
      setTimeout(function () {
        $('.deck').each(function () {
          swal({
            title: 'Congratulations',
            type: 'success',
            text: 'You completed game in ' + moves + ' Moves with ' + stars + ' Stars in ' + sec + ' Seconds',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: 'Restart Game',
            confirmButtonColor: '#42f4a4',
        }).then(function() {
            location.reload();
        }, function(dismiss) {
            console.log('Yes');
        });
      });
    },300);
    stopTime=1;
    $('.timer').hide();
    $('.timer').html('0');
    $('.timer').show();
    }
  });

};

for (var i = 0; i < icons.length; i++) {
  icons[i].on('click',showCardOnClick(icons[i]));
}
$('.restart').on('click',function () {
  location.reload();
});
