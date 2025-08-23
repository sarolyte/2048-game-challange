const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalBtns = document.getElementById('modalBtns');
const overlay = document.getElementById('overlay');

export const showModal = (message, buttonLabel = 'Play again', callback = null) => {
  
  modalContent.innerHTML = ''; //clears previous content
  modalBtns.innerHTML = '';

  const modalTxt = document.createElement('p');
  modalTxt.id = 'modalMessage';
  modalTxt.textContent = message;

  const playAgainBtn = document.createElement('button');
  playAgainBtn.classList.add('playAgainBtn');
  playAgainBtn.textContent = buttonLabel;

  if (callback) {
    playAgainBtn.addEventListener('click', () => {
    hideModal();
    callback();
    });
  }

  modalContent.append(modalTxt);
  modalBtns.append(playAgainBtn);

  overlay.style.display = 'block';
  modal.setAttribute('aria-labelledby', 'modalMessage');
  modal.focus();
};

export const hideModal = () => {
    overlay.style.display = 'none';
    modalContent.innerHTML = '';
    modalBtns.innerHTML = '';
};

// modalCloseBtn.addEventListener('click', hideModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.style.display === 'block') {
    hideModal();
  }
});