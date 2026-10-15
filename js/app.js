// ══════════════════════════════════════════════════════════════
//  RONGCHURI — Pure Vanilla JS Application
//  Bangladeshi Luxury Bangle & Churi E-Commerce Experience
// ══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════
  const STATE = {
    cart: JSON.parse(localStorage.getItem('tungtang_cart') || localStorage.getItem('rongchuri_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('tungtang_wishlist') || localStorage.getItem('rongchuri_wishlist') || '[]'),
    appliedCoupon: null,
    discountPercent: 0,
    currentView: 'home', // 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'wishlist' | 'about' | 'contact'
    currentProduct: null,
    shopFilter: {
      category: 'all',
      occasions: [],
      sizes: [],
      maxPrice: 4000,
      minPrice: 0,
      sort: 'featured',
      search: ''
    }
  };

  const COUPONS = {
    'TUNGTANG10': 10,
    'TUNGTANG20': 20,
    'RONG10': 10,
    'EID20': 20,
    'CHURI15': 15,
    'NEWUSER': 10
  };

  // ═══════════════════════════════════════════════════════════
  // UTILITY HELPERS
  // ═══════════════════════════════════════════════════════════
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const formatPrice = (amount) => `৳${Number(amount).toLocaleString('en-BD')}`;

  const saveCart = () => {
    localStorage.setItem('tungtang_cart', JSON.stringify(STATE.cart));
    updateCartUI();
  };

  const saveWishlist = () => {
    localStorage.setItem('tungtang_wishlist', JSON.stringify(STATE.wishlist));
    updateWishlistUI();
  };

  const showToast = (message, type = 'success') => {
    const container = $('#toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success'
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    toast.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  };

  // ═══════════════════════════════════════════════════════════
  // CART OPERATIONS
  // ═══════════════════════════════════════════════════════════
  const addToCart = (productId, size = '2.6', color = '', quantity = 1) => {
    const product = PRODUCTS.find(p => p.id === Number(productId));
    if (!product) return;

    const chosenColor = color || (product.colorNames && product.colorNames[0]) || '';
    const chosenSize = size || (product.sizes && product.sizes[0]) || '2.6';

    const existingIdx = STATE.cart.findIndex(
      item => item.productId === product.id && item.size === chosenSize && item.color === chosenColor
    );

    if (existingIdx > -1) {
      STATE.cart[existingIdx].quantity += quantity;
    } else {
      STATE.cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.categoryLabel,
        size: chosenSize,
        color: chosenColor,
        quantity: quantity
      });
    }

    saveCart();
    showToast(`Added "${product.name}" (${chosenSize}) to cart!`);
    openCartDrawer();
  };

  const updateCartQty = (index, delta) => {
    if (!STATE.cart[index]) return;
    STATE.cart[index].quantity += delta;
    if (STATE.cart[index].quantity <= 0) {
      STATE.cart.splice(index, 1);
    }
    saveCart();
  };

  const removeFromCart = (index) => {
    STATE.cart.splice(index, 1);
    saveCart();
    showToast('Item removed from cart');
  };

  const getCartTotals = () => {
    const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
    const discountAmount = Math.round(subtotal * (STATE.discountPercent / 100));
    const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 60;
    const total = subtotal - discountAmount + (subtotal > 0 ? shipping : 0);
    return { subtotal, count, discountAmount, shipping, total };
  };

  const updateCartUI = () => {
    const { subtotal, count, discountAmount, shipping, total } = getCartTotals();

    // Badges in Nav
    $$('.cart-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });

    // Drawer list
    const drawerBody = $('#cart-drawer-items');
    if (drawerBody) {
      if (STATE.cart.length === 0) {
        drawerBody.innerHTML = `
          <div class="cart-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p>আপনার কার্ট এখনো খালি (Your cart is empty)</p>
            <button class="btn btn-primary btn-sm" onclick="Rongchuri.navigate('shop')">Explore Bangles</button>
          </div>
        `;
      } else {
        drawerBody.innerHTML = STATE.cart.map((item, idx) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-meta">Size: <strong>${item.size}</strong> ${item.color ? `• ${item.color}` : ''}</div>
              <div class="cart-item-price">${formatPrice(item.price)}</div>
              <div class="qty-controls" style="margin-top:.4rem">
                <button class="qty-btn" onclick="Rongchuri.updateCartQty(${idx}, -1)">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="Rongchuri.updateCartQty(${idx}, 1)">+</button>
              </div>
            </div>
            <button class="cart-item-remove" title="Remove item" onclick="Rongchuri.removeFromCart(${idx})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
            </button>
          </div>
        `).join('');
      }
    }

    // Drawer footer totals
    const drawerSubtotal = $('#drawer-subtotal');
    if (drawerSubtotal) drawerSubtotal.textContent = formatPrice(subtotal);
    const drawerTotal = $('#drawer-total');
    if (drawerTotal) drawerTotal.textContent = formatPrice(total);

    // Free delivery progress note
    const freeDeliveryElem = $('#drawer-free-delivery');
    if (freeDeliveryElem) {
      if (subtotal >= 1500) {
        freeDeliveryElem.innerHTML = `🎉 Congratulations! You have unlocked <strong>FREE Delivery</strong> across Bangladesh!`;
        freeDeliveryElem.style.background = 'rgba(34,168,74,.1)';
        freeDeliveryElem.style.color = '#22a84a';
      } else if (subtotal > 0) {
        const remaining = 1500 - subtotal;
        freeDeliveryElem.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more to get <strong>FREE Delivery</strong>!`;
        freeDeliveryElem.style.background = 'rgba(201,168,76,.1)';
        freeDeliveryElem.style.color = '#b8923e';
      } else {
        freeDeliveryElem.innerHTML = `🚚 Free shipping on orders over ৳1,500!`;
        freeDeliveryElem.style.background = 'var(--ivory-dark)';
        freeDeliveryElem.style.color = 'var(--charcoal-mid)';
      }
    }

    // If on Cart page, update Cart page table
    if (STATE.currentView === 'cart') {
      renderCartPage();
    }
    // If on Checkout page, update Checkout summary
    if (STATE.currentView === 'checkout') {
      renderCheckoutSummary();
    }
  };

  const openCartDrawer = () => {
    $('#cart-drawer')?.classList.add('open');
    $('#overlay')?.classList.add('visible');
    document.body.classList.add('no-scroll');
  };

  const closeCartDrawer = () => {
    $('#cart-drawer')?.classList.remove('open');
    $('#overlay')?.classList.remove('visible');
    document.body.classList.remove('no-scroll');
  };

  // ═══════════════════════════════════════════════════════════
  // WISHLIST OPERATIONS
  // ═══════════════════════════════════════════════════════════
  const toggleWishlist = (productId) => {
    const id = Number(productId);
    const idx = STATE.wishlist.indexOf(id);
    const product = PRODUCTS.find(p => p.id === id);
    if (idx > -1) {
      STATE.wishlist.splice(idx, 1);
      showToast(`Removed from Wishlist`);
    } else {
      STATE.wishlist.push(id);
      showToast(`Added "${product?.name}" to Wishlist!`);
    }
    saveWishlist();
  };

  const updateWishlistUI = () => {
    const count = STATE.wishlist.length;
    $$('.wishlist-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });

    // Update active state on heart buttons across page
    $$('[data-wishlist-id]').forEach(btn => {
      const id = Number(btn.getAttribute('data-wishlist-id'));
      if (STATE.wishlist.includes(id)) {
        btn.classList.add('wishlisted', 'active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
      } else {
        btn.classList.remove('wishlisted', 'active');
        btn.setAttribute('aria-label', 'Add to wishlist');
      }
    });

    if (STATE.currentView === 'wishlist') {
      renderWishlistPage();
    }
  };

  // ═══════════════════════════════════════════════════════════
  // PRODUCT CARD COMPONENT BUILDER
  // ═══════════════════════════════════════════════════════════
  const createProductCard = (product) => {
    const isWishlisted = STATE.wishlist.includes(product.id);
    const badgeHTML = product.bestseller
      ? `<span class="badge badge-sale">Bestseller</span>`
      : product.newArrival
      ? `<span class="badge badge-new">New</span>`
      : product.discount
      ? `<span class="badge badge-sale">${product.discount}% OFF</span>`
      : '';

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-image">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
          <div class="product-badges">${badgeHTML}</div>
          <div class="product-card-actions">
            <button class="action-btn ${isWishlisted ? 'wishlisted' : ''}" data-wishlist-id="${product.id}" onclick="Rongchuri.toggleWishlist(${product.id})" title="Wishlist">
              <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button class="action-btn" onclick="Rongchuri.openQuickView(${product.id})" title="Quick View">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
          <div class="product-card-overlay">
            <button class="quick-add-btn" onclick="Rongchuri.openQuickView(${product.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
              Select Size & Buy
            </button>
          </div>
        </div>
        <div class="product-card-info" onclick="Rongchuri.viewProduct(${product.id})" style="cursor:pointer">
          <div class="product-category">${product.categoryLabel}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-count">(${product.rating})</span>
          </div>
          <div class="product-pricing">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            ${product.discount ? `<span class="price-discount">-${product.discount}%</span>` : ''}
          </div>
        </div>
      </div>
    `;
  };

  // ═══════════════════════════════════════════════════════════
  // HOME PAGE RENDERING
  // ═══════════════════════════════════════════════════════════
  const renderHomePage = () => {
    // 1. Featured Collections (6 grid)
    const collectionsContainer = $('#collections-grid');
    if (collectionsContainer) {
      collectionsContainer.innerHTML = COLLECTIONS.map(col => `
        <div class="collection-card" onclick="Rongchuri.filterCategory('${col.id}')">
          <img src="${col.image}" alt="${col.name}" loading="lazy">
          <div class="collection-card-body">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:.35rem">
              <span class="eyebrow" style="color:var(--gold-light); font-size:.65rem">${col.count}+ Items</span>
              ${col.badge ? `<span style="background:var(--burgundy); color:#fff; font-size:.56rem; font-weight:700; padding:2px 7px; border-radius:10px; text-transform:uppercase; letter-spacing:.05em">${col.badge}</span>` : ''}
            </div>
            <h3>${col.name}</h3>
            <p>${col.desc}</p>
            <span class="collection-link">Explore Collection →</span>
          </div>
        </div>
      `).join('');
    }

    // 2. Featured Bestsellers
    const featuredContainer = $('#featured-products-grid');
    if (featuredContainer) {
      const featured = PRODUCTS.filter(p => p.featured || p.bestseller).slice(0, 8);
      featuredContainer.innerHTML = featured.map(createProductCard).join('');
    }

    // 3. Horizontal Carousel on Mobile for Featured
    const featuredCarousel = $('#featured-carousel');
    if (featuredCarousel) {
      const featured = PRODUCTS.filter(p => p.featured || p.bestseller).slice(0, 8);
      featuredCarousel.innerHTML = featured.map(createProductCard).join('');
    }

    // 4. Trending Tabs Products
    renderTrendingTab('all');

    // 5. Occasions Grid
    const occasionsContainer = $('#occasions-grid');
    if (occasionsContainer) {
      occasionsContainer.innerHTML = OCCASIONS.map(occ => `
        <div class="occasion-card" onclick="Rongchuri.filterOccasion('${occ.name.toLowerCase()}')">
          <img src="${occ.image}" alt="${occ.name}" loading="lazy">
          <div class="occasion-label">${occ.emoji} ${occ.name}</div>
        </div>
      `).join('');
    }

    // 6. Customer Reviews
    const reviewsContainer = $('#reviews-grid');
    if (reviewsContainer) {
      reviewsContainer.innerHTML = REVIEWS.map(rev => `
        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <p class="review-text">“${rev.text}”</p>
          <div class="review-header">
            <div class="review-avatar" style="background:${rev.color}">${rev.initial}</div>
            <div class="review-meta">
              <strong>${rev.name}</strong>
              <span>Verified Buyer • ${rev.date}</span>
            </div>
          </div>
          <div class="review-product">Purchased: ${rev.product}</div>
        </div>
      `).join('');
    }
  };

  const renderTrendingTab = (category) => {
    const container = $('#trending-products-grid');
    if (!container) return;

    let items = PRODUCTS;
    if (category !== 'all') {
      if (category === 'handmade' || category === 'churi') {
        items = PRODUCTS.filter(p => ['churi', 'handmade'].includes(p.category) || (p.tags && p.tags.includes('churi')));
      } else {
        items = PRODUCTS.filter(p => p.category === category);
      }
    }
    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:3.5rem 1rem;">
          <div style="font-size:2.2rem; margin-bottom:.5rem;">🌸</div>
          <p style="font-size:1.05rem; font-weight:600; color:var(--burgundy); font-family:var(--font-bengali); margin-bottom:.35rem;">এই কালেকশনটি খুব শীঘ্রই আসছে!</p>
          <p style="font-size:.85rem; color:var(--charcoal-mid);">আমাদের কারিগর পরম যত্নে নতুন ডিজাইনের কাজ করছেন।</p>
        </div>
      `;
    } else {
      container.innerHTML = items.slice(0, 8).map(createProductCard).join('');
    }
  };

  // ═══════════════════════════════════════════════════════════
  // SHOP CATALOG PAGE RENDERING
  // ═══════════════════════════════════════════════════════════
  const renderShopPage = () => {
    const productGrid = $('#shop-products-grid');
    if (!productGrid) return;

    // Filter products based on STATE.shopFilter
    let results = PRODUCTS.filter(p => {
      // Category filter
      if (STATE.shopFilter.category !== 'all') {
        if (STATE.shopFilter.category === 'handmade' || STATE.shopFilter.category === 'churi') {
          const isHandmade = ['churi', 'handmade'].includes(p.category) || (p.tags && p.tags.includes('churi'));
          if (!isHandmade) return false;
        } else if (p.category !== STATE.shopFilter.category) {
          return false;
        }
      }
      // Occasion filter
      if (STATE.shopFilter.occasions.length > 0) {
        const matchesOccasion = p.occasion && p.occasion.some(o => STATE.shopFilter.occasions.includes(o.toLowerCase()));
        if (!matchesOccasion) return false;
      }
      // Size filter
      if (STATE.shopFilter.sizes.length > 0) {
        const matchesSize = p.sizes && p.sizes.some(s => STATE.shopFilter.sizes.includes(s));
        if (!matchesSize) return false;
      }
      // Price filter
      if (p.price < STATE.shopFilter.minPrice || p.price > STATE.shopFilter.maxPrice) {
        return false;
      }
      // Search term
      if (STATE.shopFilter.search) {
        const q = STATE.shopFilter.search.toLowerCase();
        const matchesSearch = p.name.toLowerCase().includes(q) ||
                              p.description.toLowerCase().includes(q) ||
                              p.categoryLabel.toLowerCase().includes(q) ||
                              (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
        if (!matchesSearch) return false;
      }
      return true;
    });

    // Sorting
    switch (STATE.shopFilter.sort) {
      case 'price-low-high':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      default: // featured
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    // Update Shop Page Title & Breadcrumb
    const pageTitleElem = $('#shop-page-title');
    const breadcrumbCatElem = $('#shop-breadcrumb-cat');
    if (pageTitleElem && breadcrumbCatElem) {
      if (STATE.shopFilter.category === 'earrings') {
        pageTitleElem.textContent = 'কানের দুল কালেকশন';
        breadcrumbCatElem.textContent = 'কানের দুল (Handmade Earrings)';
      } else if (STATE.shopFilter.category === 'combo') {
        pageTitleElem.textContent = 'চুড়ি দুল কম্বো সেট';
        breadcrumbCatElem.textContent = 'চুড়ি দুল কম্বো (Combo Sets)';
      } else if (STATE.shopFilter.category === 'handmade') {
        pageTitleElem.textContent = 'হাতের তৈরী চুড়ি কালেকশন';
        breadcrumbCatElem.textContent = 'হাতের তৈরী চুড়ি (Handmade Bangles)';
      } else {
        pageTitleElem.textContent = 'সকল চুড়ি ও কালেকশন';
        breadcrumbCatElem.textContent = 'সকল চুড়ি (All Bangles)';
      }
    }

    // Results count
    const countElem = $('#shop-results-count');
    if (countElem) {
      countElem.textContent = `Showing ${results.length} of ${PRODUCTS.length} designs`;
    }

    if (results.length === 0) {
      const isUpcoming = ['earrings', 'combo'].includes(STATE.shopFilter.category);
      if (isUpcoming) {
        const isEarrings = STATE.shopFilter.category === 'earrings';
        const upcomingImg = isEarrings ? 'images/earrings-collection.jpg' : 'images/combo-collection.jpg';
        const upcomingTitle = isEarrings ? 'কানের দুল কালেকশন' : 'চুড়ি দুল কম্বো সেট';
        productGrid.innerHTML = `
          <div style="grid-column:1/-1; max-width:680px; margin:1.5rem auto 3rem; text-align:center; padding:2.5rem 1.75rem; background:#fff; border-radius:18px; border:1px solid #ebd9c5; box-shadow:0 10px 30px rgba(0,0,0,0.06);">
            <div style="position:relative; max-width:440px; margin:0 auto 1.75rem; border-radius:14px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.12);">
              <img src="${upcomingImg}" alt="${upcomingTitle}" style="width:100%; height:270px; object-fit:cover; display:block;">
              <div style="position:absolute; top:12px; right:12px; background:var(--burgundy); color:#fff; font-size:.72rem; font-weight:700; padding:4px 12px; border-radius:20px; letter-spacing:.05em; text-transform:uppercase;">
                শীঘ্রই আসছে ✨
              </div>
            </div>
            <span class="eyebrow" style="color:var(--gold-mid); font-size:.8rem;">Exclusive Upcoming Showcase</span>
            <h2 style="font-family:var(--font-bengali); color:var(--burgundy); font-size:1.85rem; margin:.4rem 0 .75rem;">এই কালেকশনটি শীঘ্রই আসছে</h2>
            <p style="font-size:.95rem; color:var(--charcoal-mid); line-height:1.7; max-width:520px; margin:0 auto 1.75rem;">
              আমরা পরম মমতায় টুংটাং-এর প্রতিটি চুড়ির সাথে ম্যাচিং হ্যান্ডমেড কানের দুল ও আকর্ষণীয় কম্বো সেটের নতুন ডিজাইন তৈরির কাজ করছি। খুব শীঘ্রই এই কালেকশনটি আপনাদের জন্য উন্মুক্ত হবে!
            </p>
            <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="Rongchuri.filterCategory('handmade')">হাতের তৈরী চুড়ি দেখুন</button>
              <button class="btn btn-outline" onclick="Rongchuri.navigate('home')">হোম পেজে ফিরে যান</button>
            </div>
          </div>
        `;
      } else {
        productGrid.innerHTML = `
          <div style="grid-column:1/-1; text-align:center; padding:4rem 1rem;">
            <p style="font-size:1.1rem; color:var(--charcoal-mid); margin-bottom:1rem;">কোনো প্রোডাক্ট পাওয়া যায়নি।</p>
            <button class="btn btn-outline btn-sm" onclick="Rongchuri.clearFilters()">Clear All Filters</button>
          </div>
        `;
      }
    } else {
      productGrid.innerHTML = results.map(createProductCard).join('');
    }
  };

  // ═══════════════════════════════════════════════════════════
  // PRODUCT DETAIL PAGE
  // ═══════════════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════════════
  // PRODUCT DETAIL PAGE & INTERACTIVE ZOOM
  // ═══════════════════════════════════════════════════════════
  const setupImageZoom = () => {
    const wrap = $('#main-product-image-wrap');
    const img = $('#main-product-image');
    if (!wrap || !img) return;

    let isHovering = false;

    const resetZoom = () => {
      isHovering = false;
      wrap.classList.remove('zoomed');
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
    };

    const applyZoom = (clientX, clientY, scale = 2.2) => {
      const rect = wrap.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      img.style.transformOrigin = `${x.toFixed(1)}% ${y.toFixed(1)}%`;
      img.style.transform = `scale(${scale})`;
      wrap.classList.add('zoomed');
    };

    wrap.onmouseenter = (e) => {
      isHovering = true;
      applyZoom(e.clientX, e.clientY);
    };

    wrap.onmousemove = (e) => {
      if (!isHovering) isHovering = true;
      applyZoom(e.clientX, e.clientY);
    };

    wrap.onmouseleave = () => {
      resetZoom();
    };

    // Mobile tap toggle or click toggle
    wrap.onclick = (e) => {
      if (wrap.classList.contains('zoomed')) {
        resetZoom();
      } else {
        applyZoom(e.clientX, e.clientY, 2.0);
      }
    };
  };

  const renderProductDetailPage = (productId) => {
    const product = PRODUCTS.find(p => p.id === Number(productId));
    if (!product) return;
    STATE.currentProduct = product;

    const detailContainer = $('#product-detail-view');
    if (!detailContainer) return;

    let selectedSize = product.sizes[0] || '2.6';
    let selectedColor = product.colorNames ? product.colorNames[0] : '';
    const isWishlisted = STATE.wishlist.includes(product.id);

    detailContainer.innerHTML = `
      <div class="container product-detail">
        <div class="breadcrumb">
          <a href="#home" onclick="Rongchuri.navigate('home')">হোম</a>
          <span class="breadcrumb-sep">/</span>
          <a href="#shop" onclick="Rongchuri.navigate('shop')">সকল কালেকশন</a>
          <span class="breadcrumb-sep">/</span>
          <a href="#shop" onclick="Rongchuri.filterCategory('${product.category}')">${product.categoryLabel}</a>
          <span class="breadcrumb-sep">/</span>
          <span>${product.name}</span>
        </div>

        <div class="product-detail-grid">
          <!-- Gallery -->
          <div class="product-gallery">
            <div class="main-image" id="main-product-image-wrap" title="জুম করতে মাউস ঘুরান বা ট্যাপ করুন">
              <img id="main-product-image" src="${product.images[0]}" alt="${product.name}">
              <div class="zoom-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>🔍 জুম করতে স্পর্শ বা মাউস রাখুন</span>
              </div>
            </div>
            <div class="thumbnails">
              ${product.images.map((img, idx) => `
                <div class="thumb ${idx === 0 ? 'active' : ''}" onclick="Rongchuri.switchThumb('${img}', this)" title="ছবি ${idx + 1}">
                  <img src="${img}" alt="${product.name} - ছবি ${idx + 1}">
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <div class="product-detail-category">${product.categoryLabel}</div>
            <h1 class="product-detail-name">${product.name}</h1>

            <div class="product-detail-rating">
              <span class="stars" style="font-size:1.1rem">★★★★★</span>
              <strong>${product.rating}</strong>
              <span class="rating-count">(${product.reviewCount} টি গ্রাহক রিভিউ)</span>
              <span>•</span>
              <span style="color:#22a84a; font-weight:600; font-size:.85rem">স্টকে আছে (${product.stock} টি উপলব্ধ)</span>
            </div>

            <div class="product-detail-pricing">
              <span class="detail-price">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `<span class="detail-original">${formatPrice(product.originalPrice)}</span>` : ''}
              ${product.discount ? `<span class="detail-discount">${product.discount}% ছাড়</span>` : ''}
            </div>

            <p class="product-description" style="white-space: pre-line">${product.description}</p>

            <!-- Color Selection -->
            ${product.colors && product.colors.length ? `
              <div class="selector-label">
                কালার শেড: <span id="selected-color-label">${selectedColor}</span>
              </div>
              <div class="color-swatches">
                ${product.colors.map((c, i) => `
                  <div class="swatch ${i === 0 ? 'active' : ''}"
                       style="background:${c}"
                       title="${product.colorNames[i]}"
                       onclick="Rongchuri.selectDetailColor('${product.colorNames[i]}', this)">
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Size Selection -->
            ${(() => {
              const isBangle = ['glass', 'kashmiri', 'metal', 'bridal', 'churi'].includes(product.category) ||
                (product.sizes && product.sizes.some(s => ['2.2', '2.4', '2.6', '2.8', '2.10'].includes(s)));
              return `
                <div class="selector-label" style="justify-content:space-between">
                  <div>${isBangle ? 'চুড়ির সাইজ:' : 'সাইজ / ফিটিং:'} <strong id="selected-size-label" style="color:var(--burgundy)">${selectedSize}</strong></div>
                  ${isBangle
                    ? `<a class="size-guide-link" onclick="Rongchuri.openSizeGuideModal()" style="margin-bottom:0">📏 চুড়ির সাইজ গাইড ও ক্যালকুলেটর</a>`
                    : `<span style="font-size:.8rem; color:var(--gold-mid); font-weight:600">✨ আরামদায়ক হাতের তৈরি ফিটিং</span>`}
                </div>
                <div class="size-options">
                  ${product.sizes.map((s, i) => `
                    <button type="button" class="size-btn ${i === 0 ? 'active' : ''}"
                            onclick="Rongchuri.selectDetailSize('${s}', this)">
                      ${s}
                    </button>
                  `).join('')}
                </div>
              `;
            })()}

            <!-- Quantity & Actions -->
            <div class="qty-row">
              <span style="font-size:.85rem; font-weight:600">পরিমাণ:</span>
              <div class="qty-control">
                <button type="button" class="qty-btn" onclick="Rongchuri.stepDetailQty(-1)">−</button>
                <span class="qty-value" id="detail-qty-value">1</span>
                <button type="button" class="qty-btn" onclick="Rongchuri.stepDetailQty(1)">+</button>
              </div>
            </div>

            <div class="product-action-row">
              <button class="btn btn-primary btn-lg" onclick="Rongchuri.addCurrentToCart()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                কার্টে যোগ করুন
              </button>
              <button class="btn btn-gold btn-lg" onclick="Rongchuri.buyNowCurrent()">
                এখনই অর্ডার করুন (ক্যাশ অন ডেলিভারি / বিকাশ)
              </button>
              <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}"
                      data-wishlist-id="${product.id}"
                      onclick="Rongchuri.toggleWishlist(${product.id})"
                      title="পছন্দের তালিকায় রাখুন">
                <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            <!-- Delivery Trust Box -->
            <div class="delivery-info">
              <div class="delivery-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <div><strong>ঢাকা সিটিতে ডেলিভারি:</strong> ২৪-৪৮ ঘণ্টা (৳৬০)</div>
              </div>
              <div class="delivery-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div><strong>সারা বাংলাদেশে ডেলিভারি:</strong> ২-৪ দিন Steadfast / RedX মারফত (৳১২০)</div>
              </div>
              <div class="delivery-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <div><strong>ক্যাশ অন ডেলিভারি (COD) সুবিধা</strong> — পার্সেল হাতে পেয়ে মূল্য পরিশোধ করুন!</div>
              </div>
              <div class="delivery-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19"/></svg>
                <div><strong>সহজ ৭ দিনের সাইজ এক্সচেঞ্জ</strong> — সম্পূর্ণ ঝামেলামুক্ত নিশ্চয়তা।</div>
              </div>
            </div>

            <!-- Accordions -->
            <div class="accordion" onclick="this.classList.toggle('open')">
              <div class="accordion-header">
                <span>উপাদান ও কারুকাজ</span>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="accordion-body">
                <p><strong>উপাদান:</strong> ${product.material}</p>
                <p style="margin-top:.5rem">প্রতিটি চুড়ি তৈরি ও কিউরেট করা হয় প্রিমিয়াম কোয়ালিটি সীসা-মুক্ত ধাতব ও সিল্ক ম্যাটেরিয়াল দিয়ে, যা দীর্ঘস্থায়ী রঙ ও উজ্জ্বলতা বজায় রাখে। ভেলভেট বক্সে রাখলে চকচকে ভাব বজায় থাকবে বছরের পর বছর।</p>
              </div>
            </div>

            <div class="accordion" onclick="this.classList.toggle('open')">
              <div class="accordion-header">
                <span>যত্ন ও ব্যবহারের নিয়ম</span>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="accordion-body">
                <ul>
                  <li>ব্যবহারের পর এয়ারটাইট জিপ পাউচ বা ভেলভেট জুয়েলারি বক্সে সংরক্ষণ করুন।</li>
                  <li>সরাসরি পারফিউম, স্যানিটাইজার বা লোশনের স্প্রে থেকে দূরে রাখুন।</li>
                  <li>উজ্জ্বলতা বজায় রাখতে নরম মাইক্রোফাইবার কাপড় দিয়ে হালকা মুছে রাখুন।</li>
                  <li>কাচের চুড়ি পরার সময় নরম কুশনযুক্ত স্থানে পরুন।</li>
                </ul>
              </div>
            </div>

            <div class="accordion" onclick="this.classList.toggle('open')">
              <div class="accordion-header">
                <span>প্যাকেজিং ও উপহারের ব্যবস্থা</span>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="accordion-body">
                <p>টুংটাং-এর প্রতিটি পার্সেল প্রিমিয়াম সিকিউরড গিফট বক্সে বাবল র‍্যাপ ও ভেলভেট পাউচে মোড়ানো থাকে। প্রিয়জনকে উপহার দিতে চাইলে চেকআউটে স্পেশাল উইশ মেসেজ লিখে দেওয়ার সুবিধাও রয়েছে!</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Related Products Section -->
        <div class="section-header" style="margin-top:5rem">
          <span class="eyebrow">আপনার সাজে আরও যোগ করুন</span>
          <h2>পছন্দসই আরও আকর্ষণীয় চুড়ি</h2>
          <div class="divider divider-center mt-2"></div>
        </div>
        <div class="product-grid" style="margin-top:2.5rem">
          ${PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(createProductCard).join('')}
        </div>
      </div>

      <!-- Mobile Sticky Add-to-Cart Bar -->
      <div class="mobile-sticky-bar">
        <div style="flex:1">
          <div style="font-size:.78rem; color:var(--charcoal-light)">${product.name}</div>
          <div style="font-weight:700; color:var(--burgundy); font-size:1.1rem">${formatPrice(product.price)}</div>
        </div>
        <button class="btn btn-primary" onclick="Rongchuri.addCurrentToCart()">
          কার্টে যোগ করুন
        </button>
      </div>
    `;

    // Initialize interactive zoom
    setupImageZoom();
  };

  // ═══════════════════════════════════════════════════════════
  // QUICK VIEW MODAL
  // ═══════════════════════════════════════════════════════════
  const openQuickView = (productId) => {
    const product = PRODUCTS.find(p => p.id === Number(productId));
    if (!product) return;

    let selectedSize = product.sizes[0] || '2.6';
    let selectedColor = product.colorNames ? product.colorNames[0] : '';

    const modalOverlay = $('#quick-view-overlay');
    const modalContent = $('#quick-view-content');
    if (!modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-inner">
        <div class="modal-image">
          <img src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="modal-content">
          <div class="product-category">${product.categoryLabel}</div>
          <h2 style="font-size:1.4rem; margin-bottom:.5rem">${product.name}</h2>
          <div class="product-rating" style="margin-bottom:1rem">
            <span class="stars">★★★★★</span>
            <span class="rating-count">(${product.rating} • ${product.reviewCount} টি রিভিউ)</span>
          </div>
          <div class="product-pricing" style="margin-bottom:1.25rem">
            <span class="price-current" style="font-size:1.4rem">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            ${product.discount ? `<span class="price-discount">-${product.discount}%</span>` : ''}
          </div>
          <p style="font-size:.85rem; line-height:1.6; margin-bottom:1.25rem; white-space: pre-line">${product.description}</p>

          ${product.colors && product.colors.length ? `
            <div class="selector-label" style="font-size:.78rem">কালার শেড: <span id="qv-color-val">${selectedColor}</span></div>
            <div class="color-swatches" style="margin-bottom:1rem">
              ${product.colors.map((c, i) => `
                <div class="swatch ${i === 0 ? 'active' : ''}" style="background:${c}" onclick="
                  Array.from(this.parentNode.children).forEach(s => s.classList.remove('active'));
                  this.classList.add('active');
                  document.getElementById('qv-color-val').textContent = '${product.colorNames[i]}';
                "></div>
              `).join('')}
            </div>
          ` : ''}

          <div class="selector-label" style="font-size:.78rem; justify-content:space-between">
            <span>সাইজ: <strong id="qv-size-val" style="color:var(--burgundy)">${selectedSize}</strong></span>
            <span style="font-size:.75rem; text-decoration:underline; cursor:pointer; color:var(--burgundy)" onclick="Rongchuri.openSizeGuideModal()">📏 সাইজ গাইড</span>
          </div>
          <div class="size-options" style="margin-bottom:1.5rem">
            ${product.sizes.map((s, i) => `
              <button class="size-btn ${i === 0 ? 'active' : ''}" onclick="
                Array.from(this.parentNode.children).forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                document.getElementById('qv-size-val').textContent = '${s}';
              ">${s}</button>
            `).join('')}
          </div>

          <div style="display:flex; gap:.75rem">
            <button class="btn btn-primary btn-full" onclick="
              const size = document.getElementById('qv-size-val').textContent;
              const colorElem = document.getElementById('qv-color-val');
              const color = colorElem ? colorElem.textContent : '';
              Rongchuri.addToCart(${product.id}, size, color, 1);
              Rongchuri.closeQuickView();
            ">
              কার্টে যোগ করুন
            </button>
            <button class="btn btn-outline" onclick="
              Rongchuri.closeQuickView();
              Rongchuri.viewProduct(${product.id});
            ">
              বিস্তারিত দেখুন
            </button>
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.classList.add('no-scroll');
  };

  const closeQuickView = () => {
    $('#quick-view-overlay')?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  // ═══════════════════════════════════════════════════════════
  // CART PAGE
  // ═══════════════════════════════════════════════════════════
  const renderCartPage = () => {
    const cartContainer = $('#cart-page-view');
    if (!cartContainer) return;

    const { subtotal, count, discountAmount, shipping, total } = getCartTotals();

    if (STATE.cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="container cart-page">
          <div class="cart-empty" style="padding:6rem 1rem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:72px; height:72px">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
            <h2 style="margin:1rem 0 .5rem">আপনার শপিং ব্যাগ খালি</h2>
            <p>You have no items in your shopping bag yet.</p>
            <button class="btn btn-primary" onclick="Rongchuri.navigate('shop')" style="margin-top:1.5rem">
              Explore Bangle Collections
            </button>
          </div>
        </div>
      `;
      return;
    }

    cartContainer.innerHTML = `
      <div class="container cart-page">
        <h1 style="margin-bottom:1.5rem">Shopping Bag (${count} items)</h1>
        <div class="cart-layout">
          <!-- Table -->
          <div class="cart-table">
            <div class="cart-table-header">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div>Action</div>
            </div>
            ${STATE.cart.map((item, idx) => `
              <div class="cart-table-row">
                <div class="cart-product-cell" data-label="Product">
                  <img src="${item.image}" alt="${item.name}" class="cart-product-img">
                  <div>
                    <div class="cart-product-name">${item.name}</div>
                    <div class="cart-product-meta">Size: <strong>${item.size}</strong> ${item.color ? `• ${item.color}` : ''}</div>
                  </div>
                </div>
                <div data-label="Price">
                  <strong>${formatPrice(item.price)}</strong>
                </div>
                <div data-label="Quantity">
                  <div class="qty-controls">
                    <button class="qty-btn" onclick="Rongchuri.updateCartQty(${idx}, -1)">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="Rongchuri.updateCartQty(${idx}, 1)">+</button>
                  </div>
                </div>
                <div data-label="Subtotal">
                  <strong style="color:var(--burgundy)">${formatPrice(item.price * item.quantity)}</strong>
                </div>
                <div data-label="Remove">
                  <button class="cart-remove" onclick="Rongchuri.removeFromCart(${idx})" title="Remove item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Order Summary Card -->
          <div class="order-summary-card">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Bag Subtotal</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            ${STATE.discountPercent > 0 ? `
              <div class="summary-row" style="color:#22a84a">
                <span>Discount (${STATE.discountPercent}% OFF)</span>
                <span>-${formatPrice(discountAmount)}</span>
              </div>
            ` : ''}
            <div class="summary-row">
              <span>Estimated Delivery</span>
              <span>${shipping === 0 ? '<strong style="color:#22a84a">FREE</strong>' : formatPrice(shipping)}</span>
            </div>
            <div class="summary-row total">
              <span>Grand Total</span>
              <span>${formatPrice(total)}</span>
            </div>

            <!-- Coupon Input -->
            <div class="coupon-row">
              <input type="text" id="cart-coupon-input" class="coupon-input" placeholder="Promo code (e.g. RONG10)" value="${STATE.appliedCoupon || ''}">
              <button class="btn btn-outline btn-sm" onclick="Rongchuri.applyCoupon()">Apply</button>
            </div>
            <div style="font-size:.72rem; color:var(--charcoal-light); margin-bottom:1rem">Try: <strong>RONG10</strong> for 10% off or <strong>EID20</strong> for 20% off</div>

            <button class="btn btn-primary btn-full btn-lg" onclick="Rongchuri.navigate('checkout')">
              Proceed to Checkout →
            </button>

            <div class="cart-note">
              <strong>💡 Smart Saver:</strong> Free delivery on all orders above ৳1,500 across Bangladesh!
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // ═══════════════════════════════════════════════════════════
  // CHECKOUT PAGE
  // ═══════════════════════════════════════════════════════════
  const renderCheckoutPage = () => {
    const checkoutContainer = $('#checkout-page-view');
    if (!checkoutContainer) return;

    if (STATE.cart.length === 0) {
      checkoutContainer.innerHTML = `
        <div class="container checkout-page">
          <div class="cart-empty" style="padding:6rem 1rem">
            <h2>You have no items to checkout!</h2>
            <button class="btn btn-primary" onclick="Rongchuri.navigate('shop')" style="margin-top:1.5rem">Start Shopping</button>
          </div>
        </div>
      `;
      return;
    }

    const { subtotal, count, discountAmount, shipping, total } = getCartTotals();

    checkoutContainer.innerHTML = `
      <div class="container checkout-page">
        <h1 style="margin-bottom:1.5rem">Checkout & Shipping</h1>

        <div class="checkout-layout">
          <!-- Form -->
          <div class="checkout-form-area">
            <!-- 1. Customer & Shipping Info -->
            <div class="checkout-card">
              <h3>১. ডেলিভারি তথ্য (Delivery Information)</h3>
              <form id="checkout-form" onsubmit="event.preventDefault(); Rongchuri.placeOrder();">
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Full Name / আপনার নাম *</label>
                    <input type="text" id="cust-name" class="form-input" required placeholder="e.g. Sadia Tasnim">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone Number / মোবাইল নম্বর *</label>
                    <input type="tel" id="cust-phone" class="form-input" required placeholder="e.g. 01712345678" pattern="01[3-9][0-9]{8}">
                    <span style="font-size:.7rem; color:var(--charcoal-light)">Active Bangladeshi 11-digit mobile number</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">City / District *</label>
                    <select id="cust-district" class="form-select" required onchange="Rongchuri.updateShippingDistrict(this.value)">
                      <option value="Dhaka">Inside Dhaka (৳60 • 24-48 hrs)</option>
                      <option value="Chattogram">Chattogram (৳120 • 2-3 days)</option>
                      <option value="Sylhet">Sylhet (৳120 • 2-3 days)</option>
                      <option value="Rajshahi">Rajshahi (৳120 • 2-4 days)</option>
                      <option value="Khulna">Khulna (৳120 • 2-4 days)</option>
                      <option value="Barishal">Barishal (৳120 • 2-4 days)</option>
                      <option value="Rangpur">Rangpur (৳120 • 2-4 days)</option>
                      <option value="Mymensingh">Mymensingh (৳120 • 2-3 days)</option>
                      <option value="Other">Other District / Sub-district (৳120)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Area / Thana *</label>
                    <input type="text" id="cust-area" class="form-input" required placeholder="e.g. Dhanmondi, Uttara, GEC Circle">
                  </div>
                  <div class="form-group full">
                    <label class="form-label">Detailed Delivery Address *</label>
                    <textarea id="cust-address" class="form-textarea" required placeholder="House number, Road number, Flat/Floor, Landmark"></textarea>
                  </div>
                  <div class="form-group full">
                    <label class="form-label">Special Delivery / Gift Note (Optional)</label>
                    <input type="text" id="cust-notes" class="form-input" placeholder="e.g. Please wrap with Eid gift card / Call before arriving">
                  </div>
                </div>
            </div>

            <!-- 2. Payment Method -->
            <div class="checkout-card">
              <h3>২. পেমেন্ট পদ্ধতি (Payment Method)</h3>
              <div class="payment-options">
                <!-- COD -->
                <label class="payment-option selected" id="opt-cod" onclick="Rongchuri.selectPaymentMethod('cod')">
                  <input type="radio" name="payment-method" value="cod" checked>
                  <div class="payment-label">
                    <strong>Cash on Delivery (ক্যাশ অন ডেলিভারি)</strong>
                    <span>পণ্য হাতে পেয়ে দেখে টাকা পরিশোধ করুন। ১০০% নিরাপদ ও বিশ্বস্ত।</span>
                  </div>
                  <span class="payment-icon-badge">COD</span>
                </label>

                <!-- bKash -->
                <label class="payment-option" id="opt-bkash" onclick="Rongchuri.selectPaymentMethod('bkash')">
                  <input type="radio" name="payment-method" value="bkash">
                  <div class="payment-label">
                    <strong style="color:#D12053">bKash (বিকাশ সেন্ড মানি / মার্চেন্ট)</strong>
                    <span>Instant payment via bKash personal or merchant account</span>
                  </div>
                  <span class="payment-icon-badge" style="background:#E2136E; color:#fff">bKash</span>
                </label>

                <!-- Nagad -->
                <label class="payment-option" id="opt-nagad" onclick="Rongchuri.selectPaymentMethod('nagad')">
                  <input type="radio" name="payment-method" value="nagad">
                  <div class="payment-label">
                    <strong style="color:#F7941D">Nagad (নগদ)</strong>
                    <span>Fast digital payment via Nagad wallet</span>
                  </div>
                  <span class="payment-icon-badge" style="background:#F7941D; color:#fff">Nagad</span>
                </label>
              </div>

              <!-- MFS Instruction Box (Hidden by default until bKash/Nagad selected) -->
              <div id="mfs-instructions" style="display:none; margin-top:1.25rem; background:var(--ivory); padding:1.25rem; border-radius:var(--radius-sm); border:1.5px solid var(--border)">
                <h4 id="mfs-title" style="margin-bottom:.5rem">বিকাশ পেমেন্ট নির্দেশিকা:</h4>
                <p style="font-size:.82rem; margin-bottom:.5rem">১. বিকাশ বা নগদে পেমেন্ট নির্দেশিকার জন্য <strong>Cash on Delivery (ক্যাশ অন ডেলিভারি)</strong> নির্বাচন করাই সবচেয়ে সহজ। পণ্য হাতে পেয়ে মূল্য পরিশোধ করতে পারবেন।</p>
                <p style="font-size:.82rem; margin-bottom:.75rem">২. ট্রানজেকশন সফল হলে নিচের বক্সে TrxID এবং প্রেরক মোবাইল নম্বর লিখুন:</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:.75rem">
                  <input type="text" id="mfs-sender" class="form-input" placeholder="Your bKash / Nagad Number">
                  <input type="text" id="mfs-trxid" class="form-input" placeholder="Transaction ID (e.g. 9J47K8LM)">
                </div>
              </div>
            </div>

            <!-- Complete Order Button -->
            <button type="submit" class="btn btn-primary btn-full btn-lg" style="font-size:1.05rem; padding:1.2rem">
              Confirm Order • ${formatPrice(total)} (অর্ডার নিশ্চিত করুন)
            </button>
            </form>
          </div>

          <!-- Checkout Order Summary Sticky -->
          <div class="checkout-summary">
            <div class="checkout-summary-card">
              <h3 style="margin-bottom:1rem; padding-bottom:.75rem; border-bottom:1px solid var(--border)">Order Summary (${count} bangles)</h3>
              <div style="max-height:280px; overflow-y:auto; margin-bottom:1rem; padding-right:.25rem">
                ${STATE.cart.map(item => `
                  <div class="checkout-item">
                    <div style="position:relative">
                      <img src="${item.image}" alt="${item.name}" class="checkout-item-img">
                      <span class="checkout-item-qty">${item.quantity}</span>
                    </div>
                    <div style="flex:1">
                      <div style="font-size:.85rem; font-weight:600">${item.name}</div>
                      <div style="font-size:.72rem; color:var(--charcoal-light)">Size: ${item.size} ${item.color ? `• ${item.color}` : ''}</div>
                    </div>
                    <div style="font-size:.88rem; font-weight:600">${formatPrice(item.price * item.quantity)}</div>
                  </div>
                `).join('')}
              </div>

              <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              ${STATE.discountPercent > 0 ? `
                <div class="summary-row" style="color:#22a84a">
                  <span>Discount (${STATE.discountPercent}%)</span>
                  <span>-${formatPrice(discountAmount)}</span>
                </div>
              ` : ''}
              <div class="summary-row">
                <span>Delivery Charge</span>
                <span id="checkout-shipping-cost">${shipping === 0 ? '<strong style="color:#22a84a">FREE</strong>' : formatPrice(shipping)}</span>
              </div>
              <div class="summary-row total">
                <span>Payable Amount</span>
                <span id="checkout-total-cost">${formatPrice(total)}</span>
              </div>

              <div style="margin-top:1.25rem; font-size:.75rem; color:var(--charcoal-light); text-align:center; border-top:1px dashed var(--border); padding-top:1rem">
                🔒 256-Bit SSL Encrypted & Secured by টুংটাং (TungTang)
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const updateShippingDistrict = (district) => {
    const isDhaka = district.toLowerCase().includes('dhaka');
    const { subtotal, discountAmount } = getCartTotals();
    const shipping = subtotal > 1500 ? 0 : (isDhaka ? 60 : 120);
    const total = subtotal - discountAmount + shipping;

    const shipElem = $('#checkout-shipping-cost');
    if (shipElem) shipElem.innerHTML = shipping === 0 ? '<strong style="color:#22a84a">FREE</strong>' : formatPrice(shipping);
    const totalElem = $('#checkout-total-cost');
    if (totalElem) totalElem.textContent = formatPrice(total);
  };

  const selectPaymentMethod = (method) => {
    $$('.payment-option').forEach(opt => opt.classList.remove('selected'));
    $(`#opt-${method}`)?.classList.add('selected');

    const mfsBox = $('#mfs-instructions');
    const mfsTitle = $('#mfs-title');
    if (method === 'cod') {
      if (mfsBox) mfsBox.style.display = 'none';
    } else if (method === 'bkash') {
      if (mfsBox) {
        mfsBox.style.display = 'block';
        mfsTitle.textContent = 'বিকাশ পেমেন্ট নির্দেশিকা (bKash Send Money):';
      }
    } else if (method === 'nagad') {
      if (mfsBox) {
        mfsBox.style.display = 'block';
        mfsTitle.textContent = 'নগদ পেমেন্ট নির্দেশিকা (Nagad Send Money):';
      }
    }
  };

  const placeOrder = () => {
    const name = $('#cust-name')?.value;
    const phone = $('#cust-phone')?.value;
    const district = $('#cust-district')?.value;
    const area = $('#cust-area')?.value;
    const address = $('#cust-address')?.value;
    const notes = $('#cust-notes')?.value;
    const method = $('input[name="payment-method"]:checked')?.value || 'cod';
    const { total, count } = getCartTotals();

    const orderId = 'TT-' + Math.floor(100000 + Math.random() * 900000);

    // Render Order Success Screen
    const checkoutContainer = $('#checkout-page-view');
    if (checkoutContainer) {
      checkoutContainer.innerHTML = `
        <div class="order-success">
          <div class="success-card">
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="order-number">Order ID: #${orderId}</div>
            <h2 style="margin:.5rem 0">ধন্যবাদ, আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!</h2>
            <p>Thank you <strong>${name}</strong>! We have received your order for ${count} bangles. You will receive an SMS and a confirmation phone call shortly on <strong>${phone}</strong>.</p>

            <div class="delivery-estimate">
              <strong>📦 Delivery to: ${area}, ${district}</strong>
              <span>Estimated Delivery: ${district.includes('Dhaka') ? 'Within 24-48 Hours' : 'Within 2-4 Days'}</span>
              <div style="margin-top:.4rem; font-weight:700; color:var(--burgundy)">Amount to Pay: ${formatPrice(total)} (${method.toUpperCase()})</div>
            </div>

            <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap">
              <button class="btn btn-primary" onclick="Rongchuri.navigate('home')">Return to Home</button>
              <button class="btn btn-outline" onclick="window.print()">Print Order Invoice</button>
            </div>
          </div>
        </div>
      `;
    }

    // Clear cart
    STATE.cart = [];
    saveCart();
    showToast(`Order #${orderId} placed successfully!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ═══════════════════════════════════════════════════════════
  // WISHLIST PAGE
  // ═══════════════════════════════════════════════════════════
  const renderWishlistPage = () => {
    const container = $('#wishlist-page-view');
    if (!container) return;

    const wishlistProducts = PRODUCTS.filter(p => STATE.wishlist.includes(p.id));

    if (wishlistProducts.length === 0) {
      container.innerHTML = `
        <div class="container wishlist-page">
          <div class="wishlist-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h2>আপনার উইশলিস্ট খালি</h2>
            <p>Save your dream bangles and bridal sets here by clicking the heart icon on any product.</p>
            <button class="btn btn-primary" onclick="Rongchuri.navigate('shop')">Explore Bangles</button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="container wishlist-page">
          <div class="section-header" style="text-align:left; margin-bottom:2rem">
            <span class="eyebrow">Saved Items</span>
            <h1>My Wishlist (${wishlistProducts.length})</h1>
          </div>
          <div class="product-grid">
            ${wishlistProducts.map(createProductCard).join('')}
          </div>
        </div>
      `;
    }
  };

  // ═══════════════════════════════════════════════════════════
  // LIVE SEARCH
  // ═══════════════════════════════════════════════════════════
  const openSearch = () => {
    $('#search-overlay')?.classList.add('open');
    $('#search-input')?.focus();
    document.body.classList.add('no-scroll');
  };

  const closeSearch = () => {
    $('#search-overlay')?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  const handleSearchInput = (query) => {
    const resultsContainer = $('#search-results');
    if (!resultsContainer) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      resultsContainer.innerHTML = '';
      return;
    }

    const matched = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    ).slice(0, 6);

    if (matched.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-results-inner">
          <div class="search-no-results">No bangles found matching "${query}". Try searching "bridal", "glass", "ruby", or "kashmiri".</div>
        </div>
      `;
    } else {
      resultsContainer.innerHTML = `
        <div class="search-results-inner">
          ${matched.map(p => `
            <a class="search-result-item" onclick="Rongchuri.closeSearch(); Rongchuri.viewProduct(${p.id})">
              <img src="${p.images[0]}" alt="${p.name}" class="search-result-image">
              <div style="flex:1">
                <div class="search-result-name">${p.name}</div>
                <div style="font-size:.72rem; color:var(--charcoal-light)">${p.categoryLabel}</div>
              </div>
              <div class="search-result-price">${formatPrice(p.price)}</div>
            </a>
          `).join('')}
          <div style="padding:.75rem; text-align:center; background:var(--ivory); font-size:.8rem">
            <a onclick="Rongchuri.closeSearch(); Rongchuri.filterSearch('${query}')" style="color:var(--burgundy); font-weight:600; cursor:pointer">
              View all results for "${query}" →
            </a>
          </div>
        </div>
      `;
    }
  };

  // ═══════════════════════════════════════════════════════════
  // SIZE GUIDE & CALCULATOR MODAL
  // ═══════════════════════════════════════════════════════════
  const openSizeGuideModal = () => {
    $('#size-guide-overlay')?.classList.add('open');
    document.body.classList.add('no-scroll');
  };

  const closeSizeGuideModal = () => {
    $('#size-guide-overlay')?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  const calculateBangleSize = (handCircumferenceInches) => {
    const val = parseFloat(handCircumferenceInches);
    const resultElem = $('#size-calc-result');
    if (!resultElem) return;

    if (isNaN(val) || val <= 0) {
      resultElem.innerHTML = `<span style="color:#e05050">Please enter a valid hand measurement.</span>`;
      return;
    }

    let recommended = '2.6';
    let desc = 'Standard Bangladeshi women size';

    if (val < 6.8) {
      recommended = '2.2';
      desc = 'Extra Small wrist (Inner diameter 2.125 inches / 54mm)';
    } else if (val < 7.3) {
      recommended = '2.4';
      desc = 'Small wrist (Inner diameter 2.25 inches / 57.2mm)';
    } else if (val < 7.8) {
      recommended = '2.6';
      desc = 'Medium wrist - Most popular Bangladeshi fit (Inner diameter 2.375 inches / 60.3mm)';
    } else if (val < 8.3) {
      recommended = '2.8';
      desc = 'Large wrist (Inner diameter 2.5 inches / 63.5mm)';
    } else {
      recommended = '2.10';
      desc = 'Extra Large wrist (Inner diameter 2.625 inches / 66.7mm)';
    }

    resultElem.innerHTML = `
      <div style="background:rgba(123,28,58,.08); padding:1rem; border-radius:var(--radius-sm); border:1.5px solid var(--burgundy); margin-top:1rem">
        <div style="font-size:.78rem; text-transform:uppercase; letter-spacing:.06em; color:var(--burgundy); font-weight:700">Recommended Size:</div>
        <div style="font-size:2rem; font-family:var(--font-serif); font-weight:700; color:var(--burgundy)">Size ${recommended}</div>
        <p style="font-size:.85rem; margin-top:.25rem">${desc}</p>
      </div>
    `;
  };

  // ═══════════════════════════════════════════════════════════
  // VIEW NAVIGATION (SPA ROUTING)
  // ═══════════════════════════════════════════════════════════
  const navigate = (viewName, param = null) => {
    STATE.currentView = viewName;

    // Hide all view containers
    const views = ['home', 'shop', 'product', 'cart', 'checkout', 'wishlist', 'about', 'contact'];
    views.forEach(v => {
      const el = $(`#${v}-view`);
      if (el) el.style.display = 'none';
    });

    // Update nav active link
    $$('.nav-link').forEach(link => {
      const target = link.getAttribute('data-nav');
      if (target === viewName) link.classList.add('active');
      else link.classList.remove('active');
    });

    // Close any open drawers
    closeCartDrawer();
    closeQuickView();
    closeSearch();
    $('#mobile-nav')?.classList.remove('open');

    // Show selected view
    const activeViewEl = $(`#${viewName}-view`);
    if (activeViewEl) {
      activeViewEl.style.display = 'block';
    }

    // View-specific initializers
    if (viewName === 'home') {
      window.location.hash = 'home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'shop') {
      window.location.hash = 'shop';
      renderShopPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'product') {
      window.location.hash = `product-${param}`;
      renderProductDetailPage(param);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'cart') {
      window.location.hash = 'cart';
      renderCartPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'checkout') {
      window.location.hash = 'checkout';
      renderCheckoutPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'wishlist') {
      window.location.hash = 'wishlist';
      renderWishlistPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'about') {
      window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'contact') {
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHashChange = () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (hash.startsWith('product-')) {
      const id = hash.replace('product-', '');
      navigate('product', id);
    } else if (['home', 'shop', 'cart', 'checkout', 'wishlist', 'about', 'contact'].includes(hash)) {
      navigate(hash);
    } else {
      navigate('home');
    }
  };

  // ═══════════════════════════════════════════════════════════
  // EXPOSE GLOBAL API ON WINDOW
  // ═══════════════════════════════════════════════════════════
  window.Rongchuri = {
    navigate,
    addToCart,
    updateCartQty,
    removeFromCart,
    openCartDrawer,
    closeCartDrawer,
    toggleWishlist,
    openQuickView,
    closeQuickView,
    openSearch,
    closeSearch,
    handleSearchInput,
    openSizeGuideModal,
    closeSizeGuideModal,
    calculateBangleSize,
    selectPaymentMethod,
    updateShippingDistrict,
    placeOrder,

    // Filter helpers
    filterCategory: (cat) => {
      STATE.shopFilter.category = cat;
      navigate('shop');
      // Update sidebar category radio if present
      const rad = $(`input[name="filter-cat"][value="${cat}"]`);
      if (rad) rad.checked = true;
      renderShopPage();
    },
    filterOccasion: (occ) => {
      STATE.shopFilter.occasions = [occ];
      navigate('shop');
      renderShopPage();
    },
    filterSearch: (query) => {
      STATE.shopFilter.search = query;
      navigate('shop');
      renderShopPage();
    },
    clearFilters: () => {
      STATE.shopFilter = {
        category: 'all',
        occasions: [],
        sizes: [],
        maxPrice: 4000,
        minPrice: 0,
        sort: 'featured',
        search: ''
      };
      $$('.filter-option input[type="checkbox"]').forEach(c => c.checked = false);
      const radAll = $('input[name="filter-cat"][value="all"]');
      if (radAll) radAll.checked = true;
      renderShopPage();
    },
    setSort: (val) => {
      STATE.shopFilter.sort = val;
      renderShopPage();
    },
    toggleOccasionFilter: (occ, isChecked) => {
      if (isChecked) {
        STATE.shopFilter.occasions.push(occ);
      } else {
        STATE.shopFilter.occasions = STATE.shopFilter.occasions.filter(o => o !== occ);
      }
      renderShopPage();
    },
    toggleSizeFilter: (size, isChecked) => {
      if (isChecked) {
        STATE.shopFilter.sizes.push(size);
      } else {
        STATE.shopFilter.sizes = STATE.shopFilter.sizes.filter(s => s !== size);
      }
      renderShopPage();
    },
    setPriceFilter: (min, max) => {
      STATE.shopFilter.minPrice = Number(min) || 0;
      STATE.shopFilter.maxPrice = Number(max) || 4000;
      renderShopPage();
    },

    // Trending Tabs
    switchTrendingTab: (cat, btn) => {
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTrendingTab(cat);
    },

    // Product Detail Page interactions
    viewProduct: (id) => {
      navigate('product', id);
    },
    switchThumb: (src, thumbElem) => {
      const mainImg = $('#main-product-image');
      const mainWrap = $('#main-product-image-wrap');
      if (mainImg) {
        mainImg.src = src;
        mainImg.style.transform = 'scale(1)';
        mainImg.style.transformOrigin = 'center center';
      }
      if (mainWrap) mainWrap.classList.remove('zoomed');
      $$('.thumb').forEach(t => t.classList.remove('active'));
      if (thumbElem) thumbElem.classList.add('active');
    },
    selectDetailSize: (size, btn) => {
      $$('.size-options .size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = $('#selected-size-label');
      if (label) label.textContent = size;
    },
    selectDetailColor: (colorName, swatchElem) => {
      $$('.color-swatches .swatch').forEach(s => s.classList.remove('active'));
      swatchElem.classList.add('active');
      const label = $('#selected-color-label');
      if (label) label.textContent = colorName;
    },
    stepDetailQty: (delta) => {
      const valElem = $('#detail-qty-value');
      if (!valElem) return;
      let cur = parseInt(valElem.textContent, 10) || 1;
      cur = Math.max(1, cur + delta);
      valElem.textContent = cur;
    },
    addCurrentToCart: () => {
      if (!STATE.currentProduct) return;
      const size = $('#selected-size-label')?.textContent || '2.6';
      const color = $('#selected-color-label')?.textContent || '';
      const qty = parseInt($('#detail-qty-value')?.textContent || '1', 10);
      addToCart(STATE.currentProduct.id, size, color, qty);
    },
    buyNowCurrent: () => {
      if (!STATE.currentProduct) return;
      const size = $('#selected-size-label')?.textContent || '2.6';
      const color = $('#selected-color-label')?.textContent || '';
      const qty = parseInt($('#detail-qty-value')?.textContent || '1', 10);
      addToCart(STATE.currentProduct.id, size, color, qty);
      closeCartDrawer();
      navigate('checkout');
    },

    // Coupons
    applyCoupon: () => {
      const input = $('#cart-coupon-input');
      if (!input) return;
      const code = input.value.trim().toUpperCase();
      if (COUPONS[code]) {
        STATE.appliedCoupon = code;
        STATE.discountPercent = COUPONS[code];
        showToast(`Promo "${code}" applied! You get ${STATE.discountPercent}% OFF!`);
        updateCartUI();
      } else {
        showToast('Invalid promo code. Try "RONG10" or "EID20"', 'error');
      }
    }
  };
  window.Tungtang = window.Rongchuri;

  // ═══════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial renders
    renderHomePage();
    updateCartUI();
    updateWishlistUI();

    // 2. Hash routing check
    if (window.location.hash) {
      handleHashChange();
    } else {
      navigate('home');
    }
    window.addEventListener('hashchange', handleHashChange);

    // 3. Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = $('#navbar');
      if (window.scrollY > 40) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    // 4. Hamburger mobile menu toggle
    const hamburger = $('#hamburger');
    const mobileNav = $('#mobile-nav');
    const closeMobileNav = $('#close-mobile-nav');

    hamburger?.addEventListener('click', () => {
      mobileNav?.classList.toggle('open');
      hamburger?.classList.toggle('open');
    });

    closeMobileNav?.addEventListener('click', () => {
      mobileNav?.classList.remove('open');
      hamburger?.classList.remove('open');
    });

    // 5. Global overlay click handler
    $('#overlay')?.addEventListener('click', () => {
      closeCartDrawer();
      closeQuickView();
      closeSearch();
      closeSizeGuideModal();
    });

    // 6. Search input listener
    const searchInput = $('#search-input');
    searchInput?.addEventListener('input', (e) => {
      handleSearchInput(e.target.value);
    });

    // 7. Escape key closes all modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeQuickView();
        closeSearch();
        closeSizeGuideModal();
        $('#mobile-nav')?.classList.remove('open');
      }
    });
  });

})();
