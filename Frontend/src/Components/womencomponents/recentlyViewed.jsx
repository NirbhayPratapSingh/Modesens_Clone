import React from "react";
import range from "lodash/range";
import styled from "styled-components";
import ItemsCarousel from "react-items-carousel";
import { recentlyViewed } from "../../data/recentlyViewed";
import { Link } from "react-router-dom";
const noOfItems = 13;
const noOfCards = 4;
const autoPlayDelay = 3000;
const chevronWidth = 80;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1200px;

  margin: 0 auto;
  margin-bottom: 100px;
`;
const Button = styled.button`
    border: 1px solid black;
    margin: 0 auto;
    /* padding: 5px 40px; */
    width: 80%;
    position: absolute;
    font-weight: bold;
    top: 58%;
    bottom: 32%;
display: none;
background : rgba(255, 255, 255, 0.6) none repeat scroll 0% 0% / auto padding-box border-box;
z-index : 99;


`
const Container = styled.div`
    margin:20px;
    position: relative;
    padding:0 20px;
    &:hover ${Button}{
      display: block;
  }
`

const SlideItem = styled.img`
  height: 200px;
  width: 70%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
 
`;
const HeartDIv=styled.div`
    position: absolute;
    left: 88%;
    bottom:93%;
    /* top: ; */
`

const TextDiv= styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:flex-end;
    padding: 8px;
    & span{
        font-size:12px;
        color: gray;
    }
    & h6{
        font-size:13px;
        font-weight: bold;
    }
`
const HeartImg= styled.img`

`

const carouselItems = recentlyViewed.map((e) => (
  <Container  className="slideDiv">
      <HeartDIv>
        <HeartImg src="https://cdn.modesens.com/static/img/20210601heart.svg"/>
      </HeartDIv>
    <div style={{  display: "flex",border: "none",justifyContent: "center",padding: "20px 8px" }}>
      <SlideItem style={{width: "100%"}} src={e.src} />
    </div>
    <div style={{  display: "flex", justifyContent: "center" }} >
        <Button>
          <Link to='/beauty' style={{textDecoration:"none"}}>Quick View</Link>
        </Button>
    </div>
    <TextDiv className="textDiv">
      <h5
        style={{
          fontSize: "15px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {e.title}
      </h5>
      <p style={{ fontSize: "12px", textAlign: "center",color: "gray" }}>{e.sub}</p>
        <h6>{e.rate}</h6>
        <span>{e.st}</span>
    </TextDiv>
  </Container>
));

export default class AutoPlayCarousel extends React.Component {
  state = {
    activeItemIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () =>
    this.setState((prevState) => ({
      activeItemIndex:
        (prevState.activeItemIndex + 1) % (noOfItems - noOfCards + 1),
    }));

  onChange = (value) => this.setState({ activeItemIndex: value });

  render() {
    return (
      <Wrapper>
        <ItemsCarousel
          gutter={12}
          numberOfCards={noOfCards}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={this.onChange}
          rightChevron={
            <button
              style={{ border: "none", background: "white", fontSize: "35px",fontWeight:"100",color:"gray" }}
            >
              {" "}
              {"→"}
            </button>
          }
          leftChevron={
            <button
              style={{ border: "none", background: "white", fontSize: "35px",fontWeight:"100",color:"gray" }}
            >
              {"←"}
            </button>
          }
          chevronWidth={chevronWidth}
          outsideChevron
          children={carouselItems}
        />
      </Wrapper>
    );
  }
}
