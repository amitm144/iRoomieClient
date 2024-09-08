// import React, { useContext, useState } from 'react';
// import { UserContext } from "@/App";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { users } from "@/lib/http";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Switch } from "@/components/ui/switch"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import RoommateProfileForm from "../Register/roommateProfileForm";
// import ApartmentProfileForm from "../Register/apartmentProfileForm";
// import QuestionnaireForm from "../Register/questionnaireForm";

// const SettingsPage = () => {
//   const { user, setUser } = useContext(UserContext);
//   const queryClient = useQueryClient();
//   const [editMode, setEditMode] = useState(null); // null, 'details', or 'questionnaire'
//   const [isSheetOpen, setIsSheetOpen] = useState(false);

//   const FormComponent = user.user.userType === "apartment"
//     ? ApartmentProfileForm
//     : RoommateProfileForm;

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
//       setIsSheetOpen(false);
//     },
//   });

//   const handleEdit = (mode) => {
//     setEditMode(mode);
//     setIsSheetOpen(true);
//   };

//   const handleSubmit = (data) => {
//     mutation.mutate(data);
//   };

//   const renderEditForm = () => {
//     if (editMode === "details") {
//       return <FormComponent initialData={user.profile} onSubmit={handleSubmit} />;
//     } else if (editMode === "questionnaire") {
//       return (
//         <QuestionnaireForm
//           initialData={user.profile.questionnaire}
//           onSubmit={(data) => handleSubmit({ questionnaire: data })}
//         />
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="container mx-auto p-4 space-y-8">
//       <h1 className="text-3xl font-bold mb-6">Settings</h1>

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Profile Settings</CardTitle>
//           <CardDescription>Update your personal information and profile details.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex space-x-4">
//             <Button onClick={() => handleEdit("details")}>Edit My Details</Button>
//             <Button onClick={() => handleEdit("questionnaire")}>Edit Questionnaire</Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         <SheetContent side="right" className="w-full sm:w-[80%] overflow-auto">
//           <SheetHeader>
//             <SheetTitle>
//               {editMode === "details" ? "Edit Profile Details" : "Edit Questionnaire"}
//             </SheetTitle>
//             <SheetDescription>
//               Make changes to your profile here. Click save when you're done.
//             </SheetDescription>
//           </SheetHeader>
//           <div className="py-4">
//             {renderEditForm()}
//           </div>
//         </SheetContent>
//       </Sheet>


//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Privacy Settings</CardTitle>
//           <CardDescription>Control your privacy and security preferences.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="profile-visibility">Profile Visibility</Label>
//             <Select>
//               <SelectTrigger id="profile-visibility">
//                 <SelectValue placeholder="Select visibility" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="public">Public</SelectItem>
//                 <SelectItem value="private">Private</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="contact-info-visibility">Contact Information Visibility</Label>
//             <Select>
//               <SelectTrigger id="contact-info-visibility">
//                 <SelectValue placeholder="Select visibility" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="everyone">Everyone</SelectItem>
//                 <SelectItem value="matches">Matches Only</SelectItem>
//                 <SelectItem value="nobody">Nobody</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label>Blocked Users</Label>
//             <Button variant="outline">Manage Blocked Users</Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>App Settings</CardTitle>
//           <CardDescription>Customize your app experience.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="app-language">App Language</Label>
//             <Select>
//               <SelectTrigger id="app-language">
//                 <SelectValue placeholder="Select language" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="en">English</SelectItem>
//                 <SelectItem value="es">Español</SelectItem>
//                 <SelectItem value="fr">Français</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="theme-mode">Theme Mode</Label>
//             <Select>
//               <SelectTrigger id="theme-mode">
//                 <SelectValue placeholder="Select theme" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="light">Light</SelectItem>
//                 <SelectItem value="dark">Dark</SelectItem>
//                 <SelectItem value="system">System</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label>Text Size</Label>
//             <Slider defaultValue={[50]} max={100} step={1} />
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Help and Support</CardTitle>
//           <CardDescription>Get help and contact support.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Button variant="outline">View FAQ</Button>
//           <Button variant="outline">Contact Support</Button>
//           <Button variant="outline">Report a Problem</Button>
//         </CardContent>
//       </Card>

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>App Information</CardTitle>
//           <CardDescription>View app details and legal information.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label>App Version</Label>
//             <p className="text-sm text-gray-500">v1.0.0</p>
//           </div>
//           <div className="space-y-2">
//             <Button variant="link" className="p-0">Terms of Service</Button>
//           </div>
//           <div className="space-y-2">
//             <Button variant="link" className="p-0">Privacy Policy</Button>
//           </div>
//           <div className="pt-4">
//             <Button variant="destructive">Delete Account</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SettingsPage;


import React, { useContext, useState } from 'react';
import { UserContext } from "@/App";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { users } from "@/lib/http";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Lock, Bell, Palette, HelpCircle, Info, Trash2, ChevronRight } from 'lucide-react'
import RoommateProfileForm from "../Register/roommateProfileForm";
import ApartmentProfileForm from "../Register/apartmentProfileForm";
import QuestionnaireForm from "../Register/questionnaireForm";

const SettingsPage = () => {
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const FormComponent = user.user.userType === "apartment" ? ApartmentProfileForm : RoommateProfileForm;

  const mutation = useMutation({
    mutationFn: users.update,
    onSuccess: (data) => {
      setUser((prevUser) => ({
        ...prevUser,
        profile: { ...prevUser.profile, ...data },
      }));
      queryClient.invalidateQueries(["user", user.id]);
      setEditMode(null);
      setIsSheetOpen(false);
    },
  });

  const handleEdit = (mode) => {
    setEditMode(mode);
    setIsSheetOpen(true);
  };

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  const renderEditForm = () => {
    if (editMode === "details") {
      return <FormComponent initialData={user.profile} onSubmit={handleSubmit} />;
    } else if (editMode === "questionnaire") {
      return (
        <QuestionnaireForm
          initialData={user.profile.questionnaire}
          onSubmit={(data) => handleSubmit({ questionnaire: data })}
        />
      );
    }
    return null;
  };

  return (
    <div >
      <div className="container mx-auto p-6 space-y-8 ">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><User className="mr-2" /> Profile Settings</CardTitle>
            <CardDescription>Manage your profile information and questionnaire</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Profile Details</h3>
                <p className="text-sm text-muted-foreground">Update your personal information</p>
              </div>
              <Button onClick={() => handleEdit("details")} variant="outline">
                Edit <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Questionnaire</h3>
                <p className="text-sm text-muted-foreground">Update your preferences and matching criteria</p>
              </div>
              <Button onClick={() => handleEdit("questionnaire")} variant="outline">
                Edit <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Lock className="mr-2" /> Privacy Settings</CardTitle>
            <CardDescription>Control your privacy and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <Select>
                <SelectTrigger id="profile-visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-info-visibility">Contact Information Visibility</Label>
              <Select>
                <SelectTrigger id="contact-info-visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="matches">Matches Only</SelectItem>
                  <SelectItem value="nobody">Nobody</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full">Manage Blocked Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2" /> Notification Preferences</CardTitle>
            <CardDescription>Customize how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-semibold">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch id="email-notifications" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications" className="font-semibold">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates on your device</p>
              </div>
              <Switch id="push-notifications" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="font-semibold">Notification Types</Label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="new-matches" />
                  <Label htmlFor="new-matches" className="ml-2">New Matches</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="messages" />
                  <Label htmlFor="messages" className="ml-2">Messages</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Palette className="mr-2" /> App Settings</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme-mode">Theme Mode</Label>
              <Select>
                <SelectTrigger id="theme-mode">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Text Size</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><HelpCircle className="mr-2" /> Help and Support</CardTitle>
            <CardDescription>Get help and contact support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">View FAQ</Button>
            <Button variant="outline" className="w-full">Contact Support</Button>
            <Button variant="outline" className="w-full">Report a Problem</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Info className="mr-2" /> App Information</CardTitle>
            <CardDescription>View app details and legal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>App Version</Label>
              <p className="text-sm text-muted-foreground">v1.0.0</p>
            </div>
            <Button variant="link" className="px-0">Terms of Service</Button>
            <Button variant="link" className="px-0">Privacy Policy</Button>
            <Separator />
            <div className="pt-4">
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-[80%] overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {editMode === "details" ? "Edit Profile Details" : "Edit Questionnaire"}
            </SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] mt-8 pr-4">
            {renderEditForm()}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SettingsPage;