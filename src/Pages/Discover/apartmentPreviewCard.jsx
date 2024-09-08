import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  DollarSign,
  Users,
  Home,
  Bath,
  Calendar,
  Snowflake,
  Car,
  Mountain,
  Sofa,
  ArrowUpDown,
  PawPrint,
  Cigarette,
  Map,
  Image,
} from "lucide-react";
import MapContent from "@/components/Coustom/MapContent";
import { format } from "date-fns";
import Modal from "@/components/Coustom/modal";
import ApartmentProfileDisplay from "../Profile/apartmentProfile";
import { Marker, Popup } from "react-leaflet";
import { Separator } from "@/components/ui/separator";

const ApartmentPreviewCard = ({ data, myAnswers, vote, onAction }) => {
  const { apartment, score } = data;
  const [showMap, setShowMap] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { info, details } = apartment;

  const handleCardClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const toggleMap = (e) => {
    e.stopPropagation();
    setShowMap(!showMap);
  };

  const amenityIcons = {
    AC: <Snowflake className="w-4 h-4" />,
    Parking: <Car className="w-4 h-4" />,
    Balcony: <Mountain className="w-4 h-4" />,
    Furnished: <Sofa className="w-4 h-4" />,
    Elevator: <ArrowUpDown className="w-4 h-4" />,
    "Pet Friendly": <PawPrint className="w-4 h-4" />,
    "Smoking Allowed": <Cigarette className="w-4 h-4" />,
  };

  return (
    <>
      <Card className="w-full hover:shadow-lg transition-all duration-300 overflow-hidden group rounded-3xl">
        <div className="flex flex-col md:flex-row h-full">
          <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
            {showMap ? (
              <div className="absolute inset-0 ">
                <MapContent
                  center={info.location.coordinates}
                  zoom={15}
                  zoomControl={false}
                  attributionControl={false}
                >
                  <Marker position={info.location.coordinates}>
                    <Popup>{info.overview.title}</Popup>
                  </Marker>
                </MapContent>
              </div>
            ) : (
              <img
                src={info.images[0]}
                alt={info.overview.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors duration-200"
              onClick={toggleMap}
              aria-label={showMap ? "Show image" : "Show map"}
            >
              {showMap ? (
                <Image className="w-4 h-4" />
              ) : (
                <Map className="w-4 h-4" />
              )}
            </Button>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
              <h3 className="text-white text-lg font-semibold truncate mb-2">
                {info.roommates.length} roommate
                {info.roommates.length !== 1 ? "s" : ""}
              </h3>
              <div className="flex items-center text-sm text-white">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {info.location.address.street}, {info.location.address.city}
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={handleCardClick}
            className="flex flex-col p-4 md:p-8 cursor-pointer w-full md:w-3/5 gap-4 md:gap-8 relative"
          >
            <div className="grid grid-cols-2">
              <div className="flex items-center text-xs md:text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Available from{" "}
                  {format(
                    new Date(info.leaseTerms.availableFrom),
                    "MMM d, yyyy"
                  )}
                </span>
              </div>
              <div className="flex items-baseline bg-blue-600 absolute top-0 right-0 p-2 md:p-4 rounded-es-3xl">
                <span className="text-xl md:text-2xl font-bold text-white">
                  ₪{info.financials.rent.toLocaleString()}
                </span>
                <span className="text-xs md:text-sm font-normal text-gray-100 ml-1">
                  /mo
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 md:gap-2 text-sm">
              <div className="flex items-center p-2 md:p-4 bg-gray-50/60 rounded-lg">
                <Home className="w-5 h-5 mr-2 md:mr-4 text-blue-500" />
                <span>{info.specifications.size} sqm</span>
              </div>
              <div className="flex items-center p-2 md:p-4 bg-gray-50/60 rounded-lg">
                <Users className="w-5 h-5 mr-2 md:mr-4 text-blue-500" />
                <span>{info.specifications.bedrooms} bed</span>
              </div>
              <div className="flex items-center p-2 md:p-4 bg-gray-50/60 rounded-lg">
                <Bath className="w-5 h-5 mr-2 md:mr-4 text-blue-500" />
                <span>{info.specifications.bathrooms} bath</span>
              </div>
              <div className="flex items-center p-2 md:p-4 bg-gray-50/60 rounded-lg">
                <DollarSign className="w-5 h-5 mr-2 md:mr-4 text-blue-500" />
                <span>Floor {info.specifications.floorNumber}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 md:gap-2">
              {Object.entries(details).map(([key, value]) => (
                <Badge
                  key={key}
                  variant={value ? "default" : "secondary"}
                  className={`text-xs ${
                    value
                      ? "bg-blue-50 text-blue-900"
                      : "bg-gray-50 text-red-900 line-through"
                  } px-1 md:px-2 py-0.5 md:py-1 flex items-center`}
                >
                  {amenityIcons[key]}
                  <span className="ml-1">{key}</span>
                </Badge>
              ))}
            </div>

            <div className="text-xs md:text-sm text-gray-500 w-full flex items-center justify-between">
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
        dataId={apartment._id}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        vote={vote}
        onAction={onAction}
      >
        <ApartmentProfileDisplay
          profile={apartment}
          myAnswers={myAnswers}
          score={score}
        />
      </Modal>
    </>
  );
};

export default ApartmentPreviewCard;
