import React, { useState } from "react";
import PropTypes from "prop-types";
import RadioCombobox from "@/components/Coustom/radioCbx";
import { UsersRound , Building} from "lucide-react";

const UserTypeForm = ({ onSubmit }) => {
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType) {
      if (userType === "roommate") {
        onSubmit("apartment");
      }
      else {
        onSubmit("roommate");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex flex-col  items-center p-4 lg:py-8   "
      >
        <h2 className="lg:h-32 h-20 flex items-center text-2xl font-sans font-extralight ">
        I'm looking for a(n) ...
        </h2>

      <main className="h-full flex flex-col justify-around w-full container gap-8 lg:gap-16">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-16 h-full py-16 ">
          <RadioCombobox
            value={"roommate"}
            onChange={(e) => setUserType(e.target.value)}
            checked={userType === "roommate"}
            label={<p className="text-2xl font-semibold">Roommate</p>}
            style={"h-full w-full border-4 "}
            icon={<UsersRound className="lg:h-48 h-16 lg:w-48 w-16"/>}
          />
          <RadioCombobox
            value={"apartment"}
            onChange={(e) => setUserType(e.target.value)}
            checked={userType === "apartment"}
            label={<p className="text-2xl font-semibold">Apartment</p>}
            style={"h-full w-full border-4 "}
            icon={<Building className="lg:h-48 h-16 lg:w-48 w-16 "/>}
          />
        </div>
        <button
          className="px-8 py-4 w-40 mx-auto bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
          type="submit"
          disabled={!userType}
        >
          Next
        </button>
      </main>
    </form>
  );
};

UserTypeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserTypeForm;
