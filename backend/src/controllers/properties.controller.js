import supabase from "../config/supabase-js.js";

export async function getAllProperties(_, res) {
  try {
    const {data, error} = await supabase
      .from("properties")
      .select("*, tenant_id(tenant_name)");

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