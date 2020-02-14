function RandomColor() {
  let color = null;
  const colors = ['#00d6c8', '#448AFF', '#F8BBD0', '#E91E63', '#C2185B', '#34f81b'];
  return () => {
    color = (color === null) ? 0 : (color + 1);
    return colors[color];
  };
}

export default RandomColor();
