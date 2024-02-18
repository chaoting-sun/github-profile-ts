import styled from "styled-components";

const FooterSection = styled.div`
  text-align: center;
  margin-bottom: 30px;

  & span {
    cursor: pointer;
    color: var(--paragraph-color);
  }

  & span:hover {
    color: white;
  }
`;

type FooterProps = {
  viewAll: boolean;
  handleViewAll: () => void;
};

const Footer = ({ viewAll, handleViewAll }: FooterProps) => {
  const footerText: string = viewAll
    ? "View few repositories"
    : "View all repositories";

  return (
    <FooterSection>
      <span onClick={handleViewAll}>{footerText}</span>
    </FooterSection>
  );
};

export default Footer;
