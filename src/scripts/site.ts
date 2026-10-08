// Small progressive enhancements shared by every page. The site works without them.

// Sticky header shadow
const header = document.querySelector<HTMLElement>('[data-header]')
if (header) {
  const onScroll = () => header.toggleAttribute('data-scrolled', window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]')
const nav = document.querySelector<HTMLElement>('[data-nav]')
if (toggle && nav) {
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open))
    nav.toggleAttribute('data-open', open)
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'))
  nav.addEventListener('click', e => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false)
  })
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false)
      toggle.focus()
    }
  })
  window.matchMedia('(min-width: 961px)').addEventListener('change', e => e.matches && setOpen(false))
}

// Reveal on scroll
const revealed = document.querySelectorAll<HTMLElement>('[data-reveal]')
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  revealed.forEach(el => io.observe(el))
} else {
  revealed.forEach(el => el.classList.add('is-visible'))
}

// "Open now" badge, computed in the clinic's time zone
const statusEls = document.querySelectorAll<HTMLElement>('[data-open-status]')
if (statusEls.length) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value ?? 0)
  const now = get('hour') * 60 + get('minute')

  statusEls.forEach(el => {
    const { open = '08:00', close = '20:00', openLabel, closedLabel, closesAt, opensAt } = el.dataset
    const toMin = (t: string) => {
      const [h, m] = t.split(':').map(Number)
      return h * 60 + m
    }
    const isOpen = now >= toMin(open) && now < toMin(close)
    el.dataset.state = isOpen ? 'open' : 'closed'
    const label = el.querySelector('[data-open-label]')
    if (label) label.textContent = isOpen ? `${openLabel} · ${closesAt} ${close}` : `${closedLabel} · ${opensAt} ${open}`
  })
}
