'use strict';

import { domElements, commentData } from './dom.js';
import { escapeHTML } from '../../utils.js';

export const renderCommentList = () => {
  domElements.commentsList.innerHTML = commentData
    .map(
      (comment, index) => `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div class="head-name">${escapeHTML(comment.name)}</div>
            <div class="head-time">${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${escapeHTML(comment.text)}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`
    )
    .join('');
};

export const renderCommentListWithEvents = () => {
  renderCommentList();

  domElements.commentsList.querySelectorAll('.like-button').forEach((button) =>
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      commentData[index].isLiked = !commentData[index].isLiked;
      commentData[index].likes += commentData[index].isLiked ? 1 : -1;
      renderCommentList();
    })
  );

  domElements.commentsList.querySelectorAll('.comment').forEach((commentElement) =>
    commentElement.addEventListener('click', () => {
      const index = commentElement.dataset.index;
      domElements.commentInput.value = `> ${escapeHTML(commentData[index].text)}\n`;
      domElements.nameInput.value = commentData[index].name;
    })
  );
};
