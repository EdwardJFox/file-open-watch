'use babel';

import FileOpenWatch from '../lib/file-open-watch';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('FileOpenWatch', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('file-open-watch');
  });

  describe('when the file-open-watch:add-folder event is triggered', () => {
    it('I should write tests for this', () => {

    });
  });
});
