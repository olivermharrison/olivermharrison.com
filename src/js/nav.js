
var offset = 177;

var DOC_HEIGHT = document.body.scrollHeight;
var WIN_HEIGHT = window.innerHeight;

var windowTop = document.body.scrollTop;
var windowBottom = windowTop + WIN_HEIGHT;

updateLetters();

window.onscroll = function(){
  updateLetters();
};


function updateLetters() {
  windowTop = document.body.scrollTop;
  windowBottom = windowTop + WIN_HEIGHT;

  var words = document.querySelectorAll('.word-in-view');
  words.forEach(function(word) {
    var targetElementID = word.getAttribute('data-target-id');

    if (targetElementID === null) {
      console.error("No target ID defined!");
    }
    //var targetElement = document.getElementById(targetElementID);
    var inView = getPortionInView(targetElementID);

    var letters = word.children;
    for (var i=0; i<letters.length; ++i) {

      var letterPos = Math.floor(i/letters.length*100);

      if (letterPos >= inView.top && letterPos < inView.bottom) {
        letters[i].classList.add('active-letter');
      } else {
        letters[i].classList.remove('active-letter');
      }

    }
  });
}




function getPortionInView(sectionID) {

  var sectionTop = document.getElementById(sectionID).offsetTop;
  var sectionHeight = document.getElementById(sectionID).offsetHeight;
  var sectionBottom = sectionTop + sectionHeight;

  // outside
  if (sectionTop < windowTop && sectionBottom > windowBottom) {
    return {top: Math.floor((windowTop - sectionTop)/sectionHeight*100), bottom: Math.floor((windowBottom - sectionTop)/sectionHeight*100)};
  }
  // overlap at window top
  else if (sectionTop < windowTop && sectionBottom > windowTop ) {
    return {top:Math.floor((windowTop - sectionTop)/sectionHeight*100), bottom:100 };
  }
  // overlap at window bottom
  else if (sectionTop < windowBottom && sectionBottom > windowBottom) {
    return {top:0, bottom:Math.floor((windowBottom - sectionTop)/sectionHeight*100)};
  }
  // above
  else if (sectionBottom < windowTop) {
    return {top:100, bottom:100};
  }
  // below
  else if (sectionTop > windowBottom) {
    return {top:0, bottom:0};
  }
  // inside
  else {
    return {top:0, bottom:100};
  }
}
