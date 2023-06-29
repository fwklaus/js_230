function SlideShow() {
  this.photoTemplate;
  this.photoInfoTemplate;
  this.photoCommentsTemplate;
  this.registerTemplates();

  (async function(that) {
    try {
      that.photos = await that.getPhotos();
      that.comments = await that.getComments();
      that.renderPhotos();
      that.renderComments();
      that.bindEvents();
    } catch (e) {
      console.log(e);
    }
  })(this);
}

SlideShow.prototype = {
  registerTemplates() {
    let photoTemplate = document.querySelector('#photos').innerHTML;
    let photoInfoTemplate = document.querySelector('#photo_information').innerHTML;
    let photoCommentsTemplate = document.querySelector('#photo_comments').innerHTML;
    let photoCommentPartial = document.querySelector('#photo_comment').innerHTML;
  
    this.photoTemplate = Handlebars.compile(photoTemplate);
    this.photoInfoTemplate = Handlebars.compile(photoInfoTemplate);
    this.photoCommentsTemplate = Handlebars.compile(photoCommentsTemplate);
    photoCommentPartial = Handlebars.compile(photoCommentPartial);

    Handlebars.registerPartial("photo_comment", photoCommentPartial);
  },

  getPhotos() {
    return new Promise((resolve, reject) => {
        let photoRequest = new XMLHttpRequest();
        photoRequest.open('GET', '/photos');
        photoRequest.responseType = 'json';
    
        photoRequest.addEventListener("load", e => {
          e.preventDefault();

          if (e.target.status === 200) {
            resolve(e.target.response);
          } else {
            reject('Bad Request');
          }
        });
        
        photoRequest.addEventListener("error", e => {
          e.preventDefault();
          reject('Something bad happened requesting photos...');
        });
    
        photoRequest.send();
    });
  },

  getComments(photoId) {
    photoId = photoId || 1;

    return new Promise((resolve, reject) => {
      let commentRequest = new XMLHttpRequest();
      commentRequest.open('GET', `/comments?photo_id=${photoId}`);
      commentRequest.responseType = 'json';

      commentRequest.addEventListener('load', e => {
        if (e.target.status === 200) {
          resolve(e.target.response);
        } else {
          reject('Bad comment request');
        }
      });

      commentRequest.addEventListener('error', e => {
        reject('Something bad happened requesting comments...');
      });

      commentRequest.send();
    });
  },

  renderPhotos(photoIdx = 0) {
    let slides = document.querySelector('#slides');
    while (slides.firstChild) {
      slides.removeChild(slides.firstChild);
    }

    let photoHTML = this.photoTemplate({photos: this.photos});  
    slides.insertAdjacentHTML("afterbegin", photoHTML);
    this.renderPhotoInfo(photoIdx, this.photos);
  },

  renderPhotoInfo(photoIdx) {
    let photoInfo = document.querySelector('section > header');
    while(photoInfo.firstChild) {
      photoInfo.removeChild(photoInfo.firstChild);
    }

    let photoInfoHTML = this.photoInfoTemplate(this.photos[photoIdx]); 
    photoInfo.insertAdjacentHTML("beforeend", photoInfoHTML);
  },

  renderComments() {
    let commentsList = document.querySelector('#comments ul');
    while(commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }

    let commentHTML = this.photoCommentsTemplate({comments: this.comments});
    commentsList.insertAdjacentHTML("afterbegin", commentHTML);
  },

  fadeOut() {
    let firstPhoto = document.querySelector('#slides figure');
    firstPhoto.classList.remove('fade-in');
    firstPhoto.classList.add('fade-out');
  },

  fadeIn() {
    let firstPhoto = document.querySelector('#slides figure');
    firstPhoto.classList.remove('fade-out');
    firstPhoto.classList.add('fade-in');
  },

  handleNext(event) {
    event.preventDefault();

    let slides = document.querySelector('#slides');
    let photoSlides = document.querySelectorAll('#slides figure');
    let currentPhotoId = Number(photoSlides[0].dataset.id);
    let currentNode = document.querySelector(`figure[data-id="${currentPhotoId}"]`);
    let nextPhotoId = Number(photoSlides[1].dataset.id);
    let nextCommentsInput = document.querySelector('input[name="photo_id"]');
    nextCommentsInput.value = nextPhotoId;

    this.fadeOut();    
    setTimeout(() => {
      slides.appendChild(currentNode);
      this.fadeIn();
    }, 2000);

    (async function(that) {
      try {
        that.comments = await that.getComments(nextPhotoId);
        that.photos = await that.getPhotos();
        that.renderPhotoInfo(nextPhotoId - 1);
        that.renderComments();
        that.rebindActionButtons();
      } catch(e) {
        console.log(e);
      }
    })(this);
  },

  handlePrevious(event) {
    event.preventDefault();

    let slides = document.querySelector('#slides');
    let photoSlides = document.querySelectorAll('#slides figure');
    let currentPhotoId = Number(photoSlides[0].dataset.id);
    let previousPhotoId;
    let prevCommentsInput = document.querySelector('input[name="photo_id"]');
    
    if(currentPhotoId === 1) {
      previousPhotoId = 3
    } else {
      previousPhotoId = currentPhotoId - 1;
    }
    
    prevCommentsInput.value = previousPhotoId;
    let currentNode = document.querySelector(`figure[data-id="${currentPhotoId}"]`);
    let previousNode = document.querySelector(`figure[data-id="${previousPhotoId}"]`);

    this.fadeOut();
    setTimeout(() => {
      slides.insertBefore(previousNode, currentNode)
      this.fadeIn();
    }, 2000);

    (async function(that) {
      try {
      that.comments = await that.getComments(previousPhotoId);
      that.photos = await that.getPhotos();
      that.renderPhotoInfo(previousPhotoId - 1);
      that.renderComments();
      that.rebindActionButtons();
      } catch (error) {
        console.log(error);
      }
    })(this);
  },

  handleAction(event) {
    event.preventDefault();
    let button = event.target;
    let buttonId = event.target.dataset.id;
    
    switch(button.dataset.property) {
      case('likes'):
        this.incrementLikes(button, buttonId);
        break;
      case('favorites'):
        this.incrementFavorites(button, buttonId);
        break;
    }
  },

  incrementLikes(button, buttonId) {
    fetch('/photos/like', {
      method: 'POST',
      responseType: 'json',
      headers: {
      "Content-Type": "application/json",
        },
        body: JSON.stringify({photo_id: buttonId}),
    }).then(response => {
      return response.json();
    }).then( json => {
      button.textContent = button.textContent.replace(/[\d]+/, json.total);
    }).catch( e => {
      console.log(e);
    });
  },

  incrementFavorites(button, id) {
    fetch('/photos/favorite', {
      method: 'POST',
      responseType: 'json',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({photo_id: id}),
    }).then(response => {
      return response.json();
    }).then(json => {
      button.textContent = button.textContent.replace(/[\d]+/, json.total);
    }).catch(e => {
      console.log(e);
    })
  },

  postNewComment(event) {
    event.preventDefault();
    let form = event.target;
    let encoded = new URLSearchParams(new FormData(form)).toString();
    let photoId = document.querySelector('figure').dataset.id;

    (async function() {
      await fetch('/comments/new', {
        method: "POST",
        responseType: 'json', 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encoded,
      }).then(response => {
        return response.json();
      }).then(json => {
        return json;
      });
      this.comments = await this.getComments(photoId);
      this.renderComments();
      form.reset();
    }.bind(this))();
  },

  bindEvents() {
    let next = document.querySelector('a.next');
    let previous = document.querySelector('a.prev');
    let actions = document.querySelector('div.actions');
    let form = document.querySelector('form');

    next.addEventListener('click', this.handleNext.bind(this));
    previous.addEventListener('click', this.handlePrevious.bind(this));
    actions.addEventListener('click', this.handleAction.bind(this));
    form.addEventListener('submit', this.postNewComment.bind(this));
  },

  rebindActionButtons() {
    let actions = document.querySelector('div.actions');
    actions.addEventListener('click', this.handleAction.bind(this));
  }
};

document.addEventListener("DOMContentLoaded", e => {
  new SlideShow();
});
