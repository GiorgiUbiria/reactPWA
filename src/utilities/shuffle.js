const shuffle = (cardsCount) => {
  const assets = [
    { image: '/assets/css.png' },
    { image: '/assets/html.png' },
    { image: '/assets/dotnet.png' },
    { image: '/assets/js.png' },
    { image: '/assets/nextjs.png' },
    { image: '/assets/sass.png' },
    { image: '/assets/vscode.png' },
    { image: '/assets/tailwind.png' },
    { image: '/assets/mysql.png' },
    { image: '/assets/laravel.png' },
    { image: '/assets/vue.png' },
    { image: '/assets/nestjs.png' },
    { image: '/assets/angular.png' },
    { image: '/assets/vite.png' },
    { image: '/assets/nodejs.png' },
    { image: '/assets/react.png' },
    { image: '/assets/postgress.png' },
    { image: '/assets/oracle.png' },
  ];

  const availableCards = [...assets];
  const shuffledCards = [];

  while (shuffledCards.length < cardsCount) {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const randomCard = availableCards[randomIndex];

    shuffledCards.push({ ...randomCard, id: Math.random() });
    shuffledCards.push({ ...randomCard, id: Math.random() });

    availableCards.splice(randomIndex, 1);
  }

  return shuffledCards.sort(() => Math.random() - 0.5);
};

export default shuffle;
