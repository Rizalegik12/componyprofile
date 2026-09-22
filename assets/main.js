(() => {
	"use strict";

	const init = () => {
		// Menu mobile: gunakan atribut data-menu-toggle pada tombol dan data-menu pada menu.
		const menuButton = document.querySelector("[data-menu-toggle]");
		const menu = document.querySelector("[data-menu]");
		if (menuButton && menu) {
			menuButton.addEventListener("click", () => {
				const isOpen = menu.classList.toggle("is-open");
				menuButton.setAttribute("aria-expanded", String(isOpen));
			});
		}

		// Tema gelap/terang: gunakan atribut data-theme-toggle pada tombol.
		const themeButton = document.querySelector("[data-theme-toggle]");
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") document.body.classList.add("dark-mode");
		themeButton?.addEventListener("click", () => {
			const isDark = document.body.classList.toggle("dark-mode");
			localStorage.setItem("theme", isDark ? "dark" : "light");
			themeButton.setAttribute("aria-pressed", String(isDark));
		});

		// Scroll halus untuk tautan ke bagian halaman.
		document.querySelectorAll('a[href^="#"]').forEach((link) => {
			link.addEventListener("click", (event) => {
				const target = document.querySelector(link.getAttribute("href"));
				if (target) {
					event.preventDefault();
					target.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			});
		});

		// Animasi elemen saat terlihat.
		const animated = document.querySelectorAll("[data-animate]");
		if ("IntersectionObserver" in window) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			}, { threshold: 0.15 });
			animated.forEach((element) => observer.observe(element));
		} else {
			animated.forEach((element) => element.classList.add("is-visible"));
		}

		// Validasi dan pesan sukses form tanpa reload halaman.
		document.querySelectorAll("form").forEach((form) => {
			form.addEventListener("submit", (event) => {
				if (!form.checkValidity()) return;
				event.preventDefault();
				const message = form.querySelector("[data-form-message]");
				if (message) {
					message.textContent = "Terima kasih, pesan Anda berhasil dikirim.";
					message.hidden = false;
				}
				form.reset();
			});
		});
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
