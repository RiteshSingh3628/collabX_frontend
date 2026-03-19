"use client";

import { useLocation } from "@/framework/hooks/locations";
import {
  getCities,
  getCountries,
  getStates,
} from "@/framework/server-actions/locations";
import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import Combobox from "../Combobox";

export default function SelectLocation({
  control,
  name,
  label,
  placeholder,
  isRequired,
  errors,
}) {
  const country = useWatch({ control, name: "country" });
  const state = useWatch({ control, name: "state" });

  const fetchFn =
    name === "country"
      ? () => getCountries()
      : name === "state" && country
        ? () => getStates(country)
        : name === "city" && country && state
          ? () => getCities(country, state)
          : null;

  const { options, loading, fetchOptions } = useLocation();

  useEffect(() => {
    if (name === "country") {
      fetchOptions(() => getCountries());
    } else if (name === "state" && country) {
      fetchOptions(() => getStates(country));
    } else if (name === "city" && country && state) {
      fetchOptions(() => getCities(country, state));
    } else {
      fetchOptions(null);
    }
  }, [name, country, state, fetchOptions]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="mb-3 flex w-full min-w-24 flex-col gap-1">
          {label && (
            <label className="block text-sm font-medium tracking-wide text-slate-500">
              {label}
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </label>
          )}
          <Combobox
            control={control}
            errors={errors}
            name={name}
            placeholder={placeholder}
            options={options}
            disabled={loading || !fetchFn}
            emptyText={`No data found.`}
            searchPlaceholder={`Search ${label}...`}
          />
        </div>
      )}
    />
  );
}
