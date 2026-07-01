'use strict';

import { domElements, toggleLoader } from './dom.js';
import { getComments } from './api.js';
import { submitNewComment } from './api.js';

export const initComments = () => {
  toggleLoader(true);
  
  // Добавляем обработчик событий
  domElements.addForm.addEventListener('submit', submitNewComment);
  
  return getComments()
    .catch((error) => {
      console.error('Fetch error:', error);
      if (!window.navigator.onLine) {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      } else {
        alert(error.message);
      }
    })
    .finally(() => {
      toggleLoader(false);
    });
};
