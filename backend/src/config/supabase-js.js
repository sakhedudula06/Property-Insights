import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.DB_URL, process.env.public_anonkey)

export default supabase