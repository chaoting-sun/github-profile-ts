import React, { ReactNode } from "react";
import styled from "styled-components";

const RepositorySection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

type RepositoryProps = {
  children:  ReactNode;
}

const Repository = ({ children }: RepositoryProps) => {
  return <RepositorySection>{children}</RepositorySection>;
};

export default Repository;
