export function scrollIntoView() {
  setTimeout(function () {
    window.scrollTo({
      top: 200,
      left: 0,
      behavior: "smooth",
    });
  }, 300);
}
