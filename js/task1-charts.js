const COLORS = ['#e2b714', '#5b9bd5', '#70ad47', '#ed7d31'];
const AXIS = '#646669';
const TEXT = '#d1d0c5';
const GRID = 'rgba(100, 102, 105, 0.25)';

function svgEl(tag, attrs = {}, children = []) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
    children.forEach(child => {
        if (typeof child === 'string') el.appendChild(document.createTextNode(child));
        else if (child) el.appendChild(child);
    });
    return el;
}

function renderLineFallback({ title, xLabels, series, yMax }) {
    const W = 560, H = 200;
    const pad = { l: 42, r: 16, t: 48, b: 32 };
    const plotW = W - pad.l - pad.r;
    const plotH = H - pad.t - pad.b;
    const children = [
        svgEl('text', {
            x: W / 2, y: 18, fill: TEXT, 'font-size': 12,
            'font-family': 'Inter, sans-serif', 'text-anchor': 'middle', 'font-weight': '600',
        }, [title]),
    ];

    const itemW = Math.min(110, W / series.length);
    const startX = (W - itemW * series.length) / 2;
    series.forEach((s, i) => {
        const x = startX + i * itemW;
        children.push(
            svgEl('rect', { x, y: 28, width: 10, height: 10, fill: COLORS[i % COLORS.length], rx: 2 }),
            svgEl('text', { x: x + 14, y: 37, fill: TEXT, 'font-size': 9, 'font-family': 'Inter, sans-serif' }, [s.name]),
        );
    });

    for (let i = 0; i <= 4; i++) {
        const y = pad.t + (plotH * i) / 4;
        children.push(svgEl('line', { x1: pad.l, y1: y, x2: W - pad.r, y2: y, stroke: GRID }));
    }

    const stepX = plotW / (xLabels.length - 1);
    xLabels.forEach((label, i) => {
        children.push(svgEl('text', {
            x: pad.l + i * stepX, y: H - 10, fill: AXIS, 'font-size': 9,
            'text-anchor': 'middle', 'font-family': 'Roboto Mono, monospace',
        }, [label]));
    });

    series.forEach((s, si) => {
        const color = COLORS[si % COLORS.length];
        const points = s.values.map((v, i) => {
            const x = pad.l + i * stepX;
            const y = pad.t + plotH - (v / yMax) * plotH;
            return `${x},${y}`;
        }).join(' ');
        children.push(svgEl('polyline', { points, fill: 'none', stroke: color, 'stroke-width': 2 }));
    });

    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: '100%', role: 'img' }, children);
    return svg;
}

function createMeta(chart, topic) {
    const meta = document.createElement('div');
    meta.className = 'task1-chart-meta';

    const sourceLink = document.createElement('a');
    sourceLink.href = chart.source;
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener noreferrer';
    sourceLink.textContent = `Source: ${chart.sourceLabel}`;
    meta.appendChild(sourceLink);

    if (chart.image || chart.imageFallback) {
        const imageLink = document.createElement('a');
        imageLink.href = chart.imageFallback || chart.image;
        imageLink.target = '_blank';
        imageLink.rel = 'noopener noreferrer';
        imageLink.textContent = 'Open image';
        meta.appendChild(imageLink);
    }

    if (chart.credit) {
        const note = document.createElement('span');
        note.className = 'task1-chart-credit';
        note.textContent = chart.credit;
        meta.appendChild(note);
    }

    return meta;
}

function renderImageChart(container, chart, topic) {
    const wrap = document.createElement('div');
    wrap.className = 'task1-chart-image-wrap';

    const link = document.createElement('a');
    link.href = chart.source;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'task1-chart-link';
    link.title = `Open source: ${chart.sourceLabel}`;

    const img = document.createElement('img');
    img.alt = topic || 'IELTS Task 1 chart';
    img.loading = 'eager';
    img.decoding = 'async';

    const sources = [chart.image, chart.imageFallback].filter(Boolean);
    let sourceIndex = 0;

    const tryNextSource = () => {
        sourceIndex += 1;
        if (sourceIndex < sources.length) {
            img.src = sources[sourceIndex];
            return;
        }
        link.replaceWith(img);
        img.classList.add('task1-chart-img-error');
        const err = document.createElement('p');
        err.className = 'task1-chart-error';
        err.textContent = 'Chart image could not be loaded.';
        wrap.insertBefore(err, wrap.firstChild);
    };

    img.addEventListener('error', tryNextSource);
    img.src = sources[0];

    link.appendChild(img);
    wrap.appendChild(link);
    wrap.appendChild(createMeta(chart, topic));
    container.appendChild(wrap);
}

function renderFallbackChart(container, chart, topic) {
    const wrap = document.createElement('div');
    wrap.className = 'task1-chart-fallback-wrap';

    if (chart.fallback?.kind === 'line') {
        const svgWrap = document.createElement('div');
        svgWrap.className = 'task1-chart-fallback';
        svgWrap.appendChild(renderLineFallback(chart.fallback));
        wrap.appendChild(svgWrap);
    }

    wrap.appendChild(createMeta(chart, topic));
    container.appendChild(wrap);
}

export function renderTask1Chart(container, report) {
    if (!container) return;
    container.innerHTML = '';

    const chart = report?.chart;
    if (!chart?.source) return;

    if (chart.image) {
        renderImageChart(container, chart, report.topic);
    } else {
        renderFallbackChart(container, chart, report.topic);
    }
}

export function clearTask1Chart(container) {
    if (container) container.innerHTML = '';
}

export function updateTask1ChartPanel(panel, chartContainer, report) {
    if (!panel || !chartContainer) return;

    const isTask1 = report?.ieltsTask === 'task1' && report?.chart?.source;
    if (isTask1) {
        renderTask1Chart(chartContainer, report);
        panel.classList.remove('hidden');
    } else {
        clearTask1Chart(chartContainer);
        panel.classList.add('hidden');
    }
}
