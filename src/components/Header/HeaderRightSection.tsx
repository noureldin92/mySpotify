import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HearderLink from "./HearderLink";

const navLinks = [
  { to: "/", title: "Home" },
  { to: "/playlists", title: "Playlists" },
  { to: "/categories", title: "Categories" },
  { to: "/search", title: "Search" },
];

const HeaderRightSection = () => {
  const [renderControl, setRederControl] = useState<boolean>(false);
  const currentScreenWidth = window.innerWidth;
  const smallScreen = currentScreenWidth < 640;
  function renderHanlder() {
    setTimeout(() => {
      setRederControl(true);
    }, 200);
  }

  function endHoverHandler() {
    setRederControl(false);
  }
  const ele = document.querySelector("html");
  const modeFromLocalStorage = localStorage.getItem("mode");
  let currentmodeisDark = ele?.classList.contains("dark");
  if (modeFromLocalStorage === "dark") {
    currentmodeisDark = true;
  } else currentmodeisDark = false;

  return (
    <AnimatePresence>
      <motion.section
        layout
        onHoverStart={renderHanlder}
        onHoverEnd={endHoverHandler}
        variants={{
          init: { x: 0, y: smallScreen ? -500 : -120 },
          now: { x: 100 },
        }}
        initial="now"
        animate="init"
        transition={{ duration: 1, type: "spring", stiffness: 75, damping: 15 }}
        whileHover={{
          y: smallScreen ? -50 : 0,
          width: "105%",
          borderRadius: 0,
          right: smallScreen ? -18 : -30,
        }}
        className={` ${
          renderControl ? "flex justify-center items-center" : "flex flex-col"
        }  justify-center items-center shadow-xl shadow-black/20  z-10 w-4/5 sm:w-3/5 
        h-full sm:h-[240px]  absolute -top-4 -right-4  rounded-bl-[100%]
         bg-darkGreen  dark:bg-darkerGreen
           transition-colors duration-[1500ms] `}>
        <motion.ul
          variants={{
            init: {
              transition: { staggerChildren: 0.5, damping: 15 },
            },
          }}
          className="flex flex-col sm:flex-row gap-x-4 gap-y-3 sm:gap-y-0 justify-center items-center">
          {renderControl &&
            navLinks.map((navLink) => {
              return (
                <motion.li
                  key={navLink.to}
                  className="text-xl md:text-lg"
                  variants={{ init: { x: 0, y: 0, opacity: 1 } }}
                  initial={{ x: 100, y: -60, opacity: 0.5 }}
                  transition={{ type: "spring", damping: 15 }}>
                  <HearderLink to={navLink.to} title={navLink.title} />
                </motion.li>
              );
            })}
        </motion.ul>
        {!renderControl && (
          <ul className="self-end me-8 -mt-28">
            {navLinks.map((navLink) => {
              return (
                <motion.li
                  key={navLink.title}
                  className="text-base text-end me-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  exit={{ opacity: 0 }}>
                  <HearderLink to={navLink.to} title={navLink.title} />
                </motion.li>
              );
            })}
          </ul>
        )}
        <motion.img
          variants={{
            basic: { y: 0 },
            anim: {
              rotate: renderControl ? 160 : 20,
            },
          }}
          initial="basic"
          animate="anim"
          transition={{ duration: 0.5, type: "spring" }}
          src={`${
            currentmodeisDark
              ? "../images/DarkDropIcon.png"
              : "../images/LightdropIcon.png"
          }  `}
          className="absolute  right-0 bottom-0 me-6 sm:me-8 mb-3 w-16 "></motion.img>
      </motion.section>
    </AnimatePresence>
  );
};

export default HeaderRightSection;
