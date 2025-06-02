    document.addEventListener('DOMContentLoaded', () => {
    const phone = document.getElementById('phone');
    const phoneBody = document.querySelector('.phone-body');
    const screen = document.querySelector('.screen');
    const flash = document.querySelector('.flash');
    const powerButton = document.querySelector('.power-button');
    const toggleMotionBtn = document.getElementById('toggleMotionBtn');
    const botoes = document.querySelector('.botoes');
    const tela = document.getElementById('tela');
    const freefireLink = document.getElementById('freefire-link');
    const voltarVerticalBtn = document.getElementById('voltarVertical'); // botão opcional

    // Volume
    const volUp = document.querySelector('.volume-up');
    const volDown = document.querySelector('.volume-down');
    const volumeBar = document.querySelector('.volume-bar');
    const volumeBarContainer = document.querySelector('.volume-bar-container');

    let isPowered = false;
    let motionEnabled = true;
    let currentVolume = 50;
    let volumeTimeout;

    // Movimento 3D
    const handleMouseMove = (e) => {
      if (!motionEnabled) return;
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      phone.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };
    document.addEventListener('mousemove', handleMouseMove);

    toggleMotionBtn.addEventListener('click', () => {
      motionEnabled = !motionEnabled;
      toggleMotionBtn.textContent = motionEnabled ? "Desativar Movimento" : "Ativar Movimento";
      if (!motionEnabled) {
        phone.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
    });

    powerButton.addEventListener('click', () => {
      isPowered = !isPowered;
      screen.classList.toggle('powered', isPowered);
      flash.classList.toggle('powered', isPowered);
      botoes.style.display = isPowered ? 'flex' : 'none';
      tela.classList.toggle('hidden', !isPowered);
      if (isPowered) {
        tela.src = tela.src; // recarrega iframe
      }
    });

    document.addEventListener('mouseleave', () => {
      if (motionEnabled) {
        phone.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
    });

    function updateVolumeDisplay() {
      volumeBar.style.height = currentVolume + '%';
      volumeBarContainer.classList.add('active');
      clearTimeout(volumeTimeout);
      volumeTimeout = setTimeout(() => {
        volumeBarContainer.classList.remove('active');
      }, 1000);
    }

    function animateVolume(button, change) {
      button.classList.add('active');
      setTimeout(() => button.classList.remove('active'), 100);
      currentVolume = Math.min(100, Math.max(0, currentVolume + change));
      updateVolumeDisplay();
    }

    volUp.addEventListener('click', () => {
      if (!isPowered) return;
      animateVolume(volUp, 10);
    });

    volDown.addEventListener('click', () => {
      if (!isPowered) return;
      animateVolume(volDown, -10);
    });

    updateVolumeDisplay();

    // ➕ Gira o celular ao clicar no Free Fire
    freefireLink.addEventListener('click', () => {
      phone.classList.add('horizontal');
      phoneBody.classList.add('horizontal');
      screen.classList.add('horizontal');
      tela.classList.add('horizontal');
      if (voltarVerticalBtn) voltarVerticalBtn.style.display = 'block';
    });

    // 🔁 Detecta mudança de página no iframe
    tela.addEventListener('load', () => {
      try {
        const src = tela.contentWindow.location.href;
        if (!src.includes('ff.html')) {
          phone.classList.remove('horizontal');
          phoneBody.classList.remove('horizontal');
          screen.classList.remove('horizontal');
          tela.classList.remove('horizontal');
          if (voltarVerticalBtn) voltarVerticalBtn.style.display = 'none';
        }
      } catch (e) {
        // Ignora erros de CORS
      }
    });

    // 🔄 Botão para voltar manualmente (opcional)
    if (voltarVerticalBtn) {
      voltarVerticalBtn.addEventListener('click', () => {
        phone.classList.remove('horizontal');
        phoneBody.classList.remove('horizontal');
        screen.classList.remove('horizontal');
        tela.classList.remove('horizontal');
        voltarVerticalBtn.style.display = 'none';
      });
    }
  });

  // 🔙 iframe navegação
  function voltarPagina() {
    const frame = document.getElementById('tela');
    if (frame?.contentWindow?.history) {
      frame.contentWindow.history.back();
    }
  }

  function irParaHome() {
    const frame = document.getElementById('tela');
    if (frame) {
      frame.src = 'home.html';
    }
  }

  function proximaPagina() {
    const frame = document.getElementById('tela');
    if (frame?.contentWindow?.history) {
      frame.contentWindow.history.forward();
    }
  }
