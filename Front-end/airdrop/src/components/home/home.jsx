import { useContext, useState, useEffect } from "react";
import { TelegramContext } from "../../utils/store";
import { SERVER_URL } from "../../utils/constants";

export default function Home() {
  const user = useContext(TelegramContext);
  console.log("user context -,",user);
  const [coins, setCoins] = useState(user?.user?.bubblePoints||0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Invite 5 friends to Bubbles", description: "+30000 BUBBLES", claimed: false, coins: 30000 },
    { id: 2, name: "Share your story", description: "+1000 BUBBLES", claimed: false, coins: 1000 },
    { id: 3, name: "Bonus", description: "+500 BUBBLES", claimed: false, coins: 500 },
    { id: 4, name: "Join Bubbles Community group", description: "+2000 BUBBLES", claimed: false, coins: 2000 },
    { id: 5, name: "Make TON transaction", description: "+10000 BUBBLES", claimed: false, coins: 10000 },
  ]);

 

  const updateCoins = (newCoins) => {
    fetch(`${SERVER_URL}/api/v1/users/token/add`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        telegramUsername: user?.user?.telegramUsername ,
        tgId: user?.user?.tgId,
        numberOfReferrals: user?.user?.numberOfReferrals,
        referralLink: user?.user?.referralLink,
        joiningDate: user?.user?.joiningDate,
        bubblePoints: newCoins,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  const claimTask = (id, coin) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, claimed: true };
      }
      return task;
    });

    setTasks(updatedTasks);

    setCoins((prevCoins) => {
      const newCoins = Number(prevCoins) + coin;
     updateCoins(newCoins); 
     console.log("new -",newCoins);
      return newCoins.toString();
    });
  };

  const handleConnectWallet = () => {
    setShowSlider(true);
  };

  const handleConfirmConnection = () => {
    setWalletConnected(true);
    setShowSlider(false);
  };

  const handleCancelConnection = () => {
    setShowSlider(false);
  };

  const sortedTasks = tasks.sort((a, b) => a.claimed - b.claimed);

  return (
    <div className="home h-screen">
      <div className="body p-4">
        <div className="amount_token w-full h-8 flex justify-center items-center p-1 text-slate-50 text-xl font-serif">
          <button
            className={`bg-slate-200 text-xs font-bold py-2 px-4 rounded-full transition duration-300 ${walletConnected ? "text-slate-400 bg-slate-800" : "text-slate-600"}`}
            onClick={!walletConnected && handleConnectWallet}
          >
            {walletConnected ? "0x22... Connected" : "Connect Wallet"}
          </button>
        </div>

        <div className="amount_token w-full h-40 flex flex-col justify-center items-center p-2 text-slate-50 text-5xl font-bold">
          <div>{parseInt(coins).toLocaleString()}</div>
          <div className="text-sm font-extralight text-slate-300 pt-1">$BUBS</div>
        </div>

        <div className="TaskSection w-full">
          <div className="task_head text-slate-200 font-semibold">
            Tasks ({tasks.length})
          </div>
          <div className="task-list">
            {sortedTasks.map((task) => (
              <div key={task.id} className="task-item pl-1 pr-1 pt-3 pb-3 mt-2 flex justify-between items-center">
                <div>
                  <h3 className="text-md text-gray-300">{task.name}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>
                <div>
                  <button
                    className={`px-3 py-2 rounded-full ${task.claimed ? "cursor-not-allowed text-sm" : "bg-gray-800"} text-slate-200`}
                    onClick={() => claimTask(task.id, task.coins)}
                    disabled={task.claimed}
                  >
                    {task.claimed ? "Claimed" : "Claim"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer w-full h-16 bg-slate-800 flex rounded-full">
        <div className="menu w-1/4 flex justify-center items-center text-slate-400">H</div>
        <div className="menu w-1/4 flex justify-center items-center text-slate-400">L</div>
        <div className="menu w-1/4 flex justify-center items-center text-slate-400">T</div>
        <div className="menu w-1/4 flex justify-center items-center text-slate-400">I</div>
      </div>

      <div
        className={`fixed inset-0 flex justify-center items-end transition-transform duration-700 ${showSlider ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="bg-slate-800 w-full h-1/3 rounded-t-lg p-6 flex flex-col">
          <h2 className="text-2xl text-white mb-4">Confirm Wallet Connection</h2>
          <p className="text-slate-400 mb-8">Please confirm to connect your wallet.</p>
          <div className="flex flex-col gap-4">
            <button className="py-2 px-4 bg-green-500 text-white rounded-lg" onClick={handleConfirmConnection}>
              Confirm
            </button>
            <button className="py-2 px-4 bg-red-500 text-white rounded-lg" onClick={handleCancelConnection}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
