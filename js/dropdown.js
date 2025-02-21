document.getElementById('menu-toggle').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    var nav = document.getElementById('main-nav');
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
    } else {
      nav.classList.add('show');
    }
  });
  