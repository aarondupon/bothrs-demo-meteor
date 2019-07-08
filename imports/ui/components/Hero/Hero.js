import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useTransition, animated, useSpring } from "react-spring";
import ThunderSVG from "../../core/symbols/ThunderSVG";
import ArrowLeftSVG from "../../core/symbols/ArrowLeftSVG";
import ArrowRightSVG from "../../core/symbols/ArrowRightSVG";
import HeroPager from "./components/HeroPager";
import HeroPage from "./components/HeroPage";
import ThunderShadowSVG from "../../core/symbols/ThunderShadowSVG";
import useTimer from "./hooks/useTImer";
import { useRenderContext } from "../../../context/renderContext";
// import pages from "./data.json";
// import useMeteorHeroTracker from "../../../api/hooks/useMeteorHeroTracker";

const Container = styled.div`
  position: relative;
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "436px"};
  margin-bottom: 55px;
  background-color: ${props => props.theme.secondColor};
  margin-top: 30px;
  border-radius: ${40 / 2}px;
  padding: 0px 0px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25); // not okay :(
`;

const ArrowLeftBtn = styled(ArrowLeftSVG)`
  cursor: pointer;
  left: 70px;
  top: 50%;
`;

const ArrowRightBtn = styled(ArrowRightSVG)`
  cursor: pointer;
  right: 30px;
  top: 50%;
`;
const Box = styled.div`
  position: absolute;
  top: ${50}px;
  right: 12%;
  width: ${props => props.width};
  height: 300px;
  /* overflow: hidden; */
`;

const Hero = ({ pages=[] }) => {
  const {isClient} = useRenderContext();

  /* const [pages] =  useMeteorHeroTracker(); */
  const [currentPage, setPage] = useState(0);
  const [stop, start, count] = useTimer(3000);
  const [down, setDown] = useState(false);

  const goToNextPage = () => setPage((currentPage + 1) % pages.length);
  /* const goToNextPage = () => setPage((currentPage + 1)); */
  const goToPrevPage = () =>
    setPage((pages.length + currentPage - 1) % pages.length);

  useEffect(() => {
    (pages.length > 1 ) && goToNextPage();
  }, [count]);

  const thunderAnimation = useSpring({
    transform: down ? "translateY(-20px)" : "translateY(0px)"
  });
  const shadowAnimation = useSpring({
    transform: down
      ? "translateY(-30px) scale(1.2)"
      : "translateY(0px) scale(1)",
    opacity: down ? 0.5 : 1
  });


  return (
    <Container
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
    >
      <div style={{ position: "absolute", zIndex: 999, left: "24%" }}>
        <animated.div style={shadowAnimation}>
          <ThunderShadowSVG
            y={320}
            style={{ transform: "translate(-70px,0)" }}
          />
        </animated.div>
        <animated.div style={thunderAnimation}>
          <ThunderSVG y={149} />
        </animated.div>
      </div>

      <Box onMouseEnter={stop} onMouseLeave={start} width={"50%"}>
          <HeroPage animate={isClient} page={pages[currentPage]} width={`${100}%`} height={180} />
      </Box>
      <ArrowLeftBtn
        onMouseEnter={stop}
        onMouseLeave={start}
        onClick={goToPrevPage}
      />
      <ArrowRightBtn
        onMouseEnter={stop}
        onMouseLeave={start}
        onClick={goToNextPage}
      />
      <HeroPager
        onMouseEnter={stop}
        onMouseLeave={start}
        count={pages.length}
        selectedIndex={currentPage % pages.length}
        onSelectPage={setPage}
      />
    </Container>
  );
};
export default React.memo(Hero);
