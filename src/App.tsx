import { useEffect, useState } from "react";
import styled from "styled-components";

import Wallpaper from "./components/Wallpaper";
import Avatar from "./components/Avatar";
import ProfileCard from "./components/ProfileCard";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Repository from "./components/Repository";
import RepositoryCard from "./components/RepositoryCard";
import Footer from "./components/Footer";
import Input from "./components/Input";
import wallpaperURL from "/assets/hero-image-github-profile.png";
import githubIconURL from "/assets/github-icon.svg";

import { searchUser, searchRepositories } from "./Services/users";
import { RepoInfo, UserInfo } from "./types";
import "./App.css";

const initialUser: string = "chaoting-sun";

const Main = styled.div`
  width: 75%;
  min-width: 420px;
  margin: -50px auto 30px auto;
  border-right: 60px solid transparent;
  border-left: 60px solid transparent;
  position: relative;

  @media (max-width: 1035px) {
    margin: 0rem 1rem 2rem 1rem;
  }
`;

const ProfileCardContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-content: space-between;
  flex-wrap: wrap;

  gap: 30px;

  @media (max-width: 1035px) {
    margin-top: 30px;
  }
`;

const App = () => {
  const [username, setUsername] = useState<string>(initialUser);
  const [repositories, setRepositories] = useState<RepoInfo[]>([]);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    followers: null,
    following: null,
    location: null,
    avatarUrl: null,
  });

  const SearchByUsername = (user: string): void => {
    setUsername(user);
    setViewAll(false);
  };

  const handleViewAll = (): void => {
    setViewAll(!viewAll);
  };

  useEffect(() => {
    const extractNewUserInfo = async (): Promise<void> => {
      const newUserInfo: UserInfo = await searchUser(username);
      setUserInfo(newUserInfo);
    }
    try {
      extractNewUserInfo();
    } catch (error) {

    }

  }, [username]);

  useEffect(() => {
    const extractRepoItems = async (): Promise<void> => {
      const repoInfo: RepoInfo[] = await searchRepositories(username);
      setRepositories(repoInfo);
    }

    try {
      extractRepoItems();
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  const handleVisitRepository = (repoIndex: number): void => {
    window.location.href = repositories[repoIndex].htmlUrl;
  };

  const getRepositoryCards = () => {
    const lastIndex: number = viewAll ? repositories.length : 4;
    return repositories
      .slice(0, lastIndex)
      .map((repo, index) => (
        <RepositoryCard
          key={index}
          repoIndex={index}
          repo={repo}
          handleClickCard={handleVisitRepository}
        />
      ));
  };

  // console.log(username);
  // console.log(userInfo);
  // console.log(repositories);

  return (
    <>
      <Input initialUser={initialUser} onInputChange={SearchByUsername} />
      <Wallpaper wallpaperURL={wallpaperURL} />
      <Main>
        <Profile>
          <Avatar
            avatarURL={userInfo.avatarUrl ? userInfo.avatarUrl : githubIconURL}
          />
          <ProfileCardContainer>
            <ProfileCard
              itemKey="Followers"
              itemValue={userInfo.followers}
            ></ProfileCard>
            <ProfileCard
              itemKey="Following"
              itemValue={userInfo.following}
            ></ProfileCard>
            <ProfileCard
              itemKey="Location"
              itemValue={userInfo.location}
            ></ProfileCard>
          </ProfileCardContainer>
        </Profile>
        <Header />
        <Repository>{getRepositoryCards()}</Repository>
      </Main>
      <Footer viewAll={viewAll} handleViewAll={handleViewAll} />
    </>
  );
};

export default App;
