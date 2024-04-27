export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler("Outside");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};


// const Nav = () => {
//   const [categories, setCategories] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // État pour contrôler la visibilité du dropdown

//   async function fetchData() {
//     try {
//       const res = await allCategories();
//       setCategories(res.data);
//     } catch (error) {
//       console.log("Error fetching categories:", error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const leftDivRef = useRef(null);

//   const handleClickOutsideLeftDiv = (location) => {
//     if (location === "Outside") {
//       console.log("Clicked outside the div");
//       setDropdownOpen(false); // Masquer le dropdown lorsque vous cliquez en dehors du div
//     } else {
//       console.log("Clicked inside the div");
//     }
//   };

//   useClickOutside(leftDivRef, handleClickOutsideLeftDiv);

//   return (
//     <nav className="nav1">
//       <div className="left">
//         <input
//           type="checkbox"
//           id="toggle-dropdown"
//           className="toggle-dropdown"
//           onChange={() => setDropdownOpen(!dropdownOpen)} // Inverser l'état de visibilité du dropdown lorsqu'on clique sur l'input
//         />
//         <label for="toggle-dropdown" className="category test1">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-6 h-6 svgnav"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
//             />
//           </svg>
//           Catégories
//           <div className={`dropdown ${dropdownOpen ? "open" : ""}`} style={{ display: dropdownOpen ? "block" : "none" }}> {/* Ajouter la classe "open" lorsque le dropdown est ouvert */}
//             <ul className="scrollable-list">
//               <div style={{ textAlign: "left" }}>
//                 <p className="dropTitle">All Categories</p>
//               </div>{" "}
//               {categories.map((category) => (
//                 <li key={category.id} className="submenu">
//                   {category.title}
//                   <ul className="second-dropdown">
//                     {category.SubCategory.map((subCategory) => (
//                       <ul className="res">
//                         <li className="dropTitle">{subCategory.title}</li>
//                         {subCategory.Item.map((item) => (
//                           <li key={item.id}>{item.title}</li>
//                         ))}
//                       </ul>
//                     ))}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </label>
//       </div>
//       <div ref={leftDivRef} className="etenfin">
//         <button onClick={() => handleClickOutsideLeftDiv("Inside")}>
//           Click inside the div
//         </button>
//       </div>

//            <div className="left">
//         <input
//           type="checkbox"
//           id="toggle-servicedropdown"
//           className="toggle-servicedropdown"
//         />
//         <label for="toggle-servicedropdown" className="service test1">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke-width="1.5"
//             stroke="currentColor"
//             className="w-6 h-6 svgnav"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
//             />
//           </svg>
//           Services
//           <ul className="service-dropdown"></ul>
//         </label>

        
//       </div>
//     </nav>
//   );
// };
