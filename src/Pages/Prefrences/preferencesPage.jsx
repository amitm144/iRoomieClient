import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader, Check } from "lucide-react";
import RoommatePreferences from "./roommatePreferences";
import ApartmentPreferences from "./apartmentPreferences";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { users, auth } from "@/lib/http";
import { initialPreferences } from "@/lib/preferencesUtils";

export default function PreferencesPage() {
  const { user, setUser } = useContext(UserContext);
  const userType = user.user.userType;
  const queryClient = useQueryClient();

  const { data: userData, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: auth.currentUser,
    initialData: user,
  });

  const [preferences, setPreferences] = useState({
    ...initialPreferences[userType],
    ...user.profile.preferences,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (userData) {
      setPreferences({
        ...initialPreferences[userType],
        ...userData.profile.preferences,
      });
    }
  }, [userData, userType]);

  const mutation = useMutation({
    mutationFn: users.preferences,
    onSuccess: (data) => {
      setUser((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          preferences: data[userType].preferences,
        },
      }));
      queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      console.error("Preferences update error:", error);
    },
  });

  const handleSave = async () => {
    let preferencesToSave = Object.entries(preferences);

    if (userType === "roommate") {
      preferencesToSave=  preferences;
    } else {
      preferencesToSave
        .filter(([key, pref]) => pref.length > 0)
        .reduce((acc, [key, pref]) => {
          acc[key] = pref;
          return acc;
        }, {});
    }
    mutation.mutate(preferencesToSave);
  };

  const handleReset = () => {
    setPreferences(initialPreferences[userType]);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  const PreferencesComponent =
    userType === "roommate" ? RoommatePreferences : ApartmentPreferences;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Preferences</h1>
        <Button variant="outline" onClick={handleReset}>
          Reset All
        </Button>
      </div>
      <p className="text-gray-600 my-4">
        Set your preferences to help us find the perfect{" "}
        {userType === "roommate" ? "apartment" : "roommate"} for you.
      </p>
      <Separator className="my-6" />
      <PreferencesComponent
        preferences={preferences}
        setPreferences={setPreferences}
      />
      <div className="mt-8 flex items-center justify-center">
        <Button
          onClick={handleSave}
          disabled={mutation.isPending || mutation.isSuccess}
        >
          {mutation.isPending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : mutation.isSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
      {mutation.isSuccess && (
        <p className="mt-4 text-center text-green-600">
          Your preferences have been saved successfully!
        </p>
      )}
    </div>
  );
}

