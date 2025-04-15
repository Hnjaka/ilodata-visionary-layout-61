
import { supabase } from '@/integrations/supabase/client';

// Upload a file to the specified bucket
export const uploadFile = async (file: File, bucket: string): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  
  try {
    // Check if bucket exists and create it if not
    const { data: buckets } = await supabase.storage.listBuckets();
    
    if (!buckets?.some(b => b.name === bucket)) {
      console.log(`Creating bucket: ${bucket}`);
      await supabase.storage.createBucket(bucket, {
        public: true
      });
    }
    
    // Upload the file
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }
    
    return fileName;
  } catch (error) {
    console.error(`Error uploading file to ${bucket}:`, error);
    throw error;
  }
};
