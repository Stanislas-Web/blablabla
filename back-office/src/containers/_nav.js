const  structure_nav = [
  // Acteurs et Structure

  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Acteurs & Structures"],
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/structure/dashboard",
    icon: "cil-speedometer",
  },

  {
    _tag: "CSidebarNavItem",
    name: "CasSoumisActeur",
    to: "/structure/casSoumisActeur",
    icon: "cil-bell",
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "VBG",
    to: "/theme/colors",
    icon: "cil-warning",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Ajouter",
        to: "/structure/vbg/AjoutVBG",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Lister",
        to: "/structure/vbg/ActeurListerVBG",
      },
    ],
  }
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Cartographie",
  //   to: "/theme/colors",
  //   icon: "cil-map",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "VBG",
  //       to: "#",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Acteurs & Structures",
  //       to: "#",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Reglages",
  //   to: "/theme/colors",
  //   icon: "cil-settings",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Profil",
  //       to: "#",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Utilisateurs",
  //       to: "#",
  //     },
  //   ],
  // },
];

const admin_nav = [
  // Admin

  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["ADMIN"],
  // },

  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavItem",
    name: "CasSoumisAdmin",
    to: "/admin/casSoumisAdmin",
    icon: "cil-bell",
  },

  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Cartographie",
  //   to: "/theme/colors",
  //   icon: "cil-map",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "VBG",
  //       to: "#",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Acteurs & Structures",
  //       to: "#",
  //     },
  //   ],
  // },

  {
    _tag: "CSidebarNavDropdown",
    name: "VBG",
    to: "/theme/colors",
    icon: "cil-warning",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Ajouter",
        to: "/admin/acteurStructure/AjouterVBG",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Lister",
        to: "/admin/acteurStructure/ListerVbg",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rapport",
        to: "/admin/vbg/monitoring",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Acteurs & Structures",
    to: "/theme/colors",
    icon: "cil-home",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Ajouter",
        to: "/admin/acteurStructure/AjouterActeurStructure",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Lister",
        to: "/admin/acteurStructure/ListerActeurStructure",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Utilisateurs",
    to: "/theme/colors",
    icon: "cil-userlogin",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Ajouter",
        to: "/admin/acteurStructure/AjouterUtilsateur",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Lister",
        to: "/admin/acteurStructure/ListerUtilisateurs",
      },
    ],
  },
];


let role;

  if (localStorage.getItem("users") === null) {
    window.location.href = "#/login";
  } else {
     const users = JSON.parse(localStorage.getItem("users") ||  "[]");
      role =  users.user.role_user;
  }


let menu =  [];

  if(role === "Admin"){
    menu =   admin_nav
  }else if(role === "Admin_Structure"){
    menu =  structure_nav
  }




export  default  menu ;
