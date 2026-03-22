import { supabase } from '@/integrations/supabase/client';

type FirecrawlResponse = {
  success: boolean;
  error?: string;
  type?: string;
  source?: string;
  region?: string;
  data?: any;
};

export const jobScraper = {
  async scrapeSource(sourceIndex: number = 0): Promise<FirecrawlResponse> {
    const { data, error } = await supabase.functions.invoke('scrape-jobs', {
      body: { sourceIndex },
    });
    if (error) return { success: false, error: error.message };
    return data;
  },

  async searchJobs(query: string): Promise<FirecrawlResponse> {
    const { data, error } = await supabase.functions.invoke('scrape-jobs', {
      body: { query },
    });
    if (error) return { success: false, error: error.message };
    return data;
  },
};
