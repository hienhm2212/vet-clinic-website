// Booking form: validation + delivery (form backend if configured, otherwise a
// ready-made Zalo/SMS message so the request still reaches the clinic).

/** Vietnamese mobile/landline: 0xxxxxxxxx or +84xxxxxxxxx (9 digits after the prefix). */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[\s.\-()]/g, '')
  const m = digits.match(/^(?:\+?84|0)(\d{9})$/)
  return m ? `0${m[1]}` : null
}

export function buildMessage(data: Record<string, string>, lang: string): string {
  const vi = lang === 'vi'
  const lines = [
    vi ? 'Chào bác sĩ, tôi muốn đặt lịch khám:' : 'Hello doctor, I would like to book a visit:',
    `${vi ? '• Họ tên' : '• Name'}: ${data.name}`,
    `${vi ? '• SĐT' : '• Phone'}: ${data.phone}`,
    `${vi ? '• Thú cưng' : '• Pet'}: ${[data.species, data.pet].filter(Boolean).join(' – ')}`,
    `${vi ? '• Dịch vụ' : '• Service'}: ${data.service}`,
  ]
  if (data.date) {
    const [y, m, d] = data.date.split('-')
    lines.push(`${vi ? '• Ngày muốn đến' : '• Preferred date'}: ${d}/${m}/${y}`)
  }
  if (data.notes) lines.push(`${vi ? '• Tình trạng' : '• Notes'}: ${data.notes}`)
  return lines.join('\n')
}

export function initBookingForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-booking]').forEach(form => {
    const result = form.nextElementSibling as HTMLElement
    const ds = form.dataset
    const lang = ds.lang ?? 'vi'
    const vi = lang === 'vi'

    const dateInput = form.querySelector<HTMLInputElement>('input[type="date"]')
    if (dateInput) {
      const now = new Date()
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
      dateInput.min = now.toISOString().slice(0, 10)
    }

    const setError = (input: HTMLInputElement, msg: string) => {
      input.setAttribute('aria-invalid', msg ? 'true' : 'false')
      const err = document.getElementById(`${input.id}-err`)
      if (err) err.textContent = msg
    }

    const validate = () => {
      const name = form.elements.namedItem('name') as HTMLInputElement
      const phone = form.elements.namedItem('phone') as HTMLInputElement
      const nameOk = name.value.trim().length >= 2
      const phoneOk = normalizePhone(phone.value) !== null
      setError(name, nameOk ? '' : ds.errName!)
      setError(phone, phoneOk ? '' : ds.errPhone!)
      if (!nameOk) name.focus()
      else if (!phoneOk) phone.focus()
      return nameOk && phoneOk
    }

    // Clear an error as soon as the user fixes the field.
    form.addEventListener('input', e => {
      const el = e.target as HTMLInputElement
      if (el.getAttribute('aria-invalid') === 'true') {
        const ok = el.name === 'phone' ? normalizePhone(el.value) !== null : el.value.trim().length >= 2
        if (ok) setError(el, '')
      }
    })

    const showResult = (title: string, text: string, message?: string) => {
      result.querySelector('[data-result-title]')!.textContent = title
      result.querySelector('[data-result-text]')!.textContent = text
      const send = result.querySelector<HTMLElement>('[data-send-options]')!
      send.hidden = !message
      if (message) {
        result.querySelector('[data-message]')!.textContent = message
        const sms = result.querySelector<HTMLAnchorElement>('[data-send-sms]')!
        sms.href = `sms:${ds.phone}?body=${encodeURIComponent(message)}`
      }
      form.hidden = true
      result.hidden = false
      result.focus()
      result.scrollIntoView({ block: 'nearest' })
    }

    result.querySelector('[data-send-zalo]')?.addEventListener('click', async () => {
      const message = result.querySelector('[data-message]')!.textContent ?? ''
      try {
        await navigator.clipboard.writeText(message)
        ;(result.querySelector('[data-copied]') as HTMLElement).hidden = false
      } catch {
        /* Clipboard may be blocked; the message is still visible to copy by hand. */
      }
      window.open(ds.zalo, '_blank', 'noopener')
    })

    result.querySelector('[data-booking-reset]')?.addEventListener('click', () => {
      result.hidden = true
      form.hidden = false
      ;(form.elements.namedItem('name') as HTMLInputElement).focus()
    })

    form.addEventListener('submit', async e => {
      e.preventDefault()
      if (!validate()) return

      const fd = new FormData(form)
      if (fd.get('_gotcha')) return // bot
      const data = Object.fromEntries(
        [...fd.entries()].filter(([k]) => k !== '_gotcha').map(([k, v]) => [k, String(v).trim()]),
      )
      data.phone = normalizePhone(data.phone) ?? data.phone
      const message = buildMessage(data, lang)

      const endpoint = ds.endpoint
      if (endpoint) {
        const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
        const label = button.querySelector('[data-submit-label]')!
        const original = label.textContent
        button.disabled = true
        label.textContent = ds.sending!
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, message, _subject: `Đặt lịch: ${data.name} – ${data.phone}` }),
          })
          if (!res.ok) throw new Error(String(res.status))
          showResult(
            vi ? 'Đã gửi yêu cầu!' : 'Request sent!',
            vi
              ? 'Cảm ơn bạn! Bác sĩ sẽ gọi lại để xác nhận lịch khám. Nếu bé cần khám gấp, hãy gọi trực tiếp cho phòng khám.'
              : 'Thank you! The vet will call you back to confirm. If it is urgent, please call the clinic directly.',
          )
          form.reset()
          return
        } catch {
          // Fall through to the message-based flow so the request is never lost.
        } finally {
          button.disabled = false
          label.textContent = original
        }
      }

      showResult(
        vi ? 'Còn một bước nữa!' : 'One more step!',
        vi
          ? 'Gửi tin nhắn dưới đây cho bác sĩ qua Zalo hoặc SMS. Bác sĩ sẽ phản hồi để xác nhận lịch khám.'
          : 'Send the message below to the vet via Zalo or SMS, and they will reply to confirm your visit.',
        message,
      )
    })
  })
}
