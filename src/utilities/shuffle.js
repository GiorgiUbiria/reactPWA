const shuffle = () => {
  const assets = [
    { image: '/assets/css.png' },
    { image: '/assets/html.png' },
    { image: '/assets/dotnet.png' },
    { image: '/assets/js.png' },
    { image: '/assets/nextjs.png' },
    { image: '/assets/sass.png' },
    { image: '/assets/vscode.png' },
    { image: '/assets/tailwind.png' },
  ];
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};

export default shuffle;
