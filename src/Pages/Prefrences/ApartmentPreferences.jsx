import { RangeSlider, MultiSelect } from "./preferenceComponents";
import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { interestOptions, occupationOptions } from "@/lib/preferencesUtils";

export default function ApartmentPreferences({ preferences, setPreferences }) {
  const updatePreference = (key, newValue) => {
    setPreferences((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div className="lg:container">
      <div className="flex flex-col gap-6 sm:gap-8">
        <RangeSlider
          label="Age Range"
          value={preferences.ageRange}
          onChange={(newValue) => updatePreference("ageRange", newValue)}
          min={18}
          max={60}
          step={1}
          icon={Users}
        />

        <Separator />

        <MultiSelect
          label="Gender Preference"
          options={[
            { value: "Male", label: "Male", icon: Users },
            { value: "Female", label: "Female", icon: Users },
            { value: "NonBinary", label: "Non-binary", icon: Users },
          ]}
          value={preferences.gender}
          onChange={(newValue) => updatePreference("gender", newValue)}
        />

        <Separator />

        <MultiSelect
          label="Preferred Occupations"
          options={occupationOptions}
          value={preferences.occupations}
          onChange={(newValue) => updatePreference("occupations", newValue)}
        />

        <Separator />

        <MultiSelect
          label="Shared Interests"
          options={interestOptions}
          value={preferences.sharedInterests}
          onChange={(newValue) => updatePreference("sharedInterests", newValue)}
        />
      </div>
    </div>
  );
}
