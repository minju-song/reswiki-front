import Footer from "../fragments/Footer";
import styled from "styled-components";

const Parent = styled.div`
    width: 100%;
    height: 100vh;
`;


type Props = {
    children: React.ReactNode;
};

function BaseLayout ({children} : Props) {
    return (
        <Parent>
            {children}
            <Footer />
        </Parent>
    );
}

export default BaseLayout;