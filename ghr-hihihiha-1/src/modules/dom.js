'use strict';

export const domElements = {
  commentsList: document.querySelector('.comments'),
  nameInput: document.querySelector('.add-form-name'),
  commentInput: document.querySelector('.add-form-text'),
  submitButton: document.querySelector('.add-form-button'),
  addForm: document.querySelector('.add-form'),
  loader: document.querySelector('.loader'),
  addFormLoader: document.querySelector('.add-form-loader'),
  loadingMessage: document.createElement('div'),
};

export let commentData = [];

export const setCommentData = (data) => {
  commentData = data;
};

export const toggleLoader = (show) => {
  domElements.loader.classList.toggle('loader-active', show);
};

export const toggleAddFormLoader = (show) => {
  domElements.addForm.style.display = show ? 'none' : 'flex';
  domElements.addFormLoader.classList.toggle('loader-active', show);
  domElements.loadingMessage.style.display = show ? 'block' : 'none';
  domElements.submitButton.disabled = show;
};
