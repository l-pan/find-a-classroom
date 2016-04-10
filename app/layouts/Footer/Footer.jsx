import React from 'react';

const contStyle = {
  position: 'absolute',
  bottom: '0',
  right: '0',
};

const textStyle = {
  fontSize: '0.8em',
  color: '#727272',
  paddingRight: '2em',
};

const hrefStyle = {
  color: '#727272',
};

function Footer() {
  return (
    <div style={contStyle} className="row end-xs">
      <p style={textStyle}>
        A project by &nbsp;
        <a style={hrefStyle} href={'http://lawry.io'} target="_blank">
          Lawrence Pan
        </a>
      </p>
    </div>
  );
}

export default Footer;
