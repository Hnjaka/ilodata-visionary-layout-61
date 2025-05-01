
import { useState } from 'react';
import { useUsersFetch } from './useUsersFetch';
import { useUserApproval } from './useUserApproval';
import { useUserDeletion } from './useUserDeletion';
import { useUserRoleUpdate } from './useUserRoleUpdate';
import { useUserProfileUpdate } from './useUserProfileUpdate';
import { UserData } from './types';

export const useUsersAdmin = () => {
  const [combinedLoading, setCombinedLoading] = useState(false);
  
  const { fetchUsers, loading: fetchLoading, setLoading: setFetchLoading } = useUsersFetch();
  const { approveUser, loading: approveLoading, setLoading: setApproveLoading } = useUserApproval();
  const { deleteUser, loading: deleteLoading, setLoading: setDeleteLoading } = useUserDeletion();
  const { updateUserRole, loading: roleLoading, setLoading: setRoleLoading } = useUserRoleUpdate();
  const { updateUserProfile, loading: profileLoading, setLoading: setProfileLoading } = useUserProfileUpdate();

  // Set combined loading state based on any operation being in progress
  const updateCombinedLoading = () => {
    const isLoading = fetchLoading || approveLoading || deleteLoading || roleLoading || profileLoading;
    setCombinedLoading(isLoading);
  };

  // Override individual setLoading functions to also update combined loading
  const wrapSetLoading = (originalSetLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (value: boolean) => {
      originalSetLoading(value);
      setTimeout(updateCombinedLoading, 0);
    };
  };

  // Apply wrapped setLoading functions
  setFetchLoading = wrapSetLoading(setFetchLoading);
  setApproveLoading = wrapSetLoading(setApproveLoading);
  setDeleteLoading = wrapSetLoading(setDeleteLoading);
  setRoleLoading = wrapSetLoading(setRoleLoading);
  setProfileLoading = wrapSetLoading(setProfileLoading);

  return {
    fetchUsers,
    approveUser,
    deleteUser,
    updateUserRole,
    updateUserProfile,
    loading: combinedLoading
  };
};

// For backward compatibility, also export the types
export type { UserData };
