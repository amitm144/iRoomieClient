import React, { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Music,
  Film,
  Gamepad2,
  Instagram,
  Facebook,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SeparatorWithLabel from "@/components/Coustom/separatorWithLabel";
import InputWithLabel from "@/components/Coustom/inputWithLabel";
import SelectWithLabel from "@/components/Coustom/selectWithLabel";
import ComboboxWithLabel from "@/components/Coustom/comboboxWithLabel";
import LocationCombobox from "@/components/Coustom/locationCombobox";
import CategorizedBadgeSelect from "@/components/Coustom/bageCombobox";
import TextareaWithLabel from "@/components/Coustom/textareaWithLabel";
import ProfilePictureUpload from "@/components/Coustom/ProfilePictureUpload";
import {
  hobbiesList,
  occupationList,
  educationList,
  musicGenresList,
  movieGenresList,
  sportsList,
} from "@/lib/RegisterRoommate";

const RoommateProfileForm = ({ onSubmit , initialData = {} }) => {  
  const [profile, setProfile] = useState({
    personalInfo: {
      name: initialData.personalInfo?.name || "",
      age: initialData.personalInfo?.age || "",
      gender: initialData.personalInfo?.gender || "",
      occupation: initialData.personalInfo?.occupation || "",
      education: initialData.personalInfo?.education || "",
      hometown: initialData.personalInfo?.hometown || "",
    },
    interests: {
      hobbies: initialData.interests?.hobbies || [],
      music: initialData.interests?.music || [],
      movies: initialData.interests?.movies || [],
      sports: initialData.interests?.sports || [],
    },
    social: {
      bio: initialData.social?.bio || "",
      profileImage: initialData.social?.profileImage || "",
      socialMedia: {
        facebook: initialData.social?.socialMedia?.facebook || "",
        instagram: initialData.social?.socialMedia?.instagram || "",
      },
    },
  });

  const handleInputChange = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNestedInputChange = (section, nestedField, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...prev[section][nestedField],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-sans flex flex-col gap-6 sm:gap-8"
    >
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <ProfilePictureUpload
            currentImage={profile.social.profileImage}
            onChange={(file) =>
              handleInputChange("social", "profileImage", file)
            }
          />
        </div>
      </div>

      <div className="p-2">
        <div className="grid lg:grid-cols-4 grid-cols-2  mt-4 gap-2 items-center">
          <InputWithLabel
            type="text"
            id="name"
            label="Name"
            icon={<User />}
            value={profile.personalInfo.name}
            onChange={(e) =>
              handleInputChange("personalInfo", "name", e.target.value)
            }
          />
          <LocationCombobox
            label="Hometown"
            placeholder="Enter a location"
            onChange={(location) =>
              handleInputChange("personalInfo", "hometown", location.address)
            }
          />

          <InputWithLabel
            icon={<Facebook />}
            type="text"
            id="facebook"
            label="Facebook"
            value={profile.social.socialMedia.facebook}
            onChange={(e) =>
              handleNestedInputChange(
                "social",
                "socialMedia",
                "facebook",
                e.target.value
              )
            }
          />
          <InputWithLabel
            icon={<Instagram />}
            type="text"
            id="instagram"
            label="Instagram"
            value={profile.social.socialMedia.instagram}
            onChange={(e) =>
              handleNestedInputChange(
                "social",
                "socialMedia",
                "instagram",
                e.target.value
              )
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 p-4">
          <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
            <SeparatorWithLabel label="Personal Information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputWithLabel
                icon={<User />}
                type="number"
                id="age"
                label="Age"
                value={profile.personalInfo.age}
                onChange={(e) =>
                  handleInputChange("personalInfo", "age", e.target.value)
                }
              />
              <SelectWithLabel
                icon={<User />}
                value={profile.personalInfo.gender}
                label="Gender"
                options={["Male", "Female", "Other"]}
                onChange={(e) => handleInputChange("personalInfo", "gender", e)}
              />
              <ComboboxWithLabel
                icon={<Briefcase />}
                id="occupation"
                label="Occupation"
                options={occupationList}
                value={profile.personalInfo.occupation}
                onChange={(newValue) =>
                  handleInputChange("personalInfo", "occupation", newValue)
                }
              />
              <ComboboxWithLabel
                icon={<GraduationCap />}
                id="education"
                label="Education"
                options={educationList}
                value={profile.personalInfo.education}
                onChange={(newValue) =>
                  handleInputChange("personalInfo", "education", newValue)
                }
              />
            </div>

            <SeparatorWithLabel label="About Me" />
            <TextareaWithLabel
              id="bio"
              label="Bio"
              value={profile.social.bio}
              onChange={(e) =>
                handleInputChange("social", "bio", e.target.value)
              }
            />

            <SeparatorWithLabel label="Interests" />
            <Accordion
              type="multiple"
              defaultValue={["hobbies", "music", "movies", "sports"]}
              className="w-full"
            >
              <AccordionItem value="hobbies">
                <AccordionTrigger>Hobbies</AccordionTrigger>
                <AccordionContent>
                  <CategorizedBadgeSelect
                  initialSelected={profile.interests.hobbies}
                    icon={<Gamepad2 />}
                    id="hobby-selector"
                    label="Hobbies"
                    options={hobbiesList}
                    placeholder="Select your hobbies..."
                    onChange={(newSelection) =>
                      handleInputChange("interests", "hobbies", newSelection)
                    }
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="music">
                <AccordionTrigger>Music</AccordionTrigger>
                <AccordionContent>
                  <CategorizedBadgeSelect
                  initialSelected={profile.interests.music}
                    icon={<Music />}
                    id="music-genre-selector"
                    label="Music Genres"
                    options={musicGenresList}
                    placeholder="Select music genres..."
                    onChange={(newSelection) =>
                      handleInputChange("interests", "music", newSelection)
                    }
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="movies">
                <AccordionTrigger>Movies</AccordionTrigger>
                <AccordionContent>
                  <CategorizedBadgeSelect
                  initialSelected={profile.interests.movies}
                    icon={<Film />}
                    id="movie-genre-selector"
                    label="Movie Genres"
                    options={movieGenresList}
                    placeholder="Select movie genres..."
                    onChange={(newSelection) =>
                      handleInputChange("interests", "movies", newSelection)
                    }
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sports">
                <AccordionTrigger>Sports</AccordionTrigger>
                <AccordionContent>
                  <CategorizedBadgeSelect
                  initialSelected={profile.interests.sports}
                    icon={<Gamepad2 />}
                    id="sports-selector"
                    label="Sports"
                    options={sportsList}
                    placeholder="Select sports..."
                    onChange={(newSelection) =>
                      handleInputChange("interests", "sports", newSelection)
                    }
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="lg:col-span-1 ">
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold p-3">Preview</h3>
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {profile.personalInfo.name || "Your Name"}
                </h2>
                <div className="mb-4">
                  <p>
                    <strong>Age:</strong> {profile.personalInfo.age || "N/A"}
                  </p>
                  <p>
                    <strong>Gender:</strong>{" "}
                    {profile.personalInfo.gender || "N/A"}
                  </p>
                  <p>
                    <strong>Occupation:</strong>{" "}
                    {profile.personalInfo.occupation || "N/A"}
                  </p>
                  <p>
                    <strong>Education:</strong>{" "}
                    {profile.personalInfo.education || "N/A"}
                  </p>
                  <p>
                    <strong>Hometown:</strong>{" "}
                    {profile.personalInfo.hometown || "N/A"}
                  </p>
                </div>
                <Separator />
                <div className="my-4">
                  <h3 className="font-semibold mb-2">About Me</h3>
                  <p>{profile.social.bio || "No bio provided yet."}</p>
                </div>
                <Separator />
                <div className="my-4">
                  <h3 className="font-semibold mb-2">Interests</h3>
                  {Object.entries(profile.interests).map(
                    ([category, items]) => (
                      <div key={category} className="mb-2">
                        <h4 className="font-medium capitalize">{category}</h4>
                        <div className="flex flex-wrap gap-1">
                          {items.map((item, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-blue-50 text-blue-900"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default RoommateProfileForm;
