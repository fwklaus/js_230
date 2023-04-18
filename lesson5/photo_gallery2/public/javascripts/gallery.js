document.addEventListener("DOMContentLoaded", function() {
  let slides = document.querySelector('#slides');
  let header = document.querySelector('section > header');
  let commentsList = document.querySelector('#comments ul');
  let next = document.querySelector('.next');
  let previous = document.querySelector('.prev');
  let comments = document.querySelector('#comments');
  let form = document.querySelector('form');
  let photos;
  let ids;
  let currentPhotoId;

  let request = new XMLHttpRequest();
  request.open('GET', '/photos');
  request.responseType = 'json';
  request.send();

  function removeInnerHTML(element) {
    let length = element.childNodes.length;
    let childNodes = element.childNodes;
    
    for (let i = 0; i < length; i++) {
      childNodes[0].remove();
    }
  }

  function reorderSlides(shift="next") {
    switch(shift) {
      case("next"):
      ids.push(ids.shift());
      break;
      case("prev"):
      ids.unshift(ids.pop());
      break;
    }
  }

  function renderPhotos() {
    photos = ids.map(id => {
      return photos.find(photo => photo.id === id);
    })

    return templates.photos({photos: photos});
  }

  function renderPhotoInformation() {
    let photo = photos.filter(photo => photo.id === currentPhotoId)[0];
    return templates.photo_information(photo);
  }

  function renderPage() {
    let photoHTML = renderPhotos();
    let photoInfoHTML = renderPhotoInformation();

    return [photoHTML, photoInfoHTML];
  }

  function fadeSlideOut() {
    slides.className = 'hide';
    removeInnerHTML(slides);
  }
  
  function fadeSlideIn(photo) {
    slides.className = '';
    slides.className = 'show';
    slides.insertAdjacentHTML("beforeEnd", photo);
  }

  function insertPhotoHTML(photo, photoInfo) {
    fadeSlideOut();
    fadeSlideIn(photo);    
    removeInnerHTML(header);
    header.insertAdjacentHTML("afterBegin", photoInfo);
  }

  function issueGetCommentRequest() {
    let commentRequest = new XMLHttpRequest();
    let path = `/comments?photo_id=${currentPhotoId}`;
    commentRequest.responseType = 'json';
    commentRequest.open('GET', path);
    commentRequest.send();

    commentRequest.addEventListener('load', event => {
      let commentRequest = event.target;
      let comments = commentRequest.response;
      let commentHTML = templates.photo_comments({comments: comments});

      removeInnerHTML(commentsList);
      commentsList.insertAdjacentHTML('afterBegin', commentHTML);
    });
  }

  request.addEventListener('load', event => {
    let request = event.target;
    photos = request.response;
    ids = photos.map(photo => photo.id);
    let firstPhotoId = Math.min(...ids);

    currentPhotoId = firstPhotoId;
    
    let [photoHTML, photoInfoHTML] = renderPage();
    insertPhotoHTML(photoHTML, photoInfoHTML);
    issueGetCommentRequest();
  });

  next.addEventListener('click', event => {
    event.preventDefault();

    reorderSlides("next");
    currentPhotoId = ids[0];
    
    let [photoHTML, photoInfoHTML] = renderPage();    
    insertPhotoHTML(photoHTML, photoInfoHTML);
    
    issueGetCommentRequest();
  });

  previous.addEventListener('click', event => {
    event.preventDefault();

    reorderSlides("prev");
    currentPhotoId = ids[0];

    let [photoHTML, photoInfoHTML] = renderPage();
    insertPhotoHTML(photoHTML, photoInfoHTML);

    issueGetCommentRequest();
  });

  header.addEventListener('click', event => {
    event.preventDefault();
    let data_property = event.target.dataset.property;
    if (data_property === 'likes') {
      let request = new XMLHttpRequest();
      request.open('POST', '/photos/like');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      let id = event.target.dataset.id;
      let json = JSON.stringify({photo_id: id});
      request.send(json);
  
      request.addEventListener('load', e => {
        let request = e.target;
        let obj = JSON.parse(request.response);
        let likes = document.querySelector('[data-property="likes"]');
        let incrementedLikes = likes.textContent.replace(/\d/, obj.total);
        likes.textContent = incrementedLikes;
      });
    } else if (data_property === 'favorites') {

      let request = new XMLHttpRequest();
      request.open('POST', 'photos/favorite');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      let id = event.target.dataset.id;
      let json = JSON.stringify({photo_id: id});
      request.send(json);

      request.addEventListener('load', e => {

        let request = e.target;
        let obj = JSON.parse(request.response);
        let favorites = document.querySelector('[data-property="favorites"]');
        let incrementedFavorites = favorites.textContent.replace(/\d/, obj.total);
        favorites.textContent = incrementedFavorites;
      });
    }
  });

  comments.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.className === 'button') {
      let formData = new FormData(form);
      let request = new XMLHttpRequest();
      request.open('POST', '/comments/new');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(new URLSearchParams(formData));

      request.addEventListener('load', function(e){
        let request = e.target;
        let response = JSON.parse(request.response);
        let currentSlide = document.querySelector('#slides figure');
        response.photo_id = Number(currentSlide.dataset.id);
        
        let commentHTML = templates.photo_comment(response);
        commentsList.insertAdjacentHTML("beforeEnd", commentHTML);

        form.reset();
      });
    }
  });
});
