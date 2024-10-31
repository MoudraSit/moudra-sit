export function scrollIntoView() {
  setTimeout(function () {
    window.scrollTo({
      top: 200,
      left: 0,
      behavior: "smooth",
    });
  }, 300);
}

export function scrollToTop() {
  setTimeout(function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, 300);
}
