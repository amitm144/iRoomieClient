// import { useContext, useMemo, useState } from "react";
// import { UserContext } from "@/App";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { users } from "@/lib/http";
// import RoommateProfileForm from "../Register/roommateProfileForm";
// import RoommateProfileDisplay from "../Profile/roommateProfile";
// import QuestionnaireForm from "../Register/questionnaireForm";
// import ApartmentProfileForm from "../Register/apartmentProfileForm";
// import ApartmentProfileDisplay from "../Profile/apartmentProfile";
// import { cn } from "@/lib/utils";

// export default function MyProfile() {
//   const { user, setUser } = useContext(UserContext);
//   const queryClient = useQueryClient();
//   const userType = user.user.userType;

//   const FormComponent = useMemo(
//     () =>
//       user.user.userType === "apartment"
//         ? ApartmentProfileForm
//         : RoommateProfileForm,
//     []
//   );
//   const DisplayComponent = useMemo(
//     () =>
//       user.user.userType === "apartment"
//         ? ApartmentProfileDisplay
//         : RoommateProfileDisplay,
//     []
//   );

//   const [editMode, setEditMode] = useState(null); // null, 'details', or 'questionnaire'

//   const mutation = useMutation({
//     mutationFn: users.update,
//     onSuccess: (data) => {
//       setUser((prevUser) => ({
//         ...prevUser,
//         profile: {
//           ...prevUser.profile,
//           ...data,
//         },
//       }));
//       queryClient.invalidateQueries(["user", user.id]);
//       setEditMode(null);
//     },
//   });

//   const handleEdit = (mode) => {
//     setEditMode(mode === editMode ? null : mode);
//   };

//   const handleSubmit = (data) => {
//     mutation.mutate(data);
//   };

//   const renderHeader = () => (
//     <div
//       className={cn(
//         "grid grid-cols-2 container gap-4",
//         userType === "apartment"
//           ? ""
//           : "absolute top-4 left-1/2 transform -translate-x-1/2 "
//       )}
//     >
//       <button
//         className={cn(
//           `flex w-full text-[0.8rem] items-center justify-center p-2 gap-2 rounded-lg border border-dashed font-semibold tracking-widest`,
//           userType === "apartment"
//             ? "bg-transparent text-gray-700 border-gray-700"
//             : "text-white bg-transparent hover:bg-white/55 hover:text-gray-700"
//         )}
//         onClick={() => handleEdit("details")}
//       >
//         <span>{"Edit My Details"}</span>
//       </button>
//       <button
//         className={cn(
//           `flex w-full text-[0.8rem] items-center justify-center p-2 gap-2 rounded-lg border border-dashed font-semibold tracking-widest`,
//           userType === "apartment"
//             ? "bg-transparent text-gray-700 border-gray-700"
//             : "text-white bg-transparent hover:bg-white/55 hover:text-gray-700"
//         )}
//         onClick={() => handleEdit("questionnaire")}
//       >
//         <span>{"Edit Questionnaire"}</span>
//       </button>
//     </div>
//   );

//   if (mutation.isPending) return <p>Saving changes...</p>;
//   if (mutation.isError) return <p>Error: {mutation.error.message}</p>;

//   return (
//     <>
//       {editMode === "questionnaire" ? (
//         <QuestionnaireForm
//           initialData={user.profile.questionnaire}
//           onSubmit={(data) => handleSubmit({ questionnaire: data })}
//         />
//       ) : editMode === "details" ? (
//         <FormComponent initialData={user.profile} onSubmit={handleSubmit} />
//       ) : (
//         <DisplayComponent
//           profile={user.profile}
//           editHeader={renderHeader}
//           myAnswers={user.profile.questionnaire}
//           myProfile={true}
//         />
//       )}
//     </>
//   );
// }

import { useContext } from "react";
import { UserContext } from "@/App";
import RoommateProfileDisplay from "../Profile/roommateProfile";
import ApartmentProfileDisplay from "../Profile/apartmentProfile";

export default function MyProfile() {
  const { user } = useContext(UserContext);
  const userType = user.user.userType;

  const DisplayComponent = userType === "apartment"
    ? ApartmentProfileDisplay
    : RoommateProfileDisplay;

  return (
    <DisplayComponent
      profile={user.profile}
      myAnswers={user.profile.questionnaire}
      myProfile={true}
    />
  );
}