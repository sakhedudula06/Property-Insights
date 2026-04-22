import supabase from "../config/supabase-js.js";

export async function getAllTenants(_, res) {
  try {
    const { data, error } = await supabase.from("tenants").select();

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
    const { data, error } = await supabase
      .from("tenants")
      .insert(req.body)
      .select();

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

export async function deleteATenant(req, res) {
  try {

    const { name } = req.params;

    const {data: existing, error: checkError} = await supabase.from("tenants").select("tenant_name").eq('tenant_name', name).single();

    if (!existing) {
      return res.status(400).json({ message: "tenants doesn't exists!" });
    } 


    const { data, error } = await supabase.from('tenants').delete().eq('name', name).select();

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


