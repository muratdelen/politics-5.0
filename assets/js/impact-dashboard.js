(() => {
  const root = document.querySelector('[data-impact-dashboard]');
  if (!root) return;

  const formatNumber = new Intl.NumberFormat('tr-TR');
  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const render = (data) => {
    const maxCategory = Math.max(...data.categories.map((item) => item.value));

    root.innerHTML = `
      <div class="demo-banner" role="status">
        <strong>Demo veri modu</strong>
        <span>${escapeHtml(data.meta.label)}</span>
      </div>

      <section class="dashboard-meta" aria-label="Veri seti bilgisi">
        <span>${escapeHtml(data.meta.period)}</span>
        <span>Son güncelleme: ${escapeHtml(data.meta.lastUpdated)}</span>
      </section>

      <section class="metric-grid" aria-label="Örnek özet göstergeler">
        ${data.kpis.map((item) => `
          <article class="metric-card">
            <span>${escapeHtml(item.label)}</span>
            <strong>${formatNumber.format(item.value)}</strong>
            <small>${escapeHtml(item.note)}</small>
          </article>
        `).join('')}
      </section>

      <section class="dashboard-grid">
        <article class="dashboard-card">
          <div class="dashboard-card-head">
            <div>
              <p class="kicker">KONU DAĞILIMI</p>
              <h2>Örnek ihtiyaç sınıflandırması</h2>
            </div>
            <span class="chart-caption">Toplam: ${formatNumber.format(data.categories.reduce((sum, item) => sum + item.value, 0))}</span>
          </div>
          <div class="bar-chart" role="img" aria-label="Örnek ihtiyaç sınıflandırması çubuk grafiği">
            ${data.categories.map((item) => {
              const percent = Math.round((item.value / maxCategory) * 100);
              return `
                <div class="bar-row">
                  <div class="bar-label"><span>${escapeHtml(item.label)}</span><b>${formatNumber.format(item.value)}</b></div>
                  <div class="bar-track"><div class="bar-fill" style="width:${percent}%"></div></div>
                </div>
              `;
            }).join('')}
          </div>
        </article>

        <article class="dashboard-card">
          <div class="dashboard-card-head">
            <div>
              <p class="kicker">SÜREÇ İZLEME</p>
              <h2>Örnek işlem durumu</h2>
            </div>
          </div>
          <ol class="process-status-list">
            ${data.process.map((item, index) => `
              <li>
                <span class="status-number">${String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>${escapeHtml(item.label)}</strong>
                  <div class="status-progress" aria-label="${escapeHtml(item.label)} yüzde ${item.percent}"><span style="width:${item.percent}%"></span></div>
                </div>
                <b>${formatNumber.format(item.value)}</b>
              </li>
            `).join('')}
          </ol>
        </article>
      </section>

      <section class="dashboard-card updates-card">
        <div class="dashboard-card-head">
          <div>
            <p class="kicker">YAYIN GÜNLÜĞÜ</p>
            <h2>Örnek güncellemeler</h2>
          </div>
        </div>
        <div class="update-list">
          ${data.updates.map((item) => `
            <article>
              <time>${escapeHtml(item.date)}</time>
              <div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.description)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  };

  fetch('assets/data/demo-impact-data.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Demo verisi yüklenemedi.');
      return response.json();
    })
    .then(render)
    .catch(() => {
      root.innerHTML = '<p class="dashboard-error">Etki panosu verisi şu anda yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>';
    });
})();
