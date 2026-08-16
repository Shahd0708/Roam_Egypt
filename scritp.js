document.addEventListener('DOMContentLoaded', function(){

  // Contact form (يشتغل بس لو موجود في الصفحة)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      document.getElementById('popupOverlay').classList.add('show');
      this.reset();
    });
  }

  const bookingForm = document.getElementById('bookingForm');
  if(bookingForm){
    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      document.getElementById('popupOverlay').classList.add('show');
      this.reset();
    });
  }

  const popupOkBtn = document.getElementById('popupOkBtn');
  if(popupOkBtn){
    popupOkBtn.addEventListener('click', function(){
      document.getElementById('popupOverlay').classList.remove('show');
    });
  }

  const navLinks = document.querySelectorAll('nav a');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if(linkPage === currentPage){
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});