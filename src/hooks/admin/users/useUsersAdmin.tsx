
import { useState, useEffect } from 'react';
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

  // Update combined loading state whenever any individual loading state changes
  useEffect(() => {
    const isLoading = approveLoading || deleteLoading || roleLoading || profileLoading;
    setCombinedLoading(isLoading);
  }, [fetchLoading, approveLoading, deleteLoading, roleLoading, profileLoading]);

  // Wrap the original functions to also update their loading state
  const wrappedFetchUsers = async () => {
    try {
      const result = await fetchUsers();
      return result;
    } finally {
      // We intentionally don't set fetchLoading here to avoid UI flicker during refreshes
    }
  };

  const wrappedApproveUser = async (userId: string) => {
    setApproveLoading(true);
    try {
      return await approveUser(userId);
    } finally {
      setApproveLoading(false);
    }
  };

  const wrappedDeleteUser = async (userId: string) => {
    setDeleteLoading(true);
    try {
      return await deleteUser(userId);
    } finally {
      setDeleteLoading(false);
    }
  };

  const wrappedUpdateUserRole = async (userId: string, role: string) => {
    setRoleLoading(true);
    try {
      return await updateUserRole(userId, role);
    } finally {
      setRoleLoading(false);
    }
  };

  const wrappedUpdateUserProfile = async (userId: string, data: { first_name?: string; last_name?: string; email?: string }) => {
    setProfileLoading(true);
    try {
      return await updateUserProfile(userId, data);
    } finally {
      setProfileLoading(false);
    }
  };

  return {
    fetchUsers: wrappedFetchUsers,
    approveUser: wrappedApproveUser,
    deleteUser: wrappedDeleteUser,
    updateUserRole: wrappedUpdateUserRole,
    updateUserProfile: wrappedUpdateUserProfile,
    loading: combinedLoading
  };
};

// For backward compatibility, also export the types
export type { UserData };
