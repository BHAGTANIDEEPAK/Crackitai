import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yllkntrkoceuslzbbnzo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsbGtudHJrb2NldXNsemJibnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1NDEzMzgsImV4cCI6MjA0MzExNzMzOH0.sle1ocX6G8DuWhxkUKuJ-Ychw4tX0ewvSpSH43qZ2Uw';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Sign up user
export const signUpUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  const user = data?.user;  // Access the user from data
  return { user, error };
};

// Log in user
export const logInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password }); 
  const user = data?.user;  // Access the user from data
  return { user, error };
};

// Log out user
export const logOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
