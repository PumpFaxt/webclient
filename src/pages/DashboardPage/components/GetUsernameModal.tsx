import React, { useState, ChangeEvent } from "react";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";

// Dummy array of registered usernames
const registeredUsernames = [
  "john_doe",
  "jane_doe",
  "user123",
  "test_user",
  "example",
];

export default function GetUsernameModal() {
  const modal = useModal();
  const [username, setUsername] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { name: string; available: boolean }[]
  >([]);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    const newSuggestions = generateSuggestions(value);
    setSuggestions(newSuggestions);

    if (value === "") {
      setIsAvailable(null);
    } else {
      setIsAvailable(!registeredUsernames.includes(value));
    }
  };

  const generateSuggestions = (
    input: string
  ): { name: string; available: boolean }[] => {
    if (input === "") return [];

    // Example logic to generate suggestions based on input
    const baseSuggestions = [
      `${input}_123`,
      `${input}_user`,
      `user_${input}`,
      `${input}2024`,
      `the_real_${input}`,
    ];

    // Filter registered usernames that match input pattern
    const filteredUsernames = registeredUsernames.filter(
      (name) => name.includes(input) && name !== input
    );

    // Combine base suggestions and filtered usernames
    let combinedSuggestions: string[] = [input, ...baseSuggestions];
    const takenSuggestions = filteredUsernames.filter(
      (name) => !combinedSuggestions.includes(name)
    );
    combinedSuggestions = combinedSuggestions.concat(
      takenSuggestions.slice(0, Math.max(0, 5 - combinedSuggestions.length))
    );

    // Map suggestions to include availability status
    return combinedSuggestions.map((name) => ({
      name,
      available: !registeredUsernames.includes(name),
    }));
  };

  return (
    <div className="bg-background min-w-[50vw] p-2 relative">
      <button
        className="absolute top-6 right-6 hover:text-red-500 hover:border-red-500 duration-100 ease-in text-xl border p-1 rounded-full"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" />
      </button>
      <div className="bg-background p-[0.2rem] border-2 border-front">
        <div className="bg-background border-2 border-front py-8">
          <div className="p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient text-transparent">
                Your PumpFaxt Username
              </span>
              Your PumpFaxt Username
            </h1>
            <p className="text-opacity-80 text-front mt-2 w-[60%] text-center">
              Your identity across PumpFaxt, one name for your comments, and
              your tokens!
            </p>
            <input
              className="bg-background rounded-lg w-[80%] border p-4 text-lg mt-6"
              placeholder="Search for a username"
              value={username}
              onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
              <div className="w-[80%] border border-front border-opacity-40 rounded-lg mt-4">
                <div className="flex flex-col gap-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.name}
                      className={`flex justify-between border-b border-opacity-40 border-front px-4 py-2 ${
                        index === 0 ? "" : "opacity-40"
                      }`}
                    >
                      <span>{suggestion.name}</span>
                      {suggestion.available ? (
                        <div className="flex items-center gap-x-1">
                          <span className="text-green-500">Available</span>
                          <img
                            src="/images/pepe-dance.gif"
                            className="w-[1.5vw] object-cover"
                            alt="Available"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-x-1">
                          <span className="text-red-500">Taken</span>
                          <img
                            src="/images/pepe-sad.gif"
                            className="w-[1.5vw] object-cover"
                            alt="Taken"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
