const CenterEl = ({ children }) => {
  return <div style={paddingElStyle}>{children}</div>;
};

const paddingElStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
};

export default CenterEl;
