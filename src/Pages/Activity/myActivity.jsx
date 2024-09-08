import React, { useState, useContext, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserContext } from "@/App";
import { useMutation, useQuery } from "@tanstack/react-query";
import { users } from "@/lib/http";
import ApartmentPreviewCard from '../Discover/apartmentPreviewCard';
import RoommatePreviewCard from '../Discover/roommatePreviewCard';

export default function MyActivity() {
  const [activeTab, setActiveTab] = useState("likes");
  const { user } = useContext(UserContext);
  const searchType = user.user.userType === "apartment" ? "roommate" : "apartment";

  const CardComponent = useMemo(() => 
    searchType === "apartment" ? ApartmentPreviewCard : RoommatePreviewCard,
  [searchType]);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["myActivity", activeTab],
    queryFn: users.activity, 
  });

  const actionMutation = useMutation({
    mutationFn: users.action, 
    onSuccess: () => refetch()
  });

  const handleAction = (id, action) => {
    actionMutation.mutate({id, action})
  };

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Tabs defaultValue="likes" onValueChange={setActiveTab} className='lg:container'>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="likes">Likes</TabsTrigger>
        <TabsTrigger value="dislikes">Dislikes</TabsTrigger>
      </TabsList>
      {["likes", "dislikes"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <div className="flex flex-col gap-8">
            {data[activeTab].map((item) => (
              <CardComponent 
                key={item[searchType]._id}
                data={item} 
                myAnswers={user.profile.questionnaire}
                onAction={handleAction}
                vote={tab.slice(0, -1)} 
              />
            ))}
          </div>
          {data[activeTab].length === 0 && <p>No {tab} found</p>}
        </TabsContent>
      ))}
    </Tabs>
  );
}