'use babel';

const watch = require('node-watch');
const shell = require('electron').shell;

export default class Folder {
  constructor(path) {
    this.path = path;
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
  }

  openFile(name) {
    shell.openItem(name);
  }
}
