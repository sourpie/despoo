document.addEventListener("DOMContentLoaded", function () {
  var registerButton = document.getElementById("registerButton");

  registerButton.addEventListener("click", function () {
    // Open a new page or URL when the button is clicked
    window.location.href = "form.html";
  });
});


document.querySelector('body').style.overflowY = 'hidden'

	window.addEventListener('load', function () {
		var preloader = document.querySelector('.preloader')
		preloader.classList.add('hide-preloader')

		setTimeout(() => {
			document.querySelector('body').style.overflowY = 'auto'
			preloader.style.display = 'none'
		}, 1000)
	})

