'use babel';

const watch = require('node-watch');
const shell = require('electron').shell;

export default class Folder {
  constructor(path, element) {
    this.path = path;
    this.element = element;

    this.addStyle();
  }

  start() {
    this.watcher = watch(this.path, { recursive: true });

    this.watcher.on('change', (evt, name) => {
      if(evt === 'update') {
        this.openFile(name);
      }
    });

    this.watcher.on('error', (err) => {
      console.log(err);
    });
  }

  close() {
    this.watcher.close();
    this.element.classList.remove("watched-active");
  }

  openFile(name) {
    shell.openItem(name);
  }

  addStyle() {
    this.element.classList.add("watched");

    let eye = document.createElement("svg");
    this.element.append(eye);
    eye.outerHTML = '<svg class="watch-eye-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>'
  }
}
