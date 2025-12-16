/**
 * @file JS file for the off-canvas dialog component.
 */

(function offCanvasDialogScript(Drupal, once) {
  Drupal.behaviors.offCanvasDialog = {
    attach(context) {
      console.log('%c Port %c umna ', 'display: inline-block; background: blue; color: white; border-left: 2px solid black; border-top: 2px solid black; border-bottom: 2px solid black;', 'display: inline-block; background: yellow; color: black; border-right: 2px solid black; border-top: 2px solid black; border-bottom: 2px solid black;');
      const offCanvasButtons = once('allOffCanvasDialogTriggers', '.header__off-canvas-button', context);

      function closeOffCanvas(offCanvas) {
        offCanvas.classList.add('off-canvas--closing');
        setTimeout(() => {
          offCanvas.close();
          offCanvas.style.display = 'none';
          offCanvas.classList.remove('off-canvas--closing');
        }, 300);
      }

      offCanvasButtons.forEach(button => {
        button.addEventListener('click', () => {
          const offCanvas = context.querySelector('.off-canvas');
          const offCanvasClose = offCanvas.querySelector('.off-canvas__off-canvas-button');
          if (offCanvas.hasAttribute('open')) {
            closeOffCanvas(offCanvas);
          } else {
            offCanvas.style.display = 'block';
            setTimeout(() => {
              offCanvas.showModal();
            }, 300);
          }

          offCanvasClose.addEventListener('click', () => {
            offCanvas.close();
          });
        });

        // Ensure the event listener for closing the dialog is added only once
        document.addEventListener('click', (e) => {
          const offCanvasDialog = context.querySelector('.off-canvas');
          const offCanvasDialogInner = offCanvasDialog.querySelector('.region-off-canvas');
          if (
            offCanvasDialog.hasAttribute('open') &&
            !offCanvasDialogInner.contains(e.target) && // Check if the click is outside the dialog content
            !e.target.closest('.header__off-canvas-button') // Check if the click is not on the trigger button
          ) {
            closeOffCanvas(offCanvasDialog);
          }
        });
      });

    },
  };
})(Drupal, once);
