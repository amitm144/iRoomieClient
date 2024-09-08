import { useContext, useState, useMemo } from "react";
import { UserContext } from "@/App";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { users } from "@/lib/http";
import ApartmentPreviewCard from "./apartmentPreviewCard";
import RoommatePreviewCard from "./roommatePreviewCard";
import SortDropDown from "@/components/Coustom/rdDrop";

export default function CardsList() {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [sortConfig, setSortConfig] = useState({ option: "score", order: "desc" });  
  const myAnswers = user.profile.questionnaire;
  const searchType = user.user.userType === "apartment" ? "roommate" : "apartment";
  const CardComponent = searchType === "apartment" ? ApartmentPreviewCard : RoommatePreviewCard;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["suggestions"],
    queryFn: users.suggestions,
  });

  const actionMutation = useMutation({
    mutationFn: users.action, 
    onSuccess: (responseData, variables) => {
      queryClient.setQueryData(['suggestions'], (oldData) => {
        if (oldData) {
          return oldData.filter(item => item.apartment._id !== responseData.removedId);
        }
        return oldData;
      });
    }
  });

  const handleAction = (id, action) => {
    actionMutation.mutate({id, action});
  };

  const sortedData = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      const aValue = a.sortOption[sortConfig.option];
      const bValue = b.sortOption[sortConfig.option];

      let comparison;
      if (sortConfig.option === 'date') {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();
        comparison = aDate - bDate;
      } else {
        comparison = aValue - bValue;
      }

      return sortConfig.order === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleSortChange = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return null;
  if (data.length === 0) return <p>No suggestions found</p>;

  return (
    <>
      <div className="w-full flex justify-end lg:container">
        <SortDropDown onSortChange={handleSortChange} searchType={searchType} />
      </div>
      <main className="flex flex-col gap-8 lg:container">
        {sortedData.map((item, index) => (
          <CardComponent key={item.apartment._id} data={item} myAnswers={myAnswers} onAction={handleAction} />
        ))}
      </main>
    </>
  );
}