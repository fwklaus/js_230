$(function() {
  class Modal {
    constructor() {
      this.bindEvents();
    }

    removeModal(event) {
      event.preventDefault();
      let $modal = $('.modal');
      let $modalChildren = $modal.children();
      let $overlay = $('.overlay');
      $modalChildren.remove();
      $modal.remove();
      $overlay.remove();
    }

    generateOverlay() {
      let $overlay = $(document.createElement("div"));
      $overlay.addClass('overlay')
      $overlay.addClass("modal-overlay");
      document.body.insertAdjacentElement("afterbegin", $overlay.get(0));
    }

    generateModal(name, imageURL) {
      let $modalDiv = $(document.createElement('div'));
      $modalDiv.addClass('modal');

      let $heading =$(document.createElement('h2'));
      $heading.text(name);
      $heading.addClass('name')

      let $img = $(document.createElement('img'));
      $img.attr("src", imageURL);
      $img.attr("alt", name);
      $img.addClass('modal_face');

      let $close = $(document.createElement('img'));
      $close.attr("src", "images/icon_close.png");
      $close.addClass('close');

      let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta nibh venenatis cras sed felis eget velit aliquet sagittis. In nibh mauris cursus mattis molestie a iaculis. Vel quam elementum pulvinar etiam non quam lacus. Dignissim diam quis enim lobortis. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Volutpat diam ut venenatis tellus.'
      let $content = $(document.createElement('p'));
      $content.text(text);

      $modalDiv.append($img);
      $modalDiv.append($close);
      $modalDiv.append($heading);
      $modalDiv.append($content);

      document.body.insertAdjacentElement("afterbegin", $modalDiv.get(0));
    }

    displayTeamMember(event) {
      event.preventDefault();

      let name = event.target.alt;
      let imageURL = event.target.src;       
      this.generateOverlay();
      this.generateModal(name, imageURL);
      this.bindModalEvents();
    }

    bindModalEvents() {
      $('.close').on("click", this.removeModal.bind(this));
      $('.modal-overlay').on("click", this.removeModal.bind(this));
    }

    bindEvents() {
      $('img').click(this.displayTeamMember.bind(this));
    }
  }

  new Modal();
});
