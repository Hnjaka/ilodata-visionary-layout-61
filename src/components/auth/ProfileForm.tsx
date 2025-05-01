
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useProfileManagement } from '@/hooks/auth/useProfileManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User } from '@supabase/supabase-js';

const profileSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: User;
}

interface ProfileType {
  id: string;
  email: string;
  is_approved: boolean;
  role: string;
  created_at: string;
  updated_at: string;
  first_name?: string | null;
  last_name?: string | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { updateProfile, fetchProfile, loading: updateLoading } = useProfileManagement();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || '',
      firstName: '',
      lastName: '',
    },
  });
  
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const profile = await fetchProfile(user.id) as ProfileType | null;
        
        form.reset({
          email: user.email || '',
          firstName: profile?.first_name || '',
          lastName: profile?.last_name || '',
        });
        
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, [user, form, fetchProfile]);
  
  const onSubmit = async (data: ProfileFormValues) => {
    if (user) {
      await updateProfile(user.id, {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <p>Chargement du profil...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Mettez à jour vos informations de profil.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter>
            <Button type="submit" disabled={updateLoading}>
              {updateLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileForm;
