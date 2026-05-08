import React from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

// FIREBASE BACKEND CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA05JC-NCcPohbMGY-NhtXTzTKFr6-12pI",
  authDomain: "cosmic-love-j.firebaseapp.com",
  projectId: "cosmic-love-j",
  storageBucket: "cosmic-love-j.firebasestorage.app",
  messagingSenderId: "1045107141269",
  appId: "1:1045107141269:web:feb42e4ee43ce3c430c99c",
  measurementId: "G-J8JWVDK6EV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function CosmicLoveWebsite() {

  const [currentPage, setCurrentPage] = React.useState("home");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  // CUSTOMIZE HERE
  const correctPassword = "1112025";
  const girlName = "I'm so sorry Janhavi💖";
  const yourName = "Always yours";

  const musicRef = React.useRef<HTMLAudioElement | null>(null);

  const memories = [
    {
      title: "The First Smile",
      text: "The day you smiled at me, my whole universe changed.",
      image: "/images/photo1.jpeg",
    },
    {
      title: "Late Night Talks",
      text: "Even silence feels beautiful when it is with you.",
      image: "/images/photo2.jpeg",
    },
    {
      title: "Forever Promise",
      text: "No matter what happens, I will always choose you.",
      image: "/images/photo3.jpeg",
    },
  ];

  const saveUnlockEvent = async () => {
    try {
      await addDoc(collection(db, "website_unlocks"), {
        unlockedAt: serverTimestamp(),
        by: girlName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveMessage = async () => {
    if (!message) return;

    try {
      await addDoc(collection(db, "love_messages"), {
        text: message,
        createdAt: serverTimestamp(),
      });

      setSent(true);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlock = async () => {

    if (password === correctPassword) {

      try {
        if (musicRef.current) {
          musicRef.current.volume = 0.5;
          musicRef.current.load();
          await musicRef.current.play();
        }
      } catch (err) {
        console.log("Music Error:", err);
      }

      setError(false);

      saveUnlockEvent();

      setTimeout(() => {
        setIsUnlocked(true);
      }, 300);

    } else {
      setError(true);
    }
  };

  // LOCK SCREEN
  if (!isUnlocked) {

    return (
      <>

        <audio
          ref={musicRef}
          autoPlay
          loop
          hidden
        >
          <source
            src="/music/love.mp3"
            type="audio/mp3"
          />
        </audio>

        <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative text-white">

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          </div>

          <div className="relative z-10 w-[90%] max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">

            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              I'm so glad you're here, {girlName}!
            </h1>

            <p className="text-gray-300 mb-8">
              Enter the date of first day when we met
            </p>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/20 text-white outline-none focus:border-pink-400 transition"
            />

            {error && (
              <p className="text-red-400 mt-3 text-sm">
                Wrong password. Try again ❤️
              </p>
            )}

            <button
              onClick={handleUnlock}
              className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
            >
              Unlock Love
            </button>

          </div>
        </div>
      </>
    );
  }

  // MAIN WEBSITE
  return (
    <>

      <audio
        ref={musicRef}
        autoPlay
        loop
        hidden
      >
        <source
          src="/music/love.mp3"
          type="audio/mp3"
        />
      </audio>

      <div className="min-h-screen bg-black text-white overflow-hidden relative">

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full animate-pulse"></div>

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>

          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:25px_25px]"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 bg-clip-text text-transparent animate-pulse">
            {girlName}
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl">
            In every universe, in every timeline, I would still choose you.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap justify-center">

            <button
              onClick={() => setCurrentPage("memories")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold hover:scale-105 transition"
            >
              Our Memories
            </button>

            <button
              onClick={() => setCurrentPage("letter")}
              className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20 transition"
            >
              Love Letter
            </button>

            <button
              onClick={() => setCurrentPage("message")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:scale-105 transition"
            >
              Send Message
            </button>

            <button
              onClick={() => setCurrentPage("reasons")}
              className="px-8 py-4 rounded-2xl bg-white/10 border border-pink-400/30 hover:bg-pink-500/20 transition"
            >
              Why I Love You
            </button>

          </div>
        </section>

        {/* MEMORIES */}
        {currentPage === "memories" && (

          <section className="relative z-10 px-6 pb-20 animate-fadeIn">

            <h2 className="text-4xl font-bold text-center mb-12">
              Our Memories ✨
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

              {memories.map((memory, index) => (

                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-300 shadow-2xl"
                >

                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="h-48 w-full object-cover rounded-2xl mb-6"
                  />

                  <h3 className="text-2xl font-semibold mb-3">
                    {memory.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {memory.text}
                  </p>

                </div>
              ))}

            </div>
          </section>
        )}

        {/* LETTER */}
        {currentPage === "letter" && (

          <section className="relative z-10 px-6 py-20 animate-fadeIn">

            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/10 p-10 md:p-16 shadow-2xl">

              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                I'm soo Sorry plese forgive me 😔
              </h2>

              <p className="text-lg text-gray-200 leading-loose text-center">
                hello my love 💖
                <br />
                <br />
                see I'm so much sorry for today. I never meant to hurt you,
                par mere na chahte hue bhi galti ho jati h.
                <br />
                Aur suno na, aise naraz mat raha karo please 🥺
                Sorry...
                <br />
                Abse main kahi nahi jaunga,
                bas aapke paas hi rahunga.
                <br />
                Pata hai jab main aapke saath rehta hu na,
                ek alag si hi shanti rehti hai mann me.
                <br />
                Please aise naraz hokar block mat kara karo 😭
                Please yrr maaf kar do is baar.
                <br />
                You matter the most to me.
                I really really love you bacha 💖
                <br />
                Please sorry sorry sorry sorry sorry 🥺💞
                Maaf kar do na please...
              </p>

              <p className="mt-8 text-right text-2xl font-semibold text-pink-300">
                — {yourName}
              </p>

            </div>
          </section>
        )}

        {/* MESSAGE */}
        {currentPage === "message" && (

          <section className="relative z-10 px-6 py-20 animate-fadeIn">

            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl">

              <h2 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Please Leave Me A Message 💌
              </h2>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something beautiful..."
                className="w-full h-40 rounded-3xl bg-black/30 border border-white/20 p-6 text-white outline-none resize-none"
              />

              <button
                onClick={saveMessage}
                className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-all duration-300 font-semibold"
              >
                Send Message
              </button>

              {sent && (
                <p className="text-center text-pink-300 mt-6 text-lg">
                  Message saved forever 💖
                </p>
              )}

            </div>
          </section>
        )}

        {/* REASONS */}
        {currentPage === "reasons" && (

          <section className="relative z-10 px-6 py-20 animate-fadeIn">

            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              10 Reasons Why I Love You 💞
            </h2>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

              {[
                "Your smile heals everything",
                "You make my worst days beautiful",
                "Your voice feels like home",
                "You understand me deeply",
                "You support my dreams",
                "You are my peace",
                "You are my happiness",
                "You make life magical",
                "You are my favorite person",
                "I simply cannot imagine life without you, and you are most perscious to me ",
              ].map((reason, index) => (

                <div
                  key={index}
                  className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 hover:scale-105 transition-all duration-300"
                >

                  <h3 className="text-2xl font-bold text-pink-300 mb-3">
                    {index + 1}.
                  </h3>

                  <p className="text-lg text-gray-200">
                    {reason}
                  </p>

                </div>
              ))}

            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="relative z-10 py-10 text-center text-gray-400 border-t border-white/10">
          Made with infinite love ♾️
        </footer>

      </div>
    </>
  );
}