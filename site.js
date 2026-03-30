
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
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (err) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges();
  }

  function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(entry => entry.name === item.name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: item.name, price: Number(item.price || 0), qty: 1, note: item.startsAt ? "Starts at base price shown." : "" });
    }
    saveCart(cart);
    renderCart();
    showToast(`${item.name} added to cart`);
  }

  function updateCartItem(name, delta) {
    let cart = getCart();
    cart = cart.map(item => item.name === name ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0);
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

  function createMenuCard(item, orderable = false) {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-card-head">
        <h3>${item.name}</h3>
        <div class="price-pill">${money(item.price)}</div>
      </div>
      <p class="menu-meta">${item.startsAt ? 'Base starting price shown.' : 'Fresh off the current menu.'}</p>
      ${orderable ? `<button class="btn btn-small btn-primary">Add to cart</button>` : `<span class="menu-note">${item.price == null ? 'Ask restaurant for current pricing.' : 'Menu reference only.'}</span>`}
    `;
    if (orderable) {
      card.querySelector('button').addEventListener('click', () => addToCart(item));
    }
    return card;
  }

  function createSection(category, forOrderPage = false) {
    const section = document.createElement('section');
    section.className = 'menu-section';
    section.id = category.id;
    let inner = `<div class="section-heading"><div><p class="eyebrow">${category.group}</p><h2>${category.title}</h2>${category.subtitle ? `<p class="section-subtitle">${category.subtitle}</p>` : ''}</div>${category.note ? `<p class="section-note">${category.note}</p>` : ''}</div>`;
    section.innerHTML = inner;
    if (category.sections) {
      category.sections.forEach(sub => {
        const wrap = document.createElement('div');
        wrap.className = 'subsection';
        wrap.innerHTML = `<h3 class="subsection-title">${sub.title}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'menu-grid';
        sub.items.forEach(item => grid.appendChild(createMenuCard(item, forOrderPage && category.orderable)));
        wrap.appendChild(grid);
        section.appendChild(wrap);
      });
    } else {
      const grid = document.createElement('div');
      grid.className = 'menu-grid';
      category.items.forEach(item => grid.appendChild(createMenuCard(item, forOrderPage && category.orderable)));
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
    wireSearch('[data-menu-search]', target, false);
  }

  function flattenCategoryItems(category) {
    if (category.sections) {
      return category.sections.flatMap(section => section.items);
    }
    return category.items || [];
  }

  function renderOrderPage() {
    const target = document.querySelector('[data-render="order-page"]');
    if (!target) return;
    const orderCategories = data.menuCategories.filter(c => c.orderable && c.group !== 'bar');
    target.innerHTML = '';
    orderCategories.forEach(category => target.appendChild(createSection(category, true)));
    renderCategoryChips('[data-category-chips="order"]', orderCategories);
    wireSearch('[data-order-search]', target, true);
    populatePickupTimes();
    renderCart();
    const form = document.querySelector('#demo-order-form');
    if (form && !form.dataset.wired) {
      form.dataset.wired = 'true';
      form.addEventListener('submit', event => {
        event.preventDefault();
        const cart = getCart();
        if (!cart.length) {
          showToast('Cart is empty. Add a few items first.');
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
        confirmation.innerHTML = `
          <div class="confirmation-card">
            <p class="eyebrow">Demo order placed</p>
            <h2>Thanks, ${name || 'guest'}.</h2>
            <p>Your order <strong>${orderNo}</strong> is staged for <strong>${pickupTime}</strong>. This is a demo confirmation screen only—no real order was sent.</p>
            <div class="confirmation-grid">
              <div><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
              <div><span>Estimated tax</span><strong>${money(tax)}</strong></div>
              <div><span>Total</span><strong>${money(total)}</strong></div>
              <div><span>Pickup phone</span><strong>${formData.get('phone') || data.restaurant.phone}</strong></div>
            </div>
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
  }

  function renderCart() {
    const list = document.querySelector('[data-cart-items]');
    const summary = document.querySelector('[data-cart-summary]');
    if (!list || !summary) return;
    const cart = getCart();
    if (!cart.length) {
      list.innerHTML = `<div class="empty-cart"><p>Your cart is empty.</p><span>Tap a few items to make this demo feel real.</span></div>`;
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
          ${item.note ? `<span class="cart-note">${item.note}</span>` : ''}
        </div>
        <div class="qty-controls">
          <button type="button" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button type="button" aria-label="Increase quantity">+</button>
        </div>
      `;
      const [minus, plus] = row.querySelectorAll('button');
      minus.addEventListener('click', () => updateCartItem(item.name, -1));
      plus.addEventListener('click', () => updateCartItem(item.name, 1));
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

  function wireSearch(inputSelector, target, orderOnly) {
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
            <p class="eyebrow">Past highlight</p>
            <h3>${event.title}</h3>
            <p class="event-date">${event.dateLabel}</p>
            <p>${event.description}</p>
          </div>
        </article>
      `).join('');
    }
  }

  function showToast(message) {
    let toast = document.querySelector('.demo-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'demo-toast';
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
    const clear = document.querySelector('[data-clear-cart]');
    if (clear) clear.addEventListener('click', clearCart);
  });
})();
