const yearElement = document.getElementById("year");
if (yearElement) {
	yearElement.textContent = String(new Date().getFullYear());
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 }
	);

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navLinks = document.querySelectorAll("nav a[href^='#']");
const sections = document.querySelectorAll("section[id]");

if ("IntersectionObserver" in window && navLinks.length > 0 && sections.length > 0) {
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				const sectionId = entry.target.getAttribute("id");
				navLinks.forEach((link) => {
					const linkTarget = link.getAttribute("href")?.slice(1);
					link.classList.toggle("active", linkTarget === sectionId);
				});
			});
		},
		{
			rootMargin: "-35% 0px -55% 0px",
			threshold: 0.1,
		}
	);

	sections.forEach((section) => sectionObserver.observe(section));
}
