export function animateClick(element, onComplete) {
  if (!element) {
    onComplete?.();
    return;
  }
  element.style.transition = 'transform 0.1s ease';
  element.style.transform = 'scale(0.7)';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
    setTimeout(() => {
      element.style.transition = '';
      onComplete?.();
    }, 100);
  }, 100);
}

export function requestImmersiveOnce() {
  const doc = document.documentElement;
  if (doc.requestFullscreen && !document.fullscreenElement) {
    doc.requestFullscreen().catch(() => {});
  } else if (doc.webkitRequestFullscreen && !document.webkitFullscreenElement) {
    doc.webkitRequestFullscreen().catch(() => {});
  }
}
