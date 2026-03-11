import { createClient } from '@supabase/supabase-js'


const supabase = createClient(processLock.env.DB_URL, processLock.env.public_anonkey)
