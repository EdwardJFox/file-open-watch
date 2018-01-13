'use babel';

import { CompositeDisposable } from 'atom';
import Folder from './folder';

export default {
  subscriptions: null,
  folders: [],
  state: "n",

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'file-open-watch:start-watch': () => this.startWatch(),
      'file-open-watch:end-watch': () => this.endWatch(),
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace .tree-view .directory .header', {
      'file-open-watch:add-folder': (event) => this.addFolder(event)
    }));
  },

  deactivate() {
    this.endWatch();
    this.subscriptions.dispose();
  },

  consumeTreeView(treeView) {
    selectedPaths = treeView.selectedPaths();
  },

  serialize() {
    return {
      fileOpenWatchViewState: this.fileOpenWatchView.serialize()
    };
  },

  addFolder(event) {
    let el;
    console.log(event.target);
    if(event.target.classList.contains('name')) {
      el = event.target;
    } else {
      el = event.target.querySelector('.name');
    }
    let path = el.attributes.getNamedItem('data-path').value
    if (this.checkPath(path)) {
      let folder = new Folder(path, el.parentNode)
      this.folders.push(folder);
      if(this.state === "y") {
        folder.start();
      }
    }
  },

  startWatch() {
    for(var i = 0; i < this.folders.length; i++) {
      this.folders[i].start();
    }
    this.state = "y";
  },

  endWatch() {
    for(var i = 0; i < this.folders.length; i++) {
      this.folders[i].close();
    }
    this.state = "n";
  },

  checkPath(path) {
    for(var i = 0; i < this.folders.length; i++) {
      if(this.folders[i].path === path) {
        return false;
      }
    }
    return true;
  }
};
