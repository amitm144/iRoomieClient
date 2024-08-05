import React, { useState } from "react";
import SeparatorWithLabel from "@/components/Coustom/separatorWithLabel";
import InputWithLabel from "@/components/Coustom/inputWithLabel";
import SelectWithLabel from "@/components/Coustom/selectWithLabel";
import CategorizedBadgeSelect from "@/components/Coustom/bageCombobox";
import TextareaWithLabel from "@/components/Coustom/textareaWithLabel";
import {
  nearbyPlacesList,
  generalAmenitiesList,
  kitchenAmenitiesList,
  bathroomAmenitiesList,
  bedroomAmenitiesList,
  outdoorAmenitiesList,
  entertainmentAmenitiesList,
  safetyAmenitiesList,
} from "@/lib/registerApartment";
import {
  Home,
  Users,
  DollarSign,
  Calendar,
  Coffee,
  Bath,
  Bed,
  TreePine,
  Tv,
  ShieldCheck,
  ScrollText,
  Cigarette,
  Sofa,
  SunSnow,
  SquareParking,
  Leaf,
  Building2,
  Dog,
} from "lucide-react";
import LocationCombobox from "@/components/Coustom/locationCombobox";
import ImageUploadGrid from "@/components/Coustom/ImageUploadGrid";
import RadioCombobox from "@/components/Coustom/radioCbx";
const detailOptions = [
  { field: "AC", label: "AC", icon: <SunSnow className="h-10 w-10" /> },
  {
    field: "Parking",
    label: "Parking",
    icon: <SquareParking className="h-10 w-10" />,
  },
  { field: "Balcony", label: "Balcony", icon: <Leaf className="h-10 w-10" /> },
  {
    field: "Furnished",
    label: "Furnished",
    icon: <Sofa className="h-10 w-10" />,
  },
  {
    field: "Elevator",
    label: "Elevator",
    icon: <Building2 className="h-10 w-10" />,
  },
  {
    field: "Pet Friendly",
    label: "Pet Friendly",
    icon: <Dog className="h-10 w-10" />,
  },
  {
    field: "Smoking Allowed",
    label: "Smoking Allowed",
    icon: <Cigarette className="h-10 w-10" />,
  },
];

const ApartmentProfileForm = ({ onSubmit }) => {
  const [profile, setProfile] = useState({
    info: {
      overview: {
        title: "",
        description: "",
        propertyType: "",
        totalCapacity: "",
        availableRooms: "",
      },
      location: {
        address: {
          street: "",
          city: "",
        },
        coordinates: ["", ""],
        nearbyPlaces: [],
      },
      specifications: {
        size: "",
        bedrooms: "",
        bathrooms: "",
        floorNumber: "",
      },
      financials: {
        rent: "",
        securityDeposit: "",
      },
      leaseTerms: {
        leaseDuration: "",
        availableFrom: "",
      },
      images: [],
    },
    amenities: {
      general: [],
      kitchen: [],
      bathroom: [],
      bedroom: [],
      outdoor: [],
      entertainment: [],
      safety: [],
    },
    details: {
      AC: false,
      Parking: false,
      Balcony: false,
      Furnished: false,
      Elevator: false,
      "Pet Friendly": false,
      "Smoking Allowed": false,
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

  const handleNestedInputChange = (section, nestedSection, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...prev[section][nestedSection],
          [field]: value,
        },
      },
    }));
  };

  function handleLocationChange(newValue) {
    if (newValue) {
      setProfile((prev) => ({
        ...prev,
        info: {
          ...prev.info,
          location: {
            ...prev.info.location,
            address: {
              street: newValue.address.split(",")[0],
              city: newValue.address.split(",")[1],
            },
            coordinates: newValue.position,
          },
        },
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Apartment Profile data:", profile);
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center py-4">
      <h2 className="lg:h-32 h-20 flex items-center">Apartment Profile</h2>

      <main className="w-full flex flex-col gap-8 p-4 max-w-4xl">
        <SeparatorWithLabel label="Overview" />
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <InputWithLabel
            icon={<Home />}
            type="text"
            id="title"
            label="Title"
            value={profile.info.overview.title}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "overview",
                "title",
                e.target.value
              )
            }
          />
          <SelectWithLabel
            icon={<Home />}
            value={profile.info.overview.propertyType}
            label="Property Type"
            options={["House", "Apartment", "Studio", "Other"]}
            onChange={(e) =>
              handleNestedInputChange("info", "overview", "propertyType", e)
            }
          />
          <InputWithLabel
            icon={<Users />}
            type="number"
            id="totalCapacity"
            label="Total Capacity"
            value={profile.info.overview.totalCapacity}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "overview",
                "totalCapacity",
                e.target.value
              )
            }
          />
          <InputWithLabel
            icon={<Users />}
            type="number"
            id="availableRooms"
            label="Available Rooms"
            value={profile.info.overview.availableRooms}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "overview",
                "availableRooms",
                e.target.value
              )
            }
          />
          <div className="lg:col-span-2">
            <TextareaWithLabel
              icon={<ScrollText />}
              id="description"
              label="Description"
              value={profile.info.overview.description}
              onChange={(e) =>
                handleNestedInputChange(
                  "info",
                  "overview",
                  "description",
                  e.target.value
                )
              }
            />
          </div>
        </section>

        <SeparatorWithLabel label="Location" />
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <LocationCombobox
            label="Address"
            placeholder="Enter address"
            onChange={handleLocationChange}
          />

          <CategorizedBadgeSelect
            icon={<Home />}
            id="nearbyPlaces"
            label="Nearby Places"
            options={nearbyPlacesList}
            value={profile.info.location.nearbyPlaces}
            onChange={(newValue) =>
              handleNestedInputChange(
                "info",
                "location",
                "nearbyPlaces",
                newValue
              )
            }
          />
        </section>

        <SeparatorWithLabel label="Specifications" />
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <InputWithLabel
            icon={<Home />}
            type="number"
            id="size"
            label="Size (sq m)"
            value={profile.info.specifications.size}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "specifications",
                "size",
                e.target.value
              )
            }
          />
          <InputWithLabel
            icon={<Bed />}
            type="number"
            id="bedrooms"
            label="Bedrooms"
            value={profile.info.specifications.bedrooms}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "specifications",
                "bedrooms",
                e.target.value
              )
            }
          />
          <InputWithLabel
            icon={<Bath />}
            type="number"
            id="bathrooms"
            label="Bathrooms"
            value={profile.info.specifications.bathrooms}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "specifications",
                "bathrooms",
                e.target.value
              )
            }
          />
          <InputWithLabel
            icon={<Home />}
            type="number"
            id="floorNumber"
            label="Floor Number"
            value={profile.info.specifications.floorNumber}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "specifications",
                "floorNumber",
                e.target.value
              )
            }
          />
        </section>

        <SeparatorWithLabel label="Financials" />
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <InputWithLabel
            icon={<DollarSign />}
            type="number"
            id="rent"
            label="Rent"
            value={profile.info.financials.rent}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "financials",
                "rent",
                e.target.value
              )
            }
          />
          <InputWithLabel
            icon={<DollarSign />}
            type="number"
            id="securityDeposit"
            label="Security Deposit"
            value={profile.info.financials.securityDeposit}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "financials",
                "securityDeposit",
                e.target.value
              )
            }
          />
        </section>

        <SeparatorWithLabel label="Lease Terms" />
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <InputWithLabel
            icon={<Calendar />}
            type="number"
            id="minLeaseDuration"
            label="Minimum Lease Duration (months)"
            value={profile.info.leaseTerms.leaseDuration}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "leaseTerms",
                "leaseDuration",
                e.target.value
              )
            }
          />

          <InputWithLabel
            icon={<Calendar />}
            type="date"
            id="availableFrom"
            label="Available From"
            value={profile.info.leaseTerms.availableFrom}
            onChange={(e) =>
              handleNestedInputChange(
                "info",
                "leaseTerms",
                "availableFrom",
                e.target.value
              )
            }
          />
        </section>

        <SeparatorWithLabel label="Images" />
        <section className="grid grid-cols-1 gap-8">
          <ImageUploadGrid
            onChange={(files) =>
              handleInputChange("info", "images", [...files])
            }
          />
        </section>

        <SeparatorWithLabel label="Amenities" />
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <CategorizedBadgeSelect
            icon={<Home />}
            id="general-amenities"
            label="General Amenities"
            options={generalAmenitiesList}
            placeholder="Select general amenities..."
            onChange={(newSelection) =>
              handleInputChange("amenities", "general", newSelection)
            }
          />
          <CategorizedBadgeSelect
            icon={<Coffee />}
            id="kitchen-amenities"
            label="Kitchen Amenities"
            options={kitchenAmenitiesList}
            placeholder="Select kitchen amenities..."
            onChange={(newSelection) =>
              handleInputChange("amenities", "kitchen", newSelection)
            }
          />
          <CategorizedBadgeSelect
            icon={<Bath />}
            id="bathroom-amenities"
            label="Bathroom Amenities"
            options={bathroomAmenitiesList}
            placeholder="Select bathroom amenities..."
            onChange={(newSelection) =>
              handleInputChange("amenities", "bathroom", newSelection)
            }
          />
          <CategorizedBadgeSelect
            icon={<Bed />}
            id="bedroom-amenities"
            label="Bedroom Amenities"
            options={bedroomAmenitiesList}
            placeholder="Select bedroom amenities..."
            onChange={(newSelection) =>
              handleInputChange("amenities", "bedroom", newSelection)
            }
          />
          <CategorizedBadgeSelect
            icon={<TreePine />}
            id="outdoor-amenities"
            label="Outdoor Amenities"
            options={outdoorAmenitiesList}
            placeholder="Select outdoor amenities..."
            onChange={(newSelection) =>
              handleInputChange("amenities", "outdoor", newSelection)
            }
          />
          <CategorizedBadgeSelect
            icon={<Tv />}
            id="entertainment-amenities"
            label="Entertainment Amenities"
            options={entertainmentAmenitiesList}
            placeholder="Select entertainment amenities..."
            onChange={(newSelection) =>
              handleInputChange("amenities", "entertainment", newSelection)
            }
          />
          <CategorizedBadgeSelect
            icon={<ShieldCheck />}
            id="safety-amenities"
            label="Safety Amenities"
            options={safetyAmenitiesList}
            placeholder="Select safety amenities..."
            onChange={(newSelection) =>
              handleInputChange("amenities", "safety", newSelection)
            }
          />
        </section>

        <SeparatorWithLabel label="Details" />
        <section className="grid lg:grid-cols-5 grid-cols-1 gap-8">
          {detailOptions.map(({ field, label, icon }) => (
            <RadioCombobox
              key={field}
              value={field}
              onChange={(e) =>
                handleInputChange("details", field, e.target.checked)
              }
              checked={profile.details[field]}
              icon={icon}
              label={
                <p className="text-lg text-center font-semibold">{label}</p>
              }
              style={"h-40 w-40 border-2 "}
            />
          ))}
        </section>
      </main>

      <button
        className="my-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Submit Apartment Profile
      </button>
    </form>
  );
};

export default ApartmentProfileForm;
