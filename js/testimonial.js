
// vars


const testim = document.getElementById('testim');


const testimDots = Array.prototype.slice.call(document.getElementById('testim-dots').children);


const testimContent = Array.prototype.slice.call(document.getElementById('testim-content').children);


const testimLeftArrow = document.getElementById('left-arrow');


const testimRightArrow = document.getElementById('right-arrow');


const testimSpeed = 8000;


let currentSlide = 0;


let currentActive = 0;


let testimTimer;


let touchStartPos;


let touchEndPos;


let touchPosDiff;


const ignoreTouch = 30;


window.onload = function test() {
  // Testim Script
  function playSlide(slide) {
    for (let k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove('active');
      testimContent[k].classList.remove('inactive');
      testimDots[k].classList.remove('active');
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add('inactive');
    }
    testimContent[slide].classList.add('active');
    testimDots[slide].classList.add('active');

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(() => {
      playSlide(currentSlide += 1);
    }, testimSpeed);
  }

  testimLeftArrow.addEventListener('click', () => {
    playSlide(currentSlide -= 1);
  });

  testimRightArrow.addEventListener('click', () => {
    playSlide(currentSlide += 1);
  });

  for (let l = 0; l < testimDots.length; l += 1) {
    testimDots[l].addEventListener('click', function () {
      playSlide(currentSlide = testimDots.indexOf(this));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  });

  testim.addEventListener('touchstart', (e) => {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener('touchend', (e) => {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {

    }
  });
};
