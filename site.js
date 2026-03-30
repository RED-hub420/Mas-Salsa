
(function() {
  const data = window.MAS_DATA;
  const CART_KEY = 'masSalsaDemoCart';
  const pickupOptions = ["ASAP", "15 minutes", "30 minutes", "45 minutes", "1 hour"];

  function money(value) {
    if (value === null || value === undefined || value === "") return "Ask restaurant";
    return `$${Number(value).toFixed(2)}`;
  }

  function getCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      return raw.map(item => {
        const normalized = {
          name: item.name,
          price: Number(item.price || 0),
          qty: Number(item.qty || 1),
          modifiers: Array.isArray(item.modifiers) ? item.modifiers : [],
          instructions: item.instructions || item.note || ''
        };
        normalized.signature = item.signature || createSignature(normalized);
        return normalized;
      });
    } catch (err) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges();
  }

  function option(label, price = 0) {
    return { label, price };
  }

  function createSignature(line) {
    return [line.name, line.price, (line.modifiers || []).join('|'), line.instructions || ''].join('::');
  }

  function addLineToCart(line) {
    const cart = getCart();
    const existing = cart.find(entry => entry.signature === line.signature);
    if (existing) {
      existing.qty += line.qty;
    } else {
      cart.push(line);
    }
    saveCart(cart);
    renderCart();
    showToast(`${line.name} added to cart`);
  }

  function updateCartItem(signature, delta) {
    let cart = getCart();
    cart = cart.map(item => item.signature === signature ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0);
    saveCart(cart);
    renderCart();
  }

  function clearCart() {
    saveCart([]);
    renderCart();
  }

  function cartSubtotal(cart = getCart()) {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function updateCartBadges() {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  function getModifierGroups(category, item) {
    const categoryId = category.id;
    const name = item.name.toLowerCase();
    const groups = [];

    if (['tacos'].includes(categoryId) || name.includes('taco')) {
      groups.push({
        title: 'Protein',
        type: 'single',
        options: [option('No change'), option('Ground beef'), option('Chicken'), option('Carnitas'), option('Barbacoa'), option('Steak', 2), option('Shrimp', 3)]
      });
      groups.push({
        title: 'Tortillas',
        type: 'single',
        options: [option('No change'), option('Corn tortillas'), option('Flour tortillas')]
      });
      groups.push({
        title: 'Add-ons',
        type: 'multi',
        options: [option('Extra salsa verde', 0.75), option('Extra queso', 2), option('Extra guacamole', 2)]
      });
    }

    if (['burritos', 'nachos', 'lunch', 'alc'].includes(categoryId) || name.includes('burrito') || name.includes('quesadilla') || name.includes('nachos') || name.includes('torta') || name.includes('gordita')) {
      groups.push({
        title: 'Protein',
        type: 'single',
        options: [option('No change'), option('Ground beef'), option('Chicken'), option('Carnitas'), option('Steak', 2), option('Shrimp', 3)]
      });
      groups.push({
        title: 'Add-ons',
        type: 'multi',
        options: [option('Add queso', 2), option('Add guacamole', 2), option('Add sour cream', 1)]
      });
    }

    if (categoryId === 'enchiladas' || name.includes('enchilada')) {
      groups.push({
        title: 'Sauce',
        type: 'single',
        options: [option('No change'), option('Red sauce'), option('Green sauce'), option('Queso sauce', 1)]
      });
      groups.push({
        title: 'Add-ons',
        type: 'multi',
        options: [option('Extra cheese', 1), option('Add avocado', 2)]
      });
    }

    if (categoryId === 'fajitas' || name.includes('fajita')) {
      groups.push({
        title: 'Style',
        type: 'single',
        options: [option('No change'), option('Chicken'), option('Steak'), option('Mixed'), option('Shrimp', 2)]
      });
      groups.push({
        title: 'Tortillas',
        type: 'single',
        options: [option('No change'), option('Flour tortillas'), option('Corn tortillas')]
      });
      groups.push({
        title: 'Add-ons',
        type: 'multi',
        options: [option('Extra tortillas', 1.5), option('Extra queso', 2.5), option('Extra guacamole', 2)]
      });
    }

    if (categoryId === 'salads' || name.includes('salad')) {
      groups.push({
        title: 'Protein',
        type: 'single',
        options: [option('No change'), option('Grilled chicken'), option('Steak', 2), option('Shrimp', 3), option('Crispy chicken')]
      });
      groups.push({
        title: 'Dressing',
        type: 'single',
        options: [option('No change'), option('Ranch'), option('Salsa ranch'), option('None')]
      });
    }

    if (categoryId === 'appetizers' && (name.includes('queso') || name.includes('guac') || name.includes('chori'))) {
      groups.push({
        title: 'Add-ons',
        type: 'multi',
        options: [option('Add seasoned beef', 2), option('Add chicken', 2), option('Add jalapeños', 0.5)]
      });
    }

    if (categoryId === 'drinks') {
      groups.push({
        title: 'Drink options',
        type: 'multi',
        options: [option('No ice'), option('Extra ice'), option('Add lemon'), option('Add cherry', 0.5)]
      });
    }

    if (categoryId === 'mocktails') {
      groups.push({
        title: 'Flavor',
        type: 'single',
        options: [option('No change'), option('Lime'), option('Strawberry'), option('Mango')]
      });
    }

    if (categoryId === 'kids') {
      groups.push({
        title: 'Side',
        type: 'single',
        options: [option('No change'), option('Rice and beans'), option('Fries')]
      });
      groups.push({
        title: 'Drink',
        type: 'single',
        options: [option('No change'), option('Kid Coke'), option('Kid Sprite'), option('Kid Dr Pepper'), option('Kid Lemonade')]
      });
    }

    if (categoryId === 'desserts' || name.includes('fried ice cream') || name.includes('cheesecake')) {
      groups.push({
        title: 'Add-ons',
        type: 'multi',
        options: [option('Add ice cream scoop', 1.5), option('Extra chocolate drizzle', 0.75)]
      });
    }

    const deduped = [];
    const seen = new Set();
    groups.forEach(group => {
      const key = `${group.title}-${group.type}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(group);
      }
    });
    return deduped;
  }

  function openItemModal(category, item) {
    const modal = document.querySelector('#item-modal');
    const content = document.querySelector('#item-modal-content');
    if (!modal || !content) return;
    const groups = getModifierGroups(category, item);
    content.innerHTML = `
      <form class="modal-form" id="item-config-form">
        <p class="eyebrow">Customize item</p>
        <h2 id="item-modal-title">${item.name}</h2>
        <p class="menu-meta">Base price: ${money(item.price)}${item.startsAt ? ' • final price may change with selections.' : ''}</p>
        ${groups.length ? '<p class="menu-meta">Choose any options that apply to this pickup order.</p>' : '<p class="menu-meta">Add quantity and any special instructions below.</p>'}
        <div class="modifier-stack">
          ${groups.map((group, groupIndex) => `
            <fieldset class="modifier-group">
              <legend>${group.title}</legend>
              <div class="modifier-options ${group.type === 'multi' ? 'modifier-options-multi' : ''}">
                ${group.options.map((choice, choiceIndex) => {
                  const inputName = `group-${groupIndex}`;
                  const choiceValue = `${choice.label}||${choice.price || 0}`;
                  const priceText = (choice.price || 0) > 0 ? ` <span>+${money(choice.price)}</span>` : '';
                  const type = group.type === 'multi' ? 'checkbox' : 'radio';
                  const checked = group.type === 'single' && choiceIndex === 0 ? 'checked' : '';
                  return `
                    <label class="modifier-option">
                      <input type="${type}" name="${inputName}" value="${choiceValue}" ${checked}>
                      <span>${choice.label}${priceText}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </fieldset>
          `).join('')}
        </div>
        <div class="field-grid compact">
          <label>
            <span class="field-label">Quantity</span>
            <input class="input" type="number" min="1" max="25" name="qty" value="1">
          </label>
          <label>
            <span class="field-label">Special instructions</span>
            <input class="input" type="text" name="instructions" placeholder="No onions, extra salsa, etc.">
          </label>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" type="button" data-modal-close>Cancel</button>
          <button class="btn btn-primary" type="submit">Add to cart</button>
        </div>
      </form>
    `;
    modal.hidden = false;
    document.body.classList.add('modal-open');

    content.querySelectorAll('[data-modal-close]').forEach(btn => btn.addEventListener('click', closeItemModal));
    const form = document.querySelector('#item-config-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(form);
      const selectedModifiers = [];
      let modifierPrice = 0;

      groups.forEach((group, groupIndex) => {
        const values = group.type === 'multi' ? formData.getAll(`group-${groupIndex}`) : [formData.get(`group-${groupIndex}`)].filter(Boolean);
        values.forEach(raw => {
          if (!raw) return;
          const [label, priceStr] = raw.split('||');
          const price = Number(priceStr || 0);
          if (label.toLowerCase() === 'no change') return;
          selectedModifiers.push(price > 0 ? `${label} (+${money(price)})` : label);
          modifierPrice += price;
        });
      });

      const qty = Math.max(1, Math.min(25, Number(formData.get('qty') || 1)));
      const instructions = String(formData.get('instructions') || '').trim();
      const unitPrice = Number(item.price || 0) + modifierPrice;
      const line = {
        name: item.name,
        price: unitPrice,
        qty,
        modifiers: selectedModifiers,
        instructions,
        signature: ''
      };
      line.signature = createSignature(line);
      addLineToCart(line);
      closeItemModal();
    });
  }

  function closeItemModal() {
    const modal = document.querySelector('#item-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function createMenuCard(category, item, orderable = false) {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-card-head">
        <h3>${item.name}</h3>
        <div class="price-pill">${money(item.price)}</div>
      </div>
      <p class="menu-meta">${item.startsAt ? 'Base starting price shown.' : 'Current menu item.'}</p>
      ${orderable ? `<button class="btn btn-small btn-primary">Customize</button>` : `<span class="menu-note">${item.price == null ? 'Ask restaurant for current pricing.' : 'Menu reference only.'}</span>`}
    `;
    if (orderable) {
      card.querySelector('button').addEventListener('click', () => openItemModal(category, item));
    }
    return card;
  }

  function createSection(category, forOrderPage = false) {
    const section = document.createElement('section');
    section.className = 'menu-section';
    section.id = category.id;
    section.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${category.group}</p><h2>${category.title}</h2>${category.subtitle ? `<p class="section-subtitle">${category.subtitle}</p>` : ''}</div>${category.note ? `<p class="section-note">${category.note}</p>` : ''}</div>`;
    if (category.sections) {
      category.sections.forEach(sub => {
        const wrap = document.createElement('div');
        wrap.className = 'subsection';
        wrap.innerHTML = `<h3 class="subsection-title">${sub.title}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'menu-grid';
        sub.items.forEach(item => grid.appendChild(createMenuCard(category, item, forOrderPage && category.orderable)));
        wrap.appendChild(grid);
        section.appendChild(wrap);
      });
    } else {
      const grid = document.createElement('div');
      grid.className = 'menu-grid';
      category.items.forEach(item => grid.appendChild(createMenuCard(category, item, forOrderPage && category.orderable)));
      section.appendChild(grid);
    }
    return section;
  }

  function renderMenuPage() {
    const target = document.querySelector('[data-render="menu-page"]');
    if (!target) return;
    target.innerHTML = '';
    data.menuCategories.forEach(category => target.appendChild(createSection(category, false)));
    renderCategoryChips('[data-category-chips="menu"]', data.menuCategories);
    wireSearch('[data-menu-search]', target);
  }

  function renderOrderPage() {
    const target = document.querySelector('[data-render="order-page"]');
    if (!target) return;
    const orderCategories = data.menuCategories.filter(c => c.orderable && c.group !== 'bar');
    target.innerHTML = '';
    orderCategories.forEach(category => target.appendChild(createSection(category, true)));
    renderCategoryChips('[data-category-chips="order"]', orderCategories);
    wireSearch('[data-order-search]', target);
    populatePickupTimes();
    renderCart();

    const form = document.querySelector('#pickup-order-form');
    if (form && !form.dataset.wired) {
      form.dataset.wired = 'true';
      form.addEventListener('submit', event => {
        event.preventDefault();
        const cart = getCart();
        if (!cart.length) {
          showToast('Cart is empty. Add items before sending a pickup request.');
          return;
        }
        const formData = new FormData(form);
        const confirmation = document.querySelector('#order-confirmation');
        const orderNo = `MS-${Math.floor(1000 + Math.random() * 9000)}`;
        const pickupTime = formData.get('pickupTime');
        const name = formData.get('name');
        const subtotal = cartSubtotal(cart);
        const tax = subtotal * 0.0825;
        const total = subtotal + tax;
        const orderLines = cart.map(item => `
          <li>
            <div>
              <strong>${item.qty} × ${item.name}</strong>
              ${item.modifiers && item.modifiers.length ? `<p>${item.modifiers.join(' • ')}</p>` : ''}
              ${item.instructions ? `<p>Note: ${item.instructions}</p>` : ''}
            </div>
            <span>${money(item.price * item.qty)}</span>
          </li>
        `).join('');
        confirmation.innerHTML = `
          <div class="confirmation-card">
            <p class="eyebrow">Pickup request received</p>
            <h2>Thanks, ${name || 'guest'}.</h2>
            <p>Request <strong>${orderNo}</strong> is set for <strong>${pickupTime}</strong>.</p>
            <ul class="confirmation-list">${orderLines}</ul>
            <div class="confirmation-grid">
              <div><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
              <div><span>Estimated tax</span><strong>${money(tax)}</strong></div>
              <div><span>Total</span><strong>${money(total)}</strong></div>
              <div><span>Pickup phone</span><strong>${formData.get('phone') || data.restaurant.phone}</strong></div>
            </div>
            <p class="confirmation-note">Payment and kitchen routing are not connected yet on this website preview.</p>
            <button class="btn btn-primary" id="start-new-order">Start a new order</button>
          </div>
        `;
        confirmation.hidden = false;
        confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearCart();
        form.reset();
        populatePickupTimes();
        document.querySelector('#start-new-order').addEventListener('click', () => {
          confirmation.hidden = true;
        });
      });
    }

    const modal = document.querySelector('#item-modal');
    if (modal && !modal.dataset.wired) {
      modal.dataset.wired = 'true';
      modal.addEventListener('click', event => {
        if (event.target === modal || event.target.hasAttribute('data-modal-close')) closeItemModal();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeItemModal();
      });
    }
  }

  function renderCart() {
    const list = document.querySelector('[data-cart-items]');
    const summary = document.querySelector('[data-cart-summary]');
    if (!list || !summary) return;
    const cart = getCart();
    if (!cart.length) {
      list.innerHTML = `<div class="empty-cart"><p>Your cart is empty.</p><span>Add items from the menu to begin your pickup order.</span></div>`;
      summary.innerHTML = `
        <div><span>Subtotal</span><strong>$0.00</strong></div>
        <div><span>Estimated tax</span><strong>$0.00</strong></div>
        <div class="summary-total"><span>Total</span><strong>$0.00</strong></div>
      `;
      return;
    }
    list.innerHTML = '';
    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `
        <div>
          <h4>${item.name}</h4>
          <p>${money(item.price)} each</p>
          ${item.modifiers && item.modifiers.length ? `<div class="cart-tags">${item.modifiers.map(tag => `<span>${tag}</span>`).join('')}</div>` : ''}
          ${item.instructions ? `<span class="cart-note">Note: ${item.instructions}</span>` : ''}
        </div>
        <div class="qty-controls">
          <button type="button" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button type="button" aria-label="Increase quantity">+</button>
        </div>
      `;
      const [minus, plus] = row.querySelectorAll('button');
      minus.addEventListener('click', () => updateCartItem(item.signature, -1));
      plus.addEventListener('click', () => updateCartItem(item.signature, 1));
      list.appendChild(row);
    });
    const subtotal = cartSubtotal(cart);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;
    summary.innerHTML = `
      <div><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
      <div><span>Estimated tax</span><strong>${money(tax)}</strong></div>
      <div class="summary-total"><span>Total</span><strong>${money(total)}</strong></div>
    `;
  }

  function populatePickupTimes() {
    const select = document.querySelector('select[name="pickupTime"]');
    if (!select) return;
    select.innerHTML = pickupOptions.map(option => `<option value="${option}">${option}</option>`).join('');
  }

  function renderCategoryChips(selector, categories) {
    const wrap = document.querySelector(selector);
    if (!wrap) return;
    wrap.innerHTML = categories.map(category => `<a href="#${category.id}" class="chip">${category.title}</a>`).join('');
  }

  function wireSearch(inputSelector, target) {
    const input = document.querySelector(inputSelector);
    if (!input || input.dataset.wired) return;
    input.dataset.wired = 'true';
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      target.querySelectorAll('.menu-section').forEach(section => {
        const cards = section.querySelectorAll('.menu-card');
        let sectionHit = false;
        cards.forEach(card => {
          const hit = !q || card.textContent.toLowerCase().includes(q);
          card.style.display = hit ? '' : 'none';
          if (hit) sectionHit = true;
        });
        const visibleSubsections = section.querySelectorAll('.subsection');
        if (visibleSubsections.length) {
          visibleSubsections.forEach(sub => {
            const hits = [...sub.querySelectorAll('.menu-card')].some(card => card.style.display !== 'none');
            sub.style.display = hits ? '' : 'none';
            if (hits) sectionHit = true;
          });
        }
        section.style.display = sectionHit ? '' : 'none';
      });
    });
  }

  function renderHours() {
    document.querySelectorAll('[data-render="hours"]').forEach(target => {
      target.innerHTML = data.restaurant.hours.map(entry => `
        <div class="hour-row">
          <span>${entry.day}</span>
          <strong>${entry.open === 'Closed' ? 'Closed' : `${entry.open} – ${entry.close}`}</strong>
        </div>
      `).join('');
    });
  }

  function renderHeaderFooter() {
    document.querySelectorAll('[data-restaurant-name]').forEach(el => el.textContent = data.restaurant.name);
    document.querySelectorAll('[data-phone]').forEach(el => el.textContent = data.restaurant.phone);
    document.querySelectorAll('[data-phone-href]').forEach(el => el.setAttribute('href', data.restaurant.phoneHref));
    document.querySelectorAll('[data-address]').forEach(el => el.textContent = data.restaurant.address);
    document.querySelectorAll('[data-facebook]').forEach(el => el.setAttribute('href', data.restaurant.facebookUrl));
    document.querySelectorAll('[data-maps]').forEach(el => el.setAttribute('href', data.restaurant.mapsUrl));
  }

  function renderHomePage() {
    const featured = document.querySelector('[data-render="featured-items"]');
    if (featured) {
      featured.innerHTML = data.featuredItems.map(item => `
        <article class="feature-card">
          <img src="${item.image}" alt="${item.name}">
          <div class="feature-content">
            <span class="tag">${item.tag}</span>
            <h3>${item.name}</h3>
            <p>${money(item.price)}</p>
          </div>
        </article>
      `).join('');
    }
    const upcoming = document.querySelector('[data-render="upcoming-events"]');
    if (upcoming) {
      upcoming.innerHTML = data.upcomingEvents.map(event => `
        <article class="event-card">
          <img src="${event.image}" alt="${event.title}">
          <div class="event-content">
            <p class="eyebrow">Upcoming live music</p>
            <h3>${event.title}</h3>
            <p class="event-date">${event.dateLabel}</p>
            <p>${event.description}</p>
            <a class="btn btn-small btn-secondary" href="events.html">See events</a>
          </div>
        </article>
      `).join('');
    }
  }

  function renderEventsPage() {
    const upcoming = document.querySelector('[data-render="events-upcoming"]');
    if (upcoming) {
      upcoming.innerHTML = data.upcomingEvents.map(event => `
        <article class="event-card large">
          <img src="${event.image}" alt="${event.title}">
          <div class="event-content">
            <p class="eyebrow">Upcoming</p>
            <h3>${event.title}</h3>
            <p class="event-date">${event.dateLabel}</p>
            <p>${event.description}</p>
            <a class="btn btn-small btn-primary" href="contact.html">Call to confirm details</a>
          </div>
        </article>
      `).join('');
    }
    const past = document.querySelector('[data-render="events-past"]');
    if (past) {
      past.innerHTML = data.pastEvents.map(event => `
        <article class="event-card">
          <img src="${event.image}" alt="${event.title}">
          <div class="event-content">
            <p class="eyebrow">Recent flyer</p>
            <h3>${event.title}</h3>
            <p class="event-date">${event.dateLabel}</p>
            <p>${event.description}</p>
          </div>
        </article>
      `).join('');
    }
  }

  function showToast(message) {
    let toast = document.querySelector('.site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'site-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(window.__masToastTimer);
    window.__masToastTimer = setTimeout(() => toast.classList.remove('visible'), 1800);
  }

  function wireMenuToggle() {
    const btn = document.querySelector('[data-mobile-nav-toggle]');
    const nav = document.querySelector('[data-site-nav]');
    if (!btn || !nav || btn.dataset.wired) return;
    btn.dataset.wired = 'true';
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      btn.classList.toggle('open');
    });
  }

  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-site-nav] a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) link.classList.add('active');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeaderFooter();
    renderHours();
    renderHomePage();
    renderMenuPage();
    renderOrderPage();
    renderEventsPage();
    renderCart();
    updateCartBadges();
    wireMenuToggle();
    setActiveNav();
    const clear = document.querySelector('[data-clear-cart]');
    if (clear) clear.addEventListener('click', clearCart);
  });
})();
