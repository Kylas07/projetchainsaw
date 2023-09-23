document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  let currentIndex = 0; 
  function showNextTab() {
    tabContents[currentIndex].classList.remove("active");
    tabs[currentIndex].classList.remove("active");

    currentIndex = (currentIndex + 1) % tabs.length;
    tabContents[currentIndex].classList.add("active");
    tabs[currentIndex].classList.add("active");
  }

  tabs[0].addEventListener("click", showNextTab);
 tabContents[currentIndex].classList.add("active");
  tabs[currentIndex].classList.add("active");
});
