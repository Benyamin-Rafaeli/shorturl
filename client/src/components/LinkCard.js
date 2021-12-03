import React from 'react';

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Ssilka</h2>
      <p>
        Vasha ssilka:{' '}
        <a href={link.id} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Vasha otkuda:{' '}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Kolichestvo klikov po ssilke: <strong>{link.clicks}</strong>
      </p>
      <p>
        Data sozdaniya:{' '}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
