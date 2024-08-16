import { useState } from "react";
import styled, { css } from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Card = styled.div`
  font-size: 36px;
  width: 90px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 5px solid red;
  ${(props) =>
    props.isActive &&
    css`
      background-color: yellow; /* 高亮正在比較的卡片 */
    `}
  ${(props) =>
    props.isSorted &&
    css`
      background-color: lightgreen; /* 排序完成後卡片顯示綠色 */
    `}
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const RandomBtn = styled.button`
  font-size: 36px;
`;

const SortedContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  flex-direction:column-reverse;
  justify-content: center;
  gap: 10px;
`;

function App() {
  const generateRandomCards = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5).slice(0, 5);
    return shuffledNumbers;
  };

  const [cards, setCards] = useState(generateRandomCards);
  const [sortedCards, setSortedCards] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([-1, -1]); // 正在比較或交換的卡片索引
  const [isSorted, setIsSorted] = useState(false); // 判斷是否排序完成

  const shuffleCards = () => {
    setCards(generateRandomCards());
    setSortedCards([]);
    setIsSorting(false); // 停止排序
    setActiveIndices([-1, -1]); // 重置活動卡片
    setIsSorted(false); // 重置排序狀態
  };

  const stepByStepSort = () => {
    let sortedArray = [...cards];
    let i = 0;
    let j = 0;

    setIsSorting(true); // 標記為排序狀態

    const interval = setInterval(() => {
      if (i < sortedArray.length - 1) {
        if (j < sortedArray.length - 1 - i) {
          setActiveIndices([j, j + 1]); // 標記正在比較的卡片
          if (sortedArray[j] > sortedArray[j + 1]) {
            [sortedArray[j], sortedArray[j + 1]] = [
              sortedArray[j + 1],
              sortedArray[j],
            ]; // 交換
          }
          j++;
        } else {
          j = 0;
          i++;
        }
        setSortedCards([...sortedArray]); // 更新排序後卡片狀態
      } else {
        clearInterval(interval); // 排序完成，停止計時器
        setIsSorting(false); // 標記為非排序狀態
        setActiveIndices([-1, -1]); // 重置活動卡片
        setIsSorted(true); // 設定排序完成
      }
    }, 1500); 
  };

  return (
    <>
      <Title>bubblesort</Title>
      <Container>
        <Container>
          {cards.map((num) => (
            <Card key={num}>{num}</Card>
          ))}
        </Container>
        <ButtonContainer>
          <RandomBtn onClick={shuffleCards} disabled={isSorting}>
            隨機
          </RandomBtn>
          <RandomBtn onClick={stepByStepSort} disabled={isSorting}>
            排序
          </RandomBtn>
        </ButtonContainer>
        {sortedCards.length > 0 && (
          <SortedContainer>
            {sortedCards.map((num, index) => (
              <Card
                key={num}
                isActive={activeIndices.includes(index)}
                isSorted={isSorted} // 判斷是否已排序完成
              >
                {num}
              </Card>
            ))}
          </SortedContainer>
        )}
      </Container>
    </>
  );
}

export default App;
