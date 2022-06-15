import React from 'react'

const Headline = ({ newsSource, headlines}) => {
  return (
    <div>
        <h1>{newsSource}</h1>
        {headlines.map((headline, index) => {
        return <div key={index}>{headline}</div>;
      })}
    </div>
  )
}

export default Headline