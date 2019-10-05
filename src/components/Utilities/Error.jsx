import React from 'react'

const errorStyle = {
  background: '#FFEDF2',
  color: '#FC578E',
  padding: '15px',
  width: '100%',
  borderRadius: '5px',
  margin: '5px 0px',
  fontSize: '14px',
  padding: '3px', 
  background: 'white',
  textAlign: 'left',
  // position: 'absolute',
  // bottom: '100%',
}

const Error = ({ value, style, }) => {
  return value
    ? <div className='inner-error' style={{ ...errorStyle, ...style }}>
      {value}
    </div>
    : null
}

export default Error;
