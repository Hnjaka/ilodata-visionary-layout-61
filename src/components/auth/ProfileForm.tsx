
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useProfileManagement } from '@/hooks/auth/useProfileManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  const [userRole, setUserRole] = useState<string>('');
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
        
        // Sauvegarde du rôle pour l'affichage
        setUserRole(profile?.role || 'user');
        
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

  // Fonction pour formater le texte du rôle (première lettre en majuscule)
  const formatRoleText = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  // Fonction qui retourne la couleur du badge en fonction du rôle
  const getRoleBadgeColor = (role: string) => {
    const roleLower = role.toLowerCase();
    switch (roleLower) {
      case 'admin':
        return "bg-red-500";
      case 'moderator':
        return "bg-blue-500";
      default:
        return "bg-gray-500";
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
            
            {/* Affichage du rôle en lecture seule */}
            <div className="pt-2">
              <FormLabel>Rôle</FormLabel>
              <div className="flex items-center h-10 mt-1">
                <Badge className={getRoleBadgeColor(userRole)}>
                  {formatRoleText(userRole)}
                </Badge>
              </div>
            </div>
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
