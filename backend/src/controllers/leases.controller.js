import supabase from "../config/supabase-js.js";

export async function getAllLeases(_, res) {
  try {
    const { data, error } = await supabase.from('leases').select("*, tenant_id(tenant_name), property_id(name)").order('id', { ascending: true});

    if(error){
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json(data);
    
  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function createALease(req, res) {
  try {
    const { data, error } = await supabase.from('leases').insert(req.body).select();

    if(error){
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function uploadALease(req, res) {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const fileName = `Lease_${Date.now()}-${req.file.originalname}`;
    
    const { data, error } = await supabase.storage
      .from("POP")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.error("Upload error:", error);
      return res.status(502).json({ error: error.message });
    }

    return res.status(200).json({  
      fileName: data.path 
    });
    
  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}