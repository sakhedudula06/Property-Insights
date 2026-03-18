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
    console.error("Unexpected failure:", err);
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
    console.error("Unexpected failure:", err);
    return res.status(500).json({ error: "Server error" });
  }
}


