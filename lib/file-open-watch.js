'use babel';

import FileOpenWatchView from './file-open-watch-view';
import { CompositeDisposable } from 'atom';
import Folder from './folder';

export default {

  fileOpenWatchView: null,
  modalPanel: null,
  subscriptions: null,
  folders: [],
  state: "n",

  activate(state) {
    this.fileOpenWatchView = new FileOpenWatchView(state.fileOpenWatchViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fileOpenWatchView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'file-open-watch:startWatch': () => this.startWatch(),
      'file-open-watch:endWatch': () => this.endWatch(),
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace .tree-view .directory .header', {
      'file-open-watch:addFolder': (event) => this.addFolder(event)
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fileOpenWatchView.destroy();
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
    let path = event.target.attributes.getNamedItem('data-path').value
    if (this.checkPath(path)) {
      let folder = new Folder(path)
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
  },

  endWatch() {
    for(var i = 0; i < this.folders.length; i++) {
      this.folders[i].close();
    }
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
