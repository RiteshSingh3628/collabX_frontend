export const CREATOR_PROFILE = {
  id: "creator-001",
  name: "Ritesh",
  fullName: "Ritesh Wanderlog",
  handle: "@ritesh.wanderlog",
  platform: "Instagram",
  verified: true,
  matchLabel: "High potential",
  bio: "\u2022 Ritesh | Travel Diaries\n\u2022 Exploring places, moments & stories\n\u2022 Capturing life one trip at a time \u2708\ufe0f\ud83c\udf0d\n@savvyritesh",
  location: "India",
  role: "Travel & Lifestyle Creator",
  niches: ["Travel", "Lifestyle", "Nature", "Reels", "Sikkim", "Vlog"],

  creatorInfo: [
    { key: "Location", value: "India", icon: "MapPin" },
    { key: "Active since", value: "Nov 2025", icon: "Clock" },
    { key: "Languages", value: "Hindi, English", icon: "MessageSquare" },
    {
      key: "Rate / post",
      value: "\u20b95K \u2013 12K",
      icon: "DollarSign",
      valueColor: "#1a7a45",
      bold: true,
    },
    {
      key: "Availability",
      value: "Available",
      icon: "Calendar",
      tag: true,
      tagColor: "green",
    },
    { key: "Past collabs", value: "None yet", icon: "Users", muted: true },
  ],

  stats: {
    followers: 215,
    engagementRate: 51.6,
    avgLikes: 107,
    avgComments: 4,
    totalPosts: 5,
    following: 215,
    totalReach: 2,
  },

  engagementBreakdown: [
    { label: "Likes", value: 90, raw: "107 avg" },
    { label: "Comments", value: 16, raw: "4 avg" },
    { label: "Reach", value: 3, raw: "Syncing", syncing: true },
  ],

  overallMetrics: [
    {
      label: "Combined followers",
      value: "215",
      delta: "Instagram only",
      deltaType: "na",
      icon: "Users",
      iconBg: "#eef2fd",
      iconColor: "#1a4fd4",
    },
    {
      label: "Avg. engagement",
      value: "51.6%",
      delta: "\u2191 8\u00d7 industry avg",
      deltaType: "up",
      icon: "Activity",
      iconBg: "#edfaf3",
      iconColor: "#1a7a45",
      valueColor: "#1a7a45",
    },
    {
      label: "Total reach",
      value: "2",
      delta: "Insights syncing",
      deltaType: "na",
      icon: "Eye",
      iconBg: "#fdf5e6",
      iconColor: "#a0620a",
    },
    {
      label: "Total posts",
      value: "5",
      delta: "All Reels / Video",
      deltaType: "up",
      icon: "Video",
      iconBg: "rgba(212,58,42,0.07)",
      iconColor: "#d43a2a",
    },
    {
      label: "Avg. likes/post",
      value: "107",
      delta: "\u2191 High for size",
      deltaType: "up",
      icon: "Heart",
      iconBg: "#f0f0ee",
      iconColor: "#6b6b6b",
    },
  ],

  engagementByPlatform: [
    {
      name: "Instagram",
      value: "51.6%",
      dotColor: "linear-gradient(135deg,#f09433,#dc2743)",
      active: true,
    },
    { name: "YouTube", value: "\u2014", dotColor: "#ff0000", active: false },
    {
      name: "X / Twitter",
      value: "\u2014",
      dotColor: "#0a0a0a",
      active: false,
    },
  ],

  bestPost: {
    caption:
      "When Chaiyya Chaiyya hits\u2026 I turn into SRK\u2019s long-lost paglu \ud83d\ude02\ud83d\udd25",
    likes: 186,
    comments: 9,
    date: "Nov 29, 2025",
    platform: "Instagram Reel",
    link: "https://www.instagram.com/reel/DRoZharEys_/",
    gradient: "linear-gradient(135deg,#2d1b0e,#4a2c12)",
  },

  contentMix: [
    { label: "Travel", pct: "60%", color: "#1a7a45" },
    { label: "Lifestyle", pct: "25%", color: "#1a4fd4" },
    { label: "Entertainment", pct: "15%", color: "#d43a2a" },
  ],

  campaignFit: {
    score: 72,
    breakdown: [
      { label: "Engagement", value: 100, display: "51.6%", color: "#1a7a45" },
      { label: "Content quality", value: 82, display: "82%", color: "#1a7a45" },
      { label: "Niche relevance", value: 70, display: "70%", color: "#a0620a" },
      { label: "Audience size", value: 12, display: "215", color: "#a0620a" },
      { label: "Consistency", value: 65, display: "65%", color: "#1a7a45" },
    ],
  },

  recentPosts: [
    {
      id: "p1",
      type: "Reel",
      likes: 101,
      comments: 5,
      caption: "Make your.. until.. it's too late",
      date: "Dec 9, 2025",
      thumbnail: "/placeholder-post-1.jpg",
      gradient: "linear-gradient(135deg,#1a1a2e,#16213e)",
      link: "https://www.instagram.com/reel/DSCXKtlE4AI/",
    },
    {
      id: "p2",
      type: "Reel",
      likes: 186,
      comments: 9,
      caption:
        "When Chaiyya Chaiyya hits\u2026 I turn into SRK\u2019s long-lost paglu \ud83d\ude02\ud83d\udd25",
      date: "Nov 29, 2025",
      thumbnail: "/placeholder-post-2.jpg",
      gradient: "linear-gradient(135deg,#2d1b0e,#4a2c12)",
      link: "https://www.instagram.com/reel/DRoZharEys_/",
    },
    {
      id: "p3",
      type: "Reel",
      likes: 76,
      comments: 4,
      caption:
        "Some views are too magical for any camera to capture. #lachungvalley #northsikkim",
      date: "Nov 28, 2025",
      thumbnail: "/placeholder-post-3.jpg",
      gradient: "linear-gradient(135deg,#0d2137,#164268)",
      link: "https://www.instagram.com/reel/DRlm5zhk-Sv/",
    },
    {
      id: "p4",
      type: "Reel",
      likes: 97,
      comments: 3,
      caption:
        "Window opens\u2026 soul opens too \u2728 #TravelDiaries #ChasingViews",
      date: "Nov 27, 2025",
      thumbnail: "/placeholder-post-4.jpg",
      gradient: "linear-gradient(135deg,#1a2e0d,#2d4a1a)",
      link: "https://www.instagram.com/reel/DRizOgNk3a-/",
    },
  ],

  likesPerPost: [
    { label: "Dec 9", value: 101 },
    { label: "Nov 29", value: 186 },
    { label: "Nov 28", value: 76 },
    { label: "Nov 27", value: 97 },
    { label: "Nov 26", value: 74 },
  ],

  instagramUrl: "https://www.instagram.com/ritesh.wanderlog/",
};

export const PLATFORM_TABS = [
  {
    id: "instagram",
    label: "Instagram",
    icon: "Instagram",
    status: "connected",
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: "Youtube",
    status: "soon",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    icon: "Twitter",
    status: "soon",
  },
];

export const CAMPAIGN_OPTIONS = [
  { id: "camp-1", name: "Summer Drop 2025 \u2014 Gymshark" },
  { id: "camp-2", name: "Monsoon Edit \u2014 Gymshark" },
  { id: "camp-3", name: "New campaign\u2026" },
];
