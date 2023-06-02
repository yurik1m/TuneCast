import '../styles/App.css'
import '../styles/index.css'
import '../styles/Playlist.css'
import { styled } from 'styled-components'

function Chart () {
    return (
        <Container>
            <MainContainer>
                <Text style={{top:309, left: 217}}>이달의 좋아요한 음악</Text>
                <Text style={{top:309, left:817, width:300}}>이달의 좋아요한 플레이리스트</Text>
                <Vline style={{top:344, left:718, height:420}}></Vline>
                <Vline style={{top:381, left:217, height:400}}></Vline>
                <Hline style={{top:781, left:217, width:400}}></Hline>
            </MainContainer>
        </Container>
    )
}
export default Chart;

const Container = styled.div`
    height: 1024px;
    width: 1440px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const MainContainer = styled.div`
    height: 640px;
    width: 1200px;
    display: flex; 
    align-items: center; 
    flex-direction: row;
    border-radius: 10%;
    background-color: rgba(255, 255, 255, 0.2);
`
const Text = styled.p`
    position: absolute;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
`
const Vline = styled.p`
    border-left: thin solid #FFF;
    position: absolute;
`
const Hline = styled.p`
    border-bottom: thin solid #FFF;
    position: absolute;
`
const Rectangle = styled.div`
    width: 30px;
    display: flex;
`