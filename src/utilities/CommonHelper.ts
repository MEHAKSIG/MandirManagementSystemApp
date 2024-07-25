

export const FormatName = (name: string) => {
  // Check if the name parameter is provided
  if (!name) {
    return "";
  }

  // Convert the name to lowercase and split into an array of words
  const words = name.toLowerCase().split(" ");

  // Capitalize the first letter of each word
  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the formatted words back into a single string
  return formattedWords.join(" ");
};
