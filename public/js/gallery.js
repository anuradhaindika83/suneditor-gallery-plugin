"use strict";
(function() {
  var script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/suneditor@latest/src/plugins/modules/dialog.js";
  document.head.appendChild(script);

  var css = document.createElement("style");
  css.innerHTML =
    ".se-img-dyna{ width:210px; height:235px; }.se-img-dyna:hover{ border: 2px solid #f39c4af5}";
  document.head.appendChild(css);
})();

var gallery = {
  name: "gallery",
  add: function(core) {
    core.addModule([SUNEDITOR_MODULES.dialog]);

    const context = core.context;
    context.gallery = {
      _xmlHttp: null
    };

    /** link dialog */
    let media_dialog = this.setDialog.call(core);
    context.gallery.modal = media_dialog;

    /** add event listeners */
    media_dialog
      .querySelector(".se-btn-primary")
      .addEventListener("click", this.submit.bind(core));

    /** append html */
    context.dialog.modal.appendChild(media_dialog);

    /** empty memory */
    media_dialog = null;
  },

  /** dialog */
  setDialog: function() {
    const lang = this.lang;
    const dialog = this.util.createElement("DIV");

    dialog.className = "se-dialog-content";
    dialog.style.display = "none";
    dialog.innerHTML =
      "" +
      '<form class="editor_link">' +
      '<div class="se-dialog-header">' +
      '<button type="button" data-command="close" class="close" aria-label="Close" title="Close">' +
      '<i aria-hidden="true" data-command="close" class="se-icon-cancel"></i>' +
      "</button>" +
      '<span class="se-modal-title">Image Gallery' +
      "</span>" +
      "</div>" +
      '<div class="se-dialog-body se-dialog-fixed-body">' +
      "</div>" +
      '<div class="se-dialog-footer">' +
      '<button type="submit" class="se-btn-primary" title="Close"><span>Close' +
      "</span></button>" +
      "</div>" +
      "</form>";

    return dialog;
  },

  submit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.plugins.dialog.close.call(this);
  },

  on: function() {
    this.plugins.gallery.getimages.call(this, this.context);
  },
  init: function() {},
  getimages: function(core) {
    var obj = this;
    this.context.gallery._xmlHttp = this.util.getXMLHttpRequest();
    this.context.gallery._xmlHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var jsonresp = JSON.parse(this.responseText);
        const modal = core.gallery.modal;

        var modalbody = modal.querySelector(".se-dialog-body");
        var child = modalbody.lastElementChild;
        while (child) {
          modalbody.removeChild(child);
          child = modalbody.lastElementChild;
        }

        var cobj = obj;
        console.log(jsonresp.result);
        jsonresp.result.forEach(imgdata => {
          var anchor = document.createElement("a");
          anchor.setAttribute("href", "#");
          var imgnode = document.createElement("img");
          cobj.util.addClass(imgnode, "se-img-dyna");
          imgnode.src = imgdata.url;
          anchor.addEventListener("click", function(e) {
            cobj.plugins.gallery.addimage.call(cobj, e);
          });
          anchor.appendChild(imgnode);
          modalbody.appendChild(anchor);
        });
      }
    };
    this.context.gallery._xmlHttp.open(
      "get",
      this.context.option.mediaurl,
      true
    );
    this.context.gallery._xmlHttp.send();
  },
  addimage: function(e) {
    var imgsrc = e.srcElement.src;
    this.plugins.image.create_image.call(
      this,
      imgsrc,
      "image",
      false,
      0,
      0,
      "none",
      null
    );

    this.plugins.dialog.close.call(this);
  },

  open: function() {
    this.plugins.dialog.open.call(
      this,
      "gallery",
      "gallery" === this.currentControllerName
    );
  }
};
