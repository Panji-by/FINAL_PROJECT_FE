import React, { useState, useEffect } from "react";
export const darkMode = React.createContext();
const Darkmode = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("darkmode"));
  const [path, setPath] = useState("overview");
  const [modal, setModal] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [activeCategory, setActiveCategory] = useState("All")
  const [count, setCount] = useState(5);
  // const togglex = (tab) => {
  //   console.log(tab,"initab")
  //   if (activeTab !== tab) setActiveTab(tab);
  // };
  useEffect(() => {
    setActiveCategory("")
  }, [activeCategory])
  const handleCategory = (e) => {
    setActiveCategory(e);
  }
  const toggleModal = () => {
    toggleAll();
    setModal(!modal);
    // setModalSignUp(!modalSignUp);
  };
  const toggleModalSignUp = () => {
    toggleAll();
    setCount(5)
    setModalSignUp(!modalSignUp);
  };
  const toggleAll = () => {
    setModalSignUp(false);
    setModal(false);
  };

  const closeBtn = (
    <button className="close" onClick={toggleAll}>
      &times;
    </button>
  );
  const toggleTheme = () => {
    if (theme === "light") {
      localStorage.setItem("darkmode", theme === "dark" ? "light" : "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("darkmode", theme === "dark" ? "light" : "dark");
      setTheme("light");
    }
  };
  return (
    <darkMode.Provider
      value={{
        toggleTheme,
        theme,
        setTheme,
        path,
        setPath,
        modal,
        setModal,
        toggleModal,
        closeBtn,
        modalSignUp,
        setModalSignUp,
        toggleModalSignUp,
        activeTab,
        setActiveTab,
        toggleAll,
        activeCategory,
        setActiveCategory,
        handleCategory,
        count,
        setCount,
      }}
    >
      {props.children}
    </darkMode.Provider>
  );
};

export default Darkmode;
