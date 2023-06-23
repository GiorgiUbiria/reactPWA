import { CardType } from '../types/cardType';

const shuffle = (cardsCount: number, category: string): CardType[] => {
  const assets = [
    { image: `/assets/${category}/card-1.png` },
    { image: `/assets/${category}/card-2.png` },
    { image: `/assets/${category}/card-3.png` },
    { image: `/assets/${category}/card-4.png` },
    { image: `/assets/${category}/card-5.png` },
    { image: `/assets/${category}/card-6.png` },
    { image: `/assets/${category}/card-7.png` },
    { image: `/assets/${category}/card-8.png` },
    { image: `/assets/${category}/card-9.png` },
    { image: `/assets/${category}/card-10.png` },
    { image: `/assets/${category}/card-11.png` },
    { image: `/assets/${category}/card-12.png` },
  ];

  const availableCards = [...assets];
  const shuffledCards: CardType[] = [];

  while (shuffledCards.length < cardsCount) {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const randomCard = availableCards[randomIndex];

    shuffledCards.push({ ...randomCard, id: Math.random(), matched: false });
    shuffledCards.push({ ...randomCard, id: Math.random(), matched: false });

    availableCards.splice(randomIndex, 1);
  }

  return shuffledCards.sort(() => Math.random() - 0.5);
};

export default shuffle;