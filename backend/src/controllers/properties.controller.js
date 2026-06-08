import supabase from "../config/supabase-js.js";

export async function getAllProperties(_, res) {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, tenant_id(tenant_name)").order('id', { ascending: true });

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

export async function insertAProperty(req, res) {
  try {

    const { data, error } = await supabase.from("properties").insert(req.body).select();

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

export async function updateAProperty(req, res){
  try {

    const { id } = req.params;

    const { data: existing, error: checkError } = await supabase.from("properties").select("id").eq('id', id).single();

    if (!existing) {
      return res.status(400).json({ message: "Tenant doesn't exist!" });
    }

    const { data, error } = await supabase.from("properties").update(req.body).eq('id', id).select();

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

export async function deleteAProperty(req, res) {
  try {
    const { id } = req.params;

    const { data: existing, error: checkError } = await supabase.from("properties").select("id").eq('id', id).single();

    if (!existing) {
      return res.status(400).json({ message: "Tenant doesn't exist!" });
    }

    const { data, error } = await supabase.from("properties").delete().eq('id', id).select();

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