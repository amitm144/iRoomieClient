import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  Calendar,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RoommateProfileDisplay from "../Profile/roommateProfile";
import Modal from "@/components/Coustom/modal";
import { useState } from "react";

const RoommatePreviewCard = ({ data, myAnswers, vote, onAction }) => {
  const { roommate, score } = data;
  const { personalInfo, social, interests } = roommate;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const allInterests = [
    ...interests.hobbies,
    ...interests.sports,
    ...interests.music,
    ...interests.movies,
  ];

  return (
    <>
      <Card className="w-full hover:shadow-lg transition-all duration-300 overflow-hidden group rounded-3xl">
        <div className="flex flex-col md:flex-row h-full">
          <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500">
              <img
                src={social.profileImage}
                alt={personalInfo.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
              <h3 className="text-white text-lg font-semibold truncate mb-2">
                {personalInfo.name}
              </h3>
              <div className="flex items-center text-sm text-white">
                <User className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>
                  {personalInfo.age} years • {personalInfo.gender}
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col p-4 md:p-8 w-full md:w-3/5 gap-4 md:gap-8 relative"
            onClick={handleCardClick}
          >
            <div className="grid grid-cols-2">
              <div className="flex items-center text-xs md:text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Joined 3 months ago</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 md:gap-2 text-sm">
              <div className="flex items-center p-2 md:p-4 bg-gray-50/60 rounded-lg">
                <MapPin className="w-5 h-5 mr-2 md:mr-4 text-blue-500" />
                <span>{personalInfo.hometown}</span>
              </div>
              <div className="flex items-center p-2 md:p-4 bg-gray-50/60 rounded-lg">
                <Briefcase className="w-5 h-5 mr-2 md:mr-4 text-blue-500" />
                <span>{personalInfo.occupation}</span>
              </div>
              <div className="flex items-center p-2 md:p-4 bg-gray-50/60 rounded-lg">
                <GraduationCap className="w-5 h-5 mr-2 md:mr-4 text-blue-500" />
                <span>{personalInfo.education}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 line-clamp-2 mb-4">
              {social.bio}
            </p>

            <div className="flex flex-wrap gap-1 md:gap-2">
              {allInterests.slice(0, 4).map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-blue-50 text-blue-900 px-2 py-1 flex items-center"
                >
                  {interest}
                </Badge>
              ))}
              {allInterests.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-1 flex items-center"
                >
                  +{allInterests.length - 4} more
                </Badge>
              )}
            </div>

            <div className="text-xs md:text-sm text-gray-500 w-full flex items-center justify-between mt-auto">
              <Separator className="w-2/5" />
              <div className="w-10 bg-blue-50 h-10 flex font-semibold text-md text-blue-900 items-center justify-center rounded-full mx-1">
                {score}%
              </div>
              <Separator className="w-2/5" />
            </div>
          </div>
        </div>
      </Card>
      <Modal
        dataId={roommate._id}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        vote={vote}
        onAction={onAction}
      >
        <RoommateProfileDisplay
          profile={roommate}
          myAnswers={myAnswers}
          score={score}
        />
      </Modal>
    </>
  );
};

export default RoommatePreviewCard;
