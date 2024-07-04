import { useState } from "react";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useContractRead } from "wagmi";
import contractDefinitions from "../../../contracts";

export default function GetUsernameModal() {
  const modal = useModal();
  const [username, setUsername] = useState<string>("");
  const [avaialble, setAvailable] = useState<boolean>();

  function checkUsernameAvailability(username: string) {
    const avbl = useContractRead({
      ...contractDefinitions.usernameRental,
      functionName: "checkUsernameAvailability",
      args: [username],
    });
    setAvailable(avbl.data);
  }

  function handleCheckAvailability() {
    if (!username) {
      alert("Please enter a username.");
      return;
    }

    const isAvailable = checkUsernameAvailability(username);

    if (isAvailable !== undefined) {
      setAvailable(isAvailable);
      console.log(isAvailable)
    } else {
      console.error("Unable to determine username availability.");
    }
  }

  const handleInputChange = (event: { target: { value: any } }) => {
    setUsername(event.target.value);
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
            <h1 className="text-3xl font-bold relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient text-transparent">
                Your PumpFaxt Username
              </span>
              Your PumpFaxt Username
            </h1>
            <p className="text-opacity-80 text-front mt-2 w-[70%] text-center">
              Your identity across PumpFaxt, one name for your comments, and
              your tokens!
            </p>
            <div className="w-full flex gap-x-2 mt-6">
              <input
                className="bg-background rounded-lg border px-4 py-3 text-lg  w-full"
                placeholder="Search for a username"
                value={username}
                onChange={handleInputChange}
              />
              <button
                className="w-max text-lg text-center py-3 px-4 rounded-lg border"
                onClick={() => handleCheckAvailability()}
              >
                Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
