document.querySelector('body').style.overflowY = 'hidden'

	window.addEventListener('load', function () {
		var preloader = document.querySelector('.preloader')
		preloader.classList.add('hide-preloader')

		setTimeout(() => {
			document.querySelector('body').style.overflowY = 'auto'
			preloader.style.display = 'none'
		}, 1000)
	})