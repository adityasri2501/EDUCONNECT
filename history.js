// for smooth tansitions

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const href = button.getAttribute('href');
      document.body.style.transition = "opacity 0.4s ease";
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
  

document.addEventListener('DOMContentLoaded', function () {
    const removeButtons = document.querySelectorAll('.remove-button');
  
    removeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const historyItem = this.parentElement;
        historyItem.style.transition = "opacity 0.3s ease";
        historyItem.style.opacity = 0;
  
        setTimeout(() => {
          historyItem.remove();
        }, 300);
      });
    });
  });
  