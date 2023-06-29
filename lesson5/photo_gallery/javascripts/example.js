

// single visible photo at the top of the page - takes up width of the container
// other images are hidden to start with
// below that are four thumbnail images laid out beside one another in a single row

// first thumbnail will have a class that designates it as the currently visible image in the slideshow - active
// cliking on other thumbnails will remove that class from the current thumbnail and place it on the clicked one
  // active class thumbnail should have a border color that reflects that it is active

// when thumbnails are clicked, perform `active` class toggle
  // then:
    // hide the currently visible image
    // locate the image that was requested and show that image

// use fade animations
  // fade visible image out
  // fade the selected image in 

// the selected class 


class Photo {
  constructor() {
    this.activeThumb;
    this.setActive();
    this.bindEvents();
  }

  toggleActive(target) {
    this.activeThumb.toggleClass('active');
    let $activeThumb = $(target).parent();
    this.activeThumb = $activeThumb;
    this.activeThumb.toggleClass('active');
  }

  handleClick(e) {
    e.preventDefault();
    this.toggleActive(e.target);
    let $currentPhoto = $('figure').children('img')    
    let $newPhoto = this.activeThumb.children('img').clone();
    $currentPhoto.fadeOut("slow", () => {
      $currentPhoto.remove();
      $('figure').append($newPhoto);
    })
    
  }

  bindEvents() {
    let $ul = $('ul');
    $ul.on("click", "img", this.handleClick.bind(this));
  }

  setActive() {
    let $firstThumbnail = $('li').first();
    this.activeThumb = $firstThumbnail;
    $firstThumbnail.toggleClass('active');
  }
}

// instantiate class after the DOM loads and the photos load on the Window object
$(function() {
  $(window).on("load", e => {
    new Photo();
  });
});
