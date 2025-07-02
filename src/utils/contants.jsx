import { FaTv } from "react-icons/fa";
import { FaHand } from "react-icons/fa6";
import { IoDiamondSharp, IoImageOutline } from "react-icons/io5";

export const LISTMENU = [
    {
        id: 1,
        name: "Media Management",
        icon: <IoImageOutline />,
        subMenu: [
            {
                id: 1,
                name: "Movies",
                path: "/admin/movie"
            },
            {
                id: 2,
                name: "Episodes",
                path: "/admin/episodes"
            },
            {
                id: 3,
                name: "Trailer",
                path: "/admin/trailer"
            }
        ]
    },
    {
        id: 2,
        name: "Vip",
        icon: <IoDiamondSharp />,
        subMenu: [
            {
                id: 1,
                name: "Package",
                path: "/admin/vip/package"
            },
            {
                id: 2,
                name: "Feature",
                path: "/admin/vip/feature"
            },
            {
                id: 3,
                name: "Plans",
                path: "/admin/vip/plans"
            }
        ]
    },
    {
        id: 3,
        name: "Engagement Pages",
        icon: <FaHand />,
        subMenu: [
            {
                id: 1,
                name: "Like",
                path: "/admin/like"
            },
            {
                id: 2,
                name: "Watchlist",
                path: "/admin/watchlist"
            },
            {
                id: 3,
                name: "Comment",
                path: "/admin/comment"
            }
        ]
    },
    {
        id: 4,
        name: "Cast & Crew",
        icon: <FaTv />,
        subMenu: [
            {
                id: 1,
                name: "Author",
                path: "/admin/author"
            },
            {
                id: 2,
                name: "Character",
                path: "/admin/character"
            },
            {
                id: 3,
                name: "Actor",
                path: "/admin/actor"
            }
        ]
    }
];

export const UPLOAD_PRESET = "FILMORA";

export const CLOUD_NAME = "dbn3se28g";


export const ROLES = {
    ADMIN: 'admin',        // Quản trị viên cấp cao
    MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
    USER: 'user',          // Người dùng thông thường
};

export const initialOptions = {
    "client-id": "ASS_8r1rMV1Zj-wjSEG6P1Xaxwph54VU9kAR-3hAZgCVnDjP3T4K1NUXsjGqZgMWJbLw_M_kh7NS_bEI",
    currency: "USD",
    intent: "capture"
  };
