import axios from "axios";
import { UserInfo, RepoInfo } from "../types";

const productionMode: boolean = import.meta.env.PROD;

console.log("Mode:", productionMode ? "production" : "development");

const baseURL: string = productionMode
  ? "https://api.github.com"
  : "http://localhost:3001";

const instance = axios.create({ baseURL: baseURL });

const createURL = (username: string, searchType: string): string => {
  if (productionMode && searchType === "users") {
    return `users/${username}`;
  } else if (productionMode && searchType === "repos") {
    return `users/${username}/repos`;
  } else if (!productionMode && searchType === "users") {
    return `users_${username}`;
  } else {
    return `repos_${username}`;
  }
};

const searchUser = async (username: string): Promise<UserInfo> => {
  const url: string = createURL(username, "users");
  const { data } = await instance.get(url);
  const userInfo: UserInfo = {
    followers: data.followers,
    following: data.following,
    location: data.location,
    avatarUrl: data.avatar_url,
  }
  return userInfo;
};

const searchRepositories = async (username: string): Promise<RepoInfo[]> => {
  const url: string = createURL(username, "repos");
  const { data } = await instance.get(url);
  const repoInfoItems: RepoInfo[] = data.map((item: any) => ({
    name: item.name,
    license: item.license ? item.license.name.split(" ")[0] : null,
    stars: item.stargazers_count,
    forks: item.forks_count,
    description: item.description,
    updatedAt: item.updated_at,
    htmlUrl: item.html_url,
  }));
  return repoInfoItems;
};

export { searchUser, searchRepositories };
