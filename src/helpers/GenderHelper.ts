export const getGenderProviderByIndex = (
  index: number
): "Male" | "Female" | "Transgender" | "Not to disclose" => {
  if (index === 0) {
    return "Male";
  } else if (index === 2) {
    return "Female";
  } else if (index === 1) {
    return "Transgender";
  } else if (index === 3) {
    return "Not to disclose";
  } else {
    // Add a default case or throw an error for unexpected values
    // return "Not to disclose"; // or throw new Error("Unexpected index value");
    throw new Error("Unexpected index value");
  }
};
