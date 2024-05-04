function infobulle(e) {
    const $this = e.target;
    const title = $this.getAttribute('title');
    const type = e.type;
    const offset = $this.getBoundingClientRect();
    const xOffset = e.pageX - offset.left + 10;
    const yOffset = e.pageY - offset.top + 30;

    if (type === 'mouseenter') {
        $this.dataset.tipText = title;
        $this.removeAttribute('title');
        const tooltip = document.createElement('span');
        tooltip.className = 'title';
        tooltip.textContent = title;
        tooltip.style.top = yOffset + 'px';
        tooltip.style.left = xOffset + 'px';
        $this.appendChild(tooltip);
        tooltip.style.display = 'block';
    } else if (type === 'mouseleave') {
        $this.setAttribute('title', $this.dataset.tipText);
        const tooltip = $this.querySelector('.title');
        if (tooltip) {
            tooltip.style.display = 'none';
            $this.removeChild(tooltip);
        }
    } else if (type === 'mousemove') {
        const tooltip = $this.querySelector('.title');
        if (tooltip) {
            tooltip.style.top = yOffset + 'px';
            tooltip.style.left = xOffset + 'px';
        }
    }
}

// Ajoutez l'écouteur d'événement au document
document.querySelectorAll('.tooltip').forEach((element) => {
    element.addEventListener('mouseenter', onHoverToggleTooltip);
    element.addEventListener('mouseleave', onHoverToggleTooltip);
    element.addEventListener('mousemove', onHoverToggleTooltip);
});
