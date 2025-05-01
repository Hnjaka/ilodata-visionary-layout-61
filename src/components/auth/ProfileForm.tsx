
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
import { LoadingSpinner } from '@/components/LoadingSpinner';

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
  const [profileLoadError, setProfileLoadError] = useState<string | null>(null);
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
        try {
          console.log("Fetching profile for user ID:", user.id);
          const profile = await fetchProfile(user.id) as ProfileType | null;
          console.log("Profile data received:", profile);
          
          form.reset({
            email: user.email || '',
            firstName: profile?.first_name || '',
            lastName: profile?.last_name || '',
          });
          
          // Save role for display
          setUserRole(profile?.role || 'user');
          setProfileLoadError(null);
        } catch (error) {
          console.error("Error loading profile:", error);
          setProfileLoadError("Impossible de charger votre profil. Veuillez réessayer plus tard.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadProfile();
  }, [user, form, fetchProfile]);
  
  const onSubmit = async (data: ProfileFormValues) => {
    if (user) {
      try {
        console.log("Updating profile with data:", data);
        await updateProfile(user.id, {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  // Format role text (capitalize first letter)
  const formatRoleText = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  // Return badge color based on role
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
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (profileLoadError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-4 text-red-500">
            <p>{profileLoadError}</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
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
                    <Input placeholder="Votre prénom" {...field} value={field.value || ''} />
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
                    <Input placeholder="Votre nom" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Display role (read-only) */}
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
