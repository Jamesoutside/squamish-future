/**
 * Squamish Civic Forum — Shared Navigation with Dropdown Menus
 * Usage: <nav id="mainNav"></nav> then <script src="nav.js"></script>
 */
(function () {

  // ── INJECT STYLES INTO HEAD ───────────────────────────────────────
  var css = `
    #mainNav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
      background: rgba(15,42,74,0.97);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      border-bottom: 1px solid rgba(232,160,32,0.18);
      box-sizing: border-box;
    }
    body { padding-top: 64px; }

    .sf-nav-logo {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .sf-nav-logo span { color: #e8a020; }

    .sf-nav-links {
      display: flex;
      gap: 0;
      list-style: none;
      align-items: center;
      height: 64px;
      margin: 0;
      padding: 0;
    }

    .sf-nav-item {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .sf-nav-link {
      color: rgba(255,255,255,0.72);
      text-decoration: none;
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 0 0.8rem;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      transition: color 0.2s;
      white-space: nowrap;
      border: none;
      background: none;
      cursor: pointer;
    }
    .sf-nav-link:hover { color: #e8a020; }
    .sf-nav-item:hover > .sf-nav-link { color: #e8a020; }

    .sf-nav-arrow {
      font-size: 0.5rem;
      opacity: 0.55;
      transition: transform 0.2s;
      display: inline-block;
    }
    .sf-nav-item:hover .sf-nav-arrow { transform: rotate(180deg); }

    /* ── DROPDOWN ── */
    .sf-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 230px;
      background: rgba(8,15,26,0.99);
      border: 1px solid rgba(232,160,32,0.2);
      border-radius: 10px;
      padding: 0.4rem 0;
      box-shadow: 0 16px 48px rgba(0,0,0,0.5);
      opacity: 0;
      visibility: hidden;
      transform: translateY(8px);
      transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
      z-index: 9999;
      pointer-events: none;
    }
    .sf-nav-item:hover .sf-dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }

    .sf-dd-section {
      padding: 0.25rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .sf-dd-section:last-child { border-bottom: none; }

    .sf-dd-label {
      display: block;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(232,160,32,0.55);
      padding: 0.45rem 1rem 0.2rem;
    }

    .sf-dd-link {
      display: flex;
      align-items: flex-start;
      gap: 0.7rem;
      padding: 0.55rem 1rem;
      color: rgba(255,255,255,0.72);
      text-decoration: none;
      font-family: 'Inter', sans-serif;
      font-size: 0.83rem;
      font-weight: 500;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }
    .sf-dd-link:hover {
      background: rgba(232,160,32,0.09);
      color: white;
    }
    .sf-dd-icon {
      font-size: 1rem;
      width: 20px;
      text-align: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .sf-dd-text { display: flex; flex-direction: column; }
    .sf-dd-name { line-height: 1.3; }
    .sf-dd-desc {
      font-size: 0.68rem;
      color: rgba(255,255,255,0.35);
      margin-top: 0.1rem;
      font-weight: 400;
    }

    /* ── CTA BUTTON ── */
    .sf-nav-cta {
      background: #e8a020 !important;
      color: #0f2a4a !important;
      padding: 0.45rem 1.1rem !important;
      border-radius: 6px !important;
      font-weight: 700 !important;
      height: auto !important;
      margin-left: 0.4rem;
    }
    .sf-nav-cta:hover { background: #c98a10 !important; }

    /* ── HAMBURGER ── */
    .sf-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 6px;
      background: none;
      border: none;
    }
    .sf-hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: rgba(255,255,255,0.75);
      border-radius: 2px;
      transition: all 0.2s;
    }

    @media (max-width: 900px) {
      .sf-nav-links { display: none !important; }
      .sf-hamburger { display: flex; }
      .sf-nav-links.sf-open {
        display: flex !important;
        flex-direction: column;
        align-items: flex-start;
        position: fixed;
        top: 64px;
        left: 0; right: 0;
        background: rgba(8,15,26,0.99);
        padding: 0.5rem 0 2rem;
        overflow-y: auto;
        max-height: calc(100vh - 64px);
        height: auto;
        z-index: 9998;
        border-top: 1px solid rgba(232,160,32,0.15);
      }
      .sf-nav-links.sf-open .sf-nav-item { height: auto; width: 100%; }
      .sf-nav-links.sf-open .sf-nav-link {
        height: auto;
        padding: 0.75rem 1.2rem;
        width: 100%;
      }
      .sf-nav-links.sf-open .sf-dropdown {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        border: none;
        border-left: 2px solid rgba(232,160,32,0.25);
        margin-left: 1.2rem;
        border-radius: 0;
        background: transparent;
        pointer-events: auto;
      }
      .sf-nav-links.sf-open .sf-nav-cta {
        margin: 0.5rem 1rem;
        padding: 0.65rem 1rem !important;
        width: calc(100% - 2rem);
        text-align: center;
        display: block;
      }
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── BUILD NAV HTML ────────────────────────────────────────────────
  var navHTML = `
    <a href="../index.html" class="sf-nav-logo">Squamish <span>Future</span></a>

    <ul class="sf-nav-links" id="sfNavLinks">

      <li class="sf-nav-item">
        <a class="sf-nav-link" href="../tracker.html">
          Issues <span class="sf-nav-arrow">▾</span>
        </a>
        <div class="sf-dropdown">
          <div class="sf-dd-section">
            <span class="sf-dd-label">Community Issues</span>
            <a class="sf-dd-link" href="../tracker.html">
              <span class="sf-dd-icon">📊</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Issues Tracker</span><span class="sf-dd-desc">Vote on what matters most</span></span>
            </a>
            <a class="sf-dd-link" href="../submit.html">
              <span class="sf-dd-icon">📝</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Submit an Issue</span><span class="sf-dd-desc">Tell us what's on your mind</span></span>
            </a>
          </div>
        </div>
      </li>

      <li class="sf-nav-item">
        <a class="sf-nav-link" href="#">
          Council Watch <span class="sf-nav-arrow">▾</span>
        </a>
        <div class="sf-dropdown">
          <div class="sf-dd-section">
            <span class="sf-dd-label">Council Accountability</span>
            <a class="sf-dd-link" href="../council-votes.html">
              <span class="sf-dd-icon">🗳️</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Voting Records</span><span class="sf-dd-desc">How councillors voted in 2025</span></span>
            </a>
            <a class="sf-dd-link" href="../council-attendance.html">
              <span class="sf-dd-icon">📋</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Attendance Tracker</span><span class="sf-dd-desc">Who shows up, who doesn't</span></span>
            </a>
            <a class="sf-dd-link" href="../brendan-park.html">
              <span class="sf-dd-icon">📰</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Brendan Park Facts</span><span class="sf-dd-desc">Full unbiased fact package</span></span>
            </a>
          </div>
        </div>
      </li>

      <li class="sf-nav-item">
        <a class="sf-nav-link" href="../events.html">
          Events <span class="sf-nav-arrow">▾</span>
        </a>
        <div class="sf-dropdown">
          <div class="sf-dd-section">
            <span class="sf-dd-label">Get Involved</span>
            <a class="sf-dd-link" href="../events.html">
              <span class="sf-dd-icon">📅</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Upcoming Events</span><span class="sf-dd-desc">Meetings, forums, coffees</span></span>
            </a>
            <a class="sf-dd-link" href="../events.html">
              <span class="sf-dd-icon">🏠</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Host an Event</span><span class="sf-dd-desc">Kitchen coffee to community forum</span></span>
            </a>
            <a class="sf-dd-link" href="../volunteer.html">
              <span class="sf-dd-icon">🤝</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Volunteer</span><span class="sf-dd-desc">Find a role, book a shift</span></span>
            </a>
          </div>
        </div>
      </li>

      <li class="sf-nav-item">
        <a class="sf-nav-link" href="../members.html">
          Community <span class="sf-nav-arrow">▾</span>
        </a>
        <div class="sf-dropdown">
          <div class="sf-dd-section">
            <span class="sf-dd-label">Our People</span>
            <a class="sf-dd-link" href="../members.html">
              <span class="sf-dd-icon">👥</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Member Directory</span><span class="sf-dd-desc">The people building this</span></span>
            </a>
            <a class="sf-dd-link" href="../candidate.html">
              <span class="sf-dd-icon">🗳️</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Run for Council</span><span class="sf-dd-desc">We'll vet and support you</span></span>
            </a>
          </div>
          <div class="sf-dd-section">
            <span class="sf-dd-label">Support Us</span>
            <a class="sf-dd-link" href="../donate.html">
              <span class="sf-dd-icon">💛</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Donate</span><span class="sf-dd-desc">Fund the research and events</span></span>
            </a>
          </div>
        </div>
      </li>

      <li class="sf-nav-item">
        <a class="sf-nav-link" href="docs/index.html">
          Docs <span class="sf-nav-arrow">▾</span>
        </a>
        <div class="sf-dropdown">
          <div class="sf-dd-section">
            <span class="sf-dd-label">Planning Documents</span>
            <a class="sf-dd-link" href="docs/master-plan.html">
              <span class="sf-dd-icon">📋</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Master Plan</span><span class="sf-dd-desc">Full strategy + election roadmap</span></span>
            </a>
            <a class="sf-dd-link" href="docs/society-package.html">
              <span class="sf-dd-icon">⚖️</span>
              <span class="sf-dd-text"><span class="sf-dd-name">BC Society Package</span><span class="sf-dd-desc">Incorporation checklist + bylaws</span></span>
            </a>
          </div>
        </div>
      </li>

      <li class="sf-nav-item">
        <a class="sf-nav-link" href="#">
          About <span class="sf-nav-arrow">▾</span>
        </a>
        <div class="sf-dropdown">
          <div class="sf-dd-section">
            <span class="sf-dd-label">Squamish Civic Forum</span>
            <a class="sf-dd-link" href="../index.html#mission">
              <span class="sf-dd-icon">🎯</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Our Mission</span><span class="sf-dd-desc">Why we exist</span></span>
            </a>
            <a class="sf-dd-link" href="../index.html#about">
              <span class="sf-dd-icon">🏛️</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Structure</span><span class="sf-dd-desc">Two streams, six working groups</span></span>
            </a>
            <a class="sf-dd-link" href="../index.html#newsletter">
              <span class="sf-dd-icon">📬</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Newsletter</span><span class="sf-dd-desc">5-min weekly digest</span></span>
            </a>
          </div>
          <div class="sf-dd-section">
            <span class="sf-dd-label">Members</span>
            <a class="sf-dd-link" href="../portal.html">
              <span class="sf-dd-icon">🔐</span>
              <span class="sf-dd-text"><span class="sf-dd-name">Member Portal</span><span class="sf-dd-desc">Internal team dashboard</span></span>
            </a>
          </div>
        </div>
      </li>

      <li class="sf-nav-item">
        <a class="sf-nav-link sf-nav-cta" href="../index.html#join">Join Us</a>
      </li>

    </ul>

    <button class="sf-hamburger" id="sfHamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;

  // ── INJECT INTO NAV ───────────────────────────────────────────────
  var nav = document.getElementById('mainNav');
  if (!nav) {
    // Try finding any existing sf-nav
    nav = document.querySelector('.sf-nav');
  }
  if (nav) {
    nav.id = 'mainNav';
    nav.className = '';
    nav.innerHTML = navHTML;
  }

  // ── HAMBURGER TOGGLE ──────────────────────────────────────────────
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('#sfHamburger');
    if (btn) {
      document.getElementById('sfNavLinks').classList.toggle('sf-open');
      return;
    }
    // Close on outside click
    var links = document.getElementById('sfNavLinks');
    if (links && !e.target.closest('#mainNav')) {
      links.classList.remove('sf-open');
    }
    // Close on link click in mobile
    if (e.target.closest('.sf-dd-link') || e.target.closest('.sf-nav-cta')) {
      if (links) links.classList.remove('sf-open');
    }
  });

})();
