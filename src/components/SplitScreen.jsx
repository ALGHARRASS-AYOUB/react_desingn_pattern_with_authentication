import styled from "styled-components";
import styledComponents from "styled-components";

const Container=styled.div`
    display: flex;
`;

const Pane= styled.div`
    flex:${props=>props.Weight};
`

//export const SplitScreen=({left:Left,right:Right,leftWeight=1,rightWeight=1})=>{
    export const SplitScreen=({children,leftWeight=1,rightWeight=1})=>{
        const [left,right]=children;
        console.log(children)
    return  (
        <Container>
            <Pane Weight={leftWeight}>
                {left}
            </Pane>
            <Pane Weight={rightWeight}>
                {right}
            </Pane>
        </Container>
    );
}