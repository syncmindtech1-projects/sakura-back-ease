import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const ADMIN_USERNAME = 'SyncMind Tech group'
const ADMIN_PASSWORD = 'Sync.Mind@Tech1.group@'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { username, password, action, payload } = await req.json()

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return json({ error: 'Invalid admin credentials' }, 401)
    }

    switch (action) {
      // ---------- Jobs (posted_jobs) ----------
      case 'list_jobs': {
        const { data, error } = await supabase.from('posted_jobs').select('*').order('created_at', { ascending: false })
        if (error) throw error
        return json({ data })
      }
      case 'create_job': {
        const { data, error } = await supabase.from('posted_jobs').insert(payload).select().single()
        if (error) throw error
        return json({ data })
      }
      case 'update_job': {
        const { id, ...rest } = payload
        const { data, error } = await supabase.from('posted_jobs').update(rest).eq('id', id).select().single()
        if (error) throw error
        return json({ data })
      }
      case 'delete_job': {
        const { data: job, error: e0 } = await supabase.from('posted_jobs').select('*').eq('id', payload.id).maybeSingle()
        if (e0) throw e0
        if (job) {
          await supabase.from('deleted_jobs').insert({
            original_id: job.id,
            source_table: 'posted_jobs',
            title: job.title,
            company: job.company,
            contact_email: job.contact_email,
            location: job.location,
            salary: job.salary,
            job_type: job.job_type,
            category: job.category,
            description: job.description,
            apply_url: job.apply_url,
            posted_by: job.posted_by,
            original_created_at: job.created_at,
            deleted_by: payload.deleted_by ?? 'admin',
          })
        }
        const { error } = await supabase.from('posted_jobs').delete().eq('id', payload.id)
        if (error) throw error
        return json({ ok: true })
      }

      // ---------- Deleted jobs archive ----------
      case 'list_deleted_jobs': {
        const { data, error } = await supabase.from('deleted_jobs').select('*').order('deleted_at', { ascending: false })
        if (error) throw error
        return json({ data })
      }
      case 'restore_deleted_job': {
        const { data: arc, error: e1 } = await supabase.from('deleted_jobs').select('*').eq('id', payload.id).single()
        if (e1) throw e1

        if (arc.source_table === 'job_submissions') {
          const { data: sub, error: eS } = await supabase.from('job_submissions').insert({
            title: arc.title,
            company: arc.company,
            contact_email: arc.contact_email ?? 'jobs@jobsphere.net',
            location: arc.location,
            salary: arc.salary,
            job_type: arc.job_type,
            category: arc.category,
            description: arc.description ?? '',
            apply_url: arc.apply_url,
            status: 'pending',
          }).select().single()
          if (eS) throw eS
          await supabase.from('deleted_jobs').delete().eq('id', payload.id)
          return json({ data: sub, restored_to: 'pending' })
        }

        const { data: job, error: e2 } = await supabase.from('posted_jobs').insert({
          title: arc.title,
          company: arc.company,
          contact_email: arc.contact_email ?? 'jobs@jobsphere.net',
          location: arc.location,
          salary: arc.salary,
          job_type: arc.job_type,
          category: arc.category,
          description: arc.description ?? '',
          apply_url: arc.apply_url,
          posted_by: arc.posted_by,
        }).select().single()
        if (e2) throw e2
        await supabase.from('deleted_jobs').delete().eq('id', payload.id)
        return json({ data: job, restored_to: 'live' })
      }

      case 'purge_deleted_job': {
        const { error } = await supabase.from('deleted_jobs').delete().eq('id', payload.id)
        if (error) throw error
        return json({ ok: true })
      }
      case 'purge_all_deleted_jobs': {
        const { error } = await supabase.from('deleted_jobs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (error) throw error
        return json({ ok: true })
      }

      // ---------- Job submissions (approval queue) ----------
      case 'list_submissions': {
        const { data, error } = await supabase.from('job_submissions').select('*').order('created_at', { ascending: false })
        if (error) throw error
        return json({ data })
      }
      case 'approve_submission': {
        const { data: sub, error: e1 } = await supabase.from('job_submissions').select('*').eq('id', payload.id).single()
        if (e1) throw e1
        const { data: job, error: e2 } = await supabase.from('posted_jobs').insert({
          title: sub.title,
          company: sub.company,
          contact_email: sub.contact_email,
          location: sub.location,
          salary: sub.salary,
          apply_url: sub.apply_url,
          job_type: sub.job_type,
          category: sub.category,
          description: sub.description,
        }).select().single()
        if (e2) throw e2
        await supabase.from('job_submissions').update({ status: 'approved' }).eq('id', payload.id)
        await sendProviderEmail(sub.contact_email, `Your job "${sub.title}" is now live on JobSphere`,
          `<h2>Your job posting has been approved</h2>
           <p><strong>${esc(sub.title)}</strong> at <strong>${esc(sub.company)}</strong> is now published on JobSphere.</p>
           <p>Thank you for posting with us.</p>`)
        return json({ data: job })
      }
      case 'reject_submission': {
        const reason = payload.reason || 'No reason provided.'
        const { data: sub, error } = await supabase.from('job_submissions')
          .update({ status: 'rejected', rejection_reason: reason }).eq('id', payload.id).select().single()
        if (error) throw error
        await sendProviderEmail(sub.contact_email, `Update on your job submission "${sub.title}"`,
          `<h2>Your job posting was not approved</h2>
           <p><strong>${esc(sub.title)}</strong> at <strong>${esc(sub.company)}</strong> could not be published.</p>
           <p><strong>Reason:</strong> ${esc(reason)}</p>
           <p>You are welcome to revise and submit again.</p>`)
        return json({ ok: true })
      }
      case 'update_submission': {
        const { id, ...rest } = payload
        const { data, error } = await supabase.from('job_submissions').update(rest).eq('id', id).select().single()
        if (error) throw error
        return json({ data })
      }
      case 'delete_submission': {
        const { error } = await supabase.from('job_submissions').delete().eq('id', payload.id)
        if (error) throw error
        return json({ ok: true })
      }

      // ---------- Signups (dashboard-only user tracking) ----------
      case 'list_signups': {
        const { data, error } = await supabase.from('signup_notifications').select('*').order('notified_at', { ascending: false })
        if (error) throw error
        return json({ data })
      }
      case 'mark_signup_reviewed': {
        const { error } = await supabase.from('signup_notifications')
          .update({ reviewed: payload.reviewed ?? true }).eq('user_id', payload.user_id)
        if (error) throw error
        return json({ ok: true })
      }

      // ---------- Ad submission decisions ----------
      case 'approve_ad_submission': {
        const { data: lead, error } = await supabase.from('ad_submissions')
          .update({ status: 'approved' }).eq('id', payload.id).select().single()
        if (error) throw error
        await sendProviderEmail(lead.contact_email, 'Your JobSphere ad has been approved',
          `<h2>Your advertisement has been approved</h2>
           <p>Hi ${esc(lead.advertiser_name)}, your ad request has been approved and will go live on JobSphere.</p>`)
        return json({ ok: true })
      }
      case 'reject_ad_submission': {
        const reason = payload.reason || 'No reason provided.'
        const { data: lead, error } = await supabase.from('ad_submissions')
          .update({ status: 'rejected', rejection_reason: reason }).eq('id', payload.id).select().single()
        if (error) throw error
        await sendProviderEmail(lead.contact_email, 'Update on your JobSphere ad request',
          `<h2>Your advertisement was not approved</h2>
           <p>Hi ${esc(lead.advertiser_name)}, unfortunately your ad request could not be approved.</p>
           <p><strong>Reason:</strong> ${esc(reason)}</p>`)
        return json({ ok: true })
      }


      // ---------- Ads (site_ads) ----------
      case 'list_ads': {
        const { data, error } = await supabase.from('site_ads').select('*').order('slot_key')
        if (error) throw error
        return json({ data })
      }
      case 'upsert_ad': {
        const { data, error } = await supabase.from('site_ads')
          .upsert(payload, { onConflict: 'slot_key' })
          .select().single()
        if (error) throw error
        return json({ data })
      }
      case 'delete_ad': {
        const { error } = await supabase.from('site_ads').delete().eq('id', payload.id)
        if (error) throw error
        return json({ ok: true })
      }

      // ---------- Ad submissions ----------
      case 'list_ad_submissions': {
        const { data, error } = await supabase.from('ad_submissions').select('*').order('created_at', { ascending: false })
        if (error) throw error
        return json({ data })
      }

      default:
        return json({ error: 'Unknown action' }, 400)
    }
  } catch (e) {
    console.error('admin-ops error', e)
    return json({ error: (e as Error).message }, 500)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function esc(s: unknown) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

async function sendProviderEmail(to: string, subject: string, html: string) {
  const key = Deno.env.get('RESEND_API_KEY')
  if (!key || !to) return false
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'JobSphere <onboarding@resend.dev>', to: [to], subject, html }),
    })
    if (!r.ok) console.error('Resend error', r.status, await r.text())
    return r.ok
  } catch (e) {
    console.error('email failed', e)
    return false
  }
}
