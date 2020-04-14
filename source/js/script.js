(function() {
  var openFormButton = document.querySelector('.arrow-down');
  var form = document.querySelector('.form');
  var nav = document.querySelector('.nav');

  if (openFormButton) {
    openFormButton.addEventListener('click', function(e) {
      e.preventDefault();
      ITVDN.form.open();
    })
  }
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (ITVDN.form.isValid()) {
        console.log('все ок')
      } else {
        console.log('заполните все поля')
      }
    })
  }

  if (nav) {
    nav.addEventListener('click', function(e) {
      var target = e.target;

      if (target.tagName.toLowerCase() !== 'a') {
        return;
      }
      e.preventDefault();
      ITVDN.navigation.toggleToActiveLink(target);
    });
  }

}())