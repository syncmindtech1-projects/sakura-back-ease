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
        // notify users
        await supabase.rpc('notify_users_new_job', {}).catch(() => {})
        return json({ data })
      }
      case 'update_job': {
        const { id, ...rest } = payload
        const { data, error } = await supabase.from('posted_jobs').update(rest).eq('id', id).select().single()
        if (error) throw error
        return json({ data })
      }
      case 'delete_job': {
        const { error } = await supabase.from('posted_jobs').delete().eq('id', payload.id)
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
        return json({ data: job })
      }
      case 'reject_submission': {
        const { error } = await supabase.from('job_submissions').update({ status: 'rejected' }).eq('id', payload.id)
        if (error) throw error
        return json({ ok: true })
      }
      case 'delete_submission': {
        const { error } = await supabase.from('job_submissions').delete().eq('id', payload.id)
        if (error) throw error
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
