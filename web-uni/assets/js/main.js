
(function() {
  "use strict";

  
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

 
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

 
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)


  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }


  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }


  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

 
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

 
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }


  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });


  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });


  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });


  new Swiper('.details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  
  

  document.addEventListener("DOMContentLoaded", function() {
    const calendar1 = document.getElementById('calendar1');
    const monthYear1 = document.getElementById('monthYear1');
    const prevMonth1 = document.getElementById('prevMonth1');
    const nextMonth1 = document.getElementById('nextMonth1');

    const calendar2 = document.getElementById('calendar2');
    const monthYear2 = document.getElementById('monthYear2');
    const prevMonth2 = document.getElementById('prevMonth2');
    const nextMonth2 = document.getElementById('nextMonth2');
    
    let currentYear1 = new Date().getFullYear();
    let currentMonth1 = new Date().getMonth();
    let startDate1 = null;
    let endDate1 = null;

    let currentYear2 = new Date().getFullYear();
    let currentMonth2 = new Date().getMonth();
    let startDate2 = null;
    let endDate2 = null;

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function createCalendar(year, month, calendar, monthYear, startDate, endDate) {
        calendar.innerHTML = '';
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendar.appendChild(emptyDiv);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.textContent = i;
            day.dataset.date = `${year}-${month + 1}-${i}`;
            day.addEventListener('click', function(event) {
                onDayClick(event, calendar, startDate, endDate);
            });
            calendar.appendChild(day);
        }

        monthYear.textContent = `${months[month]} ${year}`;
        highlightRange(calendar, startDate, endDate);
    }

    function onDayClick(event, calendar, startDate, endDate) {
        const clickedDate = event.target.dataset.date.split('-').map(Number);
        const [year, month, day] = clickedDate;

        if (!startDate.value || (startDate.value && endDate.value)) {
            startDate.value = new Date(year, month - 1, day);
            endDate.value = null;
            clearSelection(calendar);
            event.target.classList.add('selected');
        } else if (new Date(year, month - 1, day) >= startDate.value) {
            endDate.value = new Date(year, month - 1, day);
            highlightRange(calendar, startDate, endDate);
        }
    }

    function clearSelection(calendar) {
        const days = calendar.querySelectorAll('div');
        days.forEach(day => {
            day.classList.remove('selected', 'in-range');
        });
    }

    function highlightRange(calendar, startDate, endDate) {
        if (!startDate.value) return;

        const days = calendar.querySelectorAll('div');
        days.forEach(day => {
            const dayDate = day.dataset.date.split('-').map(Number);
            const [year, month, date] = dayDate;
            const currentDate = new Date(year, month - 1, date);

            if (startDate.value && endDate.value) {
                if (currentDate >= startDate.value && currentDate <= endDate.value) {
                    if (currentDate.getTime() === startDate.value.getTime() || currentDate.getTime() === endDate.value.getTime()) {
                        day.classList.add('selected');
                    } else {
                        day.classList.add('in-range');
                    }
                }
            } else if (currentDate.getTime() === startDate.value.getTime()) {
                day.classList.add('selected');
            }
        });
    }

    function updateCalendar(calendar, monthYear, startDate, endDate, currentYear, currentMonth) {
        createCalendar(currentYear, currentMonth, calendar, monthYear, startDate, endDate);
    }

    prevMonth1.addEventListener('click', () => {
        if (currentMonth1 === 0) {
            currentMonth1 = 11;
            currentYear1--;
        } else {
            currentMonth1--;
        }
        updateCalendar(calendar1, monthYear1, {value: startDate1}, {value: endDate1}, currentYear1, currentMonth1);
    });

    nextMonth1.addEventListener('click', () => {
        if (currentMonth1 === 11) {
            currentMonth1 = 0;
            currentYear1++;
        } else {
            currentMonth1++;
        }
        updateCalendar(calendar1, monthYear1, {value: startDate1}, {value: endDate1}, currentYear1, currentMonth1);
    });

    prevMonth2.addEventListener('click', () => {
        if (currentMonth2 === 0) {
            currentMonth2 = 11;
            currentYear2--;
        } else {
            currentMonth2--;
        }
        updateCalendar(calendar2, monthYear2, {value: startDate2}, {value: endDate2}, currentYear2, currentMonth2);
    });

    nextMonth2.addEventListener('click', () => {
        if (currentMonth2 === 11) {
            currentMonth2 = 0;
            currentYear2++;
        } else {
            currentMonth2++;
        }
        updateCalendar(calendar2, monthYear2, {value: startDate2}, {value: endDate2}, currentYear2, currentMonth2);
    });

    updateCalendar(calendar1, monthYear1, {value: startDate1}, {value: endDate1}, currentYear1, currentMonth1);
    updateCalendar(calendar2, monthYear2, {value: startDate2}, {value: endDate2}, currentYear2, currentMonth2);
});



  
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });


  new PureCounter();

})()