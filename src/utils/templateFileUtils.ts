import { supabase } from '@/integrations/supabase/client';

export const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
  
  try {
    // Upload the file
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });

    if (uploadError) {
      console.error(`Error uploading file to ${bucket}:`, uploadError);
      throw uploadError;
    }
    
    return fileName;
  } catch (error) {
    console.error(`Unexpected error uploading file to ${bucket}:`, error);
    return null;
  }
};

export const getPublicFileUrl = (bucket: string, fileName: string | null): string | null => {
  if (!fileName) return null;
  
  // Handle files that already have complete URLs
  if (fileName.startsWith('http')) {
    return fileName;
  }
  
  // Handle demo files
  if (fileName.startsWith('demo-')) {
    return `/downloads/${fileName}`;
  }
  
  // Otherwise, construct the Supabase storage URL
  return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/${bucket}/${fileName}`;
};
