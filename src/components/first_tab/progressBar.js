const ProgressBar = (props) => {
<<<<<<< HEAD
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: '90%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 20,
    // align
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed/18*100}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}`}</span>
=======
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 20,
      width: '50%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 50
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed/18*100}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}`}</span>
        </div>
>>>>>>> 68bbf4abec4beeadf35089c21e90d1c0e2ac61da
      </div>
    </div>
  );
};

export default ProgressBar;