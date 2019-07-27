// navbar class change on scroll
$(window).scroll(function scrollClass() {
  $('nav').toggleClass('scrolled', $(this).scrollTop() > 1);
});

// open modals with jquery
$(document).ready(() => {
  $('#privacyAnchor').click(() => {
    $('#privacy').modal();
  });
});
$(document).ready(() => {
  $('#termsAnchor').click(() => {
    $('#terms').modal();
  });
});
$(document).ready(() => {
  $('#faqAnchor').click(() => {
    $('#faq').modal();
  });
});

// fill testimonial
const TestimonialRandomizer = {
  people: [],
  getFiveRandomIndex() {
    const fiveRandIndexFromPeople = new Set();
    while (fiveRandIndexFromPeople.size < 5) {
      fiveRandIndexFromPeople.add(Math.floor(Math.random() * this.people.length) + 1);
    }
    return Array.from(fiveRandIndexFromPeople);
  },
  fillTestimonialArea() {
    const fiveWinner = this.getFiveRandomIndex().map(index => this.people[index]);
    for (let i = 0; i < fiveWinner.length; i += 1) {
      $(`#testim-content div:nth-child(${i + 1}) img`).attr('src', fiveWinner[i].picture);
      $(`#testim-content div:nth-child(${i + 1}) .h4`).text(`${fiveWinner[i].name.first} ${fiveWinner[i].name.last}`);
      $(`#testim-content div:nth-child(${i + 1}) p`).html(`${fiveWinner[i].greeting}<br>
      I'm ${fiveWinner[i].name.first} ${fiveWinner[i].name.last} and I work for ${fiveWinner[i].company} company. We use this app worldwide so if you need any help with it, just call us: ${fiveWinner[i].phone}.`);
    }
  },
  getData(data) {
    this.people = data;
    this.fillTestimonialArea();
  },
  getJSON() {
    $.getJSON('http://46.101.237.11/json/users.json', (data) => { this.getData(data); });
  },
  init() {
    this.getJSON();
  },
};

TestimonialRandomizer.init();
