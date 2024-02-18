type RepoInfo = {
  name: string;
  license: string | null;
  stars: number;
  forks: number;
  description: string;
  updatedAt: string;
  htmlUrl: string;
};

type UserInfo = {
  followers: number | null;
  following: number | null;
  location: string | null;
  avatarUrl: string | null;
};

export { type RepoInfo, type UserInfo };
