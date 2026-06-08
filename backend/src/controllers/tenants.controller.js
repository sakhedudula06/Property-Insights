import supabase from "../config/supabase-js.js";

export async function getAllTenants(_, res) {
  try {
    const { data, error } = await supabase.from("tenants").select("*, property_id(name)").order('id', { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function insertTenants(req, res) {
  try {
    const { data: tenantData, error: tenantError } = await supabase
      .from("tenants")
      .insert(req.body)
      .select();

    if (tenantError) {
      console.error("Supabase error:", tenantError);
      return res.status(502).json({ error: tenantError.message });
    }

    res.status(200).json({
      tenant: tenantData?.[0]
    });

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function updateATenant(req, res) {
  try {
    const { id } = req.params;

    const { data: existing, error: checkError } = await supabase.from("tenants").select("id").eq('id', id).single();

    if (!existing) {
      return res.status(400).json({ message: "Tenant doesn't exist!" });
    }

    const { data, error } = await supabase.from("tenants").update(req.body).eq('id', id).select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(204).json(data);

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function deleteATenant(req, res) {
  try {

    const { id } = req.params;

    const { data: existing, error: checkError } = await supabase.from("tenants").select("id").eq('id', id).single();

    if (!existing) {
      return res.status(400).json({ message: "tenant doesn't exists!" });
    }


    const { data, error } = await supabase.from('tenants').delete().eq('id', id).select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(204).json(data);

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}


