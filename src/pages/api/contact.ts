import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// On-demand (server) route: runs as a Vercel serverless function so it can hold
// the Resend secret and send mail. Everything else in the site stays static.
export const prerender = false;

// Verified sending domain in Resend: notificaciones.generandoideas.com
const FROM = 'Generando Ideas <formulario@notificaciones.generandoideas.com>';
const TO = 'marketing@generandoideas.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return json({ ok: false, error: 'server_misconfigured' }, 500);
  }

  // Accept both JSON and form-encoded submissions.
  let body: Record<string, string> = {};
  try {
    const ct = request.headers.get('content-type') ?? '';
    if (ct.includes('application/json')) {
      body = await request.json();
    } else {
      const form = await request.formData();
      form.forEach((v, k) => (body[k] = String(v)));
    }
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const get = (k: string) => String(body[k] ?? '').trim();
  const name = get('name');
  const company = get('company');
  const role = get('role');
  const email = get('email');
  const phone = get('phone');
  const service = get('service');
  const source = get('source');
  const message = get('message');

  // Server-side validation mirrors the client rules (never trust the client).
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'requerido';
  if (!company) errors.company = 'requerido';
  if (!role) errors.role = 'requerido';
  if (!email) errors.email = 'requerido';
  else if (!EMAIL_RE.test(email)) errors.email = 'inválido';
  if (!phone) errors.phone = 'requerido';
  if (!service) errors.service = 'requerido';
  if (!source) errors.source = 'requerido';
  if (!message || message.length < 10) errors.message = 'muy corto';

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: 'validation', fields: errors }, 422);
  }

  const rows: Array<[string, string]> = [
    ['Nombre', name],
    ['Empresa', company],
    ['Cargo / Área', role],
    ['Correo', email],
    ['Celular', phone],
    ['Servicio', service],
    ['¿Cómo llegó?', source],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#101114;line-height:1.5">
      <h2 style="margin:0 0 16px">Nueva solicitud de contacto</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px;border:1px solid #e5e5e6;background:#fafafa;font-weight:bold;white-space:nowrap">${esc(k)}</td>
                 <td style="padding:8px 12px;border:1px solid #e5e5e6">${esc(v)}</td>
               </tr>`,
          )
          .join('')}
      </table>
      <h3 style="margin:20px 0 8px">Mensaje</h3>
      <p style="white-space:pre-wrap;margin:0;padding:12px;border:1px solid #e5e5e6;border-radius:8px;background:#fafafa">${esc(message)}</p>
    </div>`;

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    `Mensaje:`,
    message,
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Nueva solicitud — ${name} (${company})`,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return json({ ok: false, error: 'send_failed' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
};
