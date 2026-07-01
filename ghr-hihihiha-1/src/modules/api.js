'use strict';

import { domElements, setCommentData, toggleLoader, toggleAddFormLoader } from './dom.js';
import { renderCommentListWithEvents } from './renderCommentList.js';
import { formatCommentDate } from '../../utils.js';

const COMMENTS_API_URL = 'https://wedev-api.sky.pro/api/v1/ttttemaa/comments';

export const getComments = () => {
  return fetch(COMMENTS_API_URL)
    .then((response) => {
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error('Сервер сломался, попробуй позже');
        }
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const formattedData = data.comments.map((comment) => ({
        name: comment.author.name,
        date: formatCommentDate(comment.date),
        text: comment.text,
        likes: 0,
        isLiked: false,
      }));
      setCommentData(formattedData);
      renderCommentListWithEvents();
    });
};

export const submitNewComment = (event) => {
  event.preventDefault();
  const name = domElements.nameInput.value.trim();
  const text = domElements.commentInput.value.trim();

  if (name.length < 3 || text.length < 3) {
    alert('Имя и комментарий должны быть не короче 3 символов');
    return;
  }

  toggleAddFormLoader(true);

  fetch(COMMENTS_API_URL, {
    method: 'POST',
    body: JSON.stringify({
      name,
      text,
      forceError: true,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error('Сервер сломался, попробуй позже');
        }
        return response.json().then((error) => {
          throw new Error(error.error || 'Некорректные данные');
        });
      }
      return response.json();
    })
    .then(() => getComments())
    .then(() => {
      domElements.nameInput.value = '';
      domElements.commentInput.value = '';
    })
    .catch((error) => {
      console.error('Post error:', error);
      if (!window.navigator.onLine) {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      } else {
        alert(error.message);
      }
    })
    .finally(() => {
      toggleAddFormLoader(false);
    });
};
