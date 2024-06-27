import React from 'react';

const EmptyCart = () => {
  return (
    <div style={styles.container}>
      <img 
        // src="https://via.placeholder.com/150" 
        src="https://res.cloudinary.com/do7y1l2dd/image/upload/v1719495162/Goodness/fgmvo87kc2takzciczuf.jpg" 
        alt="Empty Cart" 
        style={styles.image} 
      />
      <p style={styles.message}>Votre panier est vide. Ajoutez des produits pour commencer !</p>
      <button 
        onClick={() => window.location.href = '/'}
        style={styles.button}
      >
       Commencez votre shopping !
      </button>
    </div>
  );
};

const styles = {
  container: {
    marginTop:"100px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
  },
  image: {
    width: '300px',
    height: '300px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '25px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '20px',
    backgroundColor: '#FFA500',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
  },
};

export default EmptyCart;
