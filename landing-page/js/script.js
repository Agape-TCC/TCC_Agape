document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('mainHeader');

  function toggleMobileMenu() {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (!mobileToggle || !navMenu) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
        mobileToggle.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const sections = document.querySelectorAll('section[id], header[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  const bpmDisplay = document.getElementById('simBpmValue');
  const heroBpmVal = document.getElementById('heroBpmVal');
  const simStatusPill = document.getElementById('simStatusPill');
  const simHeartIcon = document.getElementById('simHeartIcon');
  const ledBlueChild = document.getElementById('ledBlueChild');
  const ledRgbMother = document.getElementById('ledRgbMother');
  const rgbColorLabel = document.getElementById('rgbColorLabel');
  const buzzerMother = document.getElementById('buzzerMother');
  const buzzerStatusText = document.getElementById('buzzerStatusText');
  const simTerminalLog = document.getElementById('simTerminalLog');
  const simButtons = document.querySelectorAll('.btn-sim');

  let currentBpm = 72;
  let intervalBpmJitter = null;
  let audioContext = null;

  function playBuzzerBeep() {
    try {
      if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioContext = new AudioCtx();
      }
      if (!audioContext) return;
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioContext.currentTime);
      gain.gain.setValueAtTime(0.12, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + 0.35);
    } catch (e) {
    }
  }

  function setStage(stage) {
    if (ledRgbMother) {
      ledRgbMother.className = 'led-bulb led-rgb';
    }

    if (stage === 'verde') {
      currentBpm = 82;
      if (simHeartIcon) simHeartIcon.style.animationDuration = '1.1s';
      if (simStatusPill) {
        simStatusPill.className = 'sim-status-pill';
        simStatusPill.textContent = '🟢 Batimentos Estáveis';
      }

      if (ledBlueChild) {
        ledBlueChild.classList.remove('active');
        ledBlueChild.classList.add('off');
      }

      if (ledRgbMother) ledRgbMother.classList.add('green');
      if (rgbColorLabel) {
        rgbColorLabel.style.color = '#34d399';
        rgbColorLabel.textContent = 'LED RGB: Verde (Estável)';
      }
      if (buzzerMother) buzzerMother.classList.remove('active');
      if (buzzerStatusText) buzzerStatusText.textContent = 'Buzzer: Silencioso';

      addLog('Filho: 82 BPM (Estável) | Mãe: LED RGB Verde | Buzzer inativo | Filho seguro.');

    } else if (stage === 'amarela') {
      currentBpm = 96;
      if (simHeartIcon) simHeartIcon.style.animationDuration = '0.8s';
      if (simStatusPill) {
        simStatusPill.className = 'sim-status-pill warning';
        simStatusPill.textContent = '🟡 Variação Leve / Atenção';
      }

      if (ledBlueChild) {
        ledBlueChild.classList.remove('active');
        ledBlueChild.classList.add('off');
      }
      if (ledRgbMother) ledRgbMother.classList.add('yellow');
      if (rgbColorLabel) {
        rgbColorLabel.style.color = '#fcd34d';
        rgbColorLabel.textContent = 'LED RGB: Amarelo (Atenção)';
      }
      if (buzzerMother) buzzerMother.classList.remove('active');
      if (buzzerStatusText) buzzerStatusText.textContent = 'Buzzer: Silencioso';

      addLog('Filho: 96 BPM (Atenção) | Mãe: LED RGB Amarelo | Cuidador informado visualmente.');

    } else if (stage === 'roxo') {
      currentBpm = 114;
      if (simHeartIcon) simHeartIcon.style.animationDuration = '0.55s';
      if (simStatusPill) {
        simStatusPill.className = 'sim-status-pill warning';
        simStatusPill.textContent = '🟣 Batimentos Acelerados';
      }

      if (ledBlueChild) {
        ledBlueChild.classList.remove('off');
        ledBlueChild.classList.add('active');
      }

      if (ledRgbMother) ledRgbMother.classList.add('purple');
      if (rgbColorLabel) {
        rgbColorLabel.style.color = '#c084fc';
        rgbColorLabel.textContent = 'LED RGB: Roxo (Acelerado)';
      }
      if (buzzerMother) buzzerMother.classList.remove('active');
      if (buzzerStatusText) buzzerStatusText.textContent = 'Buzzer: Em espera (LED azul ativo)';

      addLog('Filho: 114 BPM (Acelerado) | LED Azul do Filho ACESO | Mãe: LED RGB Roxo.');

    } else if (stage === 'vermelha') {
      currentBpm = 130;
      if (simHeartIcon) simHeartIcon.style.animationDuration = '0.35s';
      if (simStatusPill) {
        simStatusPill.className = 'sim-status-pill danger';
        simStatusPill.textContent = '🔴 ALERTA MÁXIMO (Taquicardia)';
      }

      if (ledBlueChild) {
        ledBlueChild.classList.remove('off');
        ledBlueChild.classList.add('active');
      }
      if (ledRgbMother) ledRgbMother.classList.add('red');
      if (rgbColorLabel) {
        rgbColorLabel.style.color = '#f87171';
        rgbColorLabel.textContent = 'LED RGB: Vermelho (Risco de Crise)';
      }
      if (buzzerMother) buzzerMother.classList.add('active');
      if (buzzerStatusText) buzzerStatusText.textContent = '🔔 BUZZER APITANDO! (Intervir)';

      playBuzzerBeep();
      setTimeout(playBuzzerBeep, 200);

      addLog('ALERTA MÁXIMO! Filho: 130 BPM | Buzzer da Mãe APITANDO | Notificação enviada ao App/Site.');
    }

    if (bpmDisplay) bpmDisplay.textContent = currentBpm;
    if (heroBpmVal) heroBpmVal.textContent = currentBpm;
  }

  function addLog(message) {
    if (!simTerminalLog) return;
    const now = new Date().toLocaleTimeString('pt-BR');
    const line = `[${now}] ${message}\n`;
    simTerminalLog.textContent = line + simTerminalLog.textContent;
  }

  function startBpmJitter() {
    if (intervalBpmJitter) clearInterval(intervalBpmJitter);
    intervalBpmJitter = setInterval(() => {
      if (!bpmDisplay) return;
      const variation = Math.floor(Math.random() * 3) - 1;
      const current = parseInt(bpmDisplay.textContent, 10);
      const updated = current + variation;
      if (updated >= 55 && updated <= 160) {
        bpmDisplay.textContent = updated;
        if (heroBpmVal) heroBpmVal.textContent = updated;
      }
    }, 3200);
  }

  simButtons.forEach(button => {
    button.addEventListener('click', () => {
      simButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const stage = button.getAttribute('data-stage');
      setStage(stage);
    });
  });

  if (bpmDisplay) {
    startBpmJitter();
  }

  const contactModal = document.getElementById('contactModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="contact"]');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const contactForm = document.getElementById('contactForm');

  function openModal() {
    if (!contactModal) return;
    contactModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const firstInput = contactModal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!contactModal) return;
    contactModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensagem enviada com sucesso! A equipe do Projeto Ágape agradece pelo seu contato.');
      contactForm.reset();
      closeModal();
    });
  }

  console.log('Landing Page do Projeto Ágape carregada com sucesso');
});
