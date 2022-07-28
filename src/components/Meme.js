import React, { useEffect } from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);
 

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
  
  
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prev) => ({
      ...prev,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
        ...prevMeme,
        [name]: value
    }))
}

  return (
    <main>
      <div className="form">
        <div className="input-container">
          <div>
            <input type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    />
          </div>
          <div>
            <input type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                     />
          </div>
        </div>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme-image">
      <img src={meme.randomImage} alt="images" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
          
    </main>
  );
}
/**
  function meme(){
     // get "memes" in "memesData"
    const memes = memesData.data.memes
    // add random function (random the "memes")
    const random = Math.floor(Math.random() * memes.length)
    // get the random data(only the "url") in "memes" and  asign it to a variable("url", to be specify)
    const url = memes[random].url
    console.log(url)
    }
  */
