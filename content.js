let executed = false;

function executeScript() {
  if (executed) return;
  // Irá verificar a cada 100 milissegundos se o player já está disponível
  const checkForPlayerInterval = setInterval(() => {
    const player = document.querySelector('video');
    if (player && player.tagName.toLowerCase() === 'video') {
      //Estando disponível ele limpar o setInterval
      clearInterval(checkForPlayerInterval);

      // Recupera a opção selecionada do localStorage
      let selectedOption =
        localStorage.getItem('selectedOption') || 'Português';
      // Se a opção não existir, sai da função
      if (!selectedOption) return;

      // Essa parte do código serve para verificar se as legendas estão ativas ou não
      const captionsButton = document.querySelector('.ytp-subtitles-button');
      if (!captionsButton.getAttribute('aria-pressed')) return;

      if (captionsButton.getAttribute('aria-pressed') === 'false') {
        captionsButton.click();
      }

      // Serve para abrir o botão de configuração
      const buttonDetails = document.querySelector('.ytp-settings-button');
      buttonDetails.click();

      //Espera 0.5 segundos para clicar em Legendas/CC
      setTimeout(() => {
        const detailsMenu = document.querySelector(
          '.ytp-popup .ytp-panel-menu'
        );
        detailsMenu.children[2].click();

        //Espera 0.5 segundos para clicar em Traduzir Automaticamente
        setTimeout(() => {
          const subtitlesPanel = document.querySelector('.ytp-panel');
          const buttonToSubtittles = Array.from(
            subtitlesPanel.children[1].children
          ).filter((op) => op.innerText.toLowerCase().includes('tra'));

          if (!buttonToSubtittles) return;

          buttonToSubtittles[0].click();

          //Espera 0.5 para Escolher a legenda que você quer.
          setTimeout(() => {
            const listSubtitles = document.querySelectorAll(
              '.ytp-menuitem-label'
            );
            const option = Array.from(listSubtitles).find(
              (option) => option.textContent === selectedOption
            );

            if (option) {
              option.click();
            }
          }, 700);
        }, 800);
      }, 800);
    }
  }, 100);
  executed = true;
}
executeScript();
