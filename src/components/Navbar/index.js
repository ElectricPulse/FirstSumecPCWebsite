function showNavbarMenu(event) {
	const navbar_menu = document.getElementsByClassName("navbar-mobile-menu-container")[0];
	navbar_menu.style.right = "0";
	navbar_menu.addEventListener("transitioned", (event) => { 
		navbar_menu.classList.remove("navbar-mobile-menu-container-hidden");
		navbar_menu.classList.add("navbar-mobile-menu-container-visible");
	});
}

function hideNavbarMenu(event) {
	const navbar_menu = document.getElementsByClassName("navbar-mobile-menu-container")[0];
	navbar_menu.style.right = "100vw";
	navbar_menu.addEventListener("transitioned", (event) => {
		navbar_menu.classList.remove("navbar-mobile-menu-container-visible");
		navbar_menu.classList.add("navbar-mobile-menu-container-hidden");
	});
}


document.addEventListener("DOMContentLoaded", function(event) { 
	const hamburger_button = document.getElementsByClassName("navbar-mobile")[0];
	hamburger_button.addEventListener("click", showNavbarMenu);

	const navbar_menu_overlay = document.getElementsByClassName("navbar-mobile-menu-overlay")[0];
	navbar_menu_overlay.addEventListener("click", hideNavbarMenu);
})

